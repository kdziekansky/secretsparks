
import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { KeyIcon, LockIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AdminLogin = () => {
  const { login, isAuthenticated, isLoading } = useAdminAuth();
  const [registrationCode, setRegistrationCode] = useState('');
  const [showRegistrationCode, setShowRegistrationCode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/spe43al-adm1n-p4nel/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const toggleRegistrationCodeVisibility = () => {
    setShowRegistrationCode(!showRegistrationCode);
  };

  const verifyRegistrationCode = async (code: string): Promise<boolean> => {
    console.log('Rozpoczynam weryfikację kodu dostępu:', code);
    setVerificationError(null);
    setIsVerifying(true);
    
    try {
      toast.loading("Weryfikacja kodu", {
        description: "Trwa weryfikacja kodu administratora...",
      });
      
      // Wywołanie funkcji Edge z poprawnym JSON
      const { data, error } = await supabase.functions.invoke('admin-verify-code', {
        method: 'POST',
        body: { code },
      });
      
      console.log('Odpowiedź z funkcji weryfikacji:', data, error);
      
      toast.dismiss();
      
      if (error) {
        console.error('Błąd weryfikacji kodu:', error);
        setVerificationError(`Błąd funkcji Edge: ${error.message || 'Nieznany błąd'}`);
        toast.error('Błąd weryfikacji kodu', {
          description: `Błąd funkcji Edge: ${error.message || 'Nieznany błąd'}`
        });
        return false;
      }
      
      if (!data?.verified) {
        setVerificationError('Nieprawidłowy kod administratora');
        toast.error('Nieprawidłowy kod administratora', {
          description: 'Podany kod dostępu jest nieprawidłowy.'
        });
        return false;
      }
      
      setVerificationError(null);
      toast.success('Kod zweryfikowany', {
        description: 'Kod administratora poprawny. Możesz się zalogować.'
      });
      
      return true;
    } catch (err: any) {
      console.error('Błąd weryfikacji kodu:', err);
      
      toast.dismiss();
      setVerificationError(`Błąd funkcji Edge: ${err.message || 'Nieznany błąd'}`);
      toast.error('Błąd weryfikacji kodu', {
        description: `Błąd funkcji Edge: ${err.message || 'Nieznany błąd'}`
      });
      
      return false;
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Email i hasło są wymagane', {
        description: 'Wprowadź swój email i hasło.'
      });
      return;
    }

    try {
      if (registrationCode) {
        const isCodeValid = await verifyRegistrationCode(registrationCode);
        if (!isCodeValid) return;
      }
      
      await login(email, password);
    } catch (error: any) {
      console.error('Błąd logowania:', error);
      toast.error('Błąd logowania', {
        description: error.message || 'Nieprawidłowy email lub hasło'
      });
    }
  };

  const handleVerifyCode = async () => {
    if (!registrationCode) {
      toast.error('Kod dostępu jest wymagany', {
        description: 'Wprowadź kod dostępu administratora.'
      });
      return;
    }

    await verifyRegistrationCode(registrationCode);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-card-dark rounded-lg shadow-lg border border-gray-800">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <LockIcon className="h-12 w-12 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold mb-1">Panel administracyjny</h1>
          <p className="text-gray-400">Dostęp tylko dla autoryzowanych użytkowników</p>
        </div>

        <div className="flex rounded-md overflow-hidden mb-6">
          <button
            className={`flex-1 py-2 text-center transition-colors ${
              activeTab === 'login' ? 'bg-gray-800 text-white' : 'bg-gray-900 text-gray-400'
            }`}
            onClick={() => setActiveTab('login')}
          >
            Logowanie
          </button>
          <button
            className={`flex-1 py-2 text-center transition-colors ${
              activeTab === 'register' ? 'bg-gray-800 text-white' : 'bg-gray-900 text-gray-400'
            }`}
            onClick={() => setActiveTab('register')}
          >
            Rejestracja
          </button>
        </div>

        {activeTab === 'register' && (
          <div className="p-4 bg-gray-900 rounded-md">
            <div className="flex items-start gap-2">
              <div className="mt-1 text-red-500 mr-1">&#8226;</div>
              <p className="text-sm text-gray-300">
                Rejestracja konta administratora wymaga podania kodu dostępu. 
                Skontaktuj się z głównym administratorem, aby uzyskać kod.
              </p>
            </div>
          </div>
        )}
        
        {verificationError && (
          <Alert variant="destructive" className="bg-red-900/30 border-red-800 text-red-300">
            <AlertDescription className="flex items-center gap-2">
              <span className="text-red-500">&#9888;</span>
              <span>
                Błąd weryfikacji!<br />
                {verificationError}
              </span>
            </AlertDescription>
          </Alert>
        )}

        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="space-y-2">
            <Label htmlFor="registrationCode" className="text-gray-300">Kod dostępu</Label>
            <div className="relative">
              <Input
                id="registrationCode"
                type={showRegistrationCode ? 'text' : 'password'}
                className="bg-gray-900 border-gray-700 text-white pl-10 pr-10"
                value={registrationCode}
                onChange={(e) => setRegistrationCode(e.target.value)}
                placeholder="••••••••••••••••••••••••••••••••"
                disabled={isLoading || isVerifying}
              />
              <KeyIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                onClick={toggleRegistrationCodeVisibility}
              >
                {showRegistrationCode ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
              </button>
            </div>
            
            <Button
              type="button"
              variant="destructive"
              className="w-full mt-2"
              disabled={isLoading || isVerifying || !registrationCode}
              onClick={handleVerifyCode}
            >
              {isVerifying ? 'Weryfikuję kod...' : 'Weryfikuj kod'}
            </Button>
          </div>

          {activeTab === 'login' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  className="bg-gray-900 border-gray-700 text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  placeholder="twój@email.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">Hasło</Label>
                <Input
                  id="password"
                  type="password"
                  className="bg-gray-900 border-gray-700 text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  placeholder="••••••••••••"
                />
              </div>

              <Button
                type="submit"
                variant="default"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Logowanie...' : 'Zaloguj się'}
              </Button>
            </>
          )}

          <div className="text-center text-sm mt-4">
            <a href="#" className="text-gray-400 hover:text-gray-300">
              Potrzebujesz pomocy z logowaniem?
            </a>
          </div>
        </form>

        <div className="text-center text-xs text-gray-500 pt-4 border-t border-gray-800">
          © 2025 Secret Sparks. Wszelkie prawa zastrzeżone.
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
