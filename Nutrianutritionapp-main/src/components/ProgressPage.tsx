import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { TrendingUp, Target, Calendar, Award } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const dailyData = [
  { hour: '8h', calories: 450 },
  { hour: '10h', calories: 600 },
  { hour: '12h', calories: 1250 },
  { hour: '16h', calories: 1450 },
  { hour: '19h', calories: 2100 },
  { hour: '22h', calories: 2200 },
];

const weeklyData = [
  { day: 'Seg', consumed: 1850, goal: 2000 },
  { day: 'Ter', consumed: 2100, goal: 2000 },
  { day: 'Qua', consumed: 1950, goal: 2000 },
  { day: 'Qui', consumed: 2000, goal: 2000 },
  { day: 'Sex', consumed: 1800, goal: 2000 },
  { day: 'Sab', consumed: 2200, goal: 2000 },
  { day: 'Dom', consumed: 1900, goal: 2000 },
];

const monthlyData = [
  { week: 'Sem 1', consumed: 13800, goal: 14000 },
  { week: 'Sem 2', consumed: 14200, goal: 14000 },
  { week: 'Sem 3', consumed: 13500, goal: 14000 },
  { week: 'Sem 4', consumed: 14000, goal: 14000 },
];

const goals = [
  { name: 'Calorias diárias', current: 1900, target: 2000, unit: 'kcal' },
  { name: 'Proteínas', current: 145, target: 150, unit: 'g' },
  { name: 'Carboidratos', current: 220, target: 250, unit: 'g' },
  { name: 'Gorduras', current: 55, target: 67, unit: 'g' },
  { name: 'Água', current: 1.8, target: 2.5, unit: 'L' },
];

const achievements = [
  { title: '7 dias seguidos', description: 'Manteve a dieta por uma semana', earned: true },
  { title: 'Meta de proteínas', description: 'Atingiu a meta de proteínas por 5 dias', earned: true },
  { title: '30 dias perfeitos', description: 'Manteve a dieta por um mês', earned: false },
  { title: 'Hidratação constante', description: 'Bebeu 2L de água por 14 dias', earned: false },
];

export function ProgressPage() {
  const [activeTab, setActiveTab] = useState('daily');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 pb-24">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="pt-4">
          <h1 className="text-2xl text-gray-900 dark:text-white">Metas e Progresso</h1>
          <p className="text-gray-600 dark:text-gray-400">Acompanhe sua evolução</p>
        </div>

        {/* Progress Charts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Evolução de Consumo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="daily">Diário</TabsTrigger>
                <TabsTrigger value="weekly">Semanal</TabsTrigger>
                <TabsTrigger value="monthly">Mensal</TabsTrigger>
              </TabsList>

              <TabsContent value="daily" className="mt-4">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dailyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="calories" stroke="#16a34a" strokeWidth={2} name="Calorias" />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    Hoje você consumiu 2.200 kcal de 2.000 kcal planejadas. Ótimo trabalho mantendo o controle!
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="weekly" className="mt-4">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="consumed" fill="#16a34a" name="Consumido" />
                    <Bar dataKey="goal" fill="#86efac" name="Meta" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Média semanal: 1.971 kcal/dia. Você está próximo da meta de 2.000 kcal!
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="monthly" className="mt-4">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="consumed" fill="#16a34a" name="Consumido" />
                    <Bar dataKey="goal" fill="#86efac" name="Meta" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                  <p className="text-sm text-purple-800 dark:text-purple-200">
                    Média mensal: 13.875 kcal/semana. Consistência excelente!
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Daily Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Metas Diárias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {goals.map((goal, index) => {
                const percentage = (goal.current / goal.target) * 100;
                const isComplete = percentage >= 100;
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 dark:text-white">{goal.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600 dark:text-gray-400">
                          {goal.current} / {goal.target} {goal.unit}
                        </span>
                        {isComplete && (
                          <Badge className="bg-green-600 text-white">Completo</Badge>
                        )}
                      </div>
                    </div>
                    <Progress 
                      value={Math.min(percentage, 100)} 
                      className={`h-2 ${isComplete ? 'bg-green-200' : ''}`}
                    />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Conquistas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border-2 ${
                    achievement.earned 
                      ? 'bg-green-50 dark:bg-green-950 border-green-300 dark:border-green-800' 
                      : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      achievement.earned 
                        ? 'bg-green-600' 
                        : 'bg-gray-400'
                    }`}>
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">{achievement.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Calendar className="w-8 h-8 mx-auto text-green-600 mb-2" />
                <div className="text-2xl text-gray-900 dark:text-white">28</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Dias de dieta</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Target className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                <div className="text-2xl text-gray-900 dark:text-white">92%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Aderência</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <TrendingUp className="w-8 h-8 mx-auto text-purple-600 mb-2" />
                <div className="text-2xl text-gray-900 dark:text-white">-2.5kg</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Peso perdido</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Award className="w-8 h-8 mx-auto text-yellow-600 mb-2" />
                <div className="text-2xl text-gray-900 dark:text-white">2</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Conquistas</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
