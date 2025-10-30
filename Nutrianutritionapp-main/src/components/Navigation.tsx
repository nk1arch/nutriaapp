import { Home, UtensilsCrossed, MessageCircle, TrendingUp, User } from 'lucide-react';
import type { Page } from '../App';

interface NavigationProps {
  currentPage: Page;
  navigateTo: (page: Page) => void;
}

export function Navigation({ currentPage, navigateTo }: NavigationProps) {
  const navItems = [
    { page: 'home' as Page, icon: Home, label: 'Início' },
    { page: 'meal' as Page, icon: UtensilsCrossed, label: 'Refeição' },
    { page: 'chat' as Page, icon: MessageCircle, label: 'Chat IA' },
    { page: 'progress' as Page, icon: TrendingUp, label: 'Progresso' },
    { page: 'profile' as Page, icon: User, label: 'Perfil' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.page;
            
            return (
              <button
                key={item.page}
                onClick={() => navigateTo(item.page)}
                className={`flex flex-col items-center justify-center py-3 px-2 min-w-[60px] transition-colors ${
                  isActive
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                <Icon className={`w-6 h-6 mb-1 ${isActive ? 'fill-current' : ''}`} />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
