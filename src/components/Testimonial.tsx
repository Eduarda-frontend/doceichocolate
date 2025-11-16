import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaRegStar } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import ImageUploadCard, { type ImagePreview } from "./ImageUploadCard";

// ------------------- SCHEMA ZOD -------------------
const testimonialSchema = z.object({
    testimonial: z
        .string()
        .nonempty("O depoimento é obrigatório.")
        .min(20, "O depoimento deve ter pelo menos 20 caracteres."),
    rating: z.number().min(1, "Selecione uma nota de 1 a 5 estrelas."),
    images: z
        .array(
            z.object({
                name: z.string(),
                previewUrl: z.string(),
                file: z.any(),
            })
        )
        .nonempty("Envie ao menos uma foto do produto para publicar."),
});

type TestimonialFormData = z.infer<typeof testimonialSchema>;

export default function TestimonialForm() {
    const [images, setImages] = useState<ImagePreview[]>([]);
    const [dragIndex, setDragIndex] = useState<number | null>(null);

    const dashedPinkInput =
        "w-full bg-background px-3 py-2 rounded-xl border-dashed border-2 border-pink-soft text-sm shadow-soft focus:outline-none focus:ring-2 focus:ring-pink-medium";

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<TestimonialFormData>({
        resolver: zodResolver(testimonialSchema),
        defaultValues: {
            testimonial: "",
            rating: 0,
            images: [],
        },
    });

    // Atualiza o react-hook-form quando selecionar imagens
    const selectImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        const previews = files.map((file) => ({
            file,
            name: file.name,
            previewUrl: URL.createObjectURL(file),
        }));

        setImages((prev) => {
            const updated = [...prev, ...previews];
            setValue("images", updated, { shouldValidate: true });
            return updated;
        });
    };

    const removeImage = (name: string) => {
        const updated = images.filter((img) => img.name !== name);
        setImages(updated);
        setValue("images", updated, { shouldValidate: true });
    };

    const startDrag = (index: number) => setDragIndex(index);

    const dragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

    const dropImage = (index: number) => {
        if (dragIndex === null) return;

        const reordered = [...images];
        const [removed] = reordered.splice(dragIndex, 1);
        reordered.splice(index, 0, removed);

        setImages(reordered);
        setValue("images", reordered, { shouldValidate: true });
        setDragIndex(null);
    };

    // ENVIO FINAL
    const onSubmit = (data: TestimonialFormData) => {
        console.log("Depoimento enviado:", data);
    };

    const rating = watch("rating");

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-5xl mx-auto my-12">
            <div className="p-6 rounded-xl border bg-card shadow-sm space-y-4">

                <h2 className="font-semibold text-lg text-pink-deep text-center">
                    Compartilhe seu depoimento
                </h2>

                {/* DEPOMENTO */}
                <div className="space-y-2">
                    <label className="font-secundario text-sm">Seu depoimento*</label>
                    <textarea
                        {...register("testimonial")}
                        placeholder="Escreva aqui sua experiência..."
                        className={`${dashedPinkInput} min-h-12 `}
                    />
                    {errors.testimonial && (
                        <p className="text-red-500 text-sm">{errors.testimonial.message}</p>
                    )}
                </div>

                {/* ESTRELAS */}
                <div className="space-y-2">
                    <label className="font-secundario text-sm">Avaliação*</label>

                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setValue("rating", star, { shouldValidate: true })}
                            >
                                <FaRegStar
                                    className={`w-7 h-7 transition-all ${
                                        rating >= star
                                            ? "fill-pink-vibrant text-pink-vibrant"
                                            : "text-muted"
                                    }`}
                                />
                            </button>
                        ))}
                    </div>

                    {errors.rating && (
                        <p className="text-red-500 text-sm">{errors.rating.message}</p>
                    )}
                </div>

                {/* FOTOS OBRIGATÓRIAS */}
                <div className="space-y-2">
                    <ImageUploadCard
                        cartImages={images}
                        handleFile={selectImages}
                        removeImage={removeImage}
                        handleDragStart={startDrag}
                        handleDragOver={dragOver}
                        handleDrop={dropImage}
                        title="Fotos da Entrega"
                        placeholder="Envie fotos da sua encomenda<br>para avaliar"
                        uploadIcon={<FiUpload size={28} className="opacity-60" />}
                    />

                    {errors.images && (
                        <p className="text-red-500 text-sm">{errors.images.message}</p>
                    )}
                </div>
            </div>

            <button
                type="submit"
                className="w-full bg-pink-medium hover:bg-pink-vibrant text-white rounded-xl py-3 font-secundario text-lg shadow-soft transition-all"
            >
                Enviar depoimento
            </button>
        </form>
    );
}
