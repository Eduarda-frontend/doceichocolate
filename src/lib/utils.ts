import { useEffect, useState } from "react";

export const formatPrice = (preco = 0) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(preco)
}

//Função para juntar várias clases seguras
export function cn(...classes: (string | undefined | null)[]) {
    return classes.filter(Boolean).join(" ")
}

export function useBreakpoint() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    return isMobile;
}
