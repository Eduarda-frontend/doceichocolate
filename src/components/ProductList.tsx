import { useState, useMemo } from "react";
import { CategoryFilter } from "@/components/ui/categoryFilter";
import ProductCard from "@/components/ProductCart";
import SearchBar from "@/components/ui/searchBar";

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

  // Filtragem por categoria + nome
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      return (
        product.category === selectedCategory &&
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    });
  }, [products, query, selectedCategory]);

  return (
    <section
      id="products"
      aria-labelledby="products-title"
      className="container mx-auto px-4 space-y-10 max-w-6xl my-12"
      role="region"
    >
      {/* Título e descrição */}
      <header className="text-center space-y-4 mb-6" role="heading">
        <h2
          id="products-title"
          className="text-3xl font-bold text-foreground"
        >
          Nossos Produtos
        </h2>

        <p className="text-muted-foreground max-w-2xl mx-auto">
          Descubra nossa seleção especial de bentô cakes e doces artesanais,
          feitos com carinho.
        </p>
      </header>

      {/* FILTROS */}
      <div
        className="
          grid 
          gap-4 
          md:flex 
          md:justify-between 
          md:items-center
        "
      >
        {/* Filtro de categorias */}
        <CategoryFilter
          categories={categories}
          onCategoryChange={setSelectedCategory}
          selectedCategory={selectedCategory}
        />

        {/* Campo de busca — 100% no mobile */}
        <div className="w-full md:w-auto">
          <SearchBar
            value={query}
            onChange={setQuery}
            aria-label="Buscar produtos pelo nome"
          />
        </div>
      </div>

      {/* FEEDBACK: Nenhum resultado */}
      {filteredProducts.length === 0 && (
        <div
          className="py-16 text-center text-muted-foreground"
          role="alert"
        >
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
        <ul
          className="
            grid 
            grid-cols-1
            sm:grid-cols-2 
            lg:grid-cols-3 
            gap-6
          "
          aria-label="Lista de produtos"
        >
          {filteredProducts.map((product: any) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
