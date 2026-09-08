import React, { useEffect, useRef, useState, useMemo } from 'react';
import { PORTFOLIO_DATA, SkillNode } from '@/data/portfolioData';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, Cpu, Layers } from 'lucide-react';

interface NodePoint {
  id: string;
  name: string;
  category: string;
  description: string;
  projectUsage: string;
  level: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  currentRadius: number;
  color: string;
}

export const TechLatticeCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(PORTFOLIO_DATA.skills[0]);
  const [hoveredNode, setHoveredNode] = useState<SkillNode | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'AI & ML', 'Frontend', 'Backend & Database', 'Tools & Workflow'];

  // Color mapping by category
  const categoryColors: Record<string, string> = useMemo(
    () => ({
      'AI & ML': '#38bdf8', // cyan
      Frontend: '#818cf8', // violet
      'Backend & Database': '#34d399', // emerald
      'Tools & Workflow': '#fbbf24', // amber
    }),
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = Math.min(650, Math.max(450, window.innerHeight * 0.6)));

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = Math.min(650, Math.max(450, window.innerHeight * 0.6));
    };

    window.addEventListener('resize', handleResize);

    // Build node layout in elliptical orbital rings around center
    const centerX = width / 2;
    const centerY = height / 2;

    const nodes: NodePoint[] = PORTFOLIO_DATA.skills.map((skill, index) => {
      const total = PORTFOLIO_DATA.skills.length;
      // Two concentric orbital tiers for balanced spacing
      const tier = index % 2 === 0 ? 0.75 : 1.0;
      const angle = (index / total) * Math.PI * 2 + (index % 2) * 0.2;
      const rx = (width * 0.38) * tier;
      const ry = (height * 0.38) * tier;

      return {
        ...skill,
        x: centerX + Math.cos(angle) * rx,
        y: centerY + Math.sin(angle) * ry,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        baseRadius: 18,
        currentRadius: 18,
        color: categoryColors[skill.category] || '#38bdf8',
      };
    });

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      const curCenterX = width / 2;
      const curCenterY = height / 2;

      // Draw subtle orbital rings
      ctx.beginPath();
      ctx.arc(curCenterX, curCenterY, Math.min(width, height) * 0.3, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw connecting lines from center to nodes and between category peers
      nodes.forEach((node, i) => {
        // Center connection
        const isCatMatch = activeCategory === 'All' || node.category === activeCategory;
        const isHovered = hoveredNode?.id === node.id || selectedNode?.id === node.id;

        ctx.beginPath();
        ctx.moveTo(curCenterX, curCenterY);
        ctx.lineTo(node.x, node.y);
        ctx.strokeStyle = isHovered
          ? node.color
          : isCatMatch
          ? 'rgba(255, 255, 255, 0.08)'
          : 'rgba(255, 255, 255, 0.02)';
        ctx.lineWidth = isHovered ? 2 : 1;
        ctx.stroke();

        // Connect neighbor node in same category
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          if (other.category === node.category) {
            const dist = Math.hypot(node.x - other.x, node.y - other.y);
            if (dist < 260) {
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(other.x, other.y);
              ctx.strokeStyle =
                isHovered || hoveredNode?.id === other.id
                  ? `${node.color}55`
                  : isCatMatch
                  ? `${node.color}20`
                  : 'rgba(255, 255, 255, 0.015)';
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
      });

      // Draw Central Node: KEERTHISHA
      const centerPulse = Math.sin(time * 2) * 4;
      // Ambient glow
      const grad = ctx.createRadialGradient(
        curCenterX,
        curCenterY,
        10,
        curCenterX,
        curCenterY,
        60 + centerPulse
      );
      grad.addColorStop(0, 'rgba(56, 189, 248, 0.4)');
      grad.addColorStop(0.5, 'rgba(99, 102, 241, 0.15)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(curCenterX, curCenterY, 60 + centerPulse, 0, Math.PI * 2);
      ctx.fill();

      // Center core
      ctx.beginPath();
      ctx.arc(curCenterX, curCenterY, 36, 0, Math.PI * 2);
      ctx.fillStyle = '#090d16';
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Center text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('KEERTHISHA', curCenterX, curCenterY - 9);
      ctx.fillText('SRINIVASAN', curCenterX, curCenterY + 2);
      ctx.font = '7px "JetBrains Mono", monospace';
      ctx.fillStyle = '#38bdf8';
      ctx.fillText('AI CORE', curCenterX, curCenterY + 14);

      // Draw surrounding nodes
      nodes.forEach((node) => {
        // Gentle organic hover/float movement
        node.x += node.vx + Math.sin(time + node.x * 0.01) * 0.15;
        node.y += node.vy + Math.cos(time + node.y * 0.01) * 0.15;

        const isMatch = activeCategory === 'All' || node.category === activeCategory;
        const isHovered = hoveredNode?.id === node.id || selectedNode?.id === node.id;

        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, isHovered ? 24 : isMatch ? 18 : 14, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? '#131d33' : isMatch ? '#0d131f' : '#080c14';
        ctx.fill();

        ctx.strokeStyle = isHovered ? node.color : isMatch ? `${node.color}99` : 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = isHovered ? 2.5 : 1.5;
        ctx.stroke();

        // Node glow when active
        if (isHovered) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, 30, 0, Math.PI * 2);
          ctx.strokeStyle = `${node.color}40`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Text label
        ctx.fillStyle = isHovered ? '#ffffff' : isMatch ? '#cbd5e1' : '#64748b';
        ctx.font = `${isHovered ? 'bold 11px' : '10px'} "JetBrains Mono", monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.name, node.x, node.y);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Mouse movement interaction on canvas
    const handleCanvasMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let found: SkillNode | null = null;
      for (const node of nodes) {
        const dist = Math.hypot(node.x - mouseX, node.y - mouseY);
        if (dist < 26) {
          found = PORTFOLIO_DATA.skills.find((s) => s.id === node.id) || null;
          break;
        }
      }

      setHoveredNode(found);
      canvas.style.cursor = found ? 'pointer' : 'default';
    };

    const handleCanvasClick = () => {
      if (hoveredNode) {
        setSelectedNode(hoveredNode);
      }
    };

    canvas.addEventListener('mousemove', handleCanvasMouseMove);
    canvas.addEventListener('click', handleCanvasClick);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleCanvasMouseMove);
      canvas.removeEventListener('click', handleCanvasClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeCategory, categoryColors, hoveredNode?.id, selectedNode?.id]);

  const displayedSkill = hoveredNode || selectedNode || PORTFOLIO_DATA.skills[0];

  return (
    <div ref={containerRef} className="relative w-full flex flex-col items-center">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6 z-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 border ${
              activeCategory === cat
                ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40 shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                : 'bg-slate-900/60 text-slate-400 border-white/5 hover:text-slate-200 hover:border-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Canvas Area */}
      <div className="relative w-full max-w-5xl rounded-2xl bg-gradient-to-b from-[#090d16]/80 to-[#04060a]/90 border border-white/[0.08] backdrop-blur-xl overflow-hidden shadow-2xl">
        <canvas ref={canvasRef} className="w-full h-auto block" />

        {/* Selected / Hovered Skill Detail Floating Overlay */}
        {displayedSkill && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm rounded-xl bg-slate-950/90 border border-cyan-500/30 backdrop-blur-xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-all duration-200">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <h4 className="text-sm font-semibold font-mono text-white tracking-wide">
                  {displayedSkill.name}
                </h4>
              </div>
              <Badge variant="cyan" size="sm">
                {displayedSkill.category}
              </Badge>
            </div>
            <p className="text-xs text-slate-300 mb-2 leading-relaxed">
              {displayedSkill.description}
            </p>
            <div className="pt-2 border-t border-white/10 text-[11px] font-mono text-cyan-300/90 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
              <span>{displayedSkill.projectUsage}</span>
            </div>
          </div>
        )}

        {/* Hint indicator top right */}
        <div className="absolute top-4 right-4 hidden sm:flex items-center gap-2 text-[11px] font-mono text-slate-400 bg-black/40 px-3 py-1 rounded-full border border-white/5 pointer-events-none">
          <Layers className="w-3 h-3 text-cyan-400" />
          <span>Interactive 3D Network • Hover or tap nodes</span>
        </div>
      </div>
    </div>
  );
};
