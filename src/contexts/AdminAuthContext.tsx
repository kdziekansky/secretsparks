
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

interface AdminAuthContextType {
  isAuthenticated: boolean;
  adminEmail: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          const { data: adminUser, error: adminCheckError } = await supabase
            .from('admin_users')
            .select('email')
            .eq('email', session.user.email)
            .single();

          if (adminCheckError || !adminUser) {
            // Not an admin user, log them out from admin area
            if (location.pathname.includes('spe43al-adm1n-p4nel')) {
              await supabase.auth.signOut();
              setIsAuthenticated(false);
              setAdminEmail(null);
              navigate('/spe43al-adm1n-p4nel');
              toast.error('Unauthorized access');
            }
          } else {
            // Is an admin user
            setIsAuthenticated(true);
            setAdminEmail(session.user.email);
          }
        } else {
          setIsAuthenticated(false);
          setAdminEmail(null);
          
          // Redirect to login if trying to access admin pages
          if (location.pathname.includes('spe43al-adm1n-p4nel') && 
              location.pathname !== '/spe43al-adm1n-p4nel') {
            navigate('/spe43al-adm1n-p4nel');
          }
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);
      
      if (event === 'SIGNED_IN' && session) {
        // Check if the signed-in user is an admin
        const { data: adminUser, error: adminCheckError } = await supabase
          .from('admin_users')
          .select('email')
          .eq('email', session.user.email)
          .single();

        if (adminCheckError || !adminUser) {
          // Not an admin, sign them out
          await supabase.auth.signOut();
          setIsAuthenticated(false);
          setAdminEmail(null);
          toast.error('Unauthorized access');
        } else {
          setIsAuthenticated(true);
          setAdminEmail(session.user.email);
        }
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        setAdminEmail(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // First check if email is in admin_users table
      const { data: adminUser, error: adminCheckError } = await supabase
        .from('admin_users')
        .select('email')
        .eq('email', email)
        .single();

      if (adminCheckError || !adminUser) {
        throw new Error('Nieprawidłowe dane logowania');
      }

      // Now try to sign in
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      navigate('/spe43al-adm1n-p4nel/dashboard');
    } catch (error: any) {
      console.error('Error during login:', error);
      toast.error('Błąd logowania', {
        description: error.message || 'Nieprawidłowy email lub hasło'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      navigate('/spe43al-adm1n-p4nel');
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('Błąd wylogowania');
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    isAuthenticated,
    adminEmail,
    login,
    logout,
    isLoading,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
