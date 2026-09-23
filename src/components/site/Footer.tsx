import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";
import { FaTiktok } from "react-icons/fa6";
import { POLE_PROGRAM_URL } from "@/lib/links";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-secondary text-secondary-foreground">
      <div className="container grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="font-display text-2xl font-normal">
            The Rosetta Tone<span className="text-primary">.</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-secondary-foreground/70">
            Cycle-syncing fitness &amp; nutrition coaching for women of color. Build strength,
            support your hormones, and feel good in the body you're in.
          </p>
          <div className="mt-6 flex gap-4">
            <a
              href="http://instagram.com/therosettatone"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="text-secondary-foreground/70 transition-colors hover:text-primary"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100078999345010"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="text-secondary-foreground/70 transition-colors hover:text-primary"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://www.tiktok.com/@therosettatone"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="text-secondary-foreground/70 transition-colors hover:text-primary"
            >
              <FaTiktok size={18} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-display text-lg">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm text-secondary-foreground/70">
            <li><Link to="/services" className="hover:text-primary">Services</Link></li>
            <li><Link to="/11-coaching" className="hover:text-primary">Work With Me</Link></li>
            <li><Link to="/client-testimonials" className="hover:text-primary">Client Wins</Link></li>
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg">Resources</h3>
          <ul className="mt-4 space-y-2 text-sm text-secondary-foreground/70">
            <li><Link to="/hormone-answers-blog" className="hover:text-primary">Hormone Answers Blog</Link></li>
            <li><Link to="/free-guide" className="hover:text-primary">Free Cycle-Syncing Guide</Link></li>
            <li><Link to="/faqs" className="hover:text-primary">FAQs</Link></li>
            <li>
              <a href={POLE_PROGRAM_URL} target="_blank" rel="noreferrer" className="hover:text-primary">
                Pole Strength Program
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-secondary-foreground/10 py-6">
        <div className="container flex flex-col items-center gap-2 text-center text-xs text-secondary-foreground/50">
          <p>© {new Date().getFullYear()} The Rosetta Tone. All rights reserved.</p>
          <p>
            Website designed and managed by{" "}
            <a
              href="https://chrisiemarketing.com"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 hover:text-primary"
            >
              Chrisie Marketing &amp; Design
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
