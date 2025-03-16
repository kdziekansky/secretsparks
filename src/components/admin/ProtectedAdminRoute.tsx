
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Loader2, AlertTriangle } from 'lucide-react';

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
      // Dla przykładu, ustawiamy token CSRF w meta tagu
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
    }
  }, [isAuthenticated]);

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

  if (!isAuthenticated) {
    console.log('Brak uwierzytelnienia, przekierowanie do logowania z:', location.pathname);
    // Zapisz aktualną ścieżkę, aby po zalogowaniu wrócić na nią
    return <Navigate to="/spe43al-adm1n-p4nel" replace state={{ from: location }} />;
  }

  // Dodatkowe sprawdzenie - czy adres email jest w domenie zaufanej
  // To jest przykład; w praktyce lepiej sprawdzać role użytkownika w bazie danych
  if (adminEmail && !adminEmail.endsWith('@secretsparks.pl') && !adminEmail.endsWith('@example.com')) {
    console.warn('Adres email administratora nie jest w zaufanej domenie:', adminEmail);
    // Tutaj można logować próby nieupoważnionego dostępu
  }

  console.log('Użytkownik uwierzytelniony, renderowanie chronionej zawartości');
  return <>{children}</>;
};

export default ProtectedAdminRoute;
