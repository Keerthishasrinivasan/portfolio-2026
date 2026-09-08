import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { Hero3DCore } from '@/components/canvas/Hero3DCore';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Linkedin, Github } from '@/components/ui/Icons';
import {
  Mail,
  FileText,
  ChevronDown,
  ArrowRight,
  Sparkles,
  MapPin,
  CheckCircle,
} from 'lucide-react';

interface HeroSectionProps {
  onExploreWork: () => void;
  onOpenRecruiter: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreWork, onOpenRecruiter }) => {
  const roles = PORTFOLIO_DATA.personal.roles;
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect for roles
  useEffect(() => {
    const currentFullRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentFullRole.length) {
          setDisplayedText(currentFullRole.slice(0, displayedText.length + 1));
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(currentFullRole.slice(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex, roles]);

  return (
    <section
      id="intro"
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-10 overflow-hidden"
    >
      {/* Background radial gradient spotlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[500px] bg-gradient-to-b from-cyan-500/10 via-indigo-500/5 to-transparent blur-[140px] pointer-events-none" />

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-8 z-10">
        {/* Left Column: Editorial Typography & Positioning */}
        <div className="w-full lg:w-3/5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono backdrop-blur-md shadow-[0_0_15px_rgba(56,189,248,0.15)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Adithya Institute of Technology • B.Tech IT 2023–2027</span>
          </div>

          {/* Name Display */}
          <div className="space-y-1">
            <div className="text-xs sm:text-sm font-mono tracking-widest text-slate-400 uppercase">
              PORTFOLIO OF
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white font-mono">
              KEERTHISHA S.
            </h1>
          </div>

          {/* Animated Cycling Role Display */}
          <div className="h-10 sm:h-12 flex items-center">
            <div className="text-lg sm:text-2xl md:text-3xl font-mono font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 flex items-center">
              <span>{displayedText}</span>
              <span className="w-2 sm:w-2.5 h-6 sm:h-8 bg-cyan-400 ml-1 animate-pulse" />
            </div>
          </div>

          {/* Main Statement */}
          <p className="max-w-xl text-base sm:text-lg text-slate-300 leading-relaxed font-sans font-light">
            {PORTFOLIO_DATA.personal.heroStatement}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            <MagneticButton
              variant="primary"
              size="lg"
              onClick={onExploreWork}
              className="gap-2"
            >
              <span>EXPLORE MY WORK</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </MagneticButton>

            <MagneticButton
              variant="secondary"
              size="lg"
              asLink
              href={PORTFOLIO_DATA.personal.resumePdf}
              download="Keerthisha_Resume.pdf"
              className="gap-2"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>DOWNLOAD RESUME</span>
            </MagneticButton>
          </div>

          {/* Social Links & Quick Verified Badges */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-4 border-t border-white/10 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-3">
              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-300 transition-colors"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>

              <span className="text-slate-700">•</span>

              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-300 transition-colors"
                title="GitHub Profile"
              >
                <Github className="w-4 h-4" />
                <span className="hidden sm:inline">GitHub</span>
              </a>

              <span className="text-slate-700">•</span>

              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-300 transition-colors"
                title="Direct Email"
              >
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">Email</span>
              </a>
            </div>

            <span className="hidden md:inline text-slate-700">•</span>

            <div className="flex items-center gap-1 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-indigo-400" />
              <span>Coimbatore, Tamil Nadu, India</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Interactive Scene */}
        <div className="w-full lg:w-2/5 flex items-center justify-center relative">
          <Hero3DCore />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="flex flex-col items-center justify-center pt-8 z-10">
        <button
          onClick={onExploreWork}
          className="group flex flex-col items-center gap-1 text-[11px] font-mono tracking-widest text-slate-400 hover:text-cyan-300 transition-colors"
        >
          <span>SCROLL TO EXPLORE</span>
          <ChevronDown className="w-4 h-4 text-cyan-400 animate-bounce" />
        </button>
      </div>
    </section>
  );
};
