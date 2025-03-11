
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { FileDown, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { questionsDatabase } from '@/contexts/questions-data';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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
  const [responses, setResponses] = useState<SurveyResponse[] | null>(initialResponses);

  // Log diagnostics
  console.log("ReportGenerator received initial responses:", initialResponses?.length || 0);
  console.log("ReportGenerator received order:", order?.id);

  // Update local responses when props change
  useEffect(() => {
    if (initialResponses !== null) {
      console.log("Updating local responses from props:", initialResponses.length);
      setResponses(initialResponses);
    }
  }, [initialResponses]);

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
      doc.text(`Z a m a w i a j ą c y: ${order.user_name} (${order.user_email})`, 14, 44);
      doc.text(`Partner: ${order.partner_name} (${order.partner_email})`, 14, 51);
      
      // Group responses
      const userResponses = safeResponses.filter(r => r.user_type === 'user');
      const partnerResponses = safeResponses.filter(r => r.user_type === 'partner');

      console.log("Filtered responses for PDF:", { userResponses: userResponses.length, partnerResponses: partnerResponses.length });

      // Helper to format responses for the table
      const formatResponsesForTable = (responses: SurveyResponse[]) => {
        return responses.map(response => {
          // Safety check to make sure questionsDatabase is defined and is an array
          if (!questionsDatabase || !Array.isArray(questionsDatabase)) {
            console.error('Questions database is not defined or not an array:', questionsDatabase);
            return [
              `Pytanie (ID: ${response.question_id})`,
              getRatingLabel(response.answer)
            ];
          }
          
          // Find the question by ID
          const questionObj = questionsDatabase.find(q => q && q.id === response.question_id);
          
          // Get question text or fallback to ID if not found
          const questionText = questionObj && questionObj.text 
            ? questionObj.text 
            : `Pytanie (ID: ${response.question_id})`;
            
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
        autoTable(doc, {
          startY: currentY,
          head: [['Pytanie', 'Odpowiedź']],
          body: formatResponsesForTable(userResponses),
        });
        
        // Get the last Y position after the table
        // @ts-ignore - this property is added by autoTable
        currentY = doc.lastAutoTable.finalY + 15;
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
        autoTable(doc, {
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
    isGenerating, 
    hasOrder: !!order,
    responsesLength: responses?.length || 0,
    responsesIsNull: responses === null 
  });

  return (
    <div>
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
    </div>
  );
};

export default ReportGenerator;
