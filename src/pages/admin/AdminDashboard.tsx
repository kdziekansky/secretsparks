
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Package, Archive, Users } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/spe43al-adm1n-p4nel');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [ordersResponse, archivedResponse] = await Promise.all([
        supabase.from('orders').select('id', { count: 'exact' }),
        supabase.from('orders').select('id', { count: 'exact' }).eq('archived', true),
      ]);

      if (ordersResponse.error) throw ordersResponse.error;
      if (archivedResponse.error) throw archivedResponse.error;

      return {
        totalOrders: ordersResponse.count || 0,
        archivedOrders: archivedResponse.count || 0,
        activeOrders: (ordersResponse.count || 0) - (archivedResponse.count || 0)
      };
    },
    enabled: isAuthenticated,
  });

  if (isLoading) {
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
        <h1 className="text-3xl font-bold mb-6">Panel administracyjny</h1>
        
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Aktywne zamówienia
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoadingStats ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <div className="text-2xl font-bold">{stats?.activeOrders || 0}</div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Zarchiwizowane zamówienia
              </CardTitle>
              <Archive className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoadingStats ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <div className="text-2xl font-bold">{stats?.archivedOrders || 0}</div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Wszystkie zamówienia
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoadingStats ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <div className="text-2xl font-bold">{stats?.totalOrders || 0}</div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Additional dashboard content can be added here */}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
