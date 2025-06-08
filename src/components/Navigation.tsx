
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, Settings, User } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold gradient-text">
                Lexo.ai
              </h1>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lexo-purple focus:border-transparent smooth-transition"
                placeholder="Search documents..."
              />
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="smooth-transition hover:bg-lexo-purple/10">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="sm" className="neon-border button-glow">
              <User className="h-5 w-5 mr-2" />
              Account
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
