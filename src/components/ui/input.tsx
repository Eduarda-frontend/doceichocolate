/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
	type: string;
	placeholder: string;
	name: string;
	register: UseFormRegister<any>;
	error?: string;
	rules?: RegisterOptions;
}

export function Input({
	name,
	placeholder,
	type,
	register,
	rules,
	error,
}: InputProps) {
	return (
		<>
			<input
				className="h-12 p-2 w-full bg-background/80 border-2 border-border focus:border-primary transition-colors"
				type={type}
				placeholder={placeholder}
				{...register(name, rules)}
				id={name}
			/>
			{error && <p className="text-red-500 my-1">{error}</p>}
		</>
	);
}
