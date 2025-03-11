
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileDown, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { questionsDatabase } from '@/contexts/questions-data';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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

const ReportGenerator: React.FC<ReportGeneratorProps> = ({ responses, order }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = () => {
    if (!responses || responses.length === 0 || !order) {
      toast.error("Brak danych do wygenerowania raportu");
      return;
    }

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
      const userResponses = responses.filter(r => r.user_type === 'user');
      const partnerResponses = responses.filter(r => r.user_type === 'partner');

      // Helper to format responses for the PDF table
      const formatResponsesForTable = (responses: SurveyResponse[], userType: string) => {
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
          body: formatResponsesForTable(userResponses, 'user'),
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
          body: formatResponsesForTable(partnerResponses, 'partner'),
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

  return (
    <Button 
      variant="default" 
      onClick={generatePDF} 
      disabled={isGenerating || !responses || responses.length === 0 || !order}
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
  );
};

export default ReportGenerator;
