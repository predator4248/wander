import React from 'react';
import { ArrowRight } from 'lucide-react';
import { FEATURED_ITINERARIES } from '../data/wanderpulseData';

interface FeaturedItinerariesProps {
  onPickItinerary: (query: string) => void;
}

export const FeaturedItineraries: React.FC<FeaturedItinerariesProps> = ({ onPickItinerary }) => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl text-[#2a1a3d]">
        Where to go next
      </h2>
      <p className="mt-2 max-w-2xl text-lg text-[#6b5b7a]">
        Get inspired by real India itineraries. Click any card to build your own.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURED_ITINERARIES.map((item) => (
          <button
            key={item.title}
            type="button"
            onClick={() => onPickItinerary(item.query)}
            className="group overflow-hidden rounded-3xl bg-white text-left shadow-sm ring-1 ring-[#e5dfd0] transition hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#7a5cb8]"
          >
            <div className="relative h-52 w-full overflow-hidden bg-[#efeadb]">
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="relative flex h-full flex-col justify-end p-4 text-white">
                <div className="text-lg font-semibold drop-shadow">{item.title}</div>
                <div className="text-sm text-white/90 drop-shadow">{item.subtitle}</div>
              </div>
            </div>

            <div className="flex items-center justify-between px-4 py-3 bg-white">
              <span className="text-sm font-semibold text-[#7a5cb8]">Start planning</span>
              <ArrowRight className="h-4 w-4 text-[#7a5cb8] transition group-hover:translate-x-1" />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
