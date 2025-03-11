
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
  responses: SurveyResponse[];
  userType: 'user' | 'partner';
}

const SurveyResponsesTable: React.FC<SurveyResponsesTableProps> = ({ 
  responses, 
  userType 
}) => {
  // Add console log to debug responses data
  console.log(`Rendering ${userType} responses table with:`, responses);
  
  // Check if responses is null, undefined, or empty
  if (!responses || !Array.isArray(responses) || responses.length === 0) {
    return (
      <div className="text-center p-2 text-muted-foreground">
        Brak odpowiedzi od {userType === 'user' ? 'zamawiającego' : 'partnera'}.
      </div>
    );
  }

  // Create a deep copy of responses to avoid direct mutation
  // and provide safe default values for any missing properties
  const safeResponses = responses.map(response => {
    if (!response) {
      console.error('Null or undefined response item found');
      return null;
    }
    
    // Ensure we have an object with all required properties
    return {
      id: response.id || `temp-${Math.random().toString(36).substring(2, 9)}`,
      order_id: response.order_id || '',
      question_id: response.question_id || '',
      answer: typeof response.answer === 'number' ? response.answer : 0,
      user_type: response.user_type || userType,
      created_at: response.created_at || new Date().toISOString()
    };
  });
  
  // Filter out any null items that resulted from invalid responses
  const validResponses = safeResponses.filter(response => response !== null);

  if (validResponses.length === 0) {
    console.error('No valid responses found in data:', responses);
    return (
      <div className="text-center p-2 text-muted-foreground">
        Dane odpowiedzi są nieprawidłowe. Spróbuj odświeżyć.
      </div>
    );
  }

  console.log(`Found ${validResponses.length} valid responses out of ${responses.length} total`);

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
          {validResponses.map(response => {
            // Double check that response is valid before accessing properties
            if (!response || !response.question_id) {
              console.error('Invalid response item found during rendering:', response);
              return null;
            }
            
            const question = questionsDatabase.find(q => q.id === response.question_id);
            return (
              <TableRow key={response.id}>
                <TableCell className="align-top">
                  <div>
                    <span className="font-medium">
                      {question?.text || `Pytanie (${response.question_id})`}
                    </span>
                    {question?.description && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {question.description}
                      </p>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {response.answer}/5
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-primary h-2.5 rounded-full" 
                      style={{ width: `${(response.answer / 5) * 100}%` }}
                    ></div>
                  </div>
                </TableCell>
              </TableRow>
            );
          }).filter(Boolean)}
        </TableBody>
      </Table>
    </div>
  );
};

export default SurveyResponsesTable;
