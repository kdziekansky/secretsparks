import React, { useEffect, useState } from 'react';
import { Loader2, RefreshCw } from 'lucide-react';
import { questionsDatabase } from '@/contexts/questions-data';
import { supabase, fetchFromSupabase } from '@/integrations/supabase/client';
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

const SurveyResponsesView: React.FC<SurveyResponsesViewProps> = ({ responses: initialResponses, isLoading }) => {
  const [refreshedResponses, setRefreshedResponses] = useState<SurveyResponse[] | null>(null);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [viewType, setViewType] = useState<'cards' | 'table'>('table');
  
  // More comprehensive order ID extraction
  useEffect(() => {
    const extractOrderId = () => {
      // Try to get from responses
      if (initialResponses && initialResponses.length > 0) {
        console.log('Setting orderId from responses:', initialResponses[0].order_id);
        return initialResponses[0].order_id;
      }
      
      // Try to get from URL params
      const urlParams = new URLSearchParams(window.location.search);
      const idFromUrl = urlParams.get('id');
      if (idFromUrl) {
        console.log('Setting orderId from URL:', idFromUrl);
        return idFromUrl;
      }
      
      // Try to get from the dialog description/subtitle
      const dialogDescription = document.querySelector('.DialogDescription');
      if (dialogDescription) {
        const text = dialogDescription.textContent || '';
        console.log('Dialog description text:', text);
        const idMatch = text.match(/Identyfikator:\s*([a-f0-9-]+)/);
        if (idMatch && idMatch[1]) {
          console.log('Found orderId in dialog:', idMatch[1]);
          return idMatch[1];
        }
      }
      
      // Try to get from data-testid attribute 
      const identifierElement = document.querySelector('[data-testid="order-identifier"]');
      if (identifierElement) {
        const identifierText = identifierElement.textContent || '';
        console.log('Identifier element text:', identifierText);
        const uuidPattern = /([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i;
        const match = identifierText.match(uuidPattern);
        if (match && match[1]) {
          console.log('Found UUID in identifier:', match[1]);
          return match[1];
        }
      }
      
      console.warn('Could not extract order ID from any source');
      return null;
    };
    
    const newOrderId = extractOrderId();
    if (newOrderId && newOrderId !== orderId) {
      console.log('Setting new order ID:', newOrderId);
      setOrderId(newOrderId);
    } else if (!newOrderId) {
      console.warn('No order ID could be extracted from any source');
    }
  }, [initialResponses, orderId]);
  
  // Debug logging
  useEffect(() => {
    console.log('SurveyResponsesView state:', {
      receivedResponses: initialResponses,
      refreshedResponses,
      orderId,
      hasOrderId: !!orderId,
      responsesLength: initialResponses?.length || 0,
      refreshedResponsesLength: refreshedResponses?.length || 0,
    });
  }, [initialResponses, refreshedResponses, orderId]);
  
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
      
      const { data, error } = await supabase.functions.invoke('get-survey-responses', {
        body: { orderId }
      });
      
      if (error) {
        throw error;
      }
      
      if (data.responses && data.responses.length > 0) {
        console.log(`Received ${data.responses.length} responses from edge function`);
        setRefreshedResponses(data.responses);
        toast.success(`Odpowiedzi odświeżone (${data.responses.length})`);
      } else {
        setRefreshedResponses([]);
        toast.info('Brak odpowiedzi dla tego zamówienia w bazie danych');
      }
    } catch (err: any) {
      console.error('Failed to refresh responses:', err);
      toast.error('Wystąpił błąd podczas odświeżania odpowiedzi');
    } finally {
      setRefreshLoading(false);
    }
  };

  // Use refreshed responses if available, otherwise use the provided responses
  const responses = refreshedResponses || initialResponses;
  const currentLoading = refreshLoading || isLoading;
  
  // Auto-refresh responses when orderId changes or component mounts
  useEffect(() => {
    if (orderId && (!initialResponses || initialResponses.length === 0) && !refreshLoading) {
      console.log('Auto-refreshing responses for order ID:', orderId);
      refreshResponses();
    }
  }, [orderId, initialResponses]);
  
  if (currentLoading) {
    return (
      <div className="flex justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  // The empty state with a clear message and prominent refresh button
  if (!responses || responses.length === 0) {
    return (
      <div className="space-y-4">
        <div className="text-center p-6 border rounded-md bg-muted/10">
          <h3 className="font-medium mb-2">Brak odpowiedzi ankietowych dla tego zamówienia</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {orderId ? 
              `Nie znaleziono odpowiedzi dla zamówienia ID: ${orderId}` : 
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
  const userResponses = responses.filter(r => r.user_type === 'user');
  const partnerResponses = responses.filter(r => r.user_type === 'partner');

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
