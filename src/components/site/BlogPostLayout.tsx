import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { CTABand } from "./CTABand";

export function BlogPostLayout({
  eyebrow,
  title,
  dek,
  image,
  imageAlt,
  children,
}: {
  eyebrow: string;
  title: string;
  dek: string;
  image: string;
  imageAlt: string;
  children: ReactNode;
}) {
  return (
    <>
      <article className="py-16 md:py-20">
        <div className="container max-w-3xl">
          <Link
            to="/hormone-answers-blog"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft size={16} /> Back to Hormone Answers Blog
          </Link>

          <p className="mt-8 text-sm font-medium uppercase tracking-wide-lg text-primary">{eyebrow}</p>
          <h1 className="mt-3 text-balance font-serif text-3xl font-medium md:text-4xl">{title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{dek}</p>

          <img
            src={image}
            alt={imageAlt}
            className="mt-10 aspect-[16/9] w-full rounded-3xl object-cover shadow-md"
            loading="eager"
            width={1200}
            height={675}
          />

          <div className="prose prose-neutral mt-10 max-w-none prose-headings:font-serif prose-headings:font-medium prose-a:text-primary">
            {children}
          </div>

          <p className="mt-12 border-t border-border pt-6 text-xs text-muted-foreground">
            This article is for educational purposes and isn't a substitute for individualized
            medical advice. Individual needs vary. If you have a medical condition or concerns
            about your health, consult an appropriate healthcare professional.
          </p>
        </div>
      </article>
      <CTABand
        title="Ready for a training plan built around you?"
        description="Apply for 1:1 personalized training and let's build a strategy around your goals, your body, and the way you actually live."
      />
    </>
  );
}
