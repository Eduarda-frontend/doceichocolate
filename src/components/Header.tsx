import React from 'react';
import { Search, ShoppingCart, Heart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

import logo from '@/assets/logo.png'

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemsCount, onCartClick }) => {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur bg-gradient-sweet supports-[backdrop-filter]:bg-background/60 border-b border-border">

      
      {/* Main header */}
      <div className="container mx-auto px-2 py-2">
        <div className="flex items-center justify-end gap-4">

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <User className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative"
              onClick={onCartClick}
            >
              <ShoppingCart className="h-4 w-4" />
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-primary text-primary-foreground text-xs">
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;