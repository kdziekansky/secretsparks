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

// Stała do przechowywania informacji o zalogowanym administratorze w localStorage
const DEMO_ADMIN_KEY = 'demo_admin_authenticated';
const ADMIN_EMAIL_KEY = 'admin_email';

interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Funkcja pomocnicza do zapisu stanu uwierzytelnienia do localStorage
  const persistAuthState = (email: string) => {
    console.log('Zapisywanie stanu uwierzytelnienia dla:', email);
    localStorage.setItem(DEMO_ADMIN_KEY, 'true');
    localStorage.setItem(ADMIN_EMAIL_KEY, email);
  };

  // Funkcja pomocnicza do usuwania stanu uwierzytelnienia z localStorage
  const clearAuthState = () => {
    console.log('Czyszczenie stanu uwierzytelnienia');
    localStorage.removeItem(DEMO_ADMIN_KEY);
    localStorage.removeItem(ADMIN_EMAIL_KEY);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        console.log('Sprawdzanie stanu uwierzytelnienia...');
        
        // Sprawdź czy użytkownik jest zalogowany w localStorage
        const isAdminLoggedIn = localStorage.getItem(DEMO_ADMIN_KEY) === 'true';
        const storedEmail = localStorage.getItem(ADMIN_EMAIL_KEY);
        
        if (isAdminLoggedIn && storedEmail) {
          console.log('Znaleziono zalogowanego administratora w localStorage:', storedEmail);
          setIsAuthenticated(true);
          setAdminEmail(storedEmail);
          
          // Jeśli jesteśmy na stronie logowania, przekieruj do panelu
          if (location.pathname === '/spe43al-adm1n-p4nel') {
            console.log('Przekierowuję z logowania do dashboard (localStorage auth)');
            navigate('/spe43al-adm1n-p4nel/dashboard');
          }
          
          setIsLoading(false);
          return;
        }
        
        // Jeśli nie ma w localStorage, sprawdź sesję Supabase
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          console.log('Znaleziono sesję Supabase:', session.user.email);
          const { data: adminUser, error: adminCheckError } = await supabase
            .from('admin_users')
            .select('email')
            .eq('email', session.user.email)
            .maybeSingle();

          if (adminCheckError || !adminUser) {
            console.log('Użytkownik nie jest administratorem:', session.user.email);
            // Nie jest administratorem, wyloguj go
            if (location.pathname.includes('spe43al-adm1n-p4nel')) {
              await supabase.auth.signOut();
              setIsAuthenticated(false);
              setAdminEmail(null);
              clearAuthState();
              navigate('/spe43al-adm1n-p4nel');
              toast.error('Brak uprawnień dostępu');
            }
          } else {
            // Jest administratorem
            console.log('Potwierdzono administratora:', session.user.email);
            setIsAuthenticated(true);
            setAdminEmail(session.user.email);
            persistAuthState(session.user.email);
            
            // Jeśli na stronie logowania, przekieruj do panelu
            if (location.pathname === '/spe43al-adm1n-p4nel') {
              console.log('Przekierowuję z logowania do dashboard (Supabase auth)');
              navigate('/spe43al-adm1n-p4nel/dashboard');
            }
          }
        } else {
          console.log('Brak sesji Supabase, użytkownik nie jest zalogowany');
          setIsAuthenticated(false);
          setAdminEmail(null);
          clearAuthState();
          
          // Przekieruj do logowania jeśli próbuje wejść na chronione strony
          if (location.pathname.includes('spe43al-adm1n-p4nel') && 
              location.pathname !== '/spe43al-adm1n-p4nel') {
            console.log('Przekierowuję do strony logowania (brak uwierzytelnienia)');
            navigate('/spe43al-adm1n-p4nel');
          }
        }
      } catch (error) {
        console.error('Błąd podczas sprawdzania uwierzytelnienia:', error);
        // Sprawdź jeszcze localStorage na wypadek błędu
        const isAdminLoggedIn = localStorage.getItem(DEMO_ADMIN_KEY) === 'true';
        const storedEmail = localStorage.getItem(ADMIN_EMAIL_KEY);
        
        if (isAdminLoggedIn && storedEmail) {
          setIsAuthenticated(true);
          setAdminEmail(storedEmail);
        } else {
          setIsAuthenticated(false);
          setAdminEmail(null);
          clearAuthState();
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Nasłuchuj zmian stanu uwierzytelnienia
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Zmiana stanu uwierzytelnienia:', event);
      
      // Najpierw sprawdź localStorage
      const isAdminLoggedIn = localStorage.getItem(DEMO_ADMIN_KEY) === 'true';
      const storedEmail = localStorage.getItem(ADMIN_EMAIL_KEY);
      
      if (isAdminLoggedIn && storedEmail) {
        console.log('Zalogowany przez localStorage:', storedEmail);
        setIsAuthenticated(true);
        setAdminEmail(storedEmail);
        return;
      }
      
      if (event === 'SIGNED_IN' && session) {
        // Sprawdź czy zalogowany użytkownik jest administratorem
        const { data: adminUser, error: adminCheckError } = await supabase
          .from('admin_users')
          .select('email')
          .eq('email', session.user.email)
          .maybeSingle();

        if (adminCheckError || !adminUser) {
          // Nie jest administratorem, wyloguj go
          await supabase.auth.signOut();
          setIsAuthenticated(false);
          setAdminEmail(null);
          clearAuthState();
          toast.error('Brak uprawnień dostępu');
        } else {
          console.log('Zalogowano administratora przez Supabase:', session.user.email);
          setIsAuthenticated(true);
          setAdminEmail(session.user.email);
          persistAuthState(session.user.email);
          
          // Przekieruj do panelu po zalogowaniu
          if (location.pathname === '/spe43al-adm1n-p4nel') {
            navigate('/spe43al-adm1n-p4nel/dashboard');
          }
        }
      } else if (event === 'SIGNED_OUT') {
        const isAdminLoggedIn = localStorage.getItem(DEMO_ADMIN_KEY) === 'true';
        if (!isAdminLoggedIn) {
          console.log('Wylogowano z Supabase');
          setIsAuthenticated(false);
          setAdminEmail(null);
          clearAuthState();
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
      
      console.log('Próba logowania dla:', email);
      
      // Lista dozwolonych administratorów
      const allowedAdmins = [
        'admin@example.com', 
        'szmergon@gmail.com', 
        'contact@secretsparks.pl',
        'kdziekansky@icloud.com'
      ];
      
      if (!allowedAdmins.includes(email)) {
        console.error('Email nie znajduje się na liście dozwolonych administratorów:', email);
        throw new Error('Nieprawidłowe dane logowania');
      }
      
      // Dla administratorów, najpierw sprawdź w tabeli admin_users
      const { data: adminUser, error: adminCheckError } = await supabase
        .from('admin_users')
        .select('email')
        .eq('email', email)
        .maybeSingle();

      if (adminCheckError) {
        console.error('Błąd weryfikacji administratora:', adminCheckError);
        throw new Error('Problem z weryfikacją danych administratora');
      }

      if (!adminUser) {
        console.error('Nie znaleziono w tabeli admin_users:', email);
        throw new Error('Nieprawidłowe dane logowania');
      }

      // Użyj uwierzytelniania Supabase
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Błąd uwierzytelniania Supabase:', error);
        throw error;
      }
      
      // Zapisz stan uwierzytelnienia
      persistAuthState(email);
      navigate('/spe43al-adm1n-p4nel/dashboard');
    } catch (error: any) {
      console.error('Błąd podczas logowania:', error);
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
      
      // Sprawdź czy sesja Supabase też istnieje
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        await supabase.auth.signOut();
      }
      
      // Wyczyść localStorage
      clearAuthState();
      
      setIsAuthenticated(false);
      setAdminEmail(null);
      navigate('/spe43al-adm1n-p4nel');
    } catch (error) {
      console.error('Błąd podczas wylogowywania:', error);
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
