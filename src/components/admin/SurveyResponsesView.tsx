
import React from 'react';
import { Loader2 } from 'lucide-react';
import { questionsDatabase } from '@/contexts/questions-data';

interface SurveyResponse {
  id: string;
  order_id: string;
  question_id: string;
  answer: number;
  user_type: 'user' | 'partner';
  created_at: string;
}

interface SurveyResponsesViewProps {
  responses: SurveyResponse[] | null;
  isLoading: boolean;
}

const SurveyResponsesView: React.FC<SurveyResponsesViewProps> = ({ responses, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!responses || responses.length === 0) {
    return (
      <div className="text-center p-4 text-muted-foreground">
        Brak odpowiedzi z ankiety.
      </div>
    );
  }

  // Group responses by user type
  const userResponses = responses.filter(r => r.user_type === 'user');
  const partnerResponses = responses.filter(r => r.user_type === 'partner');

  // Function to render responses for a specific user type
  const renderUserResponses = (responses: SurveyResponse[], userType: string) => {
    if (responses.length === 0) {
      return (
        <div className="text-center p-2 text-muted-foreground">
          Brak odpowiedzi od {userType === 'user' ? 'zamawiającego' : 'partnera'}.
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {responses.map(response => {
          const question = questionsDatabase.find(q => q.id === response.question_id);
          return (
            <div key={response.id} className="border rounded-md p-3">
              <div className="font-medium">{question?.text || 'Pytanie niedostępne'}</div>
              <div className="flex items-center mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-primary h-2.5 rounded-full" 
                    style={{ width: `${(response.answer / 5) * 100}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-sm font-medium">{response.answer}/5</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Odpowiedzi zamawiającego</h3>
        {renderUserResponses(userResponses, 'user')}
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Odpowiedzi partnera</h3>
        {renderUserResponses(partnerResponses, 'partner')}
      </div>
    </div>
  );
};

export default SurveyResponsesView;
