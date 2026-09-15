import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CtaBannerProps {
  onStartPlanning: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onStartPlanning }) => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#7a5cb8] via-[#8e6fcb] to-[#a985d9] px-6 py-16 text-center text-white shadow-xl sm:px-12 sm:py-20">
        {/* Background kite watermark */}
        <div className="pointer-events-none absolute -right-16 -top-16 opacity-15">
          <img
            src="/brand/kite/winnie-kite-symbol.svg"
            alt=""
            className="h-80 w-80 text-white"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-2xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur">
            <Sparkles className="h-3 w-3" />
            100% Free & No Sign-Up Required
          </div>

          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Ready to give it a try?
          </h2>

          <p className="mt-4 text-base text-white/90 sm:text-lg">
            See how WanderPulse turns any idea into a full India trip in under a minute. Complete with real train routes, boutique stays, and authentic local food.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={onStartPlanning}
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-bold text-[#2a1a3d] shadow-lg transition hover:bg-[#f7f4ec] hover:scale-105 active:scale-95"
            >
              <span>Try WanderPulse now</span>
              <ArrowRight className="h-4 w-4 text-[#7a5cb8]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
