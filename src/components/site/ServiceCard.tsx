import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function ServiceCard({
  icon: Icon,
  title,
  description,
  to = "/services",
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  to?: string;
}) {
  return (
    <Link
      to={to}
      className="group flex flex-col rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
        <Icon size={24} />
      </div>
      <h3 className="mt-6 font-display text-xl font-medium">{title}</h3>
      <p className="mt-3 flex-1 text-sm text-muted-foreground">{description}</p>
      <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent">
        Learn more
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
