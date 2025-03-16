
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
import FAQPage from "./pages/FAQPage";
import SecurityPage from "./pages/SecurityPage";
import SecretAIPage from "./pages/SecretAIPage";
import RulesPage from "./pages/RulesPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import ContactPage from "./pages/ContactPage";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";
import ScrollToTop from "./components/ScrollToTop";

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
          <ScrollToTop />
          <SurveyProvider>
            <AdminAuthProvider>
              <div className="dark">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/idea" element={<Index />} />
                  <Route path="/zasady" element={<RulesPage />} />
                  <Route path="/regulamin" element={<TermsPage />} />
                  <Route path="/polityka-prywatnosci" element={<PrivacyPage />} />
                  <Route path="/kontakt" element={<ContactPage />} />
                  <Route path="/o-nas" element={<Index />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/bezpieczenstwo" element={<SecurityPage />} />
                  <Route path="/secretai" element={<SecretAIPage />} />
                  <Route path="/survey" element={<SurveyPage />} />
                  <Route path="/payment" element={<PaymentPage />} />
                  <Route path="/thank-you" element={<ThankYouPage />} />
                  <Route path="/spe43al-adm1n-p4nel" element={<AdminLogin />} />
                  <Route 
                    path="/spe43al-adm1n-p4nel/dashboard" 
                    element={
                      <ProtectedAdminRoute>
                        <AdminDashboard />
                      </ProtectedAdminRoute>
                    } 
                  />
                  <Route 
                    path="/spe43al-adm1n-p4nel/orders" 
                    element={
                      <ProtectedAdminRoute>
                        <AdminOrders />
                      </ProtectedAdminRoute>
                    } 
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </AdminAuthProvider>
          </SurveyProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
