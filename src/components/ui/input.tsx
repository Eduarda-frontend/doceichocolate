import { cn } from "@/lib/utils";
import type { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
    type: string;
    name: string;
    placeholder?: string;
    error?: string;
    register: UseFormRegister<any>;
    rules?: RegisterOptions;
    className?: string;
}


export function Input({ type, placeholder, error, register, name, rules, className }: InputProps) {
    return (
        <div>
            <input
                id={name}
                type={type}
                placeholder={placeholder}
                className={cn(
                    "h-12 p-3 w-full bg-background/80 border-2 border-border focus:border-primary rounded-lg transition-colors",
                    className
                )}

                {...register(name, rules)}
            />
            {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
        </div>
    )
}