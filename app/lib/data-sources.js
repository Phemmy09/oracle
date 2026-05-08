// ============================================
// ORACLE DATA SOURCES — The Intelligence Layer
// ============================================
// All data is fetched from free, public APIs and RSS feeds.
// No paid API keys required. No LLM involved.
// ============================================

// ===== JOB SOURCES =====
// 16 zero-login sources: job boards, RSS feeds, Reddit communities, HN
// requiresKeywordMatch: false = take ALL jobs (source is already remote-specific)
// requiresKeywordMatch: true  = keyword-filter applies (mixed content sources)
export const JOB_SOURCES = [
  // ─── EXISTING JSON APIS ───
  { name: 'RemoteOK',      url: 'https://remoteok.com/api',                                                                              type: 'json',   requiresKeywordMatch: true },
  { name: 'Remotive',      url: 'https://remotive.com/api/remote-jobs?limit=50',                                                         type: 'json',   requiresKeywordMatch: true },
  { name: 'Arbeitnow',     url: 'https://www.arbeitnow.com/api/job-board-api',                                                           type: 'json',   requiresKeywordMatch: true },

  // ─── NEW JSON APIS (no auth) ───
  { name: 'WorkingNomads', url: 'https://www.workingnomads.com/api/exposed_jobs/',                                                        type: 'json',   requiresKeywordMatch: false },
  { name: 'TheMuse',       url: 'https://www.themuse.com/api/public/jobs?page=0&descending=true',                                         type: 'json',   requiresKeywordMatch: true },

  // ─── RSS JOB BOARDS (no auth) ───
  { name: 'WeWorkRemotely', url: 'https://weworkremotely.com/remote-jobs.rss',                                                           type: 'rss',    requiresKeywordMatch: false },
  { name: 'Jobicy',         url: 'https://jobicy.com/?feed=job_feed',                                                                    type: 'rss',    requiresKeywordMatch: false },
  { name: 'RemoteCo',       url: 'https://remote.co/remote-jobs/feed/',                                                                  type: 'rss',    requiresKeywordMatch: false },
  { name: 'Himalayas',      url: 'https://himalayas.app/jobs/feed.xml',                                                                  type: 'rss',    requiresKeywordMatch: false },
  { name: '4DayWeek',       url: 'https://4dayweek.io/remote-jobs/feed',                                                                 type: 'rss',    requiresKeywordMatch: false },
  { name: 'NoDesk',         url: 'https://nodesk.co/remote-jobs/feed/',                                                                  type: 'rss',    requiresKeywordMatch: false },
  { name: 'DevToJobs',      url: 'https://dev.to/feed/tag/jobs',                                                                         type: 'rss',    requiresKeywordMatch: true },

  // ─── REDDIT COMMUNITIES (no auth, public JSON API) ───
  { name: 'RedditForHire',   url: 'https://www.reddit.com/r/forhire/search.json?q=%5BHIRING%5D&restrict_sr=on&sort=new&t=week&limit=25', type: 'reddit', requiresKeywordMatch: false },
  { name: 'RedditAIJobs',    url: 'https://www.reddit.com/r/AIJobs/.json?sort=new&limit=25',                                             type: 'reddit', requiresKeywordMatch: false },
  { name: 'RedditFreelance', url: 'https://www.reddit.com/r/freelance/search.json?q=hiring&restrict_sr=on&sort=new&t=week&limit=20',     type: 'reddit', requiresKeywordMatch: true },

  // ─── HACKER NEWS (Algolia API, no auth) ───
  { name: 'HNJobs', url: 'https://hn.algolia.com/api/v1/search?tags=job&hitsPerPage=30',                                                 type: 'hn',     requiresKeywordMatch: true },
];

export const JOB_KEYWORDS = [
  // AI/automation stack
  'n8n', 'ai agent', 'ai automation', 'automation engineer',
  'gohighlevel', 'highlevel', 'sales funnel', 'email marketing',
  'website builder', 'ai voice', 'voice agent', 'chatbot',
  'ai engineer', 'ai security', 'red team', 'prompt engineer',
  'ai architect', 'machine learning', 'llm', 'rag',
  'zapier', 'make.com', 'workflow automation', 'no-code',
  'low-code', 'crm', 'saas', 'api integration',
  'ai consultant', 'ai governance', 'data engineer',
  // Broad tech/remote roles
  'ai', 'artificial intelligence', 'automation', 'agent',
  'remote', 'developer', 'engineer', 'software', 'full stack',
  'frontend', 'backend', 'react', 'node', 'python',
  'typescript', 'javascript', 'devops', 'cloud', 'aws',
  'freelance', 'contract', 'async', 'part-time',
  'marketing automation', 'growth', 'product manager',
  'technical writer', 'content', 'seo', 'data',
];

// ===== SCHOLARSHIP & OPPORTUNITY SOURCES =====
export const SCHOLARSHIP_SOURCES = [
  { name: 'OpportunityDesk', url: 'https://opportunitydesk.org/feed/', type: 'rss', focus: 'African youth opportunities' },
  { name: 'AfterSchoolAfrica', url: 'https://www.afterschoolafrica.com/feed/', type: 'rss', focus: 'Scholarships for Africans' },
  { name: 'Scholars4Dev', url: 'https://www.scholars4dev.com/feed/', type: 'rss', focus: 'International scholarships' },
  { name: 'OpportunitiesForAfricans', url: 'https://www.opportunitiesforafricans.com/feed/', type: 'rss', focus: 'Elite African opportunities' },
  { name: 'ScholarshipRegion', url: 'https://scholarshipregion.com/feed/', type: 'rss', focus: 'Regional scholarships' },
  { name: 'ScholarshipPositions', url: 'https://scholarshipscorner.website/feed/', type: 'rss', focus: 'PhD & Masters globally' },
  { name: 'ScholarshipsHall', url: 'https://scholarshipshall.com/feed/', type: 'rss', focus: 'Fully funded scholarships' },
  { name: 'InternationalScholarships', url: 'https://www.internationalscholarships.com/feed/', type: 'rss', focus: 'Global scholarships database' },
  { name: 'FundforStudy', url: 'https://fundforscholarship.com/feed/', type: 'rss', focus: 'Africa-focused funding' },
  { name: 'OppWatch', url: 'https://www.afrindex.com/feed', type: 'rss', focus: 'Pan-African opportunities' },
  { name: 'GrantsAfrica', url: 'https://www.grantsafrica.com/feed/', type: 'rss', focus: 'African grants & scholarships' },
  { name: 'MasterscholarshipAfrica', url: 'https://masterandmore.eu/feed/', type: 'rss', focus: 'European Masters programs' },
  { name: 'EdAid', url: 'https://edaid.com/feed/', type: 'rss', focus: 'Global education funding' },
  { name: 'ScholarshipOwl', url: 'https://blog.scholarshipowl.com/feed/', type: 'rss', focus: 'Scholarships discovery' },
  { name: 'DAAD', url: 'https://www.daad.de/en/feed/', type: 'rss', focus: 'German government scholarships' },
  { name: 'CommonwealthScholarships', url: 'https://cscuk.fcdo.gov.uk/feed/', type: 'rss', focus: 'Commonwealth funded programs' },
  { name: 'ErasmusPlus', url: 'https://erasmus-plus.ec.europa.eu/feed', type: 'rss', focus: 'EU Erasmus Mundus' },
  { name: 'PTDF', url: 'https://www.ptdf.gov.ng/feed/', type: 'rss', focus: 'Nigerian government scholarships' },
  { name: 'Mastercard Foundation', url: 'https://mastercardfdn.org/feed/', type: 'rss', focus: 'African scholars program' },
  { name: 'AUScholarships', url: 'https://au.int/feed', type: 'rss', focus: 'African Union scholarships' },
];

export const SCHOLARSHIP_KEYWORDS = [
  'fully funded', 'full scholarship', 'scholarship', 'fellowship', 'phd', 'masters', 'postgraduate',
  'ai', 'artificial intelligence', 'machine learning', 'robotics',
  'agriculture', 'agritech', 'agric', 'engineering',
  'computer science', 'data science', 'cybersecurity',
  'technology', 'innovation', 'stem', 'research',
  'african', 'nigeria', 'developing countries', 'commonwealth',
  'chevening', 'daad', 'fulbright', 'commonwealth', 'mext', 'gates cambridge',
  'rhodes', 'erasmus', 'stipend', 'tuition waiver', 'tuition fee',
  'usa', 'europe', 'uk', 'canada', 'germany', 'japan', 'australia', 'korea',
  'governance', 'security', 'tech policy', 'ptdf', 'nddc', 'nlng',
  'mastercard foundation', 'rotary', 'islamic development bank',
  'apply', 'application', 'deadline', 'open', '2025', '2026',
];

// ===== CURATED TOP SCHOLARSHIPS (Static — always shown, aggressively sourced) =====
export const CURATED_SCHOLARSHIPS = [
  // --- MASTERCARD FOUNDATION SCHOLARS PROGRAM (Every Partner University) ---
  { title: 'Mastercard Foundation Scholars Program 2026 — Overview', link: 'https://mastercardfdn.org/all/scholars/', summary: 'Full tuition, accommodation, living expenses, and mentorship for African students at 40+ partner universities globally. Priority for Nigerian applicants.', source: 'Mastercard Foundation', focus: 'Africa — Fully Funded', date: '' },
  { title: 'Mastercard Foundation Scholarship — University of Edinburgh', link: 'https://www.ed.ac.uk/student-funding/postgraduate/international/mastercard', summary: 'Fully funded Masters at University of Edinburgh for African students. Covers tuition, living costs, flights, and visa. Apply through university admissions.', source: 'Mastercard Foundation', focus: 'UK Masters — Fully Funded', date: '' },
  { title: 'Mastercard Foundation Scholarship — KNUST Ghana', link: 'https://www.knust.edu.gh/admissions/mastercard-foundation', summary: 'Full scholarship for undergrad and Masters at KNUST. Covers tuition, accommodation, stipend, and laptop. Open to Nigerians.', source: 'Mastercard Foundation', focus: 'Ghana — Fully Funded', date: '' },
  { title: 'Mastercard Foundation Scholarship — McGill University Canada', link: 'https://www.mcgill.ca/mastercardfdn-scholars/', summary: 'Fully funded 4-year undergraduate scholarship at McGill University. Covers tuition, residence, meals, books, health, travel.', source: 'Mastercard Foundation', focus: 'Canada — Fully Funded', date: '' },
  { title: 'Mastercard Foundation Scholarship — CMU Africa (Rwanda)', link: 'https://www.africa.engineering.cmu.edu/admissions/scholarships.html', summary: 'Full Masters in Information Technology or Electrical Engineering at Carnegie Mellon Africa in Kigali. Tuition, stipend, travel.', source: 'Mastercard Foundation', focus: 'Rwanda/USA — Fully Funded', date: '' },
  { title: 'Mastercard Foundation Scholarship — Ashesi University Ghana', link: 'https://www.ashesi.edu.gh/admissions/financial-aid/mastercard-foundation-scholars-program.html', summary: 'Full undergraduate scholarship at Ashesi. Covers tuition, accommodation, meals, books, and internship placement. Open to all Africans.', source: 'Mastercard Foundation', focus: 'Ghana — Fully Funded', date: '' },
  { title: 'Mastercard Foundation Scholarship — University of Pretoria', link: 'https://www.up.ac.za/mastercard-foundation-scholars-program', summary: 'Full postgrad scholarship at UP South Africa. Covers tuition, accommodation, meals, laptop, and personal development. Apply through UP.', source: 'Mastercard Foundation', focus: 'South Africa — Fully Funded', date: '' },
  { title: 'Mastercard Foundation Scholarship — University of Cape Town', link: 'https://www.uct.ac.za/main/students/fees-funding/scholarships/mastercard', summary: 'Fully funded postgraduate scholarship at UCT. Includes tuition, accommodation, living allowance and academic support.', source: 'Mastercard Foundation', focus: 'South Africa — Fully Funded', date: '' },
  { title: 'Mastercard Foundation Scholarship — USIU-Africa Kenya', link: 'https://www.usiu.ac.ke/mastercard-foundation-scholars/', summary: 'Full scholarship for undergrad at United States International University - Africa in Nairobi. Covers all costs.', source: 'Mastercard Foundation', focus: 'Kenya — Fully Funded', date: '' },
  { title: 'Mastercard Foundation Scholarship — University of Gondar Ethiopia', link: 'https://www.uog.edu.et/mastercard-foundation/', summary: 'Full undergraduate scholarship at UoG Ethiopia. Covers tuition, housing, stipend and academic support.', source: 'Mastercard Foundation', focus: 'Ethiopia — Fully Funded', date: '' },
  { title: 'Mastercard Foundation Scholarship — AUB Lebanon', link: 'https://www.aub.edu.lb/financialaid/Pages/mastercard.aspx', summary: 'Fully funded undergrad at American University of Beirut. Covers tuition, room, board, and personal expenses for African students.', source: 'Mastercard Foundation', focus: 'Lebanon — Fully Funded', date: '' },
  { title: 'Mastercard Foundation Scholarship — University of Rwanda', link: 'https://ur.ac.rw/mastercard-foundation-scholars/', summary: 'Full undergraduate and Masters scholarship at University of Rwanda. Tuition, accommodation, and stipend included.', source: 'Mastercard Foundation', focus: 'Rwanda — Fully Funded', date: '' },
  { title: 'Mastercard Foundation Scholarship — Makerere University Uganda', link: 'https://www.mak.ac.ug/mastercard-foundation', summary: 'Fully funded scholarship at Makerere University for East African students. Covers tuition, living, and mentorship.', source: 'Mastercard Foundation', focus: 'Uganda — Fully Funded', date: '' },
  { title: 'Mastercard Foundation Scholarship — Sciences Po Paris', link: 'https://www.sciencespo.fr/en/admissions/financial-aid/mastercard-foundation/', summary: 'Fully funded undergrad and Masters at Sciences Po Paris for African students. Covers all costs including living in Paris.', source: 'Mastercard Foundation', focus: 'France — Fully Funded', date: '' },
  { title: 'Mastercard Foundation Scholarship — Duke University USA', link: 'https://duke.edu/financialaid/mastercard/', summary: 'Fully funded undergraduate at Duke University USA for African students. Full ride covering tuition, room, board, and travel.', source: 'Mastercard Foundation', focus: 'USA — Fully Funded', date: '' },
  { title: 'Mastercard Foundation Scholarship — Arizona State University', link: 'https://admission.asu.edu/international/scholarships/mastercard', summary: 'Full scholarship at ASU for African students in STEM and social sciences. Covers tuition, living, and support services.', source: 'Mastercard Foundation', focus: 'USA — Fully Funded', date: '' },
  { title: 'Mastercard Foundation Scholarship — Wellesley College USA', link: 'https://www.wellesley.edu/admission/financing/mcfsp', summary: 'Full undergraduate scholarship for African women at Wellesley College. Covers all academic and living expenses.', source: 'Mastercard Foundation', focus: 'USA — Women — Fully Funded', date: '' },
  { title: 'Mastercard Foundation Scholarship — EARTH University Costa Rica', link: 'https://www.earth.ac.cr/en/admissions/mastercard-foundation/', summary: 'Full 4-year scholarship in sustainable agriculture at EARTH University. Covers everything for African students.', source: 'Mastercard Foundation', focus: 'Costa Rica — Fully Funded', date: '' },
  // --- UK GOVERNMENT & TOP ACADEMIC ---
  { title: 'Chevening Scholarships 2026 — UK Government', link: 'https://www.chevening.org/scholarships/', summary: 'Fully funded Masters in the UK. Covers tuition, living stipend, and flights. For future leaders from Nigeria.', source: 'Chevening.org', focus: 'UK Masters — Fully Funded', date: '' },
  { title: 'Commonwealth Scholarships 2026 — Masters & PhD UK', link: 'https://cscuk.fcdo.gov.uk/apply/', summary: 'Commonwealth government scholarships for students from Nigeria and other Commonwealth countries.', source: 'FCDO UK', focus: 'UK PhD/Masters — Fully Funded', date: '' },
  { title: 'Gates Cambridge Scholarship 2026 — University of Cambridge', link: 'https://www.gatescambridge.org/apply/', summary: 'Full cost of PhD or Masters at Cambridge University. One of the most prestigious global awards.', source: 'Gates Cambridge', focus: 'UK PhD/Masters — Fully Funded', date: '' },
  { title: 'Rhodes Scholarship 2026 — University of Oxford', link: 'https://www.rhodeshouse.ox.ac.uk/scholars/how-to-apply/', summary: 'Full postgraduate funding at Oxford University. Includes tuition, stipend and accommodation.', source: 'Rhodes Trust', focus: 'UK Postgraduate — Fully Funded', date: '' },
  { title: 'Clarendon Scholarship — University of Oxford 2026', link: 'https://www.ox.ac.uk/clarendon/', summary: 'Fully funded graduate scholarship at Oxford. Covers tuition and generous living allowance. Automatic consideration on application.', source: 'Oxford University', focus: 'UK Graduate — Fully Funded', date: '' },
  { title: 'Edinburgh Global Research Scholarship 2026', link: 'https://www.ed.ac.uk/student-funding/postgraduate/international/global', summary: 'Covers difference between overseas and UK/EU fees for PhD students at University of Edinburgh. Competitive.', source: 'Univ. of Edinburgh', focus: 'UK PhD — Partial Funded', date: '' },
  // --- EUROPEAN & GOVERNMENT ---
  { title: 'DAAD In-Country/In-Region Scholarship 2026 — Germany', link: 'https://www.daad.de/en/study-and-research-in-germany/scholarships/', summary: 'German government scholarships for African students pursuing Masters/PhD in Germany or Africa.', source: 'DAAD Germany', focus: 'Germany PhD/Masters — Fully Funded', date: '' },
  { title: 'Erasmus Mundus Joint Masters 2026 — European Union', link: 'https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-catalogue_en', summary: 'Full scholarship for joint Masters across multiple European countries. Covers tuition, travel, and living.', source: 'EU Erasmus+', focus: 'EU Masters — Fully Funded', date: '' },
  { title: 'MEXT Scholarship 2026 — Japanese Government', link: 'https://www.studyinjapan.go.jp/en/smap_stopj-applications_research.html', summary: 'Japan government scholarship covering tuition, monthly stipend, accommodation, and return airfare.', source: 'MEXT Japan', focus: 'Japan Postgraduate — Fully Funded', date: '' },
  { title: 'Italian Government Scholarships 2026 — MAECI', link: 'https://studyinitaly.esteri.it/en/home', summary: 'Italian Ministry scholarships for foreign students pursuing Masters or PhD at Italian universities.', source: 'Italian Government', focus: 'Italy — Fully Funded', date: '' },
  { title: 'Swiss Government Excellence Scholarship 2026 — ESKAS', link: 'https://www.sbfi.admin.ch/sbfi/en/home/education/scholarships-and-grants/swiss-government-excellence-scholarships.html', summary: 'Swiss federal scholarship for PhD and postdoc research at Swiss universities (ETH Zurich, EPFL, etc).', source: 'Swiss Government', focus: 'Switzerland PhD — Fully Funded', date: '' },
  { title: 'Netherlands Fellowship Programme (NFP/OKP) 2026', link: 'https://www.nuffic.nl/en/subjects/orange-knowledge-programme', summary: 'Dutch government fellowship for Masters and short courses at Dutch universities. Fully funded for Nigerians.', source: 'Nuffic Netherlands', focus: 'Netherlands Masters — Fully Funded', date: '' },
  { title: 'KGSP Korean Government Scholarship 2026', link: 'https://www.studyinkorea.go.kr/en/sub/gks/allnew_invite.do', summary: 'Korean Government Scholarship for Masters/PhD at Korean universities. Covers tuition, stipend, flights, health insurance.', source: 'Korean Government', focus: 'South Korea — Fully Funded', date: '' },
  { title: 'Turkish Government Scholarships (Turkiye Burslari) 2026', link: 'https://www.turkiyeburslari.gov.tr/', summary: 'Full scholarship covering tuition, accommodation, stipend, insurance and flights for all levels of study.', source: 'Turkish Government', focus: 'Turkey — Fully Funded', date: '' },
  { title: 'Hungarian Government Scholarship (Stipendium Hungaricum) 2026', link: 'https://stipendiumhungaricum.hu/', summary: 'Fully funded scholarship for Bachelors, Masters and PhD in Hungary. Tuition-free + monthly stipend.', source: 'Hungarian Government', focus: 'Hungary — Fully Funded', date: '' },
  { title: 'China Government Scholarship (CSC) 2026', link: 'https://www.campuschina.org/scholarships/index.html', summary: 'Chinese government full scholarship for Masters/PhD at top Chinese universities. Covers everything.', source: 'CSC China', focus: 'China — Fully Funded', date: '' },
  // --- USA & NORTH AMERICA ---
  { title: 'Fulbright U.S. Student Program 2026 — USA', link: 'https://foreign.fulbrightonline.org/', summary: 'Fully funded program for international students. Covers tuition, stipend, and travel to the USA.', source: 'Fulbright Program', focus: 'USA Postgraduate — Fully Funded', date: '' },
  { title: 'Stanford Knight-Hennessy Scholars 2026 — USA', link: 'https://knight-hennessy.stanford.edu/admission', summary: 'Full graduate funding at Stanford University for global emerging leaders.', source: 'Stanford University', focus: 'USA Graduate — Fully Funded', date: '' },
  { title: 'Study in Canada Scholarship (SICP) 2026/27', link: 'https://www.educanada.ca/scholarships-bourses/index.aspx', summary: 'Canadian government scholarships for qualified international students. Full funding for 2026/27 intake.', source: 'EduCanada', focus: 'Canada — Fully Funded', date: '' },
  { title: 'Vanier Canada Graduate Scholarship 2026', link: 'https://vanier.gc.ca/en/home-accueil.html', summary: '$50,000/year for 3 years for PhD study in Canada. Open to all nationalities including Nigerians.', source: 'Vanier CGS', focus: 'Canada PhD — Fully Funded', date: '' },
  // --- AUSTRALIA & ASIA ---
  { title: 'Australia Awards Scholarships 2026', link: 'https://www.australiaawardsinternational.org/', summary: 'Fully funded by Australian government. Covers tuition, living expenses, and airfare for Nigerians.', source: 'Australia Awards', focus: 'Australia — Fully Funded', date: '' },
  { title: 'NTU Singapore NANYANG Scholarship 2026', link: 'https://www.ntu.edu.sg/admissions/undergraduate/scholarships', summary: 'Full tuition + living stipend at Nanyang Technological University Singapore for top international students.', source: 'NTU Singapore', focus: 'Singapore — Fully Funded', date: '' },
  { title: 'KAIST International Scholarship 2026 — South Korea', link: 'https://admission.kaist.ac.kr/', summary: 'Full tuition waiver + monthly stipend for Masters/PhD at Korea Advanced Institute of Science & Technology.', source: 'KAIST', focus: 'South Korea — Fully Funded', date: '' },
  // --- NIGERIAN GOVERNMENT ---
  { title: 'PTDF Overseas Postgraduate Scholarship 2026 — Nigeria', link: 'https://www.ptdf.gov.ng/scholarships/', summary: 'Nigerian government scholarship for Masters/PhD abroad in oil & gas, engineering and STEM fields.', source: 'PTDF Nigeria', focus: 'Overseas Masters/PhD — Fully Funded', date: '' },
  { title: 'NDDC Postgraduate Scholarship 2026 — Nigeria', link: 'https://www.nddc.gov.ng/scholarships', summary: 'Federal government scholarship for Niger Delta students to study abroad at Masters/PhD level.', source: 'NDDC Nigeria', focus: 'Overseas Masters — Fully Funded', date: '' },
  { title: 'NLNG Postgraduate Scholarship 2026 — Nigeria', link: 'https://www.nlng.com/Sustainability/Pages/Scholarship.aspx', summary: 'Nigerian LNG fully funded scholarship for Masters abroad in STEM and engineering.', source: 'NLNG Nigeria', focus: 'Masters Abroad — Fully Funded', date: '' },
  { title: 'BEA/NNPC Scholarship 2026 — Nigeria', link: 'https://www.nnpcgroup.com/Sustainability/Pages/Scholarships.aspx', summary: 'NNPC scholarship for Nigerian undergraduates in engineering, geosciences, and environmental science.', source: 'NNPC Nigeria', focus: 'Nigeria — Fully Funded', date: '' },
  // --- AFRICAN & REGIONAL ---
  { title: 'Pan African University Scholarship 2026 — African Union', link: 'https://pau-au.africa/admissions/', summary: 'African Union scholarship for Masters and PhD across PAU institutes in Africa, fully funded with stipend.', source: 'African Union', focus: 'Africa — Fully Funded', date: '' },
  { title: 'African Union Scholarships 2026', link: 'https://au.int/en/youth/scholarships', summary: 'AU scholarships for postgraduate studies within Africa and partner institutions globally.', source: 'African Union', focus: 'Africa — Fully Funded', date: '' },
  { title: 'Aga Khan Foundation International Scholarship 2026', link: 'https://www.akdn.org/our-agencies/aga-khan-foundation/international-scholarship-programme', summary: 'Covers 50% grant / 50% loan for postgraduate study internationally. Prioritizes developing countries.', source: 'Aga Khan Foundation', focus: 'Global Postgrad — Partial Funded', date: '' },
  { title: 'Mo Ibrahim Foundation Leadership Fellowship 2026', link: 'https://mo.ibrahim.foundation/fellowship', summary: 'Prestigious fellowship for next-gen African leaders. Fully funded leadership programme and placement at AfDB or other institutions.', source: 'Mo Ibrahim Foundation', focus: 'Africa — Fully Funded', date: '' },
  // --- OTHER SPECIALIZED ---
  { title: 'Islamic Development Bank Scholarship 2026', link: 'https://www.isdb.org/what-we-do/human-development/merit-scholarship-programme', summary: 'Supports postgraduate students from OIC member countries including Nigeria. Full funding available.', source: 'IsDB', focus: 'Postgraduate — Fully Funded', date: '' },
  { title: 'Rotary Foundation Global Grant 2026', link: 'https://www.rotary.org/en/our-programs/scholarships', summary: 'Merit-based funding for graduate-level study internationally. Open to Nigerians in eligible fields.', source: 'Rotary International', focus: 'Graduate — Merit Funded', date: '' },
  { title: 'OFID Scholarship Award 2026', link: 'https://ofid.org/OFID-Scholarship-Award', summary: 'OPEC Fund scholarship for Masters students from developing countries in energy, economics, or development.', source: 'OFID/OPEC', focus: 'Masters — Fully Funded', date: '' },
  { title: 'MINDS Scholarship 2026 — Mandela Institute', link: 'https://minds-africa.org/scholarship/', summary: 'Full postgraduate scholarship for African students studying within Africa. Covers tuition and living costs.', source: 'MINDS Africa', focus: 'Africa — Fully Funded', date: '' },
];

// ===== ELITE OPPORTUNITY SOURCES (Hidden Channels) =====
export const ELITE_SOURCES = [
  { name: 'YALI Network', url: 'https://yali.state.gov/feed/', type: 'rss', focus: 'Young African Leaders Initiative' },
  { name: 'Tony Elumelu Foundation', url: 'https://www.tonyelumelufoundation.org/feed', type: 'rss', focus: 'African entrepreneurship' },
  { name: 'Devex', url: 'https://www.devex.com/news/rss.xml', type: 'rss', focus: 'Global development opportunities' },
  { name: 'UN Jobs', url: 'https://unjobs.org/feed', type: 'rss', focus: 'UN career opportunities' },
  { name: 'ReliefWeb', url: 'https://reliefweb.int/updates/rss.xml', type: 'rss', focus: 'Humanitarian & development jobs' },
  { name: 'AWF African Wildlife', url: 'https://www.awf.org/rss.xml', type: 'rss', focus: 'African conservation grants' },
];

// ===== BUSINESS GRANTS & FUNDING SOURCES =====
export const BUSINESS_GRANT_SOURCES = [
  { name: 'Tony Elumelu Foundation', url: 'https://www.tonyelumelufoundation.org/feed', type: 'rss', focus: 'African entrepreneurs' },
  { name: 'AfricanGrantsHub', url: 'https://www.africangrantshub.com/feed/', type: 'rss', focus: 'Africa business grants' },
  { name: 'GrantsAfrica', url: 'https://www.grantsafrica.com/feed/', type: 'rss', focus: 'African business funding' },
  { name: 'SMEFinance', url: 'https://smefinanceforum.org/feed/', type: 'rss', focus: 'SME financing Africa' },
  { name: 'AfricanBusiness', url: 'https://african.business/feed/', type: 'rss', focus: 'African business news & grants' },
  { name: 'Devex Funding', url: 'https://www.devex.com/news/rss.xml', type: 'rss', focus: 'Development funding' },
];

export const BUSINESS_GRANT_KEYWORDS = [
  'grant', 'funding', 'entrepreneur', 'startup', 'sme', 'small business',
  'african', 'nigeria', 'youth', 'young african', 'africa',
  'investment', 'seed funding', 'accelerator', 'incubator',
  'tony elumelu', 'mastercard', 'agrf', 'ifc', 'afdb', 'world bank',
  'business competition', 'pitch competition', 'prize',
  'loan', 'microloan', 'impact investing', 'social enterprise',
];

// ===== CURATED BUSINESS GRANTS (Static — always shown) =====
export const CURATED_GRANTS = [
  { title: 'Tony Elumelu Foundation Entrepreneurship Programme 2026', link: 'https://www.tonyelumelufoundation.org/teep', summary: '$5,000 non-refundable seed capital + 12-week training for African entrepreneurs. No repayment required. Open annually.', source: 'Tony Elumelu Foundation', focus: 'Seed Grant — Africa' },
  { title: 'Mastercard Foundation Young Africa Works Grant', link: 'https://mastercardfdn.org/all/young-africa-works/', summary: 'Partners with organizations to create dignified work for young Africans. Funds businesses in agriculture, tech, and services.', source: 'Mastercard Foundation', focus: 'Business Grant — Africa' },
  { title: 'African Development Bank — Affirmative Finance Action for Women (AFAWA)', link: 'https://www.afdb.org/en/topics-and-sectors/initiatives-partnerships/afawa-affirmative-finance-action-for-women-in-africa', summary: 'Up to $3 billion in finance for women-led SMEs in Africa. Includes grants, loans and guarantees.', source: 'AfDB', focus: 'Women Business Funding — Africa' },
  { title: 'IFC SME Ventures Program — Africa', link: 'https://www.ifc.org/en/topics/smefinance', summary: 'World Bank Group equity and debt funding for African SMEs in fintech, agri, and health sectors.', source: 'IFC / World Bank', focus: 'SME Funding — Africa' },
  { title: 'AGRF Africa Food Prize & Grants 2026', link: 'https://africafoodprize.org/', summary: '$100,000 prize for African individuals/organizations transforming African agriculture. Annual application.', source: 'AGRF', focus: 'Agriculture Grant — Africa' },
  { title: 'Jack Ma Foundation — Africa Netpreneur Prize 2026', link: 'https://www.africasbusinessheroes.org/', summary: '$1.5 million shared across 10 African entrepreneurs. Annual pitch competition open to all African businesses.', source: 'Jack Ma Foundation', focus: 'Business Prize — Africa' },
  { title: 'YALI Mandela Washington Fellowship — Business Track', link: 'https://yali.state.gov/mwf/', summary: 'US government program for young African leaders in business, civic, and public management. Fully funded 6-week US institute.', source: 'US State Department', focus: 'Leadership Grant — Africa' },
  { title: 'GSMA Innovation Fund for Digital Inclusion', link: 'https://www.gsma.com/mobile-for-development/', summary: 'Grants up to £500,000 for mobile & digital innovation projects targeting underserved communities in Africa.', source: 'GSMA', focus: 'Tech Grant — Africa' },
  { title: 'Google for Startups — Africa Fund', link: 'https://startup.google.com/intl/en/programs/', summary: 'Up to $100,000 in Google Cloud credits + mentorship for African tech startups. Rolling applications.', source: 'Google', focus: 'Tech Startup — Africa' },
  { title: 'Norrsken Impact Accelerator — Africa', link: 'https://www.norrsken.org/', summary: 'Equity-free grants and investment for impact-driven startups in Africa. Covers fintech, health, agri sectors.', source: 'Norrsken Foundation', focus: 'Impact Startup — Africa' },
  { title: 'Seedstars Africa Growth Program', link: 'https://www.seedstars.com/', summary: 'Equity investment of $500K to $5M for early-stage African startups solving local problems at scale.', source: 'Seedstars', focus: 'Startup Investment — Africa' },
  { title: 'VC4A Venture Finance Africa', link: 'https://vc4a.com/', summary: 'Platform connecting African entrepreneurs to over 200 active investors. Grants and funding competitions listed daily.', source: 'VC4A', focus: 'Startup Finance — Africa' },
  { title: 'NIRSAL Agri-Business SME Fund — Nigeria', link: 'https://nirsal.com/facilities/', summary: 'CBN-backed agricultural finance facility for Nigerian farmers and agri-entrepreneurs. Low-interest loans and grants.', source: 'NIRSAL / CBN Nigeria', focus: 'Agri Grant — Nigeria' },
  { title: 'BOI Youth Entrepreneurship Support (YES) — Nigeria', link: 'https://www.boi.ng/product/yes/', summary: 'Bank of Industry grant/loan for Nigerian youth entrepreneurs aged 18–35. Up to ₦5M in funding.', source: 'Bank of Industry Nigeria', focus: 'Youth Business — Nigeria' },
  { title: 'ILO Youth Co:Lab Innovation Challenge Africa', link: 'https://www.youthcolab.org/', summary: 'Accelerator for young social entrepreneurs across Africa. Includes $10,000 grants and mentorship.', source: 'ILO / UNDP', focus: 'Social Enterprise — Africa' },
  { title: 'African Women Innovation & Entrepreneurship Forum (AWIEF) Grant', link: 'https://awief.org/', summary: 'Supports women-led businesses in Africa with grants, mentorship, and market access programs.', source: 'AWIEF', focus: 'Women Business — Africa' },
  { title: 'Hivos Green Entrepreneurship Program', link: 'https://hivos.org/', summary: 'Grants for African green energy startups focused on solar, clean cookstoves, and sustainable agriculture.', source: 'Hivos', focus: 'Green Tech Grant — Africa' },
  { title: "Cartier Women's Initiative Award 2026", link: 'https://www.cartierwomensinitiative.com/', summary: 'International business award offering up to $100,000 for women-led impact businesses. African track available.', source: 'Cartier Foundation', focus: 'Women Entrepreneur — Global' },
  { title: 'UN SDG Innovation Fund — Africa', link: 'https://sdg-innovation-challenge.undp.org/', summary: 'UNDP grants for African tech and social innovations aligned with UN Sustainable Development Goals.', source: 'UNDP', focus: 'SDG Innovation — Africa' },
  { title: 'World Bank Group Digital Development Partnership Grant', link: 'https://www.worldbank.org/en/programs/ddp', summary: 'Funding for African digital economy initiatives in fintech, e-government, and digital infrastructure.', source: 'World Bank', focus: 'Digital Economy — Africa' },
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
