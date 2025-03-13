
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const location = useLocation();
  
  // Szczegółowe logowanie
  useEffect(() => {
    console.log('Protected route check - isAuthenticated:', isAuthenticated, 'isLoading:', isLoading, 'path:', location.pathname);
  }, [isAuthenticated, isLoading, location.pathname]);

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

  console.log('Użytkownik uwierzytelniony, renderowanie chronionej zawartości');
  return <>{children}</>;
};

export default ProtectedAdminRoute;
