import { Play, Clock, Eye, ThumbsUp } from 'lucide-react';

const SHORTS = [
  {
    title: 'How Recursion Actually Works',
    duration: '1:24',
    views: '12K',
    likes: '842',
    language: 'JavaScript',
    color: 'amber',
    code: `function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}`,
  },
  {
    title: 'Understanding Big-O Notation',
    duration: '2:08',
    views: '8.5K',
    likes: '610',
    language: 'Python',
    color: 'mint',
    code: `def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1`,
  },
  {
    title: 'Pointers Explained Simply',
    duration: '1:45',
    views: '15K',
    likes: '1.2K',
    language: 'C++',
    color: 'amber',
    code: `int* ptr = &value;
*ptr = 42;
cout << *ptr;`,
  },
];

export default function VideoShorts() {
  return (
    <section id="shorts" className="border-b border-bg-border py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Learn in 2-minute shorts
          </h2>
          <p className="mt-3 text-base text-text-muted">
            Quick video lessons that explain one concept at a time.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SHORTS.map((s) => {
            const isAmber = s.color === 'amber';
            return (
              <div
                key={s.title}
                className="group cursor-pointer overflow-hidden rounded-xl border border-bg-border bg-bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-bg-border-light"
              >
                {/* Video thumbnail area */}
                <div className="relative h-44 overflow-hidden bg-bg">
                  {/* Mini code preview as thumbnail */}
                  <div className="absolute inset-0 p-4 opacity-40 transition-opacity group-hover:opacity-60">
                    <pre className="font-mono text-xs leading-relaxed text-accent-mint/60">
                      {s.code.split('\n').slice(0, 6).map((line, i) => (
                        <div key={i}>
                          <span className="mr-2 text-text-dim/30">{i + 1}</span>
                          {line}
                        </div>
                      ))}
                    </pre>
                  </div>

                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-bg/40 backdrop-blur-[2px] transition-all group-hover:bg-bg/30">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-full transition-all group-hover:scale-110 ${
                        isAmber
                          ? 'bg-accent-amber/90 text-bg'
                          : 'bg-accent-mint/90 text-bg'
                      }`}
                    >
                      <Play className="h-6 w-6 fill-current" />
                    </div>
                  </div>

                  {/* Duration badge */}
                  <div className="absolute bottom-2 right-2 rounded bg-bg/80 px-2 py-0.5 font-mono text-xs text-text-primary backdrop-blur-sm">
                    {s.duration}
                  </div>

                  {/* Language badge */}
                  <div
                    className={`absolute top-2 left-2 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      isAmber
                        ? 'bg-accent-amber-soft text-accent-amber'
                        : 'bg-accent-mint-soft text-accent-mint'
                    }`}
                  >
                    {s.language}
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-heading text-sm font-semibold text-text-primary transition-colors group-hover:text-accent-amber">
                    {s.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-4 text-xs text-text-dim">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5" />
                      {s.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="h-3.5 w-3.5" />
                      {s.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {s.duration}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
