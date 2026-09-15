import React from 'react';
import { Sparkles, Mail } from 'lucide-react';

export const FounderNote: React.FC = () => {
  return (
    <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl border border-[#e5dfd0] bg-[#ffffff] p-6 sm:p-10 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5dfd0]/60 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#a985d9]/25 text-[#7a5cb8] font-display font-bold text-lg">
              WP
            </div>
            <div>
              <div className="font-display font-bold text-lg text-[#2a1a3d]">A note from the team</div>
              <div className="text-xs text-[#6b5b7a]">WanderPulse (wanderpulse.com)</div>
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#e9b949]/20 px-3 py-1 text-xs font-semibold text-yellow-950 w-fit">
            <Sparkles className="h-3 w-3 text-yellow-800" />
            Active Beta • 350+ Travelers
          </div>
        </div>

        <blockquote className="mt-5 text-sm sm:text-base leading-relaxed text-[#2a1a3d]/90">
          “We started WanderPulse because planning an India trip is equal parts thrilling and overwhelming. Most international tools give you generic templates, hallucinated train stations, or ignore monsoon weather patterns entirely. WanderPulse is built from scratch specifically for India: real Indian train classes (Vande Bharat, Rajdhani, 2AC, 3AC), realistic INR budgets, and the kind of insider tips a knowledgeable friend would give over masala chai.”
        </blockquote>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-[#6b5b7a]">
          <span>Got feedback, a dream itinerary, or spotted a glitch?</span>
          <a
            href="mailto:hello@wanderpulse.com"
            className="inline-flex items-center gap-1 font-semibold text-[#7a5cb8] hover:underline"
          >
            <Mail className="h-3.5 w-3.5" />
            hello@wanderpulse.com
          </a>
        </div>
      </div>
    </section>
  );
};
