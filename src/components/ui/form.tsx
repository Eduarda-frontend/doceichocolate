import type { FormEvent, ReactNode } from "react";

type FormularioProps = {
	children: ReactNode;
    onSubmit: (data: Record<string, FormDataEntryValue>) => void;
};

export function Formulario({ children, onSubmit }: FormularioProps) {
	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const data = Object.fromEntries(new FormData(e.currentTarget));
		onSubmit(data);
	}
	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			{children}
		</form>
	);
}
