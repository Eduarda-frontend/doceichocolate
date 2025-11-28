import { Button } from "./button";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div
      className="
        flex flex-wrap gap-2
        justify-center sm:justify-start
      "
    >
      {categories.map((category) => (
        <Button
          variant={selectedCategory === category ? 'default' : 'outline'}
          size="sm"
          key={category}
          onClick={() => onCategoryChange(category)}
          className="
            text-xs px-2 py-1
            sm:text-sm sm:px-3 sm:py-2
          "
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
