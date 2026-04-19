import { useNavigate } from "react-router-dom";
import { ArrowLeft, Images, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const sections = [
  {
    title: "Challenge Cards",
    description: "Explore 14 challenge cards across business groups. Each card frames a real-world problem with why it's hard, why GenAI, and success criteria.",
    icon: Images,
    path: "/challenge-cards",
    gradient: "from-primary to-accent",
  },
  {
    title: "Prompts",
    description: "Double Diamond framework prompts for the AI immersion session. Copy and use with your favourite AI tool.",
    icon: MessageSquare,
    path: "/prompts",
    gradient: "from-accent to-primary",
  },
];

const Immersion = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card px-4 py-2 shrink-0">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <h1 className="text-lg font-semibold font-display text-card-foreground">
            Rapid Build Prototyping
          </h1>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl w-full">
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

export default Immersion;
