import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { getCuratedItineraryForQuery } from './src/data/curatedItineraries';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy Gemini AI initialization
let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

// Resilient multi-model pool with automatic retry on 503/429 spikes
const CANDIDATE_MODELS = ['gemini-3.6-flash', 'gemini-3.8-flash', 'gemini-flash-latest'];

async function callGeminiWithFallback(prompt: string, config?: any): Promise<string | null> {
  const ai = getAI();
  if (!ai) return null;

  for (const model of CANDIDATE_MODELS) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
          config,
        });
        if (response && response.text) {
          return response.text.trim();
        }
      } catch (err: any) {
        const status = err?.status || err?.code;
        const msg = String(err?.message || '');
        const isTransient = status === 503 || status === 429 || msg.includes('high demand') || msg.includes('UNAVAILABLE') || msg.includes('Spikes in demand');
        if (isTransient && attempt === 0) {
          await new Promise((r) => setTimeout(r, 600));
          continue;
        }
        break; // try next candidate model
      }
    }
  }
  return null;
}

function parseJsonSafely(text: string | null): any {
  if (!text) return null;
  let cleaned = text.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  }
  try {
    return JSON.parse(cleaned);
  } catch {
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch {
        return null;
      }
    }
    return null;
  }
}

// Destination metadata & photos mapping
const DESTINATIONS: Record<string, { image: string; lat: number; lng: number; state: string; blurb: string }> = {
  jaipur: {
    image: '/images/hawa-mahal.jpg',
    lat: 26.9124,
    lng: 75.7873,
    state: 'Rajasthan',
    blurb: 'The Pink City of grand Rajput fortresses, kaleidoscopic bazaars, and royal culinary feasts.',
  },
  udaipur: {
    image: '/images/udaipur.jpg',
    lat: 24.5854,
    lng: 73.7125,
    state: 'Rajasthan',
    blurb: 'Venice of the East, famed for marble palaces floating on serene shimmering lakes.',
  },
  delhi: {
    image: '/images/chandni-chowk.jpg',
    lat: 28.6139,
    lng: 77.209,
    state: 'Delhi NCR',
    blurb: 'A 2,000-year-old mosaic of Mughal grandeur, British colonial boulevards, and street-food lanes.',
  },
  agra: {
    image: '/images/amber-fort.jpg',
    lat: 27.1767,
    lng: 78.0081,
    state: 'Uttar Pradesh',
    blurb: 'Home of the timeless Taj Mahal and Mughal emperor Akbar’s sprawling riverside fortresses.',
  },
  kerala: {
    image: '/images/kerala-backwaters.jpg',
    lat: 9.4981,
    lng: 76.3388,
    state: 'Kerala',
    blurb: 'Emerald palm-fringed lagoons, quiet village houseboats, and spice-scented mountain air.',
  },
  munnar: {
    image: '/images/munnar.jpg',
    lat: 10.0889,
    lng: 77.0595,
    state: 'Kerala',
    blurb: 'Rolling emerald tea carpets shrouded in mist, waterfalls, and cool mountain breezes.',
  },
  varkala: {
    image: '/images/varkala-cliff.jpg',
    lat: 8.7379,
    lng: 76.7163,
    state: 'Kerala',
    blurb: 'Dramatic red laterite cliffs towering over the Arabian Sea with bohemian rooftop cafes.',
  },
  goa: {
    image: '/images/goa-beach.jpg',
    lat: 15.2993,
    lng: 74.124,
    state: 'Goa',
    blurb: 'Golden sands, vibrant beach shacks, Portuguese villas, and laidback tropical sunsets.',
  },
  palolem: {
    image: '/images/palolem-beach.jpg',
    lat: 15.01,
    lng: 74.0232,
    state: 'Goa',
    blurb: 'Crescent-shaped tranquil bay fringed with coconut palms and quiet sunset shacks.',
  },
  ladakh: {
    image: '/images/nubra-valley.jpg',
    lat: 34.1526,
    lng: 77.5771,
    state: 'Ladakh',
    blurb: 'High-altitude cold desert, ancient Buddhist monasteries, and crystal blue glacial lakes.',
  },
  leh: {
    image: '/images/nubra-valley.jpg',
    lat: 34.1526,
    lng: 77.5771,
    state: 'Ladakh',
    blurb: 'Gateway to the Himalayas, surrounded by prayer flags, stupas, and snow-capped peaks.',
  },
  varanasi: {
    image: '/images/varanasi.jpg',
    lat: 25.3176,
    lng: 82.9739,
    state: 'Uttar Pradesh',
    blurb: 'One of the world’s oldest living cities, where holy Ganga aartis illuminated by dawn fire bells.',
  },
  meghalaya: {
    image: '/images/meghalaya-falls.jpg',
    lat: 25.467,
    lng: 91.3662,
    state: 'Meghalaya',
    blurb: 'The Abode of the Clouds, crystal-clear riverbeds of Umngot, and ancient living root bridges.',
  },
};

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// 2. Place API
app.get('/api/place', (req, res) => {
  const q = String(req.query.q || '').toLowerCase();
  for (const [key, val] of Object.entries(DESTINATIONS)) {
    if (q.includes(key)) {
      return res.json({ name: key, ...val });
    }
  }
  // Default place response
  res.json({
    name: q,
    image: '/images/varkala-cliff.jpg',
    lat: 20.5937,
    lng: 78.9629,
    state: 'India',
    blurb: 'Explore incredible wonders and curated experiences across India.',
  });
});

// 3. Weather API
app.get('/api/weather', (req, res) => {
  const city = String(req.query.city || 'Delhi').toLowerCase();
  const weatherMap: Record<string, { tempC: number; condition: string; bestSeason: string; advisory: string }> = {
    jaipur: { tempC: 28, condition: 'Sunny & Pleasant', bestSeason: 'Oct - Mar', advisory: 'Ideal weather for sightseeing and palace courtyards.' },
    delhi: { tempC: 26, condition: 'Clear', bestSeason: 'Oct - Mar', advisory: 'Pleasant daytime temperatures for outdoor monuments.' },
    agra: { tempC: 27, condition: 'Clear Skies', bestSeason: 'Oct - Mar', advisory: 'Morning mist dissipates by 8:00 AM at the Taj.' },
    kerala: { tempC: 29, condition: 'Tropical Breeze', bestSeason: 'Sep - Mar', advisory: 'Gentle warmth with cool evening sea breezes.' },
    goa: { tempC: 30, condition: 'Sunny & Coastal', bestSeason: 'Nov - Feb', advisory: 'Perfect beach weather with warm tides.' },
    ladakh: { tempC: 14, condition: 'Crisp High-Altitude', bestSeason: 'May - Sep', advisory: 'Keep warm thermal layers handy for evening temperatures.' },
    varanasi: { tempC: 27, condition: 'Warm & Calming', bestSeason: 'Oct - Mar', advisory: 'Delightful dawn breeze during early boat rides.' },
  };

  let found = weatherMap.delhi;
  for (const [k, v] of Object.entries(weatherMap)) {
    if (city.includes(k)) {
      found = v;
      break;
    }
  }

  res.json({
    city,
    tempC: found.tempC,
    condition: found.condition,
    bestSeason: found.bestSeason,
    advisory: found.advisory,
  });
});

// 4. Hotels API
app.get('/api/hotels', (req, res) => {
  const city = String(req.query.city || 'Jaipur').toLowerCase();
  const hotels = [
    {
      name: 'Haveli Heritage Court',
      type: 'heritage',
      stars: 4.8,
      priceINR: 5800,
      badge: 'WanderPulse Recommended',
      perks: ['Courtyard Breakfast', 'Folk Musicians', 'Swimming Pool'],
    },
    {
      name: 'Zostel Plus Backpackers',
      type: 'hostel',
      stars: 4.7,
      priceINR: 1200,
      badge: 'Great for Solo',
      perks: ['Cafe & Cowork', 'Rooftop Lounge', 'Walking Tours'],
    },
    {
      name: 'Taj Gateway / CGH Earth Retreat',
      type: 'luxury',
      stars: 4.9,
      priceINR: 16500,
      badge: 'Luxury Splurge',
      perks: ['Ayurvedic Spa', 'Private Balcony', 'Chauffeured Transfers'],
    },
  ];
  res.json({ city, hotels });
});

// 5. Flights & Trains API
app.get('/api/flights', (req, res) => {
  const from = String(req.query.from || 'Delhi');
  const to = String(req.query.to || 'Jaipur');

  res.json({
    from,
    to,
    options: [
      {
        type: 'train',
        name: 'Vande Bharat Express',
        number: '20977',
        durationHours: 3.8,
        priceINR: 1150,
        frequency: 'Daily except Wednesdays',
        rating: 'Top Rated',
      },
      {
        type: 'flight',
        airline: 'IndiGo Airlines',
        code: '6E 534',
        durationHours: 1.0,
        priceINR: 3800,
        frequency: '4x daily',
        rating: 'Fastest',
      },
      {
        type: 'cab',
        vehicle: 'Private AC Innova Cab',
        durationHours: 4.5,
        priceINR: 4200,
        frequency: 'On Demand',
        rating: 'Door to Door',
      },
    ],
  });
});

// 6. Preflight API
app.post('/api/preflight', (req, res) => {
  const query = String(req.body.query || '');
  res.json({
    valid: true,
    query,
    detectedCountry: 'India',
  });
});

// 7. Plan API (Core WanderPulse AI itinerary generator)
app.post('/api/plan', async (req, res) => {
  try {
    const { request: userQuery, travelers, budgetLevel = 'midrange', days } = req.body;
    const ai = getAI();

    if (ai && userQuery) {
      try {
        const prompt = `You are WanderPulse, the premier AI trip planner exclusively for India travel at wanderpulse.com.
Create a complete, day-by-day India travel itinerary based strictly on the user request: "${userQuery}".
Return ONLY a valid JSON object strictly matching this schema:
{
  "title": "Catchy trip title",
  "tagline": "One-line hook for the trip",
  "totalDays": number (between 3 and 14),
  "travelers": { "adults": number, "children": number, "style": "e.g. Couple honeymoon, Solo backpacker, Family with kids" },
  "budgetLevel": "shoestring" | "budget" | "midrange" | "premium" | "luxury",
  "bestSeasonNote": "Short note on whether dates are ideal",
  "totalEstimatedCostINR": number (realistic per-person cost in INR, e.g. 45000),
  "packingTips": ["tip 1", "tip 2", "tip 3"],
  "cautions": ["caution 1", "caution 2", "caution 3"],
  "cities": [
    {
      "name": "City name",
      "state": "Indian State",
      "nights": number,
      "lat": number,
      "lng": number,
      "blurb": "2-3 sentence evocative pitch",
      "transportFromPrev": {
        "mode": "flight" | "train" | "bus" | "car" | "taxi" | "ferry",
        "from": "Origin or previous city",
        "durationHours": number,
        "distanceKm": number,
        "approxCostINR": number,
        "notes": "Class or flight advice",
        "operator": "e.g. Vande Bharat Express or IndiGo"
      },
      "stay": {
        "type": "hostel" | "budget" | "midrange" | "heritage" | "boutique" | "luxury" | "homestay" | "resort",
        "name": "Specific hotel or haveli name",
        "approxCostPerNightINR": number,
        "whyGood": "Why this stay fits"
      },
      "days": [
        {
          "day": number,
          "title": "Day title",
          "summary": "One sentence summary",
          "experiences": [
            {
              "time": "e.g. 09:30 AM",
              "title": "Specific attraction or experience",
              "description": "Vivid description with sensory details",
              "category": "sightseeing" | "food" | "culture" | "adventure" | "shopping" | "nature" | "wellness" | "nightlife" | "transport",
              "location": "Specific landmark or neighborhood",
              "lat": number,
              "lng": number,
              "durationMinutes": number,
              "costINR": number,
              "tip": "Local insider tip"
            }
          ]
        }
      ]
    }
  ],
  "returnLeg": {
    "mode": "train" | "flight" | "car",
    "from": "Last city",
    "durationHours": number,
    "distanceKm": number,
    "approxCostINR": number,
    "notes": "Return transit instructions",
    "operator": "Airline or train name"
  }
}

Ensure all costs are in Indian Rupees (INR). Make every activity feel authentically Indian, culturally aware, and delightfully detailed. Do not include markdown code fences like \`\`\`json, just pure JSON.`;

        const rawText = await callGeminiWithFallback(prompt, {
          responseMimeType: 'application/json',
        });

        if (rawText) {
          const parsed = parseJsonSafely(rawText);
          if (parsed && parsed.title && Array.isArray(parsed.cities)) {
            return res.json(parsed);
          }
        }
      } catch (geminiErr: any) {
        console.warn('Gemini generation fallback used:', geminiErr?.message || geminiErr);
      }
    }

    // Curated dynamic fallback matching query destination
    const fallbackPlan = getCuratedItineraryForQuery(userQuery);
    return res.json({
      ...fallbackPlan,
      travelers: travelers || fallbackPlan.travelers,
      budgetLevel: budgetLevel || fallbackPlan.budgetLevel,
    });

    if (false) {
      return res.json({
        title: 'Kerala Backwaters & Mist Hills Honeymoon',
        tagline: '8 days of private houseboats, misty tea plantations in Munnar, and cliffside sunsets in Varkala',
        totalDays: 8,
        travelers: travelers || { adults: 2, children: 0, style: 'Couple Honeymoon' },
        budgetLevel: budgetLevel || 'midrange',
        bestSeasonNote: 'September through March brings cool mountain air and gentle backwater breezes.',
        totalEstimatedCostINR: 52000,
        packingTips: ['Breathable linen and cotton clothing', 'Light sweater for Munnar tea hills', 'Slip-on sandals for houseboats and temples', 'Eco-friendly sunscreen and sunglasses'],
        cautions: ['Houseboats dock at 5:30 PM due to local fishing regulations', 'Winding ghat roads from Kochi to Munnar can induce motion sickness; carry ginger chews'],
        cities: [
          {
            name: 'Kochi & Alleppey',
            state: 'Kerala',
            nights: 3,
            lat: 9.9312,
            lng: 76.2673,
            blurb: 'Old Portuguese spice warehouses in Fort Kochi leading into tranquil coconut-fringed backwater lagoons.',
            transportFromPrev: {
              mode: 'flight',
              from: 'Origin',
              durationHours: 2.5,
              distanceKm: 0,
              approxCostINR: 5200,
              notes: 'Arrive at Cochin International Airport (COK). Solar-powered airport.',
              operator: 'IndiGo / Air India',
            },
            stay: {
              type: 'resort',
              name: 'CGH Earth Brunton Boatyard & Private Kettuvallam Houseboat',
              approxCostPerNightINR: 8500,
              whyGood: 'Traditional tharavadu woodwork, freshly caught karimeen pollichathu cooked on board.',
            },
            days: [
              {
                day: 1,
                title: 'Fort Kochi Spices & Chinese Fishing Nets',
                summary: 'Colonial heritage walks, art cafes, and sunset over Cochin harbor.',
                experiences: [
                  {
                    time: '10:00 AM',
                    title: 'Chinese Fishing Nets & Spice Market Walk',
                    description: 'Watch cantilevered 14th-century fishing nets dip into the harbor before tasting fresh cardamom and black pepper in Mattancherry.',
                    category: 'culture',
                    location: 'Fort Kochi',
                    lat: 9.9678,
                    lng: 76.2427,
                    durationMinutes: 120,
                    costINR: 200,
                    tip: 'Ask local fishermen to show you the counterweight balance system.',
                  },
                  {
                    time: '02:00 PM',
                    title: 'Kerala Sadya Feast at Kashi Art Cafe',
                    description: 'Traditional feast served on a banana leaf featuring red rice, avial, sambar, and crispy pappadams.',
                    category: 'food',
                    location: 'Burgher Street',
                    lat: 9.9664,
                    lng: 76.2415,
                    durationMinutes: 75,
                    costINR: 450,
                    tip: 'Sample their artisanal chocolate cake afterward.',
                  },
                ],
              },
              {
                day: 2,
                title: 'Private Alleppey Houseboat Cruise',
                summary: 'Glide quietly through narrow canals lined with paddling ducks and paddy fields.',
                experiences: [
                  {
                    time: '12:00 PM',
                    title: 'Houseboat Boarding & Coconut Water Welcome',
                    description: 'Board a traditional teak and bamboo Kettuvallam with private chef, navigating the Punnamada Lake.',
                    category: 'nature',
                    location: 'Finishing Point, Alleppey',
                    lat: 9.4981,
                    lng: 76.3388,
                    durationMinutes: 360,
                    costINR: 12000,
                    tip: 'Book an eco-friendly solar cruiser for quiet sailing without diesel hum.',
                  },
                ],
              },
            ],
          },
          {
            name: 'Munnar',
            state: 'Kerala',
            nights: 3,
            lat: 10.0889,
            lng: 77.0595,
            blurb: 'Endless rolling emerald tea estates, mist-draped peaks, and refreshing cool highland air.',
            transportFromPrev: {
              mode: 'car',
              from: 'Alleppey',
              durationHours: 4.5,
              distanceKm: 170,
              approxCostINR: 3200,
              notes: 'Scenic drive ascending through rubber plantations and Cheeyappara Waterfalls.',
              operator: 'Kerala Tourism Registered Cab',
            },
            stay: {
              type: 'boutique',
              name: 'Windermere Estate / Tall Trees Resort',
              approxCostPerNightINR: 7200,
              whyGood: 'Perched right inside cardamom and tea plantations with panoramic valley decks.',
            },
            days: [
              {
                day: 3,
                title: 'Kolukkumalai Sunrise & Organic Tea Plucking',
                summary: 'World’s highest organic tea estate sunrise above a sea of clouds.',
                experiences: [
                  {
                    time: '05:00 AM',
                    title: '4x4 Jeep Safari to Kolukkumalai Peak',
                    description: 'Ascend rugged dirt switchbacks to witness the sunrise break over Tamil Nadu plains from 7,900 ft.',
                    category: 'adventure',
                    location: 'Kolukkumalai',
                    lat: 10.0767,
                    lng: 77.1667,
                    durationMinutes: 240,
                    costINR: 1800,
                    tip: 'The orthodox CTC black tea at the vintage 1935 factory is unforgettable.',
                  },
                ],
              },
            ],
          },
        ],
        returnLeg: {
          mode: 'flight',
          from: 'Kochi (COK)',
          durationHours: 2.5,
          distanceKm: 0,
          approxCostINR: 5200,
          notes: 'IndiGo flight back from Cochin International Airport (COK).',
          operator: 'IndiGo Airlines',
        },
      });
    }

    if (false) {
      return res.json({
        title: 'Goa & Gokarna Coastal Escape',
        tagline: '6 days of sunset shacks, hidden coves, Portuguese heritage villas, and chilled cafes',
        totalDays: 6,
        travelers: travelers || { adults: 2, children: 0, style: 'Friends / Couple' },
        budgetLevel: budgetLevel || 'midrange',
        bestSeasonNote: 'November through February gives sunny 29°C beach days with cool evening breezes.',
        totalEstimatedCostINR: 38000,
        packingTips: ['Swimwear and quick-dry towels', 'Slip-on flip-flops and boat shoes', 'Sun hat and sunglasses', 'Small waterproof dry bag for boat rides'],
        cautions: ['Strong undertows at certain beaches; always swim between the lifeguard flags', 'Renting scooters requires a valid driving license and mandatory helmets'],
        cities: [
          {
            name: 'South Goa (Palolem & Agonda)',
            state: 'Goa',
            nights: 4,
            lat: 15.01,
            lng: 74.0232,
            blurb: 'A softer, quieter Goa of swaying palms, pristine curved sands, and candlelit seafood shacks.',
            transportFromPrev: {
              mode: 'flight',
              from: 'Origin',
              durationHours: 2.0,
              distanceKm: 0,
              approxCostINR: 4200,
              notes: 'Arrive at Goa Dabolim (GOI) or Manohar International Airport Mopa (GOX).',
              operator: 'IndiGo / Akasa Air',
            },
            stay: {
              type: 'boutique',
              name: 'Ciaran’s Beach Huts / The Cape Goa',
              approxCostPerNightINR: 5500,
              whyGood: 'Rustic luxury cliffside cottage with Jacuzzis gazing directly at ocean sunsets.',
            },
            days: [
              {
                day: 1,
                title: 'Palolem Sunset & Fresh Crab Curry',
                summary: 'Check into beachfront wooden chalets and take an evening dip in calm waters.',
                experiences: [
                  {
                    time: '03:30 PM',
                    title: 'Palolem Beach Relaxation & Kayaking',
                    description: 'Paddle transparent kayaks out to Green Island to spot wild dolphins breaching in the cove.',
                    category: 'adventure',
                    location: 'Palolem Beach',
                    lat: 15.01,
                    lng: 74.0232,
                    durationMinutes: 120,
                    costINR: 400,
                    tip: 'The southern end of the beach has the calmest water for swimming.',
                  },
                  {
                    time: '07:30 PM',
                    title: 'Seafood Thali Dinner at Dropadi',
                    description: 'Kingfish rava fry, butter garlic calamari, and Goan poi bread right on the sand.',
                    category: 'food',
                    location: 'Palolem Beachfront',
                    lat: 15.0102,
                    lng: 74.0235,
                    durationMinutes: 90,
                    costINR: 800,
                    tip: 'Try the Bebinca layered coconut dessert.',
                  },
                ],
              },
            ],
          },
        ],
        returnLeg: {
          mode: 'flight',
          from: 'Goa (GOX)',
          durationHours: 2.0,
          distanceKm: 0,
          approxCostINR: 4200,
          notes: 'Nonstop flight home from Goa.',
          operator: 'IndiGo Airlines',
        },
      });
    }

    // Default: Complete Golden Triangle
    res.json({
      title: 'Family Golden Triangle: Delhi, Agra & Jaipur',
      tagline: '7 days of Mughal grandeur, Rajput royalty, vibrant bazaars, and kid-friendly storytelling',
      totalDays: 7,
      travelers: travelers || { adults: 2, children: 2, style: 'Family with kids' },
      budgetLevel: budgetLevel || 'midrange',
      bestSeasonNote: 'October to March offers pleasant daytime temperatures and clear skies across North India.',
      totalEstimatedCostINR: 64500,
      packingTips: [
        'Breathable cotton layers with one light fleece for early mornings',
        'Slip-on shoes or socks for visiting temples and monuments where shoes are taken off',
        'UV sunglasses, wide-brim hats, and child-safe mosquito repellent',
        'Small pocket cash in INR 100/200/500 denominations for rickshaws and street vendors',
      ],
      cautions: [
        'Taj Mahal is closed on Fridays for prayers; plan Agra timing accordingly',
        'Tap water is not potable; stick strictly to sealed bottled water or filtered hotel water',
        'Monkeys at Amber Fort and Agra Fort can be cheeky—keep food hidden inside zipped bags',
      ],
      cities: [
        {
          name: 'Delhi',
          state: 'Delhi NCR',
          nights: 2,
          lat: 28.6139,
          lng: 77.209,
          blurb: 'A breathless collision of imperial Mughal sandstone, fragrant Old Delhi spice markets, and leafy tree-lined colonial avenues.',
          transportFromPrev: {
            mode: 'flight',
            from: 'Origin',
            durationHours: 2.5,
            distanceKm: 0,
            approxCostINR: 4500,
            notes: 'Arrive at IGI Airport (DEL) Terminal 3. Pre-paid airport taxi to Central Delhi.',
            operator: 'IndiGo / Air India',
            toCode: 'DEL',
          },
          stay: {
            type: 'heritage',
            name: 'The Claridges / Haveli Dharampura',
            approxCostPerNightINR: 7500,
            whyGood: 'Spacious heritage courtyard ambiance in Central Delhi with quiet gardens for children.',
          },
          days: [
            {
              day: 1,
              title: 'Old Delhi Bites & Mughal Heritage',
              summary: 'A sensory plunge through the heart of the 17th-century walled city of Shahjahanabad.',
              experiences: [
                {
                  time: '09:30 AM',
                  title: 'Jama Masjid & Cycle Rickshaw Ride',
                  description: 'Marvel at the sweeping red sandstone expanse of India\'s largest historic mosque before a guided cycle rickshaw safari through Dariba Kalan silver market.',
                  category: 'sightseeing',
                  location: 'Old Delhi',
                  lat: 28.6507,
                  lng: 77.2334,
                  durationMinutes: 120,
                  costINR: 350,
                  tip: 'Ladies must cover shoulders and knees; robe rental is available at gate 3.',
                },
                {
                  time: '01:00 PM',
                  title: 'Chandni Chowk Food Trail & Paranthe Wali Gali',
                  description: 'Savor piping hot stuffed paranthas (rabri, mint, paneer) served with pumpkin subzi and tart tamarind chutney.',
                  category: 'food',
                  location: 'Chandni Chowk',
                  lat: 28.6562,
                  lng: 77.2307,
                  durationMinutes: 75,
                  costINR: 400,
                  tip: 'Pair with creamy lassi served in traditional terracotta kulhads.',
                },
                {
                  time: '03:30 PM',
                  title: 'Humayun\'s Tomb & Sunder Nursery Walk',
                  description: 'Stroll through the UNESCO Persian charbagh water gardens that directly inspired the Taj Mahal, followed by child-friendly lawns at adjacent Sunder Nursery.',
                  category: 'culture',
                  location: 'Nizamuddin East',
                  lat: 28.5933,
                  lng: 77.2507,
                  durationMinutes: 120,
                  costINR: 500,
                  tip: 'The light is golden between 4:30 PM and sunset for family portraits.',
                },
              ],
            },
          ],
        },
        {
          name: 'Agra',
          state: 'Uttar Pradesh',
          nights: 1,
          lat: 27.1767,
          lng: 78.0081,
          blurb: 'Home of the sublime Taj Mahal, perched on the curved banks of the sacred Yamuna River.',
          transportFromPrev: {
            mode: 'train',
            from: 'Delhi',
            durationHours: 1.7,
            distanceKm: 200,
            approxCostINR: 850,
            notes: 'Gatimaan Express (Train 12050) from Hazrat Nizamuddin to Agra Cantt. Executive AC Chair car includes breakfast.',
            operator: 'Indian Railways (Gatimaan Express)',
          },
          stay: {
            type: 'midrange',
            name: 'ITC Mughal / Coral Tree Homestay',
            approxCostPerNightINR: 5500,
            whyGood: 'Close to Taj East Gate with rooftop views and warm hospitable family cooking.',
          },
          days: [
            {
              day: 2,
              title: 'The Monument to Love & Agra Fort',
              summary: 'Dawn sunrise at the world\'s most famous mausoleum, followed by Emperor Akbar\'s imposing red bastion.',
              experiences: [
                {
                  time: '06:00 AM',
                  title: 'Dawn at Taj Mahal',
                  description: 'Watch the ivory marble shift through shades of pale violet, peach, and blinding white as the morning sun crests the Yamuna.',
                  category: 'sightseeing',
                  location: 'Taj East Gate',
                  lat: 27.1751,
                  lng: 78.0421,
                  durationMinutes: 150,
                  costINR: 1100,
                  tip: 'Book electronic ASI entry tickets online 2 days ahead to skip ticket booth lines.',
                },
              ],
            },
          ],
        },
        {
          name: 'Jaipur',
          state: 'Rajasthan',
          nights: 3,
          lat: 26.9124,
          lng: 75.7873,
          blurb: 'The Pink City: majestic hilltop forts, candy-pink palace facades, hand block printing, and regal feasts.',
          transportFromPrev: {
            mode: 'car',
            from: 'Agra',
            durationHours: 4.5,
            distanceKm: 240,
            approxCostINR: 3800,
            notes: 'Private air-conditioned Innova cab via Fatehpur Sikri and the Abhaneri stepwell.',
            operator: 'Rajasthan Tourism Registered Cab',
          },
          stay: {
            type: 'heritage',
            name: 'Shahpura House / Alsisar Haveli',
            approxCostPerNightINR: 6800,
            whyGood: 'Authentic Rajput frescoed ceilings, courtyard swimming pool for the kids, and nightly folk dancers.',
          },
          days: [
            {
              day: 3,
              title: 'Pink City Palaces & Jantar Mantar',
              summary: 'Discover the whimsical honeycomb Hawa Mahal and giant cosmic instruments.',
              experiences: [
                {
                  time: '09:00 AM',
                  title: 'Hawa Mahal (Palace of the Winds)',
                  description: 'Gaze up at the 953 carved sandstone jharokhas designed for royal ladies to view city street processions unnoticed.',
                  category: 'sightseeing',
                  location: 'Badi Chaupar',
                  lat: 26.9239,
                  lng: 75.8267,
                  durationMinutes: 60,
                  costINR: 200,
                  tip: 'Visit Tattoo Cafe on the opposite rooftop for the iconic frontal camera angle.',
                },
              ],
            },
          ],
        },
      ],
      returnLeg: {
        mode: 'train',
        from: 'Jaipur',
        durationHours: 4.0,
        distanceKm: 280,
        approxCostINR: 1250,
        notes: 'Vande Bharat Express (Train 20977) back to Delhi in AC comfort.',
        operator: 'Indian Railways (Vande Bharat Express)',
      },
    });
  } catch (err: any) {
    console.error('Plan error:', err);
    res.status(500).json({ error: 'Failed to generate plan' });
  }
});

// 8. Chat API (Conversational refinement of trip)
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversation = [], itineraryContext } = req.body;
    const ai = getAI();

    if (ai && message) {
      try {
        const chatPrompt = `You are WanderPulse, the AI travel planner for India at wanderpulse.com.
You are helping the traveler refine or answer questions about their trip in India.
Current Itinerary Context:
Title: ${itineraryContext?.title || 'India trip'}
Cities: ${(itineraryContext?.cities || []).join(', ')}
Total Days: ${itineraryContext?.totalDays || 7}
Budget: ${itineraryContext?.budgetLevel || 'midrange'}

User asks: "${message}"

Respond concisely, warmly, and knowledgeably with practical India travel advice (train classes, timing, seasons, foods, dress codes, INR prices). Keep it to 2-3 brief paragraphs.`;

        const responseText = await callGeminiWithFallback(chatPrompt);

        if (responseText) {
          return res.json({
            action: 'answer',
            answer: responseText,
          });
        }
      } catch (err: any) {
        console.warn('Gemini chat fallback used:', err?.message || err);
      }
    }

    // Smart heuristic responses
    const lower = (message || '').toLowerCase();
    let reply = '';
    if (lower.includes('cheaper') || lower.includes('budget') || lower.includes('cost')) {
      reply = `To trim costs while keeping the trip unforgettable, switch inter-city private cabs to high-speed Vande Bharat Chair Cars (saves ~₹2,500/leg) and opt for vetted boutique heritage havelis or Zostel private rooms (₹1,500–₹2,500/night). Eating at authentic local thali places like Natraj or Laxmi Mishthan Bhandar will also give you better food for under ₹300 per person!`;
    } else if (lower.includes('longer') || lower.includes('extra day') || lower.includes('add')) {
      reply = `Adding extra time is a fantastic idea! For Rajasthan, an extra 2 days lets you explore the blue alleys of Jodhpur and stay at a heritage desert camp in Jaisalmer under the stars. For Kerala, 2 extra days lets you unwind on the red laterite cliffs of Varkala.`;
    } else if (lower.includes('food') || lower.includes('eat') || lower.includes('restaurant')) {
      reply = `India's street food is an art form! Must-tries: piping-hot Daulat Ki Chaat and paranthas in Old Delhi, Dal Baati Churma cooked in pure desi ghee at 1135 AD in Amber Fort, and fresh Appam with coconut vegetable stew in Kerala. Always choose stalls with a high local turnover and drink bottled water.`;
    } else {
      reply = `Great suggestion! I've noted that for your itinerary. In India, pacing is everything—leaving 2-3 hours of breathing room in the afternoon keeps energy high for magical sunset ghats, palace light shows, and lively evening bazaars.`;
    }

    res.json({ action: 'answer', answer: reply });
  } catch (err: any) {
    res.status(500).json({ error: 'Chat failed' });
  }
});

// Vite middleware for dev or static serving for production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`WanderPulse server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
