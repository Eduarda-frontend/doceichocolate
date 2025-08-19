import { useState, useCallback } from 'react';
import { Product } from '@/components/ProductCard';
import { CartItem } from '@/components/CartSidebar';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prevItems, { ...product, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  }, []);

  const removeItem = useCallback((id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  }, []);

  const getTotalItems = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cartItems]);

  const generateWhatsAppMessage = useCallback(() => {
    if (cartItems.length === 0) return '';

    let message = '🍰 *Pedido - Doce & Chocolate* 🍰\n\n';
    
    cartItems.forEach(item => {
      message += `• ${item.name}\n`;
      message += `  Quantidade: ${item.quantity}\n`;
      message += `  Preço unitário: R$ ${item.price.toFixed(2)}\n`;
      message += `  Subtotal: R$ ${(item.price * item.quantity).toFixed(2)}\n\n`;
    });

    message += `💰 *Total: R$ ${getTotalPrice().toFixed(2)}*\n\n`;
    message += `Gostaria de confirmar este pedido!`;

    return encodeURIComponent(message);
  }, [cartItems, getTotalPrice]);

  return {
    cartItems,
    addToCart,
    updateQuantity,
    removeItem,
    getTotalItems,
    getTotalPrice,
    generateWhatsAppMessage,
  };
};