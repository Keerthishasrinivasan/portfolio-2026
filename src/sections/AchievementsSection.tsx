import React from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Trophy, Zap, Award, MapPin, Sparkles } from 'lucide-react';

export const AchievementsSection: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'trophy':
        return <Trophy className="w-6 h-6 text-amber-400" />;
      case 'zap':
        return <Zap className="w-6 h-6 text-cyan-400" />;
      default:
        return <Award className="w-6 h-6 text-indigo-400" />;
    }
  };

  return (
    <section id="achievements" className="relative py-24 sm:py-32 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-3 mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-widest uppercase">
            <span className="w-8 h-px bg-cyan-400" />
            <span>06 • COMPETITIVE TRACK RECORD</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-mono tracking-tight text-white">
            PROOF OF WORK
          </h2>
          <p className="max-w-2xl text-slate-400 text-sm sm:text-base leading-relaxed">
            Verified competitive engineering milestones and technical symposium distinctions validated under rigorous national competition criteria.
          </p>
        </div>

        {/* Achievement Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PORTFOLIO_DATA.achievements.map((item, idx) => (
            <GlassCard
              key={item.id}
              glow={idx === 0 ? 'cyan' : idx === 1 ? 'violet' : 'subtle'}
              className="p-8 flex flex-col justify-between group"
            >
              <div className="space-y-6">
                {/* Header row with Icon and Badge */}
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/10 group-hover:scale-110 transition-transform">
                    {getIcon(item.iconName)}
                  </div>
                  <Badge variant={idx === 0 ? 'amber' : idx === 1 ? 'cyan' : 'indigo'} size="sm">
                    {item.stage}
                  </Badge>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-xl font-bold font-mono text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  {item.location && (
                    <div className="flex items-center gap-1.5 mt-1.5 text-xs font-mono text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{item.location}</span>
                    </div>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Card Footer status */}
              <div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500 uppercase tracking-wider text-[10px]">
                  {item.category}
                </span>
                <span className="text-cyan-400 font-semibold text-[11px] flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  VERIFIED
                </span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
