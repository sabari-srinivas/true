import { useNavigate } from "react-router-dom";
import { Images, MessageSquare, FileText, ArrowRight } from "lucide-react";

const sections = [
  {
    title: "Challenge Cards",
    description: "12 True / CP challenge cards across telecom, fintech, retail, and enterprise — framing the problem and where GenAI changes the economics.",
    icon: Images,
    path: "/challenge-cards",
    gradient: "from-primary to-accent",
  },
  {
    title: "Deep Research Report",
    description: "True / CP AI Immersion deep research report — view in-app or download for offline reference.",
    icon: FileText,
    path: "/deep-research",
    gradient: "from-accent to-primary",
  },
  {
    title: "Prompts",
    description: "Double Diamond framework prompts for the True Corp AI immersion session. Copy and use with your favourite AI tool.",
    icon: MessageSquare,
    path: "/prompts",
    gradient: "from-primary to-accent",
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-6xl w-full animate-fade-in">
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-xs sm:text-sm font-medium tracking-widest uppercase text-muted-foreground mb-3">
            True Corp Program &bull; Rapid Build Immersion
          </p>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold font-display text-foreground mb-4">
            True Corp AI Coaching Toolkit
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Challenge cards and a step-by-step prompt framework for the True / CP AI Immersion — from problem context to a working prototype.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {sections.map((section) => (
            <button
              key={section.path}
              onClick={() => navigate(section.path)}
              className="group relative overflow-hidden rounded-xl bg-card border border-border p-6 text-left transition-all hover:shadow-lg hover:border-primary/30 hover:-translate-y-1"
            >
              <div className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${section.gradient}`} />
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <section.icon className="h-6 w-6 text-primary" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold font-display text-card-foreground mb-2 group-hover:text-primary transition-colors">
                    {section.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {section.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
