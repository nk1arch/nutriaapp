import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const mockAIResponses = [
  'Ótima pergunta! Vou te ajudar com isso. Para manter uma dieta saudável, é importante balancear proteínas, carboidratos e gorduras saudáveis.',
  'Sim, você pode substituir esse alimento. Algumas opções nutritivas incluem batata doce, mandioca ou arroz integral.',
  'O ideal é fazer pequenas refeições a cada 3 horas. Isso ajuda a manter o metabolismo ativo e evita picos de fome.',
  'Beber água é fundamental! Recomendo pelo menos 2 litros por dia. A água ajuda na digestão e na absorção de nutrientes.',
  'Entendo sua dúvida. Vou explicar: proteínas são essenciais para a construção muscular. Boas fontes incluem frango, peixe, ovos e leguminosas.',
];

export function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Sou a NutrIA, sua assistente de nutrição. Como posso te ajudar hoje?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: mockAIResponses[Math.floor(Math.random() * mockAIResponses.length)],
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 pb-24">
      <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)]">
        <Card className="h-full flex flex-col">
          <CardHeader className="border-b dark:border-gray-800">
            <CardTitle className="flex items-center gap-2">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <div>Chat NutrIA</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 font-normal">
                  Tire suas dúvidas sobre nutrição
                </div>
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarFallback className={message.sender === 'ai' ? 'bg-green-600 text-white' : 'bg-gray-600 text-white'}>
                    {message.sender === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
                  <span className={`text-xs mt-1 block ${
                    message.sender === 'user' ? 'text-green-100' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {message.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-green-600 text-white">
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          <div className="border-t dark:border-gray-800 p-4">
            <form onSubmit={handleSend} className="flex gap-2">
              <Input
                placeholder="Digite sua pergunta..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1"
              />
              <Button 
                type="submit" 
                size="icon"
                className="bg-green-600 hover:bg-green-700 flex-shrink-0"
                disabled={!inputText.trim() || isTyping}
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}
