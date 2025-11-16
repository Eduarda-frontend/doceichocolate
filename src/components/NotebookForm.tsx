import { useContext, useState } from "react";
import type { Product } from "./ProductCart";
import { Button } from "./ui/button";
import { CartContext } from "@/contexts/cartContext";
import { Formulario } from "./ui/formulario";
import { productSections } from "@/data/productsSection";
import { Toast } from "./ui/toast"; 
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
    const { addItemCart } = useContext(CartContext);
    const [selection, setSelection] = useState<Record<string, string>>({});
    const [showToast, setShowToast] = useState(false);

    function handleChange(sectionTitle: string, value: string) {
        setSelection((prev) => ({ ...prev, [sectionTitle]: value }));
    }

    function handleSubmit() {
        const selectedCount = Object.keys(selection).length;

        if (selectedCount < 2) {
            setShowToast(true); // exibe o toast
            return;
        }

        addItemCart(product, selection);
        closeModal();
    }

    return (
        <>
            <Formulario onSubmit={handleSubmit}>
                <div className="relative z-10 space-y-4">
                    <h2 className="text-xl pt-3 font-bold text-foreground mb-4">
                        Personalize seu pedido
                    </h2>

                    <div>
                        <h3 className="text-base font-semibold text-foreground mb-2">
                            {title}
                        </h3>

                        {productSections.map((section) => (
                            <div key={section.title} className="space-y-2">
                                <h3 className="text-sm font-semibold text-foreground mb-2">
                                    {section.title}
                                </h3>

                                <div className="grid grid-cols-3 gap-2.5">
                                    {section.options.map((option) => (
                                        <div
                                            key={option.id}
                                            className="flex items-center space-x-2.5 p-2.5 rounded-lg hover:bg-[hsl(var(--yellow-sweet))] transition-colors bg-white/50 backdrop-blur-sm border"
                                        >
                                            <label
                                                htmlFor={`${section.title}-${option.id}`}
                                                className="flex-1 cursor-pointer text-xs text-foreground hover:text-primary-foreground transition-colors"
                                            >
                                                <input
                                                    id={`${section.title}-${option.id}`}
                                                    className="me-2 accent-primary w-4 h-4 cursor-pointer"
                                                    type="radio"
                                                    name={section.title}
                                                    value={option.id}
                                                    checked={selection[section.title] === option.id}
                                                    onChange={(e) =>
                                                        handleChange(section.title, e.target.value)
                                                    }
                                                />
                                                {option.label}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-4">
                        <div className="flex gap-3">
                            <Button
                                variant="yellow"
                                type="button"
                                size="sm"
                                onClick={closeModal}
                                className="flex-1 text-primary-foreground hover:bg-[hsl(var(--yellow-sweet))] hover:text-primary-foreground"
                            >
                                Cancelar
                            </Button>

                            <Button
                                type="submit"
                                variant="yellow"
                                size="sm"
                                className="flex-1 bg-[hsl(var(--yellow-sweet))]"
                            >
                                Adicionar ao Carrinho
                            </Button>
                        </div>
                    </div>
                </div>
            </Formulario>

            {/* Toast */}
            {showToast && (
                <Toast
                    message="Por favor, escolha pelo menos duas opções!"
                    type="error"
                    onClose={() => setShowToast(false)}
                />
            )}
        </>
    );
};

export default NotebookForm;
