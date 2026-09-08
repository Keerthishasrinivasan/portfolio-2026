import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { useActiveSection } from '@/hooks/useActiveSection';
import { Project } from '@/data/portfolioData';
import { Certificate } from '@/data/certificationsData';

// Core Components
import { Navbar } from '@/components/Navbar';
import { RecruiterDrawer } from '@/components/RecruiterDrawer';
import { ProjectModal } from '@/components/ProjectModal';
import { CertificateModal } from '@/components/CertificateModal';
import { AIAssistant } from '@/components/AIAssistant';

// Sections
import { HeroSection } from '@/sections/HeroSection';
import { AboutSection } from '@/sections/AboutSection';
import { ExpertiseSection } from '@/sections/ExpertiseSection';
import { ProjectsSection } from '@/sections/ProjectsSection';
import { ExperienceSection } from '@/sections/ExperienceSection';
import { AchievementsSection } from '@/sections/AchievementsSection';
import { CertificationsSection } from '@/sections/CertificationsSection';
import { JourneySection } from '@/sections/JourneySection';
import { ContactSection } from '@/sections/ContactSection';
import { Footer } from '@/sections/Footer';

const SECTION_IDS = [
  'intro',
  'about',
  'expertise',
  'projects',
  'experience',
  'achievements',
  'certifications',
  'journey',
  'contact',
];

export const App: React.FC = () => {
  const activeSection = useActiveSection(SECTION_IDS, 35);

  // Modals state
  const [isRecruiterOpen, setIsRecruiterOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
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
    <div className="relative min-h-screen bg-[#04060a] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Film Grain Subtle Noise Texture */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Sticky Header Navigation */}
      <Navbar
        activeSection={activeSection}
        onOpenRecruiter={() => setIsRecruiterOpen(true)}
      />

      {/* Main Page Sections */}
      <main className="relative z-10 flex flex-col items-center w-full">
        <HeroSection
          onExploreWork={() => scrollToSection('projects')}
          onOpenRecruiter={() => setIsRecruiterOpen(true)}
        />

        <AboutSection
          onNavigateToProjects={() => scrollToSection('projects')}
          onNavigateToAchievements={() => scrollToSection('achievements')}
        />

        <ExpertiseSection />

        <ProjectsSection
          onSelectProject={(project) => setSelectedProject(project)}
        />

        <ExperienceSection />

        <AchievementsSection />

        <CertificationsSection
          onSelectCertificate={(cert) => setSelectedCertificate(cert)}
        />

        <JourneySection />

        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals & Interactive Drawers */}
      <RecruiterDrawer
        isOpen={isRecruiterOpen}
        onClose={() => setIsRecruiterOpen(false)}
        onNavigateToSection={scrollToSection}
      />

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <CertificateModal
        certificate={selectedCertificate}
        isOpen={!!selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />

      {/* Floating AI Portfolio Assistant */}
      <AIAssistant onNavigateToSection={scrollToSection} />
    </div>
  );
};

export default App;
