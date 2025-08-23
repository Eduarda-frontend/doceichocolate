import React, { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProductCard from '@/components/ProductCard';
import CartSidebar from '@/components/CartSidebar';
import CategoryFilter from '@/components/CategoryFilter';
import { useCart } from '@/hooks/useCart';
import { products, categories } from '@/data/products';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();
  
  const {
    cartItems,
    addToCart,
    updateQuantity,
    removeItem,
    getTotalItems,
    generateWhatsAppMessage,
  } = useCart();

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast({
      title: "Produto adicionado!",
      description: `${product.name} foi adicionado ao carrinho.`,
    });
  };

  const handleCheckout = () => {
    const message = generateWhatsAppMessage();
    const phoneNumber = '5562999999999'; // Replace with actual WhatsApp number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-w-[517px] bg-background">
      <Header 
        cartItemsCount={getTotalItems()} 
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <HeroSection />
      
      <main className="container mx-auto px-4 py-12">
        <section id="products">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Nossos Produtos</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Descubra nossa seleção especial de bentô cakes e doces artesanais, 
              feitos com ingredientes premium e muito carinho.
            </p>
          </div>
          
          <div className="mb-8">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </section>
      </main>

      <CartSidebar
        isOpen={isCartOpen}
        onOpenChange={setIsCartOpen}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default Index;
