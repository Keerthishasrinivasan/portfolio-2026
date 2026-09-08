import React from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Linkedin, Github } from '@/components/ui/Icons';
import {
  ArrowDown,
  Sparkles,
  ExternalLink,
  BookOpen,
  Hammer,
  Trophy,
  Mic,
  Briefcase,
  Lightbulb,
} from 'lucide-react';

export const JourneySection: React.FC = () => {
  const stepIcons = [
    <BookOpen className="w-4 h-4 text-cyan-400" />,
    <Hammer className="w-4 h-4 text-blue-400" />,
    <Trophy className="w-4 h-4 text-amber-400" />,
    <Mic className="w-4 h-4 text-purple-400" />,
    <Briefcase className="w-4 h-4 text-emerald-400" />,
    <Lightbulb className="w-4 h-4 text-cyan-300" />,
  ];

  return (
    <section id="journey" className="relative py-24 sm:py-32 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-3 mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-widest uppercase">
            <span className="w-8 h-px bg-cyan-400" />
            <span>08 • EVOLUTION & ROADMAP</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-mono tracking-tight text-white">
            DIGITAL JOURNEY
          </h2>
          <p className="max-w-2xl text-slate-400 text-sm sm:text-base leading-relaxed">
            A continuous progression from theoretical academic foundations into competitive hackathons, industry internships, and forward-looking AI innovation.
          </p>
        </div>

        {/* The 6-Step Evolution Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {PORTFOLIO_DATA.journeyMilestones.map((milestone, idx) => (
            <GlassCard
              key={milestone.step}
              glow={idx === 5 ? 'cyan' : 'subtle'}
              className="p-7 flex flex-col justify-between relative group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-slate-900 border border-white/10 group-hover:scale-110 transition-transform">
                      {stepIcons[idx]}
                    </div>
                    <span className="font-mono text-xs font-bold text-cyan-400 tracking-wider">
                      STEP {milestone.step}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-slate-500">
                    {milestone.period}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-mono text-white group-hover:text-cyan-300 transition-colors">
                  {milestone.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {milestone.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Phase {milestone.step} of 06</span>
                {idx < 5 ? (
                  <span className="text-cyan-400">Progression →</span>
                ) : (
                  <span className="text-emerald-400 font-bold">Active Frontier ★</span>
                )}
              </div>
            </GlassCard>
          ))}
        </div>

        {/* FOLLOW THE JOURNEY / Social Proof Callout */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-slate-950 via-[#0a0f1e] to-indigo-950/30 border border-cyan-500/20 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
                SOCIAL PROOF & NETWORK
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-mono text-white">
                FOLLOW THE JOURNEY
              </h3>
              <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
                “Follow my journey as I continue learning, building and sharing.”
              </p>
              <p className="text-xs text-slate-400 font-mono">
                Connect for research collaborations, hackathon teams, and technical exchanges.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 border border-cyan-500/30 text-white font-mono text-xs hover:border-cyan-400 hover:bg-slate-800 transition-all shadow-lg group"
              >
                <Linkedin className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>CONNECT ON LINKEDIN</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>

              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 border border-white/10 text-white font-mono text-xs hover:border-white/30 hover:bg-slate-800 transition-all shadow-lg group"
              >
                <Github className="w-4 h-4 text-slate-300 group-hover:scale-110 transition-transform" />
                <span>GITHUB REPOSITORIES</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
