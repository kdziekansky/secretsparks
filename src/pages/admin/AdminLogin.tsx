
import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Lock, UserPlus, KeyRound, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationCode, setRegistrationCode] = useState('');
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutEndTime, setLockoutEndTime] = useState<Date | null>(null);
  const { login, isLoading, isAuthenticated } = useAdminAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Sprawdź czy konto jest zablokowane
  useEffect(() => {
    const lockedUntil = localStorage.getItem('admin_login_lockout');
    if (lockedUntil) {
      const lockoutTime = new Date(lockedUntil);
      if (lockoutTime > new Date()) {
        setIsLocked(true);
        setLockoutEndTime(lockoutTime);
      } else {
        localStorage.removeItem('admin_login_lockout');
        setIsLocked(false);
        setLockoutEndTime(null);
      }
    }
  }, []);

  // Odliczanie czasu blokady
  useEffect(() => {
    if (isLocked && lockoutEndTime) {
      const interval = setInterval(() => {
        if (lockoutEndTime <= new Date()) {
          setIsLocked(false);
          setLockoutEndTime(null);
          localStorage.removeItem('admin_login_lockout');
          clearInterval(interval);
        }
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [isLocked, lockoutEndTime]);

  // Przekieruj zalogowanego użytkownika jeśli wraca na stronę logowania
  useEffect(() => {
    if (isAuthenticated) {
      console.log('Użytkownik już zalogowany, przekierowuję do dashboard');
      navigate('/spe43al-adm1n-p4nel/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Funkcja blokująca konto po zbyt wielu nieprawidłowych próbach
  const checkAndLockAccount = () => {
    const newAttempts = loginAttempts + 1;
    setLoginAttempts(newAttempts);
    
    // Po 5 nieudanych próbach zablokuj konto na 15 minut
    if (newAttempts >= 5) {
      const lockoutEndTime = new Date();
      lockoutEndTime.setMinutes(lockoutEndTime.getMinutes() + 15);
      
      localStorage.setItem('admin_login_lockout', lockoutEndTime.toISOString());
      setIsLocked(true);
      setLockoutEndTime(lockoutEndTime);
      
      toast({
        title: "Konto tymczasowo zablokowane",
        description: `Zbyt wiele nieudanych prób. Spróbuj ponownie za 15 minut.`,
        variant: "destructive",
      });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Sprawdź czy konto jest zablokowane
    if (isLocked) {
      const timeLeft = lockoutEndTime ? Math.ceil((lockoutEndTime.getTime() - new Date().getTime()) / 60000) : 15;
      toast({
        title: "Logowanie zablokowane",
        description: `Zbyt wiele nieudanych prób. Spróbuj ponownie za ${timeLeft} minut.`,
        variant: "destructive",
      });
      return;
    }
    
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
    try {
      await login(email, password);
      // Reset licznika prób po udanym logowaniu
      setLoginAttempts(0);
    } catch (error) {
      // Zwiększ licznik nieudanych prób
      checkAndLockAccount();
    }
  };

  // Bezpieczna weryfikacja kodu dostępu przy użyciu funkcji brzegowej
  const verifyRegistrationCode = async () => {
    if (!registrationCode) {
      toast({
        title: "Wprowadź kod dostępu",
        description: "Kod dostępu jest wymagany do utworzenia konta administratora.",
        variant: "destructive",
      });
      return;
    }
    
    setIsVerifying(true);
    
    try {
      console.log('Rozpoczynam weryfikację kodu dostępu:', registrationCode);
      
      // Użyj funkcji brzegowej do weryfikacji kodu z dodatkowymi opcjami debugowania
      const response = await supabase.functions.invoke('admin-verify-code', {
        body: { code: registrationCode },
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      console.log('Surowa odpowiedź z funkcji weryfikacji:', response);
      
      if (response.error) {
        console.error('Błąd podczas wywołania funkcji edge:', response.error);
        throw new Error(`Błąd wywołania funkcji: ${response.error.message || response.error}`);
      }
      
      if (response.data && response.data.verified) {
        setIsCodeVerified(true);
        toast({
          title: "Kod weryfikacyjny poprawny",
          description: "Możesz teraz utworzyć konto administratora.",
        });
      } else if (response.data && response.data.error) {
        // Odpowiedź zawiera błąd z funkcji brzegowej
        console.error('Błąd z funkcji brzegowej:', response.data.error);
        throw new Error(response.data.error);
      } else {
        // Zwiększ licznik nieudanych prób
        checkAndLockAccount();
        
        toast({
          title: "Nieprawidłowy kod",
          description: "Wprowadzony kod weryfikacyjny jest nieprawidłowy.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error('Błąd weryfikacji kodu:', error);
      toast({
        title: "Błąd weryfikacji",
        description: error.message || "Wystąpił problem podczas weryfikacji kodu. Sprawdź konsolę przeglądarki.",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Walidacja formularza rejestracji
    if (!email) {
      toast({
        title: "Wprowadź adres email",
        description: "Adres email jest wymagany do utworzenia konta.",
        variant: "destructive",
      });
      return;
    }
    
    if (!password) {
      toast({
        title: "Wprowadź hasło",
        description: "Hasło jest wymagane do utworzenia konta.",
        variant: "destructive",
      });
      return;
    }
    
    if (password.length < 8) {
      toast({
        title: "Zbyt krótkie hasło",
        description: "Hasło musi zawierać co najmniej 8 znaków.",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Hasła nie są zgodne",
        description: "Powtórzone hasło musi być identyczne z hasłem.",
        variant: "destructive",
      });
      return;
    }
    
    // Sprawdzanie listy dozwolonych administratorów zostało przeniesione do logiki po stronie serwera
    
    setIsRegistering(true);
    
    try {
      // Najpierw sprawdzamy, czy admin już istnieje w tabeli admin_users
      const { data: existingAdmin, error: checkError } = await supabase
        .from('admin_users')
        .select('email')
        .eq('email', email)
        .maybeSingle();
      
      if (existingAdmin) {
        toast({
          title: "Konto już istnieje",
          description: "Administrator o tym adresie email już istnieje. Możesz się zalogować.",
          variant: "destructive",
        });
        setIsRegistering(false);
        return;
      }
      
      // Rejestracja w auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin + '/spe43al-adm1n-p4nel/dashboard'
        }
      });
      
      if (error) throw error;
      
      // Tworzymy wpis w tabeli admin_users
      const { error: adminError } = await supabase
        .from('admin_users')
        .insert([{ email }]);
      
      if (adminError) throw adminError;
      
      toast({
        title: "Konto utworzone",
        description: "Konto administratora zostało utworzone. Możesz się teraz zalogować.",
      });
      
      // Automatyczne logowanie po rejestracji
      await login(email, password);
      
    } catch (error: any) {
      console.error('Błąd podczas rejestracji:', error);
      toast({
        title: "Błąd rejestracji",
        description: error.message || "Nie udało się utworzyć konta administratora.",
        variant: "destructive",
      });
    } finally {
      setIsRegistering(false);
    }
  };

  // Oblicz czas pozostały do odblokowania
  const getRemainingLockoutTime = () => {
    if (!lockoutEndTime) return '';
    
    const now = new Date();
    const diff = Math.max(0, lockoutEndTime.getTime() - now.getTime());
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
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
          {isLocked ? (
            <div className="space-y-4">
              <div className="bg-destructive/10 rounded-lg p-4 text-center">
                <Shield className="h-6 w-6 text-destructive mx-auto mb-2" />
                <h3 className="font-medium mb-1">Konto tymczasowo zablokowane</h3>
                <p className="text-sm text-muted-foreground">
                  Zbyt wiele nieudanych prób logowania. 
                  Spróbuj ponownie za {getRemainingLockoutTime()}.
                </p>
              </div>
            </div>
          ) : (
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Logowanie</TabsTrigger>
                <TabsTrigger value="register">Rejestracja</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="block text-sm font-medium">
                      Email
                    </Label>
                    <Input
                      id="login-email"
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
                    <Label htmlFor="login-password" className="block text-sm font-medium">
                      Hasło
                    </Label>
                    <Input
                      id="login-password"
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
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                {!isCodeVerified ? (
                  <div className="space-y-4">
                    <div className="bg-muted/50 rounded-lg p-4 mb-4">
                      <div className="flex items-start">
                        <Shield className="h-5 w-5 text-amber-500 mt-0.5 mr-2" />
                        <p className="text-sm text-muted-foreground">
                          Rejestracja konta administratora wymaga podania kodu dostępu.
                          Skontaktuj się z głównym administratorem, aby uzyskać kod.
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="registration-code" className="block text-sm font-medium">
                        Kod dostępu
                      </Label>
                      <Input
                        id="registration-code"
                        name="registrationCode"
                        type="password"
                        required
                        value={registrationCode}
                        onChange={(e) => setRegistrationCode(e.target.value)}
                        placeholder="Wprowadź kod dostępu"
                      />
                    </div>
                    
                    <Button 
                      type="button" 
                      className="w-full" 
                      onClick={verifyRegistrationCode}
                      disabled={isVerifying}
                    >
                      {isVerifying ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Weryfikacja...
                        </>
                      ) : (
                        <>
                          <KeyRound className="mr-2 h-4 w-4" />
                          Weryfikuj kod
                        </>
                      )}
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-email" className="block text-sm font-medium">
                        Email
                      </Label>
                      <Input
                        id="register-email"
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
                      <Label htmlFor="register-password" className="block text-sm font-medium">
                        Hasło
                      </Label>
                      <Input
                        id="register-password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="register-confirm-password" className="block text-sm font-medium">
                        Powtórz hasło
                      </Label>
                      <Input
                        id="register-confirm-password"
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isRegistering}
                    >
                      {isRegistering ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Tworzenie konta...
                        </>
                      ) : (
                        <>
                          <UserPlus className="mr-2 h-4 w-4" />
                          Utwórz konto administratora
                        </>
                      )}
                    </Button>
                    
                    <p className="text-xs text-center text-muted-foreground mt-2">
                      Tylko autoryzowane adresy email mogą utworzyć konto administratora
                    </p>
                  </form>
                )}
              </TabsContent>
            </Tabs>
          )}
          
          <div className="text-xs text-center text-muted-foreground mt-6">
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
                      <li>W przypadku nowego konta użyj zakładki "Rejestracja" by utworzyć swoje konto</li>
                      <li>Do rejestracji wymagany jest kod dostępu i autoryzowany adres email</li>
                    </ul>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Zamknij</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
        
        <CardFooter className="justify-center text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Secret Sparks. Wszelkie prawa zastrzeżone.</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLogin;
