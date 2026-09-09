import React from 'react';
import { Certificate } from '@/data/certificationsData';
import { getAssetUrl } from '@/utils/assets';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { ExternalLink, CheckCircle, Calendar, Hash, Award, ShieldCheck } from 'lucide-react';

interface CertificateModalProps {
  certificate: Certificate | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  isOpen,
  onClose,
}) => {
  if (!certificate) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Verified Credential • ${certificate.issuer}`}
      maxWidth="3xl"
    >
      <div className="space-y-6">
        {/* Certificate Image Frame */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-950/80 shadow-2xl p-2 sm:p-4">
          <img
            src={getAssetUrl(certificate.previewImage)}
            alt={`${certificate.title} Certificate`}
            className="w-full h-auto rounded-xl object-contain max-h-[500px] mx-auto shadow-lg"
          />
          <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-emerald-500/40 text-emerald-400 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>VERIFIED CREDENTIAL</span>
          </div>
        </div>

        {/* Certificate Details */}
        <div className="p-5 rounded-xl bg-slate-900/60 border border-white/[0.08] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-xl font-bold font-mono text-white">
                {certificate.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-cyan-400 font-mono text-xs font-semibold">
                  {certificate.issuer}
                </span>
                <span className="text-slate-600">•</span>
                <Badge variant="cyan" size="sm">
                  {certificate.category}
                </Badge>
              </div>
            </div>

            <a
              href={certificate.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-mono text-xs border border-cyan-500/40 transition-colors w-fit"
            >
              <span>VERIFY ISSUANCE</span>
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            </a>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {certificate.description}
          </p>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-400">
              <Calendar className="w-4 h-4 text-slate-500" />
              <span>Issued: <strong className="text-slate-200">{certificate.issueDate}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Hash className="w-4 h-4 text-slate-500" />
              <span>Credential ID: <strong className="text-cyan-300">{certificate.credentialId}</strong></span>
            </div>
          </div>

          {/* Competencies Covered */}
          <div className="pt-3 border-t border-white/10">
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
              Key Competencies Mastered
            </div>
            <div className="flex flex-wrap gap-1.5">
              {certificate.skillsLearned.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-md bg-black/40 border border-white/5 text-[11px] font-mono text-slate-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
