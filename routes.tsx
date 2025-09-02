import { Routes, Route } from "react-router-dom";

import Index from "./src/pages/Index";
import NotFound from "./src/pages/NotFound";

const Rotas = () => (
    <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
)

export default Rotas