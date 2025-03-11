
import React from 'react';
import { questionsDatabase } from '@/contexts/questions-data';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface SurveyResponse {
  id: string;
  order_id: string;
  question_id: string;
  answer: number;
  user_type: 'user' | 'partner';
  created_at: string;
  user_gender?: string;
  partner_gender?: string;
  game_level?: string;
}

interface SurveyResponsesTableProps {
  responses: SurveyResponse[] | null | undefined;
  userType: 'user' | 'partner';
}

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

const SurveyResponsesTable: React.FC<SurveyResponsesTableProps> = ({ 
  responses, 
  userType 
}) => {
  if (!responses || !Array.isArray(responses) || responses.length === 0) {
    return (
      <div className="text-center p-2 text-muted-foreground">
        Brak odpowiedzi od {userType === 'user' ? 'zamawiającego' : 'partnera'}.
      </div>
    );
  }

  const safeResponses = responses.filter(response => (
    response && 
    typeof response === 'object' && 
    response.question_id &&
    typeof response.answer === 'number'
  ));

  if (safeResponses.length === 0) {
    return (
      <div className="text-center p-2 text-muted-foreground">
        Brak poprawnych odpowiedzi od {userType === 'user' ? 'zamawiającego' : 'partnera'}.
      </div>
    );
  }

  const renderResponseRow = (response: SurveyResponse, index: number) => {
    try {
      const question = questionsDatabase.find(q => q.id === response.question_id);
      const questionText = question?.text || `Pytanie (${response.question_id})`;
      const answer = typeof response.answer === 'number' ? response.answer : 0;
      
      return (
        <TableRow key={response.id || `row-${index}`}>
          <TableCell className="font-medium">
            {questionText}
          </TableCell>
          <TableCell>
            <Badge variant="outline">
              {getRatingLabel(answer)}
            </Badge>
          </TableCell>
          <TableCell>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-primary h-2.5 rounded-full" 
                style={{ width: `${(answer / 4) * 100}%` }}
              ></div>
            </div>
          </TableCell>
        </TableRow>
      );
    } catch (error) {
      console.error(`Error rendering response row at index ${index}:`, error);
      return null;
    }
  };

  return (
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60%]">Pytanie</TableHead>
            <TableHead>Ocena</TableHead>
            <TableHead>Wizualizacja</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {safeResponses.map((response, index) => renderResponseRow(response, index))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SurveyResponsesTable;
