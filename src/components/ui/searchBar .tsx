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
    <div className="flex mt-6 items-center gap-2 px-3 py-1.5 w-48 rounded-full border border-input bg-background shadow-sm focus-within:ring-2 focus-within:ring-primary/40 transition">
      <IoSearch size={16} className="text-muted-foreground" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />
    </div>
  );
}
