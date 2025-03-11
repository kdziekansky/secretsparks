
import React, { useEffect, useState } from 'react';
import { Loader2, RefreshCw } from 'lucide-react';
import { questionsDatabase } from '@/contexts/questions-data';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SurveyResponsesTable from './SurveyResponsesTable';

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
  const [viewType, setViewType] = useState<'cards' | 'table'>('table');
  
  // Extract order ID from responses, URL, or modal dialog data
  useEffect(() => {
    const extractOrderId = () => {
      // First try to get from responses
      if (responses && responses.length > 0) {
        console.log('Setting orderId from responses:', responses[0].order_id);
        return responses[0].order_id;
      }
      
      // Try to get from URL params
      const urlParams = new URLSearchParams(window.location.search);
      const idFromUrl = urlParams.get('id');
      if (idFromUrl) {
        console.log('Setting orderId from URL:', idFromUrl);
        return idFromUrl;
      }
      
      // Try to get from the dialog title/subtitle (fallback)
      const dialogTitle = document.querySelector('.DialogDescription');
      if (dialogTitle) {
        const text = dialogTitle.textContent || '';
        const idMatch = text.match(/Identyfikator: ([a-f0-9-]+)/);
        if (idMatch && idMatch[1]) {
          console.log('Setting orderId from dialog:', idMatch[1]);
          return idMatch[1];
        }
      }
      
      return null;
    };
    
    const newOrderId = extractOrderId();
    if (newOrderId && newOrderId !== orderId) {
      setOrderId(newOrderId);
      // If we just set a new order ID, trigger a refresh
      if (!responses || responses.length === 0) {
        console.log('New order ID detected, will trigger refresh');
        // We'll call refreshResponses in the next useEffect
      }
    }
  }, [responses, orderId]);
  
  // Debug logging
  useEffect(() => {
    console.log('SurveyResponsesView state:', {
      receivedResponses: responses,
      refreshedResponses,
      orderId,
      hasOrderId: !!orderId,
      responsesLength: responses?.length || 0,
      refreshedResponsesLength: refreshedResponses?.length || 0
    });
  }, [responses, refreshedResponses, orderId]);
  
  // Auto-refresh responses when orderId changes or component mounts
  useEffect(() => {
    if (orderId && (!responses || responses.length === 0) && !refreshLoading) {
      console.log('Auto-refreshing responses for order ID:', orderId);
      refreshResponses();
    }
  }, [orderId, responses]);
  
  // Function to manually refresh responses with improved error handling
  const refreshResponses = async () => {
    if (!orderId) {
      console.error('No order ID available for refresh');
      toast.error('Brak ID zamówienia do odświeżenia');
      return;
    }
    
    setRefreshLoading(true);
    try {
      console.log('Refreshing responses for order ID:', orderId);
      
      // Clear out any previous refreshed responses while loading
      setRefreshedResponses(null);
      
      const { data, error } = await supabase
        .from('survey_responses')
        .select('*')
        .eq('order_id', orderId);
        
      if (error) {
        console.error('Error refreshing responses:', error);
        toast.error('Nie udało się odświeżyć odpowiedzi: ' + error.message);
        throw error;
      }
      
      console.log(`Fetched ${data?.length || 0} responses for order ID ${orderId}:`, data);
      
      if (data && data.length > 0) {
        setRefreshedResponses(data as SurveyResponse[]);
        toast.success(`Odpowiedzi odświeżone (${data.length})`);
      } else {
        // We got a successful response but no data
        setRefreshedResponses([]);
        toast.info('Brak odpowiedzi dla tego zamówienia w bazie danych');
        
        // Double-check by logging the SQL query that we would run
        console.log(`SQL equivalent: SELECT * FROM survey_responses WHERE order_id = '${orderId}'`);
      }
    } catch (error) {
      console.error('Failed to refresh responses:', error);
      // Already shown error toast above
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

  // The empty state with a clear message and prominent refresh button
  if (!displayResponses || displayResponses.length === 0) {
    return (
      <div className="space-y-4">
        <div className="text-center p-6 border rounded-md bg-muted/10">
          <h3 className="font-medium mb-2">Brak odpowiedzi ankietowych dla tego zamówienia</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {orderId ? 
              `Nie znaleziono odpowiedzi dla zamówienia ID: ${orderId?.substring(0, 8)}...` : 
              'Brak identyfikatora zamówienia'
            }
          </p>
          {orderId && (
            <Button 
              onClick={refreshResponses}
              variant="default"
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Odśwież odpowiedzi
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Group responses by user type
  const userResponses = displayResponses.filter(r => r.user_type === 'user');
  const partnerResponses = displayResponses.filter(r => r.user_type === 'partner');

  console.log('User responses:', userResponses.length);
  console.log('Partner responses:', partnerResponses.length);

  // Function to render responses for a specific user type as cards
  const renderUserResponsesCards = (responses: SurveyResponse[], userType: string) => {
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
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-semibold">Odpowiedzi ankiety</h2>
          <TabsList className="ml-4">
            <TabsTrigger 
              value="table" 
              className={viewType === 'table' ? 'bg-primary text-primary-foreground' : ''}
              onClick={() => setViewType('table')}
            >
              Tabela
            </TabsTrigger>
            <TabsTrigger 
              value="cards" 
              className={viewType === 'cards' ? 'bg-primary text-primary-foreground' : ''}
              onClick={() => setViewType('cards')}
            >
              Karty
            </TabsTrigger>
          </TabsList>
        </div>
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
      
      {viewType === 'table' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium border-b pb-2">Odpowiedzi zamawiającego ({userResponses.length})</h3>
            <SurveyResponsesTable responses={userResponses} userType="user" />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium border-b pb-2">Odpowiedzi partnera ({partnerResponses.length})</h3>
            <SurveyResponsesTable responses={partnerResponses} userType="partner" />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium border-b pb-2">Odpowiedzi zamawiającego ({userResponses.length})</h3>
            {renderUserResponsesCards(userResponses, 'user')}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium border-b pb-2">Odpowiedzi partnera ({partnerResponses.length})</h3>
            {renderUserResponsesCards(partnerResponses, 'partner')}
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveyResponsesView;
