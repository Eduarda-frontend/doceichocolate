import { Carousel } from "./ui/carousel";
import { Modal } from "./ui/modal";

import { formatPrice } from "@/lib/utils";

import type { Product } from "./ProductCart";
import NotebookForm from "./NotebookForm";

type NotebookModalProps = {
	product: Product;
	closeModal: () => void;
};

const NotebookModal = ({ product, closeModal }: NotebookModalProps) => {

	return (
		<Modal closeModal={closeModal} size="lg">
			<div className="flex flex-col lg:flex-row h-full w-full">
				{/* Left Page - Product Info */}
				<div className="lg:w-1/2 p-5 bg-white flex flex-col gap-4">
					<div className="relative z-10 grid grid-cols-2">
						<div className="px-2">
							<Carousel autoPlay interval={3000} showIndicators showArrows >
								{product.image.map((image, index) => (
									<div key={index}>
										<img src={image} alt={`${product.name} imagem ${index + 1}`} className="w-full h-auto object-cover rounded-md"/>
									</div>
								))}
							</Carousel>
						</div>

						<div className="border rounded-md border-[hsl(var(--yellow-sweet))] p-4 flex flex-col justify-between flex-1">
							<h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">
								Descrição do produto
							</h2>

							<div className="space-y-2 text-foreground/80">
								<h3 className="text-lg lg:text-xl font-semibold text-primary">
									{product.name}
								</h3>

								<p className="text-sm leading-relaxed">
									{product.description}
								</p>
							</div>
							<div className="mt-4">
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
				<div className="lg:w-1/2 p-5 bg-gradient-sweet overflow-y-auto">
					<NotebookForm closeModal={closeModal} product={product} title={product.name} />
				</div>
			</div>
		</Modal>
	);
};

export default NotebookModal;
