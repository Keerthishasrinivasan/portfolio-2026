import React from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { getAssetUrl } from '@/utils/assets';
import {
  Code2,
  BrainCircuit,
  Trophy,
  GraduationCap,
  Briefcase,
  MapPin,
  Sparkles,
  Award,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

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
        <div className="flex flex-col items-start space-y-3 mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-widest uppercase">
            <span className="w-8 h-px bg-cyan-400" />
            <span>02 • PHILOSOPHY & BACKGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-mono tracking-tight text-white">
            BUILDING WITH PURPOSE.
          </h2>
        </div>

        {/* 2-Column Spotlight Grid: Narrative & Quick Specs + Portrait Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column (7 cols): Narrative & Quick Specs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              {PORTFOLIO_DATA.personal.aboutParagraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Verified Quick Credentials Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              <div className="p-4 rounded-xl bg-slate-900/70 border border-white/10 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                    EDUCATION
                  </div>
                  <div className="text-xs font-bold font-mono text-white mt-0.5">
                    B.Tech in Information Technology
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Adithya Institute of Technology (2023–2027)
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/70 border border-white/10 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 shrink-0">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider">
                    INDUSTRY EXPERIENCE
                  </div>
                  <div className="text-xs font-bold font-mono text-white mt-0.5">
                    Full Stack Development Intern
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Cognifyz Technologies (Feb – Mar 2026)
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/70 border border-white/10 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                    HACKATHONS
                  </div>
                  <div className="text-xs font-bold font-mono text-white mt-0.5">
                    National AWS & L&T Finalist
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Hyderabad & Chennai Competitions
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/70 border border-white/10 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
                    AWARDS & PAPERS
                  </div>
                  <div className="text-xs font-bold font-mono text-white mt-0.5">
                    Paper Presentation Winner
                  </div>
                  <div className="text-[11px] text-slate-400">
                    UTHRA Fest & Dept. of IT Symposiums
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Portrait Spotlight Dossier Card */}
          <div className="lg:col-span-5">
            <GlassCard glow="cyan" className="p-6 relative overflow-hidden group">
              {/* Corner Cyber HUD Accents */}
              <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
              <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

              {/* Photo Frame */}
              <div className="relative h-80 rounded-xl overflow-hidden border border-white/10 bg-slate-950 mb-4">
                <img
                  src={getAssetUrl(PORTFOLIO_DATA.personal.profileImage || '')}
                  alt={PORTFOLIO_DATA.personal.name}
                  className="w-full h-full object-cover object-top filter contrast-105 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent opacity-80" />

                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-emerald-500/40 text-emerald-400 text-[10px] font-mono">
                  <ShieldCheck className="w-3 h-3" />
                  <span>VERIFIED PROFILE</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <div className="text-white font-mono font-bold text-base">
                    {PORTFOLIO_DATA.personal.name}
                  </div>
                  <div className="text-cyan-300 font-mono text-xs">
                    Full-Stack AI Developer
                  </div>
                </div>
              </div>

              {/* Profile Metrics Pills */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-white/5 text-center">
                  <div className="text-cyan-400 font-bold text-sm">8</div>
                  <div className="text-[10px] text-slate-400">MindLuster Certs</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-white/5 text-center">
                  <div className="text-cyan-400 font-bold text-sm">3</div>
                  <div className="text-[10px] text-slate-400">Key Projects</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-white/5 text-center">
                  <div className="text-amber-400 font-bold text-sm">2</div>
                  <div className="text-[10px] text-slate-400">Hackathon Finals</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-white/5 text-center">
                  <div className="text-indigo-400 font-bold text-sm">2027</div>
                  <div className="text-[10px] text-slate-400">Graduation Year</div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  Coimbatore, India
                </span>
                <span className="text-cyan-300 font-semibold">
                  AIT • B.Tech IT
                </span>
              </div>
            </GlassCard>
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
