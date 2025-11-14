
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/input";
import { FiUpload } from "react-icons/fi";
import { useState } from "react";

const schema = z.object({
  name: z.string().nonempty("O nome do produto é obrigatório"),
  category: z.string().nonempty("A categoria do produto é obrigatória"),
  description: z.string().nonempty("A descrição do produto é obrigatória"),
  price: z.string().nonempty("O preço é obrigatório"),
  ingredients: z.string().nonempty("Os ingredientes do produto são obrigatórios"),

  massa: z.array(z.string()).nonempty("Selecione ao menos um tipo de massa"),
  recheio: z.array(z.string()).nonempty("Selecione ao menos um tipo de recheio"),
})

type FormData = z.infer<typeof schema>;

interface ProdutoFormData {
  name: string;
  category: string;
  description: string;
  price: string;
  ingredients: string;
  imageUrl?: string;
}

interface ImagePreview {
  file: File;
  name: string;
  previewUrl: string;
}

const formatCurrency = (value: string) => {
  const numeric = value.replace(/\D/g, ""); // remove tudo que não é número

  if (!numeric) return "R$ ";

  const number = Number(numeric) / 100;
  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};



const NewProductForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  })
  const [cartImages, setCartImages] = useState<ImagePreview[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: ImagePreview[] = [];

    Array.from(files).forEach((file) => {
      const previewUrl = URL.createObjectURL(file);

      newImages.push({
        file,
        name: file.name,
        previewUrl,
      });
    });

    setCartImages((prev) => [...prev, ...newImages]);
  };

  // Remove a imagem da lista
  const removeImage = (name: string) => {
    setCartImages((prev) => prev.filter((img) => img.name !== name));
  };

  // 🔹 Envio do formulário *sem* Firebase
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    console.log("Dados enviados (exemplo):", { ...data, imagens: cartImages });

    alert("Formulário enviado! (Firebase removido)");

    reset();
    setCartImages([]);
    setIsSubmitting(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-card shadow-card border-pink-medium/20">
          <div className="space-y-6">

            <div className="space-y-2 ">
              <label htmlFor="name">Nome do produto*</label>
              <Input
                name="name"
                type="text"
                className="w-full cursor-pointer  bg-background p-4 rounded-lg border-dashed border-2 border-border gap-3"
                placeholder="Ex: Bolo de aniversário"
                register={register}
                error={errors.name?.message}
              />
            </div>

            <div className="space-y-2 ">
              <label htmlFor="description">Descrição*</label>
              <textarea
                className="w-full cursor-pointer  bg-background p-4 rounded-lg border-dashed border-2 border-border gap-3"
                {...register("description")}
                name="description"
                id="description"
                placeholder="Digite a descrição completa sobre o produto" />
              {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>}
            </div>

            <div className="space-y-2 ">
              <label htmlFor="price">Preço*</label>
              <input
                id="price"
                type="text"
                className="w-full cursor-pointer bg-background p-4 rounded-lg border-dashed border-2 border-border gap-3"
                placeholder="R$ 0,00"
                {...register("price", {
                  onChange: (e) => {
                    const formatted = formatCurrency(e.target.value);
                    e.target.value = formatted;
                  },
                })}
              />

              {errors.price && (
                <p className="text-sm text-red-600 mt-1">{errors.price.message}</p>
              )}
            </div>

            <div className="flex gap-16">

              <div className="space-y-2">
                <label className="font-medium">Tipo de Massa*</label>

                <div className="space-y-2">

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" value="chocolate" {...register("massa")} />
                    Chocolate
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" value="baunilha" {...register("massa")} />
                    Baunilha
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" value="red_velvet" {...register("massa")} />
                    Red Velvet
                  </label>

                </div>

                {errors.massa && (
                  <p className="text-sm text-red-600 mt-1">{errors.massa.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="font-medium">Recheio*</label>

                <div className="space-y-2">

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" value="brigadeiro" {...register("recheio")} />
                    Brigadeiro
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" value="beijinho" {...register("recheio")} />
                    Beijinho
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" value="doce_de_leite" {...register("recheio")} />
                    Doce de Leite
                  </label>

                </div>

                {errors.recheio && (
                  <p className="text-sm text-red-600 mt-1">{errors.recheio.message}</p>
                )}
              </div>
            </div>

          </div>
        </div>

        <div className="my-4 flex items-center w-full cursor-pointer bg-background p-3 rounded-lg border-dashed border-2 border-border">
          <button className=" border-2 w-9 h-12  rounded-lg border-dashed border-border gap-3">
            <div className="absolute cursor-pointer">
              <FiUpload size={30} />
            </div>
            <div className="cursor-pointer">
              <input className="cursor-pointer opacity-0" multiple type="file" accept="image/*" onChange={handleFile} />
            </div>
          </button>
          {cartImages.map((item) => (
            <div
              key={item.name}
              className="relative inline-block ps-3 group"
            >
              {/* imagem */}
              <img
                src={item.previewUrl}
                alt={item.name}
                className="max-w-32 max-h-32 object-cover rounded-sm"
              />

              {/* Botão de remover - aparece só no hover */}
              <button
                onClick={() => removeImage(item.name)}
                className="absolute top-1 right-1 text-white rounded-full w-2 h-2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                type="button"
              >
                ✕
              </button>
            </div>
          ))}

        </div>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            className="border-border hover:bg-secondary" size={"default"}
            onClick={() => {
              reset();
              setCartImages([]);
            }}        >
            Limpar
          </Button>
          <Button
            type="submit"
            variant="default"
            size="md"
            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft"
          >
            {isSubmitting ? "Cadastrando..." : "Cadastrar Produto"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default NewProductForm