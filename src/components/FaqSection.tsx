import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/wanderpulseData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  // Schema.org FAQ structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <section id="faq" className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="text-center">
        <h2 className="font-display text-4xl font-bold tracking-tight text-[#2a1a3d] sm:text-5xl">
          Frequently asked questions
        </h2>
        <p className="mt-3 text-base text-[#6b5b7a] sm:text-lg">
          Find answers about how WanderPulse plans your India trip.
        </p>
      </div>

      <div className="mt-10 divide-y divide-[#e5dfd0] rounded-3xl border border-[#e5dfd0] bg-white px-6 py-2 shadow-sm">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item.q} className="py-5">
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between text-left font-display text-lg font-bold text-[#2a1a3d] transition hover:text-[#7a5cb8]"
              >
                <span>{item.q}</span>
                <ChevronDown
                  className={`h-5 w-5 text-[#6b5b7a] transition-transform duration-200 flex-shrink-0 ml-4 ${
                    isOpen ? 'rotate-180 text-[#7a5cb8]' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="mt-3 text-sm leading-relaxed text-[#6b5b7a] pr-8 animate-fadeIn">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
