import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { Hero3DCore } from '@/components/canvas/Hero3DCore';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Linkedin, Github } from '@/components/ui/Icons';
import { getAssetUrl } from '@/utils/assets';
import { cn } from '@/utils/cn';
import {
  Mail,
  FileText,
  ChevronDown,
  ArrowRight,
  Sparkles,
  MapPin,
  CheckCircle,
  User,
  Cpu,
  ShieldCheck,
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
  const [visualMode, setVisualMode] = useState<'profile' | 'neural'>('profile');

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

          {/* Mobile Profile Photo Spotlight (visible on mobile / small devices) */}
          <div className="lg:hidden flex flex-col items-center pt-2">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-cyan-400/60 shadow-[0_0_25px_rgba(56,189,248,0.45)] bg-slate-950">
              <img
                src={getAssetUrl(PORTFOLIO_DATA.personal.profileImage || '')}
                alt={PORTFOLIO_DATA.personal.name}
                loading="eager"
                className="w-full h-full object-cover object-top"
              />
              <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-900" />
            </div>
            <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono">
              <Sparkles className="w-3 h-3" />
              <span>Full-Stack AI Developer</span>
            </div>
          </div>

          {/* Name Display */}
          <div className="space-y-1">
            <div className="text-xs sm:text-sm font-mono tracking-widest text-slate-400 uppercase">
              PORTFOLIO OF
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-mono">
              KEERTHISHA SRINIVASAN
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
              href={getAssetUrl(PORTFOLIO_DATA.personal.resumePdf)}
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

        {/* Right Column: Profile Dossier or 3D Interactive Scene */}
        <div className="w-full lg:w-2/5 flex flex-col items-center justify-center relative">
          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/90 border border-white/10 backdrop-blur-md mb-4 text-xs font-mono z-20">
            <button
              onClick={() => setVisualMode('profile')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all',
                visualMode === 'profile'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-white'
              )}
            >
              <User className="w-3.5 h-3.5" />
              <span>PROFILE DOSSIER</span>
            </button>
            <button
              onClick={() => setVisualMode('neural')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all',
                visualMode === 'neural'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-white'
              )}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>3D NEURAL CORE</span>
            </button>
          </div>

          {visualMode === 'profile' ? (
            <div className="relative w-full max-w-sm sm:max-w-md group">
              {/* Glowing Ambient Halo */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-cyan-500/30 via-indigo-500/20 to-purple-500/30 blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />

              {/* Main Profile Card */}
              <div className="relative rounded-2xl bg-gradient-to-b from-[#090d16]/95 via-[#060911]/95 to-[#04060a] border border-cyan-500/40 backdrop-blur-2xl p-4 sm:p-5 shadow-2xl overflow-hidden">
                {/* Cyber HUD Corner Reticles */}
                <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
                <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
                <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
                <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

                {/* Portrait Image Container */}
                <div className="relative h-72 sm:h-84 w-full rounded-xl overflow-hidden border border-white/10 bg-slate-950">
                  <img
                    src={getAssetUrl(PORTFOLIO_DATA.personal.profileImage || '')}
                    alt={PORTFOLIO_DATA.personal.name}
                    loading="eager"
                    className="w-full h-full object-cover object-top filter contrast-105 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04060a] via-[#04060a]/30 to-transparent opacity-90" />

                  {/* Top Badges */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-emerald-500/40 text-emerald-400 text-[11px] font-mono">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>ONLINE • ACTIVE</span>
                    </div>
                    <div className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-cyan-500/30 text-cyan-300 text-[10px] font-mono">
                      B.Tech IT '27
                    </div>
                  </div>

                  {/* Overlaid Bottom Pill Badges */}
                  <div className="absolute bottom-3 inset-x-3 flex flex-wrap gap-1.5 justify-between items-end">
                    <div className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-cyan-500/30 text-cyan-300 text-[10px] font-mono shadow-md">
                      ⚡ Cognifyz Tech Intern
                    </div>
                    <div className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-amber-500/30 text-amber-300 text-[10px] font-mono shadow-md">
                      🏆 AWS & L&T Finalist
                    </div>
                  </div>
                </div>

                {/* Card Sub-Bar with Candidate Details */}
                <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold font-mono text-white">
                      {PORTFOLIO_DATA.personal.name}
                    </h4>
                    <p className="text-[11px] font-mono text-slate-400">
                      Adithya Institute of Technology • Coimbatore
                    </p>
                  </div>
                  <button
                    onClick={onOpenRecruiter}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-mono transition-colors flex items-center gap-1 shrink-0"
                  >
                    <span>DOSSIER</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full flex items-center justify-center relative min-h-[380px]">
              <Hero3DCore />
            </div>
          )}
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
