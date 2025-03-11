
import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { questionsDatabase } from '@/contexts/questions-data';
import { supabase } from '@/integrations/supabase/client';

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

interface SurveyResponsesViewProps {
  responses: SurveyResponse[] | null;
  isLoading: boolean;
}

const SurveyResponsesView: React.FC<SurveyResponsesViewProps> = ({ responses, isLoading }) => {
  const [refreshedResponses, setRefreshedResponses] = useState<SurveyResponse[] | null>(null);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  
  // Extract order ID from responses
  useEffect(() => {
    if (responses && responses.length > 0) {
      setOrderId(responses[0].order_id);
    } else if (responses && responses.length === 0) {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get('id');
      if (id) setOrderId(id);
    }
  }, [responses]);
  
  // Function to manually refresh responses
  const refreshResponses = async () => {
    if (!orderId) return;
    
    setRefreshLoading(true);
    try {
      const { data, error } = await supabase
        .from('survey_responses')
        .select('*')
        .eq('order_id', orderId);
        
      if (error) {
        console.error('Error refreshing responses:', error);
        throw error;
      }
      
      setRefreshedResponses(data as SurveyResponse[]);
    } catch (error) {
      console.error('Failed to refresh responses:', error);
    } finally {
      setRefreshLoading(false);
    }
  };
  
  // Use refreshed responses if available, otherwise use the provided responses
  const displayResponses = refreshedResponses || responses;
  const currentLoading = refreshLoading || isLoading;
  
  if (currentLoading) {
    return (
      <div className="flex justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!displayResponses || displayResponses.length === 0) {
    return (
      <div className="space-y-4">
        <div className="text-center p-4 text-muted-foreground">
          Brak odpowiedzi z ankiety.
        </div>
        {orderId && (
          <div className="flex justify-center">
            <button 
              onClick={refreshResponses}
              className="px-4 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Odśwież odpowiedzi
            </button>
          </div>
        )}
      </div>
    );
  }

  // Group responses by user type
  const userResponses = displayResponses.filter(r => r.user_type === 'user');
  const partnerResponses = displayResponses.filter(r => r.user_type === 'partner');

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
      <div className="flex justify-end mb-4">
        <button 
          onClick={refreshResponses}
          className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
        >
          Odśwież odpowiedzi
        </button>
      </div>
      
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
