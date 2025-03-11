import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import AdminLayout from '@/components/admin/AdminLayout';
import { useQuery } from '@tanstack/react-query';
import { supabase, fetchFromSupabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger, DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { 
  Archive, AlertTriangle, CheckCircle, ChevronDown, ExternalLink, 
  Eye, FileText, Loader2, Package, RotateCcw, Trash2
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { pl } from 'date-fns/locale';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogHeader, DialogTitle
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SurveyResponsesView from '@/components/admin/SurveyResponsesView';
import ReportGenerator from '@/components/admin/ReportGenerator';

interface Order {
  id: string;
  user_name: string;
  user_email: string;
  partner_name: string;
  partner_email: string;
  partner_survey_token: string | null;
  status: string;
  price: number;
  created_at: string;
  gift_wrap: boolean;
  archived: boolean;
}

interface SurveyResponse {
  id: string;
  order_id: string;
  question_id: string;
  answer: number;
  user_type: 'user' | 'partner';
  created_at: string;
}

const AdminOrders: React.FC = () => {
  const { isAuthenticated, isLoading: authLoading } = useAdminAuth();
  const navigate = useNavigate();
  const [viewArchived, setViewArchived] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/spe43al-adm1n-p4nel');
    }
  }, [isAuthenticated, authLoading, navigate]);

  const {
    data: orders,
    isLoading: ordersLoading,
    refetch
  } = useQuery({
    queryKey: ['admin-orders', viewArchived],
    queryFn: async () => {
      console.log('Fetching orders with archived =', viewArchived);
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('archived', viewArchived)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
        toast.error('Wystąpił błąd podczas pobierania zamówień');
        throw error;
      }
      console.log('Fetched orders:', data);
      return data as Order[];
    },
    enabled: isAuthenticated,
  });

  const {
    data: surveyResponses,
    isLoading: responsesLoading,
    refetch: refetchResponses
  } = useQuery({
    queryKey: ['survey-responses', selectedOrder?.id],
    queryFn: async () => {
      if (!selectedOrder?.id) {
        console.log('No selected order ID for fetching responses');
        return [];
      }
      
      setIsSubmitting(true);
      try {
        console.log(`Fetching survey responses for order ID: ${selectedOrder.id}`);
        
        // Use Edge Function for fetching responses
        try {
          console.log('Calling get-survey-responses edge function');
          const { data: functionData, error: functionError } = await supabase.functions.invoke(
            'get-survey-responses',
            {
              body: { orderId: selectedOrder.id },
            }
          );
          
          if (functionError) {
            console.error('Error from edge function:', functionError);
            throw functionError;
          }
          
          if (functionData && functionData.responses) {
            console.log(`Edge function returned ${functionData.responses.length} responses`);
            return functionData.responses;
          }
          
        } catch (edgeFunctionError) {
          console.error('Edge function error:', edgeFunctionError);
          // Fall back to direct query
        }
        
        // Fallback: Use direct API call
        console.log('Falling back to direct Supabase query');
        const { data, error } = await supabase
          .from('survey_responses')
          .select('*')
          .eq('order_id', selectedOrder.id);

        if (error) {
          console.error('Error fetching responses with SDK:', error);
          throw error;
        }
        
        console.log(`SDK query returned ${data?.length || 0} responses`);
        return data || [];
        
      } catch (err) {
        console.error('Failed to fetch survey responses:', err);
        toast.error('Wystąpił błąd podczas pobierania odpowiedzi');
        return [];
      } finally {
        setIsSubmitting(false);
      }
    },
    enabled: isAuthenticated && !!selectedOrder?.id,
    refetchOnWindowFocus: false,
    staleTime: 60000, // 1 minute
  });

  const handleToggleArchive = async (order: Order) => {
    try {
      setIsSubmitting(true);
      const { error } = await supabase
        .from('orders')
        .update({ archived: !order.archived })
        .eq('id', order.id);

      if (error) throw error;

      toast.success(
        order.archived ? 'Zamówienie przywrócone' : 'Zamówienie zarchiwizowane'
      );
      refetch();
    } catch (error) {
      console.error('Error toggling archive status:', error);
      toast.error('Wystąpił błąd podczas zmiany statusu zamówienia');
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDeleteOrder = (order: Order) => {
    setOrderToDelete(order);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteOrder = async () => {
    if (!orderToDelete) return;

    try {
      setIsSubmitting(true);
      console.log(`Próba usunięcia zamówienia ${orderToDelete.id}`);

      // Używamy bezpośredniego wywołania API zamiast SDK, aby upewnić się, że mamy pełne uprawnienia
      try {
        await fetchFromSupabase(`orders?id=eq.${orderToDelete.id}`, {
          method: 'DELETE'
        });
        
        console.log('Zamówienie zostało pomyślnie usunięte przez bezpośrednie API');
        toast.success('Zamówienie zostało całkowicie usunięte wraz z powiązanymi danymi');
        
        // Jeśli usunięte zamówienie było otwarte w szczegółach, zamknij dialog
        if (selectedOrder?.id === orderToDelete.id) {
          setIsDetailsOpen(false);
          setSelectedOrder(null);
        }
        
        // Odświeżamy listę zamówień
        await refetch();
        
      } catch (apiError) {
        console.error('Błąd przy użyciu bezpośredniego API:', apiError);
        
        // Próba alternatywnej metody - przez SDK
        console.log('Próba usunięcia przez SDK');
        const { error } = await supabase
          .from('orders')
          .delete()
          .eq('id', orderToDelete.id);

        if (error) {
          console.error('Błąd podczas usuwania zamówienia przez SDK:', error);
          toast.error('Wystąpił błąd podczas usuwania zamówienia: ' + error.message);
          throw error;
        }
        
        console.log('Zamówienie zostało pomyślnie usunięte przez SDK');
        toast.success('Zamówienie zostało całkowicie usunięte wraz z powiązanymi danymi');
        
        // Jeśli usunięte zamówienie było otwarte w szczegółach, zamknij dialog
        if (selectedOrder?.id === orderToDelete.id) {
          setIsDetailsOpen(false);
          setSelectedOrder(null);
        }
        
        // Odświeżamy listę zamówień
        await refetch();
      }
    } catch (error) {
      console.error('Nieoczekiwany błąd:', error);
      toast.error('Wystąpił nieoczekiwany błąd podczas usuwania zamówienia');
    } finally {
      setIsSubmitting(false);
      setIsDeleteDialogOpen(false);
      setOrderToDelete(null);
    }
  };

  const regeneratePartnerToken = async (order: Order) => {
    try {
      setIsSubmitting(true);
      const newToken = crypto.randomUUID();
      
      const { error } = await supabase
        .from('orders')
        .update({ partner_survey_token: newToken })
        .eq('id', order.id);

      if (error) throw error;

      toast.success('Wygenerowano nowy token dla partnera');
      
      // Aktualizacja danych w UI
      if (selectedOrder?.id === order.id) {
        setSelectedOrder({
          ...selectedOrder,
          partner_survey_token: newToken
        });
      }
      
      refetch();
    } catch (error) {
      console.error('Error regenerating partner token:', error);
      toast.error('Wystąpił błąd podczas generowania nowego tokenu');
    } finally {
      setIsSubmitting(false);
    }
  };

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setActiveTab("details");
    setIsDetailsOpen(true);
  };

  const viewSurveyResponses = (order: Order) => {
    setIsSubmitting(true);
    setSelectedOrder(order);
    setActiveTab("responses");
    setIsDetailsOpen(true);
    
    // Force refetch responses when directly viewing responses tab
    setTimeout(() => {
      if (refetchResponses) {
        console.log('Force refetching responses for order:', order.id);
        refetchResponses();
      }
    }, 100);
  };

  const filteredOrders = orders?.filter(order => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      order.id.toLowerCase().includes(searchLower) ||
      order.user_name.toLowerCase().includes(searchLower) ||
      order.user_email.toLowerCase().includes(searchLower) ||
      order.partner_name.toLowerCase().includes(searchLower) ||
      order.partner_email.toLowerCase().includes(searchLower)
    );
  });

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            {viewArchived ? 'Zarchiwizowane zamówienia' : 'Aktywne zamówienia'}
          </h1>
          <Button
            variant="outline"
            onClick={() => setViewArchived(!viewArchived)}
            disabled={isSubmitting}
          >
            {viewArchived ? (
              <><Package className="mr-2 h-4 w-4" /> Pokaż aktywne</>
            ) : (
              <><Archive className="mr-2 h-4 w-4" /> Pokaż zarchiwizowane</>
            )}
          </Button>
        </div>

        <div className="mb-4">
          <Input
            placeholder="Szukaj zamówień..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        {ordersLoading || isSubmitting ? (
          <div className="flex justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredOrders && filteredOrders.length > 0 ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Zamawiający</TableHead>
                  <TableHead>Partner</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Wartość</TableHead>
                  <TableHead>Akcje</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      {order.id.substring(0, 8)}...
                    </TableCell>
                    <TableCell>
                      {order.user_name}<br/>
                      <span className="text-xs text-muted-foreground">{order.user_email}</span>
                    </TableCell>
                    <TableCell>
                      {order.partner_name}<br/>
                      <span className="text-xs text-muted-foreground">{order.partner_email}</span>
                    </TableCell>
                    <TableCell>
                      {order.status === 'completed' || order.status === 'paid' ? (
                        <div className="flex items-center">
                          <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                          Zapłacone
                        </div>
                      ) : (
                        <div className="text-amber-600">Oczekujące</div>
                      )}
                    </TableCell>
                    <TableCell>
                      {formatDistanceToNow(new Date(order.created_at), {
                        addSuffix: true,
                        locale: pl
                      })}
                    </TableCell>
                    <TableCell>{order.price} zł</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" disabled={isSubmitting}>
                            <span className="sr-only">Otwórz menu</span>
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => viewOrderDetails(order)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Szczegóły zamówienia
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => viewSurveyResponses(order)}>
                            <FileText className="mr-2 h-4 w-4" />
                            Odpowiedzi z ankiety
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleToggleArchive(order)}>
                            {order.archived ? (
                              <>
                                <RotateCcw className="mr-2 h-4 w-4" />
                                Przywróć z archiwum
                              </>
                            ) : (
                              <>
                                <Archive className="mr-2 h-4 w-4" />
                                Archiwizuj
                              </>
                            )}
                          </DropdownMenuItem>
                          {order.partner_survey_token && (
                            <DropdownMenuItem
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  `${window.location.origin}/survey?token=${order.partner_survey_token}`
                                );
                                toast.success('Link skopiowany do schowka');
                              }}
                            >
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Kopiuj link do ankiety partnera
                            </DropdownMenuItem>
                          )}
                          
                          <DropdownMenuItem onClick={() => regeneratePartnerToken(order)}>
                            <RotateCcw className="mr-2 h-4 w-4 text-amber-500" />
                            Zresetuj token partnera
                          </DropdownMenuItem>
                          
                          <DropdownMenuSeparator />
                          
                          <DropdownMenuItem 
                            onClick={() => confirmDeleteOrder(order)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Usuń zamówienie całkowicie
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center p-8 border rounded-md">
            <h3 className="text-lg font-medium mb-2">Brak zamówień</h3>
            <p className="text-muted-foreground">
              {viewArchived
                ? 'Nie znaleziono zarchiwizowanych zamówień'
                : 'Nie znaleziono aktywnych zamówień'}
            </p>
          </div>
        )}

        {/* Order Details Dialog with Tabs */}
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>
                {activeTab === "details" ? "Szczegóły zamówienia" : "Odpowiedzi z ankiety"}
              </DialogTitle>
              <DialogDescription className="DialogDescription">
                Identyfikator: {selectedOrder?.id}
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue={activeTab} value={activeTab} onValueChange={(value) => {
              setActiveTab(value);
              if (value === "responses" && refetchResponses) {
                console.log('Tab changed to responses, refetching');
                refetchResponses();
              }
            }} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Szczegóły</TabsTrigger>
                <TabsTrigger value="responses">Odpowiedzi</TabsTrigger>
              </TabsList>

              <TabsContent value="details">
                {selectedOrder && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium">Zamawiający</h3>
                        <p>{selectedOrder.user_name}</p>
                        <p className="text-sm text-muted-foreground">{selectedOrder.user_email}</p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium">Partner</h3>
                        <p>{selectedOrder.partner_name}</p>
                        <p className="text-sm text-muted-foreground">{selectedOrder.partner_email}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">Link do ankiety partnera</h3>
                        {selectedOrder.partner_survey_token ? (
                          <div className="flex flex-col gap-2">
                            <Input 
                              readOnly 
                              value={`${window.location.origin}/survey?token=${selectedOrder.partner_survey_token}`}
                              className="text-xs font-mono"
                            />
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    `${window.location.origin}/survey?token=${selectedOrder.partner_survey_token}`
                                  );
                                  toast.success('Link skopiowany do schowka');
                                }}
                              >
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Kopiuj link
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => regeneratePartnerToken(selectedOrder)}
                              >
                                <RotateCcw className="mr-2 h-4 w-4" />
                                Zresetuj token
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">Brak tokenu dla partnera</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium">Dane zamówienia</h3>
                        <p>Status: {selectedOrder.status === 'completed' ? 'Zapłacone' : 'Oczekujące'}</p>
                        <p>Data: {new Date(selectedOrder.created_at).toLocaleString('pl-PL')}</p>
                        <p>Wartość: {selectedOrder.price} zł</p>
                        <p>Pakowanie na prezent: {selectedOrder.gift_wrap ? 'Tak' : 'Nie'}</p>
                      </div>
                      
                      <div className="space-y-2 pt-4">
                        <Button
                          variant={selectedOrder.archived ? "default" : "outline"}
                          onClick={() => {
                            handleToggleArchive(selectedOrder);
                            setIsDetailsOpen(false);
                          }}
                          className="w-full"
                        >
                          {selectedOrder.archived ? (
                            <>
                              <RotateCcw className="mr-2 h-4 w-4" />
                              Przywróć z archiwum
                            </>
                          ) : (
                            <>
                              <Archive className="mr-2 h-4 w-4" />
                              Archiwizuj zamówienie
                            </>
                          )}
                        </Button>
                        
                        <Button
                          variant="destructive"
                          onClick={() => {
                            confirmDeleteOrder(selectedOrder);
                            setIsDetailsOpen(false);
                          }}
                          className="w-full"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Usuń zamówienie całkowicie
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="responses">
                <div className="space-y-6">
                  {/* Add order identifier for survey responses view to grab */}
                  <div className="hidden" data-testid="order-identifier">
                    {selectedOrder?.id}
                  </div>
                  
                  {isSubmitting ? (
                    <div className="flex justify-center p-8">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <span className="ml-3">Ładowanie odpowiedzi...</span>
                    </div>
                  ) : (
                    <SurveyResponsesView 
                      responses={surveyResponses || []} 
                      isLoading={responsesLoading} 
                    />
                  )}
                  
                  <div className="flex justify-end mt-6">
                    <ReportGenerator 
                      responses={surveyResponses || []} 
                      order={selectedOrder}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>

        {/* Dialog potwierdzenia usunięcia zamówienia */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Potwierdź usunięcie zamówienia</AlertDialogTitle>
              <AlertDialogDescription>
                <div className="space-y-3">
                  <div className="flex items-center text-amber-600">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    <span>Ta operacja jest nieodwracalna!</span>
                  </div>
                  <p>
                    Usunięcie zamówienia spowoduje trwałe usunięcie wszystkich powiązanych danych, 
                    w tym odpowiedzi z ankiety i raportów.
                  </p>
                  {orderToDelete && (
                    <div className="bg-muted p-3 rounded-md">
                      <p><strong>Zamówienie:</strong> {orderToDelete.id.substring(0, 8)}...</p>
                      <p><strong>Zamawiający:</strong> {orderToDelete.user_name} ({orderToDelete.user_email})</p>
                      <p><strong>Partner:</strong> {orderToDelete.partner_name} ({orderToDelete.partner_email})</p>
                    </div>
                  )}
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Anuluj</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDeleteOrder}
                className="bg-red-600 hover:bg-red-700"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Usuwanie...
                  </>
                ) : (
                  'Tak, usuń całkowicie'
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
