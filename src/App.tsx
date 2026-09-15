import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturedItineraries } from './components/FeaturedItineraries';
import { FounderNote } from './components/FounderNote';
import { WhyWanderPulse } from './components/WhyWanderPulse';
import { ComparisonSection } from './components/ComparisonSection';
import { AudienceSection } from './components/AudienceSection';
import { InspirationGrid } from './components/InspirationGrid';
import { AllInOneSection } from './components/AllInOneSection';
import { FaqSection } from './components/FaqSection';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { NonIndiaModal } from './components/NonIndiaModal';
import { PlannerView } from './components/PlannerView';
import { SAMPLE_GOLDEN_TRIANGLE, detectNonIndia, getCuratedItineraryForQuery } from './data/wanderpulseData';
import { Itinerary, NonIndiaMatch } from './types';

export default function App() {
  const [query, setQuery] = useState('');
  const [activeView, setActiveView] = useState<'home' | 'planner'>('home');
  const [itinerary, setItinerary] = useState<Itinerary>(SAMPLE_GOLDEN_TRIANGLE);
  const [isLoading, setIsLoading] = useState(false);
  const [nonIndiaMatch, setNonIndiaMatch] = useState<NonIndiaMatch | null>(null);

  const handlePlanTrip = async (customQuery?: string) => {
    const textToPlan = (customQuery || query).trim();
    if (!textToPlan) {
      // Default to sample Golden Triangle if empty
      setItinerary(SAMPLE_GOLDEN_TRIANGLE);
      setActiveView('planner');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Check for non-India queries
    const match = detectNonIndia(textToPlan);
    if (match) {
      setNonIndiaMatch(match);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          request: textToPlan,
          travelers: { adults: 2, children: 0, style: 'Curated Adventure' },
          budgetLevel: 'midrange',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setItinerary(data);
        setActiveView('planner');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const fallback = getCuratedItineraryForQuery(textToPlan);
        setItinerary(fallback);
        setActiveView('planner');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) {
      console.error('Plan generation failed, falling back:', err);
      const fallback = getCuratedItineraryForQuery(textToPlan);
      setItinerary(fallback);
      setActiveView('planner');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f4ec] font-sans text-[#2a1a3d] selection:bg-[#a985d9]/30">
      <Navbar
        onPlanNewTrip={() => {
          if (activeView === 'home') {
            const textarea = document.querySelector('textarea');
            if (textarea) {
              textarea.focus();
              textarea.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          } else {
            setActiveView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        activeView={activeView}
        onNavigateHome={() => {
          setActiveView('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {activeView === 'home' ? (
        <main>
          <HeroSection
            query={query}
            setQuery={setQuery}
            onSubmit={handlePlanTrip}
            isLoading={isLoading}
          />

          <FeaturedItineraries
            onPickItinerary={(q) => {
              setQuery(q);
              handlePlanTrip(q);
            }}
          />

          <FounderNote />

          <WhyWanderPulse />

          <ComparisonSection />

          <AudienceSection
            onSelectAudience={(q) => {
              setQuery(q);
              handlePlanTrip(q);
            }}
          />

          <InspirationGrid
            onPickInspiration={(caption) => {
              const q = `Plan a wonderful trip for: ${caption}`;
              setQuery(q);
              handlePlanTrip(q);
            }}
          />

          <AllInOneSection
            onStartPlanning={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          <FaqSection />

          <CtaBanner
            onStartPlanning={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </main>
      ) : (
        <PlannerView
          itinerary={itinerary}
          onBack={() => {
            setActiveView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      <Footer
        onPickPrompt={(prompt) => {
          setQuery(prompt);
          handlePlanTrip(prompt);
        }}
      />

      {/* Non-India Modal */}
      <NonIndiaModal
        match={nonIndiaMatch}
        onClose={() => setNonIndiaMatch(null)}
        onSelectAlternative={(altQuery) => {
          setQuery(altQuery);
          handlePlanTrip(altQuery);
        }}
      />
    </div>
  );
}
