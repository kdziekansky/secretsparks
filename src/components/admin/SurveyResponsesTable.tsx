import React, { useEffect, useState } from 'react';
import { questionsDatabase } from '@/contexts/questions-data';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

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
  const [isQuestionsDbLoaded, setIsQuestionsDbLoaded] = useState<boolean>(false);
  
  // Check if questions database is properly initialized on component mount
  useEffect(() => {
    const isValidQuestionsDb = questionsDatabase && 
                              Array.isArray(questionsDatabase) && 
                              questionsDatabase.length > 0;
    
    if (!isValidQuestionsDb) {
      console.error('Questions database is missing or empty', questionsDatabase);
    } else {
      console.log(`Questions database has ${questionsDatabase.length} questions`);
      setIsQuestionsDbLoaded(true);
    }
  }, []);

  // Ensure we don't try to work with undefined responses
  const safeResponses = responses || [];
  
  if (safeResponses.length === 0) {
    return (
      <div className="text-center p-2 text-muted-foreground">
        Brak odpowiedzi od {userType === 'user' ? 'zamawiającego' : 'partnera'}.
      </div>
    );
  }

  // Filter and deduplicate responses
  const uniqueResponses = (() => {
    // Keep track of seen question IDs
    const seen = new Set<string>();
    // Filter responses and keep only the latest one for each question
    return safeResponses
      .filter(response => (
        response && 
        typeof response === 'object' && 
        response.question_id &&
        typeof response.answer === 'number'
      ))
      // Sort by creation date (newest first) to ensure we get the latest answer for each question
      .sort((a, b) => {
        const dateA = new Date(a.created_at || 0).getTime();
        const dateB = new Date(b.created_at || 0).getTime();
        return dateB - dateA; // Descending order (newest first)
      })
      // Keep only one response per question_id (the first one after sorting, which is the newest)
      .filter(response => {
        const questionId = response.question_id;
        if (seen.has(questionId)) {
          console.log(`Filtering out duplicate response for question ${questionId}`);
          return false;
        }
        seen.add(questionId);
        return true;
      })
      // Now sort by created_at ascending for display order
      .sort((a, b) => {
        const dateA = new Date(a.created_at || 0).getTime();
        const dateB = new Date(b.created_at || 0).getTime();
        return dateA - dateB; // Ascending order by creation date
      });
  })();

  console.log(`Filtered ${uniqueResponses.length} unique responses for ${userType} from ${safeResponses.length} total`);

  if (uniqueResponses.length === 0) {
    return (
      <div className="text-center p-2 text-muted-foreground">
        Brak poprawnych odpowiedzi od {userType === 'user' ? 'zamawiającego' : 'partnera'}.
      </div>
    );
  }

  // If questions database isn't loaded properly, show an alert
  if (!isQuestionsDbLoaded) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Błąd: Baza pytań jest niedostępna. Nie można wyświetlić treści pytań.
        </AlertDescription>
      </Alert>
    );
  }

  // Create a local copy of questions for safety
  const questions = Array.isArray(questionsDatabase) ? [...questionsDatabase] : [];

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
          {uniqueResponses.map((response, index) => {
            // Use a unique key that doesn't depend on potentially undefined values
            const rowKey = `${response.id || ''}${response.question_id || ''}${index}`;
            
            try {
              // Find question by ID, with fallback to display question ID if not found
              const questionText = (() => {
                if (!questions || !Array.isArray(questions)) {
                  return `Pytanie (ID: ${response.question_id})`;
                }
                
                const question = questions.find(q => q && q.id === response.question_id);
                return question && question.text 
                  ? question.text 
                  : `Pytanie (ID: ${response.question_id})`;
              })();
              
              return (
                <TableRow key={rowKey}>
                  <TableCell className="font-medium">
                    {questionText}
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
