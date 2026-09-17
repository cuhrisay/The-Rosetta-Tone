import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/site/Layout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import WorkWithMe from "./pages/WorkWithMe";
import ClientWins from "./pages/ClientWins";
import Faqs from "./pages/Faqs";
import FreeGuide from "./pages/FreeGuide";
import HormoneAnswersBlog from "./pages/HormoneAnswersBlog";
import CycleSyncingWorkouts from "./pages/blog/CycleSyncingWorkouts";
import GetToned from "./pages/blog/GetToned";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/11-coaching" element={<WorkWithMe />} />
            <Route path="/client-testimonials" element={<ClientWins />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/free-guide" element={<FreeGuide />} />
            <Route path="/hormone-answers-blog" element={<HormoneAnswersBlog />} />
            <Route path="/hormone-answers-blog/cycle-syncing-workouts" element={<CycleSyncingWorkouts />} />
            <Route path="/hormone-answers-blog/get-toned-without-losing-curves" element={<GetToned />} />
            {/* Old duplicate post's URL — merged into cycle-syncing-workouts. Server-side
                301 lives in public/.htaccess; this covers client-side nav + local dev. */}
            <Route path="/hormone-answers-blog/menstrual-cycle-exercise" element={<Navigate to="/hormone-answers-blog/cycle-syncing-workouts" replace />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
