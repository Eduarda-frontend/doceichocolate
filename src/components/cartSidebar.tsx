import { useContext, type ReactNode } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { cn, formatPrice } from "@/lib/utils";
import { CartContext } from "@/contexts/cartContext";
import { BsTrash3, BsCart4 } from "react-icons/bs";

type CartSidebarProps = {
  children?: ReactNode;
  closeOffCanvas: () => void;
  className?: string;
  isOpen: boolean;
};

const CartSidebar = ({ closeOffCanvas, className, isOpen }: CartSidebarProps) => {
  const { cart, removeItemCart, total } = useContext(CartContext);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex",
        "bg-black/50 transition-opacity duration-300",
        isOpen ? "opacity-100 visible cursor-pointer" : "opacity-0 invisible"
      )}
      onClick={closeOffCanvas}
    >
      <div
        className={cn(
          "fixed right-0 top-0 h-full bg-background shadow-2xl",
          "w-full sm:max-w-lg flex flex-col",
          "transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="border-b px-6 py-5 relative">
          <h2 className="text-xl font-semibold text-foreground tracking-tight">
            Meu Carrinho
          </h2>

          {/* Fechar */}
          <button
            aria-label="Fechar carrinho"
            onClick={closeOffCanvas}
            className="absolute top-4 right-4 w-9 h-9 rounded-full 
                       bg-white shadow hover:bg-accent flex items-center justify-center 
                       transition-all focus:ring-2 focus:ring-primary/40 focus:outline-none"
          >
            <IoCloseOutline size={20} className="text-foreground" />
          </button>
        </div>

        {/* LISTA */}
        <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-thin scrollbar-thumb-accent/40">
          {cart.length > 0 ? (
            <div className="space-y-6 animate-fade-in">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-xl border p-4 shadow-sm hover:shadow-md 
                             transition-all bg-card"
                >
                  {/* Imagem */}
                  <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0 border bg-muted">
                    <img
                      src={item.image[0]}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Informações */}
                  <div className="flex flex-col flex-1">
                    <h3 className="font-semibold text-card-foreground leading-tight">
                      {item.name}
                    </h3>

                    {/* Seleções */}
                    {item.selections && (
                      <div className="text-sm text-muted-foreground mt-2 space-y-1">
                        {Object.entries(item.selections).map(([section, option]) => (
                          <p key={section}>
                            <span className="font-medium">{section}:</span> {option}
                          </p>
                        ))}
                      </div>
                    )}

                    {/* Quantidade + Preço */}
                    <div className="flex justify-between items-end mt-auto pt-3">
                      <p className="text-sm text-muted-foreground">
                        Quantidade:{" "}
                        <span className="font-medium">{item.amount}</span>
                      </p>
                      <p className="text-primary font-semibold text-lg">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>

                  {/* Remover */}
                  <button
                    onClick={() => removeItemCart(item)}
                    className="self-start text-muted-foreground hover:text-red-500 
                               transition p-2 rounded-full hover:bg-red-100"
                    aria-label="Remover item do carrinho"
                  >
                    <BsTrash3 size={18} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            // EMPTY STATE
            <div className="text-center mt-32 animate-fade-in">
              <div className="mx-auto w-20 h-20 rounded-full border flex items-center justify-center mb-4 bg-muted/50">
                <BsCart4 size={38} className="text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg font-medium">
                Seu carrinho está vazio
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Adicione produtos deliciosos ❤️
              </p>
            </div>
          )}
        </div>

        {/* FOOTER */}
        {cart.length > 0 && (
          <div className="border-t px-6 py-5 bg-background shadow-inner">
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-semibold text-foreground">Total</p>
              <p className="text-xl text-primary font-bold">
                {formatPrice(total)}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                className="flex-1 py-3 rounded-lg border hover:bg-accent transition text-sm font-medium"
                onClick={closeOffCanvas}
              >
                Continuar comprando
              </button>

              <button
                className="flex-1 py-3 rounded-lg bg-primary text-primary-foreground 
                           font-semibold hover:bg-primary/90 transition text-sm"
              >
                Finalizar pedido
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
