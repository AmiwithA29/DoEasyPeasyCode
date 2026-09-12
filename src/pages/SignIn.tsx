import { ArrowLeft, Code2, LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import BorderTrailButton from '@/components/BorderTrailButton';

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4 py-12">
      <div className="w-full max-w-md">
        <a
          href="#"
          className="mb-8 inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </a>

        <div className="rounded-xl border border-bg-border bg-bg-surface p-8 shadow-2xl">
          <div className="mb-6 flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-amber-soft ring-1 ring-accent-amber/30">
              <Code2 className="h-5 w-5 text-accent-amber" />
            </div>
            <span className="font-heading text-base font-semibold text-text-primary">
              DoEasy<span className="text-accent-amber">Peasy</span>Code
            </span>
          </div>

          <h1 className="font-heading text-2xl font-bold tracking-tight text-text-primary">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-text-muted">
            Sign in to continue your learning journey.
          </p>

          <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-text-muted">
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-dim" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-bg-border bg-bg py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder-text-dim/50 transition-colors focus:border-accent-amber/40 focus:ring-1 focus:ring-accent-amber/20"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-text-muted">
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-dim" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Your password"
                  className="w-full rounded-lg border border-bg-border bg-bg py-2.5 pl-10 pr-10 text-sm text-text-primary placeholder-text-dim/50 transition-colors focus:border-accent-amber/40 focus:ring-1 focus:ring-accent-amber/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-dim transition-colors hover:text-text-primary"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-text-muted">
                <input type="checkbox" className="h-4 w-4 rounded border-bg-border bg-bg accent-amber" />
                Remember me
              </label>
              <a href="#" className="text-sm text-accent-amber transition-colors hover:text-accent-amber-hover">
                Forgot password?
              </a>
            </div>

            <BorderTrailButton
              type="submit"
              variant="amber"
              size="lg"
              className="w-full"
              trailOnHover={true}
              trailOnClick={true}
            >
              <LogIn className="h-4 w-4" />
              Sign in
            </BorderTrailButton>
          </form>

          <p className="mt-6 text-center text-sm text-text-muted">
            Don't have an account?{' '}
            <a href="#signup" className="font-semibold text-accent-amber transition-colors hover:text-accent-amber-hover">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
