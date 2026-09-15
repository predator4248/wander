import { NonIndiaMatch, Itinerary } from '../types';
import {
  SAMPLE_LADAKH_ITINERARY,
  SAMPLE_RAJASTHAN_ITINERARY,
  SAMPLE_VARANASI_ITINERARY,
  SAMPLE_GOA_ITINERARY,
  SAMPLE_KERALA_ITINERARY,
  SAMPLE_MEGHALAYA_ITINERARY,
} from './curatedItineraries';

export {
  SAMPLE_LADAKH_ITINERARY,
  SAMPLE_RAJASTHAN_ITINERARY,
  SAMPLE_VARANASI_ITINERARY,
  SAMPLE_GOA_ITINERARY,
  SAMPLE_KERALA_ITINERARY,
  SAMPLE_MEGHALAYA_ITINERARY,
};

export interface CarouselSlide {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
}

export const HERO_CAROUSEL: CarouselSlide[] = [
  {
    src: '/images/nubra-valley.jpg',
    alt: 'Nubra Valley in Ladakh',
    title: 'Moonscapes and monasteries in Ladakh',
    subtitle: 'Leh, Nubra and Pangong, 10 days.',
  },
  {
    src: '/images/varkala-cliff.jpg',
    alt: 'Varkala cliff beach in Kerala',
    title: 'Cliff beaches and cafes in Kerala',
    subtitle: 'Varkala and Kovalam, 8 days.',
  },
  {
    src: '/images/udaipur.jpg',
    alt: 'Udaipur city palace by the lake',
    title: 'Palaces and lakes in Rajasthan',
    subtitle: 'Udaipur, Jodhpur and Jaipur, 9 days.',
  },
  {
    src: '/images/meghalaya-falls.jpg',
    alt: 'Waterfalls in Meghalaya',
    title: 'Waterfalls and root bridges in Meghalaya',
    subtitle: 'Shillong, Cherrapunji and Dawki, 7 days.',
  },
  {
    src: '/images/munnar.jpg',
    alt: 'Tea estates in Munnar, Kerala',
    title: 'Tea estates and misty hills',
    subtitle: 'Munnar, Thekkady and Wayanad, 7 days.',
  },
  {
    src: '/images/varanasi.jpg',
    alt: 'Ghats and boats in Varanasi',
    title: 'Ghats, aarti and the Ganga',
    subtitle: 'Varanasi and Bodh Gaya, 5 days.',
  },
  {
    src: '/images/palolem-beach.jpg',
    alt: 'Palolem beach in South Goa',
    title: 'Sunset shacks and slow days',
    subtitle: 'South Goa and Gokarna, 6 days.',
  },
];

export const QUICK_ACTIONS = [
  { id: 'leh', label: 'Manali to Leh (10D)', prompt: 'Plan an epic 10-day scenic road trip from Manali to Leh Ladakh with Nubra and Pangong' },
  { id: 'kerala', label: 'Kerala Backwaters (8D)', prompt: '8-day relaxing Kerala honeymoon: Kochi, Alleppey houseboat and Munnar tea hills' },
  { id: 'rajasthan', label: 'Rajasthan Palaces (9D)', prompt: 'Plan a 9-day royal trip to Rajasthan with Jaipur, Jodhpur and Udaipur palaces' },
  { id: 'goa', label: 'Goa Coastal Escape (6D)', prompt: 'A relaxing 6-day beach escape to South Goa and Gokarna with cafes and shacks' },
  { id: 'varanasi', label: 'Varanasi Ghats (5D)', prompt: 'Spiritual 5-day trip to Varanasi ghats, dawn boat ride and Bodh Gaya' },
  { id: 'inspire', label: 'Inspire me', prompt: 'Suggest an offbeat 7-day nature and culture trip in India for couples' },
];

export const FEATURED_ITINERARIES = [
  {
    title: 'Family Golden Triangle',
    subtitle: 'Delhi, Agra & Jaipur, 7 days',
    query: 'Family Golden Triangle trip: Delhi, Agra, Jaipur in 7 days with kids',
    src: '/images/amber-fort.jpg',
  },
  {
    title: 'Kerala Backwaters Honeymoon',
    subtitle: 'Kochi to Alleppey to Munnar, 8 days',
    query: 'Kerala honeymoon: Kochi, Alleppey houseboat, Munnar tea estates for 8 days',
    src: '/images/kerala-backwaters.jpg',
  },
  {
    title: 'Manali to Leh Road Trip',
    subtitle: 'Himalayan highway, 10 days',
    query: 'Manali to Leh road trip 10 days with monasteries and Pangong Lake',
    src: '/images/nubra-valley.jpg',
  },
  {
    title: 'Goa & Gokarna Beach Escape',
    subtitle: 'Beaches and cafes, 6 days',
    query: '6 days chilling in Goa and Gokarna beaches with cafes and sunset shacks',
    src: '/images/goa-beach.jpg',
  },
  {
    title: 'Rajasthan Palaces Circuit',
    subtitle: 'Jaipur, Jodhpur, Udaipur, 10 days',
    query: '10-day Rajasthan trip through Jaipur, Jodhpur and Udaipur with heritage stays',
    src: '/images/udaipur.jpg',
  },
  {
    title: 'Varanasi Ghats & Bodh Gaya',
    subtitle: 'Spiritual North India, 5 days',
    query: '5 days spiritual trip Varanasi and Bodh Gaya with dawn Ganga aarti',
    src: '/images/varanasi.jpg',
  },
];

export const WHY_WANDERPULSE_PILLARS = [
  {
    title: 'Tailor-made',
    iconName: 'Wand2',
    body: 'Tell me your vibe, budget, and pace. I design each day around what you actually want, not a template.',
  },
  {
    title: 'Cheaper',
    iconName: 'IndianRupee',
    body: 'Real INR costs across trains, flights, stays and experiences. I flag when a leg or activity is worth splurging on.',
  },
  {
    title: 'Hidden gems',
    iconName: 'Gem',
    body: 'Beyond the guidebook. Local sweets, ghats at dawn, tea estates the tour buses miss.',
  },
  {
    title: 'Made for India',
    iconName: 'MapPin',
    body: 'Monsoon aware, train savvy, temple dress code ready. Built for the messy magic of Indian travel.',
  },
];

export const INSPIRATION_GALLERY = [
  { caption: 'A weekend in Jaipur', src: '/images/hawa-mahal.jpg' },
  { caption: 'Where to next?', src: '/images/kerala-backwaters.jpg' },
  { caption: 'Find me a beach escape', src: '/images/palolem-beach.jpg' },
  { caption: 'A foodie trip to Delhi', src: '/images/chandni-chowk.jpg' },
  { caption: 'Surprise me with somewhere new', src: '/images/meghalaya-falls.jpg' },
  { caption: 'Best time to visit Ladakh?', src: '/images/nubra-valley.jpg' },
  { caption: 'A romantic week in Udaipur', src: '/images/udaipur.jpg' },
  { caption: 'Family trip to Kerala', src: '/images/munnar.jpg' },
];

export const COMPARISONS = [
  { name: 'Layla', href: '/vs/layla', angle: 'Independent vs Expedia-owned' },
  { name: 'Mindtrip', href: '/vs/mindtrip', angle: 'No login wall vs signup gate' },
  { name: 'ChatGPT', href: '/vs/chatgpt', angle: 'Specialist vs generalist' },
  { name: 'Wonderplan', href: '/vs/wonderplan', angle: 'India depth vs template' },
  { name: 'MakeMyTrip', href: '/vs/makemytrip', angle: 'Plan first, then book' },
];

export const AUDIENCE_TYPES = [
  { label: 'Honeymoons', href: '/for/honeymoon', blurb: 'Houseboats, hill stations, slower pacing.' },
  { label: 'Families', href: '/for/families', blurb: 'Kid-menu hotels, shorter drives, buffer days.' },
  { label: 'First-time visitors', href: '/for/first-timers', blurb: 'Golden Triangle plus one deep add-on.' },
  { label: 'Solo female', href: '/for/solo-female', blurb: 'Well-lit stays, daytime transfers, trusted regions.' },
  { label: 'NRIs', href: '/for/nri', blurb: 'Family time plus travel, festival timing, weekend Triangles.' },
];

export const FAQ_ITEMS = [
  {
    q: 'What is WanderPulse?',
    a: 'WanderPulse (wanderpulse.com) is an AI trip planner focused only on India travel. We build complete, day-by-day itineraries with real INR costs, transport, stays, and hidden gems.',
  },
  {
    q: 'Why focus exclusively on India travel?',
    a: 'India is vast, culturally intricate, and logistically nuanced. General-purpose travel bots fail to understand Indian railway booking windows, monsoon weather patterns, regional festivals, or local transport. By focusing 100% on India, WanderPulse delivers hyper-accurate itineraries, genuine costs, and insider recommendations.',
  },
  {
    q: 'How does WanderPulse work?',
    a: 'Just tell me where you want to go in India, how long, and your travel style. I instantly build a personalized itinerary with cities, day plans, transport and stays. Refine anytime by chatting with me.',
  },
  {
    q: 'Is WanderPulse free to use?',
    a: 'Yes. The core planner is free. No accounts on external services required, no payments, no spam.',
  },
  {
    q: 'Can WanderPulse plan multi-city or road trips inside India?',
    a: 'Absolutely. I specialize in multi-city Indian itineraries and road trips like Manali-Leh, Golden Triangle, Kerala circuits, and Rajasthan palace tours. I pick the right mix of trains, flights and cars for each leg.',
  },
  {
    q: 'Can WanderPulse plan family trips?',
    a: 'Yes. I balance sightseeing with downtime, find family-friendly stays, and add activities that work for both kids and grandparents. Just tell me who\'s traveling.',
  },
  {
    q: 'Is WanderPulse good for solo travelers?',
    a: 'Definitely. For solo trips I design a safe, flexible, and affordable itinerary with well-connected neighborhoods, trusted stays and easy transport. I add extra safety notes for solo women travelers.',
  },
  {
    q: 'Does WanderPulse plan trips for couples?',
    a: 'Of course. Think Udaipur lake palaces, Kerala houseboats, sunset dinners in Jaipur, tea estate stays in Munnar. I curate romantic experiences with private moments in mind.',
  },
  {
    q: 'How many days should I spend on an India trip?',
    a: '3 to 5 days for a single city, 7 to 10 days for a circuit like the Golden Triangle or South India temples, 12 to 15 days for a big trip like Rajasthan end to end or a Himalayan road trip. I\'ll tailor the pace to your energy.',
  },
  {
    q: 'What kinds of experiences does WanderPulse include?',
    a: 'Iconic landmarks, hidden temples, street food walks, cooking classes, tea estate tours, dawn ghat aartis, block-print workshops, safaris, seasonal festivals, and much more. I balance must-see with off the beaten path.',
  },
];

export const NON_INDIA_DATABASE = [
  { patterns: ['thailand', 'bangkok', 'phuket', 'krabi', 'chiang mai', 'pattaya'], label: 'Thailand', alternatives: ['Goa', 'Andaman Islands', 'Pondicherry'] },
  { patterns: ['bali', 'ubud', 'seminyak', 'canggu'], label: 'Bali', alternatives: ['Havelock Island (Andaman)', 'Varkala (Kerala)', 'Gokarna'] },
  { patterns: ['indonesia', 'jakarta', 'yogyakarta', 'lombok'], label: 'Indonesia', alternatives: ['Andaman Islands', 'Meghalaya', 'Kerala'] },
  { patterns: ['vietnam', 'hanoi', 'ho chi minh', 'saigon', 'halong', 'da nang'], label: 'Vietnam', alternatives: ['Northeast India (Assam, Meghalaya)', 'Kolkata food walk', 'Hampi'] },
  { patterns: ['cambodia', 'angkor', 'siem reap'], label: 'Cambodia', alternatives: ['Hampi', 'Khajuraho temples', 'Ellora and Ajanta caves'] },
  { patterns: ['laos', 'vientiane', 'luang prabang'], label: 'Laos', alternatives: ['Sikkim', 'Arunachal Pradesh', 'Meghalaya'] },
  { patterns: ['malaysia', 'kuala lumpur', 'penang', 'langkawi'], label: 'Malaysia', alternatives: ['Kerala', 'Coorg', 'Andaman Islands'] },
  { patterns: ['singapore'], label: 'Singapore', alternatives: ['Mumbai', 'Bengaluru', 'Kolkata'] },
  { patterns: ['philippines', 'manila', 'palawan', 'boracay'], label: 'Philippines', alternatives: ['Andaman Islands', 'Lakshadweep', 'Goa'] },
  { patterns: ['nepal', 'kathmandu', 'pokhara', 'everest', 'annapurna'], label: 'Nepal', alternatives: ['Himachal Pradesh (Manali, Spiti)', 'Uttarakhand (Rishikesh, Auli)', 'Sikkim'] },
  { patterns: ['bhutan', 'thimphu', 'paro'], label: 'Bhutan', alternatives: ['Sikkim (Gangtok, Yumthang)', 'Arunachal (Tawang)', 'Ladakh monasteries'] },
  { patterns: ['sri lanka', 'srilanka', 'sri-lanka', 'colombo', 'kandy', 'ella', 'galle', 'sigiriya', 'sinhala'], label: 'Sri Lanka', alternatives: ['Kerala backwaters', 'Tamil Nadu temples', 'Andaman Islands'] },
  { patterns: ['maldives', 'male', 'atoll'], label: 'Maldives', alternatives: ['Lakshadweep', 'Andaman Islands', 'Havelock'] },
  { patterns: ['pakistan', 'lahore', 'karachi', 'islamabad'], label: 'Pakistan', alternatives: ['Rajasthan (Jaisalmer, Bikaner)', 'Amritsar', 'Kashmir Valley'] },
  { patterns: ['bangladesh', 'dhaka', 'chittagong'], label: 'Bangladesh', alternatives: ['Kolkata', 'Sundarbans', 'Assam tea gardens'] },
  { patterns: ['myanmar', 'burma', 'yangon'], label: 'Myanmar', alternatives: ['Manipur', 'Nagaland', 'Assam'] },
  { patterns: ['japan', 'tokyo', 'kyoto', 'osaka', 'hokkaido'], label: 'Japan', alternatives: ['Kashmir (spring blossoms)', 'Shillong cherry blossom festival', 'Coorg coffee highlands'] },
  { patterns: ['china', 'beijing', 'shanghai', 'chengdu', 'great wall'], label: 'China', alternatives: ['Rajasthan forts', 'Ladakh monasteries', 'Great Himalayan National Park'] },
  { patterns: ['korea', 'seoul', 'busan'], label: 'Korea', alternatives: ['Meghalaya', 'Sikkim', 'Rishikesh'] },
  { patterns: ['taiwan', 'taipei'], label: 'Taiwan', alternatives: ['Coorg', 'Meghalaya', 'Wayanad'] },
  { patterns: ['hong kong', 'hongkong', 'hong-kong'], label: 'Hong Kong', alternatives: ['Mumbai', 'Bengaluru', 'Kolkata'] },
  { patterns: ['dubai', 'abu dhabi', 'abudhabi', 'abu-dhabi', 'uae', 'u.a.e', 'emirates'], label: 'the UAE', alternatives: ['Mumbai', 'Jaipur luxury circuit', 'Udaipur palaces'] },
  { patterns: ['turkey', 'istanbul', 'cappadocia'], label: 'Turkey', alternatives: ['Kashmir (shikara + saffron)', 'Rajasthan (Jaipur, Udaipur)', 'Old Delhi'] },
  { patterns: ['egypt', 'cairo', 'luxor', 'nile', 'pyramids'], label: 'Egypt', alternatives: ['Hampi ruins', 'Khajuraho temples', 'Rajasthan forts'] },
  { patterns: ['morocco', 'marrakech', 'fes', 'sahara', 'casablanca'], label: 'Morocco', alternatives: ['Rajasthan (Jaisalmer, Jaipur)', 'Rann of Kutch', 'Bikaner'] },
  { patterns: ['europe', 'european'], label: 'Europe', alternatives: ['Rajasthan (heritage havelis)', 'Kolkata (colonial architecture)', 'Goa (Portuguese heritage)'] },
  { patterns: ['france', 'paris', 'provence', 'nice', 'riviera'], label: 'France', alternatives: ['Pondicherry (French heritage)', 'Chandernagore', 'Rajasthan palaces'] },
  { patterns: ['italy', 'rome', 'florence', 'venice', 'amalfi', 'tuscany'], label: 'Italy', alternatives: ['Konkan coast (Ganpatipule, Gokarna)', 'Rajasthan heritage havelis', 'Old Goa churches'] },
  { patterns: ['spain', 'madrid', 'barcelona', 'seville', 'andalusia'], label: 'Spain', alternatives: ['Goa', 'Old Bombay art deco', 'Rajasthan'] },
  { patterns: ['portugal', 'lisbon', 'porto'], label: 'Portugal', alternatives: ['Goa', 'Fort Kochi Portuguese quarter', 'Diu and Daman'] },
  { patterns: ['greece', 'athens', 'santorini', 'mykonos'], label: 'Greece', alternatives: ['Andaman Islands', 'Varkala cliff', 'Diu'] },
  { patterns: ['uk', 'england', 'london', 'scotland', 'edinburgh', 'cotswolds'], label: 'the UK', alternatives: ['Shimla', 'Ooty', 'Kolkata (Victorian colonial)'] },
  { patterns: ['switzerland', 'zurich', 'geneva', 'alps', 'interlaken'], label: 'Switzerland', alternatives: ['Kashmir Valley', 'Manali and Solang', 'Sikkim'] },
  { patterns: ['usa', 'u.s.a', 'u.s.', 'america', 'american', 'united states', 'new york', 'newyork', 'california', 'los angeles', 'miami', 'chicago'], label: 'the USA', alternatives: ['Rajasthan road trip', 'Kerala + Andaman combo', 'Golden Triangle'] },
  { patterns: ['australia', 'sydney', 'melbourne', 'great barrier reef'], label: 'Australia', alternatives: ['Andaman Islands', 'Goa', 'Rajasthan road trip'] },
  { patterns: ['new zealand', 'newzealand', 'auckland', 'queenstown'], label: 'New Zealand', alternatives: ['Ladakh', 'Sikkim', 'Meghalaya'] },
];

export function detectNonIndia(query: string): NonIndiaMatch | null {
  if (!query) return null;
  const lower = ` ${query.toLowerCase()} `;
  for (const item of NON_INDIA_DATABASE) {
    for (const pattern of item.patterns) {
      const reg = new RegExp(`[^a-z]${pattern}[^a-z]`, 'i');
      if (reg.test(lower)) {
        return {
          place: item.label,
          alternatives: item.alternatives,
        };
      }
    }
  }
  return null;
}

export function buildNonIndiaRedirect(match: NonIndiaMatch): string {
  const alts = match.alternatives;
  const formatted =
    alts.length === 1
      ? alts[0]
      : alts.length === 2
      ? `${alts[0]} or ${alts[1]}`
      : `${alts.slice(0, -1).join(', ')}, or ${alts[alts.length - 1]}`;
  return `Ah, ${match.place} sounds lovely, but WanderPulse plans only inside India. Going ridiculously deep on one country beats spreading thin. If you love the ${match.place} vibe, try ${formatted}. Want me to plan any of those?`;
}

export const SAMPLE_GOLDEN_TRIANGLE: Itinerary = {
  title: 'Family Golden Triangle: Delhi, Agra & Jaipur',
  tagline: '7 days of Mughal grandeur, Rajput royalty, vibrant bazaars, and kid-friendly storytelling',
  totalDays: 7,
  travelers: {
    adults: 2,
    children: 2,
    style: 'Family with kids',
  },
  budgetLevel: 'midrange',
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
        {
          day: 2,
          title: 'Crafts, Bangles & Lodhi Gardens',
          summary: 'Modern Delhi culture, open lawns for children, and vibrant folk artisans at Dilli Haat.',
          experiences: [
            {
              time: '10:00 AM',
              title: 'National Rail Museum',
              description: 'Kids ride the historic steam toy train around full-sized vintage royal saloons of Indian Maharajas.',
              category: 'adventure',
              location: 'Chanakyapuri',
              lat: 28.5855,
              lng: 77.1798,
              durationMinutes: 120,
              costINR: 150,
              tip: 'Outdoor mini-train runs every 20 minutes.',
            },
            {
              time: '01:30 PM',
              title: 'Lunch at Dilli Haat INA',
              description: 'Open-air village crafts market with authentic regional food stalls from 28 states—try momos from Sikkim and dosa from Kerala.',
              category: 'food',
              location: 'INA Market',
              lat: 28.5733,
              lng: 77.2084,
              durationMinutes: 90,
              costINR: 500,
              tip: 'Great spot to buy handmade wooden toys and embroidered scarves.',
            },
            {
              time: '04:30 PM',
              title: 'Sunset at Lodhi Gardens',
              description: 'Relax on manicured lawns surrounded by 15th-century Sayyid and Lodhi dynasty domed tombs.',
              category: 'nature',
              location: 'Lodhi Road',
              lat: 28.5931,
              lng: 77.2197,
              durationMinutes: 90,
              costINR: 0,
              tip: 'Free entry; pack frisbees or sketchbooks for the kids.',
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
          day: 3,
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
              tip: 'Book electronic ASI entry tickets online 2 days ahead to skip the ticket booth lines.',
            },
            {
              time: '11:30 AM',
              title: 'Agra Fort & Diwan-i-Khas',
              description: 'Explore the royal courtyards, marble pavilions, and the octagonal Musamman Burj tower where Shah Jahan spent his final captive years looking at the Taj.',
              category: 'culture',
              location: 'Agra Fort',
              lat: 27.1795,
              lng: 78.0211,
              durationMinutes: 100,
              costINR: 650,
              tip: 'Hire an official ASI licensed guide at the gate with badge.',
            },
            {
              time: '05:00 PM',
              title: 'Mehtab Bagh Across the River',
              description: 'View the reflection of the Taj Mahal framed across the water in the tranquil riverside Moonlight Garden.',
              category: 'nature',
              location: 'Across Yamuna River',
              lat: 27.1798,
              lng: 78.0425,
              durationMinutes: 90,
              costINR: 300,
              tip: 'Much quieter than inside the Taj complex itself.',
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
        notes: 'Private air-conditioned Innova cab via Fatehpur Sikri and the Abhaneri stepwell (Chand Baori).',
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
          day: 4,
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
            {
              time: '11:00 AM',
              title: 'City Palace & Chandra Mahal',
              description: 'Walk through the famous Peacock Gate in the inner courtyard and view the weapons and royal textile collection.',
              category: 'culture',
              location: 'Jaleb Chowk',
              lat: 26.9258,
              lng: 75.8236,
              durationMinutes: 120,
              costINR: 700,
              tip: 'Children love seeing the giant sterling silver Gangajali urns.',
            },
            {
              time: '03:00 PM',
              title: 'Jantar Mantar Astronomical Marvels',
              description: 'Stand beside the world\'s largest stone sundial, accurate to within 2 seconds.',
              category: 'adventure',
              location: 'Adjacent to City Palace',
              lat: 26.9248,
              lng: 75.8246,
              durationMinutes: 75,
              costINR: 200,
              tip: 'Kids are fascinated watching the shadow move in real time across the dial.',
            },
          ],
        },
        {
          day: 5,
          title: 'Amber Fort & Elephant Sanctuary',
          summary: 'Hilltop ramparts, glittering mirror palaces, and ethical elephant experiences.',
          experiences: [
            {
              time: '08:30 AM',
              title: 'Amber Fort & Sheesh Mahal',
              description: 'Ascend the rugged Aravalli ridge to explore the palace of Raja Man Singh. The Sheesh Mahal ceiling glitters like a starfield when lit by a single flashlight.',
              category: 'sightseeing',
              location: 'Amer',
              lat: 26.9855,
              lng: 75.8513,
              durationMinutes: 150,
              costINR: 550,
              tip: 'Take an open jeep up the cobblestone ramp instead of walking with strollers.',
            },
            {
              time: '01:30 PM',
              title: 'Dal Baati Churma at 1135 AD',
              description: 'Feast like a royal in gold-leaf dining rooms serving traditional Rajasthani ghee-drizzled baati, spicy ker sangri, and sweet churma.',
              category: 'food',
              location: 'Amber Fort Level 2',
              lat: 26.9859,
              lng: 75.8509,
              durationMinutes: 90,
              costINR: 1200,
              tip: 'Ask for the terrace table overlooking the Maota Lake.',
            },
            {
              time: '04:00 PM',
              title: 'Anokhi Museum of Hand Printing',
              description: 'Hands-on block printing workshop for kids where they carve wooden stamps and dye their own bandhani napkins to keep.',
              category: 'culture',
              location: 'Kheri Gate, Amer',
              lat: 26.9892,
              lng: 75.8567,
              durationMinutes: 90,
              costINR: 150,
              tip: 'A wonderful, calm respite from tour buses.',
            },
          ],
        },
        {
          day: 6,
          title: 'Nahargarh Sunset & Bazaars',
          summary: 'Stepwells, panoramic fortress ramparts, and evening shopping for blue pottery and lac bangles.',
          experiences: [
            {
              time: '10:00 AM',
              title: 'Panna Meena Ka Kund Stepwell',
              description: 'Admire the geometric criss-cross staircases of this ancient 16th-century rainwater reservoir.',
              category: 'sightseeing',
              location: 'Amer Village',
              lat: 26.9872,
              lng: 75.8542,
              durationMinutes: 45,
              costINR: 0,
              tip: 'Extremely photogenic; go mid-morning for balanced shadows.',
            },
            {
              time: '02:00 PM',
              title: 'Johari & Bapu Bazaar Shopping',
              description: 'Browse sparkling handcrafted jewelry, embroidered mojari leather shoes, and block-printed quilts (Jaipuri razai).',
              category: 'shopping',
              location: 'Pink City Bazaars',
              lat: 26.9205,
              lng: 75.8239,
              durationMinutes: 120,
              costINR: 0,
              tip: 'Friendly bargaining is welcomed; start at roughly 60% of quoted price.',
            },
            {
              time: '05:30 PM',
              title: 'Sunset at Nahargarh Fort Padao',
              description: 'Watch the entire Pink City twinkle below in the twilight while sipping spiced chai.',
              category: 'nature',
              location: 'Aravalli Hills',
              lat: 26.9383,
              lng: 75.8157,
              durationMinutes: 100,
              costINR: 200,
              tip: 'Taxis charge around INR 800 return including waiting time.',
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
    notes: 'Vande Bharat Express (Train 20977) from Jaipur Jn back to Delhi Cantt in air-conditioned comfort, or direct flight home from Jaipur International Airport (JAI).',
    operator: 'Indian Railways (Vande Bharat Express)',
  },
};

export function getCuratedItineraryForQuery(query?: string): Itinerary {
  const lower = (query || '').toLowerCase().trim();
  if (!lower) return SAMPLE_GOLDEN_TRIANGLE;

  if (
    lower.includes('leh') ||
    lower.includes('ladakh') ||
    lower.includes('manali') ||
    lower.includes('pangong') ||
    lower.includes('nubra') ||
    lower.includes('spiti') ||
    lower.includes('road trip') ||
    lower.includes('himalay')
  ) {
    return SAMPLE_LADAKH_ITINERARY;
  }

  if (
    lower.includes('kerala') ||
    lower.includes('munnar') ||
    lower.includes('alleppey') ||
    lower.includes('kochi') ||
    lower.includes('varkala') ||
    lower.includes('houseboat') ||
    lower.includes('backwater')
  ) {
    return SAMPLE_KERALA_ITINERARY;
  }

  if (
    lower.includes('rajasthan') ||
    lower.includes('jaipur') ||
    lower.includes('udaipur') ||
    lower.includes('jodhpur') ||
    lower.includes('jaisalmer') ||
    lower.includes('palace') ||
    lower.includes('haveli') ||
    lower.includes('fort')
  ) {
    return SAMPLE_RAJASTHAN_ITINERARY;
  }

  if (
    lower.includes('goa') ||
    lower.includes('gokarna') ||
    lower.includes('beach') ||
    lower.includes('palolem') ||
    lower.includes('shack') ||
    lower.includes('coastal')
  ) {
    return SAMPLE_GOA_ITINERARY;
  }

  if (
    lower.includes('varanasi') ||
    lower.includes('kashi') ||
    lower.includes('ghat') ||
    lower.includes('ganga') ||
    lower.includes('aarti') ||
    lower.includes('bodh gaya') ||
    lower.includes('spiritual') ||
    lower.includes('sarnath')
  ) {
    return SAMPLE_VARANASI_ITINERARY;
  }

  if (
    lower.includes('meghalaya') ||
    lower.includes('shillong') ||
    lower.includes('cherrapunji') ||
    lower.includes('root bridge') ||
    lower.includes('waterfall') ||
    lower.includes('dawki') ||
    lower.includes('northeast')
  ) {
    return SAMPLE_MEGHALAYA_ITINERARY;
  }

  return SAMPLE_GOLDEN_TRIANGLE;
}

