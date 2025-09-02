import { FiShoppingCart, FiUser, FiHeart } from "react-icons/fi";
import { Button } from "./ui/button";
import { useState } from "react";
import { CartSidebar } from "./ui/cartSidebar";

const Header = () => {
  const [cartOpen, setCartOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50  bg-gradient-sweet border-b border-border">
			<div className="container mx-auto px-4 py-2 flex items-center justify-end">
				<div className="flex items-center gap-4">
					<Button
						variant="ghost"
						size="md"
						className="hidden md:flex"
					>
						<FiHeart className="w-6 h-6" />
					</Button>
					<Button
						variant="ghost"
						size="md"
						className="hidden md:flex"
					>
						<FiUser className="w-6 h-6" />
					</Button>
					<Button
            variant="ghost"
            size="md"
            className="relative"
            onClick={() => setCartOpen(true)}>
						<FiShoppingCart className="w-6 h-6" />
					</Button>
				</div>
        <CartSidebar isOpen={cartOpen} closeOffCanvas={() => setCartOpen(false)}/>
			</div>
		</header>
	);
};

export default Header;
