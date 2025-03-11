
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
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";

const App = () => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  }));

  console.log("Rendering App component");

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SurveyProvider>
            <AdminAuthProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/survey" element={<SurveyPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/thank-you" element={<ThankYouPage />} />
                <Route path="/spe43al-adm1n-p4nel" element={<AdminLogin />} />
                <Route path="/spe43al-adm1n-p4nel/dashboard" element={<AdminDashboard />} />
                <Route path="/spe43al-adm1n-p4nel/orders" element={<AdminOrders />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AdminAuthProvider>
          </SurveyProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
