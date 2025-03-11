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
      return 'Moze warto rozwazyc';
    case 3:
      return 'Zdecydowanie tak!';
    case 4:
      return 'OK, jesli jemu/jej bardzo zalezy';
    default:
      return 'Brak odpowiedzi';
  }
};

// Function to normalize Polish characters
const normalizePolishChars = (text: string): string => {
  if (!text) return '';
  
  return text
    .replace(/ą/g, 'a').replace(/Ą/g, 'A')
    .replace(/ć/g, 'c').replace(/Ć/g, 'C')
    .replace(/ę/g, 'e').replace(/Ę/g, 'E')
    .replace(/ł/g, 'l').replace(/Ł/g, 'L')
    .replace(/ń/g, 'n').replace(/Ń/g, 'N')
    .replace(/ó/g, 'o').replace(/Ó/g, 'O')
    .replace(/ś/g, 's').replace(/Ś/g, 'S')
    .replace(/ź/g, 'z').replace(/Ź/g, 'Z')
    .replace(/ż/g, 'z').replace(/Ż/g, 'Z');
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

    const safeResponses = responses || [];
    console.log("Generating PDF with responses:", safeResponses.length);
    setIsGenerating(true);
    
    try {
      // Create new PDF document
      const doc = new jsPDF();
      doc.setFont("helvetica");
      
      // Add title and order info with normalized Polish characters
      doc.setFontSize(18);
      doc.text("Raport Secret Sparks", 14, 20);
      
      doc.setFontSize(12);
      doc.text(`Zamowienie: #${order.id.substring(0, 8)}...`, 14, 30);
      doc.text(`Data zamowienia: ${new Date(order.created_at).toLocaleString('pl-PL')}`, 14, 37);
      doc.text(`Zamawiajacy: ${normalizePolishChars(order.user_name)} (${order.user_email})`, 14, 44);
      doc.text(`Partner: ${normalizePolishChars(order.partner_name)} (${order.partner_email})`, 14, 51);
      
      // Group and deduplicate responses
      const deduplicateResponses = (responses: SurveyResponse[], type: 'user' | 'partner') => {
        const seen = new Set<string>();
        return responses
          .filter(r => r.user_type === type)
          .sort((a, b) => {
            const dateA = new Date(a.created_at || 0).getTime();
            const dateB = new Date(b.created_at || 0).getTime();
            return dateB - dateA; // Sort by newest first
          })
          .filter(response => {
            const key = `${response.question_id}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          });
      };

      const userResponses = deduplicateResponses(safeResponses, 'user');
      const partnerResponses = deduplicateResponses(safeResponses, 'partner');

      console.log("Filtered responses for PDF:", {
        userResponses: userResponses.length,
        partnerResponses: partnerResponses.length
      });

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
          let questionText = questionObj && questionObj.text 
            ? questionObj.text 
            : `Pytanie (ID: ${response.question_id})`;
            
          // Normalize Polish characters in question text
          questionText = normalizePolishChars(questionText);
          
          return [
            questionText,
            normalizePolishChars(getRatingLabel(response.answer))
          ];
        });
      };
      
      let currentY = 65;
      
      // Add user responses section header
      doc.setFontSize(14);
      doc.text("Odpowiedzi zamawiajacego", 14, currentY);
      currentY += 10;
      
      if (userResponses.length > 0) {
        // Add user responses table
        autoTable(doc, {
          startY: currentY,
          head: [['Pytanie', 'Odpowiedz']],
          body: formatResponsesForTable(userResponses),
          styles: {
            font: 'helvetica',
            fontStyle: 'normal'
          },
          tableLineColor: [0, 0, 0],
          tableLineWidth: 0.1,
        });
        
        // Get the last Y position after the table
        // @ts-ignore - this property is added by autoTable
        currentY = doc.lastAutoTable.finalY + 15;
      } else {
        doc.setFontSize(12);
        doc.text("Brak odpowiedzi od zamawiajacego", 14, currentY);
        currentY += 15;
      }

      // Add partner responses section header
      doc.setFontSize(14);
      doc.text("Odpowiedzi partnera", 14, currentY);
      currentY += 10;
      
      if (partnerResponses.length > 0) {
        autoTable(doc, {
          startY: currentY,
          head: [['Pytanie', 'Odpowiedz']],
          body: formatResponsesForTable(partnerResponses),
          styles: {
            font: 'helvetica',
            fontStyle: 'normal'
          },
          tableLineColor: [0, 0, 0],
          tableLineWidth: 0.1,
        });
      } else {
        doc.setFontSize(12);
        doc.text("Brak odpowiedzi od partnera", 14, currentY);
      }

      // Add a note at the bottom if there are no responses at all
      if (userResponses.length === 0 && partnerResponses.length === 0) {
        doc.setFontSize(12);
        doc.text("Uwaga: To zamowienie nie zawiera zadnych odpowiedzi ankietowych.", 14, doc.internal.pageSize.height - 20);
      }

      // Save PDF with orderId in the name
      doc.save(`secret-sparks-raport-${order.id.substring(0, 8)}.pdf`);
      
      toast.success("Raport zostal wygenerowany pomyslnie");
    } catch (error) {
      console.error("Blad podczas generowania PDF:", error);
      toast.error("Wystapil blad podczas generowania raportu");
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
