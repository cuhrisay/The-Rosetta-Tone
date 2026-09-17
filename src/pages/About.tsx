import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { CTABand } from "@/components/site/CTABand";
import { useSeo } from "@/hooks/use-seo";

export default function About() {
  useSeo({
    title: "About Rosetta Riley — NASM Certified Personal Trainer",
    description:
      "From her first pole dance class to NASM certification: Rosetta Riley's unconventional path to coaching hormone-friendly fitness for women of color.",
  });

  return (
    <>
      <PageHero eyebrow="Who Is The Rosetta Tone?" title="A Pole Dancer Turned Coach">
        NASM-certified personal trainer and nutrition coach helping high-achieving women of color
        build strong, nourished bodies through hormone-friendly fitness and sustainable nutrition
        support.
      </PageHero>

      <section className="py-16 md:py-24">
        <div className="container grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <img
            src="/assets/images/photo-rosetta-faqs.webp"
            alt="Rosetta Riley"
            className="aspect-[4/5] w-full rounded-3xl object-cover shadow-md md:sticky md:top-28 md:self-start"
            loading="lazy"
            width={700}
            height={875}
          />
          <div className="prose prose-neutral max-w-none prose-headings:font-serif prose-headings:font-medium">
            <h2>My Story</h2>
            <p>
              I used to hate the gym. I know, I know. My story is probably the most unconventional
              one you'll hear.
            </p>
            <p>
              Almost a decade ago, as a form of rebellion against stepping foot in a traditional
              gym, I took my first pole dance class, and I was hooked. Over the years I got
              stronger and stronger, and once I could pull my own body weight up the pole — it was
              a wrap. I wanted in on lyra, silks, and any aerial sport I could climb my way into.
            </p>
            <p>
              Eventually, a friend invited me to work out at the gym with her. Because pole had
              already introduced me to what strength felt like, I was more open than I would've
              been before. I had no clue what I was doing, just following random social media
              workouts, but I noticed something: the stronger I got in the gym, the stronger I
              became in pole. So the gym became a staple.
            </p>
            <p>
              Then I posted a TikTok titled "POV: Dancers at the Gym" of me doing pull-ups with leg
              waves. Obligatory but true: I had no idea it would blow up. But it did. Suddenly
              people were asking for gym workouts specifically for pole dancers. So I started
              sharing what I was doing. No formal certification at the time, just lived experience.
            </p>
            <p>
              And then a light bulb went off. What if I became a certified personal trainer — not
              just for pole dancers, but for women in general? So I followed that nudge. I studied.
              I earned my NASM certification and stepped into the industry professionally.
            </p>
            <p>
              I trained at the upscale Iconix gym in Inglewood, CA, where I conducted mobility
              assessments, refined my coaching eye, and fell in love with helping people build real
              strength. I later relocated to Dallas, TX and launched my own personal training
              business specializing in women's fitness and nutrition through a hormone-focused
              lens, because I noticed a major gap in the industry, especially for women of color.
            </p>
            <p className="font-serif text-xl not-italic text-foreground">
              Women are not small men. Our training should reflect that.
            </p>
            <p>
              Alongside my online coaching, I also worked as a stretch trainer at Eōs, deepening my
              understanding of mobility, myofascial release, and recovery. Strength without
              mobility is incomplete, and I coach both.
            </p>
            <p>
              My clients have experienced everything from sustainable weight loss and improved
              muscle definition to better cycle awareness and more regulated periods. But more than
              that, they leave empowered. My goal isn't to make you dependent on me — it's to teach
              you how to understand your body so you can move through life confidently.
            </p>
            <p>
              If you feel like you've tried everything and nothing is working, you probably just
              haven't had a plan designed for your body.
            </p>
            <p>
              I'm currently accepting personal training and pole dance clients online and in
              person in the DFW area. Complete the application, and let's build the body and
              confidence you desire and deserve.
            </p>
            <Button asChild className="not-prose mt-4">
              <Link to="/11-coaching">Work With Me</Link>
            </Button>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
