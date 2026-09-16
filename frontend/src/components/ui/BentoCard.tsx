import type { ReactNode } from "react";

type BentoCardProps = {
  children: ReactNode;
  className?: string;
  accent?: boolean;
  ghost?: boolean;
  id?: string;
};

export function BentoCard({
  children,
  className = "",
  accent = false,
  ghost = false,
  id,
}: BentoCardProps) {
  const base =
    "rounded-[1.75rem] p-5 md:p-6 transition-all duration-300 hover:scale-[1.01]";

  const variant = accent
    ? "bg-accent text-accent-foreground"
    : ghost
      ? "border border-white/20 bg-transparent"
      : "bg-card border border-card-border";

  return (
    <div id={id} className={`${base} ${variant} ${className}`}>
      {children}
    </div>
  );
}
