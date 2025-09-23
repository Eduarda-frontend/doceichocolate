import type { ProductSection } from "@/components/NotebookModal";

export const productSections: ProductSection[] = [
  {
    title: "Massa",
    options: [
      { id: "chocolate", label: "Chocolate"},
      { id: "baunilha", label: "Baunilha"},
      { id: "red-velvet", label: "Red Velvet"},
    ],
  },
    {
		title: "Recheio do Bentô Cake",
		options: [
			{ id: "brigadeiro", label: "Brigadeiro"},
			{ id: "beijinho", label: "Beijinho"},
			{ id: "doce-leite", label: "Doce de Leite"},
		],
	}
];