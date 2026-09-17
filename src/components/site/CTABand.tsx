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
    <section className="bg-primary py-16 text-primary-foreground">
      <div className="container max-w-2xl text-center">
        <h2 className="text-balance font-display text-3xl font-medium md:text-4xl">{title}</h2>
        <p className="mt-4 text-primary-foreground/85">{description}</p>
        <Button asChild size="lg" variant="secondary" className="mt-8">
          <Link to={to}>{buttonLabel}</Link>
        </Button>
      </div>
    </section>
  );
}
