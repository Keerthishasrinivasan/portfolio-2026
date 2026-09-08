import React from 'react';
import { PORTFOLIO_DATA, Project } from '@/data/portfolioData';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Github } from '@/components/ui/Icons';
import {
  ExternalLink,
  ArrowRight,
  Eye,
  Sparkles,
  ShieldAlert,
  Database,
  Users,
  Compass,
  FileSpreadsheet,
  Activity,
} from 'lucide-react';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [flagshipProject, ...otherProjects] = PORTFOLIO_DATA.projects;

  return (
    <section id="projects" className="relative py-24 sm:py-32 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-3 mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-widest uppercase">
            <span className="w-8 h-px bg-cyan-400" />
            <span>04 • FEATURED ENGINEERING</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-mono tracking-tight text-white">
            SELECTED WORK
          </h2>
          <p className="max-w-2xl text-slate-400 text-sm sm:text-base leading-relaxed">
            Engineered systems solving real-world challenges — from real-time AI accessibility perception pipelines to full-stack transactional enterprise platforms.
          </p>
        </div>

        {/* ========================================================= */}
        {/* FLAGSHIP PROJECT: LUMIABLE                                */}
        {/* ========================================================= */}
        {flagshipProject && (
          <div className="mb-16">
            <GlassCard
              glow="cyan"
              className="p-8 sm:p-12 overflow-hidden relative border-cyan-500/30 bg-gradient-to-br from-[#090e1c] via-[#070b14] to-[#04060a]"
            >
              {/* Background ambient lighting */}
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                {/* Left info column */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <Badge variant="cyan" size="md" className="border-cyan-400/50">
                      ★ FLAGSHIP AI INNOVATION
                    </Badge>
                    <Badge variant="slate" size="md">
                      {flagshipProject.period}
                    </Badge>
                    <Badge variant="indigo" size="md">
                      On-Device Vision & Safety
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
                      {flagshipProject.title}
                    </h3>
                    <p className="text-cyan-400 font-mono text-sm sm:text-base mt-1 font-medium">
                      {flagshipProject.subtitle}
                    </p>
                  </div>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    {flagshipProject.description}
                  </p>

                  {/* Flagship Highlight Box: SeeSphere */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 to-slate-900/60 border border-cyan-500/30">
                    <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 font-semibold mb-1">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      <span>FLAGSHIP MODULE: SEESPHERE</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {flagshipProject.highlight}
                    </p>
                  </div>

                  {/* Features list */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-300">
                    {flagshipProject.features.slice(0, 4).map((f, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {flagshipProject.technologies.map((t) => (
                      <Badge key={t} variant="cyan" size="sm">
                        {t}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
                    <button
                      onClick={() => onSelectProject(flagshipProject)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-semibold font-mono text-xs tracking-wider shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_25px_rgba(56,189,248,0.5)] transition-all hover:scale-[1.02]"
                    >
                      <Eye className="w-4 h-4 text-black" />
                      <span>VIEW FULL CASE STUDY</span>
                      <ArrowRight className="w-3.5 h-3.5 text-black" />
                    </button>

                    <a
                      href={flagshipProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-slate-500 font-mono text-xs transition-colors"
                    >
                      <Github className="w-4 h-4 text-cyan-400" />
                      <span>SOURCE CODE</span>
                      <ExternalLink className="w-3 h-3 text-slate-500" />
                    </a>
                  </div>
                </div>

                {/* Right visual mockup column: Architecture blueprint */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center">
                  <div className="w-full rounded-2xl bg-black/60 border border-cyan-500/30 p-6 backdrop-blur-xl shadow-2xl relative">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4 text-xs font-mono text-slate-400">
                      <span className="flex items-center gap-1.5 text-cyan-400">
                        <Activity className="w-3.5 h-3.5" />
                        LUMIABLE PIPELINE
                      </span>
                      <span>v1.0 • ON-DEVICE</span>
                    </div>

                    {/* Architecture step visualizer */}
                    <div className="space-y-3">
                      <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 flex items-center gap-3 text-xs">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                          <Eye className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-mono text-white font-semibold text-[11px]">
                            FRAME CAPTURE
                          </div>
                          <div className="text-slate-400 text-[10px]">
                            Live sensor frame streaming
                          </div>
                        </div>
                      </div>

                      <div className="w-px h-4 bg-cyan-500/40 mx-auto" />

                      <div className="p-3 rounded-xl bg-slate-900/80 border border-cyan-500/40 flex items-center gap-3 text-xs shadow-[0_0_15px_rgba(56,189,248,0.15)]">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300 shrink-0">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-mono text-cyan-300 font-bold text-[11px]">
                            SEESPHERE ENGINE
                          </div>
                          <div className="text-slate-300 text-[10px]">
                            TensorFlow Lite + ML Kit inference
                          </div>
                        </div>
                      </div>

                      <div className="w-px h-4 bg-cyan-500/40 mx-auto" />

                      <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 flex items-center gap-3 text-xs">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                          <Compass className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-mono text-white font-semibold text-[11px]">
                            GEO & SOS DISPATCH
                          </div>
                          <div className="text-slate-400 text-[10px]">
                            Google Maps API live telemetry
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        )}

        {/* ========================================================= */}
        {/* OTHER FULL-STACK PROJECTS: PLACEMENT & BLOOD DONOR         */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {otherProjects.map((project, idx) => (
            <GlassCard
              key={project.id}
              glow="violet"
              className="p-8 flex flex-col justify-between group"
            >
              <div className="space-y-5">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <Badge variant="indigo" size="sm">
                    {project.category}
                  </Badge>
                  <span className="font-mono text-xs text-slate-500">{project.period}</span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold font-mono text-white group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-indigo-300 font-mono mt-1">{project.subtitle}</p>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {project.description}
                </p>

                {/* Core features preview */}
                <div className="space-y-1.5 pt-2 border-t border-white/[0.08]">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    Key Implementations
                  </span>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {project.features.slice(0, 3).map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((t) => (
                    <Badge key={t} variant="slate" size="sm">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/10">
                <button
                  onClick={() => onSelectProject(project)}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
                >
                  <span>CASE STUDY DETAILS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors border border-white/5"
                  title="GitHub Repository"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
