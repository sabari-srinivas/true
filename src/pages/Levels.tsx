import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

const levels = [
  {
    id: 1,
    title: "Level 1",
    description: "Foundational use cases — understand the problem space and key personas across business groups.",
    path: "/levels/1",
    gradient: "from-blue-500 to-blue-700",
  },
  {
    id: 2,
    title: "Level 2",
    description: "Intermediate challenge cards — reconcilers, classifiers, and gap finders with test data sets.",
    path: "/levels/2",
    gradient: "from-purple-500 to-purple-700",
  },
  {
    id: 3,
    title: "Level 3",
    description: "Advanced dashboards — sprint health, delivery, and workforce analytics with real data.",
    path: "/levels/3",
    gradient: "from-orange-500 to-orange-700",
  },
];

const Levels = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card px-4 py-2 shrink-0">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <h1 className="text-lg font-semibold font-display text-card-foreground">
            Level 1, Level 2, Level 3
          </h1>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl w-full">
          {levels.map((level) => (
            <button
              key={level.id}
              onClick={() => navigate(level.path)}
              className="group relative overflow-hidden rounded-xl bg-card border border-border p-6 text-left transition-all hover:shadow-lg hover:border-primary/30 hover:-translate-y-1"
            >
              <div className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${level.gradient}`} />
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Layers className="h-6 w-6 text-primary" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold font-display text-card-foreground mb-2 group-hover:text-primary transition-colors">
                    {level.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {level.description}
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

export default Levels;
