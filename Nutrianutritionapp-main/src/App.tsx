import { useState, useEffect } from 'react';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { ConnectProfessionalPage } from './components/ConnectProfessionalPage';
import { HomePage } from './components/HomePage';
import { RegisterMealPage } from './components/RegisterMealPage';
import { ChatPage } from './components/ChatPage';
import { ProgressPage } from './components/ProgressPage';
import { ProfilePage } from './components/ProfilePage';
import { Navigation } from './components/Navigation';
import { Toaster } from './components/ui/sonner';

export type Page = 'login' | 'register' | 'connect' | 'home' | 'meal' | 'chat' | 'progress' | 'profile';

export interface User {
  id: string;
  name: string;
  email: string;
  hasConnectedProfessional: boolean;
  dailyCalories: number;
  height: number;
  weight: number;
  age: number;
  gender: string;
  goal: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [user, setUser] = useState<User | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLogin = (userData: User) => {
    setUser(userData);
    if (userData.hasConnectedProfessional) {
      setCurrentPage('home');
    } else {
      setCurrentPage('connect');
    }
  };

  const handleConnectProfessional = () => {
    if (user) {
      setUser({ ...user, hasConnectedProfessional: true });
      setCurrentPage('home');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('login');
  };

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onLogin={handleLogin} onNavigateToRegister={() => setCurrentPage('register')} />;
      case 'register':
        return <RegisterPage onRegister={handleLogin} onNavigateToLogin={() => setCurrentPage('login')} />;
      case 'connect':
        return <ConnectProfessionalPage onConnect={handleConnectProfessional} />;
      case 'home':
        return <HomePage user={user!} navigateTo={navigateTo} />;
      case 'meal':
        return <RegisterMealPage onBack={() => setCurrentPage('home')} />;
      case 'chat':
        return <ChatPage />;
      case 'progress':
        return <ProgressPage />;
      case 'profile':
        return <ProfilePage user={user!} onLogout={handleLogout} darkMode={darkMode} setDarkMode={setDarkMode} />;
      default:
        return <LoginPage onLogin={handleLogin} onNavigateToRegister={() => setCurrentPage('register')} />;
    }
  };

  const showNavigation = user && user.hasConnectedProfessional && currentPage !== 'login' && currentPage !== 'register' && currentPage !== 'connect';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <div className="pb-20">
        {renderPage()}
      </div>
      {showNavigation && <Navigation currentPage={currentPage} navigateTo={navigateTo} />}
      <Toaster />
    </div>
  );
}

export default App;
