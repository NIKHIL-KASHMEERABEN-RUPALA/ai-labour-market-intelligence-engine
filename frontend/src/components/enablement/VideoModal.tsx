import React, { useState } from 'react';
import { HowToVideo } from '../../types/enablement';
import {
  X,
  Play,
  Pause,
  CheckCircle2,
  Volume2,
  VolumeX,
  Maximize2,
  Subtitles,
  RotateCcw,
} from 'lucide-react';

interface VideoModalProps {
  video: HowToVideo | null;
  isOpen: boolean;
  onClose: () => void;
  onMarkWatched: (id: string) => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  video,
  isOpen,
  onClose,
  onMarkWatched,
  onShowToast,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [subtitlesLang, setSubtitlesLang] = useState<'en' | 'hi'>('en');

  if (!isOpen || !video) return null;

  const handleComplete = () => {
    onMarkWatched(video.id);
    onShowToast('Video Completed', `Recorded completion for ${video.headline}`, 'success');
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-slate-900 rounded-2xl shadow-2xl max-w-3xl w-full border border-slate-700 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-3.5 px-4 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#F28C28] uppercase tracking-wider block">
              {video.title}
            </span>
            <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1">
              {video.headline}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Video Player Canvas */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
          <img
            src={video.thumbnailUrl}
            alt={video.headline}
            className="w-full h-full object-cover opacity-60"
          />

          {/* Subtitles Overlay */}
          <div className="absolute bottom-12 inset-x-4 text-center pointer-events-none">
            <span className="inline-block px-3 py-1.5 rounded-md bg-black/85 text-white text-xs sm:text-sm font-medium tracking-wide shadow-lg border border-white/10">
              {subtitlesLang === 'en'
                ? '“District collectors and skill officers can query 12-month projections to identify acute machinist shortages...”'
                : '“जिला कलेक्टर और कौशल अधिकारी तीव्र मशीनिस्ट कमी की पहचान करने के लिए १२ महीने के अनुमानों की जांच कर सकते हैं...”'}
            </span>
          </div>

          {/* Play/Pause Center Indicator */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute p-4 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-xs transition-transform hover:scale-110"
          >
            {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 fill-current ml-1" />}
          </button>

          {/* Player Bottom Bar */}
          <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-between text-white text-xs">
            <div className="flex items-center gap-3">
              <button onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
              </button>
              <button onClick={() => setIsMuted(!isMuted)}>
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
              <span className="font-mono text-[11px] text-slate-300">03:42 / {video.durationStr}</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Subtitles Toggle */}
              <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded font-mono text-[10px]">
                <Subtitles className="h-3 w-3" />
                <button
                  onClick={() => setSubtitlesLang('en')}
                  className={`px-1 rounded ${subtitlesLang === 'en' ? 'bg-[#F28C28] text-slate-900 font-bold' : 'text-slate-300'}`}
                >
                  EN
                </button>
                <button
                  onClick={() => setSubtitlesLang('hi')}
                  className={`px-1 rounded ${subtitlesLang === 'hi' ? 'bg-[#F28C28] text-slate-900 font-bold' : 'text-slate-300'}`}
                >
                  हिन्दी
                </button>
              </div>

              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                1080p Full HD
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 px-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs">
          <p className="text-slate-400 text-[11px] truncate max-w-md">
            {video.description}
          </p>

          <button
            onClick={handleComplete}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg flex items-center gap-1.5 transition-colors shadow-2xs shrink-0"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Mark as Watched</span>
          </button>
        </div>
      </div>
    </div>
  );
};
