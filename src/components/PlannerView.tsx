import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  IndianRupee,
  Train,
  Plane,
  Car,
  Hotel,
  Share2,
  Printer,
  Sparkles,
  Send,
  Check,
  Compass,
  Utensils,
  Camera,
  ShoppingBag,
  Trees,
  Sun,
  ShieldAlert,
  Luggage,
  MessageSquare,
  ArrowLeft,
} from 'lucide-react';
import { Itinerary, ChatMessage, ExperienceCategory, TransportMode } from '../types';

interface PlannerViewProps {
  itinerary: Itinerary;
  onBack: () => void;
  onModifyTrip?: (instructions: string) => void;
}

export const PlannerView: React.FC<PlannerViewProps> = ({
  itinerary,
  onBack,
}) => {
  const [activeCityIndex, setActiveCityIndex] = useState<number>(0);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: `Hello! I'm your WanderPulse travel assistant. I've curated this complete itinerary for your ${itinerary.title}. How does this look? Ask me anything—like tweaking hotel styles, finding train alternatives, or adding vegetarian food gems!`,
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [weatherInfo, setWeatherInfo] = useState<{ city: string; tempC: number; condition: string } | null>(null);

  const activeCity = itinerary.cities[activeCityIndex] || itinerary.cities[0];

  // Fetch weather for active city
  useEffect(() => {
    if (activeCity) {
      fetch(`/api/weather?city=${encodeURIComponent(activeCity.name)}`)
        .then((res) => res.json())
        .then((data) => setWeatherInfo(data))
        .catch(() => {});
    }
  }, [activeCity?.name]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const userText = chatInput.trim();
    const newMsg: ChatMessage = {
      id: String(Date.now()),
      role: 'user',
      text: userText,
    };
    setChatMessages((prev) => [...prev, newMsg]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          conversation: chatMessages,
          itineraryContext: {
            title: itinerary.title,
            cities: itinerary.cities.map((c) => c.name),
            totalDays: itinerary.totalDays,
            budgetLevel: itinerary.budgetLevel,
          },
        }),
      });
      const data = await res.json();
      if (data.answer) {
        setChatMessages((prev) => [
          ...prev,
          {
            id: String(Date.now() + 1),
            role: 'assistant',
            text: data.answer,
          },
        ]);
      }
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          role: 'assistant',
          text: "I'm right here! For this trip, keeping mornings for monuments and afternoons for shaded bazaars gives you the best experience.",
        },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const getCategoryBadge = (cat: ExperienceCategory) => {
    switch (cat) {
      case 'food':
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-800 border border-amber-200">
            <Utensils className="h-3 w-3" /> Food & Drink
          </span>
        );
      case 'sightseeing':
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-800 border border-indigo-200">
            <Camera className="h-3 w-3" /> Sightseeing
          </span>
        );
      case 'culture':
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-purple-50 px-2 py-0.5 text-xs font-semibold text-purple-800 border border-purple-200">
            <Sparkles className="h-3 w-3" /> Culture
          </span>
        );
      case 'shopping':
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-rose-50 px-2 py-0.5 text-xs font-semibold text-rose-800 border border-rose-200">
            <ShoppingBag className="h-3 w-3" /> Shopping
          </span>
        );
      case 'nature':
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-800 border border-emerald-200">
            <Trees className="h-3 w-3" /> Nature
          </span>
        );
      case 'adventure':
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-sky-50 px-2 py-0.5 text-xs font-semibold text-sky-800 border border-sky-200">
            <Compass className="h-3 w-3" /> Adventure
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-gray-50 px-2 py-0.5 text-xs font-semibold text-gray-800 border border-gray-200">
            <MapPin className="h-3 w-3" /> Experience
          </span>
        );
    }
  };

  const getTransportIcon = (mode: TransportMode) => {
    switch (mode) {
      case 'train':
        return <Train className="h-4 w-4 text-[#7a5cb8]" />;
      case 'flight':
        return <Plane className="h-4 w-4 text-[#7a5cb8]" />;
      case 'car':
      case 'taxi':
        return <Car className="h-4 w-4 text-[#7a5cb8]" />;
      default:
        return <Compass className="h-4 w-4 text-[#7a5cb8]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f4ec] pb-24 text-[#2a1a3d]">
      {/* Top Banner Header */}
      <div className="border-b border-[#e5dfd0] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#7a5cb8] hover:text-[#2a1a3d] transition"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to search</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#e5dfd0] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#2a1a3d] transition hover:bg-[#efeadb]"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
                <span>{copied ? 'Link Copied!' : 'Share'}</span>
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#e5dfd0] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#2a1a3d] transition hover:bg-[#efeadb]"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Print PDF</span>
              </button>
            </div>
          </div>

          <div className="mt-4">
            <h1 className="font-display text-3xl font-bold tracking-tight text-[#2a1a3d] sm:text-4xl md:text-5xl">
              {itinerary.title}
            </h1>
            <p className="mt-2 max-w-3xl text-base text-[#6b5b7a] sm:text-lg">
              {itinerary.tagline}
            </p>

            {/* Quick Badges */}
            <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
              <div className="inline-flex items-center gap-1 rounded-full bg-[#a985d9]/25 px-3 py-1 font-bold text-[#7a5cb8]">
                <Calendar className="h-3.5 w-3.5" />
                {itinerary.totalDays} Days
              </div>
              <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 font-bold text-emerald-800 border border-emerald-200">
                <IndianRupee className="h-3.5 w-3.5" />
                Est. ₹{itinerary.totalEstimatedCostINR.toLocaleString('en-IN')} total
              </div>
              <div className="inline-flex items-center gap-1 rounded-full bg-[#e9b949]/25 px-3 py-1 font-bold text-yellow-950 border border-[#e9b949]/50">
                <Compass className="h-3.5 w-3.5" />
                {itinerary.travelers.style}
              </div>
              {weatherInfo && (
                <div className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-3 py-1 font-semibold text-sky-800 border border-sky-200">
                  <Sun className="h-3.5 w-3.5" />
                  {weatherInfo.city}: {weatherInfo.tempC}°C ({weatherInfo.condition})
                </div>
              )}
            </div>
          </div>

          {/* City navigation selector */}
          <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scroll-thin">
            {itinerary.cities.map((city, idx) => (
              <button
                key={`${city.name}-${idx}`}
                type="button"
                onClick={() => setActiveCityIndex(idx)}
                className={`flex-shrink-0 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition ${
                  activeCityIndex === idx
                    ? 'bg-[#7a5cb8] text-white shadow-sm'
                    : 'bg-[#efeadb] text-[#2a1a3d] hover:bg-[#e5dfd0]'
                }`}
              >
                {city.name} ({city.nights} {city.nights === 1 ? 'night' : 'nights'})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Itinerary Content & Chat Layout */}
      <div className="mx-auto mt-8 max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.7fr_1fr]">
          {/* Left Column: Timeline & Days */}
          <div className="space-y-8">
            {/* Active City Overview Card */}
            <div className="rounded-3xl border border-[#e5dfd0] bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5dfd0]/60 pb-5">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#7a5cb8]">
                    City Destination • {activeCity.state}
                  </div>
                  <h2 className="font-display text-2xl font-bold text-[#2a1a3d] sm:text-3xl">
                    {activeCity.name}
                  </h2>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#efeadb] px-3.5 py-1.5 text-xs font-bold text-[#2a1a3d]">
                  <Calendar className="h-3.5 w-3.5 text-[#7a5cb8]" />
                  {activeCity.nights} {activeCity.nights === 1 ? 'Night' : 'Nights'} stay
                </div>
              </div>

              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#6b5b7a]">
                {activeCity.blurb}
              </p>

              {/* Transit info from previous leg */}
              {activeCity.transportFromPrev && activeCity.transportFromPrev.mode !== 'none' && (
                <div className="mt-5 rounded-2xl bg-[#f7f4ec] p-4 border border-[#e5dfd0]/70">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#7a5cb8]">
                    {getTransportIcon(activeCity.transportFromPrev.mode)}
                    <span>
                      Getting to {activeCity.name} from {activeCity.transportFromPrev.from}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-[#2a1a3d] font-medium">
                    {activeCity.transportFromPrev.notes}
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-[#6b5b7a]">
                    <span>⏱ {activeCity.transportFromPrev.durationHours} hrs duration</span>
                    {activeCity.transportFromPrev.approxCostINR > 0 && (
                      <span>💰 ~₹{activeCity.transportFromPrev.approxCostINR.toLocaleString('en-IN')} fare</span>
                    )}
                    {activeCity.transportFromPrev.operator && (
                      <span>🚆 {activeCity.transportFromPrev.operator}</span>
                    )}
                  </div>
                </div>
              )}

              {/* Stay Accommodation Card */}
              {activeCity.stay && (
                <div className="mt-4 rounded-2xl bg-amber-50/50 p-4 border border-amber-200/60">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900">
                      <Hotel className="h-4 w-4 text-amber-700" />
                      <span>Recommended Stay • {activeCity.stay.type}</span>
                    </div>
                    <span className="text-xs font-bold text-amber-900">
                      ~₹{activeCity.stay.approxCostPerNightINR.toLocaleString('en-IN')} / night
                    </span>
                  </div>
                  <div className="mt-2 font-display text-base font-bold text-[#2a1a3d]">
                    {activeCity.stay.name}
                  </div>
                  <div className="mt-1 text-xs text-[#6b5b7a] leading-relaxed">
                    {activeCity.stay.whyGood}
                  </div>
                </div>
              )}
            </div>

            {/* Daily Detailed Schedule */}
            <div className="space-y-6">
              <h3 className="font-display text-xl font-bold text-[#2a1a3d]">
                Day-by-Day Itinerary in {activeCity.name}
              </h3>

              {activeCity.days.map((dayPlan, dIdx) => (
                <div
                  key={`${activeCity.name}-day-${dayPlan.day}-${dIdx}`}
                  className="overflow-hidden rounded-3xl border border-[#e5dfd0] bg-white p-6 shadow-sm sm:p-7"
                >
                  <div className="flex items-center gap-3 border-b border-[#e5dfd0]/60 pb-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-[#7a5cb8] text-white font-display font-bold text-sm">
                      D{dayPlan.day}
                    </div>
                    <div>
                      <h4 className="font-display text-lg font-bold text-[#2a1a3d]">
                        Day {dayPlan.day}: {dayPlan.title}
                      </h4>
                      <p className="text-xs text-[#6b5b7a]">{dayPlan.summary}</p>
                    </div>
                  </div>

                  {/* Experiences timeline */}
                  <div className="mt-6 space-y-6">
                    {dayPlan.experiences.map((exp, idx) => (
                      <div key={idx} className="relative pl-6 border-l-2 border-[#e5dfd0] pb-2 last:border-l-0">
                        {/* Dot */}
                        <div className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-[#7a5cb8] ring-4 ring-white" />

                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#6b5b7a]">
                              <Clock className="h-3 w-3 text-[#7a5cb8]" />
                              {exp.time}
                            </span>
                            {getCategoryBadge(exp.category)}
                          </div>

                          {exp.costINR > 0 && (
                            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              ₹{exp.costINR.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>

                        <h5 className="mt-2 font-display text-base font-bold text-[#2a1a3d]">
                          {exp.title}
                        </h5>

                        <p className="mt-1 text-sm text-[#6b5b7a] leading-relaxed">
                          {exp.description}
                        </p>

                        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-[#6b5b7a]">
                          <span className="flex items-center gap-1 font-medium">
                            <MapPin className="h-3 w-3 text-rose-500" />
                            {exp.location}
                          </span>
                          <span>•</span>
                          <span>{exp.durationMinutes} minutes</span>
                        </div>

                        {exp.tip && (
                          <div className="mt-2.5 rounded-xl bg-amber-50/70 p-2.5 text-xs text-amber-900 border border-amber-200/50">
                            <strong>Local Tip:</strong> {exp.tip}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Return Leg details */}
            {itinerary.returnLeg && (
              <div className="rounded-3xl border border-[#e5dfd0] bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-800">
                    <Train className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#7a5cb8]">
                      Return Transit
                    </div>
                    <h4 className="font-display text-base font-bold text-[#2a1a3d]">
                      Journey Home from {itinerary.returnLeg.from}
                    </h4>
                  </div>
                </div>
                <p className="mt-3 text-sm text-[#6b5b7a] leading-relaxed">
                  {itinerary.returnLeg.notes}
                </p>
                <div className="mt-2 flex items-center gap-4 text-xs font-medium text-[#2a1a3d]">
                  <span>Operator: {itinerary.returnLeg.operator}</span>
                  <span>Approx Fare: ₹{itinerary.returnLeg.approxCostINR.toLocaleString('en-IN')}</span>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: AI Assistant & Essential Advice */}
          <div className="space-y-6">
            {/* Interactive Chat with WanderPulse */}
            <div className="sticky top-6 rounded-3xl border border-[#e5dfd0] bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2.5 border-b border-[#e5dfd0]/60 pb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#a985d9]/30 text-[#7a5cb8]">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-[#2a1a3d]">
                    Ask WanderPulse to customize
                  </h4>
                  <p className="text-[11px] text-[#6b5b7a]">Refine stays, budgets, or local foods</p>
                </div>
              </div>

              {/* Chat Message Stream */}
              <div className="my-4 max-h-72 space-y-3 overflow-y-auto pr-1 text-xs scroll-thin">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.role === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[90%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-[#7a5cb8] text-white'
                          : 'bg-[#efeadb] text-[#2a1a3d]'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isChatLoading && (
                  <div className="flex items-center gap-1 text-xs text-[#6b5b7a] italic">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-[#7a5cb8]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-[#7a5cb8] delay-100" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-[#7a5cb8] delay-200" />
                    <span className="ml-1">WanderPulse is thinking...</span>
                  </div>
                )}
              </div>

              {/* Quick suggestion chips */}
              <div className="mb-3 flex flex-wrap gap-1.5">
                {[
                  'How to make this cheaper?',
                  'Best local sweets to try?',
                  'What to wear for temple visits?',
                ].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => {
                      setChatInput(chip);
                    }}
                    className="rounded-full border border-[#e5dfd0] bg-[#f7f4ec] px-2.5 py-1 text-[11px] text-[#2a1a3d] hover:border-[#7a5cb8] transition"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSendMessage} className="relative flex items-center">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask WanderPulse anything..."
                  className="w-full rounded-full border border-[#e5dfd0] bg-[#f7f4ec] py-2 pl-3 pr-10 text-xs text-[#2a1a3d] outline-none focus:border-[#7a5cb8]"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim() || isChatLoading}
                  className="absolute right-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#7a5cb8] text-white disabled:opacity-40 transition"
                  aria-label="Send message"
                >
                  <Send className="h-3 w-3" />
                </button>
              </form>
            </div>

            {/* Estimated Budget Summary Card */}
            <div className="rounded-3xl border border-[#e5dfd0] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
                <IndianRupee className="h-4 w-4 text-emerald-600" />
                <span>Transparent Budget Estimate</span>
              </div>
              <div className="mt-2 font-display text-2xl font-bold text-[#2a1a3d]">
                ₹{itinerary.totalEstimatedCostINR.toLocaleString('en-IN')}
              </div>
              <div className="text-xs text-[#6b5b7a]">
                Per person baseline for {itinerary.budgetLevel} style
              </div>

              <div className="mt-4 space-y-2 border-t border-[#e5dfd0]/60 pt-3 text-xs text-[#6b5b7a]">
                <div className="flex justify-between">
                  <span>Stays & Havelis</span>
                  <span className="font-semibold text-[#2a1a3d]">~45%</span>
                </div>
                <div className="flex justify-between">
                  <span>Intercity Trains & Cabs</span>
                  <span className="font-semibold text-[#2a1a3d]">~25%</span>
                </div>
                <div className="flex justify-between">
                  <span>Monuments & Guides</span>
                  <span className="font-semibold text-[#2a1a3d]">~15%</span>
                </div>
                <div className="flex justify-between">
                  <span>Authentic Food & Chai</span>
                  <span className="font-semibold text-[#2a1a3d]">~15%</span>
                </div>
              </div>
            </div>

            {/* Packing Tips Card */}
            {itinerary.packingTips && itinerary.packingTips.length > 0 && (
              <div className="rounded-3xl border border-[#e5dfd0] bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#7a5cb8]">
                  <Luggage className="h-4 w-4" />
                  <span>Packing Essentials</span>
                </div>
                <ul className="mt-3 space-y-2 text-xs text-[#6b5b7a]">
                  {itinerary.packingTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Travel Cautions Card */}
            {itinerary.cautions && itinerary.cautions.length > 0 && (
              <div className="rounded-3xl border border-rose-200 bg-rose-50/40 p-6 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-900">
                  <ShieldAlert className="h-4 w-4 text-rose-600" />
                  <span>India Travel Notes</span>
                </div>
                <ul className="mt-3 space-y-2 text-xs text-rose-950/80">
                  {itinerary.cautions.map((caution, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span>•</span>
                      <span>{caution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
