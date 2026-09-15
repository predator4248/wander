import React from 'react';
import { Wand2, IndianRupee, Gem, MapPin } from 'lucide-react';
import { WHY_WANDERPULSE_PILLARS } from '../data/wanderpulseData';

export const WhyWanderPulse: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Wand2':
        return <Wand2 className="h-6 w-6 text-[#7a5cb8]" />;
      case 'IndianRupee':
        return <IndianRupee className="h-6 w-6 text-[#7a5cb8]" />;
      case 'Gem':
        return <Gem className="h-6 w-6 text-[#7a5cb8]" />;
      case 'MapPin':
        return <MapPin className="h-6 w-6 text-[#7a5cb8]" />;
      default:
        return <Wand2 className="h-6 w-6 text-[#7a5cb8]" />;
    }
  };

  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="max-w-2xl">
        <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl text-[#2a1a3d]">
          We’ll be there for you
          <br />
          every step of the way
        </h2>
        <p className="mt-3 text-lg text-[#6b5b7a]">
          Curate, save and refine your India trip in one warm, friendly chat.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {WHY_WANDERPULSE_PILLARS.map((pillar) => (
          <div
            key={pillar.title}
            className="flex flex-col justify-between rounded-3xl border border-[#e5dfd0] bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div>
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#a985d9]/20">
                {getIcon(pillar.iconName)}
              </div>
              <h3 className="font-display text-xl font-bold text-[#2a1a3d]">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6b5b7a]">{pillar.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
