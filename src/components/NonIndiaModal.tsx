import React from 'react';
import { MapPinOff, Sparkles, X, ArrowRight } from 'lucide-react';
import { buildNonIndiaRedirect } from '../data/wanderpulseData';
import { NonIndiaMatch } from '../types';

interface NonIndiaModalProps {
  match: NonIndiaMatch | null;
  onClose: () => void;
  onSelectAlternative: (alternative: string) => void;
}

export const NonIndiaModal: React.FC<NonIndiaModalProps> = ({
  match,
  onClose,
  onSelectAlternative,
}) => {
  if (!match) return null;

  const explanation = buildNonIndiaRedirect(match);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg overflow-hidden rounded-[32px] border border-[#e5dfd0] bg-white p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#efeadb] text-[#2a1a3d] hover:bg-[#e5dfd0] transition"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
            <MapPinOff className="h-6 w-6" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#7a5cb8]">
              India Exclusive
            </div>
            <h3 className="font-display text-xl font-bold text-[#2a1a3d]">
              WanderPulse plans only inside India
            </h3>
          </div>
        </div>

        <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#2a1a3d]/85">
          {explanation}
        </p>

        <div className="mt-6">
          <div className="text-xs font-bold uppercase tracking-wider text-[#6b5b7a] mb-2">
            Try these Indian alternatives instead:
          </div>
          <div className="flex flex-wrap gap-2">
            {match.alternatives.map((alt) => (
              <button
                key={alt}
                type="button"
                onClick={() => {
                  onSelectAlternative(`Plan a 6-day trip to ${alt}`);
                  onClose();
                }}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#7a5cb8]/30 bg-[#a985d9]/15 px-3.5 py-1.5 text-xs font-semibold text-[#2a1a3d] transition hover:bg-[#7a5cb8] hover:text-white"
              >
                <Sparkles className="h-3 w-3 text-[#7a5cb8]" />
                <span>{alt}</span>
                <ArrowRight className="h-3 w-3 ml-0.5 opacity-60" />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-[#efeadb] px-4 py-2 text-xs font-semibold text-[#2a1a3d] hover:bg-[#e5dfd0] transition"
          >
            I'll pick an Indian city
          </button>
        </div>
      </div>
    </div>
  );
};
