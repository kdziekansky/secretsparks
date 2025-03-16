
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Lock, User, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const FirstAdminSetup: React.FC = () => {
  const [email, setEmail] = useState('kdziekansky@icloud.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasAdmins, setHasAdmins] = useState(true);
  const [isCheckingAdmins, setIsCheckingAdmins] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Sprawdź, czy istnieją już administratorzy
  useEffect(() => {
    const checkAdmins = async () => {
      try {
        setIsCheckingAdmins(true);
        const { count, error } = await supabase
          .from('admin_users')
          .select('*', { count: 'exact', head: true });
        
        // Jeśli wystąpił błąd lub count jest undefined, zakładamy że administratorzy istnieją
        if (error || count === undefined) {
          console.error('Błąd podczas sprawdzania administratorów:', error);
          setHasAdmins(true);
          navigate('/spe43al-adm1n-p4nel');
          return;
        }
        
        setHasAdmins(count > 0);
        
        // Jeśli administratorzy już istnieją, przekieruj na stronę logowania
        if (count > 0) {
          navigate('/spe43al-adm1n-p4nel');
        }
      } catch (error) {
        console.error('Wyjątek podczas sprawdzania administratorów:', error);
        setHasAdmins(true);
        navigate('/spe43al-adm1n-p4nel');
      } finally {
        setIsCheckingAdmins(false);
      }
    };

    checkAdmins();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Sprawdź, czy hasła są zgodne
    if (password !== confirmPassword) {
      toast({
        title: "Hasła nie są zgodne",
        description: "Upewnij się, że oba hasła są identyczne.",
        variant: "destructive",
      });
      return;
    }
    
    // Sprawdź, czy hasło ma odpowiednią długość
    if (password.length < 8) {
      toast({
        title: "Hasło jest za krótkie",
        description: "Hasło musi mieć co najmniej 8 znaków.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      console.log('Tworzenie pierwszego administratora:', email);
      
      // Wywołaj funkcję edge do utworzenia pierwszego administratora
      const { data, error } = await supabase.functions.invoke('admin-password-setup', {
        body: { 
          email, 
          password, 
          firstAdmin: true 
        },
      });
      
      if (error) {
        console.error('Błąd podczas tworzenia administratora:', error);
        toast({
          title: "Błąd podczas tworzenia administratora",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      if (data.error) {
        console.error('Błąd zwrócony z funkcji:', data.error);
        toast({
          title: "Błąd podczas tworzenia administratora",
          description: data.error,
          variant: "destructive",
        });
        return;
      }
      
      // Sukces - pokaż powiadomienie i przekieruj do strony logowania
      toast({
        title: "Administrator utworzony pomyślnie",
        description: "Możesz teraz zalogować się na konto administratora.",
      });
      
      navigate('/spe43al-adm1n-p4nel');
    } catch (error) {
      console.error('Wyjątek podczas tworzenia administratora:', error);
      toast({
        title: "Błąd podczas tworzenia administratora",
        description: "Wystąpił nieoczekiwany błąd podczas tworzenia administratora.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Jeśli trwa sprawdzanie lub administratorzy istnieją, wyświetl loader
  if (isCheckingAdmins || hasAdmins) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">Sprawdzanie konfiguracji administratora...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
            <User className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Konfiguracja pierwszego administratora</CardTitle>
          <CardDescription>
            Utworzenie konta głównego administratora systemu
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="block text-sm font-medium">
                Hasło
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 znaków"
                  className="pl-10"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Hasło musi mieć co najmniej 8 znaków
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="block text-sm font-medium">
                Potwierdź hasło
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Powtórz hasło"
                  className="pl-10"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full mt-6" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Tworzenie administratora...
                </>
              ) : (
                'Utwórz konto administratora'
              )}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="justify-center text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Secret Sparks. Wszelkie prawa zastrzeżone.</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FirstAdminSetup;
