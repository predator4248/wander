import React from 'react';

interface FooterProps {
  onPickPrompt?: (prompt: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onPickPrompt }) => {
  return (
    <footer className="border-t border-[#e5dfd0] bg-[#f0eae0]/60 pb-16 pt-16 text-[#2a1a3d]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6 lg:gap-8">
          {/* Logo & Intro column */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <img
                src="/brand/kite/winnie-kite-symbol.svg"
                alt="WanderPulse"
                className="h-8 w-auto"
              />
              <span className="font-display text-2xl font-bold tracking-tight text-[#2a1a3d] flex items-center">
                Wander<span className="text-[#7a5cb8]">Pulse</span>
              </span>
            </div>
            <p className="text-sm text-[#6b5b7a] leading-relaxed max-w-sm">
              The AI trip planner for India. Only India, always warm. Real train classes, authentic INR costs, and hidden gems from Ladakh to Kanyakumari.
            </p>
            <div className="text-xs text-[#6b5b7a]">
              Built with care for India travelers worldwide.
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-[#2a1a3d]">
              Product
            </h4>
            <ul className="mt-4 space-y-2 text-xs text-[#6b5b7a]">
              <li><a href="#features" className="hover:text-[#7a5cb8] transition">Features</a></li>
              <li><a href="#features" className="hover:text-[#7a5cb8] transition">How it works</a></li>
              <li><a href="#faq" className="hover:text-[#7a5cb8] transition">FAQ</a></li>
              <li><a href="mailto:hello@wanderpulse.com" className="hover:text-[#7a5cb8] transition">Contact</a></li>
            </ul>
          </div>

          {/* Compare */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-[#2a1a3d]">
              Compare
            </h4>
            <ul className="mt-4 space-y-2 text-xs text-[#6b5b7a]">
              <li><a href="#compare" className="hover:text-[#7a5cb8] transition">vs Layla</a></li>
              <li><a href="#compare" className="hover:text-[#7a5cb8] transition">vs Mindtrip</a></li>
              <li><a href="#compare" className="hover:text-[#7a5cb8] transition">vs ChatGPT</a></li>
              <li><a href="#compare" className="hover:text-[#7a5cb8] transition">vs Wonderplan</a></li>
              <li><a href="#compare" className="hover:text-[#7a5cb8] transition">vs MakeMyTrip</a></li>
            </ul>
          </div>

          {/* Best For */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-[#2a1a3d]">
              Best for
            </h4>
            <ul className="mt-4 space-y-2 text-xs text-[#6b5b7a]">
              <li><a href="#for-you" className="hover:text-[#7a5cb8] transition">Honeymoons</a></li>
              <li><a href="#for-you" className="hover:text-[#7a5cb8] transition">Families</a></li>
              <li><a href="#for-you" className="hover:text-[#7a5cb8] transition">First-timers</a></li>
              <li><a href="#for-you" className="hover:text-[#7a5cb8] transition">Solo female</a></li>
              <li><a href="#for-you" className="hover:text-[#7a5cb8] transition">NRIs</a></li>
            </ul>
          </div>

          {/* Top Circuits */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-[#2a1a3d]">
              Circuits
            </h4>
            <ul className="mt-4 space-y-2 text-xs text-[#6b5b7a]">
              <li>
                <button
                  type="button"
                  onClick={() => onPickPrompt?.('Golden Triangle 7 days')}
                  className="hover:text-[#7a5cb8] transition text-left"
                >
                  Golden Triangle
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onPickPrompt?.('Kerala Backwaters 8 days')}
                  className="hover:text-[#7a5cb8] transition text-left"
                >
                  Kerala Backwaters
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onPickPrompt?.('Manali to Leh 10 days')}
                  className="hover:text-[#7a5cb8] transition text-left"
                >
                  Manali to Leh
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onPickPrompt?.('Rajasthan Palaces 9 days')}
                  className="hover:text-[#7a5cb8] transition text-left"
                >
                  Rajasthan Palaces
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onPickPrompt?.('Goa and Gokarna 6 days')}
                  className="hover:text-[#7a5cb8] transition text-left"
                >
                  Goa & Gokarna
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="mt-12 border-t border-[#e5dfd0] pt-8 text-xs text-[#6b5b7a] space-y-2">
          <p>
            <strong>Disclaimer:</strong> WanderPulse (wanderpulse.com) is an AI trip planner focused on travel within India.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <span>© {new Date().getFullYear()} WanderPulse (wanderpulse.com). All rights reserved.</span>
            <div className="flex items-center gap-4 text-xs">
              <span className="hover:text-[#2a1a3d] cursor-pointer">Privacy Policy</span>
              <span>•</span>
              <span className="hover:text-[#2a1a3d] cursor-pointer">Terms of Service</span>
              <span>•</span>
              <span>Made with ❤️ for India travel</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
