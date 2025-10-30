import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { User, Settings, FileText, LogOut, Bell, Moon, Globe } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import type { User as UserType } from '../App';

interface ProfilePageProps {
  user: UserType;
  onLogout: () => void;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export function ProfilePage({ user, onLogout, darkMode, setDarkMode }: ProfilePageProps) {
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    height: user.height,
    weight: user.weight,
    age: user.age,
    goal: user.goal
  });

  const [notifications, setNotifications] = useState({
    mealReminders: true,
    waterReminders: true,
    weeklyReports: true,
    achievements: true
  });

  const handleSaveProfile = () => {
    toast.success('Perfil atualizado com sucesso!');
  };

  const handleSaveSettings = () => {
    toast.success('Configurações salvas!');
  };

  const calculateBMI = () => {
    const heightInMeters = user.height / 100;
    const bmi = user.weight / (heightInMeters * heightInMeters);
    return bmi.toFixed(1);
  };

  const getBMICategory = () => {
    const bmi = parseFloat(calculateBMI());
    if (bmi < 18.5) return { text: 'Abaixo do peso', color: 'text-yellow-600' };
    if (bmi < 25) return { text: 'Peso normal', color: 'text-green-600' };
    if (bmi < 30) return { text: 'Sobrepeso', color: 'text-orange-600' };
    return { text: 'Obesidade', color: 'text-red-600' };
  };

  const bmiCategory = getBMICategory();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 pb-24">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="pt-4">
          <h1 className="text-2xl text-gray-900 dark:text-white">Perfil</h1>
          <p className="text-gray-600 dark:text-gray-400">Gerencie suas informações e configurações</p>
        </div>

        {/* Profile Summary */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="bg-green-600 text-white text-3xl">
                  {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl text-gray-900 dark:text-white">{user.name}</h2>
                <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
                  <Badge variant="outline">{user.age} anos</Badge>
                  <Badge variant="outline">{user.height} cm</Badge>
                  <Badge variant="outline">{user.weight} kg</Badge>
                  <Badge className="bg-green-600 text-white">{user.goal}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="info">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Dados
            </TabsTrigger>
            <TabsTrigger value="anamnese" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Anamnese
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Configurações
            </TabsTrigger>
          </TabsList>

          {/* Personal Info */}
          <TabsContent value="info" className="space-y-6 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome completo</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Idade</Label>
                    <Input
                      id="age"
                      type="number"
                      value={profileData.age}
                      onChange={(e) => setProfileData({ ...profileData, age: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Altura (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      value={profileData.height}
                      onChange={(e) => setProfileData({ ...profileData, height: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Peso (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      value={profileData.weight}
                      onChange={(e) => setProfileData({ ...profileData, weight: Number(e.target.value) })}
                    />
                  </div>
                </div>
                <Button onClick={handleSaveProfile} className="w-full bg-green-600 hover:bg-green-700">
                  Salvar Alterações
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>IMC - Índice de Massa Corporal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <div className="text-5xl text-gray-900 dark:text-white mb-2">{calculateBMI()}</div>
                  <div className={`text-lg ${bmiCategory.color}`}>{bmiCategory.text}</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Anamnese */}
          <TabsContent value="anamnese" className="space-y-6 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Dados de Anamnese</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Objetivo Nutricional</h3>
                    <p className="text-gray-600 dark:text-gray-400">{user.goal}</p>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Alergias e Restrições</h3>
                    <p className="text-gray-600 dark:text-gray-400">Nenhuma alergia registrada</p>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Condições de Saúde</h3>
                    <p className="text-gray-600 dark:text-gray-400">Nenhuma condição especial registrada</p>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Nível de Atividade Física</h3>
                    <p className="text-gray-600 dark:text-gray-400">Moderado - 3 a 4 vezes por semana</p>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Preferências Alimentares</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline">Comida caseira</Badge>
                      <Badge variant="outline">Frutas</Badge>
                      <Badge variant="outline">Proteínas magras</Badge>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Atualizar Anamnese
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profissional Conectado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Dra. Maria Nutricionista</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">CRN: 12345</p>
                  </div>
                  <Badge className="bg-green-600 text-white">Conectado</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-6 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notificações
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Lembretes de refeição</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Receba notificações nos horários das refeições</p>
                  </div>
                  <Switch
                    checked={notifications.mealReminders}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, mealReminders: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Lembretes de água</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Receba lembretes para beber água</p>
                  </div>
                  <Switch
                    checked={notifications.waterReminders}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, waterReminders: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Relatórios semanais</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Receba um resumo semanal do seu progresso</p>
                  </div>
                  <Switch
                    checked={notifications.weeklyReports}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReports: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Conquistas</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Seja notificado quando conquistar um objetivo</p>
                  </div>
                  <Switch
                    checked={notifications.achievements}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, achievements: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Aparência</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Modo noturno</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Tema escuro para reduzir cansaço visual</p>
                    </div>
                  </div>
                  <Switch
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Preferências
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Idioma</Label>
                  <Input value="Português (Brasil)" disabled />
                </div>
                <div className="space-y-2">
                  <Label>Unidade de medida</Label>
                  <Input value="Métrica (kg, cm)" disabled />
                </div>
              </CardContent>
            </Card>

            <Button onClick={handleSaveSettings} className="w-full bg-green-600 hover:bg-green-700">
              Salvar Configurações
            </Button>

            <Separator />

            <Card className="border-red-200 dark:border-red-900">
              <CardContent className="pt-6">
                <Button 
                  variant="outline" 
                  className="w-full text-red-600 border-red-300 hover:bg-red-50 dark:hover:bg-red-950"
                  onClick={onLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair da Conta
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
