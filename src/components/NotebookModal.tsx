import { Carousel } from "./ui/carousel";
import { Modal } from "./ui/modal";

import { formatPrice } from "@/lib/utils";

import type { Product } from "./ProductCart";
import NotebookForm from "./NotebookForm";
import { motion } from "framer-motion";

type NotebookModalProps = {
	product: Product;
	closeModal: () => void;
};

const NotebookModal = ({ product, closeModal }: NotebookModalProps) => {

	return (
		<Modal closeModal={closeModal} size="lg">
			<div className="flex flex-col lg:flex-row h-full w-full">
				{/* Left Page - Product Info */}
				<div className="lg:w-1/2 p-5 overflow-y-auto custom-scroll">
					<div className="relative z-10 grid grid-cols-2">
						<div className="px-2">
							<Carousel autoPlay interval={3000} showIndicators showArrows >
								{product.image.map((image, index) => (
									<div key={index}>
										<img src={image} alt={`${product.name} imagem ${index + 1}`} className="w-full h-auto object-cover rounded-md transition-transform duration-300 hover:scale-[1.02]" />
									</div>
								))}
							</Carousel>
						</div>

						<div className="border rounded-md border-[hsl(var(--yellow-sweet))] p-4 flex flex-col justify-between flex-1">
							<h2 className="text-lg lg:text-xl font-bold text-foreground mb-3">
								Descrição do produto
							</h2>

							<div className="space-y-2 text-foreground/80">
								<h3 className="text-base lg:text-lg font-semibold text-primary">
									{product.name}
								</h3>

								<p className="text-xs leading-relaxed">
									{product.description}
								</p>
							</div>

							<div className="mt-4">
								<motion.p
									animate={{
										scale: [1, 1.05, 1],
										opacity: [1, 0.9, 1],
									}}
									transition={{
										duration: 1.2,
										repeat: Infinity,
										ease: "easeInOut",
									}}
									className="text-lg lg:text-xl font-bold text-primary"
								>
									{formatPrice(product.price)}
								</motion.p>

								<p className="text-[10px] lg:text-xs text-muted-foreground">
									Preço base
								</p>
							</div>
						</div>

					</div>
				</div>

				{/* Right Page - Options */}
				<div className="lg:w-1/2 p-5 bg-gradient-sweet overflow-y-auto custom-scroll">
					<NotebookForm closeModal={closeModal} product={product} title={product.name} />
				</div>
			</div>
		</Modal>
	);
};

export default NotebookModal;
