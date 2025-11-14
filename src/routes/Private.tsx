import Loading from "@/components/Loading"
import { AuthContext } from "@/contexts/AuthContext"
import { useContext, useEffect, useState, type ReactNode } from "react"
import { Navigate } from "react-router-dom"

interface PrivateProps {
    children: ReactNode
}

export function Private({ children }: PrivateProps): any {
    const { signed, loadingAuth } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        // ⏱ Delay de 2.2 segundos para dar tempo da animação acontecer
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2200);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) return <Loading />;


    if (loadingAuth) {
        return <Loading />
    }

    if (!signed) {
        return <Navigate to="/login" />
    }


    return children
}