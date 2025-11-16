import FAQ from "@/components/FAQ";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductList from "@/components/ProductList";
import TestimonialForm from "@/components/Testimonial";
import ScrollToTop from "@/components/ui/scrollToTop";
import { categories, product } from "@/data/product";
import { useState } from "react";

const Index = () => {

	// agora inicia na primeira categoria (caso prefira outra, basta trocar)
	const [selectedCategory, setSelectedCategory] = useState(categories[0]);

	// apenas filtra normalmente — sem “Todos”
	const filteredProducts = product.filter(
		(p) => p.category === selectedCategory
	);

	return (
		<div className="min-w-[517px] bg-background">
			<Header />
			<HeroSection />

			<main className="max-w-5xl container mx-auto px-4 py-12 space-y-6">

				<ProductList
					products={filteredProducts}
					categories={categories}
					selectedCategory={selectedCategory}
					setSelectedCategory={setSelectedCategory}
				/>

				<TestimonialForm />
				<FAQ />
				<ScrollToTop />
			</main>
		</div>
	);
};

export default Index;
