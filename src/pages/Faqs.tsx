import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PageHero } from "@/components/site/PageHero";
import { useSeo } from "@/hooks/use-seo";

const FAQS = [
  {
    q: "What exactly is cycle syncing, and why does it matter?",
    a: "Cycle syncing is the practice of supporting your body based on the different phases of your menstrual cycle. Instead of forcing yourself to train the same way every day, we learn how to work with your hormones — adjusting training intensity, recovery, nutrition, and movement based on what your body needs. For many women, especially those dealing with high stress, burnout, PCOS symptoms, painful cycles, or hormonal imbalances, this approach can help fitness feel more sustainable, supportive, and effective.",
  },
  {
    q: "Is this only for women who already work out?",
    a: "Not at all. Many of my clients have worked out before but feel stuck, inconsistent, exhausted, or frustrated that they're \"doing everything right\" without seeing the results they want. Whether you're rebuilding your routine or already active, the goal is to help you train smarter — not harder — in a way that supports your body, hormones, lifestyle, and long-term goals.",
  },
  {
    q: "I'm constantly busy and stressed. Can I still do this program?",
    a: "Absolutely. This coaching is specifically designed for high-achieving women balancing careers, family, responsibilities, and real life. Your workouts are structured to be effective without requiring hours in the gym, and your nutrition guidance is built around sustainability, not perfection. The goal is to create a lifestyle that supports your wellness without adding more stress to your plate.",
  },
  {
    q: "Will I have to give up my curves to lose fat?",
    a: "No. One of the biggest concerns many women have is losing their shape while trying to lose weight. My approach focuses on building strength, supporting your hormones, and using nutrition strategically so you can lose fat while maintaining the curves and femininity that are important to you. This is not about shrinking yourself. It's about feeling strong, confident, energized, and at home in your body again.",
  },
  {
    q: "Do you provide meal plans?",
    a: "You'll get meal options tailored to your daily calorie and nutrition goals, along with corresponding grocery lists to make planning and shopping easier. I also provide options for dietary preferences and restrictions, including dairy-free, meat-free, gluten-free, and more. But I don't just hand you a meal plan and send you on your way — a big part of our work together is education and habit-building. The goal is for you to leave knowing how to feed yourself confidently, not feeling like you need to follow a plan forever.",
  },
  {
    q: "I've struggled with consistency before. What makes this different?",
    a: "Most women of color don't need more punishment, guilt, or extreme routines. They need support, structure, education, community, and a strategy that actually fits the season of life they're in. My coaching combines fitness, hormone-supportive habits, accountability, mindset support, and a community of women on a similar journey, so you don't have to feel like you're navigating this alone. You won't be expected to be perfect here, just committed to showing up for yourself consistently.",
  },
  {
    q: "How do I get started?",
    a: "Fill out the coaching application and tell me a little about your goals, lifestyle, and what you've been struggling with. From there, I'll personally review your application and reach out to schedule a free consultation to see if the program is the right fit for you.",
  },
];

export default function Faqs() {
  useSeo({
    title: "FAQs",
    description: "Answers to common questions about cycle-syncing coaching, nutrition, and what it's like to work with Rosetta Riley.",
  });

  return (
    <>
      <PageHero eyebrow="Frequently Asked Questions" title="Questions? I've Got Answers." />

      <section className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <img
            src="/assets/images/photo-rosetta-faqs.webp"
            alt="Rosetta Riley"
            className="mb-12 aspect-[4/3] w-full rounded-3xl object-cover shadow-md"
            loading="lazy"
            width={1200}
            height={675}
          />
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem key={faq.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-display text-lg">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground">Still have questions?</p>
            <Button asChild className="mt-4">
              <Link to="/11-coaching">Apply to Work With Me</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
