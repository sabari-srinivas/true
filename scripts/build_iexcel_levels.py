#!/usr/bin/env python3
"""
Scan the iExcel folder, convert all challenge-card .docx files to PDF,
organise the output into public/levels/ with a clean structure,
and emit a JSON manifest to stdout.
"""

import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

# ── paths ────────────────────────────────────────────────────────────────────
ROOT = Path("/Users/a2862717/Documents/nz-sport/nz-sports")
IEXCEL = ROOT / "iExcel"
OUT = ROOT / "public" / "levels"
SOFFICE = shutil.which("soffice") or "/Applications/LibreOffice.app/Contents/MacOS/soffice"

# ── helpers ──────────────────────────────────────────────────────────────────

def log(msg: str):
    """Print progress to stderr so stdout stays clean for the JSON manifest."""
    print(msg, file=sys.stderr, flush=True)


def normalise_level(name: str) -> str | None:
    """
    Match any naming variant of level-2 / level-3 and return 'level-2' or 'level-3'.
    Handles: level-2, level_2, Level2, Level 2, level-3, level_3, Level3, Level 3
    """
    m = re.match(r"(?i)level[_\- ]?([23])", name.strip())
    return f"level-{m.group(1)}" if m else None


def is_test_data_dir(name: str) -> bool:
    """Match 'Test Data', 'Test Folder', etc."""
    return bool(re.match(r"(?i)test[\s_-]*(data|folder)", name.strip()))


def docx_to_pdf(docx_path: Path, output_dir: Path) -> Path | None:
    """Convert a .docx to .pdf via LibreOffice and return the PDF path."""
    output_dir.mkdir(parents=True, exist_ok=True)
    try:
        subprocess.run(
            [SOFFICE, "--headless", "--convert-to", "pdf",
             "--outdir", str(output_dir), str(docx_path)],
            check=True,
            capture_output=True,
            timeout=120,
        )
        pdf_name = docx_path.stem + ".pdf"
        pdf_path = output_dir / pdf_name
        if pdf_path.exists():
            return pdf_path
        log(f"  WARNING: expected PDF not found at {pdf_path}")
        return None
    except Exception as e:
        log(f"  ERROR converting {docx_path.name}: {e}")
        return None


def copy_files(src_files: list[Path], dest_dir: Path):
    """Copy a list of files into dest_dir, creating it if needed."""
    if not src_files:
        return
    dest_dir.mkdir(parents=True, exist_ok=True)
    for f in src_files:
        shutil.copy2(f, dest_dir / f.name)


def web_path(abs_path: Path) -> str:
    """Return the path relative to public/ as a web-servable path."""
    return "/" + str(abs_path.relative_to(ROOT / "public"))


def human_name(folder_name: str) -> str:
    """Create a human-readable name from a folder name."""
    # Remove leading Card0X- or Card0X_ prefixes
    name = re.sub(r"^Card\s*\d+\s*[-_]\s*", "", folder_name)
    # Remove leading "The " prefix
    name = re.sub(r"^The\s+", "", name, flags=re.IGNORECASE)
    return name.strip()


def card_id(index: int) -> str:
    return f"card{index:02d}"


# ── find level dirs inside a group ───────────────────────────────────────────

def find_level_dirs(group_dir: Path) -> dict[str, Path]:
    """
    Walk the group directory to find the actual level-2 and level-3 dirs,
    regardless of nesting depth or naming convention.
    Returns e.g. {'level-2': Path(...), 'level-3': Path(...)}.
    """
    result = {}
    for dirpath, dirnames, _ in os.walk(group_dir):
        for d in dirnames:
            norm = normalise_level(d)
            if norm and norm not in result:
                result[norm] = Path(dirpath) / d
        # Stop recursing once we've found what we need
        if len(result) == 2:
            break
    return result


def find_card_dirs(level_dir: Path) -> list[Path]:
    """
    Return subdirectories of a level dir that represent individual cards.
    For level-2: typically 3 card subfolders.
    For level-3: if there are subdirs (not just test data), use them; otherwise
    the level dir itself is the single card.
    """
    if not level_dir.exists():
        return []
    subdirs = sorted([
        d for d in level_dir.iterdir()
        if d.is_dir() and not is_test_data_dir(d.name)
    ])
    return subdirs


def gather_test_data(card_dir: Path) -> list[Path]:
    """Collect non-docx data files from any Test Data / Test Folder subdir,
    or if none exists, collect non-docx files directly in card_dir."""
    test_files = []
    for child in card_dir.iterdir():
        if child.is_dir() and is_test_data_dir(child.name):
            for f in child.iterdir():
                if f.is_file():
                    test_files.append(f)
            return test_files
    # No test data subfolder -- grab non-docx files from the card dir itself
    for f in card_dir.iterdir():
        if f.is_file() and f.suffix.lower() != ".docx":
            test_files.append(f)
    return test_files


def find_docx(directory: Path) -> Path | None:
    """Find the first .docx file in a directory (non-recursive)."""
    for f in sorted(directory.iterdir()):
        if f.is_file() and f.suffix.lower() == ".docx":
            return f
    return None


# ── process level-1 cards ────────────────────────────────────────────────────

def process_level1() -> list[dict]:
    log("\n========== LEVEL 1 ==========")
    l1_dir = IEXCEL / "Level 1 Cards"
    if not l1_dir.exists():
        log("  Level 1 Cards folder not found!")
        return []

    cards = []
    for idx, use_case_dir in enumerate(sorted(l1_dir.iterdir()), start=1):
        if not use_case_dir.is_dir():
            continue
        cid = card_id(idx)
        dest = OUT / "level-1" / cid
        dest.mkdir(parents=True, exist_ok=True)

        docx = find_docx(use_case_dir)
        if not docx:
            log(f"  [{cid}] No .docx found in {use_case_dir.name}")
            continue

        log(f"  [{cid}] Converting {docx.name} ...")
        pdf = docx_to_pdf(docx, dest)

        # Test data
        td_files = gather_test_data(use_case_dir)
        td_dest = dest / "test-data"
        copy_files(td_files, td_dest)

        card_entry = {
            "id": cid,
            "name": human_name(use_case_dir.name),
            "pdf": web_path(pdf) if pdf else None,
            "testData": [
                {"name": f.name, "path": web_path(td_dest / f.name)}
                for f in td_files
            ],
        }
        cards.append(card_entry)
        log(f"         -> {card_entry['name']}  |  {len(td_files)} test file(s)")

    return cards


# ── process a single group ───────────────────────────────────────────────────

def process_group(group_dir: Path) -> dict | None:
    dir_name = group_dir.name  # e.g. "group-5-Eswar"
    m = re.match(r"group-(\d+)-(.+)", dir_name, re.IGNORECASE)
    if not m:
        log(f"  Skipping unrecognised folder: {dir_name}")
        return None

    num = int(m.group(1))
    person = m.group(2).capitalize()
    gid = f"group-{num:02d}"
    label = f"Group {num} — {person}"

    log(f"\n========== {label} ==========")

    level_dirs = find_level_dirs(group_dir)
    if not level_dirs:
        log("  No level dirs found!")
        return None

    group_entry: dict = {
        "id": gid,
        "label": label,
        "level2": [],
        "level3": [],
    }

    for level_key in ("level-2", "level-3"):
        ldir = level_dirs.get(level_key)
        if not ldir:
            log(f"  {level_key}: not found")
            continue

        card_dirs = find_card_dirs(ldir)

        if card_dirs:
            # Multiple card subfolders (typical for level-2)
            for idx, cdir in enumerate(card_dirs, start=1):
                cid = card_id(idx)
                dest = OUT / gid / level_key / cid
                dest.mkdir(parents=True, exist_ok=True)

                docx = find_docx(cdir)
                if not docx:
                    log(f"  [{level_key}/{cid}] No .docx in {cdir.name}")
                    continue

                log(f"  [{level_key}/{cid}] Converting {docx.name} ...")
                pdf = docx_to_pdf(docx, dest)

                td_files = gather_test_data(cdir)
                td_dest = dest / "test-data"
                copy_files(td_files, td_dest)

                card_entry = {
                    "id": cid,
                    "name": human_name(cdir.name),
                    "pdf": web_path(pdf) if pdf else None,
                    "testData": [
                        {"name": f.name, "path": web_path(td_dest / f.name)}
                        for f in td_files
                    ],
                }
                group_entry[level_key.replace("-", "")].append(card_entry)
                log(f"           -> {card_entry['name']}  |  {len(td_files)} test file(s)")
        else:
            # No card subdirs -- the level dir itself IS the card (typical for level-3)
            docx = find_docx(ldir)
            if not docx:
                log(f"  [{level_key}] No .docx found directly in level dir")
                continue

            cid = card_id(1)
            dest = OUT / gid / level_key / cid
            dest.mkdir(parents=True, exist_ok=True)

            log(f"  [{level_key}/{cid}] Converting {docx.name} ...")
            pdf = docx_to_pdf(docx, dest)

            td_files = gather_test_data(ldir)
            td_dest = dest / "test-data"
            copy_files(td_files, td_dest)

            card_entry = {
                "id": cid,
                "name": human_name(docx.stem.replace("_", " ")),
                "pdf": web_path(pdf) if pdf else None,
                "testData": [
                    {"name": f.name, "path": web_path(td_dest / f.name)}
                    for f in td_files
                ],
            }
            group_entry[level_key.replace("-", "")].append(card_entry)
            log(f"           -> {card_entry['name']}  |  {len(td_files)} test file(s)")

    return group_entry


# ── main ─────────────────────────────────────────────────────────────────────

def main():
    log("iExcel -> PDF converter & organiser")
    log(f"Source : {IEXCEL}")
    log(f"Output : {OUT}")
    log(f"soffice: {SOFFICE}")

    # Clean output dir
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir(parents=True, exist_ok=True)

    manifest: dict = {"level1": [], "groups": []}

    # Level 1
    manifest["level1"] = process_level1()

    # Groups 1-14
    group_dirs = sorted(
        [d for d in IEXCEL.iterdir() if d.is_dir() and d.name.startswith("group-")],
        key=lambda d: int(re.search(r"(\d+)", d.name).group(1)),
    )

    for gdir in group_dirs:
        entry = process_group(gdir)
        if entry:
            manifest["groups"].append(entry)

    # Summary
    total_pdfs = len(manifest["level1"])
    for g in manifest["groups"]:
        total_pdfs += len(g["level2"]) + len(g["level3"])
    log(f"\n========== DONE ==========")
    log(f"Total cards processed: {total_pdfs}")
    log(f"Output in: {OUT}")

    # JSON manifest to stdout
    print(json.dumps(manifest, indent=2))


if __name__ == "__main__":
    main()
