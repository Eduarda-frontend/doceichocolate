
import { FaPlus } from "react-icons/fa6";
import { Suspense, useState } from "react";
import { Button } from "./ui/button";
import { formatPrice } from "@/lib/utils";
import React from "react";

const NotebookModal = React.lazy(() => import('./NotebookModal'));

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
      <div className="group cursor-pointer overflow-hidden bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-[1.02] border-border/50">

        <div className="relative overflow-hidden">
          <img
            src={product.image[0]}
            alt={product.name}
            className="w-full h-48 object-cover"
            loading="lazy"
          />
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-card-foreground mb-1 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex justify-between">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-primary">
                {formatPrice(product.price)}
              </span>
            </div>
            <Button
              aria-label={`Adicionar ${product.name} ao carrinho`}
              variant="default"
              size="md"
              className="bg-gradient-hero hover:opacity-90 transition-opacity shadow-soft"
              onClick={() => setOpen(true)}
            >
              <FaPlus />
              Adicionar
            </Button>

          </div>
        </div>

      </div>
      {open && (
        <Suspense fallback={null}>
          <NotebookModal closeModal={() => setOpen(false)} product={product} />
        </Suspense>)}

    </>
  )
}

export default ProductCard