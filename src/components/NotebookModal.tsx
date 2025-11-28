import { Carousel } from "./ui/carousel";
import { Modal } from "./ui/modal";

import { formatPrice, useBreakpoint } from "@/lib/utils";

import type { Product } from "./ProductCart";
import NotebookForm from "./NotebookForm";
import { motion, useReducedMotion } from "framer-motion";

type NotebookModalProps = {
  product: Product;
  closeModal: () => void;
};

const NotebookModal = ({ product, closeModal }: NotebookModalProps) => {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useBreakpoint();
  const modalSize = isMobile ? "md" : "lg";

  return (
    <Modal
      closeModal={closeModal}
      size={modalSize}
      aria-modal="true"
      aria-labelledby="notebook-modal-title"
      aria-describedby="notebook-modal-content"
    >
      <div
        className="flex flex-row w-full max-h-[70vh] overflow-auto">
        {/* LEFT SIDE */}
        <section
          className="
            w-full lg:w-1/2 
            p-4 
            overflow-y-auto 
            custom-scroll 
            overflow-hidden
            flex 
            flex-col
            md:flex-row">
          <h2
            id="notebook-modal-title"
            className="sr-only"
          >
            Informações do produto
          </h2>

          <div
            id="notebook-modal-content"
            className="relative flex py-4 md:grid grid-cols-1 items-center sm:grid-cols-2 gap-4">
            <div className="px-1 xs:px-2">
              <Carousel
                autoPlay
                interval={3000}
                showIndicators
                showArrows
                aria-label="Imagens do produto"
              >
                {product.image.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt={`${product.name} – imagem ${index + 1}`}
                      className="
                        w-48 min-w-48 md:w-96  object-cover p-2 md:p-0 rounded-md
                        transition-transform duration-300 hover:scale-[1.02]
                      "
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </div>
                ))}
              </Carousel>
            </div>

            <article
              className="
                border rounded-md border-[hsl(var(--yellow-sweet))]
                p-2 md:p-4 flex flex-col flex-1 
              "
            >
              <h3 className="text-md md:text-lg lg:text-xl h-2 md:h-16 font-bold text-foreground mb-3">
                Descrição do produto
              </h3>

              <div className="space-y-2 text-foreground/80">
                <h4 className="text-base lg:text-lg font-semibold text-primary">
                  {product.name}
                </h4>

                <p className="text-xs leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="mt-4">
                <motion.p
                  animate={
                    prefersReducedMotion
                      ? {}
                      : { scale: [1, 1.05, 1], opacity: [1, 0.9, 1] }
                  }
                  transition={
                    prefersReducedMotion
                      ? {}
                      : {
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                  }
                  className="text-lg lg:text-xl font-bold text-primary"
                >
                  {formatPrice(product.price)}
                </motion.p>

                <p className="text-[10px] lg:text-xs text-muted-foreground">
                  Preço base
                </p>
              </div>
            </article>
          </div>
          <div className="flex md:hidden">
            <section className="items-center w-full lg:w-1/2 p-4 bg-gradient-sweet rounded-md overflow-y-auto custom-scroll lg:max-h-full" aria-labelledby="form-title">
              <NotebookForm
                closeModal={closeModal}
                product={product}
                title={product.name}
              />
            </section>
          </div>
        </section>

        {/* RIGHT SIDE */}
        <section
          className="
            hidden
            md:flex  
            items-center
            w-full lg:w-1/2 
            h-[70vh]
            p-4 bg-gradient-sweet
          "
          aria-labelledby="form-title"
        >
          <NotebookForm
            closeModal={closeModal}
            product={product}
            title={product.name}
          />
        </section>
      </div>
    </Modal>
  );
};

export default NotebookModal;
