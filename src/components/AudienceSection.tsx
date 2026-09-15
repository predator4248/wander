import React from 'react';
import { Heart, Users, Sparkles, ShieldCheck, PlaneTakeoff, ArrowRight } from 'lucide-react';
import { AUDIENCE_TYPES } from '../data/wanderpulseData';

interface AudienceSectionProps {
  onSelectAudience: (query: string) => void;
}

export const AudienceSection: React.FC<AudienceSectionProps> = ({ onSelectAudience }) => {
  const getIcon = (label: string) => {
    switch (label) {
      case 'Honeymoons':
        return <Heart className="h-5 w-5 text-rose-500" />;
      case 'Families':
        return <Users className="h-5 w-5 text-[#7a5cb8]" />;
      case 'First-time visitors':
        return <Sparkles className="h-5 w-5 text-[#e9b949]" />;
      case 'Solo female':
        return <ShieldCheck className="h-5 w-5 text-emerald-600" />;
      case 'NRIs':
        return <PlaneTakeoff className="h-5 w-5 text-sky-600" />;
      default:
        return <Sparkles className="h-5 w-5 text-[#7a5cb8]" />;
    }
  };

  const getQueryForAudience = (label: string) => {
    switch (label) {
      case 'Honeymoons':
        return 'Romantic 8-day Kerala honeymoon with private houseboat and boutique tea estate in Munnar';
      case 'Families':
        return 'Family-friendly 7-day Golden Triangle trip with kid-friendly activities, buffer days, and heritage stays';
      case 'First-time visitors':
        return 'First-time visitor to India: 9 days covering Delhi, Agra, Jaipur and Udaipur with cultural guides';
      case 'Solo female':
        return 'Safe and social 6-day solo female trip to Udaipur, Jodhpur, and boutique havelis with trusted daytime transit';
      case 'NRIs':
        return '10-day trip for visiting NRI family balancing cultural heritage, luxury dining, and relaxing beach stay in South Goa';
      default:
        return 'Curate a special India trip';
    }
  };

  return (
    <section id="for-you" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="inline-flex items-center gap-1.5 rounded-full bg-[#a985d9]/25 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#7a5cb8]">
        For You
      </div>

      <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl text-[#2a1a3d]">
        WanderPulse for every kind
        <br />
        of India traveller
      </h2>
      <p className="mt-2 max-w-2xl text-base text-[#6b5b7a] sm:text-lg">
        Whether you need high-chair friendly heritage stays, romantic lake-view terraces, or solo verified boutique homestays.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {AUDIENCE_TYPES.map((aud) => (
          <button
            key={aud.label}
            type="button"
            onClick={() => onSelectAudience(getQueryForAudience(aud.label))}
            className="group flex flex-col justify-between rounded-3xl border border-[#e5dfd0] bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-[#7a5cb8] hover:shadow-md focus:outline-none"
          >
            <div>
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f7f4ec]">
                {getIcon(aud.label)}
              </div>
              <h3 className="font-display text-xl font-bold text-[#2a1a3d] group-hover:text-[#7a5cb8] transition">
                {aud.label}
              </h3>
              <p className="mt-2 text-sm text-[#6b5b7a] leading-relaxed">{aud.blurb}</p>
            </div>

            <div className="mt-6 flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#7a5cb8]">
              <span>Explore trips</span>
              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
