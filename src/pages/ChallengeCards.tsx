import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Maximize, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const challengeImages = [
  { src: "/challenge1.jpeg", number: "Challenge 1", name: "Fragmented data limits whole-of-system decisions" },
  { src: "/challenge2.jpeg", number: "Challenge 2", name: "Youth participation drops sharply during the teenage years" },
  { src: "/challenge3.jpeg", number: "Challenge 3", name: "Volunteer-run clubs are stretched by invisible operational work" },
  { src: "/challenge4.jpeg", number: "Challenge 4", name: "Quality coaching is uneven outside major centres" },
  { src: "/challenge5.jpeg", number: "Challenge 5", name: "Integrity and safeguarding are still too reactive" },
  { src: "/challenge6.jpeg", number: "Challenge 6", name: "Para-sport pathways still face access and fairness barriers" },
  { src: "/challenge7.jpeg", number: "Challenge 7", name: "Sport diplomacy creates strategic value, but the impact is hard to prove" },
  { src: "/challenge8.jpeg", number: "Challenge 8", name: "Lower-tier sport struggles to convert visibility into sustainable economics" },
];

const ChallengeCards = () => {
  const navigate = useNavigate();
  const [fullscreenImg, setFullscreenImg] = useState<string | null>(null);

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <header className="border-b border-border bg-card px-4 py-2 shrink-0">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <h1 className="text-lg font-semibold font-display text-card-foreground">
            Challenge Cards
          </h1>
        </div>
      </header>

      {/* Cards grid – full width, full height */}
      <div className="flex-1 min-h-0 overflow-y-auto p-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 h-full">
          {challengeImages.map((challenge, index) => (
            <div
              key={index}
              className="relative rounded-lg border border-border overflow-hidden bg-card flex flex-col"
            >
              {/* Title above image */}
              <div className="px-3 py-2.5 border-b border-border shrink-0">
                <p className="text-sm font-bold text-primary uppercase tracking-wide">
                  {challenge.number}
                </p>
                <p className="text-base font-semibold text-card-foreground font-display leading-snug mt-0.5 line-clamp-2">
                  {challenge.name}
                </p>
              </div>

              {/* Image – zoomed out to show full content */}
              <div className="flex-1 min-h-0 overflow-hidden bg-white">
                <img
                  src={challenge.src}
                  alt={`${challenge.number}: ${challenge.name}`}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Fullscreen button – always visible */}
              <button
                onClick={() => setFullscreenImg(challenge.src)}
                className="absolute top-2 right-2 h-7 w-7 rounded-md bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors z-10"
              >
                <Maximize className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen overlay */}
      {fullscreenImg && (
        <div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onClick={() => setFullscreenImg(null)}
        >
          <img
            src={fullscreenImg}
            alt="Challenge fullscreen"
            className="max-w-[75vw] max-h-[75vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setFullscreenImg(null)}
            className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ChallengeCards;
