import React from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { ArrowUp, Heart, Mail, ShieldCheck } from 'lucide-react';
import { Linkedin, Github } from '@/components/ui/Icons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="relative w-full border-t border-white/[0.08] bg-[#04060a] pt-16 pb-12 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-cyan-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/[0.08] items-start">
          {/* Brand Col */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-mono font-bold text-black text-xs">
                K
              </div>
              <span className="font-mono text-base font-bold tracking-wider text-white">
                {PORTFOLIO_DATA.personal.name}
              </span>
            </div>
            <p className="text-xs font-mono text-cyan-400">
              {PORTFOLIO_DATA.personal.title} • Adithya Institute of Technology
            </p>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Engineering practical web and AI-powered digital solutions from Coimbatore, Tamil Nadu, India.
            </p>
          </div>

          {/* Technology Credits */}
          <div className="md:col-span-3 space-y-2 text-xs font-mono">
            <div className="text-slate-500 uppercase tracking-wider text-[10px]">
              ENGINEERING STACK
            </div>
            <ul className="space-y-1 text-slate-300">
              <li>• React 18 & TypeScript</li>
              <li>• Three.js & React Three Fiber</li>
              <li>• Tailwind CSS & Lenis Scroll</li>
              <li>• Framer Motion</li>
            </ul>
          </div>

          {/* Socials & Back to top */}
          <div className="md:col-span-3 space-y-3 flex flex-col items-start md:items-end">
            <div className="text-slate-500 uppercase tracking-wider text-[10px] font-mono">
              CONNECT
            </div>
            <div className="flex items-center gap-3">
              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-400 hover:text-cyan-300 hover:border-cyan-400 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-400 hover:text-cyan-300 hover:border-cyan-400 transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                className="p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-400 hover:text-cyan-300 hover:border-cyan-400 transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-xs font-mono text-slate-400 hover:text-white hover:border-slate-600 transition-colors mt-2"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} Keerthisha Srinivasan. All rights reserved.
          </div>
          <div className="flex items-center gap-2 text-cyan-400/80">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Open to Full-Stack & AI Engineering Opportunities</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
