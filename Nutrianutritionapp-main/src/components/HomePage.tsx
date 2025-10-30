import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Flame, TrendingUp, Clock, Apple, Plus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { User } from '../App';
import type { Page } from '../App';

interface HomePageProps {
  user: User;
  navigateTo: (page: Page) => void;
}

const mockWeekData = [
  { day: 'Seg', calories: 1850 },
  { day: 'Ter', calories: 2100 },
  { day: 'Qua', calories: 1950 },
  { day: 'Qui', calories: 2000 },
  { day: 'Sex', calories: 1800 },
  { day: 'Sab', calories: 2200 },
  { day: 'Dom', calories: 1900 },
];

const mockMealsToday = [
  { name: 'Café da manhã', time: '08:00', calories: 450, foods: ['Pão integral', 'Ovo', 'Café com leite'] },
  { name: 'Lanche da manhã', time: '10:30', calories: 150, foods: ['Maçã', 'Castanhas'] },
  { name: 'Almoço', time: '12:30', calories: 650, foods: ['Arroz', 'Feijão', 'Frango grelhado', 'Salada'] },
];

const nextMeal = {
  name: 'Lanche da tarde',
  time: '16:00',
  calories: 200,
  foods: ['Iogurte natural', 'Granola', 'Banana']
};

export function HomePage({ user, navigateTo }: HomePageProps) {
  const consumedCalories = mockMealsToday.reduce((sum, meal) => sum + meal.calories, 0);
  const remainingCalories = user.dailyCalories - consumedCalories;
  const progressPercentage = (consumedCalories / user.dailyCalories) * 100;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 pb-24">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="pt-4">
          <h1 className="text-2xl text-gray-900 dark:text-white">Olá, {user.name.split(' ')[0]}! 👋</h1>
          <p className="text-gray-600 dark:text-gray-400">Acompanhe seu progresso diário</p>
        </div>

        {/* Calories Card */}
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Flame className="w-5 h-5" />
              Calorias de Hoje
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-4xl">{consumedCalories}</div>
                <div className="text-green-100">de {user.dailyCalories} kcal</div>
              </div>
              <div className="text-right">
                <div className="text-2xl">{remainingCalories}</div>
                <div className="text-green-100">restantes</div>
              </div>
            </div>
            <Progress value={progressPercentage} className="h-3 bg-green-400" />
          </CardContent>
        </Card>

        {/* Weekly Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Consumo Semanal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={mockWeekData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="calories" stroke="#16a34a" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Next Meal */}
        <Card className="border-green-200 dark:border-green-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-600" />
              Próxima Refeição
            </CardTitle>
            <CardDescription>{nextMeal.name} - {nextMeal.time}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Meta de calorias</span>
                <Badge variant="outline" className="bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400">
                  {nextMeal.calories} kcal
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Alimentos sugeridos:</p>
                <div className="flex flex-wrap gap-2">
                  {nextMeal.foods.map((food, index) => (
                    <Badge key={index} variant="secondary">{food}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Meals Registered Today */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Apple className="w-5 h-5" />
                Refeições de Hoje
              </CardTitle>
              <Button 
                size="sm" 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => navigateTo('meal')}
              >
                <Plus className="w-4 h-4 mr-1" />
                Adicionar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockMealsToday.map((meal, index) => (
                <div key={index} className="flex items-start justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900 dark:text-white">{meal.name}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{meal.time}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {meal.foods.map((food, idx) => (
                        <span key={idx} className="text-sm text-gray-600 dark:text-gray-400">
                          {food}{idx < meal.foods.length - 1 ? ',' : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Badge className="bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400 border-none">
                    {meal.calories} kcal
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
