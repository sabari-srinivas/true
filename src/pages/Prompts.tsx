import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Check, Maximize, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const prompts = [
  {
    step: 0,
    label: "Learn",
    text: `You are my research aide for a True Corporation AI Immersion working session.

The project knowledge contains six research files: an executive research brief on True, a stakeholder map of the room, deep research on the CP/True digital ecosystem, an AI/data/platform/privacy/governance reference, a Thailand market & regulatory deep-dive, and a global AI benchmark report.

Read across all of them and produce:
1. A 6-bullet ecosystem snapshot (True Corp, True IDC, TrueMoney/Ascend, CP Axtra, AXONS/CPF, Amaze) — business model + current AI posture in one line each.
2. The non-negotiable governance lenses for any use case (PDPA, NBTC, BOT, ETDA AI guideline, data residency).
3. The 6 challenge candidates the research recommends for a Rapid Build session.
4. Three "watch-outs" specific to this room (e.g. post-merger Telenor/dtac heritage, light CP ecosystem headcount, two privacy gatekeepers present).

No action needed from me yet — this is context for what follows.`,
  },
  {
    step: 1,
    label: "Widen",
    text: `Act as a research aide for the [selected challenge] in the True / CP ecosystem context.

Using the project knowledge:
- List the key personas involved, drawn from realistic True/CP roles (e.g. Mari AI ops lead, NOC engineer, TrueMoney fraud analyst, CP Axtra category manager, AXONS field agronomist) — not generic archetypes.
- Top 5 pains, with each tagged to which entity feels it most (True / True IDC / TrueMoney / CP Axtra / AXONS / Amaze / cross-ecosystem).
- Current workarounds in use today (cite from the research where you can).
- Success metrics already used by True or peers — including Mari AI's published benchmarks (22M transactions / 92% digital resolution) where the challenge is care-adjacent.
- 5 insights tailored to this challenge, each grounded in a specific Thailand or True/CP signal.
- 3 risks framed against PDPA, NBTC, BOT, or post-merger integration — not generic AI risks.

Flag any ecosystem-reuse angle (i.e. could the same pattern travel to another CP/True business?).`,
  },
  {
    step: 2,
    label: "Diagnose",
    text: `Pick the [top pain-point] for this challenge. For this pain, run a Five Whys grounded in True/CP operating reality (e.g. legacy True+dtac stacks, NBTC consent rules for telco data beyond core service, federated data across ecosystem entities).

Propose 3 root-cause hypotheses. For each, specify:
- Disproof evidence required.
- The minimum data cut needed AND the lawful basis under PDPA (consent / legitimate interest / contract performance) — flag if NBTC or BOT also applies.
- The owner who would need to pull the data, named to a function (e.g. AI First programme office, True IDC platform team, TrueMoney risk, CP Axtra merchandising, Privacy/DPO team).

Output:
- A root-cause map.
- A test plan with quick-win experiments (≤2 weeks).
- A privacy & governance constraint sheet covering: purpose limitation, data minimization, retention, human-in-the-loop checkpoints, and whether a DPIA is triggered.`,
  },
  {
    step: 3,
    label: "Ideate",
    text: `Generate and cluster possible AI-driven ideas for this challenge into 3 Options:
1. Process / policy / ways-of-working
2. Analytics / ML (forecast, optimise, recommend)
3. AI & Automation (RAG, computer vision, agentic AI)

Score each option on:
- Impact (business value at True / CP scale)
- Feasibility (data readiness + PDPA/NBTC/BOT path)
- Confidence (evidence base from analogue benchmarks — cite Vodafone, Telenor, Singtel, Ant, Grab, Walmart etc. where the research supports it)
- Time-to-value
- Ecosystem reusability (can the pattern transfer across True / True IDC / TrueMoney / CP Axtra / AXONS / Amaze?)

Recommend ONE pilot with the smallest cross-system integration surface inside the True/CP stack, the clearest value proof, and a credible sponsor named to a stakeholder cluster (executive, AI First, data platform, privacy, business unit, ecosystem, partner).`,
  },
  {
    step: 4,
    label: "Brief",
    text: `For the recommended pilot, create a one-page pilot brief including:

- Target user(s) named to a True/CP role
- Problem statement
- Success metrics & baselines (use Mari AI / True published numbers where relevant; state assumptions clearly otherwise)
- Target uplift over baseline
- Key flow (5–7 steps)
- Screens / components
- Sample UI copy in BOTH Thai and English where customer-facing
- Representative sample data — synthetic, Thai-context names and values, no real PII
- Integration points across True/CP systems (e.g. Mari AI, BSS/billing, TrueMoney KYC, CP Axtra POS, True IDC hosting)
- Guardrails: PDPA lawful basis & consent flow, NBTC service-user privacy, BOT outsourcing & fraud rules where applicable, ETDA AI guideline alignment, data residency (Thai sovereignty), bias tests, human-in-the-loop checkpoints, fallback behaviour, DPIA status
- Decision rights: who can approve scaling, who must be consulted (Privacy/DPO, AI First, business sponsor)`,
  },
  {
    step: 5,
    label: "Build",
    text: `You are a product design expert. Using only the brief above, write a single [platform] product requirements prompt that includes:

- Product name + one-liner (actions, process, capabilities)
- Who it's for (named True/CP role)
- Screens + key components
- Brand colours: True Corp red/orange family for True-anchored use cases; neutral CP palette for ecosystem-anchored ones (state which you chose and why)
- Main user flow
- Sample data: synthetic, Thai-named, Thai Baht where currency applies, plausible Bangkok/regional locations, NO real PII or real customer identifiers
- Concise headlines & CTAs in both Thai and English where the screen is customer-facing; English-only acceptable for back-office screens
- UI instructions
- Success metric card showing baseline vs target uplift
- Constraints panel listing PDPA / NBTC / BOT / data-residency rules the prototype must visibly respect (e.g. consent banner, audit log entry, human-approval gate)

Return the [platform] prompt only.`,
  },
];

const Prompts = () => {
  const navigate = useNavigate();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showFullscreen, setShowFullscreen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowFullscreen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCopy = useCallback(async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  }, []);

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <header className="border-b border-border bg-card px-4 py-2 shrink-0">
        <div className="max-w-[1600px] mx-auto flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <h1 className="text-lg font-semibold font-display text-card-foreground">
            From Abstract Ideas to Working Demos
          </h1>
        </div>
      </header>

      {/* Main content: Image left, All prompts right */}
      <div className="flex-1 min-h-0">
        <div className="max-w-[1600px] mx-auto h-full p-4 flex flex-col lg:flex-row gap-5">
          {/* Left: Image – sticky, stretched vertically */}
          <div className="w-[45%] shrink-0 rounded-lg border border-border overflow-hidden bg-black relative hidden lg:flex flex-col">
            <div className="w-full h-full bg-black flex items-center justify-center">
              <img
                src="/dd-prompt.jpeg"
                alt="Framework diagram"
                className="w-full h-full object-contain"
              />
            </div>
            <button
              className="absolute top-3 right-3 h-8 w-8 rounded-md bg-black/60 hover:bg-black/80 text-white flex items-center justify-center z-10"
              onClick={() => setShowFullscreen(true)}
            >
              <Maximize className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile: Image shown above prompts */}
          <div className="lg:hidden rounded-lg border border-border overflow-hidden bg-black relative mb-4">
            <img
              src="/dd-prompt.jpeg"
              alt="Framework diagram"
              className="w-full h-auto object-contain"
            />
            <button
              className="absolute top-3 right-3 h-8 w-8 rounded-md bg-black/60 hover:bg-black/80 text-white flex items-center justify-center"
              onClick={() => setShowFullscreen(true)}
            >
              <Maximize className="h-4 w-4" />
            </button>
          </div>

          {/* Right: All prompts visible, scrollable */}
          <div className="flex-1 min-w-0 overflow-y-auto pr-1 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
              <h2 className="text-base font-bold font-display text-foreground">
                Follow the {prompts.length}-Step Framework
              </h2>
              <div className="flex items-center gap-2">
                <a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer">
                  <Button size="sm" className="bg-chatgpt hover:bg-chatgpt/90 text-primary-foreground">
                    <ExternalLink className="h-3.5 w-3.5 mr-1" /> Open ChatGPT
                  </Button>
                </a>
                <a href="https://gemini.google.com" target="_blank" rel="noopener noreferrer">
                  <Button size="sm" className="bg-gemini hover:bg-gemini/90 text-primary-foreground">
                    <ExternalLink className="h-3.5 w-3.5 mr-1" /> Open Gemini
                  </Button>
                </a>
                <a href="https://claude.ai" target="_blank" rel="noopener noreferrer">
                  <Button size="sm" className="bg-claude hover:bg-claude/90 text-primary-foreground">
                    <ExternalLink className="h-3.5 w-3.5 mr-1" /> Open Claude
                  </Button>
                </a>
              </div>
            </div>

            {prompts.map((prompt, index) => (
              <div
                key={prompt.step}
                className="rounded-lg border border-border bg-card overflow-hidden"
              >
                {/* Card header */}
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                      {prompt.step}
                    </span>
                    <span className="text-sm font-semibold text-card-foreground font-display">
                      {prompt.label}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`h-7 text-xs ${copiedIndex === index ? "text-green-600 border-green-300" : ""}`}
                    onClick={() => handleCopy(prompt.text, index)}
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="h-3 w-3 mr-1" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 mr-1" /> Copy
                      </>
                    )}
                  </Button>
                </div>

                {/* Prompt content */}
                <div className="px-4 py-3">
                  <p className="text-sm text-card-foreground leading-relaxed whitespace-pre-line">
                    {prompt.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen image overlay */}
      {showFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onClick={() => setShowFullscreen(false)}
        >
          <img
            src="/dd-prompt.jpeg"
            alt="Framework diagram fullscreen"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setShowFullscreen(false)}
            className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Prompts;
