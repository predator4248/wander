import React from 'react';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { COMPARISONS } from '../data/wanderpulseData';

export const ComparisonSection: React.FC = () => {
  return (
    <section id="compare" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="inline-flex items-center gap-1.5 rounded-full bg-[#a985d9]/25 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#7a5cb8]">
        Compare
      </div>

      <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl text-[#2a1a3d]">
        How WanderPulse beats
        <br />
        the alternatives for India
      </h2>
      <p className="mt-2 max-w-2xl text-base text-[#6b5b7a] sm:text-lg">
        General-purpose AI hallucinates non-existent trains. OTAs push high-commission package tours. WanderPulse gives you an honest, hyper-curated plan first.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {COMPARISONS.map((comp) => (
          <div
            key={comp.name}
            className="flex flex-col justify-between rounded-3xl border border-[#e5dfd0] bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7a5cb8]">
                  WanderPulse vs {comp.name}
                </span>
                <span className="rounded-full bg-[#efeadb] px-2.5 py-0.5 text-xs font-semibold text-[#2a1a3d]">
                  India Focus
                </span>
              </div>
              <h3 className="mt-3 font-display text-2xl font-bold text-[#2a1a3d]">{comp.name}</h3>
              <p className="mt-2 text-sm text-[#6b5b7a] leading-relaxed">{comp.angle}</p>
            </div>

            <div className="mt-6 space-y-2.5 border-t border-[#e5dfd0]/60 pt-4 text-xs">
              <div className="flex items-center gap-2 text-emerald-800 font-medium">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                <span>WanderPulse: Real INR costs, live route feasibility</span>
              </div>
              <div className="flex items-center gap-2 text-[#6b5b7a]">
                <XCircle className="h-4 w-4 text-rose-400 flex-shrink-0" />
                <span>{comp.name}: Generic templates or booking upsells</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
