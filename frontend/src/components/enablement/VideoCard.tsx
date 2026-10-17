import React from 'react';
import { HowToVideo } from '../../types/enablement';
import { Play, CheckCircle2, Clock, Check } from 'lucide-react';

interface VideoCardProps {
  video: HowToVideo;
  onPlay: (video: HowToVideo) => void;
  onToggleWatched: (id: string, e: React.MouseEvent) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  video,
  onPlay,
  onToggleWatched,
}) => {
  return (
    <div
      onClick={() => onPlay(video)}
      className="rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between group cursor-pointer"
    >
      <div>
        {/* Video Thumbnail with Play Button Overlay */}
        <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
          <img
            src={video.thumbnailUrl}
            alt={video.headline}
            className="w-full h-full object-cover object-center opacity-85 group-hover:scale-105 group-hover:opacity-95 transition-all duration-300"
          />

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />

          {/* Play Button Icon in Center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-11 w-11 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#F28C28] group-hover:text-white transition-all duration-200">
              <Play className="h-5 w-5 fill-current ml-0.5" />
            </div>
          </div>

          {/* Featured Badge */}
          {video.isFeatured && (
            <div className="absolute top-2.5 left-2.5">
              <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider bg-[#F28C28] text-[#0B1F3A] shadow-xs">
                FEATURED VIDEO
              </span>
            </div>
          )}

          {/* Duration Badge Bottom Right */}
          <div className="absolute bottom-2 right-2">
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-black/80 text-white backdrop-blur-xs flex items-center gap-1">
              <Clock className="h-2.5 w-2.5" />
              {video.durationStr}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4">
          <div className="text-[11px] font-mono font-bold text-blue-600 mb-1">
            {video.title}
          </div>

          <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-blue-700 transition-colors mb-1.5">
            {video.headline}
          </h3>

          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
            {video.description}
          </p>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-3 px-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="font-bold text-blue-600 flex items-center gap-1 text-[11px] group-hover:underline">
          <Play className="h-3 w-3 fill-current" />
          <span>Watch Video ({video.durationStr.split(':')[0]}m)</span>
        </span>

        <button
          type="button"
          onClick={(e) => onToggleWatched(video.id, e)}
          className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
            video.isWatched
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold'
              : 'text-slate-500 hover:bg-slate-200/60'
          }`}
        >
          {video.isWatched ? (
            <>
              <Check className="h-3 w-3 text-emerald-600" />
              <span>Watched</span>
            </>
          ) : (
            <span>Mark as Watched</span>
          )}
        </button>
      </div>
    </div>
  );
};
