import React, { useState, useRef, useEffect } from 'react';
import { askKeerthishaAI } from '@/utils/aiEngine';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { getAssetUrl } from '@/utils/assets';
import {
  Sparkles,
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  ExternalLink,
  Loader2,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';
import { cn } from '@/utils/cn';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  actionLink?: {
    label: string;
    sectionId?: string;
    url?: string;
  };
}

interface AIAssistantProps {
  onNavigateToSection: (sectionId: string) => void;
}

const PRESET_QUESTIONS = [
  'Tell me about Keerthisha.',
  'What technologies does she know?',
  'Explain Lumiable.',
  'What was her internship experience?',
  'What makes her suitable for a software development role?',
  'What are her achievements?',
];

export const AIAssistant: React.FC<AIAssistantProps> = ({ onNavigateToSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Hello! I am **Keerthisha AI**, an intelligent portfolio assistant. Ask me anything about Keerthisha's engineering experience, her AI flagship project **Lumiable**, tech stack, or achievements.",
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (queryText?: string) => {
    const textToSend = (queryText || inputValue).trim();
    if (!textToSend || isTyping) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!queryText) setInputValue('');
    setIsTyping(true);

    try {
      const response = await askKeerthishaAI(textToSend);
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: response.answer,
        actionLink: response.actionLink,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-error-${Date.now()}`,
          sender: 'ai',
          text: 'I encountered an issue retrieving that. Please try asking about her projects, skills, or internship.',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleActionClick = (actionLink: { sectionId?: string; url?: string }) => {
    if (actionLink.sectionId) {
      setIsOpen(false);
      onNavigateToSection(actionLink.sectionId);
    } else if (actionLink.url) {
      window.open(actionLink.url, '_blank');
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'relative flex items-center gap-2.5 px-4 py-3 rounded-full font-mono text-xs font-semibold shadow-2xl transition-all duration-300 group',
            isOpen
              ? 'bg-slate-900 border border-white/20 text-white'
              : 'bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-black border border-cyan-300/40 shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:shadow-[0_0_35px_rgba(56,189,248,0.6)] hover:scale-105'
          )}
          aria-label="Toggle Ask Keerthisha AI assistant"
        >
          {isOpen ? (
            <>
              <X className="w-4 h-4 text-white" />
              <span>CLOSE ASSISTANT</span>
            </>
          ) : (
            <>
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-200 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
              </span>
              <Sparkles className="w-4 h-4" />
              <span className="tracking-wide font-bold">ASK KEERTHISHA AI</span>
            </>
          )}
        </button>
      </div>

      {/* Assistant Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 w-[92vw] sm:w-[420px] max-h-[600px] h-[80vh] z-40 flex flex-col rounded-2xl bg-[#090d16]/95 border border-cyan-500/30 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-4 border-b border-white/[0.08] bg-black/40 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-cyan-400/40 shadow-[0_0_12px_rgba(56,189,248,0.3)] shrink-0 bg-slate-900">
                <img
                  src={getAssetUrl(PORTFOLIO_DATA.personal.profileImage || '')}
                  alt={PORTFOLIO_DATA.personal.name}
                  className="w-full h-full object-cover object-top"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900" />
              </div>
              <div>
                <h3 className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                  <span>KEERTHISHA AI</span>
                  <span className="px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 text-[9px]">
                    PORTFOLIO BOT
                  </span>
                </h3>
                <p className="text-[10px] font-mono text-slate-400">
                  Verified knowledge • Zero hallucination
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages list */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 custom-scrollbar text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  'flex gap-2.5 max-w-[90%]',
                  m.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                )}
              >
                <div
                  className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-mono',
                    m.sender === 'user'
                      ? 'bg-slate-700 text-white'
                      : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  )}
                >
                  {m.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>

                <div
                  className={cn(
                    'p-3 rounded-2xl leading-relaxed whitespace-pre-line',
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none'
                      : 'bg-slate-900/90 border border-white/[0.08] text-slate-200 rounded-tl-none'
                  )}
                >
                  {/* Render basic bold formatting */}
                  <div>
                    {m.text.split('\n').map((line, lIdx) => (
                      <p key={lIdx} className={lIdx > 0 ? 'mt-1.5' : ''}>
                        {line}
                      </p>
                    ))}
                  </div>

                  {/* Optional Action Button */}
                  {m.actionLink && (
                    <button
                      onClick={() => handleActionClick(m.actionLink!)}
                      className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-[11px] font-mono transition-colors"
                    >
                      <span>{m.actionLink.label}</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center text-slate-400 text-xs font-mono">
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-900/80 border border-white/5">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                  <span>Synthesizing response...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Question Chips */}
          <div className="p-3 bg-black/30 border-t border-white/[0.05] overflow-x-auto custom-scrollbar flex gap-1.5">
            {PRESET_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                disabled={isTyping}
                className="shrink-0 px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-cyan-950/60 hover:text-cyan-300 border border-white/5 hover:border-cyan-500/30 text-[10px] font-mono text-slate-300 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t border-white/[0.08] bg-slate-950 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about Lumiable, skills, experience..."
              disabled={isTyping}
              className="flex-1 bg-slate-900/90 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 transition-transform"
              aria-label="Send query"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
