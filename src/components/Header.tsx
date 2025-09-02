import { FiShoppingCart, FiUser, FiHeart } from "react-icons/fi";

const Header = () => {
  return (
    <header className="sticky top-0 z-50  bg-gradient-sweet border-b border-border">
      <div className="container mx-auto px-4 py-2 flex items-center justify-end">

        <div className="flex items-center gap-4">
          <a href="#" className="hidden md:flex">
            <FiHeart className="w-6 h-6" />
          </a>
          <a href="#" className="hidden md:flex">
            <FiUser className="w-6 h-6" />
          </a>
          <a href="#" className="relative">
            <FiShoppingCart className="w-6 h-6" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
