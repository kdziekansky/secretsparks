import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { EyeIcon, EyeOffIcon, ShieldAlertIcon, KeyIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const AdminLogin = () => {
  const { login, isAuthenticated, isLoading } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationCode, setRegistrationCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRegistrationCode, setShowRegistrationCode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/spe43al-adm1n-p4nel/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRegistrationCodeVisibility = () => {
    setShowRegistrationCode(!showRegistrationCode);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!registrationCode) {
      toast.error('Kod dostępu jest wymagany', {
        description: 'Wprowadź kod dostępu administratora.'
      });
      return;
    }

    if (!email || !password) {
      toast.error('Email i hasło są wymagane', {
        description: 'Wprowadź swój email i hasło.'
      });
      return;
    }

    try {
      const isCodeValid = await verifyRegistrationCode(registrationCode);
      if (isCodeValid) {
        await login(email, password);
      }
    } catch (error: any) {
      console.error('Błąd logowania:', error);
      toast.error('Błąd logowania', {
        description: error.message || 'Nieprawidłowy email lub hasło'
      });
    }
  };

  // Weryfikacja kodu dostępowego administratora
  const verifyRegistrationCode = async (registrationCode: string): Promise<boolean> => {
    console.log('Rozpoczynam weryfikację kodu dostępu:', registrationCode);
    
    try {
      toast.loading("Weryfikacja kodu", {
        description: "Trwa weryfikacja kodu administratora...",
      });
      
      // Wywołanie funkcji brzegowej bez nagłówka prefer i innych problematycznych nagłówków
      const { data, error } = await supabase.functions.invoke('admin-verify-code', {
        method: 'POST',
        body: { code: registrationCode },
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Odpowiedź z funkcji weryfikacji:', data, error);
      
      toast.dismiss();
      
      if (error) {
        console.error('Błąd weryfikacji kodu:', error);
        toast.error('Błąd weryfikacji kodu', {
          description: `Błąd funkcji Edge: ${error.message || 'Nieznany błąd'}`
        });
        return false;
      }
      
      if (!data.verified) {
        toast.error('Nieprawidłowy kod administratora', {
          description: 'Podany kod dostępu jest nieprawidłowy.'
        });
        return false;
      }
      
      toast.success('Kod zweryfikowany', {
        description: 'Kod administratora poprawny. Możesz się zalogować.'
      });
      
      return true;
    } catch (err: any) {
      console.error('Błąd weryfikacji kodu:', err);
      
      toast.dismiss();
      toast.error('Błąd weryfikacji kodu', {
        description: `Błąd funkcji Edge: ${err.message || 'Nieznany błąd'}`
      });
      
      return false;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md space-y-4">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Panel Administratora</CardTitle>
          <CardDescription className="text-center">Zaloguj się, aby kontynuować</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="registrationCode">Kod Dostępu</Label>
            <div className="relative">
              <Input
                id="registrationCode"
                type={showRegistrationCode ? 'text' : 'password'}
                value={registrationCode}
                onChange={(e) => setRegistrationCode(e.target.value)}
                placeholder="Wprowadź kod dostępu"
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={toggleRegistrationCodeVisibility}
                aria-label={showRegistrationCode ? 'Ukryj kod dostępu' : 'Pokaż kod dostępu'}
              >
                {showRegistrationCode ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                <span className="sr-only">{showRegistrationCode ? 'Ukryj kod dostępu' : 'Pokaż kod dostępu'}</span>
              </Button>
              <ShieldAlertIcon className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Wprowadź swój email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Hasło</Label>
            <div className="relative">
              <Input
                id="password"
                placeholder="Wprowadź swoje hasło"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? 'Ukryj hasło' : 'Pokaż hasło'}
              >
                {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                <span className="sr-only">{showPassword ? 'Ukryj hasło' : 'Pokaż hasło'}</span>
              </Button>
              <KeyIcon className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleLogin} disabled={isLoading}>
            {isLoading ? (
              <>
                Logowanie...
              </>
            ) : (
              'Zaloguj się'
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLogin;
