
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { FileDown, Loader2, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { questionsDatabase } from '@/contexts/questions-data';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { supabase, fetchFromSupabase } from '@/integrations/supabase/client';

// Add the type definition for jsPDF-autotable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

interface SurveyResponse {
  id: string;
  order_id: string;
  question_id: string;
  answer: number;
  user_type: 'user' | 'partner';
  created_at: string;
}

interface Order {
  id: string;
  user_name: string;
  user_email: string;
  partner_name: string;
  partner_email: string;
  status: string;
  created_at: string;
}

interface ReportGeneratorProps {
  responses: SurveyResponse[] | null;
  order: Order | null;
}

// Function to get human-readable rating label
const getRatingLabel = (rating: number): string => {
  switch (rating) {
    case 1:
      return 'Nie, to nie dla mnie';
    case 2:
      return 'Może warto rozważyć';
    case 3:
      return 'Zdecydowanie tak!';
    case 4:
      return 'OK, jeśli jemu bardzo zależy';
    default:
      return 'Brak odpowiedzi';
  }
};

const ReportGenerator: React.FC<ReportGeneratorProps> = ({ responses: initialResponses, order }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasResponses, setHasResponses] = useState(false);
  const [responses, setResponses] = useState<SurveyResponse[] | null>(initialResponses);

  // Log diagnostics
  console.log("ReportGenerator received initial responses:", initialResponses?.length || 0);
  console.log("ReportGenerator received order:", order?.id);

  // Effect to check for responses on mount and when responses change
  useEffect(() => {
    const hasValidResponses = !!(responses && responses.length > 0);
    console.log("Setting hasResponses to:", hasValidResponses);
    setHasResponses(hasValidResponses);
  }, [responses]);

  // Update local responses when props change
  useEffect(() => {
    if (initialResponses !== null) {
      console.log("Updating local responses from props:", initialResponses.length);
      setResponses(initialResponses);
      setHasResponses(!!(initialResponses && initialResponses.length > 0));
    }
  }, [initialResponses]);

  // Function to refresh responses directly from the database
  const refreshResponses = async () => {
    if (!order?.id) {
      toast.error("Brak ID zamówienia do odświeżenia odpowiedzi");
      return;
    }

    setIsRefreshing(true);
    try {
      console.log(`Refreshing responses for order ID: ${order.id}`);
      
      // First attempt: Try the Edge Function with URL parameters
      try {
        console.log('Attempting to fetch responses using Edge Function');
        
        const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-survey-responses?orderId=${encodeURIComponent(order.id)}`;
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`Edge function returned status ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.responses && result.responses.length > 0) {
          console.log(`Retrieved ${result.responses.length} responses from Edge Function`);
          setResponses(result.responses);
          setHasResponses(true);
          toast.success(`Odpowiedzi odświeżone (${result.responses.length})`);
          return;
        } else {
          console.log('Edge Function returned no responses, trying alternative methods');
        }
      } catch (edgeFnError) {
        console.error('Edge Function error:', edgeFnError);
        // Continue to fallback methods
      }
      
      // Try direct API call 
      try {
        const directData = await fetchFromSupabase(`survey_responses?order_id=eq.${encodeURIComponent(order.id.trim())}`);
        
        console.log(`Direct API call returned ${directData?.length || 0} responses`);
        
        if (directData && directData.length > 0) {
          setResponses(directData as SurveyResponse[]);
          setHasResponses(true);
          toast.success(`Odpowiedzi odświeżone (${directData.length})`);
          return;
        }
      } catch (err) {
        console.error('Error with direct API call:', err);
        // Continue to try with SDK
      }
      
      // If direct call failed or returned no data, try standard SDK query
      const { data, error } = await supabase
        .from('survey_responses')
        .select('*')
        .eq('order_id', order.id.trim());
        
      if (error) {
        console.error('Error refreshing responses:', error);
        toast.error('Błąd podczas odświeżania odpowiedzi: ' + error.message);
        return;
      }
      
      console.log(`Fetched ${data?.length || 0} responses directly:`, data);
      
      if (data && data.length > 0) {
        setResponses(data as SurveyResponse[]);
        setHasResponses(true);
        toast.success(`Odpowiedzi odświeżone (${data.length})`);
      } else {
        // Last resort: try with exact UUID format without modifications
        const { data: exactData, error: exactError } = await supabase
          .from('survey_responses')
          .select('*')
          .filter('order_id', 'eq', order.id);
          
        if (exactError) {
          console.error('Error with exact match query:', exactError);
          setResponses([]);
        } else if (exactData && exactData.length > 0) {
          console.log(`Found ${exactData.length} responses with exact filter query`);
          setResponses(exactData as SurveyResponse[]);
          setHasResponses(true);
          toast.success(`Odpowiedzi odświeżone (${exactData.length})`);
          return;
        } else {
          setResponses([]);
          setHasResponses(false);
          toast.info('Brak odpowiedzi dla tego zamówienia w bazie danych');
        }
      }
    } catch (error) {
      console.error('Error refreshing responses:', error);
      toast.error('Wystąpił błąd podczas odświeżania odpowiedzi');
      setResponses([]);
    } finally {
      setIsRefreshing(false);
    }
  };

  const generatePDF = () => {
    if (!order) {
      toast.error("Brak danych zamówienia do wygenerowania raportu");
      return;
    }

    // Ensure responses is an array, even if empty
    const safeResponses = responses || [];
    
    console.log("Generating PDF with responses:", safeResponses.length);
    setIsGenerating(true);
    
    try {
      // Create new PDF document
      const doc = new jsPDF();
      
      // Add title and order info
      doc.setFontSize(18);
      doc.text("Raport Secret Sparks", 14, 20);
      
      doc.setFontSize(12);
      doc.text(`Zamówienie: #${order.id.substring(0, 8)}...`, 14, 30);
      doc.text(`Data zamówienia: ${new Date(order.created_at).toLocaleString('pl-PL')}`, 14, 37);
      doc.text(`Zamawiający: ${order.user_name} (${order.user_email})`, 14, 44);
      doc.text(`Partner: ${order.partner_name} (${order.partner_email})`, 14, 51);
      
      // Group responses
      const userResponses = safeResponses.filter(r => r.user_type === 'user');
      const partnerResponses = safeResponses.filter(r => r.user_type === 'partner');

      console.log("Filtered responses for PDF:", { userResponses: userResponses.length, partnerResponses: partnerResponses.length });

      // Helper to format responses for the PDF table
      const formatResponsesForTable = (responses: SurveyResponse[]) => {
        return responses.map(response => {
          const questionObj = questionsDatabase.find(q => q.id === response.question_id);
          const questionText = questionObj ? questionObj.text : `Pytanie (ID: ${response.question_id})`;
          return [
            questionText,
            getRatingLabel(response.answer)
          ];
        });
      };

      // Fixed starting position
      let currentY = 65;
      
      // Add user responses section header
      doc.setFontSize(14);
      doc.text("Odpowiedzi zamawiającego", 14, currentY);
      currentY += 10;
      
      if (userResponses.length > 0) {
        // Add user responses table
        doc.autoTable({
          startY: currentY,
          head: [['Pytanie', 'Odpowiedź']],
          body: formatResponsesForTable(userResponses),
        });
        
        // Get the last Y position after the table
        currentY = (doc as any).lastAutoTable.finalY + 15;
      } else {
        doc.setFontSize(12);
        doc.text("Brak odpowiedzi od zamawiającego", 14, currentY);
        currentY += 15;
      }

      // Add partner responses section header
      doc.setFontSize(14);
      doc.text("Odpowiedzi partnera", 14, currentY);
      currentY += 10;
      
      if (partnerResponses.length > 0) {
        // Add partner responses table
        doc.autoTable({
          startY: currentY,
          head: [['Pytanie', 'Odpowiedź']],
          body: formatResponsesForTable(partnerResponses),
        });
      } else {
        doc.setFontSize(12);
        doc.text("Brak odpowiedzi od partnera", 14, currentY);
      }

      // Add a note at the bottom if there are no responses at all
      if (userResponses.length === 0 && partnerResponses.length === 0) {
        doc.setFontSize(12);
        doc.text("Uwaga: To zamówienie nie zawiera żadnych odpowiedzi ankietowych.", 14, doc.internal.pageSize.height - 20);
      }

      // Save PDF with orderId in the name
      doc.save(`secret-sparks-raport-${order.id.substring(0, 8)}.pdf`);
      
      toast.success("Raport został wygenerowany pomyślnie");
    } catch (error) {
      console.error("Błąd podczas generowania PDF:", error);
      toast.error("Wystąpił błąd podczas generowania raportu");
    } finally {
      setIsGenerating(false);
    }
  };

  // Updated button disabled logic - enable the button for all orders
  // Only disable when we're actively generating
  const buttonDisabled = isGenerating || !order;
  
  console.log("Button disabled status:", buttonDisabled, { 
    hasResponses, 
    isGenerating, 
    hasOrder: !!order,
    responsesLength: responses?.length || 0,
    responsesIsNull: responses === null 
  });

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-2">
        <Button 
          variant="default" 
          onClick={generatePDF} 
          disabled={buttonDisabled}
          className="w-full md:w-auto"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generowanie...
            </>
          ) : (
            <>
              <FileDown className="mr-2 h-4 w-4" />
              Pobierz raport PDF
            </>
          )}
        </Button>
        
        <Button
          variant="outline"
          onClick={refreshResponses}
          disabled={isRefreshing || !order}
          className="w-full md:w-auto"
        >
          {isRefreshing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Odświeżanie...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Odśwież odpowiedzi
            </>
          )}
        </Button>
      </div>
      
      {!hasResponses && (
        <p className="text-sm text-muted-foreground mt-2">
          {responses === null 
            ? "Ładowanie odpowiedzi ankietowych..." 
            : "Brak odpowiedzi ankietowych dla tego zamówienia."}
        </p>
      )}
    </div>
  );
};

export default ReportGenerator;
