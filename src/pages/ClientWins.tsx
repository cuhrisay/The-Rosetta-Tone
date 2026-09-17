import { PageHero } from "@/components/site/PageHero";
import { CTABand } from "@/components/site/CTABand";
import { TestimonialCard } from "@/components/site/TestimonialCard";
import { useSeo } from "@/hooks/use-seo";

const TESTIMONIALS = [
  {
    name: "Carley Washington",
    quote:
      "I love the plan. I feel like I have something to follow that works for me. It's not extremely hard or too easy, which has been nice — it's a good challenge that makes me want to keep working out on my own.",
  },
  {
    name: "Ashley Nelson",
    quote:
      "As someone who suffers from PMDD I never in a million years thought I'd enjoy working out during my luteal or menstrual phase, but this workout program has changed that! Years of working out and trying different diets always gave me temporary benefits, and little did I know it was damaging my hormones. I was intimidated at first — the calories I should be eating were way more than I expected, and the workouts were different. But the constant communication and the fitness app allowed me to actually gain trust and knowledge about the 'why' behind my plan. I have muscles in my arms! I have so much more strength and energy than I ever did at other gyms, and my hormones are finally feeling balanced naturally.",
  },
  {
    name: "Chrisie Allen",
    quote:
      "Rosetta is a fantastic coach. I loved my time working with her. She is so knowledgeable about hormone health as it pertains to fitness, which is something I really needed to be introduced to as I have endometriosis. If you decide to work with her, you will see lots of positive changes in your life!",
  },
  {
    name: "Diana Cartwright",
    quote:
      "Starting my weightlifting journey felt intimidating at first, but this program made it feel empowering from day one. The patience, encouragement, and knowledge completely changed my mindset about the gym. She didn't just teach me how to lift — she helped me build confidence, discipline, and a routine I actually enjoy. I was supported when I doubted myself, and celebrated on every win, big or small.",
  },
];

export default function ClientWins() {
  useSeo({
    title: "Client Wins & Success Stories",
    description:
      "Real results from real clients who worked with Rosetta Riley on strength, hormone health, and confidence.",
  });

  return (
    <>
      <PageHero eyebrow="Client Wins" title="Real Women, Real Results">
        Every client's story looks different — because every body is different. Here's what
        happens when the plan is finally built for you.
      </PageHero>

      <section className="py-16 md:py-24">
        <div className="container grid gap-8 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
      </section>

      <CTABand
        title="Ready to become the next win?"
        description="Apply for 1:1 coaching and let's find out if we're a good fit."
      />
    </>
  );
}
