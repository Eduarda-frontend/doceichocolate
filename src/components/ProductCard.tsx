import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Plus, ShoppingCart } from 'lucide-react';
import { NotebookModal } from './Modal';
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    
  return (
    <Dialog>
			<DialogTrigger asChild>
        <Card className="group cursor-pointer overflow-hidden bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-[1.02] border-border/50">
          
          <div className="relative overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            {product.isNew && (
              <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
                Novo
              </Badge>
            )}
            <Button 
              variant="ghost" 
              size="sm"
              className="absolute top-2 right-2 bg-white/80 hover:bg-white transition-colors"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
          
          <CardContent className="p-4">
            <h3 className="font-semibold text-card-foreground mb-1 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {product.description}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-primary">
                R$ {product.price.toFixed(2)}
              </span>
              <Button 
                size="sm"
                onClick={() => onAddToCart(product)}
                className="bg-gradient-hero hover:opacity-90 transition-opacity shadow-soft"
              >
                <Plus className="h-4 w-4 mr-1" />
                Adicionar
              </Button>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
        <NotebookModal/>
    </Dialog>
  );
};

export default ProductCard;