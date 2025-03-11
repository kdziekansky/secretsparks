
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

  console.log(`Filtered ${safeResponses.length} responses for ${userType}`);

  if (safeResponses.length === 0) {
    return (
      <div className="text-center p-2 text-muted-foreground">
        Brak poprawnych odpowiedzi od {userType === 'user' ? 'zamawiającego' : 'partnera'}.
      </div>
    );
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[70%]">Pytanie</TableHead>
            <TableHead>Ocena</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {safeResponses.map((response, index) => {
            // Looking at the questionsDatabase structure, we need to use 'id' not 'question_id'
            // And 'text' property instead of 'title'
            const question = questionsDatabase.find(q => q.id === response.question_id);
            
            if (!question) {
              console.log(`Question not found for ID: ${response.question_id}`);
              return null;
            }
            
            return (
              <TableRow key={response.id || `row-${index}`}>
                <TableCell className="font-medium">
                  {question.text}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {getRatingLabel(response.answer)}
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default SurveyResponsesTable;
