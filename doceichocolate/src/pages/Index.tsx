import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductList from "@/components/ProductList";

const Index = () => {


  return (
    <div className="min-w-[517px] bg-background">
         <Header/>
         <HeroSection/>
         <main className="container mx-auto px-4 py-12">
         <section id="products">
          <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">Nossos Produtos</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Descubra nossa seleção especial de bentô cakes e doces artesanais, 
                feitos com ingredientes premium e muito carinho.
              </p>
            </div>
            
            <ProductList />
          </section>
         </main>
    </div>
  );
};

export default Index;
