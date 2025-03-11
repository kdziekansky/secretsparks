
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { FileDown, Loader2, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { questionsDatabase } from '@/contexts/questions-data';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { supabase } from '@/integrations/supabase/client';

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

const ReportGenerator: React.FC<ReportGeneratorProps> = ({ responses: initialResponses, order }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasResponses, setHasResponses] = useState(false);
  const [responses, setResponses] = useState<SurveyResponse[] | null>(initialResponses);

  // Add additional logging to debug responses
  console.log("ReportGenerator received initial responses:", initialResponses);
  console.log("ReportGenerator received order:", order);

  // Effect to check for responses on mount and when responses change
  useEffect(() => {
    const hasValidResponses = !!(responses && responses.length > 0);
    console.log("Setting hasResponses to:", hasValidResponses);
    setHasResponses(hasValidResponses);
  }, [responses]);

  // Update local responses when props change
  useEffect(() => {
    setResponses(initialResponses);
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
      
      const { data, error } = await supabase
        .from('survey_responses')
        .select('*')
        .eq('order_id', order.id);
        
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
        setResponses([]);
        setHasResponses(false);
        toast.info('Brak odpowiedzi dla tego zamówienia w bazie danych');
      }
    } catch (error) {
      console.error('Error refreshing responses:', error);
      toast.error('Wystąpił błąd podczas odświeżania odpowiedzi');
    } finally {
      setIsRefreshing(false);
    }
  };

  const generatePDF = () => {
    if (!order) {
      toast.error("Brak danych zamówienia do wygenerowania raportu");
      return;
    }

    if (!responses || responses.length === 0) {
      toast.error("Brak odpowiedzi ankietowych do wygenerowania raportu");
      console.log("Missing responses data:", { responses, order });
      return;
    }

    setIsGenerating(true);
    console.log("Generating PDF with:", { responses, order });
    
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
      const userResponses = responses.filter(r => r.user_type === 'user');
      const partnerResponses = responses.filter(r => r.user_type === 'partner');

      console.log("Filtered responses for PDF:", { userResponses, partnerResponses });

      // Helper to format responses for the PDF table
      const formatResponsesForTable = (responses: SurveyResponse[]) => {
        return responses.map(response => {
          const question = questionsDatabase.find(q => q.id === response.question_id);
          return [
            question?.text || 'Pytanie niedostępne',
            response.answer.toString() + '/5'
          ];
        });
      };

      // Add user responses table
      doc.setFontSize(14);
      doc.text("Odpowiedzi zamawiającego", 14, 65);
      
      if (userResponses.length > 0) {
        doc.autoTable({
          startY: 70,
          head: [['Pytanie', 'Odpowiedź']],
          body: formatResponsesForTable(userResponses),
        });
      } else {
        doc.setFontSize(12);
        doc.text("Brak odpowiedzi od zamawiającego", 14, 75);
      }

      // Add partner responses table
      const partnerStartY = userResponses.length > 0 ? (doc as any).lastAutoTable.finalY + 15 : 80;
      
      doc.setFontSize(14);
      doc.text("Odpowiedzi partnera", 14, partnerStartY);
      
      if (partnerResponses.length > 0) {
        doc.autoTable({
          startY: partnerStartY + 5,
          head: [['Pytanie', 'Odpowiedź']],
          body: formatResponsesForTable(partnerResponses),
        });
      } else {
        doc.setFontSize(12);
        doc.text("Brak odpowiedzi od partnera", 14, partnerStartY + 10);
      }

      // Save PDF
      doc.save(`secret-sparks-raport-${order.id.substring(0, 8)}.pdf`);
      
      toast.success("Raport został wygenerowany pomyślnie");
    } catch (error) {
      console.error("Błąd podczas generowania PDF:", error);
      toast.error("Wystąpił błąd podczas generowania raportu");
    } finally {
      setIsGenerating(false);
    }
  };

  const buttonDisabled = isGenerating || !order || !hasResponses;
  
  console.log("Button disabled status:", buttonDisabled, { hasResponses, isGenerating, hasOrder: !!order });

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
