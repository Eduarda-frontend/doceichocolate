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
			<Button
				variant={selectedCategory === 'all' ? 'default' : 'outline'}
				size="md"
				onClick={() => onCategoryChange("all")}
			>
                Todos
			</Button>

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
