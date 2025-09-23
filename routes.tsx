import { Routes, Route } from "react-router-dom";

import CartProvider from './src/contexts/cartContext'

import Index from "@/pages/Index";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";

const Router = () => (
    <CartProvider>
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </CartProvider>
)

export default Router