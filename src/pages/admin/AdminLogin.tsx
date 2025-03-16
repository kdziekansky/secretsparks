
import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Lock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, isAuthenticated } = useAdminAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Przekieruj zalogowanego użytkownika jeśli wraca na stronę logowania
  useEffect(() => {
    if (isAuthenticated) {
      console.log('Użytkownik już zalogowany, przekierowuję do dashboard');
      navigate('/spe43al-adm1n-p4nel/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Dodatkowa walidacja przed wysłaniem
    if (!email) {
      toast({
        title: "Wprowadź adres email",
        description: "Adres email jest wymagany do zalogowania się.",
        variant: "destructive",
      });
      return;
    }
    
    if (!password) {
      toast({
        title: "Wprowadź hasło",
        description: "Hasło jest wymagane do zalogowania się.",
        variant: "destructive",
      });
      return;
    }
    
    console.log('Próba logowania dla:', email);
    await login(email, password);
  };

  // Jeśli użytkownik jest już uwierzytelniony, pokaż loader podczas przekierowania
  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">Przekierowywanie do panelu administratora...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Panel administracyjny</CardTitle>
          <CardDescription>
            Dostęp tylko dla autoryzowanych użytkowników
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="block text-sm font-medium">
                Hasło
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logowanie...
                </>
              ) : (
                'Zaloguj się'
              )}
            </Button>
            
            <div className="text-xs text-center text-muted-foreground mt-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button type="button" className="text-xs underline hover:text-primary">
                    Potrzebujesz pomocy z logowaniem?
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Pomoc z logowaniem</AlertDialogTitle>
                    <AlertDialogDescription>
                      <p className="mb-2">Dla konta administracyjnego:</p>
                      <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li>Użyj adresu email, który otrzymałeś od administratora</li>
                        <li>Jeśli nie pamiętasz hasła, skontaktuj się z głównym administratorem</li>
                        <li>W przypadku nowego konta użyj hasła tymczasowego, które zostało dla Ciebie utworzone</li>
                      </ul>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Zamknij</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </form>
        </CardContent>
        
        <CardFooter className="justify-center text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Secret Sparks. Wszelkie prawa zastrzeżone.</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLogin;
