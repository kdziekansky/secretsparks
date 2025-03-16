
import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { LockIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AdminLogin = () => {
  const { login, isAuthenticated, isLoading } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginInProgress, setLoginInProgress] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/spe43al-adm1n-p4nel/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
      setLoginInProgress(true);
      const normalizedEmail = email.trim().toLowerCase();
      console.log('Próba logowania z danymi:', { email: normalizedEmail });
      
      // Bezpośrednio przekaż dane do funkcji login w kontekście
      await login(normalizedEmail, password);
      
      // Pomyślne logowanie jest obsługiwane przez useEffect z isAuthenticated
    } catch (error: any) {
      console.error('Błąd logowania:', error);
      toast.error('Błąd logowania', {
        description: error.message || 'Nieprawidłowy email lub hasło'
      });
    } finally {
      setLoginInProgress(false);
    }
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

        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300">Email</Label>
            <Input
              id="email"
              type="email"
              className="bg-gray-900 border-gray-700 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loginInProgress || isLoading}
              placeholder="twój@email.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-300">Hasło</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="bg-gray-900 border-gray-700 text-white pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loginInProgress || isLoading}
                placeholder="••••••••••••"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            variant="default"
            className="w-full"
            disabled={loginInProgress || isLoading}
          >
            {loginInProgress || isLoading ? 'Logowanie...' : 'Zaloguj się'}
          </Button>

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
