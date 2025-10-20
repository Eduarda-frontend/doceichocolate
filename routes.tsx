import { Routes, Route } from "react-router-dom";


import Index from "@/pages/Index";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";

const Router = () => (

    <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
    </Routes>

)

export default Router