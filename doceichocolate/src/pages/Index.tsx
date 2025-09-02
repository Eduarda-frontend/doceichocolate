import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCart";
import CategoryFilter from "@/components/ui/CategoryFilter";
import { categories, product } from "@/data/product";
import { useState } from "react";

const Index = () => {
	const [selectedCategory, setSelectedCategory] = useState("all");

	const filteredProducts =
		selectedCategory === "all"
			? product
			: product.filter(
					(product) => product.category === selectedCategory
			  );

	return (
		<div className="min-w-[517px] bg-background">
			<Header />
			<HeroSection />
			<main className="container mx-auto px-4 py-12">
				<section id="products">
					<div className="text-center mb-8">
						<h2 className="text-3xl font-bold text-foreground mb-4">
							Nossos Produtos
						</h2>
						<p className="text-muted-foreground max-w-2xl mx-auto">
							Descubra nossa seleção especial de bentô cakes e
							doces artesanais, feitos com ingredientes premium e
							muito carinho.
						</p>
					</div>

					<div className="mb-8">
						<CategoryFilter
							categories={categories}
							onCategoryChange={setSelectedCategory}
							selectedCategory={selectedCategory}
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{filteredProducts.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
							/>
						))}
					</div>
				</section>
			</main>
		</div>
	);
};

export default Index;
