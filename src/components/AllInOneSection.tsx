import React from 'react';
import { Sparkles, Check, ArrowRight } from 'lucide-react';

interface AllInOneSectionProps {
  onStartPlanning: () => void;
}

export const AllInOneSection: React.FC<AllInOneSectionProps> = ({ onStartPlanning }) => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="overflow-hidden rounded-[36px] border border-[#e5dfd0] bg-white shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-14">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#a985d9]/25 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#7a5cb8] w-fit">
              <Sparkles className="h-3 w-3" />
              Everything Handled
            </div>

            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-[#2a1a3d] sm:text-4xl">
              All in one India trip planner
            </h2>

            <p className="mt-4 text-base text-[#6b5b7a] leading-relaxed">
              No more copying coordinates into Google Maps, deciphering IRCTC train waitlists, or guessing which fort requires a pre-booked ASI ticket. WanderPulse does the heavy lifting so you can focus on savoring the journey.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-[#2a1a3d]">
              <li className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span><strong>Real Indian Railway timings</strong> with Vande Bharat & Rajdhani express comparisons</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span><strong>Curated boutique stays</strong> from Kerala houseboats to Rajasthan heritage havelis</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span><strong>Monsoon & festival timing alerts</strong> like Pushkar Fair, Durga Puja, and Ladakhi passes</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span><strong>Transparent INR budget breakdowns</strong> covering entry fees, drivers, stays, and meals</span>
              </li>
            </ul>

            <div className="mt-8">
              <button
                type="button"
                onClick={onStartPlanning}
                className="inline-flex items-center gap-2 rounded-full bg-[#7a5cb8] px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-[#2a1a3d]"
              >
                <span>Create a new trip</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="relative min-h-[320px] bg-[#efeadb] lg:min-h-full">
            <img
              src="/images/kerala-backwaters.jpg"
              alt="Traditional Kerala Houseboat in backwaters"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="rounded-2xl bg-black/40 p-4 backdrop-blur-md border border-white/20">
                <div className="text-xs uppercase font-semibold text-[#e9b949]">Insider Advice</div>
                <div className="mt-1 text-sm text-white/95">
                  “WanderPulse helped us book an eco-solar houseboat in Alleppey and avoid the loud diesel cruisers. Best sleep of the whole trip.”
                </div>
                <div className="mt-2 text-[11px] text-white/75">— Meera & Siddharth, Bengaluru</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
