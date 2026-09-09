import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { getAssetUrl } from '@/utils/assets';
import {
  Trophy,
  Zap,
  Award,
  MapPin,
  Sparkles,
  Camera,
  ExternalLink,
  Eye,
  CheckCircle,
} from 'lucide-react';

export const AchievementsSection: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<{
    url: string;
    caption: string;
    event: string;
  } | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case 'trophy':
        return <Trophy className="w-6 h-6 text-amber-400" />;
      case 'zap':
        return <Zap className="w-6 h-6 text-cyan-400" />;
      default:
        return <Award className="w-6 h-6 text-indigo-400" />;
    }
  };

  return (
    <section id="achievements" className="relative py-24 sm:py-32 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-3 mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-widest uppercase">
            <span className="w-8 h-px bg-cyan-400" />
            <span>06 • COMPETITIVE TRACK RECORD</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-mono tracking-tight text-white">
            PROOF OF WORK
          </h2>
          <p className="max-w-2xl text-slate-400 text-sm sm:text-base leading-relaxed">
            Verified competitive engineering milestones, hackathon distinctions, and technical symposium awards validated through live presentations and stage recognition.
          </p>
        </div>

        {/* Achievement Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {PORTFOLIO_DATA.achievements.map((item, idx) => (
            <GlassCard
              key={item.id}
              glow={item.photos ? 'cyan' : idx === 1 ? 'violet' : 'subtle'}
              className="p-8 flex flex-col justify-between group"
            >
              <div className="space-y-6">
                {/* Header row with Icon and Badge */}
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/10 group-hover:scale-110 transition-transform">
                    {getIcon(item.iconName)}
                  </div>
                  <Badge
                    variant={item.photos ? 'cyan' : idx === 1 ? 'amber' : 'indigo'}
                    size="sm"
                  >
                    {item.stage}
                  </Badge>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-xl font-bold font-mono text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  {item.location && (
                    <div className="flex items-center gap-1.5 mt-1.5 text-xs font-mono text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{item.location}</span>
                    </div>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                {/* Photo Proof Preview Strip if photos exist */}
                {item.photos && (
                  <div className="pt-2">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-300 mb-2.5">
                      <Camera className="w-3.5 h-3.5" />
                      <span>PHOTO EVIDENCE ({item.photos.length} PHOTOGRAPHS)</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {item.photos.slice(0, 2).map((photo, pIdx) => (
                        <div
                          key={pIdx}
                          onClick={() => setActivePhoto(photo)}
                          className="relative h-24 rounded-lg overflow-hidden border border-cyan-500/30 group/photo cursor-pointer bg-slate-950"
                        >
                          <img
                            src={getAssetUrl(photo.url)}
                            alt={photo.caption}
                            className="w-full h-full object-cover group-hover/photo:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/photo:opacity-100 flex items-center justify-center transition-opacity">
                            <Eye className="w-4 h-4 text-cyan-300" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer status */}
              <div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500 uppercase tracking-wider text-[10px]">
                  {item.category}
                </span>
                <span className="text-cyan-400 font-semibold text-[11px] flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  VERIFIED
                </span>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* ========================================================= */}
        {/* INTERACTIVE PHOTO EVIDENCE GALLERY                        */}
        {/* ========================================================= */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-[#090e1c]/90 via-[#070b14] to-[#04060a] border border-cyan-500/30 backdrop-blur-xl relative overflow-hidden shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-widest uppercase">
                <Camera className="w-4 h-4 text-cyan-400" />
                <span>PHOTOGRAPHIC PROOF • COMPETITIONS & STAGE RECOGNITION</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-mono text-white">
                Paper Presentation & Stage Award Gallery
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Real documentation from UTHRA Inter-College Techno-Cultural Fest & Dept. of Information Technology.
              </p>
            </div>
            <Badge variant="cyan" size="md">
              4 VERIFIED EVENT PHOTOS
            </Badge>
          </div>

          {/* Photo Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PORTFOLIO_DATA.achievements[0]?.photos?.map((photo, pIdx) => (
              <div
                key={pIdx}
                onClick={() => setActivePhoto(photo)}
                className="group relative rounded-xl overflow-hidden border border-white/10 hover:border-cyan-400/60 bg-slate-950 transition-all duration-300 cursor-pointer shadow-lg hover:-translate-y-1"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={getAssetUrl(photo.url)}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent opacity-90" />

                  <div className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-black/70 backdrop-blur-md text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-3.5 space-y-1 bg-[#090d16]/90">
                  <div className="text-[10px] font-mono text-cyan-400 font-semibold tracking-wider uppercase">
                    {photo.event}
                  </div>
                  <p className="text-xs text-slate-200 line-clamp-2 leading-snug">
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal for Full-Resolution Photo View */}
        <Modal
          isOpen={!!activePhoto}
          onClose={() => setActivePhoto(null)}
          title="Achievement Photo Evidence"
          maxWidth="3xl"
        >
          {activePhoto && (
            <div className="space-y-4">
              <div className="rounded-xl overflow-hidden border border-white/10 bg-black flex items-center justify-center max-h-[600px]">
                <img
                  src={getAssetUrl(activePhoto.url)}
                  alt={activePhoto.caption}
                  className="w-full h-auto max-h-[580px] object-contain mx-auto"
                />
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="text-xs font-mono text-cyan-400 font-semibold uppercase">
                    {activePhoto.event}
                  </div>
                  <div className="text-sm text-white font-medium mt-0.5">
                    {activePhoto.caption}
                  </div>
                </div>
                <Badge variant="cyan" size="sm" className="w-fit">
                  Verified Academic Award
                </Badge>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
};
