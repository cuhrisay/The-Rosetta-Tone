import { Link } from "react-router-dom";
import { Instagram, Facebook, Music2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-secondary text-secondary-foreground">
      <div className="container grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="font-serif text-2xl font-semibold">
            The Rosetta Tone<span className="text-gold">.</span>
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
              className="text-secondary-foreground/70 transition-colors hover:text-gold"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100078999345010"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="text-secondary-foreground/70 transition-colors hover:text-gold"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://www.tiktok.com/@rosettastone"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="text-secondary-foreground/70 transition-colors hover:text-gold"
            >
              <Music2 size={20} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-serif text-lg">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm text-secondary-foreground/70">
            <li><Link to="/services" className="hover:text-gold">Services</Link></li>
            <li><Link to="/11-coaching" className="hover:text-gold">Work With Me</Link></li>
            <li><Link to="/client-testimonials" className="hover:text-gold">Client Wins</Link></li>
            <li><Link to="/about" className="hover:text-gold">About</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-lg">Resources</h3>
          <ul className="mt-4 space-y-2 text-sm text-secondary-foreground/70">
            <li><Link to="/hormone-answers-blog" className="hover:text-gold">Hormone Answers Blog</Link></li>
            <li><Link to="/free-guide" className="hover:text-gold">Free Cycle-Syncing Guide</Link></li>
            <li><Link to="/faqs" className="hover:text-gold">FAQs</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-secondary-foreground/10 py-6">
        <p className="container text-center text-xs text-secondary-foreground/50">
          © {new Date().getFullYear()} The Rosetta Tone. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
