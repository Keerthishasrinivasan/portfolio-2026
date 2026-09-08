import React from 'react';
import { cn } from '@/utils/cn';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: 'none' | 'cyan' | 'violet' | 'subtle';
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  glow = 'subtle',
  hoverEffect = true,
  ...props
}) => {
  const glowClasses = {
    none: '',
    subtle: 'hover:border-slate-700/80 hover:shadow-[0_0_20px_-3px_rgba(56,189,248,0.12)]',
    cyan: 'hover:border-cyan-500/40 hover:shadow-[0_0_25px_-5px_rgba(56,189,248,0.25)]',
    violet: 'hover:border-indigo-500/40 hover:shadow-[0_0_25px_-5px_rgba(129,140,248,0.25)]',
  };

  return (
    <div
      className={cn(
        'relative rounded-2xl bg-[#090d16]/70 backdrop-blur-xl border border-white/[0.08]',
        'transition-all duration-300 ease-out',
        hoverEffect && 'hover:-translate-y-1',
        glowClasses[glow],
        className
      )}
      {...props}
    >
      {/* Subtle top glare line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent rounded-t-2xl pointer-events-none" />
      {children}
    </div>
  );
};
