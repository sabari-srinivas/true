import { useNavigate } from "react-router-dom";
import { MessageSquare, Images, ArrowRight } from "lucide-react";

const sections = [
  {
    title: "Challenge Cards",
    description: "Explore 14 challenge cards across industries — from banking and pharma to telecom and manufacturing. Each card frames a real-world problem with why it's hard, why GenAI, and success criteria.",
    icon: Images,
    path: "/challenge-cards",
    gradient: "from-primary to-accent",
  },
  {
    title: "Prompts",
    description: "Double Diamond framework prompts for the AI immersion session. Copy and use with your favourite AI tool.",
    icon: MessageSquare,
    path: "/prompts",
    gradient: "from-primary to-accent",
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-6xl w-full animate-fade-in">
        <div className="text-center mb-12">
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-3">
            iExcel Program &bull; Rapid Build Immersion
          </p>
          <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-4">
            iExcel AI Coaching Toolkit
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Resources for the iExcel rapid build immersion — challenge cards and prompts to accelerate GenAI adoption across industries.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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
