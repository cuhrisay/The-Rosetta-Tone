import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("bg-secondary py-20 text-secondary-foreground md:py-28", className)}>
      <div className="container max-w-3xl text-center">
        {eyebrow && (
          <p className="mb-4 text-sm font-medium uppercase tracking-wide-lg text-primary">{eyebrow}</p>
        )}
        <h1 className="text-balance font-display text-4xl font-medium md:text-5xl">{title}</h1>
        {children && <div className="mt-6 text-lg text-secondary-foreground/75">{children}</div>}
      </div>
    </section>
  );
}
