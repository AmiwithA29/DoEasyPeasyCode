import { Pause, Play, Square, Volume2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { CodeStep } from '@/lib/explainCode';
import { AudioController } from '@/lib/audio';
import { SpeechController } from '@/lib/speech';

interface Walkthrough2DProps {
  steps: CodeStep[];
  soundEnabled: boolean;
  audio: AudioController;
}

export default function Walkthrough2D({
  steps,
  soundEnabled,
  audio,
}: Walkthrough2DProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const speechRef = useRef<SpeechController | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    speechRef.current = new SpeechController();
    return () => {
      speechRef.current?.stop();
    };
  }, []);

  useEffect(() => {
    setVisibleCount(0);
    if (steps.length === 0) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleCount(i);
      if (i >= steps.length) clearInterval(interval);
    }, 150);
    return () => clearInterval(interval);
  }, [steps]);

  useEffect(() => {
    if (!isPlaying) return;
    const speech = speechRef.current;
    if (!speech || !speech.isAvailable()) {
      setIsPlaying(false);
      return;
    }

    let idx = currentStep >= 0 ? currentStep : 0;
    if (idx >= steps.length) idx = 0;
    setCurrentStep(idx);

    const speakStep = (stepIdx: number) => {
      if (stepIdx >= steps.length) {
        setIsPlaying(false);
        setCurrentStep(-1);
        return;
      }
      const step = steps[stepIdx];
      setCurrentStep(stepIdx);
      if (soundEnabled) audio.playStepTone(stepIdx);
      speech.speak(`${step.title}. ${step.description}`, stepIdx, () => {
        if (speech.speaking || speech.paused) return;
      });
    };

    speakStep(idx);

    const checkInterval = setInterval(() => {
      if (!speech.speaking && !speech.paused) {
        idx++;
        if (idx < steps.length) {
          speakStep(idx);
        } else {
          setIsPlaying(false);
          setCurrentStep(-1);
          clearInterval(checkInterval);
        }
      }
    }, 200);

    return () => clearInterval(checkInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  useEffect(() => {
    if (currentStep >= 0 && stepRefs.current[currentStep]) {
      stepRefs.current[currentStep]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentStep]);

  const togglePlay = () => {
    const speech = speechRef.current;
    if (!speech) return;
    if (isPlaying) {
      if (speech.paused) {
        speech.resume();
      } else {
        speech.pause();
      }
    } else {
      if (speech.paused) {
        speech.resume();
      } else {
        setIsPlaying(true);
      }
    }
  };

  const stop = () => {
    speechRef.current?.stop();
    setIsPlaying(false);
    setCurrentStep(-1);
  };

  if (steps.length === 0) return null;

  const progress = steps.length > 0 ? ((currentStep + 1) / steps.length) * 100 : 0;

  return (
    <div>
      <div className="mb-5 rounded-lg border border-bg-border bg-bg-elevated px-4 py-3">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={togglePlay}
            className="inline-flex items-center gap-2 rounded-lg bg-accent-amber px-4 py-2 text-sm font-semibold text-bg transition-all hover:bg-accent-amber-hover hover:shadow-lg hover:shadow-accent-amber/20"
          >
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Play
              </>
            )}
          </button>
          <button
            onClick={stop}
            className="inline-flex items-center gap-2 rounded-lg border border-bg-border px-4 py-2 text-sm font-medium text-text-muted transition-colors hover:text-text-primary"
          >
            <Square className="h-3.5 w-3.5" />
            Stop
          </button>
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Volume2 className="h-4 w-4" />
            {currentStep >= 0
              ? `Reading step ${currentStep + 1} of ${steps.length}`
              : `Step 0 of ${steps.length}`}
          </div>
          <div className="ml-auto hidden h-1.5 w-32 overflow-hidden rounded-full bg-bg-border sm:block">
            <div
              className="h-full rounded-full bg-accent-amber transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-4 top-2 bottom-2 w-px bg-bg-border sm:left-5" />

        <div className="space-y-3">
          {steps.map((step, i) => {
            const isVisible = i < visibleCount;
            const isActive = i === currentStep;
            return (
              <div
                key={i}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className={`relative flex gap-4 transition-all duration-500 sm:gap-5 ${
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-4 opacity-0'
                }`}
              >
                <div
                  className={`relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 font-mono text-sm font-semibold transition-all sm:h-10 sm:w-10 ${
                    isActive
                      ? 'border-accent-amber bg-accent-amber text-bg animate-pulse-glow'
                      : 'border-bg-border bg-bg-surface text-text-muted'
                  }`}
                >
                  {i + 1}
                </div>

                <div
                  className={`flex-1 rounded-lg border p-4 transition-all duration-300 ${
                    isActive
                      ? 'border-accent-amber/40 bg-accent-amber-soft'
                      : 'border-bg-border bg-bg-surface hover:border-bg-border-light'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-heading text-sm font-semibold text-text-primary">
                      {step.title}
                    </h4>
                    <span className="font-mono text-xs text-text-dim">
                      Line {step.lineNumber}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
                    {step.description}
                  </p>
                  <div className="mt-3 overflow-x-auto rounded-md border border-bg-border bg-bg px-3 py-2">
                    <code className="font-mono text-xs text-accent-mint">
                      <span className="mr-3 select-none text-text-dim/40">
                        {step.lineNumber}
                      </span>
                      {step.line}
                    </code>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
