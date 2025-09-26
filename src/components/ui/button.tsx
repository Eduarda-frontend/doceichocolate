import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";
import { Link, type LinkProps } from "react-router-dom";

type ButtonProps = {
	variant: "default" | "secondary" | "outline" | "ghost" | "yellow" | "link";
	size: "sm" | "md" | "lg" | "default" | "icon";
	children?: React.ReactNode;
	to?: string;
} & ButtonHTMLAttributes<HTMLButtonElement> &
	Partial<Omit<LinkProps, "to">>;

export function Button({
	variant,
	size,
	children,
	className,
	to,
	...props
}: ButtonProps) {
	const variants = {
		default: "bg-primary text-primary-foreground hover:bg-primary/90",
		destructive:
			"bg-destructive text-destructive-foreground hover:bg-destructive/90",
		outline:
			"border border-input bg-background hover:bg-accent hover:text-accent-foreground",
		secondary:
			"bg-secondary text-secondary-foreground hover:bg-secondary/80",
		ghost: "hover:bg-accent hover:text-accent-foreground",
		link: "text-primary underline-offset-4 hover:underline",
		yellow: " text-primary-foreground hover:bg-[hsl(var(--yellow-sweet))]",
	};

	const sizes = {
		sm: "px-2 py-1 text-sm",
		md: "px-4 py-2 text-base",
		lg: "px-6 py-3 text-lg",
		default: "h-10 px-4 py-2",
		icon: "h-10 w-10",
	};

	if (to) {
		return (
			<Link
				className={cn(
					"inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium  [&_svg]:size-4 ",
					className,
					variants[variant],
					sizes[size]
				)}
				to={to}
				{...props}
			>
				{children}
			</Link>
		);
	}
	return (
		<button
			className={cn(
				"inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium [&_svg]:size-4 ",
				variants[variant],
				sizes[size],
				className
			)}
			{...props}
		>
			{children}
		</button>
	);
}
