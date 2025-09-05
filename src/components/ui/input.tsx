import type { InputHTMLAttributes } from "react";


export function Input (props: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input  
        className="h-12 p-2 w-full bg-background/80 border-2 border-border focus:border-primary transition-colors"
        {...props}
        />
    )
}