import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Levels from "./pages/Levels.tsx";
import Level1 from "./pages/Level1.tsx";
import Level2 from "./pages/Level2.tsx";
import Level3 from "./pages/Level3.tsx";
import Immersion from "./pages/Immersion.tsx";
import DeepResearch from "./pages/DeepResearch.tsx";
import Prompts from "./pages/Prompts.tsx";
import ChallengeCards from "./pages/ChallengeCards.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/levels" element={<Levels />} />
          <Route path="/levels/1" element={<Level1 />} />
          <Route path="/levels/2" element={<Level2 />} />
          <Route path="/levels/3" element={<Level3 />} />
          <Route path="/immersion" element={<Immersion />} />
          <Route path="/deep-research" element={<DeepResearch />} />
          <Route path="/prompts" element={<Prompts />} />
          <Route path="/challenge-cards" element={<ChallengeCards />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
