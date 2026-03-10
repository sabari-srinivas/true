import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Check, ChevronLeft, ChevronRight, Maximize, Minimize } from "lucide-react";
import { Button } from "@/components/ui/button";
import doubleDiamondGeneral from "@/assets/double_diamond_general.jpg";
import DoubleDiamondAI from "@/components/DoubleDiamondAI";

const prompts = [
  {
    step: 0,
    label: "Learn",
    text: `Here is a deep research report for the topic we are going to discuss today. No action required. Use this report as additional context for your responses apart from web search and other resources.`,
  },
  {
    step: 1,
    label: "Widen",
    text: `Act as a research aide for [selected challenge]. List key personas, top pains, current workarounds, and success metrics. Return 5 insights & 3 risks tailored to this challenge context.`,
  },
  {
    step: 2,
    label: "Diagnose",
    text: `Let's pick the [top-pain-point] for this challenge. For this pain, run a Five Whys. Propose 3 root-cause hypotheses and the disproof evidence for each. Specify the minimum data cut & owners to pull. Output a root-cause map, test plan, and privacy constraints.`,
  },
  {
    step: 3,
    label: "Ideate + Converge",
    text: `Generate and Cluster possible AI driven ideas into 3 Options:

1. Process (policy, ways of working),
2. Analytics/ML (forecast, optimise, recommend),
3. AI and Automation (Computer Vision, Retrieval augmented generation/Agentic AI, etc...).

Score each on Impact × Feasibility × Confidence × Time-to-Value. Recommend one pilot with the smallest integration surface and clearest value proof.`,
  },
  {
    step: 4,
    label: "Brief",
    text: `For the recommended pilot, create a one-page pilot brief including: Target user(s), problem statement, success metrics & baselines, target uplift, key flow (5–7 steps), screens/components, sample UI copy, representative sample data, integration points, and relevant guardrails (GDPR/PCI, domain specific regulation boundaries, bias tests, fallback behaviour)`,
  },
  {
    step: 5,
    label: "Build",
    text: `You are a product design expert. Using only the brief above, write a single [platform] product requirements prompt that includes: Product name + one liner description (actions, process, capabilities), who it's for, screens + key components, brand colors, main user flow, sample data, concise headlines/CTAs, UI instructions, success metric card, constraints (no PII). Return the [platform] prompt only.`,
  },
];

const Prompts = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const [fs1, setFs1] = useState(false);
  const [fs2, setFs2] = useState(false);

  const toggleFullscreen = (ref: React.RefObject<HTMLDivElement>, setFs: (v: boolean) => void) => {
    if (!ref.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().then(() => setFs(false));
    } else {
      ref.current.requestFullscreen().then(() => setFs(true));
    }
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const current = prompts[activeStep];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <h1 className="text-lg font-semibold font-display text-card-foreground">
            AI Tools + Rapid Builders — Double Diamond Prompts
          </h1>
        </div>
      </header>

      {/* Top: Double Diamond Images */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto p-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div ref={img1Ref} className="rounded-lg border border-border overflow-hidden bg-background relative group">
              <div className="px-3 py-2 bg-muted border-b border-border flex items-center justify-between">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Revamped Double Diamond — General Framework
                </p>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toggleFullscreen(img1Ref, setFs1)}>
                  {fs1 ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                </Button>
              </div>
              <div className="flex items-center justify-center bg-background p-2">
                <img
                  src={doubleDiamondGeneral}
                  alt="Revamped Double Diamond general framework"
                  className="w-full h-auto object-contain max-h-[80vh]"
                />
              </div>
            </div>
            <div ref={img2Ref} className="rounded-lg border border-border overflow-hidden bg-background relative group">
              <div className="px-3 py-2 bg-muted border-b border-border flex items-center justify-between">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  AI Tools + Rapid Builders — From Abstract Ideas to Working Demos in Days
                </p>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toggleFullscreen(img2Ref, setFs2)}>
                  {fs2 ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                </Button>
              </div>
              <div className="flex items-center justify-center bg-background p-2">
                <DoubleDiamondAI />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Step Navigator Prompts */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4">
          <h2 className="text-lg font-bold font-display text-foreground mb-4">
            Follow the {prompts.length}-Step Framework
          </h2>

          {/* Step buttons */}
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            {prompts.map((prompt, index) => (
              <button
                key={prompt.step}
                onClick={() => setActiveStep(index)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                  activeStep === index
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                }`}
              >
                <span
                  className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                    activeStep === index
                      ? "bg-primary-foreground text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {prompt.step}
                </span>
                {prompt.label}
              </button>
            ))}
          </div>

          {/* Active prompt card */}
          <div className="rounded-lg border border-border bg-card overflow-hidden animate-fade-in" key={activeStep}>
            {/* Card header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  Step {current.step}
                </span>
                <span className="text-base font-semibold text-card-foreground font-display">
                  {current.label}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopy(current.text)}
                className={copied ? "text-green-600 border-green-300" : ""}
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 mr-1" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 mr-1" /> Copy Prompt
                  </>
                )}
              </Button>
            </div>

            {/* Prompt content */}
            <div className="p-5">
              <div className="rounded-md bg-muted/50 border border-border p-5">
                <p className="text-sm text-card-foreground leading-relaxed whitespace-pre-line">
                  {current.text}
                </p>
              </div>
            </div>

            {/* Navigation arrows */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-muted/30">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveStep((s) => Math.max(0, s - 1))}
                disabled={activeStep === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
              </Button>
              <span className="text-xs text-muted-foreground">
                Step {current.step} of {prompts.length - 1}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveStep((s) => Math.min(prompts.length - 1, s + 1))}
                disabled={activeStep === prompts.length - 1}
              >
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prompts;
