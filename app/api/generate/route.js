// ============================================
// ORACLE FETCH ENGINE — Pure Web Scraping
// No LLM. No paid APIs. Just raw data extraction.
// ============================================

import {
  JOB_SOURCES, JOB_KEYWORDS,
  SCHOLARSHIP_SOURCES, SCHOLARSHIP_LEVEL_KEYWORDS, SCHOLARSHIP_TYPE_KEYWORDS, ELITE_SOURCES,
  CURATED_SCHOLARSHIPS,
  POWER_NETWORK,
  BUSINESS_GRANT_SOURCES, BUSINESS_GRANT_KEYWORDS, CURATED_GRANTS,
  NEWS_SOURCES, VIDEO_CHANNELS,
  BOOK_ROTATION, RAINMAKER_PROFILES, NIGHT_SCHOOL_CASES,
} from '../../lib/data-sources';

// Simple XML tag extractor (no external dependency)
function extractFromXML(xml, tag) {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'gi');
  const matches = [];
  let match;
  while ((match = regex.exec(xml)) !== null) {
    matches.push(match[1].trim());
  }
  return matches;
}

function stripCDATA(str) {
  return str.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').replace(/<[^>]+>/g, '').trim();
}

function stripHTML(str) {
  return str.replace(/<[^>]+>/g, '').trim();
}

function decodeEntities(str) {
  const named = {
    '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"',
    '&apos;': "'", '&nbsp;': ' ', '&#038;': '&',
  };
  // First decode named entities
  let result = str.replace(/&[a-zA-Z]+;/g, match => named[match] || match);
  // Then decode all numeric entities (&#NNN; and &#xHHH;)
  result = result.replace(/&#(\d+);/g, (_, num) => String.fromCharCode(parseInt(num, 10)));
  result = result.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
  return result;
}

// ===== JOB PARSERS =====

function parseWorkingNomads(data, source) {
  return (data.jobs || []).map(job => ({
    title: decodeEntities(job.title || ''),
    company: job.company || 'Unknown',
    location: job.location || 'Remote',
    salary: job.salary || '',
    link: job.url || '',
    tags: Array.isArray(job.tags) ? job.tags : (job.tags ? job.tags.split(',').map(t => t.trim()) : []),
    source: source.name,
    date: job.pub_date || '',
    type: 'remote',
  }));
}

function parseTheMuse(data, source) {
  return (data.results || []).map(job => ({
    title: decodeEntities(job.name || ''),
    company: job.company?.name || 'Unknown',
    location: job.locations?.[0]?.name || 'Remote',
    salary: '',
    link: job.refs?.landing_page || '',
    tags: (job.categories || []).map(c => c.name),
    source: source.name,
    date: job.publication_date || '',
    type: 'remote',
  }));
}

function parseJobRSS(xmlText, source) {
  // Support both RSS <item> and Atom <entry> (e.g. Himalayas)
  const blocks = xmlText.match(/<item[\s\S]*?<\/item>/gi)
                 || xmlText.match(/<entry[\s\S]*?<\/entry>/gi)
                 || [];
  return blocks.map(block => {
    const title = decodeEntities(stripCDATA(extractFromXML(block, 'title')[0] || ''));
    // RSS uses <link>url</link>; Atom uses <link href="url"/> (self-closing)
    const rssLink = stripCDATA(extractFromXML(block, 'link')[0] || '');
    const atomLink = block.match(/<link[^>]+href="([^"]+)"/i)?.[1] || '';
    const link = rssLink || atomLink;
    const pubDate = extractFromXML(block, 'pubDate')[0] || extractFromXML(block, 'published')[0] || '';

    let cleanTitle = title;
    let company = 'Unknown';
    // WeWorkRemotely format: "Category: Job Title at Company"
    if (source.name === 'WeWorkRemotely') {
      const colonIdx = title.indexOf(': ');
      if (colonIdx > -1) cleanTitle = title.slice(colonIdx + 2);
    }
    const atIdx = cleanTitle.lastIndexOf(' at ');
    if (atIdx > -1) {
      company = cleanTitle.slice(atIdx + 4).trim();
      cleanTitle = cleanTitle.slice(0, atIdx).trim();
    }

    if (!cleanTitle || !link) return null;
    return { title: cleanTitle, company, location: 'Remote', salary: '', link, tags: [], source: source.name, date: pubDate, type: 'remote' };
  }).filter(Boolean);
}

function parseRedditJSON(data, source) {
  const children = data?.data?.children || [];
  return children.map(child => {
    const post = child.data || {};
    if (post.stickied) return null;
    const title = post.title || '';
    // r/forhire and r/freelance: only keep [HIRING] posts, skip [FOR HIRE]
    if ((source.name === 'RedditForHire' || source.name === 'RedditFreelance') && !title.toLowerCase().includes('[hiring]')) return null;

    let cleanTitle = title.replace(/^\[HIRING\]\s*/i, '').trim();
    let company = 'Unknown';
    // Common format: "[HIRING] Role Title | Company Name | $X/hr | Remote"
    const pipes = cleanTitle.split('|');
    if (pipes.length >= 2) { cleanTitle = pipes[0].trim(); company = pipes[1].trim(); }

    const salaryMatch = title.match(/\$[\d,]+(?:\/(?:hr|year|mo))?(?:\s*-\s*\$[\d,]+)?/i);
    return {
      title: cleanTitle, company, location: 'Remote',
      salary: salaryMatch ? salaryMatch[0] : '',
      link: `https://www.reddit.com${post.permalink || ''}`,
      tags: post.link_flair_text ? [post.link_flair_text] : [],
      source: source.name,
      date: post.created_utc ? new Date(post.created_utc * 1000).toISOString() : '',
      type: 'remote',
    };
  }).filter(Boolean);
}

function parseHNJobs(data, source) {
  return (data?.hits || []).map(hit => {
    let title = hit.title || '';
    let company = 'Unknown';
    // HN format: "Company (YC S24) is hiring a Senior Engineer"
    const isHiringIdx = title.toLowerCase().indexOf(' is hiring');
    if (isHiringIdx > -1) {
      company = title.slice(0, isHiringIdx).trim();
      title = title.slice(isHiringIdx + 11).replace(/^a\s+/i, '').trim();
    }
    return {
      title: decodeEntities(title), company, location: 'Remote', salary: '',
      link: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
      tags: ['hacker-news'], source: source.name, date: hit.created_at || '', type: 'remote',
    };
  });
}

// ===== FETCH JOBS =====
async function fetchJobs() {
  const TIMEOUT = 10000;

  async function fetchOneSource(source) {
    const headers = {
      'User-Agent': source.type === 'reddit'
        ? 'OracleBot/1.0 (job aggregator; contact: oracle@example.com)'
        : 'Mozilla/5.0 (compatible; OracleBot/1.0)',
      'Accept': (source.type === 'json' || source.type === 'reddit' || source.type === 'hn')
        ? 'application/json'
        : 'application/rss+xml, application/xml, text/xml, */*',
    };

    if (source.type === 'json') {
      const res = await fetch(source.url, { headers, signal: AbortSignal.timeout(TIMEOUT) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (source.name === 'RemoteOK') {
        return (Array.isArray(data) ? data.slice(1) : []).map(job => ({
          title: decodeEntities(job.position || job.title || ''),
          company: job.company || 'Unknown',
          location: job.location || 'Remote',
          salary: job.salary || '',
          link: job.url || job.apply_url || `https://remoteok.com/remote-jobs/${job.slug || ''}`,
          tags: job.tags || [], source: 'RemoteOK', date: job.date || '', type: 'remote',
        }));
      }
      if (source.name === 'Remotive') {
        return (data.jobs || []).map(job => ({
          title: decodeEntities(job.title || ''),
          company: job.company_name || 'Unknown',
          location: job.candidate_required_location || 'Remote',
          salary: job.salary || '',
          link: job.url || '', tags: [job.category || ''],
          source: 'Remotive', date: job.publication_date || '', type: 'remote',
        }));
      }
      if (source.name === 'Arbeitnow') {
        return (data.data || []).map(job => ({
          title: decodeEntities(job.title || ''),
          company: job.company_name || 'Unknown',
          location: job.location || 'Remote',
          salary: job.salary || '',
          link: job.url || '', tags: job.tags || [],
          source: 'Arbeitnow', date: job.created_at || '', type: job.remote ? 'remote' : 'visa',
        }));
      }
      if (source.name === 'WorkingNomads') return parseWorkingNomads(data, source);
      if (source.name === 'TheMuse') return parseTheMuse(data, source);
      return [];
    }

    if (source.type === 'rss') {
      const res = await fetch(source.url, { headers, signal: AbortSignal.timeout(TIMEOUT) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return parseJobRSS(await res.text(), source);
    }

    if (source.type === 'reddit') {
      const res = await fetch(source.url, { headers, signal: AbortSignal.timeout(TIMEOUT) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return parseRedditJSON(await res.json(), source);
    }

    if (source.type === 'hn') {
      const res = await fetch(source.url, { headers, signal: AbortSignal.timeout(TIMEOUT) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return parseHNJobs(await res.json(), source);
    }

    return [];
  }

  // All 16 sources fire concurrently — individual failures degrade gracefully
  const results = await Promise.allSettled(
    JOB_SOURCES.map(source =>
      fetchOneSource(source).catch(err => {
        console.error(`[ORACLE] Jobs ${source.name} failed:`, err.message);
        return [];
      })
    )
  );

  const allJobs = [];
  for (let i = 0; i < results.length; i++) {
    const source = JOB_SOURCES[i];
    const jobs = results[i].status === 'fulfilled' ? results[i].value : [];
    if (source.requiresKeywordMatch === false) {
      allJobs.push(...jobs);
    } else {
      allJobs.push(...jobs.filter(job => {
        const text = `${job.title} ${job.company} ${(job.tags || []).join(' ')}`.toLowerCase();
        return JOB_KEYWORDS.some(kw => text.includes(kw.toLowerCase()));
      }));
    }
  }

  // Deduplicate by title similarity (first 40 chars)
  const seen = new Set();
  const unique = allJobs.filter(job => {
    const key = job.title.toLowerCase().slice(0, 40);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  unique.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  return unique.slice(0, 60);
}

// ===== FETCH SCHOLARSHIPS & OPPORTUNITIES =====
async function fetchScholarships() {
  const allOpps = [];
  const sources = [...SCHOLARSHIP_SOURCES, ...ELITE_SOURCES];

  for (const source of sources) {
    try {
      const res = await fetch(source.url, {
        headers: { 'User-Agent': 'OracleIntelligenceEngine/1.0' },
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) continue;
      const text = await res.text();

      // Parse RSS/XML
      const titles = extractFromXML(text, 'title');
      const links = extractFromXML(text, 'link');
      const descriptions = extractFromXML(text, 'description');
      const pubDates = extractFromXML(text, 'pubDate');

      // Skip first title/link (feed title)
      for (let i = 1; i < titles.length && i < 20; i++) {
        allOpps.push({
          title: decodeEntities(stripCDATA(titles[i] || '')),
          link: stripCDATA(links[i] || ''),
          summary: decodeEntities(stripHTML(stripCDATA(descriptions[i] || ''))).slice(0, 250),
          date: pubDates[i - 1] || '',
          source: source.name,
          focus: source.focus,
        });
      }
    } catch (e) {
      console.error(`[ORACLE] Failed to fetch from ${source.name}:`, e.message);
    }
  }

  // Compound filter: must match a LEVEL keyword (masters/phd) AND a TYPE keyword (scholarship/fully funded)
  // This eliminates internships, short courses, bachelor's programs, and generic news
  const filtered = allOpps.filter(opp => {
    const searchText = `${opp.title} ${opp.summary}`.toLowerCase();
    const hasLevel = SCHOLARSHIP_LEVEL_KEYWORDS.some(kw => searchText.includes(kw));
    const hasType = SCHOLARSHIP_TYPE_KEYWORDS.some(kw => searchText.includes(kw));
    return hasLevel && hasType;
  });

  // Deduplicate
  const seen = new Set();
  const unique = filtered.filter(opp => {
    const key = opp.title.toLowerCase().slice(0, 50);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Merge with curated list (always include top scholarships)
  const liveKeys = new Set(unique.map(o => o.title.toLowerCase().slice(0, 50)));
  const freshCurated = CURATED_SCHOLARSHIPS.filter(c => !liveKeys.has(c.title.toLowerCase().slice(0, 50)));
  const combined = [...unique, ...freshCurated];

  return combined; // No limit — show all available scholarships
}

// ===== FETCH BUSINESS GRANTS =====
async function fetchBusinessGrants() {
  const allGrants = [];

  for (const source of BUSINESS_GRANT_SOURCES) {
    try {
      const res = await fetch(source.url, {
        headers: { 'User-Agent': 'OracleIntelligenceEngine/1.0' },
        signal: AbortSignal.timeout(7000),
      });
      if (!res.ok) continue;
      const text = await res.text();

      const titles = extractFromXML(text, 'title');
      const links = extractFromXML(text, 'link');
      const descriptions = extractFromXML(text, 'description');
      const pubDates = extractFromXML(text, 'pubDate');

      for (let i = 1; i < titles.length && i < 15; i++) {
        allGrants.push({
          title: decodeEntities(stripCDATA(titles[i] || '')),
          link: stripCDATA(links[i] || ''),
          summary: decodeEntities(stripHTML(stripCDATA(descriptions[i] || ''))).slice(0, 250),
          date: pubDates[i - 1] || '',
          source: source.name,
          focus: source.focus,
        });
      }
    } catch (e) {
      console.error(`[ORACLE] Failed to fetch grants from ${source.name}:`, e.message);
    }
  }

  const filtered = allGrants.filter(g => {
    const text = `${g.title} ${g.summary}`.toLowerCase();
    return BUSINESS_GRANT_KEYWORDS.some(kw => text.includes(kw.toLowerCase()));
  });

  const seen = new Set();
  const unique = filtered.filter(g => {
    const key = g.title.toLowerCase().slice(0, 50);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Always merge with curated grants
  const liveKeys = new Set(unique.map(g => g.title.toLowerCase().slice(0, 50)));
  const freshCurated = CURATED_GRANTS.filter(c => !liveKeys.has(c.title.toLowerCase().slice(0, 50)));
  return [...unique, ...freshCurated].slice(0, 25);
}

// ===== FETCH NEWS/INTEL =====
async function fetchIntel() {
  const allIntel = [];

  for (const source of NEWS_SOURCES) {
    try {
      const res = await fetch(source.url, {
        headers: { 'User-Agent': 'OracleIntelligenceEngine/1.0' },
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) continue;
      const data = await res.json();

      const hits = data.hits || [];
      for (const hit of hits) {
        allIntel.push({
          title: hit.title || '',
          summary: hit.story_text ? stripHTML(hit.story_text).slice(0, 200) : `${hit.num_comments || 0} comments on Hacker News`,
          link: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
          hnLink: `https://news.ycombinator.com/item?id=${hit.objectID}`,
          points: hit.points || 0,
          date: hit.created_at || '',
          source: source.name,
          urgency: hit.points > 100 ? 'high' : hit.points > 30 ? 'medium' : 'low',
        });
      }
    } catch (e) {
      console.error(`[ORACLE] Failed to fetch intel from ${source.name}:`, e.message);
    }
  }

  // Deduplicate and sort by points
  const seen = new Set();
  const unique = allIntel.filter(item => {
    const key = item.title.toLowerCase().slice(0, 40);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  unique.sort((a, b) => b.points - a.points);
  return unique.slice(0, 8);
}

// ===== FETCH LATEST VIDEO =====
async function fetchVideo() {
  // Pick a random channel for variety
  const shuffled = [...VIDEO_CHANNELS].sort(() => Math.random() - 0.5);

  for (const channel of shuffled) {
    try {
      const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channel.id}`;
      const res = await fetch(rssUrl, {
        headers: { 'User-Agent': 'OracleIntelligenceEngine/1.0' },
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) continue;
      const text = await res.text();

      // Extract first video entry
      const entryMatch = text.match(/<entry>([\s\S]*?)<\/entry>/);
      if (!entryMatch) continue;

      const entry = entryMatch[1];
      const title = extractFromXML(entry, 'title')[0] || '';
      const videoIdMatch = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
      const videoId = videoIdMatch ? videoIdMatch[1] : '';
      const published = extractFromXML(entry, 'published')[0] || '';

      if (videoId) {
        return {
          title: stripCDATA(title),
          channel: channel.name,
          link: `https://www.youtube.com/watch?v=${videoId}`,
          thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
          date: published,
        };
      }
    } catch (e) {
      console.error(`[ORACLE] Failed to fetch video from ${channel.name}:`, e.message);
    }
  }

  return null;
}

// ===== GET CURATED CONTENT (Date-based rotation) =====
function getCuratedContent() {
  const now = new Date();
  const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
  const weekOfYear = Math.floor(dayOfYear / 7);
  const isMonday = now.getDay() === 1;

  const rainmaker = RAINMAKER_PROFILES[dayOfYear % RAINMAKER_PROFILES.length];
  const nightSchool = NIGHT_SCHOOL_CASES[dayOfYear % NIGHT_SCHOOL_CASES.length];
  const book = BOOK_ROTATION[weekOfYear % BOOK_ROTATION.length];

  return { rainmaker, nightSchool, book: isMonday ? book : book, isMonday };
}

// ===== MAIN API HANDLER =====
export async function GET() {
  try {
    const startTime = Date.now();

    // Fetch all data concurrently
    const [jobs, scholarships, grants, intel, video] = await Promise.allSettled([
      fetchJobs(),
      fetchScholarships(),
      fetchBusinessGrants(),
      fetchIntel(),
      fetchVideo(),
    ]);

    const curated = getCuratedContent();
    const elapsed = Date.now() - startTime;

    const briefing = {
      generatedAt: new Date().toISOString(),
      fetchTimeMs: elapsed,
      jobs: jobs.status === 'fulfilled' ? jobs.value : [],
      scholarships: scholarships.status === 'fulfilled' ? scholarships.value : CURATED_SCHOLARSHIPS,
      grants: grants.status === 'fulfilled' ? grants.value : CURATED_GRANTS,
      intel: intel.status === 'fulfilled' ? intel.value : [],
      video: video.status === 'fulfilled' ? video.value : null,
      book: curated.book,
      isMonday: curated.isMonday,
      rainmaker: curated.rainmaker,
      nightSchool: curated.nightSchool,
      network: POWER_NETWORK,
    };

    // Save to Supabase if configured
    try {
      const { supabase } = await import('../../lib/supabase');
      if (supabase) {
        await supabase.from('briefings').insert({
          generated_at: briefing.generatedAt,
          fetch_time_ms: briefing.fetchTimeMs,
          jobs: briefing.jobs,
          scholarships: briefing.scholarships,
          grants: briefing.grants,
          intel: briefing.intel,
          video: briefing.video,
          book: briefing.book,
          rainmaker: briefing.rainmaker,
          night_school: briefing.nightSchool,
          is_monday: briefing.isMonday,
        });
      }
    } catch (dbErr) {
      console.error('[ORACLE] Supabase save failed (non-critical):', dbErr.message);
    }

    return Response.json(briefing, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (error) {
    console.error('[ORACLE] Critical generation error:', error);
    return Response.json(
      { error: 'Intelligence generation failed', message: error.message },
      { status: 500 }
    );
  }
}

