import {
  Boxes,
  Code2,
  ListOrdered,
  Mic,
  Sparkles,
  Volume2,
} from 'lucide-react';
import AnimatedHeading from './AnimatedHeading';

const FEATURES = [
  {
    icon: ListOrdered,
    title: '2D Walkthrough',
    description:
      'Get a clean, numbered vertical timeline that breaks down each line of your code into digestible steps.',
    color: 'amber' as const,
  },
  {
    icon: Boxes,
    title: '3D Structure View',
    description:
      'See your code as a rotating 3D graph where each function and step is a connected node showing execution flow.',
    color: 'mint' as const,
  },
  {
    icon: Sparkles,
    title: 'AI-Generated Explanations',
    description:
      'Every snippet is analyzed and explained with a title, description, and the exact line of code it refers to.',
    color: 'amber' as const,
  },
  {
    icon: Mic,
    title: 'Text-to-Speech',
    description:
      'Play and pause narration that reads each step aloud in sequence, powered by the built-in Web Speech API.',
    color: 'mint' as const,
  },
  {
    icon: Volume2,
    title: 'Sound Cues',
    description:
      'Subtle synthesized tones mark each step transition, with a mute toggle for when you want silence.',
    color: 'amber' as const,
  },
  {
    icon: Code2,
    title: 'Multi-Language Input',
    description:
      'Paste JavaScript, Python, Java, or C++ — CodeXplain adapts its analysis to the language you choose.',
    color: 'mint' as const,
  },
];

export default function Features() {
  return (
    <section id="features" className="border-b border-bg-border py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <AnimatedHeading
            as="h2"
            className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl"
            subtitle="Six core features designed to make code comprehension effortless."
          >
            Everything you need to read code
          </AnimatedHeading>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            const isAmber = f.color === 'amber';
            return (
              <div
                key={f.title}
                className="group rounded-xl border border-bg-border bg-bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-bg-border-light hover:bg-bg-elevated"
              >
                <div
                  className={`mb-4 flex h-11 w-11 items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-110 ${
                    isAmber
                      ? 'bg-accent-amber-soft ring-1 ring-accent-amber/20 group-hover:glow-amber'
                      : 'bg-accent-mint-soft ring-1 ring-accent-mint/20 group-hover:glow-mint'
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${
                      isAmber ? 'text-accent-amber' : 'text-accent-mint'
                    }`}
                  />
                </div>
                <h3 className="font-heading text-base font-semibold text-text-primary">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
