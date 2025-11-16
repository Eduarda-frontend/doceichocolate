import type { ReactNode } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";


type ModalProps = {
	children?: ReactNode;
	closeModal: () => void;
	size?: "sm" | "md" | "lg" | "xl"; // tamanhos predefinidos
	className?: string;
};

const sizeVariants = {
	sm: "max-w-sm max-h-[50vh]",
	md: "max-w-md max-h-[60vh]",
	lg: "max-w-[95vw] max-h-[70vh]",
	xl: "max-w-xl max-h-[80vh]",
};



export function Modal({
	children,
	closeModal,
	size = "lg",
	className,
}: ModalProps) {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.95 }}
			transition={{ duration: 0.2, ease: "easeOut" }}
			className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
			<div
				className={cn(
					"w-full p-0 border-0 shadow-none",
					sizeVariants[size],
					"rounded-2xl overflow-hidden bg-white",
					className
				)}
			>
				<div className=" relative w-full h-full rounded-2xl overflow-hidden">
					{/* Botão de fechar */}
					<button
						onClick={closeModal}
						className="absolute lg:top-4 right-0 lg:right-4 z-50 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 flex items-center justify-center transition-colors"
					>
						<IoCloseOutline size={20} />
					</button>

					{/* Conteúdo da modal */}
					<div className="w-full h-full overflow-y-auto">
						{children}
					</div>
				</div>
			</div>

		</motion.div>
	);
}
