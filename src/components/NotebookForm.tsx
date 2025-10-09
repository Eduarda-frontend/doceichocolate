import { useContext, useState } from "react";
import type { Product } from "./ProductCart";
import { Button } from "./ui/button";
import { CartContext } from "@/contexts/cartContext";
import { Formulario } from "./ui/form";
import { productSections } from "@/data/productsSection";

export interface Option {
    id: string;
    name: string;
}

type notebookFormProps = {
    title: string;
    closeModal: () => void;
    product: Product;
};


const NotebookForm = ({ title, closeModal, product }: notebookFormProps) => {
    const { addItemCart } = useContext(CartContext)
    const [selection, setSelection] = useState<Record<string, string>>({})

    function handleChange(sectionTitle: string, value: string) {
        setSelection((prev) => ({ ...prev, [sectionTitle]: value }))
    }

    function handleSubmit() {
        const cartItem = product

        addItemCart(cartItem, selection);
        closeModal()
    }

    return (
        <Formulario onSubmit={handleSubmit}>
            <div className="relative z-10 space-y-6">
                <h2 className="text-2xl pt-3 font-bold text-foreground mb-6">
                    Personalize seu pedido
                </h2>

                <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                        {title}
                    </h3>
                    {productSections.map((section) => (
                        <div key={section.title} className="space-y-3">
                            <h3 className="text-lg font-semibold text-foreground mb-3">{section.title}</h3>

                            <div className="grid grid-cols-3 gap-3">

                                {section.options.map((option) => (
                                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[hsl(var(--yellow-sweet))]  transition-colors bg-white/50 backdrop-blur-sm border ">
                                        <label
                                            htmlFor={`${section.title}-${option.id}`}
                                            className="flex-1 cursor-pointer text-foreground hover:text-primary-foreground transition-colors"
                                        >
                                            <input
                                                id={`${section.title}-${option.id}`}
                                                className="me-2 bg-white accent-primary w-4 h-4 flex-1 cursor-pointer"
                                                type="radio"
                                                name={section.title}
                                                value={option.id}
                                                checked={selection[section.title] === option.id}
                                                onChange={(e) => handleChange(section.title, e.target.value)}
                                            />
                                            {option.label}
                                        </label>
                                    </div>

                                ))}
                            </div>

                        </div>


                    ))}
                </div>

                <div className="pt-6">
                    <div className="flex gap-3">
                        <Button
                            variant="yellow"
                            type="button"
                            size="md"
                            onClick={closeModal}
                            className="flex-1 text-primary-foreground hover:bg-[hsl(var(--yellow-sweet))] hover:text-primary-foreground"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="yellow"
                            size="md"
                            className="flex-1 bg-[hsl(var(--yellow-sweet))]"
                        >
                            Adicionar ao Carrinho
                        </Button>
                    </div>
                </div>
            </div>
        </Formulario>
    )
}

export default NotebookForm