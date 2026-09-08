import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { Linkedin, Github } from '@/components/ui/Icons';
import {
  FileText,
  Mail,
  Copy,
  Check,
  Briefcase,
  Layers,
  Award,
  ExternalLink,
  MapPin,
  GraduationCap
} from 'lucide-react';

interface RecruiterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const RecruiterDrawer: React.FC<RecruiterDrawerProps> = ({
  isOpen,
  onClose,
  onNavigateToSection,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleGoToProjects = () => {
    onClose();
    onNavigateToSection('projects');
  };

  const handleGoToContact = () => {
    onClose();
    onNavigateToSection('contact');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Executive Recruiter Snapshot • 10-Second Candidate Overview"
      maxWidth="3xl"
    >
      <div className="space-y-6">
        {/* Candidate Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-indigo-950/40 border border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold font-mono text-white tracking-tight">
                {PORTFOLIO_DATA.personal.name}
              </h2>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" title="Active Candidate" />
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-slate-300 font-mono">
              <span className="flex items-center gap-1 text-cyan-300">
                <GraduationCap className="w-3.5 h-3.5" />
                B.Tech Information Technology (2023 – 2027)
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <MapPin className="w-3.5 h-3.5" />
                {PORTFOLIO_DATA.personal.location}
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-400 max-w-xl">
              {PORTFOLIO_DATA.personal.summary}
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-row sm:flex-col gap-2 shrink-0">
            <a
              href={PORTFOLIO_DATA.personal.resumePdf}
              download="Keerthisha_Resume.pdf"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-semibold font-mono text-xs shadow-lg hover:shadow-cyan-500/25 transition-all text-center"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>DOWNLOAD RESUME</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-slate-200 border border-white/10 text-xs font-mono hover:bg-slate-700 transition-colors"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">COPIED!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>COPY EMAIL</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Column 1: Core Focus & Tech Stack */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/[0.08]">
              <div className="flex items-center gap-2 mb-2 text-xs font-mono text-cyan-400 font-semibold tracking-wider">
                <Layers className="w-3.5 h-3.5" />
                <span>PRIMARY SPECIALIZATION & FOCUS</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-200">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Full-Stack Web Engineering (Python, Flask, React.js, SQL)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  <span>Applied Edge AI & Computer Vision (TensorFlow Lite, ML Kit)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Relational Database Modeling (MySQL, SQLite, SQL Schema Design)</span>
                </li>
              </ul>
            </div>

            {/* Experience Summary */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/[0.08]">
              <div className="flex items-center gap-2 mb-2 text-xs font-mono text-cyan-400 font-semibold tracking-wider">
                <Briefcase className="w-3.5 h-3.5" />
                <span>INTERNSHIP EXPERIENCE</span>
              </div>
              <div className="text-xs">
                <div className="font-semibold text-white">Full Stack Development Intern</div>
                <div className="text-slate-400 font-mono text-[11px] mb-1.5">
                  Cognifyz Technologies • Feb 2026 – Mar 2026 (Remote)
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  Engineered responsive full-stack applications with modular front-end interfaces, backend API routes, and Agile testing workflows.
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Flagship Projects & Achievements */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/[0.08]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold tracking-wider">
                  <Layers className="w-3.5 h-3.5" />
                  <span>FLAGSHIP PROJECTS</span>
                </div>
                <button
                  onClick={handleGoToProjects}
                  className="text-[11px] text-cyan-400 hover:underline font-mono"
                >
                  View All →
                </button>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded-lg bg-black/40 border border-cyan-500/20">
                  <div className="font-semibold text-white flex items-center justify-between">
                    <span>Lumiable</span>
                    <Badge variant="cyan" size="sm">Flagship AI</Badge>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    TensorFlow Lite, Google Maps API, ML Kit, Python. Built SeeSphere real-time vision module.
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-black/30 border border-white/5">
                  <div className="font-semibold text-white">Student Placement Management</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Python Flask, SQL, HTML, CSS. Automated recruitment tracking and analytics.
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-black/30 border border-white/5">
                  <div className="font-semibold text-white">Blood Donor Finder</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Python Flask, SQL. Emergency blood search and hospital alert broadcasts.
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements Summary */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/[0.08]">
              <div className="flex items-center gap-2 mb-2 text-xs font-mono text-cyan-400 font-semibold tracking-wider">
                <Award className="w-3.5 h-3.5" />
                <span>COMPETITIVE ACHIEVEMENTS</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">★</span>
                  <span><strong>National Level AWS Hackathon:</strong> Finalist (Hyderabad)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">★</span>
                  <span><strong>Larsen & Toubro Hackathon:</strong> Finalist (Chennai)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">★</span>
                  <span><strong>Paper Presentations & Seminars:</strong> Multiple Top Prizes</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <a
              href={PORTFOLIO_DATA.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-xs font-mono text-slate-300 hover:text-white hover:border-cyan-500/40 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
              <span>LINKEDIN</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-xs font-mono text-slate-300 hover:text-white hover:border-cyan-500/40 transition-colors"
            >
              <Github className="w-3.5 h-3.5 text-slate-300" />
              <span>GITHUB</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleGoToProjects}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 border border-white/10 text-xs font-mono hover:bg-slate-700 transition-colors"
            >
              VIEW PROJECTS
            </button>
            <button
              onClick={handleGoToContact}
              className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono hover:bg-cyan-500/30 transition-colors"
            >
              CONTACT DIRECTLY
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
