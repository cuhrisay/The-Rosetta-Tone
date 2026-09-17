import { useEffect } from "react";

interface SeoOptions {
  title: string;
  description: string;
  image?: string;
}

const SITE_NAME = "The Rosetta Tone";
const DEFAULT_IMAGE = "/assets/images/photo-rosetta-hero-main.webp";

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function useSeo({ title, description, image = DEFAULT_IMAGE }: SeoOptions) {
  useEffect(() => {
    const fullTitle = `${title} — ${SITE_NAME}`;
    document.title = fullTitle;
    setMeta("description", description);
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("og:image", image, "property");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:image", image);
    window.scrollTo(0, 0);
  }, [title, description, image]);
}
