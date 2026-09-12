import { useEffect, useRef, useState, type ReactNode } from 'react';

interface AnimatedHeadingProps {
  children: ReactNode;
  className?: string;
  subtitle?: ReactNode;
  subtitleClassName?: string;
  as?: 'h1' | 'h2' | 'h3';
  stagger?: number;
}

export default function AnimatedHeading({
  children,
  className = '',
  subtitle,
  subtitleClassName = '',
  as: Tag = 'h2',
  stagger = 0.15,
}: AnimatedHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center">
      <Tag
        className={`${visible ? 'blur-in-active' : 'blur-in-init'} ${className}`}
        style={visible ? { animationDelay: '0s' } : undefined}
      >
        {children}
      </Tag>
      {subtitle && (
        <p
          className={`${visible ? 'blur-in-sub-active' : 'blur-in-sub-init'} mt-3 text-base text-text-muted ${subtitleClassName}`}
          style={visible ? { animationDelay: `${stagger}s` } : undefined}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
