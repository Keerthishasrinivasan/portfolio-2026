import React from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Code2, BrainCircuit, Trophy, ArrowUpRight, GraduationCap } from 'lucide-react';

interface AboutSectionProps {
  onNavigateToProjects: () => void;
  onNavigateToAchievements: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onNavigateToProjects,
  onNavigateToAchievements,
}) => {
  const cardIcons = [
    <Code2 className="w-5 h-5 text-cyan-400" />,
    <BrainCircuit className="w-5 h-5 text-indigo-400" />,
    <Trophy className="w-5 h-5 text-amber-400" />,
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-3 mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-widest uppercase">
            <span className="w-8 h-px bg-cyan-400" />
            <span>02 • PHILOSOPHY & BACKGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-mono tracking-tight text-white">
            BUILDING WITH PURPOSE.
          </h2>
          <div className="max-w-3xl space-y-4 pt-2 text-slate-300 text-sm sm:text-base leading-relaxed">
            {PORTFOLIO_DATA.personal.aboutParagraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Academic Badge */}
          <div className="pt-2 flex items-center gap-2 text-xs font-mono text-slate-400">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <span>
              Adithya Institute of Technology, Coimbatore • B.Tech in Information Technology (Sep 2023 – May 2027)
            </span>
          </div>
        </div>

        {/* 3 Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PORTFOLIO_DATA.aboutCards.map((card, idx) => (
            <GlassCard
              key={card.id}
              glow={idx === 1 ? 'cyan' : idx === 0 ? 'violet' : 'subtle'}
              className="p-8 flex flex-col justify-between group cursor-default"
            >
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs font-bold text-slate-500 tracking-widest">
                    {card.id} — {card.title}
                  </span>
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/10 group-hover:scale-110 transition-transform">
                    {cardIcons[idx]}
                  </div>
                </div>

                <h3 className="text-xl font-bold font-mono text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {card.headline}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {card.description}
                </p>
              </div>

              {/* Card Footer tags */}
              <div className="pt-6 border-t border-white/[0.08] flex flex-wrap gap-1.5">
                {card.tags.map((tag) => (
                  <Badge key={tag} variant={idx === 1 ? 'cyan' : 'slate'} size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
