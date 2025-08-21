import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import bentoCakeImage from "@/assets/hero-banner.jpg";

interface ProductOption {
	id: string;
	label: string;
	price?: string;
}

interface ProductSection {
	title: string;
	options: ProductOption[];
}

const productSections: ProductSection[] = [
  {
    title: "Massa",
    options: [
      { id: "chocolate", label: "Chocolate", price: "" },
      { id: "baunilha", label: "Baunilha", price: "" },
      { id: "red-velvet", label: "Red Velvet", price: "" },
    ],
  },
	{
		title: "Recheio do Bentô Cake",
		options: [
			{ id: "brigadeiro", label: "Brigadeiro", price: "" },
			{ id: "beijinho", label: "Beijinho", price: "" },
			{ id: "doce-leite", label: "Doce de Leite", price: "" },
		],
	}
];

export function NotebookModal() {
	const [selections, setSelections] = useState<Record<string, string>>({});

	const handleSelectionChange = (section: string, value: string) => {
		setSelections((prev) => ({ ...prev, [section]: value }));
	};

	return (


			<DialogContent className="max-w-[95vw] h-[70vh] p-0 border-0 shadow-none">
				<div className="relative w-full h-full bg-gradient-to-r from-notebook-left via-notebook-left to-notebook-right rounded-2xl shadow-[var(--shadow-notebook)] overflow-hidden">
					{/* Close Button */}
					<button
						className="absolute top-4 right-4 z-50 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 flex items-center justify-center transition-colors"
					>
						<X className="h-4 w-4" />
					</button>

					<div className="flex h-full">
						{/* Left Page - Product Info */}
						<div className="flex items-center w-1/2 p-5 center bg-notebook-left relative">
							<div className="relative z-10 grid grid-cols-2 items-center">
								<div>
									<img
										src={bentoCakeImage}
										alt="Bentô Cake"
										className="h-[60vh] object-cover rounded-lg shadow-lg"
									/>
								</div>

								<div className="px-5 h-full flex flex-col justify-between">
									<h2 className="text-2xl font-bold text-foreground mb-4">
										Descrição do produto
									</h2>

									<div className="space-y-4 text-foreground/80">
										<h3 className="text-xl font-semibold text-primary">
											Bentô Cake
										</h3>

										<p className="text-sm leading-relaxed">
											O Bentô Cake é ideal para 2 pessoas,
											ótima opção de presente
											personalizável à sua maneira. Com 10
											cm de diâmetro, 2 camadas de bolo e
											1 de recheio.
										</p>

									</div>
                  <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                    <p className="text-2xl font-bold text-primary">
                      R$ 75,00
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Preço base
                    </p>
                  </div>
								</div>
							</div>
						</div>

						{/* Right Page - Options */}
						<div className="w-1/2 p-5 bg-notebook-right bg-gradient-sweet relative overflow-y-auto">

							<div className="relative z-10 space-y-6">
								<h2 className="text-2xl pt-3 font-bold text-foreground mb-6">
									Personalize seu pedido
								</h2>

								{productSections.map((section) => (
									<div
										key={section.title}
										className="space-y-3"
									>
										<h3 className="text-lg font-semibold text-foreground mb-3">
											{section.title}
										</h3>

										<RadioGroup
											value={
												selections[section.title] || ""
											}
											onValueChange={(value) =>
												handleSelectionChange(
													section.title,
													value
												)
											}
											className="grid grid-cols-3"
										>
											{section.options.map((option) => (
												<div
													key={option.id}
													className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary/10 transition-colors bg-white/50 backdrop-blur-sm border border-primary/20"
												>
													<RadioGroupItem
														value={option.id}
														id={option.id}
														className="border-primary text-primary focus:ring-primary bg-white"
													/>
													<Label
														htmlFor={option.id}
														className="flex-1 cursor-pointer text-foreground hover:text-primary transition-colors"
													>
														<div className="flex justify-between items-center">
															<span className="font-medium">
																{option.label}
															</span>
															{option.price && (
																<span className="text-sm text-muted-foreground ml-2">
																	{
																		option.price
																	}
																</span>
															)}
														</div>
													</Label>
												</div>
											))}
										</RadioGroup>
									</div>
								))}

								<div className="pt-6 border-t border-primary/20">
									<div className="flex gap-3">
										<Button
											variant="outline"
											className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
										
										>
											Cancelar
										</Button>
										<Button
											variant="default"
											className="flex-1 bg-primary hover:bg-primary/90"
											onClick={() => {
												console.log(
													"Seleções:",
													selections
												);
												
											}}
										>
											Adicionar ao Carrinho
										</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</DialogContent>

	);
}
