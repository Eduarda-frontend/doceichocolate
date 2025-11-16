import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/input";
import { useState, useCallback } from "react";
import CakeConfigCard from "./CakeConfigCard";
import ImageUploadCard from "./ImageUploadCard";
import { useNavigate } from "react-router-dom";

/* ------------------- SCHEMA ------------------- */
const schema = z.object({
  name: z.string().nonempty("O nome do produto é obrigatório"),
  category: z.string().nonempty("A categoria do produto é obrigatória"),
  description: z.string().nonempty("A descrição do produto é obrigatória"),
  price: z.string().nonempty("O preço é obrigatório"),
  ingredients: z.string().nonempty("Os ingredientes do produto são obrigatórios"),
  massa: z.array(z.string()).nonempty("Selecione ao menos um tipo de massa"),
  recheio: z.array(z.string()).nonempty("Selecione ao menos um tipo de recheio"),
  decoracao: z.array(z.string()).nonempty("Selecione ao menos um tipo de decoração"),
  decoracao_extra: z.array(z.string()).nonempty("Selecione ao menos um item extra"),
});

type FormData = z.infer<typeof schema>;

interface ImagePreview {
  file: File;
  name: string;
  previewUrl: string;
}

/* ------------------- HELPERS ------------------- */
const formatCurrency = (value: string) => {
  const numeric = value.replace(/\D/g, "");
  if (!numeric) return "R$ ";
  const number = Number(numeric) / 100;
  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

const dashedInput = "w-full cursor-pointer bg-background px-3 py-2 rounded-lg border-dashed border-2 border-border text-sm";

/* ------------------- COMPONENT ------------------- */
const NewProductForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const navigate = useNavigate();
  const [cartImages, setCartImages] = useState<ImagePreview[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  /* ------------------- IMAGES ------------------- */
  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages = Array.from(files).map((file) => ({
      file,
      name: file.name,
      previewUrl: URL.createObjectURL(file),
    }));

    setCartImages((prev) => [...prev, ...newImages]);
  }, []);

  const removeImage = useCallback((name: string) => {
    setCartImages((prev) => prev.filter((img) => img.name !== name));
  }, []);

  const handleDragStart = useCallback((index: number) => {
    setDragIndex(index);
  }, []);

  const handleDrop = useCallback(
    (index: number) => {
      if (dragIndex === null) return;

      setCartImages((prev) => {
        const updated = [...prev];
        const [moved] = updated.splice(dragIndex, 1);
        updated.splice(index, 0, moved);
        return updated;
      });

      setDragIndex(null);
    },
    [dragIndex]
  );

  /* ------------------- SUBMIT ------------------- */
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    // Adiciona as imagens aos dados
    const produto = { ...data, imagens: cartImages };

    // Redireciona para a Home passando os dados
    navigate("/", { state: produto });

    // Opcional: limpar formulário
    reset();
    setCartImages([]);
    setIsSubmitting(false);
  };

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>, index: number) => {
      e.preventDefault();
    },
    []
  );


  /* ------------------- JSX ------------------- */
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      {/* CARD — Informações gerais */}
      <div className="p-6 rounded-xl border bg-card shadow-sm space-y-4">
        <h2 className="font-semibold text-lg">Informações do Produto</h2>

        {/* NOME */}
        <div className="space-y-2">
          <label>Nome do produto*</label>
          <Input
            name="name"
            type="text"
            className="w-full cursor-pointer bg-background px-3 py-2 rounded-lg border-dashed border-2 border-border text-sm"
            placeholder="Ex: Bolo de aniversário"
            register={register}
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>

        {/* DESCRIÇÃO */}
        <div className="space-y-2">
          <label>Descrição*</label>
          <textarea
            {...register("description")}
            placeholder="Digite a descrição completa sobre o produto"
            className={`${dashedInput} min-h-11`}
          />
          {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
        </div>

        {/* PREÇO */}
        <div className="space-y-2">
          <label>Preço*</label>
          <input
            {...register("price", {
              onChange: (e) => (e.target.value = formatCurrency(e.target.value)),
            })}
            placeholder="R$ 0,00"
            className={dashedInput}
          />
          {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
        </div>
      </div>

      {/* CONFIG DO BOLO */}
      <CakeConfigCard register={register} errors={errors} />

      {/* UPLOAD IMAGENS */}
      <ImageUploadCard
        cartImages={cartImages}
        handleFile={handleFile}
        removeImage={removeImage}
        handleDragStart={handleDragStart}
        handleDragOver={(e, index) => handleDragOver(e, index)}
        handleDrop={handleDrop}
        title="Imagens do Produto"
        placeholder="Clique ou solte<br>imagens do produto"
      />




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

  );
};

export default NewProductForm
