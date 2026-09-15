import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Paperclip,
  Mic,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Compass,
  Wand2,
  Mountain,
  Waves,
  Landmark,
  Sun,
  Flame,
  Sparkles,
  Info,
} from 'lucide-react';
import { HERO_CAROUSEL, QUICK_ACTIONS } from '../data/wanderpulseData';

interface HeroSectionProps {
  query: string;
  setQuery: (q: string) => void;
  onSubmit: (customQuery?: string) => void;
  isLoading?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  query,
  setQuery,
  onSubmit,
  isLoading = false,
}) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [helperNote, setHelperNote] = useState<string | null>(null);

  // Auto-rotate carousel every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % HERO_CAROUSEL.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setSlideIndex((prev) => (prev - 1 + HERO_CAROUSEL.length) % HERO_CAROUSEL.length);
  };

  const handleNext = () => {
    setSlideIndex((prev) => (prev + 1) % HERO_CAROUSEL.length);
  };

  const getQuickIcon = (id: string) => {
    switch (id) {
      case 'leh':
      case 'roadtrip':
        return <Mountain className="h-3.5 w-3.5 text-[#7a5cb8]" />;
      case 'kerala':
        return <Waves className="h-3.5 w-3.5 text-[#0d9488]" />;
      case 'rajasthan':
        return <Landmark className="h-3.5 w-3.5 text-[#d97706]" />;
      case 'goa':
      case 'escape':
        return <Sun className="h-3.5 w-3.5 text-[#e9b949]" />;
      case 'varanasi':
        return <Flame className="h-3.5 w-3.5 text-[#ea580c]" />;
      case 'inspire':
        return <Wand2 className="h-3.5 w-3.5 text-[#7a5cb8]" />;
      default:
        return <Compass className="h-3.5 w-3.5 text-[#7a5cb8]" />;
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-IN';
        setHelperNote('Listening for your India destination...');
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setQuery(transcript);
          setHelperNote(null);
        };
        recognition.onerror = () => {
          setHelperNote('Voice input unavailable or permission denied.');
          setTimeout(() => setHelperNote(null), 3000);
        };
        recognition.start();
      } catch {
        setHelperNote('Microphone access blocked in preview mode.');
        setTimeout(() => setHelperNote(null), 3000);
      }
    } else {
      setHelperNote('Voice input is not supported in this browser.');
      setTimeout(() => setHelperNote(null), 3000);
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 sm:pb-24 sm:pt-10">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
        {/* Left Column: Input Form & Headlines */}
        <div>
          <div className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-[#e9b949]/25 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-yellow-950 ring-1 ring-[#e9b949]/50">
            <MapPin className="h-3.5 w-3.5 text-yellow-900" />
            The AI Trip Planner for India
          </div>

          <h1 className="font-display text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl text-[#2a1a3d]">
            Your trip. Planned
            <br />
            in minutes.
          </h1>

          <p className="mt-5 max-w-xl text-lg font-medium text-[#2a1a3d]/80 sm:text-xl leading-relaxed">
            WanderPulse is the free AI trip planner for India. Real costs, real times, hidden gems, and a plan you actually want to follow.
          </p>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
            className="mt-7 rounded-3xl border border-[#e5dfd0]/70 bg-white p-4 shadow-[0_20px_60px_-30px_rgba(42,26,61,0.35)] sm:p-5"
          >
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  onSubmit();
                }
              }}
              placeholder="Best way to explore Jaipur in 4 days"
              rows={2}
              className="w-full resize-none bg-transparent text-lg text-[#2a1a3d] outline-none placeholder:text-[#6b5b7a]/70"
            />

            <div className="mt-3 flex items-center justify-between border-t border-[#e5dfd0]/40 pt-3">
              <div className="flex items-center gap-1 text-[#6b5b7a]">
                <button
                  type="button"
                  title="Attach itinerary notes or flights"
                  onClick={() => {
                    setHelperNote('Tip: You can paste flight details, hotel names, or constraints directly into the prompt!');
                    setTimeout(() => setHelperNote(null), 5000);
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#efeadb] transition"
                  aria-label="Attach"
                >
                  <Paperclip className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  title="Voice dictation"
                  onClick={handleVoiceInput}
                  className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#efeadb] transition"
                  aria-label="Voice input"
                >
                  <Mic className="h-4 w-4" />
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center gap-2 rounded-full bg-[#7a5cb8] px-5 py-2.5 font-semibold text-white shadow-sm transition hover:bg-[#2a1a3d] disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Planning...
                  </>
                ) : (
                  <>
                    Plan trip
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
            {helperNote && (
              <div className="mt-2.5 flex items-center gap-2 rounded-xl bg-[#2a1a3d]/5 px-3 py-2 text-xs font-medium text-[#2a1a3d]">
                <Info className="h-3.5 w-3.5 shrink-0 text-[#7a5cb8]" />
                <span>{helperNote}</span>
              </div>
            )}
          </form>

          {/* Quick Action Chips */}
          <div className="mt-4 flex flex-wrap gap-2">
            {QUICK_ACTIONS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setQuery(item.prompt);
                  onSubmit(item.prompt);
                }}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#e5dfd0] bg-white/80 px-3.5 py-1.5 text-xs font-medium text-[#2a1a3d] shadow-sm transition hover:bg-white hover:border-[#7a5cb8] hover:shadow"
              >
                {getQuickIcon(item.id)}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Hero Destination Slideshow */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[32px] shadow-[0_30px_80px_-40px_rgba(42,26,61,0.5)] sm:aspect-[4/5] lg:aspect-[3/4] lg:h-[540px]">
          {HERO_CAROUSEL.map((slide, idx) => (
            <div
              key={`${slide.src}-${idx}`}
              className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
              style={{ opacity: idx === slideIndex ? 1 : 0 }}
              aria-hidden={idx !== slideIndex}
            >
              <div className="relative h-full w-full overflow-hidden bg-[#efeadb]">
                <img
                  src={slide.src}
                  alt={slide.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="relative flex h-full flex-col justify-end gap-2 p-6 sm:p-8 text-white">
                  <div className="inline-flex w-fit items-center gap-1 rounded-full bg-white/25 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur">
                    Now trending
                  </div>
                  <div className="font-display text-2xl font-bold leading-tight drop-shadow-md sm:text-3xl">
                    {slide.title}
                  </div>
                  <div className="text-sm text-white/95 drop-shadow">
                    {slide.subtitle}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const prompt = `Plan a ${slide.subtitle} trip focusing on ${slide.title}`;
                      setQuery(prompt);
                      onSubmit(prompt);
                    }}
                    className="mt-2 inline-flex w-fit items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#e9b949] hover:underline"
                  >
                    View this plan →
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Controls */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous destination"
            className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur transition hover:bg-white/40 focus:outline-none focus:ring-2 focus:ring-white/70"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next destination"
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur transition hover:bg-white/40 focus:outline-none focus:ring-2 focus:ring-white/70"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 right-6 flex items-center gap-1.5">
            {HERO_CAROUSEL.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSlideIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === slideIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
