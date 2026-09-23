import { Quote } from "lucide-react";

export function TestimonialCard({
  name,
  quote,
  avatar,
}: {
  name: string;
  quote: string;
  avatar?: string;
}) {
  return (
    <figure className="flex h-full flex-col rounded-2xl bg-card p-8 shadow-sm">
      <div className="flex items-center justify-between">
        {avatar ? (
          <img
            src={avatar}
            alt=""
            className="h-11 w-11 rounded-full object-cover"
            loading="lazy"
            width={44}
            height={44}
          />
        ) : (
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 font-display text-sm text-accent">
            {name.charAt(0)}
          </div>
        )}
        <Quote className="text-accent" size={24} />
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/85">
        "{quote}"
      </blockquote>
      <figcaption className="mt-6 font-display text-lg text-card-foreground">{name}</figcaption>
    </figure>
  );
}
