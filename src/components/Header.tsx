import { FiShoppingCart, FiUser, FiHeart } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";

import { Button } from "./ui/button";
import { useContext, useState } from "react";
import { CartSidebar } from "./cartSidebar";
import { CartContext } from '../contexts/cartContext'
import { signOut } from "firebase/auth";
import { auth } from "@/services/firebaseConnection";
import { AuthContext } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
	const [cartOpen, setCartOpen] = useState(false);
	const { cartAmount } = useContext(CartContext)
	const { signed, loadingAuth } = useContext(AuthContext)

	// Caso o usuário acesse a página de login automaticamente sera deslogado
	function handleLogout() {
		signOut(auth)
	}


	return (
		<header className="sticky top-0 z-50  bg-gradient-sweet border-b border-border">
			<div className="container mx-auto px-4 py-2 flex items-center justify-end">
				{!loadingAuth && !signed && (
					<>
						<Button
							variant="ghost"
							size="md"
							className="hidden md:flex"
						>
							<FiHeart className="w-6 h-6" />
						</Button>

						<Link to="/login">
							<Button
								variant="ghost"
								size="md"
								className="hidden md:flex"

							>
								<FiUser className="w-6 h-6" />
							</Button>

						</Link>
						<Button
							variant="ghost"
							size="md"
							className="relative"
							onClick={() => setCartOpen(true)}>
							<FiShoppingCart className="w-6 h-6" />
							{cartAmount > 0 && (
								<span> {cartAmount} </span>
							)}
						</Button>
						<CartSidebar isOpen={cartOpen} closeOffCanvas={() => setCartOpen(false)} />

					</>
				)}
				{!loadingAuth && signed && (
					<>
						<Link to="/register">
							<Button
								variant="ghost"
								size="md"
								className="hidden md:flex"

							>
								<FaRegUserCircle className="w-6 h-6" />
							</Button>
						</Link>

						<Link to="/">
							<Button
								variant="ghost"
								size="md"
								className="hidden md:flex"
								onClick={() => handleLogout()}
							>
								<MdLogout className="w-6 h-6" />
							</Button>

						</Link>
					</>

				)}
			</div>
		</header>
	);
};

export default Header;
