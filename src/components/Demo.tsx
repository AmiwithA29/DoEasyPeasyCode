import { Boxes, Lock, ListOrdered, Volume2, VolumeX, Loader2 } from 'lucide-react';
import { useRef, useState } from 'react';
import CodeInput from './CodeInput';
import Walkthrough2D from './Walkthrough2D';
import Scene3D from './Scene3D';
import { AudioController } from '@/lib/audio';
import { explainCode, type CodeStep, type Language } from '@/lib/explainCode';

type Tab = '2d' | '3d';

export default function Demo() {
  const [steps, setSteps] = useState<CodeStep[]>([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<Tab>('2d');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [unlocked3D, setUnlocked3D] = useState(false);
  const audioRef = useRef<AudioController | null>(null);
  if (audioRef.current === null) {
    audioRef.current = new AudioController();
  }
  const audio = audioRef.current;

  const handleExplain = async (code: string, language: Language) => {
    setLoading(true);
    setSteps([]);
    try {
      const result = await explainCode(code, language);
      setSteps(result);
    } catch {
      setSteps([]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSteps([]);
    setUnlocked3D(false);
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    audio.setMuted(!next);
  };

  return (
    <section id="demo" className="border-b border-bg-border py-16 lg:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Try the demo
          </h2>
          <p className="mt-3 text-base text-text-muted">
            Paste any code snippet below and watch CodeXplain break it down.
          </p>
        </div>

        <CodeInput
          onExplain={handleExplain}
          loading={loading}
          onReset={handleReset}
          hasResults={steps.length > 0}
        />

        {loading && <LoadingSkeleton />}

        {!loading && steps.length > 0 && (
          <div className="mt-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex gap-2 rounded-lg border border-bg-border bg-bg-surface p-1">
                <TabButton
                  active={tab === '2d'}
                  onClick={() => setTab('2d')}
                  icon={<ListOrdered className="h-4 w-4" />}
                  label="2D Walkthrough"
                  badge="Free"
                />
                <TabButton
                  active={tab === '3d'}
                  onClick={() => setTab('3d')}
                  icon={<Boxes className="h-4 w-4" />}
                  label="3D Structure View"
                  badge="₹199"
                />
              </div>

              <button
                onClick={toggleSound}
                className="inline-flex items-center gap-2 rounded-lg border border-bg-border bg-bg-surface px-4 py-2 text-sm font-medium text-text-muted transition-colors hover:text-text-primary"
              >
                {soundEnabled ? (
                  <Volume2 className="h-4 w-4 text-accent-mint" />
                ) : (
                  <VolumeX className="h-4 w-4" />
                )}
                {soundEnabled ? 'Sound on' : 'Muted'}
              </button>
            </div>

            {tab === '2d' && (
              <div className="animate-fade-in">
                <Walkthrough2D
                  steps={steps}
                  soundEnabled={soundEnabled}
                  audio={audio}
                />
              </div>
            )}

            {tab === '3d' && (
              <div className="animate-fade-in">
                {unlocked3D ? (
                  <Scene3D steps={steps} />
                ) : (
                  <PaywallOverlay onUnlock={() => setUnlocked3D(true)} />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
  badge,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  badge: string;
}) {
  const isPaid = badge === '₹199';
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${
        active
          ? 'bg-bg-elevated text-text-primary'
          : 'text-text-muted hover:text-text-primary'
      }`}
    >
      {icon}
      {label}
      <span
        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
          isPaid
            ? 'bg-accent-amber-soft text-accent-amber'
            : 'bg-accent-mint-soft text-accent-mint'
        }`}
      >
        {badge}
      </span>
    </button>
  );
}

function LoadingSkeleton() {
  return (
    <div className="mt-6 space-y-3">
      <div className="flex gap-3">
        <div className="skeleton-shimmer h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-2 rounded-lg border border-bg-border bg-bg-surface p-4">
          <div className="skeleton-shimmer h-4 w-32 rounded" />
          <div className="skeleton-shimmer h-3 w-full rounded" />
          <div className="skeleton-shimmer h-8 w-3/4 rounded" />
        </div>
      </div>
      <div className="flex gap-3">
        <div className="skeleton-shimmer h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-2 rounded-lg border border-bg-border bg-bg-surface p-4">
          <div className="skeleton-shimmer h-4 w-28 rounded" />
          <div className="skeleton-shimmer h-3 w-full rounded" />
          <div className="skeleton-shimmer h-8 w-2/3 rounded" />
        </div>
      </div>
      <div className="flex gap-3">
        <div className="skeleton-shimmer h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-2 rounded-lg border border-bg-border bg-bg-surface p-4">
          <div className="skeleton-shimmer h-4 w-36 rounded" />
          <div className="skeleton-shimmer h-3 w-full rounded" />
          <div className="skeleton-shimmer h-8 w-4/5 rounded" />
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 pt-4 text-sm text-text-dim">
        <Loader2 className="h-4 w-4 animate-spin" />
        Analyzing your code...
      </div>
    </div>
  );
}

function PaywallOverlay({ onUnlock }: { onUnlock: () => void }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-bg-border bg-bg-surface">
      <div className="pointer-events-none h-[400px] overflow-hidden opacity-20 sm:h-[500px]">
        <div className="flex h-full items-center justify-center">
          <div className="relative">
            <div className="h-16 w-16 animate-pulse rounded-full border-2 border-accent-amber/30 bg-bg-surface" />
            <div className="absolute left-20 top-0 h-12 w-12 animate-pulse rounded-full border-2 border-accent-mint/30 bg-bg-surface" style={{ animationDelay: '0.3s' }} />
            <div className="absolute left-40 top-8 h-10 w-10 animate-pulse rounded-full border-2 border-accent-amber/30 bg-bg-surface" style={{ animationDelay: '0.6s' }} />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center bg-bg-surface/90 backdrop-blur-sm">
        <div className="mx-4 max-w-sm text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-accent-amber/30 bg-accent-amber-soft">
            <Lock className="h-6 w-6 text-accent-amber" />
          </div>
          <h3 className="font-heading text-xl font-semibold text-text-primary">
            3D Structure View
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            Unlock the rotating 3D graph for this snippet. See your code's
            functions and flow as connected nodes in an interactive 3D space.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="font-heading text-2xl font-bold text-accent-amber">
              ₹199
            </span>
            <span className="text-sm text-text-muted">one-time, per snippet</span>
          </div>
          <button
            onClick={onUnlock}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent-amber px-6 py-3 text-sm font-semibold text-bg transition-all hover:bg-accent-amber-hover hover:shadow-lg hover:shadow-accent-amber/20"
          >
            <Lock className="h-4 w-4" />
            Simulate unlock
          </button>
          <p className="mt-3 text-xs text-text-dim">
            Demo mode — no real payment required
          </p>
        </div>
      </div>
    </div>
  );
}
