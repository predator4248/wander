import React from 'react';
import { Compass, Sparkles, MapPin } from 'lucide-react';

interface NavbarProps {
  onPlanNewTrip: () => void;
  onOpenSaved?: () => void;
  activeView: 'home' | 'planner';
  onNavigateHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onPlanNewTrip,
  activeView,
  onNavigateHome,
}) => {
  return (
    <nav className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
      <button
        onClick={onNavigateHome}
        className="flex items-center gap-2.5 transition hover:opacity-90 focus:outline-none"
        aria-label="WanderPulse home"
      >
        <img
          src="/brand/kite/winnie-kite-symbol.svg"
          alt="WanderPulse"
          className="h-8 w-auto sm:h-9"
        />
        <span className="font-display text-2xl font-bold tracking-tight text-[#2a1a3d] flex items-center">
          Wander<span className="text-[#7a5cb8]">Pulse</span>
        </span>
      </button>

      <div className="flex items-center gap-3 text-sm font-medium sm:gap-6 text-[#2a1a3d]/80">
        <a
          href="#features"
          onClick={(e) => {
            if (activeView === 'planner') {
              e.preventDefault();
              onNavigateHome();
              setTimeout(() => {
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }
          }}
          className="hidden lg:inline transition hover:text-[#7a5cb8]"
        >
          Features
        </a>
        <a
          href="#compare"
          onClick={(e) => {
            if (activeView === 'planner') {
              e.preventDefault();
              onNavigateHome();
              setTimeout(() => {
                document.getElementById('compare')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }
          }}
          className="hidden md:inline transition hover:text-[#7a5cb8]"
        >
          Compare
        </a>
        <a
          href="#for-you"
          onClick={(e) => {
            if (activeView === 'planner') {
              e.preventDefault();
              onNavigateHome();
              setTimeout(() => {
                document.getElementById('for-you')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }
          }}
          className="hidden md:inline transition hover:text-[#7a5cb8]"
        >
          For you
        </a>
        <a
          href="#faq"
          onClick={(e) => {
            if (activeView === 'planner') {
              e.preventDefault();
              onNavigateHome();
              setTimeout(() => {
                document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }
          }}
          className="hidden sm:inline transition hover:text-[#7a5cb8]"
        >
          FAQ
        </a>

        {activeView === 'home' ? (
          <button
            onClick={onPlanNewTrip}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#7a5cb8] px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm transition hover:bg-[#2a1a3d]"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Plan a trip
          </button>
        ) : (
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#e5dfd0] bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-[#2a1a3d] shadow-sm transition hover:bg-[#efeadb]"
          >
            <Compass className="h-3.5 w-3.5 text-[#7a5cb8]" />
            Back to Home
          </button>
        )}
      </div>
    </nav>
  );
};
