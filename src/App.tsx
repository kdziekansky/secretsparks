
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SurveyProvider } from "./contexts/SurveyContext";
import { useState } from "react";
import Index from "./pages/Index";
import SurveyPage from "./pages/SurveyPage";
import NotFound from "./pages/NotFound";
import PaymentPage from "./pages/PaymentPage";
import ThankYouPage from "./pages/ThankYouPage";

// Create a client with error handling
const App = () => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
        // Use onError option for error handling in react-query
        onError: (error) => {
          console.error("React Query error:", error);
        }
      },
    },
  }));

  console.log("Rendering App component");

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <SurveyProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/survey" element={<SurveyPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/thank-you" element={<ThankYouPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SurveyProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
