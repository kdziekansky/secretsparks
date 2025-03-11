
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import AdminLayout from '@/components/admin/AdminLayout';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Archive, CheckCircle, ChevronDown, ExternalLink, 
  Eye, FileText, Loader2, Package, RotateCcw 
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { pl } from 'date-fns/locale';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogHeader, DialogTitle, DialogTabs, DialogTab
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
  } = useQuery({
    queryKey: ['survey-responses', selectedOrder?.id],
    queryFn: async () => {
      if (!selectedOrder?.id) return null;
      
      const { data, error } = await supabase
        .from('survey_responses')
        .select('*')
        .eq('order_id', selectedOrder.id);

      if (error) {
        console.error('Error fetching survey responses:', error);
        throw error;
      }
      
      return data as SurveyResponse[];
    },
    enabled: isAuthenticated && !!selectedOrder?.id,
  });

  const handleToggleArchive = async (order: Order) => {
    try {
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
    }
  };

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setActiveTab("details");
    setIsDetailsOpen(true);
  };

  const viewSurveyResponses = (order: Order) => {
    setSelectedOrder(order);
    setActiveTab("responses");
    setIsDetailsOpen(true);
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

        {ordersLoading ? (
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
                      {order.status === 'completed' ? (
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
                          <Button variant="ghost" size="sm">
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
              <DialogDescription>
                Identyfikator: {selectedOrder?.id}
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
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
                      
                      {selectedOrder.partner_survey_token && (
                        <Button
                          variant="outline"
                          onClick={() => {
                            navigator.clipboard.writeText(
                              `${window.location.origin}/survey?token=${selectedOrder.partner_survey_token}`
                            );
                            toast.success('Link skopiowany do schowka');
                          }}
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Kopiuj link do ankiety partnera
                        </Button>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium">Dane zamówienia</h3>
                        <p>Status: {selectedOrder.status === 'completed' ? 'Zapłacone' : 'Oczekujące'}</p>
                        <p>Data: {new Date(selectedOrder.created_at).toLocaleString('pl-PL')}</p>
                        <p>Wartość: {selectedOrder.price} zł</p>
                        <p>Pakowanie na prezent: {selectedOrder.gift_wrap ? 'Tak' : 'Nie'}</p>
                      </div>
                      
                      <Button
                        variant={selectedOrder.archived ? "default" : "outline"}
                        onClick={() => {
                          handleToggleArchive(selectedOrder);
                          setIsDetailsOpen(false);
                        }}
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
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="responses">
                <div className="space-y-6">
                  <SurveyResponsesView 
                    responses={surveyResponses} 
                    isLoading={responsesLoading} 
                  />
                  
                  <div className="flex justify-end mt-6">
                    <ReportGenerator 
                      responses={surveyResponses} 
                      order={selectedOrder}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
