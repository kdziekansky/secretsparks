
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

// Create React Query client with error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      onError: (error) => {
        console.error("React Query error:", error);
      },
    },
  },
});

const App = () => {
  console.log("Rendering App component");
  const [error, setError] = useState<Error | null>(null);

  // Simple error boundary
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="glass-panel p-8 w-full max-w-xl text-center">
          <h1 className="text-2xl font-bold mb-4">Coś poszło nie tak</h1>
          <p className="mb-4">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Odśwież stronę
          </button>
        </div>
      </div>
    );
  }

  // Wrap app in error handler
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
