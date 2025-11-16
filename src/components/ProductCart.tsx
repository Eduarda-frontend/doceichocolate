import { FaPlus } from "react-icons/fa6";
import { Suspense, useState } from "react";
import { Button } from "./ui/button";
import { formatPrice } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";

const NotebookModal = React.lazy(() => import("./NotebookModal"));

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  category: string;
  isNew?: boolean;
  selections?: Record<string, string>;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        className="group cursor-pointer overflow-hidden bg-gradient-card shadow-card border border-border/40 rounded-xl backdrop-blur-sm"
        whileHover={{
          scale: 1.03,
          boxShadow: "0 12px 28px rgba(255, 200, 255, 0.25)",
        }}
        transition={{ type: "spring", stiffness: 220, damping: 16 }}
      >
        <div className="relative overflow-hidden rounded-t-xl">

          {/* Badge mágico */}
          {product.isNew && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-3 left-3 z-10 bg-pink-500/90 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-soft backdrop-blur-sm animate-pulse border border-white/20"
            >
              ✨ Novo
            </motion.span>
          )}

          {/* Imagem com parallax */}
          <motion.img
            src={product.image[0]}
            alt={product.name}
            loading="lazy"
            className="w-full h-48 object-cover rounded-t-xl"
            whileHover={{ scale: 1.07 }}
            transition={{ duration: 0.4 }}
          />

          {/* Glow mágico no hover */}
          <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.35),transparent)]"></div>
        </div>

        <div className="p-4">

          <h3 className="font-semibold text-card-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors duration-300">
            {product.name}
          </h3>

          <p className="text-sm text-muted-foreground/90 mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between">

            {/* Preço com leve brilho */}
            <motion.span
              className="text-lg font-bold text-primary"
              animate={{ opacity: [0.9, 1, 0.9] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              {formatPrice(product.price)}
            </motion.span>

            {/* Botão com efeito sparkle */}
            <motion.div
              whileHover={{ scale: 1.06, rotate: "-2deg" }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                aria-label={`Adicionar ${product.name} ao carrinho`}
                variant="default"
                size="sm" // ⬅ menor
                className="relative bg-gradient-hero shadow-soft overflow-hidden group/button rounded-md px-3 py-1.5 text-sm"
                onClick={() => setOpen(true)}
              >
                <FaPlus className="mr-1 text-xs" /> {/* ícone menor */}
                Adicionar

                {/* sparkles */}
                <span className="absolute inset-0 opacity-0 group-hover/button:opacity-100 transition-opacity duration-500 pointer-events-none bg-[url('/sparkles.svg')] bg-cover mix-blend-screen"></span>
              </Button>
            </motion.div>

          </div>
        </div>
      </motion.div>

      {open && (
        <Suspense fallback={null}>
          <NotebookModal closeModal={() => setOpen(false)} product={product} />
        </Suspense>
      )}
    </>
  );
};

export default ProductCard;
