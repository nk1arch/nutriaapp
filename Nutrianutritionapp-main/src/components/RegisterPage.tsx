import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Leaf } from 'lucide-react';
import type { User } from '../App';

interface RegisterPageProps {
  onRegister: (user: User) => void;
  onNavigateToLogin: () => void;
}

export function RegisterPage({ onRegister, onNavigateToLogin }: RegisterPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    height: '',
    weight: '',
    gender: '',
    goal: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const mockUser: User = {
      id: Math.random().toString(),
      name: formData.name,
      email: formData.email,
      hasConnectedProfessional: false,
      dailyCalories: 2000,
      height: Number(formData.height),
      weight: Number(formData.weight),
      age: Number(formData.age),
      gender: formData.gender,
      goal: formData.goal
    };
    
    onRegister(mockUser);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 to-white dark:from-gray-950 dark:to-gray-900">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl">Criar Conta</CardTitle>
          <CardDescription>
            Preencha seus dados para começar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  placeholder="João Silva"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Idade</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="30"
                  value={formData.age}
                  onChange={(e) => handleChange('age', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Altura (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="175"
                  value={formData.height}
                  onChange={(e) => handleChange('height', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Peso (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="80"
                  value={formData.weight}
                  onChange={(e) => handleChange('weight', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gender">Sexo</Label>
                <Select value={formData.gender} onValueChange={(value) => handleChange('gender', value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Masculino">Masculino</SelectItem>
                    <SelectItem value="Feminino">Feminino</SelectItem>
                    <SelectItem value="Outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="goal">Objetivo</Label>
                <Select value={formData.goal} onValueChange={(value) => handleChange('goal', value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Perder peso">Perder peso</SelectItem>
                    <SelectItem value="Manter peso">Manter peso</SelectItem>
                    <SelectItem value="Ganhar peso">Ganhar peso</SelectItem>
                    <SelectItem value="Ganhar massa muscular">Ganhar massa muscular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              Criar conta
            </Button>
          </form>
          <div className="mt-4 text-center">
            <button
              onClick={onNavigateToLogin}
              className="text-green-600 hover:underline dark:text-green-400"
            >
              Já tem uma conta? Faça login
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
