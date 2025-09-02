import type { ReactNode } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";

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
					onClick={closeOffCanvas}
					className="absolute top-4 right-4 z-50 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 flex items-center justify-center transition-colors"
				>
					<IoCloseOutline size={20} />
				</button>

				{/* Conteúdo */}
				<div className="flex-1 p-6  sm:max-w-lg bg-background">
					<div className="">
						<p className="flex items-center gap-2 text-lg font-semibold text-foreground">Carrinho de Compras</p>
					</div>
                    <div className="flex flex-col h-full ">
                        <div className="flex-1 flex items-center justify-center text-center">
                            <div>
                                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                    🛒
                                </div>
                                <p className="text-muted-foreground">
                                    Seu carrinho está vazio
                                </p>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Adicione alguns produtos deliciosos!
                                </p>
                            </div>
                        </div>

                    </div>
				</div>
			</div>
		</div>
	);
}
