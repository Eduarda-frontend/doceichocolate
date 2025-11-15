import { FiUpload } from "react-icons/fi";

interface ImagePreview {
  file: File;
  name: string;
  previewUrl: string;
}

interface ImageUploadCardProps {
  cartImages: ImagePreview[];
  handleFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (name: string) => void;
  handleDragStart: (index: number) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  handleDrop: (index: number) => void;
}

const ImageUploadCard = ({
  cartImages,
  handleFile,
  removeImage,
  handleDragStart,
  handleDragOver,
  handleDrop,
}: ImageUploadCardProps) => {

  return (
    <div className="p-6 rounded-xl border bg-card shadow-sm space-y-4">

      <h2 className="font-semibold text-lg">Imagens do Produto</h2>

      {/* ---------------- DROPZONE PRINCIPAL ---------------- */}
      <div
        className="
          w-full p-4 border-2 border-dashed border-border rounded-xl
          transition-colors
        "
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => e.preventDefault()}
      >
        <div className="grid grid-cols-[120px_1fr] gap-4 items-start">

          {/* ---------------- COLUNA ESQUERDA (UPLOAD) ---------------- */}
          <label
            htmlFor="upload-input"
            role="button"
            className="
              cursor-pointer flex flex-col items-center justify-center
              space-y-2 select-none relative
            "
          >
            <FiUpload size={32} className="opacity-70" />

            <p className="text-sm opacity-70 text-center leading-tight">
              Clique ou solte<br /> imagens
            </p>

            {/* Input invisível cobrindo toda área do label */}
            <input
              id="upload-input"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFile}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </label>

          {/* ---------------- COLUNA DIREITA (IMAGENS) ---------------- */}
          <div className="flex flex-wrap gap-4">
            {cartImages.map((item, index) => (
              <div
                key={item.name}
                className="
                  relative group cursor-move border rounded-lg p-1 shadow-sm bg-background
                  transition
                "
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={() => handleDrop(index)}
              >
                <img
                  src={item.previewUrl}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />

                {/* Botão de excluir no hover */}
                <button
                  type="button"
                  onClick={() => removeImage(item.name)}
                  className="
                    absolute top-1 right-1 bg-black/70 text-white px-1.5 py-0.5
                    rounded opacity-0 group-hover:opacity-100
                    transition-opacity duration-150
                  "
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ImageUploadCard;
