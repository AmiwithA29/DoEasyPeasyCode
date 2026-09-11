import { Code2, Github, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 border-t border-bg-border pt-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-amber-soft ring-1 ring-accent-amber/30">
                <Code2 className="h-4 w-4 text-accent-amber" />
              </div>
              <span className="font-heading text-sm font-semibold text-text-primary">
                DoEasy<span className="text-accent-amber">Peasy</span>Code
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-text-muted">
              A code-explanation tool built for students and junior developers.
              Understand any snippet, step by step.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="font-heading text-xs font-semibold uppercase tracking-wider text-text-dim">
              Product
            </h4>
            <a href="#demo" className="text-sm text-text-muted transition-colors hover:text-text-primary">Demo</a>
            <a href="#shorts" className="text-sm text-text-muted transition-colors hover:text-text-primary">Shorts</a>
            <a href="#features" className="text-sm text-text-muted transition-colors hover:text-text-primary">Features</a>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="font-heading text-xs font-semibold uppercase tracking-wider text-text-dim">
              Resources
            </h4>
            <a href="#" className="text-sm text-text-muted transition-colors hover:text-text-primary">Documentation</a>
            <a href="#" className="text-sm text-text-muted transition-colors hover:text-text-primary">GitHub</a>
            <a href="#" className="text-sm text-text-muted transition-colors hover:text-text-primary">Support</a>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-bg-border pt-6 sm:flex-row">
          <p className="flex items-center gap-1.5 text-sm text-text-dim">
            Built with
            <Heart className="h-3.5 w-3.5 text-accent-amber" />
            for learners.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-text-dim transition-colors hover:text-text-primary">
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-4 border-t border-bg-border pt-4">
          <p className="text-center text-xs text-text-dim">
            &copy; {new Date().getFullYear()} DoEasyPeasyCode. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
