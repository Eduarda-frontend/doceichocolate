import type { FormEvent, ReactNode } from "react";

type FormularioProps = {
	children: ReactNode;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
};

export function Formulario({ children }: FormularioProps) {
	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
	}
	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			{children}
		</form>
	);
}
