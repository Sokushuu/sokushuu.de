# Dynamic OG Tags Implementation Plan

## Overview

This document outlines the technical implementation plan for adding dynamic Open Graph (OG) metadata to Sokushuu lesson collection pages using Cloudflare Workers. This solution allows us to serve dynamic meta tags to social media crawlers while maintaining our current React + Vite architecture.

## Problem Statement

### Current Issue
- React + Vite SPAs cannot dynamically change meta tags for social media crawlers
- Social media bots (Facebook, Twitter, LinkedIn) don't execute JavaScript
- All lesson pages currently share the same generic OG metadata
- Sharing `/lesson/defi-basics` shows the same preview as the landing page

### Requirements
- ✅ Dynamic OG titles per lesson (e.g., "DeFi Fundamentals | Sokushuu")
- ✅ Dynamic OG descriptions using lesson descriptions
- ✅ Custom OG images per lesson (future enhancement)
- ✅ Maintain current React app performance for users
- ✅ Work with all social media platforms
- ✅ Minimal infrastructure changes

## Solution: Cloudflare Workers

### Why Cloudflare Workers?
- **Edge Computing**: Runs at Cloudflare edge locations worldwide
- **No Backend Required**: No need for additional server infrastructure
- **Fast Response**: Sub-millisecond response times
- **Cost Effective**: Very generous free tier (100,000 requests/day)
- **Easy Integration**: Works with existing hosting setup
- **Bot Detection**: Can differentiate between crawlers and regular users

### Architecture Overview

```
User/Crawler Request
        ↓
Cloudflare Worker (Edge)
        ↓
Is it a lesson URL? (/lesson/*)
        ↓
    Yes ─→ Modify HTML with lesson metadata → Return to User/Crawler
        ↓
    No ──→ Proxy to origin server → Return original response
```

## Technical Implementation

### 1. Cloudflare Worker Code Structure

```typescript
// worker.ts
export interface Env {
  // Environment variables will be defined here
}

interface LessonData {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  author: string;
  thumbnail: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    
    // Check if this is a lesson collection page
    const lessonMatch = url.pathname.match(/^\/lesson\/([^\/]+)$/);
    
    if (lessonMatch && isBot(request)) {
      return handleLessonPage(request, lessonMatch[1], env);
    }
    
    // For all other requests, proxy to origin
    return fetch(request);
  }
};

// Bot detection function
function isBot(request: Request): boolean {
  const userAgent = request.headers.get('User-Agent')?.toLowerCase() || '';
  const botPatterns = [
    'facebookexternalhit',
    'twitterbot',
    'linkedinbot',
    'whatsapp',
    'telegrambot',
    'slackbot',
    'discordbot',
    'googlebot',
    'bingbot'
  ];
  
  return botPatterns.some(pattern => userAgent.includes(pattern));
}

// Handle lesson page requests
async function handleLessonPage(
  request: Request, 
  lessonId: string, 
  env: Env
): Promise<Response> {
  try {
    // Fetch the original HTML
    const response = await fetch(request);
    let html = await response.text();
    
    // Get lesson data
    const lesson = await getLessonData(lessonId, env);
    
    if (!lesson) {
      // If lesson not found, return original HTML
      return new Response(html, {
        headers: { ...response.headers, 'Content-Type': 'text/html' }
      });
    }
    
    // Modify HTML with lesson-specific metadata
    html = injectLessonMetadata(html, lesson);
    
    return new Response(html, {
      headers: { ...response.headers, 'Content-Type': 'text/html' }
    });
    
  } catch (error) {
    console.error('Error processing lesson page:', error);
    // Fallback to original request
    return fetch(request);
  }
}

// Get lesson data (multiple options)
async function getLessonData(lessonId: string, env: Env): Promise<LessonData | null> {
  // Option 1: Fetch from your existing API
  // const response = await fetch(`${env.API_BASE_URL}/lessons/${lessonId}`);
  // return response.json();
  
  // Option 2: Use static data stored in Worker
  const lessons: Record<string, LessonData> = {
    'defi-basics': {
      id: 'defi-basics',
      title: 'DeFi Fundamentals',
      description: 'Learn the core concepts of Decentralized Finance and how it\'s revolutionizing traditional banking',
      category: 'DeFi',
      difficulty: 'Beginner',
      author: 'Sokushuu Team',
      thumbnail: '🏦'
    },
    'web3-wallet-basics': {
      id: 'web3-wallet-basics',
      title: 'Web3 Wallet Essentials', 
      description: 'Master the fundamentals of Web3 wallets, from setup to security best practices',
      category: 'Wallets',
      difficulty: 'Beginner',
      author: 'Sokushuu Team',
      thumbnail: '👛'
    },
    'smart-contracts-intro': {
      id: 'smart-contracts-intro',
      title: 'Smart Contracts 101',
      description: 'Understanding smart contracts: the building blocks of decentralized applications',
      category: 'Smart Contracts',
      difficulty: 'Intermediate', 
      author: 'Sokushuu Team',
      thumbnail: '📜'
    }
    // Add more lessons as needed
  };
  
  return lessons[lessonId] || null;
}

// Inject lesson metadata into HTML
function injectLessonMetadata(html: string, lesson: LessonData): string {
  // Update page title
  html = html.replace(
    /<title>([^<]*)<\/title>/i,
    `<title>${lesson.title} | Sokushuu - Learn Web3</title>`
  );
  
  // Update or inject OG meta tags
  const ogTags = [
    { property: 'og:title', content: `${lesson.title} | Sokushuu` },
    { property: 'og:description', content: lesson.description },
    { property: 'og:type', content: 'article' },
    { property: 'og:site_name', content: 'Sokushuu' },
    // For now, use the same image as landing page
    // TODO: Generate dynamic images per lesson
    { property: 'og:image', content: 'https://launchpad-dev-r2.sokushuu.de/og_image%20(1).png' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' }
  ];
  
  // Update Twitter Card meta tags
  const twitterTags = [
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@sokushuu_de' },
    { name: 'twitter:title', content: `${lesson.title} | Sokushuu` },
    { name: 'twitter:description', content: lesson.description },
    { name: 'twitter:image', content: 'https://launchpad-dev-r2.sokushuu.de/og_image%20(1).png' }
  ];
  
  // Additional meta tags
  const additionalTags = [
    { name: 'description', content: lesson.description },
    { name: 'keywords', content: `Web3, ${lesson.category}, Learning, Education, ${lesson.difficulty}` },
    { name: 'author', content: lesson.author }
  ];
  
  // Apply all meta tag updates
  [...ogTags, ...twitterTags, ...additionalTags].forEach(tag => {
    if (tag.property) {
      html = updateMetaTag(html, tag.property, tag.content, true);
    } else {
      html = updateMetaTag(html, tag.name, tag.content, false);
    }
  });
  
  return html;
}

// Update or create meta tags in HTML
function updateMetaTag(html: string, name: string, content: string, isProperty: boolean): string {
  const attribute = isProperty ? 'property' : 'name';
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`<meta\\s+${attribute}=["']${escapedName}["'][^>]*>`, 'i');
  
  const newTag = `<meta ${attribute}="${name}" content="${content}">`;
  
  if (regex.test(html)) {
    // Update existing tag
    return html.replace(regex, newTag);
  } else {
    // Add new tag to head
    return html.replace('</head>', `  ${newTag}\n  </head>`);
  }
}
```

### 2. Project Structure

```
sokushuu-og-worker/
├── src/
│   ├── worker.ts           # Main worker logic
│   ├── lesson-data.ts      # Lesson data definitions
│   ├── html-processor.ts   # HTML manipulation functions
│   └── bot-detector.ts     # Bot detection utilities
├── wrangler.toml          # Cloudflare Worker configuration
├── package.json           # Dependencies
└── README.md             # Setup instructions
```

### 3. Wrangler Configuration

```toml
# wrangler.toml
name = "sokushuu-og-worker"
main = "src/worker.ts"
compatibility_date = "2024-01-15"

[env.production]
name = "sokushuu-og-worker"
routes = [
  { pattern = "sokushuu.de/lesson/*", zone_name = "sokushuu.de" },
  { pattern = "www.sokushuu.de/lesson/*", zone_name = "sokushuu.de" }
]

[env.staging]
name = "sokushuu-og-worker-staging"
routes = [
  { pattern = "staging.sokushuu.de/lesson/*", zone_name = "sokushuu.de" }
]

# Environment variables (set via Wrangler CLI)
[vars]
# API_BASE_URL = "https://api.sokushuu.de"
```

## Implementation Steps

### Phase 1: Setup & Development (1-2 days)

1. **Initialize Cloudflare Worker Project**
   ```bash
   npm create cloudflare@latest sokushuu-og-worker
   cd sokushuu-og-worker
   npm install
   ```

2. **Configure Wrangler**
   - Update `wrangler.toml` with Sokushuu domain
   - Set up environment variables

3. **Implement Core Logic**
   - Bot detection
   - Lesson data fetching
   - HTML meta tag injection

4. **Local Development & Testing**
   ```bash
   npm run dev
   # Test with: http://localhost:8787/lesson/defi-basics
   ```

### Phase 2: Testing & Validation (1 day)

1. **Test Bot Detection**
   ```bash
   # Test with different User-Agent headers
   curl -H "User-Agent: facebookexternalhit/1.1" http://localhost:8787/lesson/defi-basics
   curl -H "User-Agent: Twitterbot/1.0" http://localhost:8787/lesson/defi-basics
   ```

2. **Validate Meta Tags**
   - Use Facebook Debugger: https://developers.facebook.com/tools/debug/
   - Use Twitter Card Validator: https://cards-dev.twitter.com/validator
   - Test with LinkedIn Post Inspector

3. **Performance Testing**
   - Measure response times
   - Test with high traffic simulation

### Phase 3: Deployment (1 day)

1. **Deploy to Staging**
   ```bash
   npm run deploy:staging
   ```

2. **Configure DNS Routes**
   - Add route patterns in Cloudflare dashboard
   - Test staging environment

3. **Production Deployment**
   ```bash
   npm run deploy:production
   ```

4. **Monitor & Verify**
   - Check Cloudflare Worker analytics
   - Verify social media previews

## Advanced Features (Future Enhancements)

### 1. Dynamic OG Image Generation

```typescript
// Generate custom OG images per lesson
async function generateLessonOGImage(lesson: LessonData): Promise<string> {
  // Option 1: Use Cloudflare Images API
  // Option 2: Use external service like Bannerbear or Placid
  // Option 3: Canvas-based generation in Worker
  
  const imageUrl = `https://og-images.sokushuu.de/lesson/${lesson.id}.png`;
  return imageUrl;
}
```

### 2. A/B Testing for OG Content

```typescript
// Test different OG descriptions or images
function getOGVariant(lessonId: string, userAgent: string): 'control' | 'variant' {
  // Implement A/B testing logic
  return Math.random() > 0.5 ? 'control' : 'variant';
}
```

### 3. Analytics Integration

```typescript
// Track social media crawler visits
async function trackCrawlerVisit(lessonId: string, platform: string, env: Env) {
  await fetch(`${env.ANALYTICS_ENDPOINT}/crawler-visit`, {
    method: 'POST',
    body: JSON.stringify({ lessonId, platform, timestamp: Date.now() })
  });
}
```

## Monitoring & Maintenance

### 1. Key Metrics to Monitor
- **Worker Invocations**: Total requests handled
- **Response Times**: P95 latency for lesson pages
- **Error Rates**: Failed requests percentage
- **Bot Traffic**: Crawler vs. regular user ratio

### 2. Cloudflare Dashboard
- Monitor via Cloudflare Workers Analytics
- Set up alerts for high error rates
- Track CPU time and memory usage

### 3. Social Media Validation
- Weekly checks of Facebook Debugger
- Monitor Twitter Card previews
- Test LinkedIn post previews

## Cost Analysis

### Cloudflare Workers Pricing
- **Free Tier**: 100,000 requests/day
- **Paid Tier**: $5/month for 10M requests + $0.50 per additional million
- **Estimated Cost**: Likely under free tier for current traffic

### Expected Traffic
- **Lesson Page Views**: ~1,000/day (estimated)
- **Bot Requests**: ~10-20% of total traffic
- **Worker Invocations**: ~200-300/day for bots only

## Risk Assessment & Mitigation

### Risks
1. **Worker Failures**: Could break lesson page sharing
2. **Performance Impact**: Additional latency for bot requests
3. **Maintenance Overhead**: Need to keep lesson data in sync

### Mitigation Strategies
1. **Graceful Fallbacks**: Always proxy to origin on errors
2. **Performance Optimization**: Cache lesson data, optimize HTML parsing
3. **Automated Sync**: Script to update lesson data from main application

## Success Criteria

### Technical Success
- ✅ Sub-100ms response times for Worker processing
- ✅ 99.9% uptime for Worker functionality
- ✅ Zero impact on regular user experience

### Business Success
- ✅ Dynamic OG titles visible in social media previews
- ✅ Improved click-through rates from social media
- ✅ Better lesson page sharing engagement

## Next Steps

1. **Get Approval**: Review this plan with the team
2. **Set Up Development Environment**: Initialize Worker project
3. **Implement MVP**: Basic meta tag injection for lesson pages
4. **Test & Validate**: Ensure social media crawlers see correct metadata
5. **Deploy & Monitor**: Roll out to production with monitoring

---

**Note**: This implementation provides a robust, scalable solution for dynamic OG metadata without requiring changes to the existing React application architecture.