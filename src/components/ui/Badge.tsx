import React from 'react';
import { cn } from '@/utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'cyan' | 'indigo' | 'slate' | 'emerald' | 'amber';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'slate',
  size = 'sm',
  ...props
}) => {
  const variantStyles = {
    slate: 'bg-slate-800/60 text-slate-300 border-white/10 hover:border-slate-600',
    cyan: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20 hover:border-cyan-500/40',
    indigo: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20 hover:border-indigo-500/40',
    emerald: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20 hover:border-emerald-500/40',
    amber: 'bg-amber-500/10 text-amber-300 border-amber-500/20 hover:border-amber-500/40',
  };

  const sizeStyles = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3.5 py-1.5 text-xs tracking-wide',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-mono transition-colors duration-200',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
