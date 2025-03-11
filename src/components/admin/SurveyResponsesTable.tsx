
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
  
  // First, check if responses is null, undefined, or empty
  if (!responses || !Array.isArray(responses) || responses.length === 0) {
    return (
      <div className="text-center p-2 text-muted-foreground">
        Brak odpowiedzi od {userType === 'user' ? 'zamawiającego' : 'partnera'}.
      </div>
    );
  }

  try {
    // Create a safe copy of the responses data with guaranteed valid properties
    const safeResponses = [];
    
    // Process each response individually and only add valid ones to our array
    for (let i = 0; i < responses.length; i++) {
      const response = responses[i];
      
      // Skip if the response is null or not an object
      if (!response || typeof response !== 'object') {
        console.warn(`Skipping invalid response at index ${i}:`, response);
        continue;
      }
      
      // Create a safe entry with fallbacks for every property
      const safeResponse = {
        id: response.id || `temp-id-${i}-${Date.now()}`,
        order_id: response.order_id || '',
        question_id: response.question_id || '',
        answer: typeof response.answer === 'number' ? response.answer : 0,
        user_type: response.user_type || userType,
        created_at: response.created_at || new Date().toISOString()
      };
      
      // Only add if question_id exists (needed for table rendering)
      if (safeResponse.question_id) {
        safeResponses.push(safeResponse);
      } else {
        console.warn(`Skipping response at index ${i} due to missing question_id:`, response);
      }
    }
    
    console.log(`Processed ${safeResponses.length} valid responses out of ${responses.length} total`);
    
    // If no valid responses are found after filtering
    if (safeResponses.length === 0) {
      return (
        <div className="text-center p-2 text-muted-foreground">
          Brak poprawnych odpowiedzi od {userType === 'user' ? 'zamawiającego' : 'partnera'}.
        </div>
      );
    }
    
    // Render table with safe responses
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
            {safeResponses.map((response) => {
              // Get the question, provide fallback if not found
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
            })}
          </TableBody>
        </Table>
      </div>
    );
  } catch (error) {
    // Catch any unexpected errors during rendering
    console.error('Error rendering survey responses table:', error);
    return (
      <div className="text-center p-2 text-red-500 border border-red-200 rounded">
        Wystąpił błąd podczas wyświetlania odpowiedzi. Spróbuj odświeżyć stronę.
      </div>
    );
  }
};

export default SurveyResponsesTable;
