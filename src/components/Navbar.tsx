import { Code2, LogIn, Menu, UserPlus, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Demo', href: '#demo' },
    { label: 'Shorts', href: '#shorts' },
    { label: 'Features', href: '#features' },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? 'border-bg-border bg-bg/85 backdrop-blur-lg'
          : 'border-transparent bg-bg/40 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-amber-soft ring-1 ring-accent-amber/30 transition-transform hover:scale-105">
            <Code2 className="h-5 w-5 text-accent-amber" />
          </div>
          <span className="font-heading text-base font-semibold tracking-tight text-text-primary sm:text-lg">
            DoEasy<span className="text-accent-amber">Peasy</span>Code
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-text-muted transition-colors hover:text-text-primary"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-bg-border bg-bg-surface px-4 py-2 text-sm font-medium text-text-primary transition-all hover:border-accent-mint/30 hover:bg-bg-elevated">
            <LogIn className="h-4 w-4" />
            Sign in
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-accent-amber px-4 py-2 text-sm font-semibold text-bg transition-all hover:bg-accent-amber-hover hover:shadow-lg hover:shadow-accent-amber/20">
            <UserPlus className="h-4 w-4" />
            Sign up
          </button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-bg-border bg-bg-surface text-text-muted transition-colors hover:text-text-primary md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-bg-border bg-bg-surface/95 backdrop-blur-lg transition-all duration-300 md:hidden ${
          open ? 'max-h-80' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col gap-1 px-4 py-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-text-muted transition-colors hover:bg-bg-elevated hover:text-text-primary"
            >
              {l.label}
            </a>
          ))}
          <div className="mt-2 flex gap-2">
            <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-bg-border bg-bg-elevated px-4 py-2.5 text-sm font-medium text-text-primary">
              <LogIn className="h-4 w-4" />
              Sign in
            </button>
            <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-accent-amber px-4 py-2.5 text-sm font-semibold text-bg">
              <UserPlus className="h-4 w-4" />
              Sign up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
