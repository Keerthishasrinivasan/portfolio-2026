import React from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { TechLatticeCanvas } from '@/components/canvas/TechLatticeCanvas';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Terminal, Database, Code, Cpu, Wrench } from 'lucide-react';

export const ExpertiseSection: React.FC = () => {
  // Group skills by category for the quick matrix below the interactive canvas
  const skillsByCategory = {
    'AI & Edge Machine Learning': PORTFOLIO_DATA.skills.filter((s) => s.category === 'AI & ML'),
    'Frontend Architecture': PORTFOLIO_DATA.skills.filter((s) => s.category === 'Frontend'),
    'Backend & Databases': PORTFOLIO_DATA.skills.filter((s) => s.category === 'Backend & Database'),
    'Engineering Tools': PORTFOLIO_DATA.skills.filter((s) => s.category === 'Tools & Workflow'),
  };

  const categoryIcons: Record<string, React.ReactNode> = {
    'AI & Edge Machine Learning': <Cpu className="w-4 h-4 text-cyan-400" />,
    'Frontend Architecture': <Code className="w-4 h-4 text-indigo-400" />,
    'Backend & Databases': <Database className="w-4 h-4 text-emerald-400" />,
    'Engineering Tools': <Wrench className="w-4 h-4 text-amber-400" />,
  };

  return (
    <section id="expertise" className="relative py-24 sm:py-32 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-3 mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-widest uppercase">
            <span className="w-8 h-px bg-cyan-400" />
            <span>03 • TECHNICAL CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-mono tracking-tight text-white">
            TECHNOLOGY UNIVERSE
          </h2>
          <p className="max-w-2xl text-slate-400 text-sm sm:text-base leading-relaxed">
            An interconnected ecosystem of programming languages, edge machine learning frameworks, full-stack tools, and database systems applied directly in production and hackathon projects.
          </p>
        </div>

        {/* 3D / 2D Interactive Technology Lattice */}
        <div className="mb-14">
          <TechLatticeCanvas />
        </div>

        {/* Structured Skill Matrix (No fake percentages, purely verified technologies) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Object.entries(skillsByCategory).map(([category, skills]) => (
            <GlassCard key={category} className="p-6 flex flex-col justify-between" glow="subtle">
              <div>
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/[0.08]">
                  {categoryIcons[category]}
                  <h3 className="text-xs font-mono font-bold text-white tracking-wider uppercase">
                    {category}
                  </h3>
                </div>

                <div className="space-y-3">
                  {skills.map((skill) => (
                    <div key={skill.id} className="group">
                      <div className="flex items-center justify-between text-xs font-mono mb-1">
                        <span className="text-slate-200 group-hover:text-cyan-300 transition-colors font-medium">
                          {skill.name}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug">
                        {skill.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
