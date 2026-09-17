import { Quote } from "lucide-react";

export function TestimonialCard({ name, quote }: { name: string; quote: string }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl bg-card p-8 shadow-sm">
      <Quote className="text-accent" size={28} />
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/85">
        "{quote}"
      </blockquote>
      <figcaption className="mt-6 font-display text-lg">{name}</figcaption>
    </figure>
  );
}
