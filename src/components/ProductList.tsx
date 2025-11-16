import { useState, useMemo } from "react";
import { CategoryFilter } from "@/components/ui/categoryFilter";
import ProductCard from "@/components/ProductCart";
import SearchBar from "@/components/ui/searchBar ";

interface ProductListProps {
    products: any[];
    categories: string[];
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
}

export default function ProductList({
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
}: ProductListProps) {

    const [query, setQuery] = useState("");

    // 🔎 Filtragem por nome + categoria
    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchCategory = product.category === selectedCategory;

            const matchName = product.name
                .toLowerCase()
                .includes(query.toLowerCase());

            return matchCategory && matchName;
        });
    }, [products, query, selectedCategory]);


    return (
        <main className="container mx-auto px-4 space-y-6 max-w-5xl my-12">
            <section id="products">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-foreground mb-4">
                        Nossos Produtos
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Descubra nossa seleção especial de bentô cakes e doces
                        artesanais, feitos com carinho.
                    </p>
                </div>

                {/* FILTROS */}
                <div className="flex justify-between items-center mb-8">
                    <CategoryFilter
                        categories={categories}
                        onCategoryChange={setSelectedCategory}
                        selectedCategory={selectedCategory}
                    />

                    <SearchBar value={query} onChange={setQuery} />
                </div>

                {/* NENHUM RESULTADO */}
                {filteredProducts.length === 0 && (
                    <div className="py-16 text-center text-muted-foreground">
                        <h3 className="text-lg font-semibold mb-2">
                            Nenhum produto encontrado
                        </h3>
                        <p className="text-sm max-w-md mx-auto">
                            Não encontramos nenhum item que corresponda à sua busca{" "}
                            <span className="font-medium">"{query}"</span>.
                            Tente usar outro termo ou limpar os filtros.
                        </p>
                    </div>
                )}

                {/* LISTA DE PRODUTOS */}
                {filteredProducts.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product: any) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
