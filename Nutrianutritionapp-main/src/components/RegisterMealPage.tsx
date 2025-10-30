import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { ArrowLeft, Plus, X, Search } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface RegisterMealPageProps {
  onBack: () => void;
}

interface Food {
  name: string;
  quantity: string;
  calories: number;
}

const popularFoods = [
  { name: 'Arroz branco', calories: 130, unit: '100g' },
  { name: 'Feijão preto', calories: 77, unit: '100g' },
  { name: 'Frango grelhado', calories: 165, unit: '100g' },
  { name: 'Batata doce', calories: 86, unit: '100g' },
  { name: 'Ovo cozido', calories: 155, unit: '1 unidade' },
  { name: 'Banana', calories: 89, unit: '1 unidade' },
  { name: 'Maçã', calories: 52, unit: '1 unidade' },
  { name: 'Pão integral', calories: 69, unit: '1 fatia' },
];

export function RegisterMealPage({ onBack }: RegisterMealPageProps) {
  const [mealType, setMealType] = useState('');
  const [mealTime, setMealTime] = useState('');
  const [foods, setFoods] = useState<Food[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [customFood, setCustomFood] = useState({ name: '', quantity: '', calories: '' });

  const totalCalories = foods.reduce((sum, food) => sum + food.calories, 0);

  const addFood = (food: typeof popularFoods[0]) => {
    setFoods([...foods, { name: food.name, quantity: food.unit, calories: food.calories }]);
    setSearchTerm('');
  };

  const addCustomFood = () => {
    if (customFood.name && customFood.quantity && customFood.calories) {
      setFoods([...foods, { 
        name: customFood.name, 
        quantity: customFood.quantity, 
        calories: Number(customFood.calories) 
      }]);
      setCustomFood({ name: '', quantity: '', calories: '' });
    }
  };

  const removeFood = (index: number) => {
    setFoods(foods.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Refeição registrada com sucesso!');
    setTimeout(() => {
      onBack();
    }, 1000);
  };

  const filteredFoods = popularFoods.filter(food => 
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 pb-24">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 pt-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onBack}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl text-gray-900 dark:text-white">Registrar Refeição</h1>
            <p className="text-gray-600 dark:text-gray-400">Adicione os alimentos consumidos</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Meal Info */}
          <Card>
            <CardHeader>
              <CardTitle>Informações da Refeição</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mealType">Tipo de Refeição</Label>
                <Select value={mealType} onValueChange={setMealType} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breakfast">Café da manhã</SelectItem>
                    <SelectItem value="morning-snack">Lanche da manhã</SelectItem>
                    <SelectItem value="lunch">Almoço</SelectItem>
                    <SelectItem value="afternoon-snack">Lanche da tarde</SelectItem>
                    <SelectItem value="dinner">Jantar</SelectItem>
                    <SelectItem value="supper">Ceia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Horário</Label>
                <Input
                  id="time"
                  type="time"
                  value={mealTime}
                  onChange={(e) => setMealTime(e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Search Foods */}
          <Card>
            <CardHeader>
              <CardTitle>Buscar Alimentos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Buscar alimento..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              {searchTerm && (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {filteredFoods.map((food, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                      onClick={() => addFood(food)}
                    >
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{food.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{food.unit}</div>
                      </div>
                      <Badge className="bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400 border-none">
                        {food.calories} kcal
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Custom Food */}
          <Card>
            <CardHeader>
              <CardTitle>Adicionar Alimento Personalizado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Nome do alimento</Label>
                  <Input
                    placeholder="Ex: Salada"
                    value={customFood.name}
                    onChange={(e) => setCustomFood({ ...customFood, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Quantidade</Label>
                  <Input
                    placeholder="Ex: 100g"
                    value={customFood.quantity}
                    onChange={(e) => setCustomFood({ ...customFood, quantity: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Calorias</Label>
                  <Input
                    type="number"
                    placeholder="Ex: 50"
                    value={customFood.calories}
                    onChange={(e) => setCustomFood({ ...customFood, calories: e.target.value })}
                  />
                </div>
              </div>
              <Button 
                type="button" 
                onClick={addCustomFood}
                variant="outline"
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Alimento
              </Button>
            </CardContent>
          </Card>

          {/* Added Foods */}
          {foods.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Alimentos Adicionados</CardTitle>
                  <Badge className="bg-green-600 text-white">
                    Total: {totalCalories} kcal
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {foods.map((food, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">{food.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{food.quantity}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400">
                          {food.calories} kcal
                        </Badge>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFood(index)}
                          className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={foods.length === 0 || !mealType || !mealTime}
          >
            Registrar Refeição
          </Button>
        </form>
      </div>
    </div>
  );
}
