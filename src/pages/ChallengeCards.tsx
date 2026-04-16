import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, X, Copy, Check, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const challengeCards = [
  { src: "/rbp-grp-01.png", number: "Challenge Card 1", name: "Are we ready to go live? Let the agents decide." },
  { src: "/rbp-grp-02.png", number: "Challenge Card 2", name: "Branch Policy Copilot" },
  { src: "/rbp-grp-03.png", number: "Challenge Card 3", name: "Product Change Orchestrator" },
  { src: "/rbp-grp-04.png", number: "Challenge Card 4", name: "Rulebook Copilot" },
  { src: "/rbp-grp-05.png", number: "Challenge Card 5", name: "SKU Copilot" },
  { src: "/rbp-grp-06.png", number: "Challenge Card 6", name: "Vendor Assistant" },
  { src: "/rbp-grp-07.png", number: "Challenge Card 7", name: "Network Rollout Copilot" },
  { src: "/rbp-grp-08.png", number: "Challenge Card 8", name: "Exception-Handling Copilot" },
  { src: "/rbp-grp-09.png", number: "Challenge Card 9", name: "Bid Manager Assistant" },
  { src: "/rbp-grp-10.png", number: "Challenge Card 10", name: "Portfolio Delivery Copilot" },
  { src: "/rbp-grp-11.png", number: "Challenge Card 11", name: "Attrition Copilot" },
  { src: "/rbp-grp-12.png", number: "Challenge Card 12", name: "Clinical Trial Copilot" },
  { src: "/rbp-grp-13.png", number: "Challenge Card 13", name: "Shop Floor Copilot" },
  { src: "/rbp-grp-14.png", number: "Challenge Card 14", name: "Legacy Modernisation Copilot" },
];

const ChallengeCards = () => {
  const navigate = useNavigate();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [imgCopied, setImgCopied] = useState(false);

  const handleCopy = useCallback(async (e: React.MouseEvent, name: string, index: number) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(name);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  }, []);

  const handleDownload = useCallback((e: React.MouseEvent, src: string, name: string) => {
    e.stopPropagation();
    const link = document.createElement("a");
    link.href = src;
    link.download = `${name}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const handleCopyImage = useCallback(async (e: React.MouseEvent, src: string) => {
    e.stopPropagation();
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob }),
      ]);
      setImgCopied(true);
      setTimeout(() => setImgCopied(false), 2000);
    } catch {
      // fallback: copy the image URL
      await navigator.clipboard.writeText(window.location.origin + src);
      setImgCopied(true);
      setTimeout(() => setImgCopied(false), 2000);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImg(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <header className="border-b border-border bg-card px-4 py-2 shrink-0">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <h1 className="text-lg font-semibold font-display text-card-foreground">
            iExcel Challenge Cards
          </h1>
        </div>
      </header>

      {/* Cards grid */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 flex items-center justify-center">
        <div className="w-full max-w-[1600px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {challengeCards.map((challenge, index) => (
            <div
              key={index}
              className="rounded-xl border border-border bg-card text-left transition-all hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 relative cursor-pointer p-5 flex flex-col justify-center min-h-[120px]"
              onClick={() => setSelectedImg(challenge.src)}
            >
              <Button
                variant="outline"
                size="sm"
                className={`absolute top-3 right-3 h-7 text-xs ${copiedIndex === index ? "text-green-600 border-green-300" : ""}`}
                onClick={(e) => handleCopy(e, challenge.name, index)}
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
              <p className="text-xs font-bold text-foreground uppercase tracking-wide">
                {challenge.number}
              </p>
              <p className="text-sm font-semibold text-primary font-display leading-snug mt-1.5">
                {challenge.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Image overlay */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onClick={() => setSelectedImg(null)}
        >
          <img
            src={selectedImg}
            alt="Challenge card"
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={(e) => handleCopyImage(e, selectedImg)}
              className="h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
              title="Copy image"
            >
              {imgCopied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
            </button>
            <button
              onClick={(e) => {
                const card = challengeCards.find((c) => c.src === selectedImg);
                handleDownload(e, selectedImg, card?.name || "challenge-card");
              }}
              className="h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
              title="Download image"
            >
              <Download className="h-5 w-5" />
            </button>
            <button
              onClick={() => setSelectedImg(null)}
              className="h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
              title="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeCards;
