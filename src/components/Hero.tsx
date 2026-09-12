import { ArrowRight, Sparkles, Terminal } from 'lucide-react';
import CodingBackground from './CodingBackground';
import BorderTrailButton from './BorderTrailButton';

const SAMPLE_CODE = `function fibonacci(n) {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    let temp = a + b;
    a = b;
    b = temp;
  }
  return b;
}`;

const KEYWORDS = /\b(function|return|if|else|for|while|let|const|var)\b/g;
const NUMBERS = /\b(\d+)\b/g;

function highlightLine(line: string) {
  const parts: { text: string; cls: string }[] = [];
  let remaining = line;

  while (remaining.length > 0) {
    const kwMatch = remaining.match(KEYWORDS);
    const numMatch = remaining.match(NUMBERS);
    const matches = [kwMatch, numMatch].filter(Boolean);
    if (matches.length === 0) {
      parts.push({ text: remaining, cls: 'text-text-primary' });
      break;
    }
    let earliest: { index: number; text: string; cls: string } | null = null;
    if (kwMatch && kwMatch.index !== undefined) {
      earliest = { index: kwMatch.index, text: kwMatch[0], cls: 'text-accent-amber' };
    }
    if (numMatch && numMatch.index !== undefined) {
      if (!earliest || numMatch.index < earliest.index) {
        earliest = { index: numMatch.index, text: numMatch[0], cls: 'text-accent-mint' };
      }
    }
    if (!earliest) break;
    if (earliest.index > 0) {
      parts.push({ text: remaining.substring(0, earliest.index), cls: 'text-text-primary' });
    }
    parts.push({ text: earliest.text, cls: earliest.cls });
    remaining = remaining.substring(earliest.index + earliest.text.length);
  }
  return parts;
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-bg-border">
      {/* Animated coding background */}
      <CodingBackground />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/4 top-0 h-96 w-96 rounded-full bg-accent-amber/5 blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 top-20 h-80 w-80 rounded-full bg-accent-mint/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="animate-fade-slide-up">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent-mint/20 bg-accent-mint-soft px-3 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-accent-mint" />
              <span className="text-xs font-medium text-accent-mint">
                AI-powered code explanations
              </span>
            </div>
            <h1 className="font-heading text-4xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
              Understand any code,
              <br />
              <span className="text-gradient-amber">step by step.</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-text-muted">
              Paste a code snippet and get a clear, numbered walkthrough of what
              every line does. Built for students and junior developers who want
              to learn, not just copy-paste.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <BorderTrailButton variant="amber" size="lg" trailOnHover trailOnClick>
                <a href="#demo" className="inline-flex items-center gap-2">
                  Try the demo
                  <ArrowRight className="h-4 w-4" />
                </a>
              </BorderTrailButton>
              <BorderTrailButton variant="outline" size="lg" trailOnHover trailOnClick>
                <a href="#shorts" className="inline-flex items-center gap-2">
                  Watch shorts
                </a>
              </BorderTrailButton>
            </div>
            <div className="mt-8 flex items-center gap-6 text-xs text-text-dim">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-mint" />
                No sign-up required
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-amber" />
                4 languages supported
              </span>
            </div>
          </div>

          <div className="animate-fade-slide-up" style={{ animationDelay: '0.15s' }}>
            <CodeEditorCard code={SAMPLE_CODE} />
          </div>
        </div>
      </div>
    </section>
  );
}

function CodeEditorCard({ code }: { code: string }) {
  const lines = code.split('\n');
  return (
    <div className="overflow-hidden rounded-xl border border-bg-border bg-bg-surface shadow-2xl">
      <div className="flex items-center gap-2 border-b border-bg-border px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-red-500/60" />
        <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
        <span className="h-3 w-3 rounded-full bg-green-500/60" />
        <div className="ml-2 flex items-center gap-1.5 text-text-dim">
          <Terminal className="h-3.5 w-3.5" />
          <span className="font-mono text-xs">fibonacci.js</span>
        </div>
      </div>
      <div className="overflow-x-auto p-4">
        <pre className="font-mono text-sm leading-[1.7]">
          {lines.map((line, i) => {
            const parts = highlightLine(line);
            return (
              <div key={i} className="flex">
                <span className="mr-4 inline-block w-6 select-none text-right text-text-dim/50">
                  {i + 1}
                </span>
                <code>
                  {line.trim().length === 0 ? (
                    <span>&nbsp;</span>
                  ) : (
                    parts.map((p, j) => (
                      <span key={j} className={p.cls}>
                        {p.text}
                      </span>
                    ))
                  )}
                </code>
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
}
