import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { CTABand } from "@/components/site/CTABand";
import { useSeo } from "@/hooks/use-seo";

export default function PoleDanceEuless() {
  useSeo({
    title: "In-Person Pole Dance Classes Near Euless, Hurst & Bedford, TX",
    description:
      "Private, in-person pole dance lessons at a home studio in Euless, TX — serving Hurst, Bedford, and the greater Dallas–Fort Worth area. Build strength, confidence, and connect with your body.",
  });

  return (
    <>
      <PageHero eyebrow="In-Person Pole · Hurst · Euless · Bedford" title="Pole Dance Lessons Near Euless, TX">
        Private, in-person pole sessions at a home studio in Euless — serving Hurst, Bedford, and
        the greater Dallas–Fort Worth area.
      </PageHero>

      <section className="py-16 md:py-24">
        <div className="container grid gap-12 md:grid-cols-2 md:items-center">
          <img
            src="/assets/images/photo-pole-lesson-client.webp"
            alt="Rosetta Riley teaching an in-person pole dance lesson"
            className="order-2 aspect-[2/3] w-full rounded-3xl object-cover shadow-md md:order-1"
            loading="lazy"
          />
          <div className="order-1 md:order-2">
            <h2 className="text-balance font-display text-2xl font-medium md:text-3xl">
              A Safe, Supportive Space to Reconnect With Your Body
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                If you've been searching for pole dance classes near Hurst, Euless, or Bedford, my
                sessions are held at a private home studio in Euless — no big-box studio energy,
                no judgment, just a space built for you to move.
              </p>
              <p>
                It doesn't matter if you've never touched a pole or you're a dancer looking to
                refine your movement. Sessions are private and tailored to your level, whether
                you're building strength and conditioning specifically for pole, working on flow
                and musicality, or just want to feel stronger and more confident in your body.
              </p>
              <p>
                Based in Euless, I regularly work with women from Hurst, Bedford, and across the
                greater Dallas–Fort Worth area. Not local, or prefer to start at home? These
                lessons are also available{" "}
                <Link to="/services" className="text-accent hover:underline">
                  online
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container max-w-3xl">
          <h2 className="text-center font-display text-2xl font-medium md:text-3xl">
            What In-Person Pole Sessions Include
          </h2>
          <ul className="mx-auto mt-8 max-w-xl space-y-3">
            {[
              "Strength and conditioning specifically for pole",
              "Flow, transitions, and musicality",
              "Confidence and body awareness",
              "Mobility and flexibility work",
              "Private, one-on-one instruction at a home studio in Euless",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <Check size={18} className="mt-0.5 shrink-0 text-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-border bg-card p-6 text-center">
            <p className="text-sm font-medium uppercase tracking-wide-lg text-accent">
              ✧ Energy Exchange Available ✧
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Open to select energy exchanges for pole sessions — massage, beauty services,
              photography, and more, considered case-by-case. Mention it in your application.
            </p>
          </div>

          <div className="mt-10 text-center">
            <Button asChild size="lg">
              <Link to="/11-coaching">Apply for Pole Lessons</Link>
            </Button>
          </div>
        </div>
      </section>

      <CTABand
        title="Ready to get on the pole?"
        description="Apply and let me know whether you'd like in-person sessions in Euless or online lessons from wherever you are."
        buttonLabel="Apply Now"
      />
    </>
  );
}
