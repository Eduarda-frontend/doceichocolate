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
		<div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">

			{categories.map((category) => (
				<Button
					variant={selectedCategory === category ? 'default' : 'outline'}
					size="md"
					key={category}
					onClick={() => onCategoryChange(category)}
				>
					{category}
				</Button>
			))}
		</div>
	);
}
