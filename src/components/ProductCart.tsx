
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import { Button } from "./ui/button";
import NotebookModal from "./NotebookModal";
import { formatPrice } from "@/lib/utils";

interface ProductOptions {
    massa: string;
    recheio: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  category: string;
  isNew?: boolean;
  options: ProductOptions;
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
      {open && <NotebookModal closeModal={() => setOpen(false)} product={product} key={product.id} />}

    </>
  )
}

export default ProductCard