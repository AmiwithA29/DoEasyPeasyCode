import { Check, Lock, Zap } from 'lucide-react';

const FREE_FEATURES = [
  '2D Walkthrough mode',
  'Unlimited snippets',
  'Text-to-speech narration',
  'Sound cues with mute toggle',
  'Multi-language support',
];

const PAID_FEATURES = [
  'Everything in Free',
  '3D Structure View',
  'Rotating, orbit-controllable graph',
  'Node connections show flow order',
  'Per-snippet, one-time unlock',
];

export default function Pricing() {
  return (
    <section id="pricing" className="border-b border-bg-border py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-3 text-base text-text-muted">
            Start free forever. Upgrade per snippet when you want the 3D view.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {/* Free Plan */}
          <div className="rounded-xl border border-bg-border bg-bg-surface p-8 transition-colors hover:border-bg-border-light">
            <div className="mb-1 flex items-center gap-2">
              <span className="font-heading text-lg font-semibold text-text-primary">
                Free
              </span>
              <span className="rounded-full bg-accent-mint-soft px-2.5 py-0.5 text-xs font-medium text-accent-mint">
                Unlimited
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="font-heading text-4xl font-bold text-text-primary">
                ₹0
              </span>
              <span className="text-sm text-text-muted">forever</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              The 2D Walkthrough mode, free for every student and developer.
            </p>
            <ul className="mt-6 space-y-3">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-mint" />
                  <span className="text-sm text-text-primary">{f}</span>
                </li>
              ))}
            </ul>
            <a
              href="#demo"
              className="mt-8 block rounded-lg border border-bg-border bg-bg-elevated py-3 text-center text-sm font-semibold text-text-primary transition-all hover:border-accent-mint/30 hover:bg-bg-hover"
            >
              Start explaining
            </a>
          </div>

          {/* Paid Plan */}
          <div className="relative rounded-xl border-2 border-accent-amber/40 bg-bg-surface p-8 glow-amber">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent-amber px-4 py-1 text-xs font-semibold text-bg">
              Per snippet
            </div>
            <div className="mb-1 flex items-center gap-2">
              <span className="font-heading text-lg font-semibold text-text-primary">
                3D Structure View
              </span>
              <Lock className="h-4 w-4 text-accent-amber" />
            </div>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="font-heading text-4xl font-bold text-accent-amber">
                ₹199
              </span>
              <span className="text-sm text-text-muted">/ snippet</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              Unlock the immersive 3D graph view for a single snippet, one-time.
            </p>
            <ul className="mt-6 space-y-3">
              {PAID_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-amber" />
                  <span className="text-sm text-text-primary">{f}</span>
                </li>
              ))}
            </ul>
            <a
              href="#demo"
              className="mt-8 flex items-center justify-center gap-2 rounded-lg bg-accent-amber py-3 text-center text-sm font-semibold text-bg transition-all hover:bg-accent-amber-hover hover:shadow-lg hover:shadow-accent-amber/20"
            >
              <Zap className="h-4 w-4" />
              Try in demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
