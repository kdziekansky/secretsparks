import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

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
            <CardHeader>
              <CardTitle>Ostatnie zamówienia</CardTitle>
              <CardDescription>
                Najnowsze zamówienia w systemie
              </CardDescription>
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
                      <strong>#{order.id.substring(0, 8)}...</strong> - {order.user_name} ({order.price} zł)
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
