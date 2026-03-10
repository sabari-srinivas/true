import { useNavigate } from "react-router-dom";
import { FileText, MessageSquare, Images, ArrowRight } from "lucide-react";

const sections = [
  {
    title: "Challenge Cards",
    description: "Explore the 8 challenge cards for the immersion session. View high-quality images with fullscreen support.",
    icon: Images,
    path: "/challenge-cards",
    gradient: "from-primary to-accent",
  },
  {
    title: "Deep Research Reports",
    description: "View the NZ Sports AI consolidated research report in an interactive book format. Download or share with AI assistants.",
    icon: FileText,
    path: "/deep-research",
    gradient: "from-accent to-primary",
  },
  {
    title: "Prompts",
    description: "Double Diamond framework prompts for AI-powered coaching. Copy and use with your favourite AI tool.",
    icon: MessageSquare,
    path: "/prompts",
    gradient: "from-primary to-accent",
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full animate-fade-in">
        <div className="text-center mb-12">
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-3">
            NZ Sport Leaders Delegation &bull; India 2026
          </p>
          <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-4">
            AI Coaching Toolkit
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Resources for the rapid build immersion session — research, frameworks, and prompts to accelerate AI adoption in NZ sport.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {sections.map((section) => (
            <button
              key={section.path}
              onClick={() => navigate(section.path)}
              className="group relative overflow-hidden rounded-xl bg-card border border-border p-8 text-left transition-all hover:shadow-lg hover:border-primary/30 hover:-translate-y-1"
            >
              <div className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${section.gradient}`} />
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <section.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold font-display text-card-foreground mb-2 group-hover:text-primary transition-colors">
                    {section.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {section.description}
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all mt-1" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
