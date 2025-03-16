
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

// Stałe do przechowywania informacji w sessionStorage (bezpieczniejsze niż localStorage)
const ADMIN_AUTH_KEY = 'admin_auth';
const ADMIN_EMAIL_KEY = 'admin_email';
const ADMIN_SESSION_EXPIRY = 'admin_session_expiry';
// Czas wygaśnięcia sesji w milisekundach (2 godziny)
const SESSION_TIMEOUT = 2 * 60 * 60 * 1000;

interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Funkcja pomocnicza do zapisu stanu uwierzytelnienia do sessionStorage
  const persistAuthState = (email: string) => {
    console.log('Zapisywanie stanu uwierzytelnienia dla:', email);
    
    // Ustaw czas wygaśnięcia sesji
    const expiryTime = new Date().getTime() + SESSION_TIMEOUT;
    
    // Używamy sessionStorage zamiast localStorage dla większego bezpieczeństwa
    sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
    sessionStorage.setItem(ADMIN_EMAIL_KEY, email);
    sessionStorage.setItem(ADMIN_SESSION_EXPIRY, expiryTime.toString());
  };

  // Funkcja pomocnicza do usuwania stanu uwierzytelnienia z sessionStorage
  const clearAuthState = () => {
    console.log('Czyszczenie stanu uwierzytelnienia');
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
    sessionStorage.removeItem(ADMIN_EMAIL_KEY);
    sessionStorage.removeItem(ADMIN_SESSION_EXPIRY);
  };

  // Funkcja sprawdzająca czy sesja wygasła
  const isSessionExpired = (): boolean => {
    const expiryTime = sessionStorage.getItem(ADMIN_SESSION_EXPIRY);
    if (!expiryTime) return true;
    
    const expiryTimestamp = parseInt(expiryTime, 10);
    const currentTime = new Date().getTime();
    
    return currentTime > expiryTimestamp;
  };

  // Funkcja odświeżająca czas wygaśnięcia sesji
  const refreshSession = () => {
    if (isAuthenticated && adminEmail) {
      const expiryTime = new Date().getTime() + SESSION_TIMEOUT;
      sessionStorage.setItem(ADMIN_SESSION_EXPIRY, expiryTime.toString());
    }
  };

  // Słuchaj aktywności użytkownika, aby odświeżyć sesję
  useEffect(() => {
    const handleActivity = () => {
      if (isAuthenticated) {
        refreshSession();
      }
    };

    // Dodaj nasłuchiwanie wydarzeń aktywności
    window.addEventListener('click', handleActivity);
    window.addEventListener('keypress', handleActivity);
    window.addEventListener('scroll', handleActivity);
    window.addEventListener('mousemove', handleActivity);

    return () => {
      // Usuń nasłuchiwanie przy odmontowaniu komponentu
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('mousemove', handleActivity);
    };
  }, [isAuthenticated]);

  // Sprawdzaj okresowo czy sesja wygasła
  useEffect(() => {
    const interval = setInterval(() => {
      if (isAuthenticated && isSessionExpired()) {
        console.log('Sesja administratora wygasła');
        logout();
        toast.error('Sesja wygasła', {
          description: 'Twoja sesja wygasła. Zaloguj się ponownie.'
        });
      }
    }, 60000); // Sprawdzaj co minutę
    
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  // Sprawdzanie początkowego stanu uwierzytelnienia tylko raz podczas inicjalizacji
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        console.log('Sprawdzanie stanu uwierzytelnienia...');
        
        // Sprawdź czy sesja nie wygasła
        if (isSessionExpired()) {
          console.log('Sesja administratora wygasła, wylogowywanie');
          clearAuthState();
          setIsAuthenticated(false);
          setAdminEmail(null);
          
          // Przekieruj do logowania jeśli próbuje wejść na chronione strony
          if (location.pathname.includes('spe43al-adm1n-p4nel') && 
              location.pathname !== '/spe43al-adm1n-p4nel') {
            console.log('Przekierowuję do strony logowania (sesja wygasła)');
            navigate('/spe43al-adm1n-p4nel');
          }
          
          setIsLoading(false);
          setInitialCheckDone(true);
          return;
        }
        
        // Sprawdź czy użytkownik jest zalogowany w sessionStorage
        const isAdminLoggedIn = sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
        const storedEmail = sessionStorage.getItem(ADMIN_EMAIL_KEY);
        
        if (isAdminLoggedIn && storedEmail) {
          console.log('Znaleziono zalogowanego administratora w sessionStorage:', storedEmail);
          
          // Weryfikujemy czy użytkownik istnieje w Supabase Auth
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session && session.user.email === storedEmail) {
            setIsAuthenticated(true);
            setAdminEmail(storedEmail);
            
            // Jeśli jesteśmy na stronie logowania, przekieruj do panelu
            if (location.pathname === '/spe43al-adm1n-p4nel') {
              console.log('Przekierowuję z logowania do dashboard (sessionStorage auth)');
              navigate('/spe43al-adm1n-p4nel/dashboard');
            }
          } else {
            // Sesja Supabase nie istnieje, wyloguj
            clearAuthState();
            setIsAuthenticated(false);
            setAdminEmail(null);
          }
          
          setIsLoading(false);
          setInitialCheckDone(true);
          return;
        }
        
        // Jeśli nie ma w sessionStorage, sprawdź sesję Supabase
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          console.log('Znaleziono sesję Supabase:', session.user.email);
          
          // Zapisz stan uwierzytelnienia
          setIsAuthenticated(true);
          setAdminEmail(session.user.email);
          persistAuthState(session.user.email);
          
          // Jeśli na stronie logowania, przekieruj do panelu
          if (location.pathname === '/spe43al-adm1n-p4nel') {
            console.log('Przekierowuję z logowania do dashboard (Supabase auth)');
            navigate('/spe43al-adm1n-p4nel/dashboard');
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
        setIsAuthenticated(false);
        setAdminEmail(null);
        clearAuthState();
      } finally {
        setIsLoading(false);
        setInitialCheckDone(true);
      }
    };

    if (!initialCheckDone) {
      checkAuth();
    }
  }, [navigate, location.pathname, initialCheckDone]);

  // Oddzielny efekt do nasłuchiwania zmian uwierzytelnienia Supabase
  useEffect(() => {
    // Nasłuchuj zmian stanu uwierzytelnienia
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Zmiana stanu uwierzytelnienia:', event);
      
      if (event === 'SIGNED_IN' && session) {
        console.log('Zalogowano przez Supabase:', session.user.email);
        setIsAuthenticated(true);
        setAdminEmail(session.user.email);
        persistAuthState(session.user.email);
        
        // Przekieruj do panelu po zalogowaniu
        if (location.pathname === '/spe43al-adm1n-p4nel') {
          navigate('/spe43al-adm1n-p4nel/dashboard');
        }
      } else if (event === 'SIGNED_OUT') {
        console.log('Wylogowano z Supabase');
        setIsAuthenticated(false);
        setAdminEmail(null);
        clearAuthState();
        
        // Przekieruj do logowania
        if (location.pathname.includes('spe43al-adm1n-p4nel') && 
            location.pathname !== '/spe43al-adm1n-p4nel') {
          navigate('/spe43al-adm1n-p4nel');
        }
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [navigate, location.pathname]);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      console.log('Próba logowania przez Supabase Auth dla:', email);
      
      // Weryfikacja formatu adresu email
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        throw new Error('Nieprawidłowy format adresu email');
      }
      
      // Użyj standardowego uwierzytelniania Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Błąd uwierzytelniania Supabase:', error);
        throw new Error(error.message || 'Nieprawidłowe dane logowania');
      }
      
      if (!data || !data.user) {
        throw new Error('Nieprawidłowe dane logowania');
      }
      
      console.log('Logowanie zakończone sukcesem:', data.user.email);
      
      // Zapisz stan uwierzytelnienia
      persistAuthState(email);
      setIsAuthenticated(true);
      setAdminEmail(email);
      
      // Dodaj wpis do dziennika logowań (jeśli tabela istnieje)
      try {
        await supabase
          .from('admin_login_log')
          .insert([{
            email: email,
            login_at: new Date().toISOString(),
            user_agent: navigator.userAgent.substring(0, 255),
          }]);
          
        console.log('Zapisano log logowania');
      } catch (err) {
        // Ignoruj błąd jeśli tabela nie istnieje
        console.error('Błąd zapisywania logowania:', err);
      }
      
    } catch (error: any) {
      console.error('Błąd podczas logowania:', error);
      setIsAuthenticated(false);
      setAdminEmail(null);
      clearAuthState();
      toast.error('Błąd logowania', {
        description: error.message || 'Nieprawidłowy email lub hasło'
      });
      throw error; // Rzuć błąd dalej, aby został obsłużony przez komponent logowania
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      
      // Wyloguj z Supabase Auth
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Błąd wylogowania z Supabase:', error);
      }
      
      // Wyczyść sessionStorage
      clearAuthState();
      
      setIsAuthenticated(false);
      setAdminEmail(null);
      
      // Przekieruj do strony logowania tylko jeśli jesteśmy na stronie administracyjnej
      if (location.pathname.includes('spe43al-adm1n-p4nel') && 
          location.pathname !== '/spe43al-adm1n-p4nel') {
        navigate('/spe43al-adm1n-p4nel');
      }
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
