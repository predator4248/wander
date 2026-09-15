import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { INSPIRATION_GALLERY } from '../data/wanderpulseData';

interface InspirationGridProps {
  onPickInspiration: (caption: string) => void;
}

export const InspirationGrid: React.FC<InspirationGridProps> = ({ onPickInspiration }) => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#e9b949]/25 px-3 py-1 text-xs font-bold uppercase tracking-wider text-yellow-950">
            <Sparkles className="h-3 w-3 text-yellow-800" />
            Inspiration
          </div>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl text-[#2a1a3d]">
            Less Stress.
            <br />
            More Serotonin.
          </h2>
          <p className="mt-2 text-base text-[#6b5b7a] sm:text-lg">
            Because your holiday should feel like a holiday.
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {INSPIRATION_GALLERY.map((item) => (
          <button
            key={item.caption}
            type="button"
            onClick={() => onPickInspiration(item.caption)}
            className="group relative aspect-square overflow-hidden rounded-3xl bg-[#efeadb] shadow-sm transition hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#7a5cb8]"
          >
            <img
              src={item.src}
              alt={item.caption}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <div className="relative flex h-full flex-col justify-end p-4 text-left text-white">
              <span className="font-display text-sm font-semibold leading-snug drop-shadow sm:text-base">
                {item.caption}
              </span>
              <span className="mt-1 flex items-center gap-1 text-[11px] font-bold text-[#e9b949] opacity-0 transition group-hover:opacity-100">
                Plan this →
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
