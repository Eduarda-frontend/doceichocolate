import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

import heroImage from '@/assets/hero-banner.jpg';
import logo from '@/assets/logo.png'

const HeroSection: React.FC = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    productsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-[70vh] items-center justify-center overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      {/* Content */}

      <div className="absolute grid grid-cols-7 justify-between text-center w-full p-4 px-12 bg-white z-10 bottom-0 rounded-2xl">

        <img className="rounded-3xl w-[153px] " src={logo} alt="Logo Doce e Chocolate"/>

        <div className="text-center col-span-3 col-end-6">
            <h1 className="text-7xl font-cursivo">Doce e Chocolate</h1>
            <ul className='flex justify-between pt-8 font-secundario'>
                <li>
                    <p className="m-0 flex">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
                      </svg>
                      Caldas Novas - GO</p>
                </li>
                <li>
                    <a href="#">Mais informações</a>
                </li>
            </ul>
        </div>
        <div></div>
      </div>

      {/* <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
          Doces que Encantam
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Bentô Cakes artesanais feitos com amor e os melhores ingredientes
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            onClick={scrollToProducts}
            className="bg-white text-primary hover:bg-white/90 shadow-soft"
          >
            Ver Produtos
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-primary"
          >
            Sobre Nós
          </Button>
        </div>
      </div> */}
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <Button
          variant="ghost"
          size="sm"
          onClick={scrollToProducts}
          className="text-white animate-bounce"
        >
          <ArrowDown className="h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;