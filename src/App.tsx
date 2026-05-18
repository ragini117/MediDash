
import { AnimatePresence } from "framer-motion";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

import Dashboard from "./pages/Dashboard";
import DiseaseDetection from "./pages/DiseaseDetection";
import HealthNews from "./pages/HealthNews";
import HealthTips from "./pages/HealthTips";
import HealthCheck from "./pages/HealthCheck";
import LearnMore from "./pages/LearnMore";
import Insurance from "./pages/Insurance";
import Guidance from "./pages/Guidance";
import NotFound from "./pages/NotFound";
import Brain from "./pages/Brain";
import SymptomResult from "./pages/SymptomResult";
import Chatbot from "./pages/Chatbot";
import Lungs from "./pages/Cancer";

import { Toaster } from "@/components/ui/toaster";
import FloatingChatbot from "@/components/FloatingChatbot";
import Lung from "./pages/Cancer";

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/healthcheck" element={<HealthCheck />} />
        <Route path="/detect" element={<DiseaseDetection />} />
        <Route path="/news" element={<HealthNews />} />
        <Route path="/tips" element={<HealthTips />} />
        <Route path="/learn" element={<LearnMore />} />
        <Route path="/insurance" element={<Insurance />} />
        <Route path="/guidance" element={<Guidance />} />
        <Route path="/brain" element={<Brain />} />
        <Route path="/lung" element={<Lung />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/SymptomResult" element={<SymptomResult />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <TooltipProvider>
          <BrowserRouter>
            <Toaster />
            <Sonner />

            <div className="min-h-screen flex flex-col">
              <Header />

              <main className="flex-1">
                <AnimatedRoutes />
              </main>

              {/* Floating AI Chatbot */}
              <FloatingChatbot />

              <Footer />
            </div>

          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

