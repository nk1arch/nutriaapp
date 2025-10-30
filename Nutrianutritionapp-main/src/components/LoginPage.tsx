import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Leaf } from 'lucide-react';
import type { User } from '../App';

interface LoginPageProps {
  onLogin: (user: User) => void;
  onNavigateToRegister: () => void;
}

export function LoginPage({ onLogin, onNavigateToRegister }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login - in real app would validate credentials
    const mockUser: User = {
      id: '1',
      name: 'João Silva',
      email: email,
      hasConnectedProfessional: true,
      dailyCalories: 2000,
      height: 175,
      weight: 80,
      age: 30,
      gender: 'Masculino',
      goal: 'Perder peso'
    };
    
    onLogin(mockUser);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 to-white dark:from-gray-950 dark:to-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl">NutrIA</CardTitle>
          <CardDescription>
            Sua jornada de nutrição inteligente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              Entrar
            </Button>
          </form>
          <div className="mt-4 text-center">
            <button
              onClick={onNavigateToRegister}
              className="text-green-600 hover:underline dark:text-green-400"
            >
              Não tem uma conta? Registre-se
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
