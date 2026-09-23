import { createElement, Fragment } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

export function AnimatedHeading({
  text,
  as = "h2",
  className,
}: {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const ref = useReveal<HTMLHeadingElement>();
  const words = text.split(" ");

  return createElement(
    as,
    { ref, className: cn("word-reveal", className) },
    words.map((word, i) => (
      <Fragment key={i}>
        <span className="word-reveal-item" style={{ transitionDelay: `${i * 70}ms` }}>
          {word}
        </span>
        {i < words.length - 1 ? " " : ""}
      </Fragment>
    )),
  );
}
