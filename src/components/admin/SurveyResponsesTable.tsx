
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

const SurveyResponsesTable: React.FC<SurveyResponsesTableProps> = ({ 
  responses, 
  userType 
}) => {
  // Add console log to debug responses data
  console.log(`SurveyResponsesTable received responses:`, responses);
  console.log(`SurveyResponsesTable userType:`, userType);
  
  // Check if responses exist and are in array format
  if (!responses) {
    console.log("Responses is null or undefined");
    return (
      <div className="text-center p-2 text-muted-foreground">
        Brak odpowiedzi od {userType === 'user' ? 'zamawiającego' : 'partnera'}.
      </div>
    );
  }
  
  if (!Array.isArray(responses)) {
    console.error("Responses is not an array:", responses);
    return (
      <div className="text-center p-2 text-muted-foreground">
        Błąd formatu danych odpowiedzi.
      </div>
    );
  }
  
  if (responses.length === 0) {
    console.log("Responses array is empty");
    return (
      <div className="text-center p-2 text-muted-foreground">
        Brak odpowiedzi od {userType === 'user' ? 'zamawiającego' : 'partnera'}.
      </div>
    );
  }
  
  // Create a safe copy of responses
  const safeResponses: SurveyResponse[] = [];
  
  // Safely process each response
  for (let i = 0; i < responses.length; i++) {
    try {
      const response = responses[i];
      
      // Skip if response is null, undefined, or not an object
      if (!response || typeof response !== 'object') {
        console.warn(`Skipping invalid response at index ${i}:`, response);
        continue;
      }
      
      // Ensure all required properties exist with fallbacks
      const safeResponse: SurveyResponse = {
        id: response.id || `temp-${i}-${Date.now()}`,
        order_id: response.order_id || '',
        question_id: response.question_id || '',
        answer: typeof response.answer === 'number' ? response.answer : 0,
        user_type: response.user_type || userType,
        created_at: response.created_at || new Date().toISOString(),
        user_gender: response.user_gender || undefined,
        partner_gender: response.partner_gender || undefined,
        game_level: response.game_level || undefined
      };
      
      // Only add if the response has a question_id (needed for rendering)
      if (safeResponse.question_id) {
        safeResponses.push(safeResponse);
      } else {
        console.warn(`Skipping response at index ${i} due to missing question_id:`, response);
      }
    } catch (error) {
      console.error(`Error processing response at index ${i}:`, error);
    }
  }
  
  console.log(`Processed ${safeResponses.length} valid responses out of ${responses.length} total`);
  
  // If no valid responses after processing
  if (safeResponses.length === 0) {
    return (
      <div className="text-center p-2 text-muted-foreground">
        Brak poprawnych odpowiedzi od {userType === 'user' ? 'zamawiającego' : 'partnera'}.
      </div>
    );
  }
  
  // Function to safely render each row
  const renderResponseRow = (response: SurveyResponse, index: number) => {
    try {
      // Get the question, provide fallback if not found
      const question = questionsDatabase.find(q => q.id === response.question_id);
      const questionText = question?.text || `Pytanie (${response.question_id})`;
      const questionDescription = question?.description || '';
      const answer = typeof response.answer === 'number' ? response.answer : 0;
      
      return (
        <TableRow key={response.id || `row-${index}`}>
          <TableCell className="align-top">
            <div>
              <span className="font-medium">{questionText}</span>
              {questionDescription && (
                <p className="text-xs text-muted-foreground mt-1">
                  {questionDescription}
                </p>
              )}
            </div>
          </TableCell>
          <TableCell>
            <Badge variant="outline">
              {answer}/5
            </Badge>
          </TableCell>
          <TableCell>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-primary h-2.5 rounded-full" 
                style={{ width: `${(answer / 5) * 100}%` }}
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
  
  // Render the table with safe data
  try {
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
  } catch (error) {
    console.error('Error rendering survey responses table:', error);
    return (
      <div className="text-center p-2 text-red-500 border border-red-200 rounded">
        Wystąpił błąd podczas wyświetlania odpowiedzi. Spróbuj odświeżyć stronę.
      </div>
    );
  }
};

export default SurveyResponsesTable;
