import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { POLE_PROGRAM_URL } from "@/lib/links";

const NAV_LINKS = [
  { label: "Services", to: "/services" },
  { label: "Work With Me", to: "/11-coaching" },
  { label: "Client Wins", to: "/client-testimonials" },
  { label: "Hormone Answers Blog", to: "/hormone-answers-blog" },
  { label: "About", to: "/about" },
  { label: "FAQs", to: "/faqs" },
];

function NavItem({ to, label, onClick }: { to: string; label: string; onClick?: () => void }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "text-sm font-medium tracking-wide transition-colors hover:text-accent",
          isActive ? "text-accent" : "text-foreground/80",
        )
      }
    >
      {label}
    </NavLink>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" className="font-display text-2xl font-semibold tracking-tight text-foreground">
          The Rosetta Tone<span className="text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavItem key={link.to} {...link} />
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={POLE_PROGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium tracking-wide text-foreground/60 transition-colors hover:text-accent"
          >
            Pole Strength Program
          </a>
          <a
            href="http://instagram.com/therosettatone"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="text-foreground/70 transition-colors hover:text-accent"
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100078999345010"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="text-foreground/70 transition-colors hover:text-accent"
          >
            <Facebook size={20} />
          </a>
          <Button asChild>
            <Link to="/11-coaching">Apply to Work With Me</Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[85vw] max-w-sm bg-background">
            <nav className="mt-12 flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <NavItem key={link.to} {...link} onClick={() => setOpen(false)} />
              ))}
              <Link
                to="/free-guide"
                onClick={() => setOpen(false)}
                className="text-sm font-medium tracking-wide text-foreground/80 hover:text-accent"
              >
                Free Guide
              </Link>
              <a
                href={POLE_PROGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium tracking-wide text-foreground/80 hover:text-accent"
              >
                Pole Strength Program
              </a>
              <Button asChild onClick={() => setOpen(false)}>
                <Link to="/11-coaching">Apply to Work With Me</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
