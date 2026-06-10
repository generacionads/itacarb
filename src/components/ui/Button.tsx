import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    primary:
      "bg-[var(--color-brand-accent)] text-white hover:bg-[var(--color-brand-accent)]/90 focus-visible:ring-[var(--color-brand-accent)]",
    outline:
      "border border-[var(--color-brand-primary)] text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary)] hover:text-white",
    ghost:
      "text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary)]/5",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm rounded-md",
    md: "h-11 px-6 text-base rounded-lg",
    lg: "h-13 px-8 text-lg rounded-xl",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
