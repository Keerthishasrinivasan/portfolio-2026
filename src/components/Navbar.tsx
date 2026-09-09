import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { getAssetUrl } from '@/utils/assets';
import { Menu, X, Briefcase, FileText, Sparkles } from 'lucide-react';
import { cn } from '@/utils/cn';

interface NavbarProps {
  activeSection: string;
  onOpenRecruiter: () => void;
}

const NAV_ITEMS = [
  { id: 'intro', label: '01 INTRO' },
  { id: 'about', label: '02 ABOUT' },
  { id: 'expertise', label: '03 EXPERTISE' },
  { id: 'projects', label: '04 PROJECTS' },
  { id: 'experience', label: '05 EXPERIENCE' },
  { id: 'achievements', label: '06 ACHIEVEMENTS' },
  { id: 'certifications', label: '07 CERTIFICATIONS' },
  { id: 'journey', label: '08 JOURNEY' },
  { id: 'contact', label: '09 CONTACT' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onOpenRecruiter }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-40 transition-all duration-300',
        scrolled
          ? 'bg-[#04060a]/85 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-2xl'
          : 'bg-transparent py-5 border-b border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Name Logo with Professional Avatar */}
        <button
          onClick={() => scrollToSection('intro')}
          className="group flex items-center gap-3 text-left focus:outline-none"
        >
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-cyan-400/40 shadow-[0_0_14px_rgba(56,189,248,0.35)] group-hover:scale-105 transition-transform shrink-0 bg-slate-900">
            <img
              src={getAssetUrl(PORTFOLIO_DATA.personal.profileImage || '')}
              alt={PORTFOLIO_DATA.personal.name}
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div>
            <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-white group-hover:text-cyan-400 transition-colors">
              KEERTHISHA SRINIVASAN
            </span>
            <span className="hidden sm:block text-[10px] font-mono text-slate-400 tracking-widest">
              FULL-STACK AI
            </span>
          </div>
        </button>

        {/* Desktop Nav Items */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-950/60 p-1 rounded-full border border-white/[0.08] backdrop-blur-md">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wider transition-all duration-200',
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30 shadow-[0_0_12px_rgba(56,189,248,0.25)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] border border-transparent'
                )}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons: Recruiter View & Resume */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenRecruiter}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500/15 via-indigo-500/15 to-purple-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium hover:border-cyan-400 hover:bg-cyan-500/25 transition-all shadow-[0_0_15px_rgba(56,189,248,0.15)] group"
          >
            <Briefcase className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
            <span>RECRUITER VIEW</span>
          </button>

          <a
            href={getAssetUrl(PORTFOLIO_DATA.personal.resumePdf)}
            download="Keerthisha_Resume.pdf"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 text-slate-300 text-xs font-mono hover:text-white hover:border-slate-500 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <span>RESUME</span>
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-x-0 top-[65px] bg-[#090d16]/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl p-6 transition-all animate-in fade-in slide-in-from-top-4">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  'text-left px-3.5 py-2.5 rounded-xl text-xs font-mono tracking-wider transition-all',
                  activeSection === item.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-white/5 border border-transparent'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRecruiter();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-semibold font-mono text-xs tracking-wider"
            >
              <Briefcase className="w-4 h-4" />
              <span>OPEN RECRUITER VIEW</span>
            </button>
            <a
              href={getAssetUrl(PORTFOLIO_DATA.personal.resumePdf)}
              download="Keerthisha_Resume.pdf"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 text-slate-300 border border-white/10 font-mono text-xs"
            >
              <FileText className="w-4 h-4" />
              <span>DOWNLOAD RESUME (PDF)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
