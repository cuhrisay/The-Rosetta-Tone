import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { CTABand } from "@/components/site/CTABand";
import { TestimonialCard } from "@/components/site/TestimonialCard";
import { useSeo } from "@/hooks/use-seo";

export default function DallasPersonalTraining() {
  useSeo({
    title: "Personal Trainer in Dallas, TX for Women of Color",
    description:
      "In-person personal training in Dallas for women of color, built around hormone-aware coaching. NASM-certified trainer Rosetta Riley — strength, nutrition, and sustainable results.",
  });

  return (
    <>
      <PageHero eyebrow="In-Person Training · Dallas, TX" title="Personal Trainer in Dallas for Women of Color">
        Hormone-aware strength and nutrition coaching, in person, for women who are done with
        one-size-fits-all fitness plans.
      </PageHero>

      <section className="py-16 md:py-24">
        <div className="container grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-balance font-display text-2xl font-medium md:text-3xl">
              Training That Accounts for Your Hormones, Not Just Your Goals
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                If you've searched for a personal trainer in Dallas before, you've probably run
                into the same generic advice everywhere: eat less, train harder, push through.
                That advice doesn't account for your hormones, your stress load, or the fact that
                your body responds differently than it did in your 20s.
              </p>
              <p>
                I'm Rosetta Riley, a NASM-certified personal trainer and nutrition coach based in
                Dallas, TX. I work in person with women of color across the Dallas–Fort Worth area
                who want strength training and nutrition coaching that's actually built around how
                their bodies work — hormones, cycle, recovery, and all.
              </p>
              <p>
                Sessions combine hands-on coaching, form correction, and mobility work with a
                nutrition strategy you can actually stick to — no extreme diets, no punishing
                cardio, no pretending your body is identical to everyone else's.
              </p>
            </div>
          </div>
          <img
            src="/assets/images/photo-gym-training-deadhang.webp"
            alt="Rosetta Riley training a client in Dallas"
            className="aspect-[3/4] w-full rounded-3xl object-cover shadow-md"
            loading="lazy"
          />
        </div>
      </section>

      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container max-w-3xl">
          <h2 className="text-center font-display text-2xl font-medium md:text-3xl">
            What In-Person Training in Dallas Includes
          </h2>
          <ul className="mx-auto mt-8 max-w-xl space-y-3">
            {[
              "Customized workout and nutrition programming",
              "In-person training sessions in the Dallas–Fort Worth area",
              "Form correction, mobility, and hands-on guidance",
              "Ongoing check-ins and accountability between sessions",
              "Cycle-aware adjustments to training and nutrition",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <Check size={18} className="mt-0.5 shrink-0 text-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <Button asChild size="lg">
              <Link to="/11-coaching">Apply for In-Person Training</Link>
            </Button>
            <p className="mt-3 text-sm text-muted-foreground">
              Prefer to train from anywhere?{" "}
              <Link to="/services" className="text-accent hover:underline">
                See online coaching options
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <h2 className="text-center font-display text-2xl font-medium md:text-3xl">
            Real Results From Dallas-Area Clients
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <TestimonialCard
              name="Ashley Nelson"
              avatar="/assets/images/avatar-ashley-nelson.jpg"
              quote="As someone who suffers from PMDD I never in a million years thought I'd enjoy working out during my luteal or menstrual phase, but this workout program has changed that!"
            />
            <TestimonialCard
              name="Diana Cartwright"
              avatar="/assets/images/avatar-diana-cartwright.jpg"
              quote="She didn't just teach me how to lift—she helped me build confidence, discipline, and a routine I actually enjoy."
            />
          </div>
        </div>
      </section>

      <CTABand
        title="Ready to train in person in Dallas?"
        description="Apply for 1:1 in-person coaching and let's build a plan around your body, your hormones, and your life."
      />
    </>
  );
}
