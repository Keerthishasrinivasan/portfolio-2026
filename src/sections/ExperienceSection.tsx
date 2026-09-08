import React from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Briefcase, Calendar, MapPin, CheckCircle2, GitPullRequest } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const exp = PORTFOLIO_DATA.experience[0];

  return (
    <section id="experience" className="relative py-24 sm:py-32 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-3 mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-widest uppercase">
            <span className="w-8 h-px bg-cyan-400" />
            <span>05 • CAREER TRAJECTORY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-mono tracking-tight text-white">
            EXPERIENCE
          </h2>
          <p className="max-w-2xl text-slate-400 text-sm sm:text-base leading-relaxed">
            Professional industry internship experience applying production software engineering standards, Agile collaboration, and full-stack implementation workflows.
          </p>
        </div>

        {/* Vertical Career Timeline */}
        <div className="relative border-l border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {/* Milestone Node */}
          <div className="relative group">
            {/* Timeline pulsing indicator dot */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-6 w-4 h-4 rounded-full bg-cyan-500 border-4 border-[#04060a] shadow-[0_0_15px_rgba(56,189,248,0.8)]" />

            <GlassCard glow="cyan" className="p-8 sm:p-10 max-w-4xl">
              {/* Timeline Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-white/[0.08]">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="text-2xl font-bold font-mono text-white">
                      {exp.role}
                    </h3>
                    <Badge variant="cyan" size="sm">
                      {exp.mode}
                    </Badge>
                  </div>
                  <div className="text-base font-mono text-cyan-400 font-semibold">
                    {exp.company}
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-1 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Remote Workflow</span>
                  </div>
                </div>
              </div>

              {/* Responsibilities list */}
              <div className="py-6 space-y-3">
                <div className="text-xs font-mono text-slate-400 tracking-wider uppercase mb-2">
                  Key Responsibilities & Deliverables
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {exp.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-white/5 text-xs text-slate-300 leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Competencies */}
              <div className="pt-4 border-t border-white/[0.08]">
                <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2.5">
                  Applied Competencies
                </div>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <Badge key={skill} variant="slate" size="sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};
