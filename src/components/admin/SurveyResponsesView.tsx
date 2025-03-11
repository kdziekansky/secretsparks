
import React, { useEffect, useState, useCallback } from 'react';
import { questionsDatabase } from '@/contexts/questions-data';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SurveyResponsesTable from './SurveyResponsesTable';
import ReportGenerator from './ReportGenerator';
import { Loader2, RefreshCw, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
  responses: SurveyResponse[];
  isLoading: boolean;
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

const SurveyResponsesView: React.FC<SurveyResponsesViewProps> = ({ responses: initialResponses, isLoading }) => {
  // Ensure initialResponses is always an array
  const safeInitialResponses = Array.isArray(initialResponses) ? initialResponses : [];
  
  const [refreshedResponses, setRefreshedResponses] = useState<SurveyResponse[]>([]);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [order, setOrder] = useState<any | null>(null);
  
  // More comprehensive order ID extraction
  useEffect(() => {
    const extractOrderId = () => {
      // Try to get from responses
      if (safeInitialResponses.length > 0) {
        console.log('Setting orderId from responses:', safeInitialResponses[0].order_id);
        return safeInitialResponses[0].order_id;
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
        const idMatch = text.match(/Identyfikator:\\s*([a-f0-9-]+)/);
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
      
      // Fetch order details when we have an order ID
      if (newOrderId) {
        fetchOrderDetails(newOrderId);
      }
    } else if (!newOrderId) {
      console.warn('No order ID could be extracted from any source');
    }
  }, [safeInitialResponses, orderId]);
  
  // Fetch order details when we have an ID
  const fetchOrderDetails = async (id: string) => {
    try {
      console.log('Fetching order details for:', id);
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) {
        console.error('Error fetching order details:', error);
        return;
      }
      
      if (data) {
        console.log('Found order details:', data);
        setOrder(data);
      }
    } catch (err) {
      console.error('Failed to fetch order details:', err);
    }
  };
  
  // Updated refresh function to use the Edge Function directly
  const refreshResponses = async () => {
    if (!orderId) {
      console.error('No order ID available for refresh');
      toast.error('Brak ID zamówienia do odświeżenia');
      return;
    }
    
    setRefreshLoading(true);
    setErrorMessage(null);
    
    try {
      console.log('Refreshing responses for order ID:', orderId);
      
      // Clear out any previous refreshed responses while loading
      setRefreshedResponses([]);
      
      // First attempt: Try the Edge Function with URL parameters
      try {
        console.log('Attempting to fetch responses using Edge Function');
        
        const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-survey-responses?orderId=${encodeURIComponent(orderId)}`;
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`Edge function returned status ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.responses && result.responses.length > 0) {
          console.log(`Retrieved ${result.responses.length} responses from Edge Function`);
          setRefreshedResponses(result.responses);
          setHasResponses(true);
          toast.success(`Odpowiedzi odświeżone (${result.responses.length})`);
          return;
        } else {
          console.log('Edge Function returned no responses, trying alternative methods');
        }
      } catch (edgeFnError) {
        console.error('Edge Function error:', edgeFnError);
        // Continue to fallback methods
      }
      
      // Second attempt: Try to get responses directly with SDK
      const { data, error } = await supabase
        .from('survey_responses')
        .select('*')
        .eq('order_id', orderId);
      
      if (error) {
        console.error('Error fetching responses with SDK:', error);
        // Don't throw yet, continue to more fallbacks
      }
      
      if (data && data.length > 0) {
        console.log(`Retrieved ${data.length} responses from database`);
        setRefreshedResponses(data);
        setHasResponses(true);
        toast.success(`Odpowiedzi odświeżone (${data.length})`);
        return;
      }
      
      // Third attempt: Try direct API call
      try {
        console.log('Trying direct API call');
        const directUrl = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/survey_responses?order_id=eq.${encodeURIComponent(orderId)}`;
        
        const directResponse = await fetch(directUrl, {
          headers: {
            'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
          }
        });
        
        if (!directResponse.ok) {
          throw new Error(`Direct API call failed with status ${directResponse.status}`);
        }
        
        const directData = await directResponse.json();
        
        if (directData && directData.length > 0) {
          console.log(`Retrieved ${directData.length} responses from direct API call`);
          setRefreshedResponses(directData);
          setHasResponses(true);
          toast.success(`Odpowiedzi odświeżone (${directData.length})`);
          return;
        }
      } catch (directApiError) {
        console.error('Direct API call error:', directApiError);
      }
      
      // Fourth attempt: Try posting to the Edge Function
      try {
        console.log('Trying POST to Edge Function');
        
        const postUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-survey-responses`;
        const postResponse = await fetch(postUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ orderId })
        });
        
        if (!postResponse.ok) {
          throw new Error(`POST to Edge Function failed with status ${postResponse.status}`);
        }
        
        const postResult = await postResponse.json();
        
        if (postResult.responses && postResult.responses.length > 0) {
          console.log(`Retrieved ${postResult.responses.length} responses from Edge Function POST`);
          setRefreshedResponses(postResult.responses);
          setHasResponses(true);
          toast.success(`Odpowiedzi odświeżone (${postResult.responses.length})`);
          return;
        }
      } catch (postError) {
        console.error('POST to Edge Function error:', postError);
      }
      
      // If we get here, no responses were found
      console.log('No responses found in any data source');
      setRefreshedResponses([]);
      setHasResponses(false);
      toast.info('Brak odpowiedzi dla tego zamówienia w bazie danych');
      
    } catch (err: any) {
      console.error('Failed to refresh responses:', err);
      setErrorMessage(`Błąd: ${err.message}`);
      toast.error('Wystąpił błąd podczas odświeżania odpowiedzi');
      // Ensure we set empty responses array to avoid undefined
      setRefreshedResponses([]);
      setHasResponses(false);
    } finally {
      setRefreshLoading(false);
    }
  };

  // Debug logging
  useEffect(() => {
    console.log('SurveyResponsesView state:', {
      receivedResponses: safeInitialResponses,
      refreshedResponses,
      orderId,
      hasOrderId: !!orderId,
      responsesLength: safeInitialResponses.length,
      refreshedResponsesLength: refreshedResponses.length,
      order
    });
  }, [safeInitialResponses, refreshedResponses, orderId, order]);

  // State to track if we have any responses
  const [hasResponses, setHasResponses] = useState<boolean>(false);

  // Effect to check for responses on mount and when responses change
  useEffect(() => {
    const hasValidResponses = !!(responses && responses.length > 0);
    console.log("Setting hasResponses to:", hasValidResponses);
    setHasResponses(hasValidResponses);
  }, [responses]);

  // Use refreshed responses if available, otherwise use the provided responses
  // Ensure we never have undefined responses by defaulting to empty array
  const responses = refreshedResponses.length > 0 ? refreshedResponses : safeInitialResponses;
  const currentLoading = refreshLoading || isLoading;
  
  // Auto-refresh responses when orderId changes or component mounts
  useEffect(() => {
    if (orderId && safeInitialResponses.length === 0 && !refreshLoading) {
      console.log('Auto-refreshing responses for order ID:', orderId);
      refreshResponses();
    }
  }, [orderId, safeInitialResponses]);
  
  if (currentLoading) {
    return (
      <div className="flex justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <span>Ładowanie odpowiedzi...</span>
      </div>
    );
  }

  // The empty state with a clear message and prominent refresh button
  if (responses.length === 0) {
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
          {errorMessage && (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4 mr-2" />
              <AlertDescription>
                {errorMessage}
              </AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-4">
            {orderId && (
              <Button 
                onClick={refreshResponses}
                variant="default"
                className="flex items-center gap-2"
              >
                {refreshLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Odświeżanie...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4" />
                    Odśwież odpowiedzi
                  </>
                )}
              </Button>
            )}
            
            {/* Add Report Generator even in empty state */}
            <div className="mt-6 pt-4 border-t">
              <h4 className="font-medium mb-3">Generowanie raportu</h4>
              <ReportGenerator responses={responses} order={order} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Ensure userResponses and partnerResponses are safe to use (never undefined)
  const userResponses = responses.filter(r => r.user_type === 'user') || [];
  const partnerResponses = responses.filter(r => r.user_type === 'partner') || [];

  console.log('User responses:', userResponses.length);
  console.log('Partner responses:', partnerResponses.length);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-semibold">Odpowiedzi ankiety</h2>
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
      
      {errorMessage && (
        <Alert variant="destructive" className="mb-4">
          <AlertTriangle className="h-4 w-4 mr-2" />
          <AlertDescription>
            {errorMessage}
          </AlertDescription>
        </Alert>
      )}
      
      <div className="mb-6 border-b pb-4">
        <ReportGenerator responses={responses} order={order} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium border-b pb-2">Odpowiedzi zamawiającego ({userResponses.length})</h3>
          <div className="max-h-[50vh] overflow-y-auto pr-2">
            <SurveyResponsesTable responses={userResponses} userType="user" />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium border-b pb-2">Odpowiedzi partnera ({partnerResponses.length})</h3>
          <div className="max-h-[50vh] overflow-y-auto pr-2">
            <SurveyResponsesTable responses={partnerResponses} userType="partner" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyResponsesView;
