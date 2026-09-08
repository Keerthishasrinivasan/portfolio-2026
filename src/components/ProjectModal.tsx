import React from 'react';
import { Project } from '@/data/portfolioData';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { Github } from '@/components/ui/Icons';
import {
  ExternalLink,
  Cpu,
  Layers,
  AlertCircle,
  Lightbulb,
  CheckCircle2,
  GitBranch,
  Sparkles,
} from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  if (!project) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Engineering Case Study • ${project.title}`}
      maxWidth="3xl"
    >
      <div className="space-y-8 text-slate-200">
        {/* Header Hero */}
        <div className="relative p-6 rounded-2xl bg-gradient-to-br from-slate-900/90 via-[#0a0f1d] to-[#04060a] border border-white/10 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant={project.flagship ? 'cyan' : 'indigo'} size="md">
              {project.category}
            </Badge>
            <Badge variant="slate" size="md">
              {project.period}
            </Badge>
            {project.flagship && (
              <Badge variant="cyan" size="md" className="border-cyan-400">
                ★ FLAGSHIP INNOVATION
              </Badge>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white mb-2">
            {project.title}
          </h2>
          <p className="text-cyan-300 font-mono text-sm mb-4">{project.subtitle}</p>
          <p className="text-slate-300 text-sm leading-relaxed">{project.tagline}</p>

          {/* Quick links */}
          <div className="flex flex-wrap items-center gap-3 mt-5 pt-4 border-t border-white/10">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono border border-white/10 transition-colors"
            >
              <Github className="w-4 h-4 text-cyan-400" />
              <span>EXPLORE SOURCE ON GITHUB</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-mono border border-cyan-500/40 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>REPOSITORY / DOCUMENTATION</span>
                <ExternalLink className="w-3 h-3 text-cyan-400" />
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-slate-500 text-xs font-mono border border-white/5">
                Live Deployment: Coming Soon
              </span>
            )}
          </div>
        </div>

        {/* Case Study Pipeline Sequence */}
        <div className="space-y-6">
          {/* 1. Problem */}
          <div className="p-5 rounded-xl bg-slate-900/40 border border-white/[0.08] relative">
            <div className="flex items-center gap-2 mb-2.5 text-xs font-mono text-amber-400 font-semibold tracking-wider uppercase">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <span>01 • THE PROBLEM STATEMENT</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.problem}
            </p>
          </div>

          {/* 2. Solution */}
          <div className="p-5 rounded-xl bg-slate-900/40 border border-cyan-500/20 relative">
            <div className="flex items-center gap-2 mb-2.5 text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase">
              <Lightbulb className="w-4 h-4 text-cyan-400" />
              <span>02 • THE ENGINEERING SOLUTION</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.solution}
            </p>
            {project.highlight && (
              <div className="mt-3 p-3 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200 font-mono">
                💡 <strong>Highlight:</strong> {project.highlight}
              </div>
            )}
          </div>

          {/* 3. Technology Stack */}
          <div className="p-5 rounded-xl bg-slate-900/40 border border-white/[0.08]">
            <div className="flex items-center gap-2 mb-3 text-xs font-mono text-indigo-400 font-semibold tracking-wider uppercase">
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>03 • TECHNOLOGIES APPLIED</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-mono text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* 4. Core Features */}
          <div className="p-5 rounded-xl bg-slate-900/40 border border-white/[0.08]">
            <div className="flex items-center gap-2 mb-3 text-xs font-mono text-emerald-400 font-semibold tracking-wider uppercase">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>04 • KEY CAPABILITIES & FEATURES</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-2.5 rounded-lg bg-black/40 border border-white/5 text-xs text-slate-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Implementation & Architecture */}
          <div className="p-5 rounded-xl bg-slate-900/40 border border-white/[0.08]">
            <div className="flex items-center gap-2 mb-3 text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>05 • ARCHITECTURAL FLOW & DATA PIPELINE</span>
            </div>
            <div className="space-y-2 font-mono text-xs">
              {project.architecture.map((layer, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-lg bg-slate-950/80 border border-cyan-500/20 text-slate-300"
                >
                  <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-bold text-[10px]">
                    STAGE {idx + 1}
                  </span>
                  <span className="text-slate-200">{layer}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 6. My Contribution */}
          <div className="p-5 rounded-xl bg-slate-900/40 border border-white/[0.08]">
            <div className="flex items-center gap-2 mb-2 text-xs font-mono text-purple-400 font-semibold tracking-wider uppercase">
              <GitBranch className="w-4 h-4 text-purple-400" />
              <span>06 • MY ENGINEERING CONTRIBUTION</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-mono">
              {project.contribution}
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-mono text-xs transition-colors"
          >
            ← BACK TO PORTFOLIO
          </button>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-semibold font-mono text-xs"
          >
            <Github className="w-4 h-4" />
            <span>VIEW ON GITHUB</span>
          </a>
        </div>
      </div>
    </Modal>
  );
};
