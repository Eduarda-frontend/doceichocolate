import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductForm  from "@/components/NewProductForm";


const ProductRegistration = () => {
    return (
        <div className="min-w-[517px] ">
            <Header />
            <HeroSection />

            {/* Form Card */}
            <div className="my-5 bg-card rounded-3xl shadow-card p-8  m-auto">
                <div className="mb-6">
                    <h2 className="text-3xl font-secundario font-bold text-foreground mb-2">
                        Cadastro de Produto
                    </h2>
                    <p className="text-muted-foreground">
                        Preencha os dados abaixo para adicionar um novo produto ao catálogo
                    </p>
                </div>

                <ProductForm />
            </div>
        </div>
    );
};

export default ProductRegistration;
