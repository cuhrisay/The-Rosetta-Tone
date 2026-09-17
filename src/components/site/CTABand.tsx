import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function CTABand({
  title = "Ready for a plan built around you?",
  description = "Apply for 1:1 personalized training and let's build a strategy that actually fits your body, your goals, and your life.",
  buttonLabel = "Apply to Work With Me",
  to = "/11-coaching",
}: {
  title?: string;
  description?: string;
  buttonLabel?: string;
  to?: string;
}) {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container grid items-center gap-10 py-16 md:grid-cols-[1fr_1.1fr]">
        <img
          src="/assets/images/photo-rosetta-laptop-consult.webp"
          alt="Rosetta Riley coaching a client online"
          className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lg"
          loading="lazy"
          width={800}
          height={600}
        />
        <div className="text-center md:text-left">
          <h2 className="text-balance font-display text-3xl font-medium md:text-4xl">{title}</h2>
          <p className="mt-4 text-primary-foreground/85">{description}</p>
          <Button asChild size="lg" variant="secondary" className="mt-8">
            <Link to={to}>{buttonLabel}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
