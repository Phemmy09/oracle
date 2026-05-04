// ============================================
// ORACLE DATA SOURCES — The Intelligence Layer
// ============================================
// All data is fetched from free, public APIs and RSS feeds.
// No paid API keys required. No LLM involved.
// ============================================

// ===== JOB SOURCES =====
// Remote jobs in: n8n, AI agents, AI automation, GoHighLevel, 
// sales funnels, email marketing, website building, AI voice agents
export const JOB_SOURCES = [
  {
    name: 'RemoteOK',
    url: 'https://remoteok.com/api',
    type: 'json',
    tags: ['remote'],
  },
  {
    name: 'Remotive',
    url: 'https://remotive.com/api/remote-jobs?limit=30',
    type: 'json',
  },
  {
    name: 'Arbeitnow',
    url: 'https://www.arbeitnow.com/api/job-board-api',
    type: 'json',
  },
];

export const JOB_KEYWORDS = [
  'n8n', 'ai agent', 'ai automation', 'automation engineer',
  'gohighlevel', 'highlevel', 'sales funnel', 'email marketing',
  'website builder', 'ai voice', 'voice agent', 'chatbot',
  'ai engineer', 'ai security', 'red team', 'prompt engineer',
  'ai architect', 'machine learning', 'llm', 'rag',
  'zapier', 'make.com', 'workflow automation', 'no-code',
  'low-code', 'crm', 'saas', 'api integration',
  'ai consultant', 'ai governance', 'data engineer',
];

// ===== SCHOLARSHIP & OPPORTUNITY SOURCES =====
export const SCHOLARSHIP_SOURCES = [
  {
    name: 'OpportunityDesk',
    url: 'https://opportunitydesk.org/feed/',
    type: 'rss',
    focus: 'African youth opportunities',
  },
  {
    name: 'AfterSchoolAfrica',
    url: 'https://www.afterschoolafrica.com/feed/',
    type: 'rss',
    focus: 'Scholarships for Africans',
  },
  {
    name: 'Scholars4Dev',
    url: 'https://www.scholars4dev.com/feed/',
    type: 'rss',
    focus: 'International scholarships',
  },
  {
    name: 'OpportunitiesForAfricans',
    url: 'https://www.opportunitiesforafricans.com/feed/',
    type: 'rss',
    focus: 'Elite African opportunities',
  },
  {
    name: 'ScholarshipRegion',
    url: 'https://scholarshipregion.com/feed/',
    type: 'rss',
    focus: 'Regional scholarships',
  },
];

export const SCHOLARSHIP_KEYWORDS = [
  'fully funded', 'scholarship', 'fellowship', 'phd', 'masters',
  'ai', 'artificial intelligence', 'machine learning', 'robotics',
  'agriculture', 'agritech', 'agric', 'engineering',
  'computer science', 'data science', 'cybersecurity',
  'technology', 'innovation', 'stem',
  'african', 'nigeria', 'developing countries',
  'chevening', 'daad', 'fulbright', 'commonwealth',
  'erasmus', 'stipend', 'tuition waiver',
  'usa', 'europe', 'uk', 'canada', 'germany', 'israel', 'singapore',
  'governance', 'security', 'surveillance', 'tech policy',
];

// ===== ELITE OPPORTUNITY SOURCES (Hidden Channels) =====
export const ELITE_SOURCES = [
  {
    name: 'YALI Network',
    url: 'https://yali.state.gov/feed/',
    type: 'rss',
    focus: 'Young African Leaders Initiative',
  },
  {
    name: 'Tony Elumelu Foundation',
    url: 'https://www.tonyelumelufoundation.org/feed',
    type: 'rss',
    focus: 'African entrepreneurship',
  },
];

// ===== NEWS & INTEL SOURCES =====
export const NEWS_SOURCES = [
  {
    name: 'HackerNews-AI',
    url: 'https://hn.algolia.com/api/v1/search_by_date?query=AI+security&tags=story&hitsPerPage=10',
    type: 'json',
  },
  {
    name: 'HackerNews-LLM',
    url: 'https://hn.algolia.com/api/v1/search_by_date?query=LLM+vulnerability&tags=story&hitsPerPage=5',
    type: 'json',
  },
  {
    name: 'HackerNews-Automation',
    url: 'https://hn.algolia.com/api/v1/search_by_date?query=AI+automation&tags=story&hitsPerPage=5',
    type: 'json',
  },
];

// ===== VIDEO CHANNELS (YouTube RSS - No API Key) =====
export const VIDEO_CHANNELS = [
  { name: 'Fireship', id: 'UCsBjURrPoezykLs9EqgamOA' },
  { name: 'NetworkChuck', id: 'UC9-y-6csu5WGm29I7JiwpnA' },
  { name: 'TheAIGRID', id: 'UCJHnQ5OxC4gqag2GMSBi4Aw' },
  { name: 'MatthewBerman', id: 'UCi23CEbgs2mfT0S3B3Ot5cA' },
  { name: 'DavidBombal', id: 'UCP7WmQ_U4GB3K51Od9QvM0w' },
  { name: 'JohnHammond', id: 'UCVeW9qkBjo3zosnqUbG7CFw' },
];

// ===== CURATED BOOK LIST (Rotates Weekly) =====
export const BOOK_ROTATION = [
  {
    title: "The 48 Laws of Power",
    author: "Robert Greene",
    summary: "A masterclass in strategic discretion, power dynamics, and the cunning of the serpent. Essential reading for anyone who wants to understand how influence is built, maintained, and wielded at the highest levels.",
    link: "https://www.amazon.com/48-Laws-Power-Robert-Greene/dp/0140280197",
    cover: "https://images-na.ssl-images-amazon.com/images/I/71aG+xDKSYL._AC_UL600_.jpg",
  },
  {
    title: "The Art of War",
    author: "Sun Tzu",
    summary: "The foundational text on strategy, positioning, and winning without fighting. Every line is a lesson in how to outmaneuver opponents through intelligence, timing, and terrain mastery.",
    link: "https://www.amazon.com/Art-War-Sun-Tzu/dp/1599869772",
    cover: "https://images-na.ssl-images-amazon.com/images/I/71s65Mfbr1L._AC_UL600_.jpg",
  },
  {
    title: "Thinking in Systems",
    author: "Donella H. Meadows",
    summary: "The operating manual for understanding how the world actually works. Systems thinking is the meta-skill that separates architects from laborers — this book teaches you to see the invisible structures.",
    link: "https://www.amazon.com/Thinking-Systems-Donella-H-Meadows/dp/1603580557",
    cover: "https://images-na.ssl-images-amazon.com/images/I/51sIB-KwelL._AC_UL600_.jpg",
  },
  {
    title: "The Prince",
    author: "Niccolò Machiavelli",
    summary: "The original playbook on political realism. Machiavelli strips away idealism and shows you how power actually operates — through calculated moves, strategic alliances, and controlled ruthlessness.",
    link: "https://www.amazon.com/Prince-Niccol%C3%B2-Machiavelli/dp/0486272745",
    cover: "https://images-na.ssl-images-amazon.com/images/I/61Kn4rVFljL._AC_UL600_.jpg",
  },
  {
    title: "Zero to One",
    author: "Peter Thiel",
    summary: "Thiel's contrarian framework for building monopolies, not competing in crowded markets. The key insight: create something new (0 to 1) rather than copying what exists (1 to n).",
    link: "https://www.amazon.com/Zero-One-Notes-Startups-Future/dp/0804139296",
    cover: "https://images-na.ssl-images-amazon.com/images/I/71m-MxdJ2WL._AC_UL600_.jpg",
  },
  {
    title: "Influence: The Psychology of Persuasion",
    author: "Robert B. Cialdini",
    summary: "The science behind why people say yes. Cialdini identifies the six principles of persuasion that every operator must understand: reciprocity, commitment, social proof, authority, liking, and scarcity.",
    link: "https://www.amazon.com/Influence-Psychology-Persuasion-Robert-Cialdini/dp/006124189X",
    cover: "https://images-na.ssl-images-amazon.com/images/I/61mVVJwaKBL._AC_UL600_.jpg",
  },
  {
    title: "The Hard Thing About Hard Things",
    author: "Ben Horowitz",
    summary: "Raw truth about building companies when everything is falling apart. Horowitz doesn't teach theory — he teaches survival. Essential for anyone navigating chaos while building something real.",
    link: "https://www.amazon.com/Hard-Thing-About-Things-Building/dp/0062273205",
    cover: "https://images-na.ssl-images-amazon.com/images/I/71RLo+EkjkL._AC_UL600_.jpg",
  },
  {
    title: "Mastery",
    author: "Robert Greene",
    summary: "The roadmap to becoming world-class. Greene dissects the apprenticeship patterns of history's greatest minds — from Darwin to da Vinci — and extracts the blueprint for achieving mastery in any field.",
    link: "https://www.amazon.com/Mastery-Robert-Greene/dp/014312417X",
    cover: "https://images-na.ssl-images-amazon.com/images/I/71wkNvzqiaL._AC_UL600_.jpg",
  },
];

// ===== CURATED RAINMAKER PROFILES (Rotates Daily) =====
export const RAINMAKER_PROFILES = [
  {
    name: "Elon Musk",
    era: "Modern Era — 2000s to Present",
    analysis: "Musk's architecture of advantage wasn't genius — it was sequencing. He used PayPal profits to fund SpaceX when no one believed in private space. He didn't ask for permission from the aerospace establishment; he built parallel infrastructure. His key move: entering industries with high barriers specifically because the barriers kept out competitors. He bought time with personal capital, then made the industries depend on him. The lesson: when you enter a field everyone says is impossible, you get a monopoly if you survive.",
  },
  {
    name: "Aliko Dangote",
    era: "Modern Era — 1970s to Present",
    analysis: "Dangote didn't build Africa's largest fortune by exporting. He built it by importing cement, sugar, and flour — commodities everyone needed but no one manufactured locally. His strategic brilliance: he identified that Africa's constraint wasn't demand, it was supply infrastructure. He filled that gap, then used political relationships to protect his position with import bans on competing products. The architecture: become the sole supplier of what everyone needs, then make the government your moat.",
  },
  {
    name: "Jensen Huang",
    era: "Modern Era — 1990s to Present",
    analysis: "Huang bet NVIDIA's entire future on GPU computing when the world thought GPUs were for gaming. For over a decade, NVIDIA invested in CUDA — a parallel computing platform no one asked for. When deep learning exploded, NVIDIA was the only company with the hardware. Huang's advantage architecture: invest in infrastructure for a future only you can see, endure ridicule for years, then become irreplaceable when the future arrives.",
  },
  {
    name: "Strive Masiyiwa",
    era: "Modern Era — 1990s to Present",
    analysis: "Masiyiwa fought the Zimbabwean government for 5 years in court just to get a mobile phone license. While Econet Wireless was stuck in litigation, he prepared every system, hired every engineer, and built every tower. The day the license was granted, he launched within weeks while competitors were still planning. His architecture: use constraint as preparation time. When the gate finally opens, sprint through it fully armed while others are still lacing their shoes.",
  },
  {
    name: "Sara Blakely",
    era: "Modern Era — 2000s",
    analysis: "Blakely built Spanx from $5,000 and zero fashion industry connections. She cold-called Neiman Marcus, hand-demonstrated products in bathrooms, and personally wrote every patent to avoid lawyer fees. Her key architectural decision: she told no one about her idea for two years. Not friends, not family. She understood that premature exposure kills momentum — opinions from people who haven't built anything will destroy your conviction. The lesson: silence is a strategic weapon during the building phase.",
  },
  {
    name: "John Obidi",
    era: "Modern Era — 2010s to Present",
    analysis: "Obidi's architecture is uniquely African in its brilliance. He didn't build a traditional company — he built a knowledge economy through SmartBCamp and HeadStart Africa. His key insight: in emerging markets, the most valuable currency isn't capital, it's capability distribution. By teaching thousands of Africans digital skills and business strategy, he created a network effect where his students become his ambassadors, clients, and partners. The law of sacrifice in action: give away knowledge freely, and the market will return it as authority.",
  },
  {
    name: "Robert Smith",
    era: "Modern Era — 1990s to Present",
    analysis: "Smith built Vista Equity Partners into the largest Black-owned business in America by doing what no one else would: applying private equity discipline to enterprise software companies. His edge: he created a playbook (the Vista Consulting Group) that could optimize any software company's operations. He didn't just buy companies — he installed a proven system. The architecture: build a repeatable machine, then feed it acquisitions. The machine does the work; you scale the inputs.",
  },
];

// ===== NIGHT SCHOOL RESONANCE CASES =====
export const NIGHT_SCHOOL_CASES = [
  {
    name: "From Akure to Global — The IzzyTechHub Trajectory",
    analysis: "A young Nigerian with no inherited advantage built a global AI automation practice from Akure. The key principles at work: the Law of Sacrifice (investing years of learning before expecting returns), Buying Back Equality (using certifications and results to neutralize geographic bias), and the Cunning of the Serpent (positioning as a senior architect, not a cheap freelancer). This trajectory demonstrates that institutional access can be engineered through demonstrated competence rather than inherited connections.",
  },
  {
    name: "Iyinoluwa Aboyeji — From Local to Global African",
    analysis: "Co-founded Andela (connecting African developers with global companies) and Flutterwave (African payments infrastructure). Aboyeji's trajectory is pure Night School philosophy: he identified that Africa's constraint was not talent but access. By building bridges — not products — he created more value than any single application could. The tact principle in action: he positioned Africa not as a charity case but as an untapped talent arbitrage opportunity. Global companies saved money; African developers gained careers. Everyone won.",
  },
  {
    name: "Adora Nwodo — Engineering Credibility From Nigeria",
    analysis: "A software engineer at Microsoft working on Mixed Reality from Lagos. Nwodo's architecture: she didn't wait for opportunity to come to Nigeria. She built her credentials through open-source contributions, published technical content, and earned global visibility before the job found her. This is the Night School principle of 'becoming undeniable' — make your work so visible and excellent that geography becomes irrelevant. The tact: she never complained about barriers; she simply routed around them.",
  },
  {
    name: "Mark Essien — Hotels.ng and the Local Constraint",
    analysis: "Essien built Hotels.ng, the largest hotel booking platform in Nigeria, when investors said the Nigerian market was too small. His response: the market isn't small, you just can't see it because it's informal. He digitized Nigeria's fragmented hotel industry by sending agents to physically photograph and list hotels that had no online presence. The Night School lesson: sometimes the biggest opportunities are invisible to outsiders. Your local knowledge IS the competitive advantage. Don't try to copy Silicon Valley — solve the problem only you can see.",
  },
  {
    name: "Dayo Koleowo — From Tope to the Top",
    analysis: "Built multiple businesses across Nigeria by mastering the art of strategic patience and relationship capital. The Night School resonance: Koleowo exemplifies 'buying back equality' — in markets where credentials are devalued, he let his results speak louder than any certificate. He built trust one transaction at a time, creating a network that became self-reinforcing. The lesson: in environments where the system doesn't favor you, build your own system through unimpeachable reliability.",
  },
];
