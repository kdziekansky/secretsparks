
import React, { useEffect } from 'react';
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
  // Sprawdź czy mamy dostęp do bazy pytań na starcie komponentu
  useEffect(() => {
    if (!questionsDatabase || !Array.isArray(questionsDatabase) || questionsDatabase.length === 0) {
      console.error('Questions database is missing or empty', questionsDatabase);
    } else {
      console.log(`Questions database has ${questionsDatabase.length} questions`);
    }
  }, []);

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

  // Pre-check if we have valid questionsDatabase to avoid runtime errors
  if (!questionsDatabase || !Array.isArray(questionsDatabase) || questionsDatabase.length === 0) {
    console.error('Questions database is missing or empty');
    return (
      <div className="text-center p-2 text-muted-foreground text-red-500">
        Błąd: Baza pytań jest niedostępna
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
            try {
              // Try to find the question in the database
              let question = null;
              
              if (questionsDatabase && Array.isArray(questionsDatabase)) {
                question = questionsDatabase.find(q => q.id === response.question_id);
              }
              
              // If question not found, render a placeholder row
              if (!question) {
                console.log(`Question not found for ID: ${response.question_id}`);
                return (
                  <TableRow key={response.id || `row-${index}`}>
                    <TableCell className="font-medium text-muted-foreground">
                      Pytanie (ID: {response.question_id})
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {getRatingLabel(response.answer)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
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
            } catch (error) {
              console.error(`Error rendering response row at index ${index}:`, error);
              // Fallback rendering in case of an error
              return (
                <TableRow key={`error-${index}`}>
                  <TableCell className="font-medium text-muted-foreground">
                    Błąd wyświetlania pytania
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-red-500">
                      Błąd
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            }
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default SurveyResponsesTable;
