import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

interface BorderTrailButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'amber' | 'mint' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  trailOnHover?: boolean;
  trailOnClick?: boolean;
  className?: string;
}

const variantStyles: Record<string, string> = {
  amber: 'bg-accent-amber text-bg hover:bg-accent-amber-hover',
  mint: 'bg-accent-mint text-bg hover:bg-accent-mint-hover',
  outline: 'border border-bg-border bg-bg-surface text-text-primary hover:bg-bg-elevated',
};

const sizeStyles: Record<string, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-sm',
};

const trailColors: Record<string, string> = {
  amber: '#F2B705',
  mint: '#38D9A9',
  outline: '#38D9A9',
};

const BorderTrailButton = forwardRef<HTMLButtonElement, BorderTrailButtonProps>(
  (
    {
      children,
      variant = 'amber',
      size = 'md',
      trailOnHover = true,
      trailOnClick = false,
      className = '',
      onClick,
      ...rest
    },
    ref
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const el = e.currentTarget;
      if (trailOnClick) {
        el.classList.remove('trail-active');
        void el.offsetWidth;
        el.classList.add('trail-active');
        setTimeout(() => el.classList.remove('trail-active'), 2000);
      }
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        onClick={handleClick}
        style={{ ['--trail-color' as string]: trailColors[variant] }}
        className={`border-trail-wrap inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all ${variantStyles[variant]} ${sizeStyles[size]} ${!trailOnHover ? 'hover:shadow-none' : ''} ${className}`}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

BorderTrailButton.displayName = 'BorderTrailButton';

export default BorderTrailButton;
