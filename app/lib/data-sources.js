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
// Curated for quality: only sources that post Masters/PhD fully-funded programs
export const SCHOLARSHIP_SOURCES = [
  { name: 'Scholars4Dev',            url: 'https://www.scholars4dev.com/feed/',                  type: 'rss', focus: 'Masters & PhD globally — best for Africans' },
  { name: 'OpportunityDesk',         url: 'https://opportunitydesk.org/feed/',                   type: 'rss', focus: 'Fully funded — African youth focus' },
  { name: 'AfterSchoolAfrica',       url: 'https://www.afterschoolafrica.com/feed/',              type: 'rss', focus: 'Masters/PhD for Africans' },
  { name: 'OpportunitiesForAfricans',url: 'https://www.opportunitiesforafricans.com/feed/',       type: 'rss', focus: 'Elite African scholarship channel' },
  { name: 'ScholarshipPositions',    url: 'https://scholarshipscorner.website/feed/',             type: 'rss', focus: 'PhD & Masters globally' },
  { name: 'ScholarshipRegion',       url: 'https://scholarshipregion.com/feed/',                  type: 'rss', focus: 'Fully funded — regional focus' },
  { name: 'FellowshipBard',          url: 'https://fellowshipbard.com/feed/',                     type: 'rss', focus: 'Research fellowships & PhD awards' },
  { name: 'ScholarshipsAds',         url: 'https://www.scholarshipsads.com/feed/',                type: 'rss', focus: 'Masters/PhD scholarships — global' },
  { name: 'CommonwealthScholarships',url: 'https://cscuk.fcdo.gov.uk/feed/',                      type: 'rss', focus: 'UK Commonwealth — Masters/PhD' },
  { name: 'MastercardfoundationFeed',url: 'https://mastercardfdn.org/feed/',                      type: 'rss', focus: 'Mastercard Foundation scholars program' },
  { name: 'PTDF',                    url: 'https://www.ptdf.gov.ng/feed/',                        type: 'rss', focus: 'Nigerian government Masters/PhD abroad' },
  { name: 'ScholarshipsHall',        url: 'https://scholarshipshall.com/feed/',                   type: 'rss', focus: 'Fully funded Masters/PhD' },
  { name: 'ErasmusPlus',             url: 'https://erasmus-plus.ec.europa.eu/feed',                type: 'rss', focus: 'EU Erasmus Mundus Joint Masters — fully funded' },
  { name: 'AUScholarships',          url: 'https://au.int/feed',                                   type: 'rss', focus: 'African Union Masters/PhD scholarships' },
];

// Two-tier compound filter: item must match AT LEAST ONE level keyword AND AT LEAST ONE type keyword
// This eliminates short courses, internships, bachelor's programs, and generic news
// "fully funded" is also required — partial scholarships are not shown
export const SCHOLARSHIP_LEVEL_KEYWORDS = [
  'masters', "master's", 'msc', 'mba', 'm.phil', 'mres',
  'phd', 'ph.d', 'doctoral', 'doctorate', 'postgraduate', 'postdoctoral',
  'graduate', 'postdoc', 'research degree',
];

export const SCHOLARSHIP_TYPE_KEYWORDS = [
  'fully funded', 'full scholarship', 'funded scholarship', 'full funding', 'full ride',
  'scholarship', 'fellowship', 'stipend', 'tuition waiver', 'full tuition',
  'bursary', 'funded programme', 'all expenses',
];

// Keep for backward compatibility — not used in new compound filter
export const SCHOLARSHIP_KEYWORDS = [
  'fully funded', 'scholarship', 'fellowship', 'phd', 'masters', 'postgraduate',
  'stipend', 'tuition waiver', 'daad', 'chevening', 'fulbright', 'commonwealth',
  'erasmus', 'mext', 'mastercard foundation', 'gates cambridge', 'rhodes',
];

// ===== CURATED TOP SCHOLARSHIPS =====
// Rule: FULLY FUNDED Masters or PhD only — directly applicable from a bachelor's degree
// Every entry verified as currently active, open to Nigerians/Africans
export const CURATED_SCHOLARSHIPS = [

  // ══════════════════════════════════════════════
  // MASTERCARD FOUNDATION — MASTERS (Partner Universities)
  // ══════════════════════════════════════════════
  { title: 'Mastercard Foundation Scholars Program — University of Edinburgh (Masters)', link: 'https://www.ed.ac.uk/student-funding/postgraduate/international/mastercard', summary: 'Fully funded Masters at University of Edinburgh. Covers tuition, accommodation, living costs, flights, and visa. Apply directly through Edinburgh admissions. Open to Nigerians.', source: 'Mastercard Foundation', focus: 'UK Masters — Fully Funded', date: '' },
  { title: 'Mastercard Foundation Scholars Program — University of Pretoria (Masters)', link: 'https://www.up.ac.za/mastercard-foundation-scholars-program', summary: 'Full Masters scholarship at University of Pretoria, South Africa. Covers tuition, accommodation, meals, laptop, and personal development funding. Apply through UP postgraduate admissions.', source: 'Mastercard Foundation', focus: 'South Africa Masters — Fully Funded', date: '' },
  { title: 'Mastercard Foundation Scholars Program — University of Cape Town (Masters)', link: 'https://www.uct.ac.za/main/students/fees-funding/scholarships/mastercard', summary: 'Fully funded postgraduate (Masters) scholarship at UCT. Tuition, accommodation, living allowance, and academic support included. Apply through UCT graduate school.', source: 'Mastercard Foundation', focus: 'South Africa Masters — Fully Funded', date: '' },
  { title: 'Mastercard Foundation Scholars Program — CMU Africa Rwanda (Masters)', link: 'https://www.africa.engineering.cmu.edu/admissions/scholarships.html', summary: 'Full Masters in Information Technology or Electrical & Computer Engineering at Carnegie Mellon Africa, Kigali. Covers tuition, stipend, and travel. Apply through CMU Africa admissions.', source: 'Mastercard Foundation', focus: 'Rwanda/USA Masters — Fully Funded', date: '' },
  { title: 'Mastercard Foundation Scholars Program — Sciences Po Paris (Masters)', link: 'https://www.sciencespo.fr/en/admissions/financial-aid/mastercard-foundation/', summary: 'Fully funded Masters at Sciences Po Paris for African students. Covers all costs including tuition, living in Paris, and travel. Apply through Sciences Po international admissions.', source: 'Mastercard Foundation', focus: 'France Masters — Fully Funded', date: '' },
  { title: 'Mastercard Foundation Scholars Program — McGill University Canada (Masters)', link: 'https://www.mcgill.ca/mastercardfdn-scholars/', summary: 'Fully funded graduate studies at McGill. Covers tuition, residence, meals, books, health insurance, and travel allowance. Apply through McGill graduate school.', source: 'Mastercard Foundation', focus: 'Canada Masters — Fully Funded', date: '' },
  { title: 'Mastercard Foundation Scholars Program — Makerere University (Masters)', link: 'https://www.mak.ac.ug/mastercard-foundation', summary: 'Fully funded postgraduate scholarship at Makerere University, Uganda. Covers tuition, living expenses, and leadership mentorship. Apply through Makerere School of Graduate Studies.', source: 'Mastercard Foundation', focus: 'Uganda Masters — Fully Funded', date: '' },
  { title: 'Mastercard Foundation Scholars Program — KNUST Ghana (Masters)', link: 'https://www.knust.edu.gh/admissions/mastercard-foundation', summary: 'Full Masters scholarship at KNUST Kumasi. Covers tuition, accommodation, stipend, and laptop. Open to West African students including Nigerians. Apply through KNUST postgraduate office.', source: 'Mastercard Foundation', focus: 'Ghana Masters — Fully Funded', date: '' },
  { title: 'Mastercard Foundation Scholars Program — Ashesi University (Masters)', link: 'https://www.ashesi.edu.gh/admissions/financial-aid/mastercard-foundation-scholars-program.html', summary: 'Full scholarship at Ashesi University Ghana. Covers tuition, accommodation, meals, books, and internship placement. Open to all Africans. Apply through Ashesi admissions office.', source: 'Mastercard Foundation', focus: 'Ghana Masters — Fully Funded', date: '' },
  { title: 'Mastercard Foundation Scholars Program — University of Rwanda (Masters)', link: 'https://ur.ac.rw/mastercard-foundation-scholars/', summary: 'Full postgraduate scholarship at University of Rwanda. Tuition, accommodation, and monthly stipend included. Apply through UR School of Graduate Studies.', source: 'Mastercard Foundation', focus: 'Rwanda Masters — Fully Funded', date: '' },
  { title: 'Mastercard Foundation Scholars Program — Duke University USA (Masters)', link: 'https://duke.edu/financialaid/mastercard/', summary: 'Fully funded graduate studies at Duke University for African students. Full ride: tuition, room, board, travel. Apply through Duke graduate admissions.', source: 'Mastercard Foundation', focus: 'USA Masters — Fully Funded', date: '' },
  { title: 'Mastercard Foundation Scholars Program — Arizona State University (Masters)', link: 'https://admission.asu.edu/international/scholarships/mastercard', summary: 'Full Masters scholarship at ASU for African students in STEM and social sciences. Covers tuition, living allowance, and support services. Apply through ASU graduate admissions.', source: 'Mastercard Foundation', focus: 'USA Masters — Fully Funded', date: '' },

  // ══════════════════════════════════════════════
  // DAAD — GERMANY (Multiple Programs)
  // ══════════════════════════════════════════════
  { title: 'DAAD Development-Related Postgraduate Courses 2026 — Germany', link: 'https://www.daad.de/en/study-and-research-in-germany/scholarships/daad-scholarships/', summary: 'Fully funded Masters at German universities for developing-country students. Covers tuition, monthly stipend (€934), accommodation, travel, health insurance. Apply via DAAD portal. Nigeria is a priority country.', source: 'DAAD Germany', focus: 'Germany Masters — Fully Funded', date: '' },
  { title: 'DAAD In-Country/In-Region Scholarship 2026 — Sub-Saharan Africa', link: 'https://www.daad.de/en/find-funding/scholarship-database/?origin=4&subjectGroup=&aimCountry=0&daad=1&q=africa&status=5&type=0&p=1', summary: 'DAAD Masters scholarships for studying at African universities. Covers tuition, stipend, travel, and research costs. Open to Nigerians at partner African universities.', source: 'DAAD Germany', focus: 'Africa Masters — Fully Funded', date: '' },
  { title: 'DAAD Helmut-Schmidt Programme — Public Policy & Good Governance Masters 2026', link: 'https://www.daad.de/en/find-funding/scholarship-database/?q=helmut+schmidt&p=1', summary: 'Fully funded Masters in Public Policy, Governance, or related fields at German universities. Monthly stipend + all costs. Specifically designed for future leaders from developing countries.', source: 'DAAD Germany', focus: 'Germany Masters — Fully Funded', date: '' },

  // ══════════════════════════════════════════════
  // ERASMUS MUNDUS — EU JOINT MASTERS
  // ══════════════════════════════════════════════
  { title: 'Erasmus Mundus Joint Master Degree (EMJMD) 2026/27 — European Union', link: 'https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-catalogue_en', summary: 'Fully funded joint Masters across 2–3 European universities. Covers full tuition, monthly living allowance (~€1,000/month), travel and installation grants. Browse 150+ active programmes in the catalogue. Open to Nigerians — no EU residency needed.', source: 'EU Erasmus+', focus: 'EU Joint Masters — Fully Funded', date: '' },
  { title: 'Erasmus Mundus — EMMAPA Masters in Agri-Food & Environmental Management', link: 'https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-catalogue_en', summary: 'Erasmus Mundus fully funded Masters in agriculture/food/environment across European universities. Monthly stipend + full tuition. Ideal for Nigerian agritech/environment backgrounds.', source: 'EU Erasmus+', focus: 'EU Masters — Fully Funded', date: '' },

  // ══════════════════════════════════════════════
  // UK SCHOLARSHIPS
  // ══════════════════════════════════════════════
  { title: 'Chevening Scholarship 2026/27 — UK Government (Masters)', link: 'https://www.chevening.org/scholarships/', summary: 'Fully funded 1-year Masters at any UK university. Covers tuition (no cap), monthly living stipend, return flights, and UK visa costs. Open to Nigerians with 2+ years work experience. Apply Oct–Nov.', source: 'Chevening.org', focus: 'UK Masters — Fully Funded', date: '' },
  { title: 'Commonwealth Scholarship — Masters & PhD UK 2026', link: 'https://cscuk.fcdo.gov.uk/apply/', summary: 'UK government fully funded Masters/PhD for Commonwealth citizens including Nigerians. Covers tuition, living stipend, return airfare, and thesis grants. Apply through Nigeria's NUC/Federal Scholarship Board.', source: 'FCDO UK', focus: 'UK PhD/Masters — Fully Funded', date: '' },
  { title: 'Gates Cambridge Scholarship 2026 — University of Cambridge (PhD/Masters)', link: 'https://www.gatescambridge.org/apply/', summary: 'Full-cost PhD or Masters at Cambridge. Covers tuition, maintenance allowance (£21,000+/year), flights, and family allowance. Extremely competitive — requires independent application to Cambridge first.', source: 'Gates Cambridge', focus: 'UK PhD/Masters — Fully Funded', date: '' },
  { title: 'Rhodes Scholarship 2026 — University of Oxford (Masters/DPhil)', link: 'https://www.rhodeshouse.ox.ac.uk/scholars/how-to-apply/', summary: 'Oldest international scholarship in the world. Fully funded Masters or DPhil at Oxford. Covers tuition, living stipend, return flights. Apply through Rhodes House Nigeria office by July/August.', source: 'Rhodes Trust', focus: 'UK Oxford Masters/PhD — Fully Funded', date: '' },
  { title: 'Clarendon Scholarship 2026 — University of Oxford (Masters/DPhil)', link: 'https://www.ox.ac.uk/clarendon/', summary: 'Fully funded Masters or DPhil at Oxford. Covers tuition AND generous living allowance. Automatic consideration — just apply to any Oxford graduate programme and tick the funding box. No separate application.', source: 'Oxford University', focus: 'UK Oxford Graduate — Fully Funded', date: '' },
  { title: 'Wellcome Trust PhD Fellowships 2026 — UK', link: 'https://wellcome.org/grant-funding/schemes/four-year-phd-studentships', summary: 'Fully funded 4-year PhD at UK universities in biomedical/life sciences. Covers tuition, living stipend (~£22,000/year), and research costs. Apply through Wellcome-funded PhD programmes.', source: 'Wellcome Trust', focus: 'UK PhD — Fully Funded', date: '' },

  // ══════════════════════════════════════════════
  // GERMANY — BEYOND DAAD
  // ══════════════════════════════════════════════
  { title: 'Heinrich Böll Foundation Scholarship 2026 — Germany (Masters/PhD)', link: 'https://www.boell.de/en/foundation/scholarships', summary: 'Fully funded Masters or PhD in Germany for international students. Monthly stipend + tuition support. Linked to Green party values (sustainability, social justice, democracy). No prior German required for English-taught programs.', source: 'Heinrich Böll Foundation', focus: 'Germany Masters/PhD — Fully Funded', date: '' },
  { title: 'Konrad Adenauer Foundation Scholarship 2026 — Germany (Masters/PhD)', link: 'https://www.kas.de/en/web/begabtenfoerderung-und-kultur/scholarships', summary: 'Fully funded Masters or PhD in Germany. Monthly stipend (~€850 + €300 project fund). Values: democracy, rule of law, social market economy. Open to international students at German universities.', source: 'Konrad Adenauer Foundation', focus: 'Germany Masters/PhD — Fully Funded', date: '' },
  { title: 'Friedrich Ebert Foundation Scholarship 2026 — Germany (Masters/PhD)', link: 'https://www.fes.de/en/about-fes/promotion-of-young-talent/scholarship-holders/', summary: 'Fully funded Masters or PhD at German universities. Monthly stipend + special supplements. Values: social democracy, equality, labor rights. Open to international students.', source: 'Friedrich Ebert Foundation', focus: 'Germany Masters/PhD — Fully Funded', date: '' },
  { title: 'Swiss Government Excellence Scholarships 2026/27 — ESKAS (PhD/Postdoc)', link: 'https://www.sbfi.admin.ch/sbfi/en/home/education/scholarships-and-grants/swiss-government-excellence-scholarships.html', summary: 'Fully funded PhD or postdoc research at Swiss universities (ETH Zurich, EPFL, Uni Geneva, etc). Monthly stipend + tuition waiver + accommodation contribution + travel. Apply through Swiss Embassy Nigeria by November.', source: 'Swiss Government ESKAS', focus: 'Switzerland PhD — Fully Funded', date: '' },
  { title: 'ETH Zurich Excellence Scholarship 2026 — Switzerland (Masters)', link: 'https://ethz.ch/en/studies/master/excellencescholarship.html', summary: 'Fully funded Masters at ETH Zurich (top 10 globally). Covers full tuition + CHF 12,000 semester stipend. Apply through ETH Zurich admissions by December. No separate scholarship form — apply when you apply to the programme.', source: 'ETH Zurich', focus: 'Switzerland Masters — Fully Funded', date: '' },

  // ══════════════════════════════════════════════
  // NETHERLANDS
  // ══════════════════════════════════════════════
  { title: 'Orange Knowledge Programme (OKP) 2026 — Netherlands Government (Masters)', link: 'https://www.nuffic.nl/en/subjects/orange-knowledge-programme', summary: 'Dutch government fully funded Masters scholarships for mid-career professionals from developing countries. Covers tuition, living expenses, travel, and insurance. Nigeria is a priority country. Apply through Dutch Embassy or NFP portal.', source: 'Nuffic Netherlands', focus: 'Netherlands Masters — Fully Funded', date: '' },
  { title: 'Leiden University Excellence Scholarship (LExS) 2026 — Netherlands (Masters)', link: 'https://www.universiteitleiden.nl/en/scholarships/sea/scholarship-leiden-excellence', summary: 'Fully funded Masters at Leiden University. Covers full tuition fee + €10,000–€15,000 living costs. Competitive — need 80%+ in bachelor\'s. Apply through Leiden University admissions.', source: 'Leiden University', focus: 'Netherlands Masters — Fully Funded', date: '' },

  // ══════════════════════════════════════════════
  // SCANDINAVIA
  // ══════════════════════════════════════════════
  { title: 'Swedish Institute Scholarships for Global Professionals (SISGP) 2026 — Sweden (Masters)', link: 'https://si.se/en/apply/scholarships/swedish-institute-scholarships-for-global-professionals/', summary: 'Fully funded Masters in Sweden for professionals from developing countries including Nigeria. Covers full tuition, monthly living grant (SEK 11,000+), travel, insurance. Apply Jan–Feb each year. Extremely strategic — leadership network included.', source: 'Swedish Institute', focus: 'Sweden Masters — Fully Funded', date: '' },
  { title: 'Finnish Government Scholarship 2026/27 — Finland (Masters/PhD)', link: 'https://www.studyinfinland.fi/scholarships', summary: 'Fully funded Masters or PhD study in Finland at Finnish universities. Monthly stipend + tuition waiver. Apply through CIMO/Finnish university scholarship programs.', source: 'Finnish Government', focus: 'Finland Masters/PhD — Fully Funded', date: '' },

  // ══════════════════════════════════════════════
  // BELGIUM
  // ══════════════════════════════════════════════
  { title: 'VLIR-UOS Belgian Government Scholarship 2026 — Belgium (Masters)', link: 'https://www.vliruos.be/en/scholarships/6', summary: 'Fully funded Masters in Belgium at Flemish universities (KU Leuven, Ghent, VUB, etc). Covers full tuition, monthly living allowance, travel, insurance, housing. Nigeria is a priority country. Apply Oct–Jan.', source: 'VLIR-UOS Belgium', focus: 'Belgium Masters — Fully Funded', date: '' },

  // ══════════════════════════════════════════════
  // ASIA — JAPAN, KOREA, CHINA
  // ══════════════════════════════════════════════
  { title: 'MEXT Scholarship 2026 — Japanese Government (Masters/PhD)', link: 'https://www.studyinjapan.go.jp/en/smap_stopj-applications_research.html', summary: 'Japan government fully funded Masters or PhD. Covers full tuition, monthly stipend (¥144,000–¥152,000), accommodation, and return airfare. Apply through Japanese Embassy Nigeria by May/June.', source: 'MEXT Japan', focus: 'Japan Masters/PhD — Fully Funded', date: '' },
  { title: 'Global Korea Scholarship (GKS/KGSP) 2026 — South Korea (Masters/PhD)', link: 'https://www.studyinkorea.go.kr/en/sub/gks/allnew_invite.do', summary: 'Korean government fully funded Masters or PhD. Covers tuition, monthly stipend (KRW 900,000–1,000,000), flights, Korean language training, settlement allowance, health insurance. Apply through Korean Embassy Nigeria by March.', source: 'Korean Government', focus: 'South Korea Masters/PhD — Fully Funded', date: '' },
  { title: 'KAIST International Student Scholarship 2026 — South Korea (Masters/PhD)', link: 'https://admission.kaist.ac.kr/', summary: 'Full tuition waiver + monthly stipend ($350–$500) for Masters/PhD at KAIST (Korea\'s MIT). Top engineering/science/AI programs. Apply directly to KAIST graduate school — scholarship is automatic for admitted students.', source: 'KAIST Korea', focus: 'South Korea Masters/PhD — Fully Funded', date: '' },
  { title: 'China Government Scholarship (CSC) 2026 — Full Masters/PhD', link: 'https://www.campuschina.org/scholarships/index.html', summary: 'Chinese government fully funded Masters or PhD at 280+ Chinese universities. Covers full tuition, accommodation, monthly stipend (¥3,000–¥3,500), and comprehensive insurance. Nigeria has a dedicated quota. Apply through Chinese Embassy Lagos.', source: 'CSC China', focus: 'China Masters/PhD — Fully Funded', date: '' },
  { title: 'Schwarzman Scholars Program 2026 — Tsinghua University Beijing (Masters)', link: 'https://www.schwarzmanscholars.org/admissions/', summary: '1-year fully funded Masters in Global Affairs at Tsinghua University. Covers tuition, room, board, travel, and a personal stipend. Extremely selective (~100 scholars/year global). Apply by September.', source: 'Schwarzman Scholars', focus: 'China Masters — Fully Funded', date: '' },
  { title: 'ADB-Japan Scholarship Program 2026 — Masters in Asia', link: 'https://www.adb.org/site/careers/japan-scholarship-program', summary: 'Asian Development Bank + Japan fully funded Masters at designated Asian universities (incl. ADBI Tokyo, NUS). Covers tuition, monthly living allowance, travel, insurance. Open to African developing-country nationals.', source: 'ADB Japan', focus: 'Asia Masters — Fully Funded', date: '' },
  { title: 'NTU Singapore Nanyang Scholarship 2026 — Masters/PhD', link: 'https://www.ntu.edu.sg/admissions/graduate/scholarships', summary: 'Full tuition waiver + monthly stipend for Masters or PhD at NTU Singapore (global top 25). Cover all research expenses. Apply through NTU Graduate Admissions — scholarship awarded competitively at admission.', source: 'NTU Singapore', focus: 'Singapore Masters/PhD — Fully Funded', date: '' },

  // ══════════════════════════════════════════════
  // USA & CANADA
  // ══════════════════════════════════════════════
  { title: 'Fulbright Foreign Student Program 2026/27 — USA (Masters/PhD)', link: 'https://foreign.fulbrightonline.org/', summary: 'US government fully funded Masters or PhD in the USA. Covers tuition, living stipend, travel, and health insurance. Apply through US Embassy Abuja by May each year. Nigeria has a dedicated annual quota.', source: 'Fulbright Program', focus: 'USA Masters/PhD — Fully Funded', date: '' },
  { title: 'Stanford Knight-Hennessy Scholars 2026 — USA (Masters/PhD)', link: 'https://knight-hennessy.stanford.edu/admission', summary: 'Full graduate funding at Stanford for global emerging leaders. Covers tuition, stipend, travel, and enrichment activities. Apply to any Stanford graduate program + Knight-Hennessy separately by October.', source: 'Stanford University', focus: 'USA Graduate — Fully Funded', date: '' },
  { title: 'Vanier Canada Graduate Scholarships 2026 (PhD)', link: 'https://vanier.gc.ca/en/home-accueil.html', summary: 'CAD $50,000/year for 3 years for PhD in Canada. Open to all nationalities. Covers everything. Nominated by Canadian universities — apply through a Canadian university first, then request Vanier nomination.', source: 'Vanier CGS Canada', focus: 'Canada PhD — Fully Funded', date: '' },
  { title: 'World Bank Graduate Scholarship Program (JJ/WBGSP) 2026', link: 'https://www.worldbank.org/en/programs/scholarships', summary: 'Fully funded Masters at World Bank partner universities globally. Priority: development economics, public policy, law, social sciences. Covers tuition, living allowance, travel. Nigerian mid-career professionals eligible.', source: 'World Bank', focus: 'Global Masters — Fully Funded', date: '' },
  { title: 'Japan World Bank Joint Graduate Scholarship (JJ/WBGSP) 2026', link: 'https://www.worldbank.org/en/programs/scholarships/brief/jj-wbgsp', summary: 'Joint Japan-World Bank fully funded Masters for developing country nationals in development-related fields. Covers full tuition + monthly stipend + travel at 25+ partner universities globally.', source: 'Japan World Bank', focus: 'Global Masters — Fully Funded', date: '' },

  // ══════════════════════════════════════════════
  // TURKEY, HUNGARY, EASTERN EUROPE
  // ══════════════════════════════════════════════
  { title: 'Türkiye Burslari (Turkish Government Scholarship) 2026 — Masters/PhD', link: 'https://www.turkiyeburslari.gov.tr/', summary: 'Full scholarship covering tuition, accommodation, monthly stipend (TRY 800–1,200/month), health insurance, and return flights for Masters or PhD in Turkey. Apply via turkiyeburslari.gov.tr portal. Nigerian deadline: February.', source: 'Turkish Government', focus: 'Turkey Masters/PhD — Fully Funded', date: '' },
  { title: 'Stipendium Hungaricum 2026 — Hungary (Masters/PhD)', link: 'https://stipendiumhungaricum.hu/', summary: 'Hungarian government fully funded Masters or PhD. Tuition-free + monthly stipend (HUF 140,000) + accommodation. Apply through Nigerian sending partner institution (Federal Scholarship Board) by January.', source: 'Hungarian Government', focus: 'Hungary Masters/PhD — Fully Funded', date: '' },
  { title: 'Czech Government Scholarship 2026 — Czech Republic (Masters/PhD)', link: 'https://www.msmt.cz/eu-and-international-affairs/scholarships', summary: 'Czech Ministry of Education fully funded scholarships for Masters and PhD at Czech universities. Covers tuition (free) + monthly stipend. Apply through Czech Embassy Nigeria by September.', source: 'Czech Government', focus: 'Czech Republic Masters/PhD — Fully Funded', date: '' },
  { title: 'OeAD Austrian Government Scholarship 2026 — Austria (Masters/PhD)', link: 'https://oead.at/en/to-austria/grants-scholarships/', summary: 'Austrian government fully funded research scholarships and Masters/PhD grants. Monthly grant + additional contributions. Apply through OeAD portal by July/October (two deadlines). Research-focused.', source: 'OeAD Austria', focus: 'Austria Masters/PhD — Fully Funded', date: '' },
  { title: 'Italian Government Scholarship (MAECI) 2026 — Italy (Masters/PhD)', link: 'https://studyinitaly.esteri.it/en/home', summary: 'Italian Ministry of Foreign Affairs fully funded scholarships for Masters or PhD at Italian universities. Monthly stipend €900 + tuition waiver. Apply through Italian Embassy Nigeria by January/February.', source: 'Italian Government MAECI', focus: 'Italy Masters/PhD — Fully Funded', date: '' },

  // ══════════════════════════════════════════════
  // AUSTRALIA
  // ══════════════════════════════════════════════
  { title: 'Australia Awards Scholarships 2026/27 — Masters/PhD', link: 'https://www.australiaawardsinternational.org/', summary: 'Australian government fully funded Masters or PhD. Covers full tuition, return flights, living allowance (AUD $32,000+/year), and establishment allowance. Nigeria has a dedicated country quota. Apply April–May each year.', source: 'Australia Awards', focus: 'Australia Masters/PhD — Fully Funded', date: '' },

  // ══════════════════════════════════════════════
  // NIGERIA-SPECIFIC GOVERNMENT
  // ══════════════════════════════════════════════
  { title: 'PTDF Overseas Postgraduate Scholarship 2026 — Nigeria (Masters/PhD abroad)', link: 'https://www.ptdf.gov.ng/scholarships/', summary: 'Petroleum Technology Development Fund fully funded Masters or PhD abroad (UK, USA, Europe) in oil & gas, engineering, or STEM. Covers tuition, living stipend, flights, visa, and research costs. Open to Nigerians only. Apply through PTDF portal.', source: 'PTDF Nigeria', focus: 'Overseas Masters/PhD — Fully Funded', date: '' },
  { title: 'NDDC Postgraduate Foreign Scholarship 2026 — Nigeria', link: 'https://www.nddc.gov.ng/scholarships', summary: 'Niger Delta Development Commission fully funded Masters abroad for Niger Delta state indigenes. Covers tuition, accommodation, living allowance, and flights. Apply through NDDC scholarship portal.', source: 'NDDC Nigeria', focus: 'Overseas Masters — Fully Funded', date: '' },
  { title: 'NLNG Postgraduate Scholarship 2026 — Nigeria (Masters abroad)', link: 'https://www.nlng.com/Sustainability/Pages/Scholarship.aspx', summary: 'Nigeria LNG fully funded Masters abroad in STEM and engineering fields. Covers full tuition + living allowance. Open to Nigerian university graduates. Apply through NLNG portal annually.', source: 'NLNG Nigeria', focus: 'Overseas Masters — Fully Funded', date: '' },

  // ══════════════════════════════════════════════
  // AFRICAN & REGIONAL BODIES
  // ══════════════════════════════════════════════
  { title: 'Pan African University (PAU) Scholarship 2026 — African Union (Masters/PhD)', link: 'https://pau-au.africa/admissions/', summary: 'African Union fully funded Masters and PhD across 5 PAU institutes in Africa (STEM, water, governance, social sciences, space science). Covers tuition, monthly stipend, accommodation, and health insurance. Open to Nigerians. Apply through PAU website.', source: 'African Union', focus: 'Africa Masters/PhD — Fully Funded', date: '' },
  { title: 'AIMS (African Institute for Mathematical Sciences) Masters 2026', link: 'https://nexteinstein.org/study-at-aims/', summary: 'Fully funded 1-year Masters in Mathematical Sciences at AIMS centres across Africa (Ghana, Cameroon, Tanzania, Rwanda, Senegal, South Africa). Covers tuition, accommodation, meals, and travel. Open to African university graduates in STEM.', source: 'AIMS NEI', focus: 'Africa Masters — Fully Funded', date: '' },
  { title: 'WASCAL Masters Program 2026 — West Africa Climate Science', link: 'https://wascal.org/scholarships/', summary: 'West African Science Service Centre fully funded Masters in climate science, geography, or environmental management at WASCAL partner universities. Covers tuition, living costs, and research. Open to West African nationals including Nigerians.', source: 'WASCAL', focus: 'West Africa Masters — Fully Funded', date: '' },
  { title: 'Islamic Development Bank (IsDB) Scholarship 2026 — Masters/PhD', link: 'https://www.isdb.org/what-we-do/human-development/merit-scholarship-programme', summary: 'IsDB fully funded Masters or PhD for students from OIC member countries including Nigeria. Covers tuition, monthly stipend, travel, and research allowance. Apply through IsDB scholarship portal by March.', source: 'IsDB', focus: 'Global Masters/PhD — Fully Funded', date: '' },
  { title: 'OFID Scholarship Award 2026 — Masters (OPEC Fund)', link: 'https://ofid.org/OFID-Scholarship-Award', summary: 'OPEC Fund for International Development fully funded Masters for students from developing countries. Covers tuition + living stipend. Fields: energy, environment, economics, development. Apply through OFID scholarship portal.', source: 'OFID/OPEC', focus: 'Global Masters — Fully Funded', date: '' },
  { title: 'Rotary Foundation Global Grant Scholarship 2026 — Masters', link: 'https://www.rotary.org/en/our-programs/grants/global-grants', summary: 'Rotary International fully funded Masters for vocational study abroad. Covers tuition + living costs. Must be linked to peace, disease prevention, water/sanitation, maternal health, economic development, or education. Connect with a local Rotary club to apply.', source: 'Rotary International', focus: 'Global Masters — Fully Funded', date: '' },
  { title: 'Mo Ibrahim Foundation Fellowship 2026 — African Leaders (Masters+)', link: 'https://mo.ibrahim.foundation/fellowship', summary: 'Prestigious 2-year paid fellowship for young Africans to work with African institutions (AfDB, AU, ECA). Monthly stipend + placement + global network. Highly strategic for policy/governance careers. Apply by September.', source: 'Mo Ibrahim Foundation', focus: 'Africa Fellowship — Fully Funded', date: '' },
  { title: 'Aga Khan Foundation International Scholarship 2026 — Postgraduate', link: 'https://www.akdn.org/our-agencies/aga-khan-foundation/international-scholarship-programme', summary: '50% grant + 50% interest-free loan for postgraduate study internationally. Prioritizes developing countries. Apply through Aga Khan Foundation country office in Nigeria. Fields: any. Competitive but strategic.', source: 'Aga Khan Foundation', focus: 'Global Postgraduate — Funded', date: '' },
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

// ===== POWER NETWORK — First World Access =====
// Elite communities to join, decision-maker contacts (public info only), and target businesses
export const POWER_NETWORK = {
  communities: [
    { name: 'Y Combinator Startup School', link: 'https://www.startupschool.org/', type: 'Free', description: '50,000+ founders from the YC ecosystem. Weekly office hours, investor access, co-founder matching. The most respected startup community on earth.', howToJoin: 'Sign up at startupschool.org — instant access, no approval needed.' },
    { name: "Lenny's Newsletter Slack", link: 'https://www.lennysnewsletter.com/', type: 'Paid ~$30/month', description: 'Most elite product & growth community online. Members include PMs and growth leads from Google, Meta, Airbnb, Stripe, and Notion. These are the people who greenlight AI automation budgets.', howToJoin: 'Subscribe to paid tier at lennysnewsletter.com — Slack invite is included.' },
    { name: 'Pavilion (Revenue Leaders)', link: 'https://www.joinpavilion.com/', type: 'Paid $1,500–$7,500/yr', description: 'Elite community of CROs, VPs of Sales, RevOps directors, and CMOs at companies doing $1M–$1B+ revenue. These people approve the AI automation budget.', howToJoin: 'Apply at joinpavilion.com — requires VP/Director+ title or founder status.' },
    { name: 'Product Hunt Makers', link: 'https://www.producthunt.com/discussions', type: 'Free', description: '100,000+ tech founders actively launching products. They need AI tools, automation, and integrations. Prime hunting ground for clients and partners.', howToJoin: 'Create free account at producthunt.com — Makers forum is open to all.' },
    { name: 'Indie Hackers', link: 'https://www.indiehackers.com/', type: 'Free', description: '80,000+ bootstrapped founders building online businesses. Most run lean and desperately need automation to replace manual tasks. Very DM-friendly culture.', howToJoin: 'Sign up free at indiehackers.com — post services and automation case studies.' },
    { name: 'SaaStr Community', link: 'https://www.saastr.com/community/', type: 'Free online', description: 'Largest SaaS founder and executive community globally. 15,000+ at annual conference. Online forum is active with B2B decision-makers who buy automation tools.', howToJoin: 'Join free at saastr.com/community. Apply for annual Summit for in-person access.' },
    { name: 'AI Tinkerers (USA/EU Meetups)', link: 'https://aitinkerers.org/', type: 'Free', description: 'Monthly in-person meetups in NYC, SF, London, Berlin, and 50+ cities. The people in the room are building and buying AI products. Direct pitch environment.', howToJoin: 'Find your city at aitinkerers.org — RSVP free via Meetup or Eventbrite.' },
    { name: 'Latent Space Discord', link: 'https://discord.gg/latent-space', type: 'Free', description: 'Most influential AI community online — researchers, engineers, and founders at top AI companies. Strong signal, zero noise. Great for positioning as an AI expert.', howToJoin: 'Join via discord.gg/latent-space — free, instant access.' },
    { name: 'n8n Community Forum', link: 'https://community.n8n.io/', type: 'Free', description: '30,000+ automation builders, consultants, and agencies. Clients post here looking for help daily. Direct pipeline for n8n automation services.', howToJoin: 'Sign up free at community.n8n.io — browse "Looking for help" posts immediately.' },
    { name: 'Make.com Community', link: 'https://community.make.com/', type: 'Free', description: '40,000+ businesses building and hiring for workflow automation. Constant "looking for an expert" posts. Immediate client acquisition channel.', howToJoin: 'Join free at community.make.com — browse the help-wanted section daily.' },
    { name: 'GrowthHackers Community', link: 'https://growthhackers.com/', type: 'Free', description: '70,000+ growth marketers, CMOs, and digital directors. They run campaigns manually and need automation badly. Active tool and service discussions.', howToJoin: 'Sign up free at growthhackers.com — post automation case studies and wins.' },
    { name: 'On Deck (Founders & Operators)', link: 'https://www.beondeck.com/', type: 'Selective — cohort', description: 'Elite accelerator-style community for founders and senior operators. Alumni raised from a16z, Sequoia, YC. High conversion rate for service pitches.', howToJoin: 'Apply at beondeck.com — cohort-based and competitive. Apply now.' },
  ],
  contacts: [
    { name: 'Alex Hormozi', title: 'CEO & Co-Founder', company: 'Acquisition.com', twitter: 'https://twitter.com/AlexHormozi', linkedin: 'https://www.linkedin.com/in/alexhormozi/', pitch: 'Runs a portfolio of companies that need AI-powered lead follow-up and CRM automation. Posts daily on business systems — DM him with a specific automation result you achieved.' },
    { name: 'Ryan Deiss', title: 'CEO', company: 'DigitalMarketer', twitter: 'https://twitter.com/RyanDeiss', linkedin: 'https://www.linkedin.com/in/ryandeiss/', pitch: 'Leads the largest digital marketing education company globally. Trains 10,000+ agencies on automation — this is the core market for your services.' },
    { name: 'Dan Martell', title: 'Founder & CEO', company: 'SaaS Academy', twitter: 'https://twitter.com/danmartell', linkedin: 'https://www.linkedin.com/in/danmartell/', pitch: 'Coaches 400+ SaaS founders. His clients need AI onboarding flows, email automation, and churn reduction bots. Very active and responsive on Twitter.' },
    { name: 'Noah Kagan', title: 'CEO', company: 'AppSumo', twitter: 'https://twitter.com/noahkagan', linkedin: 'https://www.linkedin.com/in/noahkagan/', pitch: 'AppSumo marketplace reaches 1M+ small business owners actively looking for automation tools. Pitch a tool or service listing.' },
    { name: 'Dharmesh Shah', title: 'CTO & Co-Founder', company: 'HubSpot', twitter: 'https://twitter.com/dharmesh', linkedin: 'https://www.linkedin.com/in/dharmesh/', pitch: '200,000+ HubSpot businesses need advanced CRM automation beyond native HubSpot features. Position as a HubSpot + AI power-user service.' },
    { name: 'Jason Lemkin', title: 'Founder', company: 'SaaStr', twitter: 'https://twitter.com/jasonlk', linkedin: 'https://www.linkedin.com/in/jasonmlemkin/', pitch: 'Most influential voice in B2B SaaS. His community of founders are primary buyers of AI automation. Engage his content before pitching via DM.' },
    { name: 'Justin Welsh', title: 'Solopreneur', company: 'The Saturday Solopreneur', twitter: 'https://twitter.com/JustinWelsh', linkedin: 'https://www.linkedin.com/in/justinwelsh/', pitch: '$5M+ revenue solopreneur with 500K+ audience of coaches and consultants who all need content automation and CRM systems.' },
    { name: 'Greg Isenberg', title: 'CEO', company: 'Late Checkout', twitter: 'https://twitter.com/gregisenberg', linkedin: 'https://www.linkedin.com/in/gisenberg/', pitch: 'Builds community-led businesses. Publicly discusses AI automation needs on Twitter. Very open to DMs — highly active and responsive.' },
    { name: 'Pieter Levels', title: 'Founder', company: 'Nomad List / RemoteOK', twitter: 'https://twitter.com/levelsio', linkedin: 'https://www.linkedin.com/in/pieterdlvl/', pitch: 'Runs 5+ profitable SaaS products solo. Openly seeks automation. The most DM-friendly serious founder on the internet.' },
    { name: 'Codie Sanchez', title: 'Founder', company: 'Contrarian Thinking', twitter: 'https://twitter.com/codie_sanchez', linkedin: 'https://www.linkedin.com/in/codiesanchez/', pitch: 'Acquires and operates boring businesses — plumbing, laundromats, car washes. These businesses need operational AI and have the budget for it.' },
    { name: 'Sam Parr', title: 'Co-Founder', company: 'Hampton Community', twitter: 'https://twitter.com/theSamParr', linkedin: 'https://www.linkedin.com/in/thesamparr/', pitch: 'Runs Hampton — a private community of $1M+ revenue entrepreneurs. Exact target for high-ticket AI automation packages.' },
    { name: 'Rand Fishkin', title: 'CEO & Co-Founder', company: 'SparkToro', twitter: 'https://twitter.com/randfish', linkedin: 'https://www.linkedin.com/in/randfishkin/', pitch: 'Audience intelligence SaaS. His user base (marketing leaders at major brands) are prime AI automation buyers with real budgets.' },
    { name: 'Andrew Wilkinson', title: 'Co-Founder', company: 'Tiny Capital', twitter: 'https://twitter.com/awilkinson', linkedin: 'https://www.linkedin.com/in/awilkinson/', pitch: 'Owns and operates 40+ internet businesses. One pitch = access to 40 potential clients. Each portfolio company needs systematized AI automation.' },
    { name: 'Lenny Rachitsky', title: 'Founder', company: "Lenny's Newsletter", twitter: 'https://twitter.com/lennysan', linkedin: 'https://www.linkedin.com/in/lennyrachitsky/', pitch: '700,000 subscribers — PMs at every major tech company. Sponsors products that solve real pain. Build relationship through content before pitching.' },
    { name: 'Russell Brunson', title: 'Co-Founder', company: 'ClickFunnels', twitter: 'https://twitter.com/russellbrunson', linkedin: 'https://www.linkedin.com/in/russellbrunson/', pitch: '100,000+ ClickFunnels users all need funnel + email automation integrations. Get into his ecosystem and pitch the user base directly.' },
    { name: 'Pat Walls', title: 'Founder', company: 'Starter Story', twitter: 'https://twitter.com/thepatwalls', linkedin: 'https://www.linkedin.com/in/pat-walls-b4ab2b57/', pitch: '2M+ reader audience of entrepreneurs actively building businesses. They need AI-powered customer service, outreach, and ops automation.' },
    { name: 'Nathan Barry', title: 'CEO & Founder', company: 'ConvertKit (Kit)', twitter: 'https://twitter.com/nathanbarry', linkedin: 'https://www.linkedin.com/in/nathanbarry/', pitch: 'ConvertKit serves 600,000+ creators who need AI email automation sequences. Build a ConvertKit integration and sell to the user base.' },
    { name: 'Nik Sharma', title: 'CEO', company: 'Sharma Brands', twitter: 'https://twitter.com/mrsharma', linkedin: 'https://www.linkedin.com/in/nikisharma/', pitch: 'Grows DTC e-commerce brands to $10M–$100M. His clients need AI email flows, abandoned cart automation, and CRM — and they have big budgets.' },
    { name: 'Arvid Kahl', title: 'Founder', company: 'The Bootstrapped Founder', twitter: 'https://twitter.com/arvidkahl', linkedin: 'https://www.linkedin.com/in/arvidkahl/', pitch: 'Influential in bootstrapped SaaS space. His audience of solo founders are automation-hungry and actively seek services and tools.' },
    { name: 'Sahil Bloom', title: 'Founder', company: 'SRB Holdings', twitter: 'https://twitter.com/SahilBloom', linkedin: 'https://www.linkedin.com/in/sahil-bloom/', pitch: 'Invests in and builds businesses. 700K+ audience of ambitious professionals. Use case study content as the pitch mechanism.' },
  ],
  businesses: [
    { type: 'GoHighLevel Reseller Agencies', where: 'Facebook Group "GoHighLevel Official Community" (150,000+ members). Also: gohighlevel.com/marketplace agency directory.', pitch: 'These agencies resell GHL but lack technical setup skills. You build their sub-account automations, AI chatbots, and workflow sequences for their end-clients.', budget: '$500–$5,000/setup + recurring retainer' },
    { type: 'Digital Marketing Agencies (10–50 staff)', where: 'Clutch.co, DesignRush.com, Agency Vista — all list agencies publicly with contact info. Search by city + service niche.', pitch: 'These agencies manage 20–50 clients but still send proposals manually and build reports in spreadsheets. You systematize their entire ops stack with AI.', budget: '$1,000–$8,000/month retainer' },
    { type: 'Real Estate Brokerages & Teams', where: 'Zillow.com/agent-profile, Realtor.com — find teams doing $10M+ sales volume. They list contact info publicly.', pitch: 'Top agents lose leads because follow-up is slow. You build AI-powered lead routing, instant SMS responses, and appointment booking bots via GHL + n8n.', budget: '$1,500–$5,000/setup + monthly' },
    { type: 'B2B SaaS Companies (Seed to Series B)', where: 'ProductHunt.com (filter "newest"), Crunchbase.com (filter "seed" + "Series A"). Target companies with 5–50 employees.', pitch: 'They need onboarding automation, in-app email sequences, churn alerts, and AI support bots — but cannot afford a full RevOps team yet. You are that team.', budget: '$2,000–$10,000/project' },
    { type: 'Coaching & Course Businesses ($500K–$5M)', where: 'Kajabi.com showcase, Teachable.com, Thinkific. Also: Instagram/LinkedIn search "business coach" or "sales coach" and filter by engagement.', pitch: 'Coaches are drowning in admin: application forms, scheduling, email nurturing, client onboarding, payment follow-up. You automate all of it in 2 weeks.', budget: '$1,000–$5,000 setup + $500–$2,000/month' },
    { type: 'E-commerce Brands ($1M–$20M Revenue)', where: 'Shopify store directories, Klaviyo Partner directory, or Google search: site:myshopify.com + product niche.', pitch: 'They need abandoned cart recovery sequences, post-purchase flows, VIP customer segmentation, and AI order-tracking chatbots — all automatable fast.', budget: '$2,000–$8,000/project' },
    { type: 'Insurance Agencies & Financial Advisors', where: 'NAIFA.org directory, state insurance regulator websites, LinkedIn search "independent insurance agent". Nearly all list public contact info.', pitch: 'The most automation-starved industry. Still use spreadsheets. You build CRM automation, renewal reminder bots, and AI-driven nurture sequences — massive ROI for them.', budget: '$1,500–$6,000 setup + monthly' },
    { type: 'Recruitment & Staffing Agencies', where: 'Clutch.co "staffing agencies", LinkedIn Company Search "staffing" 11–50 employees, ERE.net agency directory.', pitch: 'Recruiters manually source, screen, and follow up with every candidate. You automate outreach, build AI screening bots, and sync everything to their ATS.', budget: '$2,000–$7,000/project' },
    { type: 'Law Firms (Boutique & Mid-size)', where: 'Martindale.com, Avvo.com, state bar association directories — all public with direct contact info. Target firms with 5–30 attorneys.', pitch: 'Law firms lose clients at intake due to slow response. You build AI intake bots, automated client communication, document request workflows, and CRM pipeline management.', budget: '$2,500–$10,000 setup' },
    { type: 'Healthcare Practices & Medspas', where: 'Healthgrades.com, Psychology Today therapist directory, RealSelf.com for aesthetic practices — all list contact info publicly.', pitch: 'Clinics lose 30–50% of leads due to slow follow-up. You build AI appointment booking, no-show reactivation campaigns, review automation, and patient nurture sequences.', budget: '$1,500–$5,000 setup + $500–$1,500/month' },
  ],

  // ── WORLD DECISION-MAKERS — Daily email targets (public contact info only) ──
  worldLeaders: [
    { name: 'Sam Altman', title: 'CEO', country: 'USA — OpenAI', email: null, contact: 'https://openai.com/contact', angle: 'Write about AI automation impact in emerging markets. Reference Oracle as a real-world implementation. OpenAI actively publishes global impact stories — pitch yours.' },
    { name: 'Satya Nadella', title: 'CEO', country: 'USA — Microsoft', email: null, contact: 'https://www.linkedin.com/in/satyanadella/', angle: 'Microsoft invests in AI-for-Africa programs. Email via LinkedIn connection request + note about AI automation building economic opportunity in West Africa.' },
    { name: 'Sundar Pichai', title: 'CEO', country: 'USA — Google', email: null, contact: 'https://blog.google/perspectives/sundar-pichai/', angle: 'Google.org and Google for Startups actively fund African tech. Email via Google for Startups Africa application as a direct line.' },
    { name: 'Jensen Huang', title: 'CEO', country: 'USA — NVIDIA', email: null, contact: 'https://www.linkedin.com/in/jenhsunhuang/', angle: 'NVIDIA Inception Program supports AI startups globally. Apply at nvidia.com/en-us/startups/ — direct pipeline to Huang\'s ecosystem and funding.' },
    { name: 'Marc Andreessen', title: 'General Partner', country: 'USA — a16z', email: null, contact: 'https://a16z.com/contact/', angle: 'a16z runs an Africa-focused fund (a16z Africa). Submit your AI automation thesis via their pitch portal at a16z.com. Active investors in African AI companies.' },
    { name: 'Patrick Collison', title: 'CEO', country: 'USA — Stripe', email: null, contact: 'https://www.linkedin.com/in/patrickcollison/', angle: 'Stripe is expanding payment infrastructure across Africa. Stripe Press and Stripe Atlas have public contact pathways. Pitch AI automation for merchant onboarding.' },
    { name: 'Brian Armstrong', title: 'CEO', country: 'USA — Coinbase', email: null, contact: 'https://www.linkedin.com/in/barmstrong/', angle: 'GiveCrypto.org (Armstrong\'s initiative) distributes crypto to people in developing countries. Write about AI + crypto for African economic empowerment.' },
    { name: 'Eric Schmidt', title: 'Former CEO / Chair', country: 'USA — Google / Schmidt Futures', email: null, contact: 'https://www.schmidtfutures.com/about/contact/', angle: 'Schmidt Futures funds AI research and global talent development. Their contact form is public. Write about AI infrastructure for emerging markets.' },
    { name: 'Dario Amodei', title: 'CEO', country: 'USA — Anthropic', email: null, contact: 'https://www.anthropic.com/contact', angle: 'Anthropic actively publishes AI impact research. Write about building real-world AI automation systems using Claude API — this is direct relevance to their mission.' },
    { name: 'Rishi Sunak', title: 'Former Prime Minister / MP', country: 'UK — Parliament', email: null, contact: 'https://members.parliament.uk/member/4483/contact', angle: 'UK Parliament members have public constituent contact forms. Write about AI policy and African diaspora tech contributions to UK economic growth.' },
    { name: 'Børge Brende', title: 'President', country: 'Switzerland — World Economic Forum', email: null, contact: 'https://www.weforum.org/contact', angle: 'WEF actively recruits Young Global Leaders and Global Shapers. Apply at weforum.org/people — direct line to global decision-makers through their programs.' },
    { name: 'Ngozi Okonjo-Iweala', title: 'Director-General', country: 'Switzerland — WTO', email: null, contact: 'https://www.wto.org/english/contactus_e/contactus_e.htm', angle: 'Leads the WTO and is Africa\'s most powerful global voice. WTO has public contact channels. Pitch AI automation as a trade facilitation tool for African SMEs.' },
    { name: 'Akinwumi Adesina', title: 'President', country: 'Côte d\'Ivoire — African Development Bank', email: null, contact: 'https://www.afdb.org/en/about/contact', angle: 'AfDB funds tech and entrepreneurship across Africa. They have an open innovation and partnership portal. Write about AI-powered economic development tools.' },
    { name: 'Tony Blair', title: 'Executive Chairman', country: 'UK — Tony Blair Institute', email: null, contact: 'https://institute.global/contact', angle: 'Tony Blair Institute for Global Change actively works on AI policy in Africa. They have a public contact form and actively engage with African tech builders.' },
    { name: 'Meg Whitman', title: 'US Ambassador', country: 'Kenya — US Embassy Nairobi', email: null, contact: 'https://ke.usembassy.gov/embassy/nairobi/', angle: 'US Embassy runs Young African Leaders Initiative (YALI) and tech programs. Public inquiry form available. Pitch AI tools for Africa\'s development as a YALI-aligned initiative.' },
  ],
};
