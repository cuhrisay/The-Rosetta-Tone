import { Link } from "react-router-dom";
import { Dumbbell, Salad, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/site/ServiceCard";
import { TestimonialCard } from "@/components/site/TestimonialCard";
import { CTABand } from "@/components/site/CTABand";
import { useSeo } from "@/hooks/use-seo";

const SERVICES = [
  {
    icon: Users,
    title: "Hybrid In-Person Training",
    description: "In-person coaching with online structure and accountability. My most personalized, high-touch experience.",
  },
  {
    icon: Dumbbell,
    title: "Online Personal Training",
    description: "A fully customized training plan and nutrition guidance, built around your schedule, wherever you are.",
  },
  {
    icon: Salad,
    title: "Nutrition Coaching",
    description: "Already lifting? I'll dial in your nutrition strategy, meal plans, and habits to match.",
  },
  {
    icon: Sparkles,
    title: "Pole Dance Lessons",
    description: "Strength, confidence, and sensual movement in a safe, supportive space — DFW area.",
  },
];

const TESTIMONIALS = [
  {
    name: "Ashley Nelson",
    quote:
      "As someone who suffers from PMDD I never in a million years thought I'd enjoy working out during my luteal or menstrual phase, but this workout program has changed that!",
  },
  {
    name: "Diana Cartwright",
    quote:
      "She didn't just teach me how to lift—she helped me build confidence, discipline, and a routine I actually enjoy. I was supported when I doubted myself, and celebrated on every win.",
  },
  {
    name: "Chrisie Allen",
    quote:
      "She is so knowledgeable about hormone health as it pertains to fitness, which is something I really needed to be introduced to as I have endometriosis.",
  },
];

export default function Home() {
  useSeo({
    title: "Cycle-Syncing Fitness & Nutrition Coaching for Women of Color",
    description:
      "Rosetta Riley, NASM-certified personal trainer & nutrition coach, helps women of color build strength, support their hormones, and feel at home in their bodies.",
  });

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
        <div className="container grid gap-12 py-20 md:grid-cols-2 md:items-center md:py-28">
          <div className="reveal is-visible">
            <p className="mb-4 text-sm font-medium uppercase tracking-wide-lg text-gold">
              NASM Certified Personal Trainer &amp; Nutrition Coach
            </p>
            <h1 className="text-balance font-serif text-4xl font-medium leading-tight md:text-5xl">
              Cycle-Syncing Fitness &amp; Nutrition Coaching for Women of Color
            </h1>
            <p className="mt-6 text-lg text-secondary-foreground/80">
              If you're a woman of color in your 30s, 40s, or beyond — this is for you. Let's build
              a body you feel damn good living in, without obsessing over calories or punishing
              yourself with workouts.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link to="/services">Explore My Training Programs</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-secondary-foreground/30 bg-transparent text-secondary-foreground hover:bg-secondary-foreground/10">
                <Link to="/11-coaching">Apply to Work With Me</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <img
              src="/assets/images/photo-rosetta-hero-main.webp"
              alt="Rosetta Riley, personal trainer and nutrition coach"
              className="aspect-[4/5] w-full rounded-3xl object-cover shadow-xl"
              loading="eager"
              // @ts-expect-error -- lowercase HTML attribute; React 18 doesn't camelCase this one
              fetchpriority="high"
              width={800}
              height={1000}
            />
          </div>
        </div>
      </section>

      {/* Problem framing */}
      <section className="py-20 md:py-28">
        <div className="container grid gap-12 md:grid-cols-2 md:items-center">
          <img
            src="/assets/images/photo-rosetta-hero-secondary.webp"
            alt="Rosetta Riley training"
            className="order-2 aspect-[4/5] w-full rounded-3xl object-cover shadow-md md:order-1"
            loading="lazy"
            width={700}
            height={875}
          />
          <div className="order-1 md:order-2">
            <h2 className="text-balance font-serif text-3xl font-medium md:text-4xl">
              "Why is my body not responding the way it used to?"
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                Maybe your body feels different. Your energy isn't what it used to be. Your weight
                seems harder to manage. Your workouts aren't giving you the same results.
              </p>
              <p>
                Or you're simply realizing that getting older means working with your body, not
                against it. That's why I created The Rosetta Tone — to help women get stronger,
                feel better, eat with intention, and build a body they feel good living in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Top services */}
      <section className="bg-muted/50 py-20 md:py-28">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-medium md:text-4xl">Ways to Work Together</h2>
            <p className="mt-4 text-muted-foreground">
              Whether you want hands-on coaching, fully online support, nutrition-only guidance, or
              to get stronger on the pole — there's a program built for where you are.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="py-20 md:py-28">
        <div className="container grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-wide-lg text-primary">
              Meet Your Coach
            </p>
            <h2 className="text-balance font-serif text-3xl font-medium md:text-4xl">
              A pole dancer turned NASM-certified coach.
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                Almost a decade ago, a pole dance class introduced me to what strength felt like.
                That curiosity turned into a full-blown career: certified personal trainer, nutrition
                coach, and lifelong mover, helping women stop fighting their bodies and start
                understanding them.
              </p>
              <p>
                You don't have to choose between strong and feminine, fit and curvy, healthy and
                sexy. You can build muscle, keep your curves, and move with confidence.
              </p>
            </div>
            <Button asChild className="mt-8">
              <Link to="/about">Read My Story</Link>
            </Button>
          </div>
          <img
            src="/assets/images/photo-rosetta-bio-teaser.webp"
            alt="Rosetta Riley"
            className="aspect-[4/5] w-full rounded-3xl object-cover shadow-md"
            loading="lazy"
            width={700}
            height={875}
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-secondary py-20 text-secondary-foreground md:py-28">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-wide-lg text-gold">
              Client Wins
            </p>
            <h2 className="font-serif text-3xl font-medium md:text-4xl">
              Real women, real results.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline" className="border-secondary-foreground/30 bg-transparent text-secondary-foreground hover:bg-secondary-foreground/10">
              <Link to="/client-testimonials">Read More Client Wins</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 md:py-28">
        <div className="container grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-balance font-serif text-3xl font-medium md:text-4xl">
              Women aren't small men.
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                We've been given fitness and nutrition advice that treats our bodies as if they
                respond like men's: eat less, work out harder, do more cardio, push through, start
                over Monday.
              </p>
              <p>
                But our hormones, metabolism, recovery, stress, sleep, and energy change. That
                doesn't mean you're failing — it means your approach needs to evolve.
              </p>
            </div>
            <Button asChild variant="link" className="mt-4 px-0">
              <Link to="/hormone-answers-blog">Read the Hormone Answers Blog →</Link>
            </Button>
          </div>
          <img
            src="/assets/images/photo-rosetta-shoot-extra-01.webp"
            alt="Rosetta Riley strength training"
            className="aspect-[4/5] w-full rounded-3xl object-cover shadow-md"
            loading="lazy"
            width={700}
            height={875}
          />
        </div>
      </section>

      <CTABand />
    </>
  );
}
