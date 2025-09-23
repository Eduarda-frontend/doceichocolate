import { useContext } from "react";

import { Carousel } from "./ui/carousel";
import { Button } from "./ui/button";
import { Modal } from "./ui/modal";

import { formatPrice } from "@/lib/utils";

import type { Product } from "./ProductCart";
import { productSections } from "@/data/productsSection";

import { CartContext } from "@/contexts/cartContext";

interface ProductOption {
	id: string;
	label: string;
	price?: string;
}

export interface ProductSection {
	title: string;
	options: ProductOption[];
}

type notebookModalProps = {
	product: Product;
	closeModal: () => void;
};


const NotebookModal = ({ product, closeModal }: notebookModalProps) => {
	const { addItemCart } = useContext(CartContext)

	function handleAddCartItem(product: Product) {
		addItemCart(product)
	}

	return (
		<Modal closeModal={closeModal} size="lg">
			<div className="flex flex-col lg:flex-row h-full">
				{/* Left Page - Product Info */}
				<div className="flex flex-col lg:flex-row items-center h-1/2 lg:h-full lg:w-1/2 p-5 center bg-white relative">
					<div className="relative z-10 grid grid-cols-2 items-center">
						<div className="px-2">
							<Carousel autoPlay interval={3000} showIndicators showArrows >
								{product.image.map((image, index) => (
									<div key={index}>
										<img src={image} alt={product.name} />
									</div>
								))}
							</Carousel>
						</div>

						<div className="px-2 h-full flex flex-col justify-between border rounded-md border-[hsl(var(--yellow-sweet))]">
							<h2 className="text-xl  lg:text-2xl font-bold text-foreground mb-4">
								Descrição do produto
							</h2>

							<div className="space-y-4 text-foreground/80">
								<h3 className="text-lg lg:text-xl font-semibold text-primary">
									{product.name}
								</h3>

								<p className="text-sm leading-relaxed">
									{product.description}
								</p>
							</div>
							<div className="my-4">
								<p className="text-xl  lg:text-2xl font-bold text-primary">
									{formatPrice(product.price)}
								</p>
								<p className="text-xs lg:text-sm text-muted-foreground">
									Preço base
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Right Page - Options */}
				<div className=" h-1/2 lg:h-auto lg:w-1/2 p-5 bg-gradient-sweet relative overflow-y-auto">
					<div className="relative z-10 space-y-6">
						<h2 className="text-2xl pt-3 font-bold text-foreground mb-6">
							Personalize seu pedido
						</h2>

						<div>
							{productSections.map((section) => (
								<div key={section.title} className="space-y-3">
									<h3 className="text-lg font-semibold text-foreground mb-3">
										{section.title}
									</h3>

									<div className="grid grid-cols-3 gap-3">
										{section.options.map((option) => (
											<div
												key={option.id}
												className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[hsl(var(--yellow-sweet))]  transition-colors bg-white/50 backdrop-blur-sm border "
											>
												<input
													type="radio"
													value={option.id}
													id={option.id}
													className="border-[hsl(var(--yellow-sweet))]  text-primary focus:ring-primary bg-white"
												/>
												<label
													htmlFor={option.id}
													className="flex-1 cursor-pointer text-foreground hover:text-primary-foreground transition-colors"
												>
													<div className="flex justify-between items-center">
														<span className="font-medium">
															{option.label}
														</span>
														{option.price && (
															<span className="text-sm text-muted-foreground ml-2">
																{option.price}
															</span>
														)}
													</div>
												</label>
											</div>
										))}
									</div>
								</div>
							))}
						</div>

						<div className="pt-6">
							<div className="flex gap-3">
								<Button
									variant="yellow"
									size="md"
									onClick={closeModal}
									className="flex-1 text-primary-foreground hover:bg-[hsl(var(--yellow-sweet))] hover:text-primary-foreground"
								>
									Cancelar
								</Button>
								<Button
									onClick={() => handleAddCartItem(product)}
									variant="yellow"
									size="md"
									className="flex-1 bg-[hsl(var(--yellow-sweet))]"
								>
									Adicionar ao Carrinho
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default NotebookModal;
