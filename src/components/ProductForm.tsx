
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/input";

const schema = z.object({
  name: z.string().nonempty("O nome do produto é obrigatório"),
  category: z.string().nonempty("A categoria do produto é obrigatória"),
  description: z.string().nonempty("A descrição do produto é obrigatória"),
  price: z.string().nonempty("O preço é obrigatório"),
  ingredients: z.string().nonempty("Os ingredientes do produto são obrigatórios"),
})

type FormData = z.infer<typeof schema>;

const ProductForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  })

  function onSubmit(data: FormData) {
    console.log("Produto cadastrado com sucesso!", data);
    reset();
  }

  return (
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
            <label htmlFor="category">Categoria*</label>
            <Input
              name="category"
              type="text"
              className="w-full cursor-pointer  bg-background p-4 rounded-lg border-dashed border-2 border-border gap-3"
              placeholder="Ex: Bolo de aniversário"
              register={register}
              error={errors.category?.message}
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
            <Input
              name="price"
              type="text"
              className="w-full cursor-pointer  bg-background p-4 rounded-lg border-dashed border-2 border-border gap-3"
              placeholder="Ex: Bolo de aniversário"
              register={register}
              error={errors.price?.message}
            />
          </div>

          <div className="space-y-2 ">
            <label htmlFor="ingredients">Ingredientes*</label>
            <Input
              name="ingredients"
              type="text"
              className="w-full cursor-pointer  bg-background p-4 rounded-lg border-dashed border-2 border-border gap-3"
              placeholder="Ex: Bolo de aniversário"
              register={register}
              error={errors.ingredients?.message}
            />
          </div>

        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          className="border-border hover:bg-secondary" size={"default"}        >
          Limpar
        </Button>
        <Button
          type="submit"
          variant="default"
          size="md"
          className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft"
        >
          Cadastrar Produto
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;