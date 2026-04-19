import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, FileSpreadsheet, ChevronDown, ChevronUp, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TestFile {
  name: string;
  path: string;
}

interface Card {
  id: string;
  name: string;
  tool?: string;
  pdf: string | null;
  testData: TestFile[];
}

interface Group {
  id: string;
  label: string;
  cards: Card[];
}

interface LevelDetailProps {
  level: number;
  groups: Group[];
  defaultExpanded?: boolean;
}

type PromptsMap = Record<string, string[]>;

const LevelDetail = ({ level, groups, defaultExpanded }: LevelDetailProps) => {
  const navigate = useNavigate();
  const [expandedGroup, setExpandedGroup] = useState<string | null>(
    defaultExpanded && groups.length === 1 ? groups[0].id : null
  );
  const [selectedCard, setSelectedCard] = useState<{ card: Card; groupId: string } | null>(null);
  const [prompts, setPrompts] = useState<PromptsMap>({});
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  useEffect(() => {
    fetch("/levels/prompts.json")
      .then((r) => r.json())
      .then((data: PromptsMap) => setPrompts(data))
      .catch(() => {});
  }, []);

  const handleCopy = useCallback(async (text: string, idx: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  }, []);

  const handleDownload = (path: string, name: string) => {
    const link = document.createElement("a");
    link.href = path;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAll = (files: TestFile[]) => {
    files.forEach((f, i) => {
      setTimeout(() => handleDownload(f.path, f.name), i * 200);
    });
  };

  const getPromptKey = (groupId: string, cardId: string): string => {
    if (groupId === "level-1") return `level-1/${cardId}`;
    const levelKey = level === 2 ? "level2" : "level3";
    return `${groupId}/${levelKey}/${cardId}`;
  };

  const getPromptLabel = (groupId: string, cardId: string, idx: number, total: number): string => {
    // Level 1 cards with agent builder prompt + test case inputs
    if (groupId === "level-1" && (cardId === "card04" || cardId === "card05") && total > 1) {
      if (idx === 0) return "Agent Builder Prompt";
      return `Test Case ${idx} Input`;
    }
    if (total === 1) return "Prompt";
    return `Prompt ${idx + 1}`;
  };

  // Card detail view
  if (selectedCard) {
    const { card, groupId } = selectedCard;
    const key = getPromptKey(groupId, card.id);
    const cardPrompts = prompts[key] || [];

    return (
      <div className="h-screen bg-background flex flex-col overflow-hidden">
        <header className="border-b border-border bg-card px-3 sm:px-4 py-2 shrink-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <Button variant="ghost" size="sm" className="shrink-0" onClick={() => { setSelectedCard(null); setCopiedIdx(null); }}>
                <ArrowLeft className="h-4 w-4 mr-1" /> Back
              </Button>
              <h1 className="text-sm sm:text-lg font-semibold font-display text-card-foreground truncate">
                {formatName(card.name)}
              </h1>
            </div>
            {card.testData.length > 1 && (
              <Button
                variant="outline"
                size="sm"
                className="shrink-0 hidden sm:flex"
                onClick={() => handleDownloadAll(card.testData)}
              >
                <Download className="h-4 w-4 mr-1" /> Download All Test Data
              </Button>
            )}
            {card.testData.length > 1 && (
              <Button
                variant="outline"
                size="sm"
                className="shrink-0 sm:hidden"
                onClick={() => handleDownloadAll(card.testData)}
              >
                <Download className="h-4 w-4" />
              </Button>
            )}
          </div>
        </header>

        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-4 p-3 sm:p-4 overflow-y-auto lg:overflow-hidden">
          {/* PDF Viewer */}
          {card.pdf && (
            <div className="min-h-[50vh] lg:min-h-0 lg:flex-1 bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <iframe
                src={card.pdf}
                className="w-full h-full"
                title={card.name}
              />
            </div>
          )}

          {/* Right panel: Test Data + Prompts */}
          <div className="lg:w-96 shrink-0 overflow-y-auto space-y-4">
            {/* Test Data Files */}
            {card.testData.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-4">
                <h3 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wide">
                  Test Data Files
                </h3>
                <div className="space-y-2">
                  {card.testData.map((file) => (
                    <div
                      key={file.name}
                      className="flex items-center justify-between gap-2 rounded-lg border border-border p-3 bg-muted/30"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <FileSpreadsheet className="h-4 w-4 text-green-600 shrink-0" />
                        <span className="text-sm text-foreground truncate">{file.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 shrink-0"
                        onClick={() => handleDownload(file.path, file.name)}
                      >
                        <Download className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Prompts */}
            {cardPrompts.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-4">
                <h3 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wide">
                  {cardPrompts.length === 1 ? "Prompt" : "Prompts"}
                </h3>
                <div className="space-y-3">
                  {cardPrompts.map((prompt, idx) => {
                    const label = getPromptLabel(groupId, card.id, idx, cardPrompts.length);
                    return (
                    <div
                      key={idx}
                      className="rounded-lg border border-border bg-muted/30 p-3"
                    >
                      {cardPrompts.length > 1 && (
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                          {label}
                        </p>
                      )}
                      <p className="text-xs text-foreground leading-relaxed line-clamp-4 whitespace-pre-line">
                        {prompt}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className={`mt-2 h-7 text-xs w-full ${copiedIdx === idx ? "text-green-600 border-green-300" : ""}`}
                        onClick={() => handleCopy(prompt, idx)}
                      >
                        {copiedIdx === idx ? (
                          <><Check className="h-3 w-3 mr-1" /> Copied</>
                        ) : (
                          <><Copy className="h-3 w-3 mr-1" /> Copy {label}</>
                        )}
                      </Button>
                    </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Group listing view
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card px-4 py-2 shrink-0">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/levels")}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <h1 className="text-lg font-semibold font-display text-card-foreground">
            Level {level}
          </h1>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-3">
          {groups.map((group) => {
            const isExpanded = expandedGroup === group.id;
            return (
              <div
                key={group.id}
                className="rounded-xl border border-border bg-card overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/30 transition-colors"
                  onClick={() => setExpandedGroup(isExpanded ? null : group.id)}
                >
                  <div>
                    <p className="text-base font-semibold text-foreground font-display">
                      {group.label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {group.cards.length} use case{group.cards.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>

                {isExpanded && (
                  <div className="border-t border-border px-5 py-3 space-y-2">
                    {group.cards.map((card) => (
                      <button
                        key={card.id}
                        onClick={() => setSelectedCard({ card, groupId: group.id })}
                        className="w-full flex items-center justify-between rounded-lg border border-border p-4 text-left hover:bg-muted/30 hover:border-primary/30 transition-all"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-primary font-display">
                            {formatName(card.name)}{card.tool && <span> — {card.tool}</span>}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {card.testData.length} test data file{card.testData.length !== 1 ? "s" : ""}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 text-muted-foreground">
                          <FileSpreadsheet className="h-4 w-4" />
                          <ChevronDown className="h-4 w-4 -rotate-90" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

function formatName(name: string): string {
  return name.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2");
}

export default LevelDetail;
