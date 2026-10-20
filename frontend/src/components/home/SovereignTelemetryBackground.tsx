import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Activity, Radio, Cpu, Shield, Sparkles, Sliders } from 'lucide-react';

interface TelemetryNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  radius: number;
  pulsePhase: number;
  pulseSpeed: number;
  color: string;
  label?: string;
  sublabel?: string;
  tier: 1 | 2 | 3; // Tier 1: Key Industrial Hub, Tier 2: State node, Tier 3: District micro-packet
  glow: number;
}

interface DataPacket {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  color: string;
  size: number;
}

interface SovereignTelemetryBackgroundProps {
  interactive?: boolean;
  intensity?: 'subtle' | 'standard' | 'high';
  className?: string;
  children?: React.ReactNode;
}

const STRATEGIC_CORRIDORS: { name: string; sub: string; color: string }[] = [
  { name: 'DELHI-NCR', sub: 'National Command Bus', color: '#38BDF8' },
  { name: 'PUNE-CHAKAN', sub: 'Auto & Tooling Cluster', color: '#F28C28' },
  { name: 'DHOLERA-SIR', sub: 'Semiconductor ATMP Fab', color: '#10B981' },
  { name: 'SRIPERUMBUDUR', sub: 'ESDM & EV Corridor', color: '#38BDF8' },
  { name: 'SANAND', sub: 'Lithium Battery Hub', color: '#FBBF24' },
  { name: 'BENGALURU', sub: 'Aerospace & Precision', color: '#818CF8' },
  { name: 'HYDERABAD', sub: 'Pharma & MedTech', color: '#38BDF8' },
  { name: 'JAMSHEDPUR', sub: 'Metallurgy & Heavy Eng', color: '#F28C28' },
  { name: 'COIMBATORE', sub: 'Industrial Motors & Textiles', color: '#10B981' },
  { name: 'AHMEDABAD', sub: 'Engineering Corridor', color: '#FBBF24' },
  { name: 'MUMBAI-THANE', sub: 'FinTech & Cloud Data Hub', color: '#38BDF8' },
  { name: 'NOIDA-GREATER NOIDA', sub: 'Electronics Assembly', color: '#818CF8' },
];

export const SovereignTelemetryBackground: React.FC<SovereignTelemetryBackgroundProps> = ({
  interactive = true,
  intensity = 'standard',
  className = '',
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean; radius: number }>({
    x: -1000,
    y: -1000,
    active: false,
    radius: 200,
  });

  const [fps, setFps] = useState(60);
  const [streamActive, setStreamActive] = useState(true);
  const [radarActive, setRadarActive] = useState(true);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    let nodes: TelemetryNode[] = [];
    let packets: DataPacket[] = [];
    let radarAngle = 0;

    const resize = () => {
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = Math.max(rect.height, window.innerHeight);
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      initNodes();
    };

    const initNodes = () => {
      nodes = [];
      packets = [];

      const targetCount = Math.floor(Math.max(32, Math.min(68, (width * height) / 20000)));

      const palette = [
        '#F28C28', // Saffron
        '#38BDF8', // Cyan
        '#10B981', // Emerald
        '#FBBF24', // Amber
        '#60A5FA', // Sky
        '#818CF8', // Indigo
      ];

      for (let i = 0; i < targetCount; i++) {
        const isStrategic = i < STRATEGIC_CORRIDORS.length;
        const corridor = isStrategic ? STRATEGIC_CORRIDORS[i] : null;
        const color = corridor ? corridor.color : palette[i % palette.length];
        const tier: 1 | 2 | 3 = isStrategic ? 1 : i % 3 === 0 ? 2 : 3;
        const baseRadius = tier === 1 ? 4.5 : tier === 2 ? 3 : 2;

        nodes.push({
          x: Math.random() * (width - 40) + 20,
          y: Math.random() * (height - 40) + 20,
          vx: (Math.random() - 0.5) * (tier === 1 ? 0.3 : 0.55),
          vy: (Math.random() - 0.5) * (tier === 1 ? 0.3 : 0.55),
          baseRadius,
          radius: baseRadius,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.03,
          color,
          label: corridor ? corridor.name : undefined,
          sublabel: corridor ? corridor.sub : undefined,
          tier,
          glow: tier === 1 ? 18 : 8,
        });
      }

      // Initial data packets
      const packetCount = intensity === 'high' ? 40 : intensity === 'subtle' ? 14 : 26;
      for (let p = 0; p < packetCount; p++) {
        spawnPacket();
      }
    };

    const spawnPacket = () => {
      if (nodes.length < 2) return;
      const from = Math.floor(Math.random() * nodes.length);
      let to = Math.floor(Math.random() * nodes.length);
      while (to === from) {
        to = Math.floor(Math.random() * nodes.length);
      }
      packets.push({
        fromNode: from,
        toNode: to,
        progress: 0,
        speed: 0.0035 + Math.random() * 0.007,
        color: Math.random() > 0.45 ? '#38BDF8' : '#F28C28',
        size: 1.5 + Math.random() * 1.5,
      });
    };

    let lastTime = performance.now();
    let frameCount = 0;

    const render = (time: number) => {
      frameCount++;
      if (time - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (time - lastTime)));
        frameCount = 0;
        lastTime = time;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Digital Telemetry Grid Matrix
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.035)';
      const gridSize = 90;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();

        // Crosshairs at grid intersections
        for (let y = 0; y < height; y += gridSize) {
          ctx.fillStyle = 'rgba(56, 189, 248, 0.1)';
          ctx.fillRect(x - 1.5, y - 1.5, 3, 3);
        }
      }

      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Rotating Radar/Sonar Sweep (Situational Telemetry Core)
      if (radarActive && !isReducedMotion) {
        const radarCenterX = width * 0.5;
        const radarCenterY = height * 0.32;
        const maxRadarRadius = Math.max(width, height) * 0.75;

        radarAngle = (radarAngle + 0.006) % (Math.PI * 2);

        const radarGrad = ctx.createRadialGradient(
          radarCenterX,
          radarCenterY,
          0,
          radarCenterX,
          radarCenterY,
          maxRadarRadius
        );
        radarGrad.addColorStop(0, 'rgba(56, 189, 248, 0.045)');
        radarGrad.addColorStop(0.5, 'rgba(242, 140, 40, 0.02)');
        radarGrad.addColorStop(1, 'transparent');

        ctx.save();
        ctx.fillStyle = radarGrad;
        ctx.beginPath();
        ctx.moveTo(radarCenterX, radarCenterY);
        ctx.arc(radarCenterX, radarCenterY, maxRadarRadius, radarAngle - 0.28, radarAngle);
        ctx.closePath();
        ctx.fill();

        // Fine illuminated radar leading edge
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.22)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(radarCenterX, radarCenterY);
        ctx.lineTo(
          radarCenterX + Math.cos(radarAngle) * maxRadarRadius,
          radarCenterY + Math.sin(radarAngle) * maxRadarRadius
        );
        ctx.stroke();

        // Concentric radar range marker rings
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.03)';
        ctx.lineWidth = 0.8;
        for (let r = 180; r < maxRadarRadius; r += 180) {
          ctx.beginPath();
          ctx.arc(radarCenterX, radarCenterY, r, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
      }

      // 3. Connect Nodes with Dynamic Inter-Cluster Conduits
      const maxDist = 165;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.25;
            const isCorridorLine = nodes[i].tier === 1 || nodes[j].tier === 1;

            ctx.strokeStyle = isCorridorLine
              ? `rgba(242, 140, 40, ${alpha * 1.25})`
              : `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = isCorridorLine ? 1.1 : 0.6;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // 4. Data Packets Traveling Along Conduits
      if (streamActive) {
        for (let k = packets.length - 1; k >= 0; k--) {
          const p = packets[k];
          const from = nodes[p.fromNode];
          const to = nodes[p.toNode];

          if (!from || !to) {
            packets.splice(k, 1);
            spawnPacket();
            continue;
          }

          p.progress += isReducedMotion ? 0 : p.speed;
          if (p.progress >= 1) {
            packets.splice(k, 1);
            spawnPacket();
            continue;
          }

          const currX = from.x + (to.x - from.x) * p.progress;
          const currY = from.y + (to.y - from.y) * p.progress;

          ctx.shadowBlur = 9;
          ctx.shadowColor = p.color;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(currX, currY, p.size, 0, Math.PI * 2);
          ctx.fill();

          // Tail streak
          const trailLength = 0.06;
          const trailStartX = from.x + (to.x - from.x) * Math.max(0, p.progress - trailLength);
          const trailStartY = from.y + (to.y - from.y) * Math.max(0, p.progress - trailLength);

          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(trailStartX, trailStartY);
          ctx.lineTo(currX, currY);
          ctx.stroke();

          ctx.shadowBlur = 0;
        }
      }

      // 5. Update and Render Nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        if (!isReducedMotion) {
          n.pulsePhase += n.pulseSpeed;
          n.radius = n.baseRadius + Math.sin(n.pulsePhase) * 1.3;

          n.x += n.vx;
          n.y += n.vy;

          if (n.x < 15) {
            n.x = 15;
            n.vx *= -1;
          } else if (n.x > width - 15) {
            n.x = width - 15;
            n.vx *= -1;
          }
          if (n.y < 15) {
            n.y = 15;
            n.vy *= -1;
          } else if (n.y > height - 15) {
            n.y = height - 15;
            n.vy *= -1;
          }

          // Interactive Cursor Elastic Tethering
          if (mouseRef.current.active) {
            const mdx = mouseRef.current.x - n.x;
            const mdy = mouseRef.current.y - n.y;
            const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

            if (mDist < mouseRef.current.radius) {
              const force = (1 - mDist / mouseRef.current.radius) * 1.6;
              n.x -= (mdx / mDist) * force * 1.6;
              n.y -= (mdy / mDist) * force * 1.6;

              ctx.strokeStyle = `rgba(56, 189, 248, ${(1 - mDist / mouseRef.current.radius) * 0.45})`;
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(n.x, n.y);
              ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
              ctx.stroke();
            }
          }
        }

        // Draw Node Core
        ctx.shadowBlur = n.glow;
        ctx.shadowColor = n.color;
        ctx.fillStyle = n.color;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Concentric beacon pulses for Tier 1 Major Corridors
        if (n.tier === 1) {
          ctx.strokeStyle = `${n.color}66`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius + 4 + Math.sin(n.pulsePhase) * 2.5, 0, Math.PI * 2);
          ctx.stroke();

          // Render Label for Strategic Industrial Hubs
          if (n.label) {
            ctx.font = 'bold 9px "JetBrains Mono", ui-monospace, monospace';
            ctx.fillStyle = '#F8FAFC';
            ctx.fillText(n.label, n.x + 9, n.y + 1);

            if (n.sublabel) {
              ctx.font = '8px "JetBrains Mono", ui-monospace, monospace';
              ctx.fillStyle = '#94A3B8';
              ctx.fillText(n.sublabel, n.x + 9, n.y + 11);
            }
          }
        }
      }

      // 6. Interactive Mouse Ripple
      if (mouseRef.current.active) {
        const cursorGrad = ctx.createRadialGradient(
          mouseRef.current.x,
          mouseRef.current.y,
          0,
          mouseRef.current.x,
          mouseRef.current.y,
          mouseRef.current.radius
        );
        cursorGrad.addColorStop(0, 'rgba(56, 189, 248, 0.14)');
        cursorGrad.addColorStop(0.5, 'rgba(242, 140, 40, 0.05)');
        cursorGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = cursorGrad;
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, mouseRef.current.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    resize();
    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(container);

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [intensity, isReducedMotion, streamActive, radarActive]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
      radius: 200,
    };
  }, [interactive]);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.active = false;
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full max-w-full min-h-screen bg-[#020B17] overflow-hidden overflow-x-hidden text-slate-100 ${className}`}
    >
      {/* 1. Dynamic Animated Telemetry Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* 2. Atmospheric Sovereign Auroras (Strictly contained within bounds to prevent any viewport spill) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[5%] w-[50%] h-[50%] max-w-[800px] max-h-[800px] rounded-full bg-[radial-gradient(circle_at_center,rgba(10,61,98,0.38)_0%,rgba(2,11,23,0)_72%)] blur-3xl" />
        <div className="absolute top-[15%] right-0 w-[45%] h-[45%] max-w-[700px] max-h-[700px] rounded-full bg-[radial-gradient(circle_at_center,rgba(242,140,40,0.16)_0%,rgba(2,11,23,0)_70%)] blur-3xl" />
        <div className="absolute bottom-[5%] left-[15%] w-[55%] h-[45%] max-w-[900px] max-h-[700px] rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.13)_0%,rgba(2,11,23,0)_70%)] blur-3xl" />
      </div>

      {/* 3. High-Tech Grid Coordinate HUD Badges */}
      <div className="absolute top-2.5 left-4 hidden xl:flex items-center gap-3 text-[10px] font-mono text-slate-400 select-none pointer-events-none z-10">
        <span className="flex items-center gap-1.5 text-[#38BDF8]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8] animate-ping" />
          <span className="font-bold">SOVEREIGN TELEMETRY MESH ONLINE</span>
        </span>
        <span className="text-slate-600">/</span>
        <span>COORDINATES: 28.6139° N · 77.2090° E</span>
        <span className="text-slate-600">/</span>
        <span className="text-emerald-400 font-bold">NIC MEGHRAJ CLOUD TIER-4</span>
      </div>

      <div className="absolute top-2.5 right-4 hidden xl:flex items-center gap-3 text-[10px] font-mono text-slate-400 select-none pointer-events-none z-10">
        <span className="text-slate-300 font-semibold">FPS: {fps}</span>
        <span className="text-slate-600">/</span>
        <span className="text-[#F28C28] font-bold">CORRIDORS: 22 CONNECTED</span>
        <span className="text-slate-600">/</span>
        <span className="text-sky-300 font-medium">e-SHRAM / EPFO BUS: ACTIVE</span>
      </div>

      {/* 4. Telemetry Telemetry Quick Control Pill (Bottom Left) */}
      <div className="fixed bottom-4 left-4 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700/70 text-[10px] font-mono z-30 shadow-xl">
        <span className="flex items-center gap-1.5 text-slate-300 font-bold">
          <Activity className="h-3 w-3 text-[#F28C28]" />
          <span>Telemetry Mesh:</span>
        </span>
        <button
          onClick={() => setStreamActive(!streamActive)}
          className={`px-2 py-0.5 rounded text-[9px] font-bold transition-all cursor-pointer ${
            streamActive ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40' : 'bg-slate-800 text-slate-500'
          }`}
          title="Toggle Data Streams Flow"
        >
          {streamActive ? 'Streams ON' : 'Streams PAUSED'}
        </button>
        <button
          onClick={() => setRadarActive(!radarActive)}
          className={`px-2 py-0.5 rounded text-[9px] font-bold transition-all cursor-pointer ${
            radarActive ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-500'
          }`}
          title="Toggle Radar Sweep"
        >
          {radarActive ? 'Radar ON' : 'Radar OFF'}
        </button>
      </div>

      {/* 5. Main Page Content Layer */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};
