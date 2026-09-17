import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { useSeo } from "@/hooks/use-seo";

const POSTS = [
  {
    slug: "/hormone-answers-blog/cycle-syncing-workouts",
    title: "Cycle Syncing Workouts: How to Train With Your Menstrual Cycle",
    excerpt:
      "Should you change your workouts based on your cycle? Here's what cycle-informed training actually looks like, phase by phase.",
    image: "/assets/images/photo-gym-training-deadhang.webp",
  },
  {
    slug: "/hormone-answers-blog/get-toned-without-losing-curves",
    title: "How to Get Toned Without Losing Your Curves",
    excerpt:
      "Want more definition without becoming smaller everywhere? Here's why body recomposition, not the scale, is the real goal.",
    image: "/assets/images/photo-rosetta-shoot-extra-02.webp",
  },
];

export default function HormoneAnswersBlog() {
  useSeo({
    title: "Hormone Answers Blog",
    description:
      "Hormone-aware fitness and nutrition answers for women of color, from NASM-certified coach Rosetta Riley.",
  });

  return (
    <>
      <PageHero eyebrow="Hormone Answers" title="Fitness &amp; Nutrition, Without the Guesswork">
        Straight answers on training with your cycle, nutrition, and building a body you feel good
        in — no rigid charts required.
      </PageHero>

      <section className="py-16 md:py-24">
        <div className="container grid max-w-4xl gap-10 md:grid-cols-2">
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              to={post.slug}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
            >
              <img
                src={post.image}
                alt=""
                className="aspect-[16/10] w-full object-cover"
                loading="lazy"
                width={800}
                height={500}
              />
              <div className="flex flex-1 flex-col p-6">
                <h2 className="font-display text-xl font-medium">{post.title}</h2>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent">
                  Read More
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
