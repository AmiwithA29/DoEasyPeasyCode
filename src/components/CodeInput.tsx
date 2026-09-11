import { ChevronDown, Loader2, Play, RotateCcw, FileText } from 'lucide-react';
import { useState } from 'react';
import { LANGUAGES, type Language } from '@/lib/explainCode';

const SAMPLES: Record<Language, string> = {
  javascript: `function fibonacci(n) {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    let temp = a + b;
    a = b;
    b = temp;
  }
  return b;
}`,
  python: `def fibonacci(n):
    if n <= 1:
        return n
    a, b = 0, 1
    for i in range(2, n + 1):
        a, b = b, a + b
    return b`,
  java: `public static int fibonacci(int n) {
    if (n <= 1) return n;
    int a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        int temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}`,
  cpp: `int fibonacci(int n) {
    if (n <= 1) return n;
    int a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        int temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}`,
};

interface CodeInputProps {
  onExplain: (code: string, language: Language) => void;
  loading: boolean;
  onReset: () => void;
  hasResults: boolean;
}

export default function CodeInput({
  onExplain,
  loading,
  onReset,
  hasResults,
}: CodeInputProps) {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState<Language>('javascript');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selectedLabel =
    LANGUAGES.find((l) => l.value === language)?.label ?? 'JavaScript';
  const charCount = code.length;

  const handleSubmit = () => {
    if (code.trim().length === 0) return;
    onExplain(code, language);
  };

  const loadSample = () => {
    setCode(SAMPLES[language]);
  };

  return (
    <div className="rounded-xl border border-bg-border bg-bg-surface p-4 sm:p-6">
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="font-heading text-sm font-medium text-text-muted">
          Paste your code snippet
        </label>
        <div className="flex items-center gap-2">
          <button
            onClick={loadSample}
            className="inline-flex items-center gap-1.5 rounded-lg border border-bg-border bg-bg-elevated px-3 py-2 text-xs font-medium text-text-muted transition-colors hover:border-accent-mint/30 hover:text-accent-mint"
          >
            <FileText className="h-3.5 w-3.5" />
            Load sample
          </button>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 rounded-lg border border-bg-border bg-bg-elevated px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:border-accent-amber/30"
            >
              {selectedLabel}
              <ChevronDown
                className={`h-4 w-4 text-text-muted transition-transform ${
                  dropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {dropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setDropdownOpen(false)}
                />
                <div className="absolute right-0 z-20 mt-1 w-40 overflow-hidden rounded-lg border border-bg-border bg-bg-elevated py-1 shadow-xl">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.value}
                      onClick={() => {
                        setLanguage(l.value);
                        setDropdownOpen(false);
                      }}
                      className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-accent-amber-soft ${
                        l.value === language
                          ? 'text-accent-amber'
                          : 'text-text-primary'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="relative">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="// Paste any JavaScript, Python, Java, or C++ code here..."
          rows={8}
          className="w-full resize-y rounded-lg border border-bg-border bg-bg p-4 font-mono text-sm leading-relaxed text-text-primary placeholder-text-dim/50 transition-colors focus:border-accent-amber/40 focus:ring-1 focus:ring-accent-amber/20"
          spellCheck={false}
        />
        {charCount > 0 && (
          <span className="pointer-events-none absolute bottom-3 right-3 rounded bg-bg-elevated/80 px-2 py-0.5 font-mono text-xs text-text-dim">
            {charCount} chars
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleSubmit}
            disabled={loading || code.trim().length === 0}
            className="inline-flex items-center gap-2 rounded-lg bg-accent-amber px-6 py-2.5 text-sm font-semibold text-bg transition-all hover:bg-accent-amber-hover hover:shadow-lg hover:shadow-accent-amber/20 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:shadow-none"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Explaining...
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Explain this code
              </>
            )}
          </button>
          {hasResults && (
            <button
              onClick={() => {
                setCode('');
                onReset();
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-bg-border bg-bg-elevated px-4 py-2.5 text-sm font-medium text-text-muted transition-colors hover:text-text-primary"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
          )}
        </div>
        {code.trim().length === 0 && (
          <span className="text-xs text-text-dim">
            Press <kbd className="rounded border border-bg-border bg-bg-elevated px-1.5 py-0.5 font-mono text-xs">Load sample</kbd> to try quickly
          </span>
        )}
      </div>
    </div>
  );
}
