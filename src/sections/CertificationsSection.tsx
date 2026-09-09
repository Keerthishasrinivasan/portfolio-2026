import React, { useState, useMemo } from 'react';
import { CERTIFICATES_DATA, Certificate } from '@/data/certificationsData';
import { getAssetUrl } from '@/utils/assets';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Search, ExternalLink, ShieldCheck, Eye, Sparkles, Filter } from 'lucide-react';

interface CertificationsSectionProps {
  onSelectCertificate: (cert: Certificate) => void;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  onSelectCertificate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [showAll, setShowAll] = useState(false);

  const categories = ['All', 'Full-Stack', 'Backend & APIs', 'Languages & Core', 'Design & UI', 'DevOps & Tools'];

  const filteredCertificates = useMemo(() => {
    return CERTIFICATES_DATA.filter((cert) => {
      const matchesCategory = activeCategory === 'All' || cert.category === activeCategory;
      const matchesSearch =
        cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.credentialId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.skillsLearned.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const displayedList = showAll ? filteredCertificates : filteredCertificates.slice(0, 6);

  return (
    <section id="certifications" className="relative py-24 sm:py-32 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-3 mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-widest uppercase">
            <span className="w-8 h-px bg-cyan-400" />
            <span>07 • VERIFIED CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-mono tracking-tight text-white">
            CONTINUOUS LEARNING
          </h2>
          <p className="max-w-2xl text-slate-400 text-sm sm:text-base leading-relaxed">
            Verified technical certifications spanning full-stack frameworks, backend APIs, containerization, and modern UI engineering.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 border ${
                  activeCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-[0_0_12px_rgba(56,189,248,0.2)]'
                    : 'bg-slate-900/60 text-slate-400 border-white/5 hover:text-white hover:border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search certificates or skills..."
              className="w-full bg-slate-900/80 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>
        </div>

        {/* Certificates Grid */}
        {filteredCertificates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedList.map((cert) => (
              <GlassCard
                key={cert.id}
                glow="subtle"
                className="overflow-hidden flex flex-col justify-between group cursor-pointer"
                onClick={() => onSelectCertificate(cert)}
              >
                <div>
                  {/* Certificate Image Preview */}
                  <div className="relative h-44 bg-slate-950 overflow-hidden border-b border-white/[0.08]">
                    <img
                      src={getAssetUrl(cert.previewImage)}
                      alt={cert.title}
                      className="w-full h-full object-cover object-top opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent opacity-80" />

                    {/* Verified badge top-right */}
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-emerald-500/40 text-emerald-400 text-[10px] font-mono">
                      <ShieldCheck className="w-3 h-3" />
                      <span>VERIFIED</span>
                    </div>

                    {/* View Preview Overlay on Hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 backdrop-blur-sm transition-opacity">
                      <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500 text-black font-mono font-semibold text-xs shadow-lg">
                        <Eye className="w-3.5 h-3.5" />
                        <span>VIEW CREDENTIAL</span>
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono text-cyan-400 font-semibold tracking-wide">
                        {cert.issuer}
                      </span>
                      <Badge variant="slate" size="sm">
                        {cert.category}
                      </Badge>
                    </div>

                    <h3 className="text-base font-bold font-mono text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                      {cert.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {cert.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-6 pt-3 border-t border-white/[0.05] flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500 text-[11px]">{cert.issueDate}</span>
                  <span className="text-slate-400 text-[11px] group-hover:text-cyan-400 transition-colors flex items-center gap-1">
                    <span>ID: {cert.credentialId.slice(0, 8)}</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </GlassCard>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-white/5 text-slate-400 font-mono text-xs">
            No certificates match your search query. Try another keyword or filter.
          </div>
        )}

        {/* VIEW ALL CERTIFICATIONS toggle */}
        {filteredCertificates.length > 6 && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 font-mono text-xs tracking-wider transition-all shadow-[0_0_15px_rgba(56,189,248,0.1)]"
            >
              {showAll
                ? 'SHOW LESS'
                : `VIEW ALL ${filteredCertificates.length} CERTIFICATIONS`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
