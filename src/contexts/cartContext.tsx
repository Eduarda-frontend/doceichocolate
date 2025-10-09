import type { Product } from "@/components/ProductCart";
import { createContext, useEffect, useState, type ReactNode } from "react";
import { IoTennisball } from "react-icons/io5";


interface CartContextData {
    cart: CartProps[];
    cartAmount: number;
    addItemCart: (newItem: Product, selection: Record<string, string>) => void;
    removeItemCart: (product: CartProps) => void;
    total: number
}

interface CartProps {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string[];
    category: string;
    amount: number;
    total: number;
    selections: Record<string, string>;
}

export const CartContext = createContext({} as CartContextData)

interface CartProviderProps {
    children: ReactNode;
}

function CartProvider({ children }: CartProviderProps) {
    const [cart, setCart] = useState<CartProps[]>(() => {
        try {
            const storedCart = localStorage.getItem("cart");
            return storedCart ? JSON.parse(storedCart) : [];
        } catch {
            return []
        }
    });
    const [total, setTotal] = useState(0);

    useEffect(()=> {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart]);
    

    function addItemCart(newItem: Product, selections?: Record<string, string>) {
        const indexItem = cart.findIndex(item => item.id === newItem.id)

        // Se o item já estiver no carrinho soma +1 a quantidade e calcula o valor do item 
        if (indexItem !== -1) {

            const updatedCart = cart.map((item, index) => 
                index === indexItem 
                ? {...item, amount: item.amount + 1, total: (item.amount +1) * item.price}
                : item
            )

            setCart(updatedCart);
            totalResultCart(updatedCart)
            return
        }

        // Caso não tenha o item no nosso carrinho adiciona o novo a lista
        let newCartItem  = {
            ...newItem,
            amount: 1,
            total: newItem.price,
            selections: selections ?? {}
        };
        
        const updatedCart = [...cart, newCartItem]
        setCart(updatedCart)
        totalResultCart(updatedCart)
    }

    function removeItemCart( product: CartProps) {
        const indexItem = cart.findIndex(item => item.id === product.id)

        if (cart[indexItem]?.amount > 1) {
            let cartList = cart;

            cartList[indexItem].amount = cartList[indexItem].amount - 1;
            cartList[indexItem].total = cartList[indexItem].total - cartList[indexItem].price

            setCart(cartList)
            totalResultCart(cartList)
            return
        }
        
        const removeItem = cart.filter(item => item.id !== product.id)
        setCart(removeItem)
        totalResultCart(removeItem)
    }

    function totalResultCart(items: CartProps[]){
        let myCart = items;
        let result = myCart.reduce((acumulador, objeto) => { return acumulador + objeto.total}, 0)
        setTotal(result)
    }
    return (
        <CartContext.Provider value={{ cart, cartAmount: cart.length, addItemCart, removeItemCart, total }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider