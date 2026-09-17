import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { CTABand } from "@/components/site/CTABand";
import { useSeo } from "@/hooks/use-seo";

interface Service {
  title: string;
  tagline: string;
  description: string;
  includes: string[];
  bestFor: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
}

const SERVICES: Service[] = [
  {
    title: "Hybrid, In-Person Training + Nutrition Coaching",
    tagline: "My most personalized, high-touch experience",
    description:
      "This option combines the best of both worlds: in-person coaching with online structure and accountability. We'll work together hands-on while also building habits that support you outside of our sessions.",
    includes: [
      "Customized workout and nutrition programming",
      "In-person training sessions",
      "Form correction + mobility + hands-on guidance",
      "Ongoing check-ins and accountability",
      "Lifestyle + habit support",
    ],
    bestFor: "Women located in the DFW area who are ready to fully commit and want faster, more supported results.",
    image: "/assets/images/photo-gym-training-deadhang.webp",
    imageAlt: "Rosetta training a client at the gym",
  },
  {
    title: "Online Personal Training + Nutrition Coaching",
    tagline: "Flexible, supportive, and built around your lifestyle",
    description:
      "This is for you if you want structure, guidance, and results without needing to meet in person. You'll receive a fully customized training plan along with nutrition guidance tailored to your goals, lifestyle, and preferences.",
    includes: [
      "Personalized workout program",
      "Nutrition guidance aligned with your goals",
      "Daily and/or weekly check-ins",
      "Progress tracking + adjustments",
      "Direct support and communication",
    ],
    bestFor: "Women with busy schedules who still want expert guidance and accountability.",
    image: "/assets/images/photo-rosetta-laptop-consult.webp",
    imageAlt: "Rosetta coaching a client online",
    reverse: true,
  },
  {
    title: "Nutrition Coaching Only",
    tagline: "Because you can't out-train a trash diet",
    description:
      "Designed for clients who already have a workout routine and want expert guidance on nutrition to support body recomposition, toning, and overall health. In addition to personalized nutrition coaching, you'll receive meal plan recipes with corresponding grocery lists and my nutrition guide.",
    includes: [
      "Calorie and macro guidance tailored to your goals",
      "Nutrition strategy to support your current workouts",
      "Habit and lifestyle coaching",
      "Progress check-ins and adjustments",
      "Accountability and support",
    ],
    bestFor: "Women who already train and want their nutrition dialed in to match.",
    image: "/assets/images/photo-rosetta-bio-teaser.webp",
    imageAlt: "Rosetta Riley",
  },
  {
    title: "In-Person Pole Dance Lessons",
    tagline: "Reconnect with your body, build confidence, explore your sensuality",
    description:
      "Pole is more than a workout — it's a way to reconnect with your body, build confidence, and explore your sensuality in a safe, supportive space. It doesn't matter if you've never touched a pole or you're looking to refine your movement, these sessions meet you where you are.",
    includes: [
      "Strength and conditioning specifically for pole",
      "Flow, transitions, and musicality",
      "Confidence and body awareness",
      "Mobility and flexibility",
    ],
    bestFor: "Women located in the DFW area who want to feel stronger, more confident, and more connected to themselves.",
    image: "/assets/images/photo-pole-lesson-client.webp",
    imageAlt: "Rosetta teaching a pole dance lesson",
    reverse: true,
  },
];

export default function Services() {
  useSeo({
    title: "Services — Personal Training, Nutrition Coaching & Pole Dance Lessons",
    description:
      "Hybrid in-person training, online coaching, nutrition-only programs, and pole dance lessons with Rosetta Riley, NASM-certified trainer for women of color.",
  });

  return (
    <>
      <PageHero eyebrow="Work With Me" title="Find the Program That Fits Your Life">
        Every woman's body, schedule, and goals are different. Here's how we can work together.
      </PageHero>

      <div className="py-16 md:py-24">
        <div className="container space-y-20 md:space-y-28">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${
                service.reverse ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <img
                src={service.image}
                alt={service.imageAlt}
                className="aspect-[4/3] w-full rounded-3xl object-cover shadow-md"
                loading="lazy"
                width={800}
                height={600}
              />
              <div>
                <p className="text-sm font-medium uppercase tracking-wide-lg text-accent">
                  {service.tagline}
                </p>
                <h2 className="mt-3 text-balance font-display text-2xl font-medium md:text-3xl">
                  {service.title}
                </h2>
                <p className="mt-4 text-muted-foreground">{service.description}</p>
                <ul className="mt-6 space-y-2">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <Check size={18} className="mt-0.5 shrink-0 text-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm italic text-muted-foreground">
                  Best for: {service.bestFor}
                </p>
                <Button asChild className="mt-6">
                  <Link to="/11-coaching">Apply to Work With Me 1:1</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="bg-muted/50 py-16">
        <div className="container max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wide-lg text-accent">
            ✧ Energy Exchange Available ✧
          </p>
          <h2 className="mt-3 font-display text-2xl font-medium md:text-3xl">
            Open to Select Energy Exchanges for Pole Sessions
          </h2>
          <p className="mt-4 text-muted-foreground">
            This can look like trading sessions for services that support wellness, creativity, or
            everyday life — massage therapy or bodywork, beauty services, photography or content
            creation, dog sitting or grooming, or unique experiences like concerts or events. All
            exchanges are considered case-by-case to ensure alignment and mutual value. If you're
            interested, include the details in your application.
          </p>
        </div>
      </section>

      <CTABand />
    </>
  );
}
