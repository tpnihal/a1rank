import { CATEGORY_LABELS, type AuditResult, type CategoryKey, type Issue, type Strategy } from "./types";

/** Plain-English next steps for the audits that come up most often. Others fall back to Lighthouse's own description. */
const ACTIONS: Record<string, string> = {
  "render-blocking-resources": "Load non-essential CSS and JavaScript after the first view so the page appears sooner.",
  "render-blocking-insight": "Load non-essential CSS and JavaScript after the first view so the page appears sooner.",
  "unused-javascript": "Remove scripts and plugins the page does not need, and load the rest only where they are used.",
  "unused-css-rules": "Remove unused styles, often left behind by themes and page builders.",
  "uses-optimized-images": "Compress images before uploading. Most can be far smaller with no visible change.",
  "modern-image-formats": "Serve images as WebP or AVIF, which are much smaller than JPEG and PNG.",
  "image-delivery-insight": "Resize and compress images, and serve them as WebP or AVIF.",
  "uses-responsive-images": "Serve smaller image sizes to phones so they do not download desktop-sized files.",
  "offscreen-images": "Lazy-load images that are below the first screen.",
  "unminified-javascript": "Minify JavaScript files to reduce their size.",
  "unminified-css": "Minify CSS files to reduce their size.",
  "uses-text-compression": "Turn on Gzip or Brotli compression on the server.",
  "server-response-time": "Speed up the server response with better hosting, caching or a content delivery network.",
  "document-latency-insight": "Speed up the first server response with caching, compression and faster hosting.",
  "uses-long-cache-ttl": "Set longer cache lifetimes for images, fonts and scripts so repeat visits load faster.",
  "cache-insight": "Set longer cache lifetimes for images, fonts and scripts so repeat visits load faster.",
  "total-byte-weight": "Reduce the overall page size, starting with the largest images, videos and scripts.",
  "dom-size": "Simplify the page structure. Very large pages are slower to render and respond.",
  "dom-size-insight": "Simplify the page structure. Very large pages are slower to render and respond.",
  "bootup-time": "Reduce the amount of JavaScript that runs when the page loads.",
  "mainthread-work-breakdown": "Reduce heavy scripts so the page responds faster to taps and clicks.",
  "third-party-summary": "Review third-party scripts such as chat widgets, trackers and embeds, and remove any you do not use.",
  "third-parties-insight": "Review third-party scripts such as chat widgets, trackers and embeds, and remove any you do not use.",
  "font-display": "Show text immediately with a fallback font while web fonts load.",
  "font-display-insight": "Show text immediately with a fallback font while web fonts load.",
  "unsized-images": "Set width and height on images so the layout does not jump while loading.",
  "layout-shifts": "Reserve space for images, ads and embeds so content does not move as the page loads.",
  "cls-culprits-insight": "Reserve space for images, ads and embeds so content does not move as the page loads.",
  "largest-contentful-paint-element": "Make the main image or heading load first: compress it, preload it and avoid lazy-loading it.",
  "lcp-discovery-insight": "Make the main image load first: preload it and do not lazy-load it.",
  "lcp-lazy-loaded": "Do not lazy-load the main image at the top of the page.",
  "redirects": "Remove unnecessary redirects so visitors reach the page in one step.",
  "meta-description": "Add a unique meta description to the page so search results show a clear summary.",
  "document-title": "Add a descriptive page title. It is the headline people see in search results.",
  "link-text": "Use descriptive link text in place of phrases like 'click here'.",
  "crawlable-anchors": "Make sure links use real addresses so search engines can follow them.",
  "is-crawlable": "The page is blocked from search engines. Remove the noindex setting if it should appear on Google.",
  "robots-txt": "Fix the robots.txt file so search engines can read it.",
  "hreflang": "Correct the hreflang tags so each language version points to the right page.",
  "canonical": "Set a valid canonical address so search engines know which version of the page to index.",
  "http-status-code": "The page returns an error status. Fix it so search engines can index the page.",
  "image-alt": "Add alt text to images so screen readers and search engines can understand them.",
  "color-contrast": "Increase the contrast between text and background so it is easier to read.",
  "label": "Add labels to form fields so everyone can tell what to enter.",
  "button-name": "Give every button an accessible name that says what it does.",
  "link-name": "Give every link readable text or a label.",
  "html-has-lang": "Declare the page language so browsers and screen readers handle it correctly.",
  "heading-order": "Use headings in order (H1, then H2, then H3) without skipping levels.",
  "target-size": "Make buttons and links large enough and far enough apart to tap easily on a phone.",
  "meta-viewport": "Allow users to zoom the page on mobile.",
  "viewport": "Add a mobile viewport tag so the page fits phone screens.",
  "tap-targets": "Make buttons and links large enough and far enough apart to tap easily on a phone.",
  "is-on-https": "Serve every page and file over HTTPS.",
  "errors-in-console": "Fix the errors the browser reports when the page loads.",
  "deprecations": "Replace outdated browser features the site still relies on.",
  "image-aspect-ratio": "Display images at their correct proportions so they are not stretched.",
  "image-size-responsive": "Serve higher-resolution images so they look sharp on modern screens.",
  "third-party-cookies": "Reduce reliance on third-party cookies, which browsers are restricting.",
  "inspector-issues": "Fix the issues the browser reports for this page.",
  "csp-xss": "Add a Content Security Policy to protect visitors from injected scripts.",
  "valid-source-maps": "Provide valid source maps for the site's main scripts.",
};

export type Recommendation = {
  id: string;
  title: string;
  action: string;
  category: CategoryKey;
  categoryLabel: string;
  priority: "High" | "Medium";
  strategies: Strategy[];
  savingsMs?: number;
};

const firstSentence = (s: string) => s.split(/(?<=\.)\s/)[0] || s;

/** Picks the fixes worth doing first, from the audits that actually failed. */
export function buildRecommendations(results: AuditResult[], perCategory = 3): Recommendation[] {
  const merged = new Map<string, { issue: Issue; strategies: Strategy[] }>();
  for (const r of results) {
    for (const issue of r.issues) {
      const hit = merged.get(issue.id);
      if (!hit) merged.set(issue.id, { issue, strategies: [r.strategy] });
      else {
        if (!hit.strategies.includes(r.strategy)) hit.strategies.push(r.strategy);
        if (issue.score < hit.issue.score || (issue.savingsMs ?? 0) > (hit.issue.savingsMs ?? 0)) hit.issue = issue;
      }
    }
  }
  const out: Recommendation[] = [];
  for (const category of Object.keys(CATEGORY_LABELS) as CategoryKey[]) {
    const list = [...merged.values()].filter((m) => m.issue.category === category);
    list.sort((a, b) => (b.issue.savingsMs ?? 0) - (a.issue.savingsMs ?? 0) || a.issue.score - b.issue.score);
    for (const { issue, strategies } of list.slice(0, perCategory)) {
      out.push({
        id: issue.id,
        title: issue.title,
        action: ACTIONS[issue.id] ?? firstSentence(issue.description),
        category,
        categoryLabel: CATEGORY_LABELS[category],
        priority: category !== "bestPractices" && (issue.score < 50 || (issue.savingsMs ?? 0) >= 1000) ? "High" : "Medium",
        strategies,
        savingsMs: issue.savingsMs,
      });
    }
  }
  return out.sort((a, b) => (a.priority === b.priority ? 0 : a.priority === "High" ? -1 : 1));
}

/** Average of every category score returned, across the runs given. Null when there are none. */
export function overallScore(results: AuditResult[]): number | null {
  const all = results.flatMap((r) => Object.values(r.scores)).filter((n): n is number => typeof n === "number");
  return all.length ? Math.round(all.reduce((a, b) => a + b, 0) / all.length) : null;
}
