import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { QrCode, Hash } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ConnectProfessionalPageProps {
  onConnect: () => void;
}

export function ConnectProfessionalPage({ onConnect }: ConnectProfessionalPageProps) {
  const [code, setCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      toast.success('Conectado com sucesso ao profissional!');
      setTimeout(() => {
        onConnect();
      }, 1000);
    }
  };

  const handleScanQR = () => {
    setIsScanning(true);
    // Simulate QR code scanning
    setTimeout(() => {
      setIsScanning(false);
      toast.success('QR Code lido com sucesso!');
      setTimeout(() => {
        onConnect();
      }, 1000);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 to-white dark:from-gray-950 dark:to-gray-900">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle>Conectar com Profissional</CardTitle>
          <CardDescription>
            Conecte-se com seu nutricionista para receber sua dieta personalizada
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="code" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="code" className="flex items-center gap-2">
                <Hash className="w-4 h-4" />
                Código
              </TabsTrigger>
              <TabsTrigger value="qr" className="flex items-center gap-2">
                <QrCode className="w-4 h-4" />
                QR Code
              </TabsTrigger>
            </TabsList>

            <TabsContent value="code" className="space-y-4 mt-4">
              <form onSubmit={handleCodeSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Código do Profissional</Label>
                  <Input
                    id="code"
                    placeholder="Ex: NUT-12345"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="uppercase"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Digite o código fornecido pelo seu nutricionista
                  </p>
                </div>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  Conectar
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="qr" className="space-y-4 mt-4">
              <div className="flex flex-col items-center justify-center space-y-4 py-8">
                <div className="w-48 h-48 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700">
                  {isScanning ? (
                    <div className="text-center">
                      <div className="animate-pulse">
                        <QrCode className="w-16 h-16 mx-auto text-green-600" />
                      </div>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Escaneando...</p>
                    </div>
                  ) : (
                    <QrCode className="w-16 h-16 text-gray-400" />
                  )}
                </div>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  Escaneie o QR Code fornecido pelo seu nutricionista
                </p>
                <Button 
                  onClick={handleScanQR} 
                  disabled={isScanning}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isScanning ? 'Escaneando...' : 'Iniciar Scanner'}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
