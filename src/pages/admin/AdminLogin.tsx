
import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Lock, UserPlus, KeyRound, Shield, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
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
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const { login, isLoading, isAuthenticated } = useAdminAuth();
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

  // Przekieruj zalogowanego użytkownika
  useEffect(() => {
    if (isAuthenticated) {
      console.log('Użytkownik już zalogowany, przekierowuję do dashboard');
      const from = location.state?.from?.pathname || '/spe43al-adm1n-p4nel/dashboard';
      navigate(from);
    }
  }, [isAuthenticated, navigate, location]);

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
      
      toast.error("Konto tymczasowo zablokowane", {
        description: `Zbyt wiele nieudanych prób. Spróbuj ponownie za 15 minut.`,
      });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Sprawdź czy konto jest zablokowane
    if (isLocked) {
      const timeLeft = lockoutEndTime ? Math.ceil((lockoutEndTime.getTime() - new Date().getTime()) / 60000) : 15;
      toast.error("Logowanie zablokowane", {
        description: `Zbyt wiele nieudanych prób. Spróbuj ponownie za ${timeLeft} minut.`,
      });
      return;
    }
    
    // Walidacja pól formularza
    if (!email) {
      toast.error("Wprowadź adres email", {
        description: "Adres email jest wymagany do zalogowania się.",
      });
      return;
    }
    
    if (!password) {
      toast.error("Wprowadź hasło", {
        description: "Hasło jest wymagane do zalogowania się.",
      });
      return;
    }
    
    try {
      await login(email, password);
      // Reset licznika prób po udanym logowaniu
      setLoginAttempts(0);
    } catch (error: any) {
      console.error('Błąd logowania:', error);
      toast.error("Błąd logowania", {
        description: error.message || "Nieprawidłowy email lub hasło.",
      });
      
      // Zwiększ licznik nieudanych prób
      checkAndLockAccount();
    }
  };

  // Bezpieczna weryfikacja kodu dostępu przy użyciu funkcji brzegowej
  const verifyRegistrationCode = async () => {
    // Resetujemy poprzednie błędy
    setVerificationError(null);
    setDebugInfo(null);
    
    if (!registrationCode) {
      toast.error("Wprowadź kod dostępu", {
        description: "Kod dostępu jest wymagany do utworzenia konta administratora.",
      });
      return;
    }
    
    setIsVerifying(true);
    
    try {
      console.log('Rozpoczynam weryfikację kodu dostępu:', registrationCode);
      
      toast.info("Weryfikacja kodu", {
        description: "Trwa weryfikacja kodu administratora...",
      });
      
      // Poprawione wywołanie funkcji brzegowej bez nagłówka prefer
      const { data, error } = await supabase.functions.invoke('admin-verify-code', {
        method: 'POST',
        body: { code: registrationCode },
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Odpowiedź z funkcji weryfikacji:', data, error);
      
      if (error) {
        throw new Error(`Błąd funkcji Edge: ${error.message || JSON.stringify(error)}`);
      }
      
      if (data && data.verified) {
        setIsCodeVerified(true);
        setVerificationError(null);
        toast.success("Kod weryfikacyjny poprawny", {
          description: "Możesz teraz utworzyć konto administratora.",
        });
      } else if (data && data.error) {
        console.error('Błąd z funkcji brzegowej:', data.error);
        setVerificationError(data.error);
        
        if (data.debug) {
          setDebugInfo(data.debug);
        }
        
        toast.error("Błąd weryfikacji", {
          description: data.error,
        });
        
        // Zwiększ licznik nieudanych prób
        checkAndLockAccount();
      } else {
        setVerificationError("Nieprawidłowy kod weryfikacyjny");
        
        if (data && data.debug) {
          setDebugInfo(data.debug);
        }
        
        toast.error("Nieprawidłowy kod", {
          description: "Wprowadzony kod weryfikacyjny jest nieprawidłowy.",
        });
        
        // Zwiększ licznik nieudanych prób
        checkAndLockAccount();
      }
    } catch (error: any) {
      console.error('Błąd weryfikacji kodu:', error);
      
      // Ustawienie komunikatu błędu
      setVerificationError(error.message || "Wystąpił problem podczas weryfikacji kodu");
      
      toast.error("Błąd weryfikacji", {
        description: error.message || "Wystąpił problem podczas weryfikacji kodu. Sprawdź konsolę.",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Walidacja formularza rejestracji
    if (!email) {
      toast.error("Wprowadź adres email", {
        description: "Adres email jest wymagany do utworzenia konta.",
      });
      return;
    }
    
    if (!password) {
      toast.error("Wprowadź hasło", {
        description: "Hasło jest wymagane do utworzenia konta.",
      });
      return;
    }
    
    if (password.length < 8) {
      toast.error("Zbyt krótkie hasło", {
        description: "Hasło musi zawierać co najmniej 8 znaków.",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Hasła nie są zgodne", {
        description: "Powtórzone hasło musi być identyczne z hasłem.",
      });
      return;
    }
    
    setIsRegistering(true);
    
    try {
      // Najpierw sprawdzamy, czy admin już istnieje
      const { data: existingAdmin, error: checkError } = await supabase
        .from('admin_users')
        .select('email')
        .eq('email', email)
        .maybeSingle();
      
      if (existingAdmin) {
        toast.error("Konto już istnieje", {
          description: "Administrator o tym adresie email już istnieje. Możesz się zalogować.",
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
      
      toast.success("Konto utworzone", {
        description: "Konto administratora zostało utworzone. Możesz się teraz zalogować.",
      });
      
      // Automatyczne logowanie po rejestracji
      await login(email, password);
      
    } catch (error: any) {
      console.error('Błąd podczas rejestracji:', error);
      toast.error("Błąd rejestracji", {
        description: error.message || "Nie udało się utworzyć konta administratora.",
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
                    
                    {verificationError && (
                      <Alert variant="destructive" className="mb-4">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Błąd weryfikacji</AlertTitle>
                        <AlertDescription>
                          {verificationError}
                          {debugInfo && (
                            <details className="mt-2 text-xs">
                              <summary>Informacje debugowania</summary>
                              <pre className="mt-2 p-2 bg-muted/20 rounded text-xs overflow-auto">
                                {JSON.stringify(debugInfo, null, 2)}
                              </pre>
                            </details>
                          )}
                        </AlertDescription>
                      </Alert>
                    )}
                    
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
