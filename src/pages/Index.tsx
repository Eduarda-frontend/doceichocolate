import FAQ from "@/components/Faq";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductList from "@/components/ProductList";
import TestimonialForm from "@/components/Testimonial";

import ScrollToTop from "@/components/ui/scrollToTop";
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

			<ProductList
				products={filteredProducts}
				categories={categories}
				selectedCategory={selectedCategory}
				setSelectedCategory={setSelectedCategory}
			/>
			<TestimonialForm />
			<FAQ />
			<ScrollToTop />
		</div >
	);
};

export default Index;
