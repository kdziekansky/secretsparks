
import React, { useEffect, useState } from 'react';
import { Loader2, RefreshCw } from 'lucide-react';
import { questionsDatabase } from '@/contexts/questions-data';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
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

interface SurveyResponsesViewProps {
  responses: SurveyResponse[] | null;
  isLoading: boolean;
}

const SurveyResponsesView: React.FC<SurveyResponsesViewProps> = ({ responses, isLoading }) => {
  const [refreshedResponses, setRefreshedResponses] = useState<SurveyResponse[] | null>(null);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  
  // Extract order ID from responses or URL
  useEffect(() => {
    if (responses && responses.length > 0) {
      console.log('Setting orderId from responses:', responses[0].order_id);
      setOrderId(responses[0].order_id);
    } else {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get('id');
      if (id) {
        console.log('Setting orderId from URL:', id);
        setOrderId(id);
      }
    }
  }, [responses]);
  
  // Function to manually refresh responses
  const refreshResponses = async () => {
    if (!orderId) {
      console.error('No order ID available for refresh');
      toast.error('Brak ID zamówienia do odświeżenia');
      return;
    }
    
    setRefreshLoading(true);
    try {
      console.log('Refreshing responses for order ID:', orderId);
      const { data, error } = await supabase
        .from('survey_responses')
        .select('*')
        .eq('order_id', orderId);
        
      if (error) {
        console.error('Error refreshing responses:', error);
        toast.error('Nie udało się odświeżyć odpowiedzi');
        throw error;
      }
      
      console.log('Fetched responses:', data);
      setRefreshedResponses(data as SurveyResponse[]);
      
      if (data && data.length > 0) {
        toast.success(`Odpowiedzi odświeżone (${data.length})`);
      } else {
        toast.info('Brak odpowiedzi dla tego zamówienia');
      }
    } catch (error) {
      console.error('Failed to refresh responses:', error);
    } finally {
      setRefreshLoading(false);
    }
  };
  
  // Use refreshed responses if available, otherwise use the provided responses
  const displayResponses = refreshedResponses || responses;
  const currentLoading = refreshLoading || isLoading;
  
  useEffect(() => {
    // Auto-refresh responses on mount if orderId is available
    if (orderId && (!responses || responses.length === 0)) {
      refreshResponses();
    }
  }, [orderId]);
  
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
            <Button 
              onClick={refreshResponses}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Odśwież odpowiedzi
            </Button>
          </div>
        )}
      </div>
    );
  }

  // Group responses by user type
  const userResponses = displayResponses.filter(r => r.user_type === 'user');
  const partnerResponses = displayResponses.filter(r => r.user_type === 'partner');

  console.log('User responses:', userResponses.length);
  console.log('Partner responses:', partnerResponses.length);

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
            <Card key={response.id} className="overflow-hidden">
              <CardHeader className="bg-muted/50 p-4">
                <CardTitle className="text-base">
                  {question?.text || `Pytanie (${response.question_id})`}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-primary h-2.5 rounded-full" 
                      style={{ width: `${(response.answer / 5) * 100}%` }}
                    ></div>
                  </div>
                  <Badge variant="outline" className="ml-2">
                    {response.answer}/5
                  </Badge>
                </div>
                {question?.description && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {question.description}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Odpowiedzi ankiety</h2>
        <Button 
          onClick={refreshResponses}
          variant="outline"
          className="flex items-center gap-2"
          disabled={refreshLoading}
        >
          {refreshLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
          Odśwież odpowiedzi
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium border-b pb-2">Odpowiedzi zamawiającego ({userResponses.length})</h3>
          {renderUserResponses(userResponses, 'user')}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium border-b pb-2">Odpowiedzi partnera ({partnerResponses.length})</h3>
          {renderUserResponses(partnerResponses, 'partner')}
        </div>
      </div>
    </div>
  );
};

export default SurveyResponsesView;
