
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

// Create a local storage key for the demo admin
const DEMO_ADMIN_KEY = 'demo_admin_authenticated';

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
        
        // First check if demo admin is logged in
        const demoAdminEmail = localStorage.getItem(DEMO_ADMIN_KEY);
        if (demoAdminEmail === 'admin@example.com') {
          console.log('Demo admin is already logged in');
          setIsAuthenticated(true);
          setAdminEmail(demoAdminEmail);
          
          if (location.pathname === '/spe43al-adm1n-p4nel') {
            navigate('/spe43al-adm1n-p4nel/dashboard');
          }
          
          setIsLoading(false);
          return;
        }
        
        // If not demo admin, check Supabase session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          const { data: adminUser, error: adminCheckError } = await supabase
            .from('admin_users')
            .select('email')
            .eq('email', session.user.email)
            .maybeSingle();

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
            
            // If on login page and authenticated, redirect to dashboard
            if (location.pathname === '/spe43al-adm1n-p4nel') {
              navigate('/spe43al-adm1n-p4nel/dashboard');
            }
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
        // Even if there's an error, let's check if demo admin is logged in
        const demoAdminEmail = localStorage.getItem(DEMO_ADMIN_KEY);
        if (demoAdminEmail === 'admin@example.com') {
          setIsAuthenticated(true);
          setAdminEmail(demoAdminEmail);
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);
      
      // First always check demo admin
      const demoAdminEmail = localStorage.getItem(DEMO_ADMIN_KEY);
      if (demoAdminEmail === 'admin@example.com') {
        setIsAuthenticated(true);
        setAdminEmail(demoAdminEmail);
        return;
      }
      
      if (event === 'SIGNED_IN' && session) {
        // Check if the signed-in user is an admin
        const { data: adminUser, error: adminCheckError } = await supabase
          .from('admin_users')
          .select('email')
          .eq('email', session.user.email)
          .maybeSingle();

        if (adminCheckError || !adminUser) {
          // Not an admin, sign them out
          await supabase.auth.signOut();
          setIsAuthenticated(false);
          setAdminEmail(null);
          toast.error('Unauthorized access');
        } else {
          setIsAuthenticated(true);
          setAdminEmail(session.user.email);
          
          // Redirect to dashboard after sign in
          if (location.pathname === '/spe43al-adm1n-p4nel') {
            navigate('/spe43al-adm1n-p4nel/dashboard');
          }
        }
      } else if (event === 'SIGNED_OUT') {
        const demoAdminEmail = localStorage.getItem(DEMO_ADMIN_KEY);
        if (demoAdminEmail !== 'admin@example.com') {
          setIsAuthenticated(false);
          setAdminEmail(null);
        }
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Check for allowed admin emails
      const allowedAdmins = ['admin@example.com', 'szmergon@gmail.com', 'contact@secretsparks.pl'];
      
      if (!allowedAdmins.includes(email)) {
        throw new Error('Nieprawidłowe dane logowania');
      }
      
      // Special case for admin@example.com with hardcoded password
      if (email === 'admin@example.com' && password === 'admin123') {
        console.log('Special admin login path for admin@example.com');
        
        // Store demo admin status in localStorage to persist through page refreshes
        localStorage.setItem(DEMO_ADMIN_KEY, email);
        
        // Set authenticated state
        setIsAuthenticated(true);
        setAdminEmail(email);
        navigate('/spe43al-adm1n-p4nel/dashboard');
        return;
      }
      
      // For other admin users, check in admin_users table
      const { data: adminUser, error: adminCheckError } = await supabase
        .from('admin_users')
        .select('email')
        .eq('email', email)
        .maybeSingle();

      if (adminCheckError) {
        console.error('Admin check error:', adminCheckError);
        throw new Error('Problem z weryfikacją danych administratora');
      }

      if (!adminUser) {
        console.error('Not found in admin_users table:', email);
        throw new Error('Nieprawidłowe dane logowania');
      }

      // For regular admins, use Supabase authentication
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Supabase auth error:', error);
        throw error;
      }
      
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
      
      // Check if this is the demo admin
      if (adminEmail === 'admin@example.com') {
        localStorage.removeItem(DEMO_ADMIN_KEY);
      } else {
        // Regular Supabase auth logout
        await supabase.auth.signOut();
      }
      
      setIsAuthenticated(false);
      setAdminEmail(null);
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
