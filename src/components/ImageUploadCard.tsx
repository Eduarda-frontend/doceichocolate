import { FiUpload } from "react-icons/fi";

export interface ImagePreview {
  file: File;
  name: string;
  previewUrl: string;
}

export interface ImageUploadCardProps {
  cartImages: ImagePreview[];
  handleFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (name: string) => void;
  handleDragStart: (index: number) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  handleDrop: (index: number) => void;

  /** NOVAS PROPS DO COMPONENTE GENÉRICO **/
  title?: string;
  placeholder?: string;
  uploadIcon?: React.ReactNode;
}

const ImageUploadCard = ({
  cartImages,
  handleFile,
  removeImage,
  handleDragStart,
  handleDragOver,
  handleDrop,

  title = "Enviar Imagens",
  placeholder = "Clique ou solte<br>imagens",
  uploadIcon = <FiUpload size={32} className="opacity-70" />,
}: ImageUploadCardProps) => {
  return (
    <div className="p-6 rounded-xl border bg-card shadow-sm space-y-4">

      {title && <h2 className="font-semibold text-lg">{title}</h2>}

      <div
        className="
          w-full p-4 border-2 border-dashed border-border rounded-xl
          transition-colors
        "
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => e.preventDefault()}
      >
        <div className="grid grid-cols-[120px_1fr] gap-4 items-start">

          <label
            htmlFor="upload-input"
            role="button"
            className="
              cursor-pointer flex flex-col items-center justify-center
              space-y-2 select-none relative
            "
          >
            {uploadIcon}

            <p className="text-sm opacity-70 text-center leading-tight">
              {placeholder.split("<br>").map((line, i) => (
                <span key={i}>
                  {line}
                  {i < placeholder.split("<br>").length - 1 && <br />}
                </span>
              ))}
            </p>

            <input
              id="upload-input"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFile}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </label>

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

                <button
                  type="button"
                  onClick={() => removeImage(item.name)}
                  className="
                    absolute top-1 right-1 bg-black/70 text-white px-1.5 py-0.5
                    rounded opacity-0 group-hover:opacity-100 transition-opacity
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
