import FAQ from "@/components/FAQ";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductList from "@/components/ProductList";
import TestimonialForm from "@/components/Testimonial";
import ScrollToTop from "@/components/ui/scrollToTop";
import { categories, product } from "@/data/product";
import { useState } from "react";

const Index = () => {

	// Inicia na primeira categoria
	const [selectedCategory, setSelectedCategory] = useState(categories[0]);

	// Produtos filtrados pela categoria selecionada
	const filteredProducts = product.filter(
		(p) => p.category === selectedCategory
	);

	return (
		<div 
			className="
				min-h-screen 
				bg-background 
				text-gray-900 
				flex 
				flex-col
				min-w-[400px]
			"
			lang="pt-BR"
		>
			{/* Cabeçalho semântico */}
			<header role="navigation" aria-label="Navegação principal">
				<Header />
			</header>

			{/* Hero Section com role banner */}
			<HeroSection />

			{/* Conteúdo principal */}
			<main 
				className="
					w-full 
					max-w-7xl 
					mx-auto 
					p-4 
					md:p-6 
					lg:p-10
					flex-grow
					space-y-12
				"
				role="main"
				aria-label="Conteúdo principal"
			>

				{/* Seção de produtos */}
				<section 
					aria-labelledby="produtos-titulo"
					className="w-full"
				>
					<h2 
						id="produtos-titulo" 
						className="sr-only"
					>
						Lista de produtos disponíveis
					</h2>

					<ProductList
						products={filteredProducts}
						categories={categories}
						selectedCategory={selectedCategory}
						setSelectedCategory={setSelectedCategory}
					/>
				</section>

				{/* Depoimentos */}
				<section 
					aria-labelledby="depoimentos-titulo"
					className="w-full"
				>
					<h2 id="depoimentos-titulo" className="sr-only">
						Depoimentos de clientes
					</h2>

					<TestimonialForm />
				</section>

				{/* FAQ */}
				<section 
					aria-labelledby="faq-titulo"
					className="w-full"
				>
					<h2 id="faq-titulo" className="sr-only">
						Perguntas Frequentes
					</h2>

					<FAQ />
				</section>

			</main>

			{/* Botão de voltar ao topo */}
			<ScrollToTop />

			{/* Footer poderia ser implementado mais tarde */}
		</div>
	);
};

export default Index;
