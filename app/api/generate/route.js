// ============================================
// ORACLE FETCH ENGINE — Pure Web Scraping
// No LLM. No paid APIs. Just raw data extraction.
// ============================================

import {
  JOB_SOURCES, JOB_KEYWORDS,
  SCHOLARSHIP_SOURCES, SCHOLARSHIP_KEYWORDS, ELITE_SOURCES,
  CURATED_SCHOLARSHIPS,
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

// ===== FETCH JOBS =====
async function fetchJobs() {
  const allJobs = [];

  for (const source of JOB_SOURCES) {
    try {
      const res = await fetch(source.url, {
        headers: { 'User-Agent': 'OracleIntelligenceEngine/1.0' },
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) continue;
      const data = await res.json();

      if (source.name === 'RemoteOK') {
        // RemoteOK returns array, first item is legal notice
        const jobs = Array.isArray(data) ? data.slice(1) : [];
        for (const job of jobs) {
          allJobs.push({
            title: decodeEntities(job.position || job.title || ''),
            company: job.company || 'Unknown',
            location: job.location || 'Remote',
            salary: job.salary || '',
            link: job.url || job.apply_url || `https://remoteok.com/remote-jobs/${job.slug || ''}`,
            tags: job.tags || [],
            source: 'RemoteOK',
            date: job.date || '',
            type: 'remote',
          });
        }
      } else if (source.name === 'Remotive') {
        const jobs = data.jobs || [];
        for (const job of jobs) {
          allJobs.push({
            title: decodeEntities(job.title || ''),
            company: job.company_name || 'Unknown',
            location: job.candidate_required_location || 'Remote',
            salary: job.salary || '',
            link: job.url || '',
            tags: [job.category || ''],
            source: 'Remotive',
            date: job.publication_date || '',
            type: 'remote',
          });
        }
      } else if (source.name === 'Arbeitnow') {
        const jobs = data.data || [];
        for (const job of jobs) {
          allJobs.push({
            title: decodeEntities(job.title || ''),
            company: job.company_name || 'Unknown',
            location: job.location || 'Remote',
            salary: job.salary || '',
            link: job.url || '',
            tags: job.tags || [],
            source: 'Arbeitnow',
            date: job.created_at || '',
            type: job.remote ? 'remote' : 'visa',
          });
        }
      }
    } catch (e) {
      console.error(`[ORACLE] Failed to fetch jobs from ${source.name}:`, e.message);
    }
  }

  // Filter by keywords
  const filtered = allJobs.filter(job => {
    const searchText = `${job.title} ${job.company} ${job.tags.join(' ')}`.toLowerCase();
    return JOB_KEYWORDS.some(kw => searchText.includes(kw.toLowerCase()));
  });

  // Deduplicate by title similarity
  const seen = new Set();
  const unique = filtered.filter(job => {
    const key = job.title.toLowerCase().slice(0, 40);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return unique.slice(0, 20);
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

  // Filter by scholarship keywords
  const filtered = allOpps.filter(opp => {
    const searchText = `${opp.title} ${opp.summary}`.toLowerCase();
    return SCHOLARSHIP_KEYWORDS.some(kw => searchText.includes(kw.toLowerCase()));
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

