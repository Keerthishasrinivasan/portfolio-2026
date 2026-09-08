import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { GlassCard } from '@/components/ui/GlassCard';
import { MagneticButton } from '@/components/ui/MagneticButton';
import confetti from 'canvas-confetti';
import { Linkedin, Github } from '@/components/ui/Icons';
import {
  Mail,
  Copy,
  Check,
  Send,
  ExternalLink,
  MapPin,
  Sparkles,
  AlertCircle,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const validate = () => {
    const errs: { name?: string; email?: string; message?: string } = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      errs.email = 'Please provide an email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#38bdf8', '#818cf8', '#ffffff'],
        });
      } catch {
        // Confetti fallback
      }
    }, 800);
  };

  const handleMailtoDirect = () => {
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name || 'Visitor'}`);
    const body = encodeURIComponent(
      `Hello Keerthisha,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
    );
    window.location.href = `mailto:${PORTFOLIO_DATA.personal.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-3 mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-widest uppercase">
            <span className="w-8 h-px bg-cyan-400" />
            <span>09 • GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-mono tracking-tight text-white">
            LET'S BUILD SOMETHING MEANINGFUL.
          </h2>
          <p className="max-w-2xl text-slate-400 text-sm sm:text-base leading-relaxed">
            Interested in full-stack engineering, edge AI implementations, or hackathon collaboration? Reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <GlassCard glow="cyan" className="p-8 space-y-6">
              <div>
                <h3 className="text-xl font-bold font-mono text-white mb-2">
                  Direct Inquiries
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  I typically respond within 24 hours to discussions regarding software engineering roles, hackathons, and AI research projects.
                </p>
              </div>

              {/* Email Block with Copy button */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-white/[0.08] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[10px] font-mono text-slate-500 uppercase">
                      EMAIL ADDRESS
                    </div>
                    <a
                      href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                      className="text-xs sm:text-sm font-mono text-white hover:text-cyan-300 truncate block transition-colors"
                    >
                      {PORTFOLIO_DATA.personal.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors shrink-0"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Social Channels */}
              <div className="space-y-2.5 pt-2">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Verified Social Channels
                </div>

                <a
                  href={PORTFOLIO_DATA.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-white/5 hover:border-cyan-500/40 text-xs font-mono text-slate-300 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <Linkedin className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                    <span>LinkedIn Profile</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400" />
                </a>

                <a
                  href={PORTFOLIO_DATA.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-white/5 hover:border-cyan-500/40 text-xs font-mono text-slate-300 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <Github className="w-4 h-4 text-slate-300 group-hover:scale-110 transition-transform" />
                    <span>GitHub Repositories</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400" />
                </a>
              </div>

              {/* Location indicator */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center gap-2 text-xs font-mono text-slate-400">
                <MapPin className="w-4 h-4 text-indigo-400" />
                <span>Coimbatore, Tamil Nadu, India</span>
              </div>
            </GlassCard>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <GlassCard glow="violet" className="p-8 sm:p-10">
              {isSubmitted ? (
                <div className="py-12 flex flex-col items-center text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Check className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold font-mono text-white">
                    MESSAGE TRANSMITTED
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed">
                    Thank you for reaching out, <strong>{formData.name}</strong>. Your message details have been recorded. You can also send directly via your email client below.
                  </p>
                  <div className="pt-4 flex flex-wrap gap-3">
                    <button
                      onClick={handleMailtoDirect}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-semibold font-mono text-xs shadow-lg"
                    >
                      OPEN IN EMAIL CLIENT
                    </button>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ name: '', email: '', message: '' });
                      }}
                      className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-mono text-xs border border-white/10"
                    >
                      SEND ANOTHER MESSAGE
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                    <span className="text-xs font-mono text-cyan-400 font-semibold tracking-wider">
                      SEND A DIRECT MESSAGE
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      Response within 24h
                    </span>
                  </div>

                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="name"
                      className="block text-xs font-mono text-slate-300 uppercase tracking-wider"
                    >
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      className={`w-full bg-slate-900/90 border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors font-sans ${
                        errors.name
                          ? 'border-rose-500/70 focus:border-rose-400'
                          : 'border-white/10 focus:border-cyan-400'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[11px] font-mono text-rose-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="block text-xs font-mono text-slate-300 uppercase tracking-wider"
                    >
                      Your Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alex@company.com"
                      className={`w-full bg-slate-900/90 border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors font-sans ${
                        errors.email
                          ? 'border-rose-500/70 focus:border-rose-400'
                          : 'border-white/10 focus:border-cyan-400'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] font-mono text-rose-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Message Input */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="message"
                      className="block text-xs font-mono text-slate-300 uppercase tracking-wider"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your project, engineering role, or collaboration..."
                      className={`w-full bg-slate-900/90 border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors font-sans ${
                        errors.message
                          ? 'border-rose-500/70 focus:border-rose-400'
                          : 'border-white/10 focus:border-cyan-400'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-[11px] font-mono text-rose-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-blue-600 text-black font-semibold font-mono text-xs tracking-wider shadow-[0_0_20px_rgba(56,189,248,0.25)] hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] transition-all hover:scale-[1.01] flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4 text-black" />
                      <span>{isSubmitting ? 'TRANSMITTING...' : 'SEND MESSAGE'}</span>
                    </button>
                  </div>
                </form>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};
