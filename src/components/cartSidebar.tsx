import { useContext, type ReactNode } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { cn, formatPrice } from "@/lib/utils";
import { CartContext } from "@/contexts/cartContext";
import { BsTrash3, BsPencilSquare, BsCart4 } from "react-icons/bs";

type CartSidebarProps = {
	children?: ReactNode;
	closeOffCanvas: () => void;
	className?: string;
	isOpen: boolean;
};

export function CartSidebar({
	closeOffCanvas,
	className,
	isOpen,
}: CartSidebarProps) {
	const { cart, removeItemCart, total } = useContext(CartContext)

	return (
		<div
			className={cn(
				"fixed inset-0 z-[9999] flex",
				"bg-black/50 transition-opacity ",
				isOpen ? "opacity-100 visible" : "opacity-0 invisible"
			)}
			onClick={closeOffCanvas} // fecha ao clicar no backdrop
		>
			<div
				className={cn(
					"fixed right-0 top-0 h-full bg-white shadow-xl transition-transform w-full sm:max-w-lg bg-background",
					isOpen ? "translate-x-0" : "translate-x-full",
					"flex flex-col",
					className
				)}
				onClick={(e) => e.stopPropagation()} // previne fechamento ao clicar dentro
			>
				{/* Botão de fechar */}
				<button
					aria-label="Fechar carrinho"
					onClick={closeOffCanvas}
					className="absolute top-4 right-4 z-50 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 flex items-center justify-center transition-colors"
				>
					<IoCloseOutline size={20} />
				</button>

				{/* Conteúdo */}
				<div className="flex-1 p-6  sm:max-w-lg bg-background">
					<div className="">
						<p className=" items-center gap-2 text-lg font-semibold text-foreground">Carrinho de Compras</p>
					</div>
					<div className="items-center justify-center text-center">
						{cart.length > 0 ? (
							<>
								{cart.map((item) => (
									<div key={item.id} className="grid grid-cols-7 gap-2 pt-5 border-b-2">

										<div className="col-span-2 relative overflow-hidden justify-items-center">
											<img
												src={item.image[0]}
												alt={item.name}
												className="object-cover rounded-sm"
												loading="lazy"
											/>
										</div>

										<div className="col-span-4">
											<h3 className="font-semibold text-card-foreground mb-1">
												{item.name}
											</h3>
											<div className="text-start pt-2">
												{item.selections && Object.entries(item.selections).map(([section, option]) => (
													<p key={section}>
														{section}: {option}
													</p>
												))}
											</div>
											<div className="text-end">
												<p>Quandidade: {item.amount}</p>
												<span className="text-md font-bold text-primary pt-3">
													{formatPrice(item.price)}
												</span>
											</div>
										</div>
										<button
											className=" flex items-center justify-center w-full h-full rounded hover:bg-red-300 hover:text-white"
											onClick={() => removeItemCart(item)}>
											<BsTrash3 size={20} />
										</button>
									</div>

								))}

								{/* Valor total */}
								<p className="pt-6 text-end">
									<span className="font-semibold text-card-foreground">Valor total: </span>
									{formatPrice(total)}
								</p>
							</>

						) : (
							<>
								<div className="mt-56 w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
									<BsCart4 size={100} />
								</div>
								<p className="text-muted-foreground">
									Seu carrinho está vazio
								</p>
								<p className="text-sm text-muted-foreground mt-1">
									Adicione alguns produtos deliciosos!
								</p>
							</>

						)}

					</div>

				</div>
			</div>
		</div>
	);
}
