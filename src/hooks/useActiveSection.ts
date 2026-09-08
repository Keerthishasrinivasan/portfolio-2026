import { useState, useEffect } from 'react';

export function useActiveSection(sectionIds: string[], offsetPercent = 30) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || 'intro');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * (offsetPercent / 100);

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offsetPercent]);

  return activeSection;
}
