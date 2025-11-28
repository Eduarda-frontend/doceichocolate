import { IoSearch } from "react-icons/io5";

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Buscar...",
}: SearchBarProps) {
  return (
    <div
      className="
        flex items-center gap-2 px-3 py-2
        w-full sm:w-64
        rounded-full border border-input bg-background shadow-sm
        focus-within:ring-2 focus-within:ring-primary/40
        transition
      "
    >
      <IoSearch
        size={18}
        className="text-muted-foreground"
        aria-hidden="true"
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="
          flex-1 bg-transparent text-sm outline-none
          placeholder:text-muted-foreground
        "
      />
    </div>
  );
}
