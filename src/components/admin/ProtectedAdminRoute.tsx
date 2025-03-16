
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, adminEmail } = useAdminAuth();
  const location = useLocation();
  
  // Szczegółowe logowanie
  useEffect(() => {
    console.log('Protected route check - isAuthenticated:', isAuthenticated, 'isLoading:', isLoading, 'path:', location.pathname);
  }, [isAuthenticated, isLoading, location.pathname]);

  // Sprawdź czy token HTTP CSRF został ustawiony
  useEffect(() => {
    if (isAuthenticated) {
      try {
        // W pełnym rozwiązaniu należy używać secure cookies
        const csrfToken = crypto.randomUUID();
        const metaTag = document.querySelector('meta[name="csrf-token"]');
        
        if (metaTag) {
          metaTag.setAttribute('content', csrfToken);
        } else {
          const newMetaTag = document.createElement('meta');
          newMetaTag.name = 'csrf-token';
          newMetaTag.content = csrfToken;
          document.head.appendChild(newMetaTag);
        }
        
        // Zapisujemy token także w sessionStorage
        sessionStorage.setItem('csrf_token', csrfToken);
        console.log('CSRF token ustawiony poprawnie');
      } catch (error) {
        console.error('Błąd podczas ustawiania tokenu CSRF:', error);
      }
    }
  }, [isAuthenticated]);

  // Wyświetl ładowanie podczas sprawdzania uwierzytelnienia
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">Weryfikacja uprawnień administratora...</p>
        </div>
      </div>
    );
  }

  // Obsługa przypadku braku uwierzytelnienia
  if (!isAuthenticated) {
    console.log('Brak uwierzytelnienia, przekierowanie do logowania z:', location.pathname);
    
    // Powiadom użytkownika o przekierowaniu
    toast.info('Wymagane logowanie', {
      description: 'Dostęp do tej strony wymaga zalogowania jako administrator'
    });
    
    // Zapisz aktualną ścieżkę, aby po zalogowaniu wrócić na nią
    // Użyj path spe43al-adm1n-p4nel zamiast konkretnej ścieżki, aby uniknąć pętli przekierowań
    return <Navigate to="/spe43al-adm1n-p4nel" replace state={{ from: location }} />;
  }

  console.log('Użytkownik uwierzytelniony, renderowanie chronionej zawartości');
  return <>{children}</>;
};

export default ProtectedAdminRoute;
