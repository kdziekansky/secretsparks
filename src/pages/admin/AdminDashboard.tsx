
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import { Loader2, ArrowUpRight, AlertCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

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

interface SalesStats {
  totalOrders: number;
  totalRevenue: number;
  completedOrders: number;
  pendingOrders: number;
  averageOrderValue: number;
}

const AdminDashboard: React.FC = () => {
  const { adminEmail } = useAdminAuth();
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { data: latestOrders, isLoading: latestOrdersLoading } = useQuery({
    queryKey: ['latest-admin-orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      return data as Order[];
    },
  });

  const { data: salesStats, isLoading: statsLoading } = useQuery({
    queryKey: ['sales-stats'],
    queryFn: async () => {
      // Get all orders for statistics
      const { data, error } = await supabase
        .from('orders')
        .select('*');
      
      if (error) throw error;
      
      const orders = data as Order[];
      const stats: SalesStats = {
        totalOrders: orders.length,
        totalRevenue: orders.reduce((sum, order) => sum + Number(order.price), 0),
        completedOrders: orders.filter(order => order.status === 'completed').length,
        pendingOrders: orders.filter(order => order.status !== 'completed').length,
        averageOrderValue: orders.length > 0 
          ? orders.reduce((sum, order) => sum + Number(order.price), 0) / orders.length 
          : 0
      };
      
      return stats;
    }
  });

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.length < 8) {
      toast.error('Hasło musi mieć co najmniej 8 znaków');
      return;
    }

    try {
      setIsLoading(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error('Nie jesteś zalogowany');
        return;
      }

      const { error } = await supabase.functions.invoke('admin-password-setup', {
        body: { password }
      });

      if (error) throw error;

      toast.success('Hasło zostało zaktualizowane');
      setPassword('');
    } catch (error: any) {
      console.error('Error setting password:', error);
      toast.error('Błąd podczas ustawiania hasła', {
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Panel administracyjny</h1>
        
        {/* Sales Statistics */}
        <div className="grid gap-6 mb-8">
          <h2 className="text-xl font-semibold">Statystyki sprzedaży</h2>
          
          {statsLoading ? (
            <div className="flex justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : salesStats ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Łączna sprzedaż
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{salesStats.totalRevenue.toFixed(2)} zł</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {salesStats.totalOrders} zamówień łącznie
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Średnia wartość zamówienia
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{salesStats.averageOrderValue.toFixed(2)} zł</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Zamówienia opłacone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="text-2xl font-bold">{salesStats.completedOrders}</div>
                    <CheckCircle className="h-4 w-4 ml-2 text-green-500" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {salesStats.totalOrders > 0 
                      ? ((salesStats.completedOrders / salesStats.totalOrders) * 100).toFixed(0) 
                      : 0}% wszystkich zamówień
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Zamówienia oczekujące
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="text-2xl font-bold">{salesStats.pendingOrders}</div>
                    <AlertCircle className="h-4 w-4 ml-2 text-amber-500" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {salesStats.totalOrders > 0 
                      ? ((salesStats.pendingOrders / salesStats.totalOrders) * 100).toFixed(0) 
                      : 0}% wszystkich zamówień
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="text-center p-4 text-muted-foreground">
              Nie można załadować statystyk sprzedaży
            </div>
          )}
        </div>
        
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Ustawienia hasła</CardTitle>
              <CardDescription>
                Ustaw lub zmień hasło dla konta administratora: {adminEmail}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSetPassword} className="space-y-4">
                <div>
                  <Input
                    type="password"
                    placeholder="Nowe hasło (min. 8 znaków)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Aktualizowanie...' : 'Ustaw hasło'}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Ostatnie zamówienia</CardTitle>
                <CardDescription>
                  Najnowsze zamówienia w systemie
                </CardDescription>
              </div>
              <Link 
                to="/spe43al-adm1n-p4nel/orders" 
                className="text-sm text-blue-600 hover:underline inline-flex items-center"
              >
                Zobacz wszystkie
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </Link>
            </CardHeader>
            <CardContent>
              {latestOrdersLoading ? (
                <div className="flex justify-center">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : latestOrders && latestOrders.length > 0 ? (
                <ul className="list-none space-y-2">
                  {latestOrders.map(order => (
                    <li key={order.id} className="border rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <strong>#{order.id.substring(0, 8)}...</strong> - {order.user_name}
                          <div className="text-sm text-muted-foreground">
                            {order.status === 'completed' ? (
                              <span className="flex items-center text-green-600">
                                <CheckCircle className="mr-1 h-3 w-3" />
                                Opłacone
                              </span>
                            ) : (
                              <span className="text-amber-600">Oczekujące</span>
                            )}
                          </div>
                        </div>
                        <span className="font-semibold">{order.price} zł</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Brak ostatnich zamówień.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
