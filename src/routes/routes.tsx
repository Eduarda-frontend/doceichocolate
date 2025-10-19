import { Routes, Route } from "react-router-dom";

import Index from "@/pages/Index";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import CartProvider from "@/contexts/cartContext";
import Register from "@/pages/Register";
import { Private } from "./Private";


const Router = () => (
    <CartProvider>
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/register" element={ <Private><Register /></Private> } />
        </Routes>
    </CartProvider>
)

export default Router