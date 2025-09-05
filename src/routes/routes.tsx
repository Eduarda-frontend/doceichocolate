import { Routes, Route } from "react-router-dom";

import Index from "@/pages/Index";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import NewProduct from "@/pages/NewProduct";
import { Private } from "./Private";

const Router = () => (
	<Routes>
		<Route path="/" element={<Index />} />
		<Route path="/login" element={<Login />} />
		<Route path="/novoProduto" element={<Private> <NewProduct /> </Private> } />
		<Route path="*" element={<NotFound />} />
	</Routes>
);

export default Router;
