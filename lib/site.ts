export const SITE = {
  name: "A1 Rank",
  tagline: "Grow smarter. Rank higher.",
  description:
    "A1 Rank is a Dubai digital marketing agency for social media, SEO, websites, Meta and Google Ads, creative production and AI automation.",
  url: "https://www.a1rank.com",
  domain: "www.a1rank.com",
  email: "admin@a1rank.com",
  instagram: "@a1rank.co",
  instagramUrl: "https://www.instagram.com/a1rank.co/",
  location: "Dubai, UAE",
} as const;

export const NAV = [
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Our Works", href: "/works" },
  { label: "Industries", href: "/industries" },
  { label: "Blogs", href: "/blog" },
] as const;

export type IconKey =
  | "strategy"
  | "social"
  | "brand"
  | "web"
  | "seo"
  | "ads"
  | "camera"
  | "video"
  | "bot"
  | "chart";

export type Service = {
  slug: string;
  /** Placeholder stock photo (Unsplash). Replace with A1 Rank imagery. */
  image: string;
  menuTitle: string;
  menuLine: string;
  label: string;
  title: string;
  blurb: string;
  icon: IconKey;
  /** Bento size on large screens */
  span: "wide" | "base";
};

export const SERVICES: Service[] = [
  {
    slug: "digital-marketing-strategy",
    image: "/images/stock/strategy-desk.jpg",
    menuTitle: "Strategy & Growth",
    menuLine: "A 90-day plan tied to leads and sales",
    label: "Strategy",
    title: "Digital Marketing Strategy & Growth",
    blurb: "Market and competitor research, funnel planning and a 90-day roadmap tied to leads and sales.",
    icon: "strategy",
    span: "wide",
  },
  {
    slug: "social-media-management",
    image: "/images/stock/team-desk.jpg",
    menuTitle: "Social Media Management",
    menuLine: "Content, reels and community, every month",
    label: "Social",
    title: "Social Media Management",
    blurb: "Instagram, Facebook and LinkedIn: content calendars, posting and community replies.",
    icon: "social",
    span: "base",
  },
  {
    slug: "graphic-design-branding",
    image: "/images/stock/brand-swatches.jpg",
    menuTitle: "Branding & Graphic Design",
    menuLine: "An identity people recognise instantly",
    label: "Design",
    title: "Premium Graphic Design & Branding",
    blurb: "Logos, brand guidelines, social templates, brochures and packaging.",
    icon: "brand",
    span: "base",
  },
  {
    slug: "website-design-development",
    image: "/images/stock/code-laptop.jpg",
    menuTitle: "Website Design & Development",
    menuLine: "Fast sites built to bring enquiries in",
    label: "Web",
    title: "Website Design & Development",
    blurb: "Fast, mobile-first websites and online stores built to turn visitors into enquiries.",
    icon: "web",
    span: "base",
  },
  {
    slug: "seo-google-business-profile",
    image: "/images/stock/search-analytics.jpg",
    menuTitle: "SEO & Google Business Profile",
    menuLine: "Get found on Search, Maps and AI answers",
    label: "Search",
    title: "SEO & Google Business Profile",
    blurb: "Technical and on-page SEO, local map rankings, reviews and visibility in AI search answers.",
    icon: "seo",
    span: "base",
  },
  {
    slug: "meta-google-ads",
    image: "/images/stock/dashboard-laptop.jpg",
    menuTitle: "Meta Ads & Google Ads",
    menuLine: "Campaigns managed for cost per lead",
    label: "Ads",
    title: "Meta Ads & Google Ads",
    blurb: "Campaign setup, creative testing and daily optimisation for a lower cost per lead.",
    icon: "ads",
    span: "base",
  },
  {
    slug: "photography-videography",
    image: "/images/stock/photographer.jpg",
    menuTitle: "Photography & Videography",
    menuLine: "Real shoots across Dubai",
    label: "Production",
    title: "Photography & Videography",
    blurb: "Product, food, property and team shoots across Dubai, edited for every platform.",
    icon: "camera",
    span: "base",
  },
  {
    slug: "ai-video-creative-content",
    image: "/images/stock/video-editing.jpg",
    menuTitle: "AI Video & Creative Content",
    menuLine: "More video, made faster",
    label: "AI Video",
    title: "AI Video & Creative Content",
    blurb: "Reels, ad creatives and AI-generated video produced quickly without losing the craft.",
    icon: "video",
    span: "base",
  },
  {
    slug: "ai-agents-automation",
    image: "/images/stock/ai-robot.jpg",
    menuTitle: "AI Agents & Automation",
    menuLine: "Reply in seconds, follow up automatically",
    label: "Automation",
    title: "AI Agents & Business Automation",
    blurb: "Chat agents, lead routing and n8n workflows that answer customers and save hours every week.",
    icon: "bot",
    span: "wide",
  },
  {
    slug: "analytics-reporting-lead-generation",
    image: "/images/stock/dashboard-dark.jpg",
    menuTitle: "Analytics & Lead Generation",
    menuLine: "Know where every lead came from",
    label: "Data",
    title: "Analytics, Reporting & Lead Generation",
    blurb: "GA4, pixel and conversion tracking with a monthly report you can actually read.",
    icon: "chart",
    span: "base",
  },
];

export const TOOLS = ["ChatGPT", "Claude", "Gemini Pro", "Canva AI", "CapCut", "n8n", "WordPress", "Meta Ads", "Google Ads", "GA4"];

export type PackageSlug = "go" | "pro" | "pro-max" | "grox";

export type Package = {
  slug: PackageSlug;
  name: string;
  price: number;
  from?: boolean;
  audience: string;
  badge?: string;
  inherits?: string;
  inclusions: string[];
  cta: string;
};

/** Official A1 Rank packages. All have a 3-month minimum. Ad spend is paid to the platforms and is not included. */
export const PACKAGES: Package[] = [
  {
    slug: "go",
    name: "GO",
    price: 999,
    audience: "For startups and small shops getting a professional presence online.",
    inclusions: [
      "1 social platform, 12 designed posts / month",
      "Google Business Profile setup & 4 posts",
      "Basic SEO audit and fixes",
      "Brand kit: logo touch-up and templates",
      "Monthly performance report",
    ],
    cta: "Choose GO",
  },
  {
    slug: "pro",
    name: "Pro",
    price: 2999,
    audience: "For growing businesses that want steady leads every month.",
    inherits: "Everything in GO, plus",
    inclusions: [
      "2 platforms, 16 posts + 4 reels",
      "Meta Ads management (2 campaigns)",
      "On-page SEO for 10 keywords",
      "1 conversion landing page",
      "Lead tracking with GA4 & pixel",
    ],
    cta: "Choose Pro",
  },
  {
    slug: "pro-max",
    name: "Pro Max",
    price: 4999,
    audience: "For brands ready to lead their category across search and social.",
    badge: "Most popular",
    inherits: "Everything in Pro, plus",
    inclusions: [
      "3 platforms, 20 posts + 8 reels",
      "Meta + Google Ads, up to 4 campaigns",
      "SEO for 25 keywords + 2 blogs / month",
      "WordPress website (up to 8 pages) or revamp",
      "Monthly photo/video shoot in Dubai",
      "AI WhatsApp chat assistant",
    ],
    cta: "Choose Pro Max",
  },
  {
    slug: "grox",
    name: "Grox",
    price: 8999,
    from: true,
    audience: "Your full growth team: custom scope, AI automation and weekly reporting.",
    badge: "Full growth team",
    inherits: "Everything in Pro Max, plus",
    inclusions: [
      "Dedicated strategist & creative director",
      "Unlimited ad campaigns & creative tests",
      "AI agents + n8n automations with CRM",
      "AI video production (8 videos / month)",
      "E-commerce or multi-language website",
      "Weekly reporting & strategy call",
    ],
    cta: "Talk to us",
  },
];

export const PACKAGE_MINIMUM = "3-month minimum";

export function packageBySlug(slug?: string | null): Package | undefined {
  if (!slug) return undefined;
  const key = slug.toLowerCase().replace(/\s+/g, "-");
  return PACKAGES.find((p) => p.slug === key);
}

export const formatAed = (n: number) => n.toLocaleString("en-US");

export type WebsitePlan = {
  slug: string;
  name: string;
  /** Short line under the name, e.g. "Landing page". */
  kind: string;
  /** One-time project price in AED. */
  price: number;
  from?: boolean;
  priceNote: string;
  audience: string;
  badge?: string;
  inclusions: string[];
  cta: string;
};

/** One-time website project prices (not monthly). Prices and page counts are set by A1 Rank; inclusions are drafts to confirm. */
export const WEBSITE_PLANS: WebsitePlan[] = [
  {
    slug: "launch",
    name: "Launch",
    kind: "Landing page",
    price: 699,
    priceNote: "One-time",
    audience: "For startups and new businesses that need a modern, SEO-friendly page online.",
    inclusions: [
      "1 modern landing page, designed mobile-first",
      "SEO-friendly structure, titles and descriptions",
      "WhatsApp, call and enquiry buttons",
      "Enquiry form sent to your email",
      "Google Analytics and Search Console setup",
    ],
    cta: "Start with Launch",
  },
  {
    slug: "business",
    name: "Business",
    kind: "3 to 5 pages",
    price: 1299,
    priceNote: "One-time",
    audience: "A fast, stunning business website. Our recommended plan for most businesses.",
    badge: "Recommended",
    inclusions: [
      "3 to 5 pages: Home, About, Services, Contact and more",
      "Custom modern design in your brand colours",
      "Fast loading on mobile and desktop",
      "On-page SEO on every page",
      "Google Maps and Business Profile link",
      "WhatsApp chat button and enquiry form",
    ],
    cta: "Choose Business",
  },
  {
    slug: "seo-pro",
    name: "SEO Pro",
    kind: "Up to 20 pages",
    price: 1999,
    priceNote: "One-time",
    audience: "A multi-level, SEO-integrated website with room for every service you offer.",
    inclusions: [
      "Up to 20 pages with multi-level menus",
      "Separate pages for each service or location",
      "Integrated SEO: keyword mapping, schema and sitemap",
      "Blog section ready for regular articles",
      "Gallery, enquiry forms, WhatsApp chat and more",
      "Analytics and conversion tracking",
    ],
    cta: "Choose SEO Pro",
  },
  {
    slug: "ecommerce",
    name: "Ecommerce",
    kind: "Online store",
    price: 2999,
    from: true,
    priceNote: "One-time · plus custom features",
    audience: "A complete online store. The final price depends on the custom features you need.",
    inclusions: [
      "Product catalogue with categories, filters and search",
      "Cart, checkout and payment gateway integration",
      "Order and stock management dashboard",
      "Shipping and VAT settings",
      "SEO-ready product and category pages",
      "Custom features quoted to your needs",
    ],
    cta: "Plan my store",
  },
];

export function websitePlanBySlug(slug?: string | null) {
  if (!slug) return undefined;
  const key = slug.toLowerCase().replace(/\s+/g, "-");
  return WEBSITE_PLANS.find((p) => p.slug === key);
}

export type WorkCategory = "Websites" | "Social Media" | "SEO" | "Ads" | "AI Automation" | "Branding";

export type Work = {
  title: string;
  sector: string;
  category: WorkCategory;
  summary: string;
  tags: string[];
  /** Placeholder stock photo (Unsplash). Replace with the real project screenshot. */
  image: string;
};

/**
 * Placeholder showcases with stock photos that demonstrate the layout.
 * Replace with real A1 Rank client projects (name, screenshots, results) before launch.
 */
export const WORKS: Work[] = [
  {
    title: "Property showcase website",
    sector: "Real estate · Dubai",
    category: "Websites",
    summary: "Listing search, enquiry buttons on every property and Arabic / English pages.",
    tags: ["Website", "Lead capture"],
    image: "/images/stock/dubai-skyline.jpg",
  },
  {
    title: "Restaurant launch campaign",
    sector: "Food & beverage · Dubai",
    category: "Social Media",
    summary: "Reels, food photography and a content calendar built around opening month.",
    tags: ["Instagram", "Reels"],
    image: "/images/stock/restaurant-dining.jpg",
  },
  {
    title: "Clinic local search programme",
    sector: "Healthcare · UAE",
    category: "SEO",
    summary: "Google Business Profile, service pages and reviews tuned for near-me searches.",
    tags: ["Local SEO", "Google Business Profile"],
    image: "/images/stock/dental-clinic.jpg",
  },
  {
    title: "Enquiry assistant on WhatsApp",
    sector: "Services · UAE",
    category: "AI Automation",
    summary: "An AI agent that answers questions, qualifies leads and books calls through n8n.",
    tags: ["AI agent", "n8n"],
    image: "/images/stock/ai-robot.jpg",
  },
  {
    title: "Studio brand identity",
    sector: "Fitness · Dubai",
    category: "Branding",
    summary: "Logo, colour system, signage and a full set of social templates.",
    tags: ["Identity", "Templates"],
    image: "/images/stock/brand-swatches.jpg",
  },
  {
    title: "Store growth campaigns",
    sector: "E-commerce · UAE",
    category: "Ads",
    summary: "Full-funnel Meta and Google campaigns with AI video creatives.",
    tags: ["Meta Ads", "Google Ads"],
    image: "/images/stock/retail-store.jpg",
  },
  {
    title: "Resort direct-booking website",
    sector: "Hospitality · UAE",
    category: "Websites",
    summary: "A fast, visual site with clear offers and a simple path to book direct.",
    tags: ["Website", "Bookings"],
    image: "/images/stock/resort-pool.jpg",
  },
  {
    title: "Search growth programme",
    sector: "Education · UAE",
    category: "SEO",
    summary: "Course pages and articles built around what learners search for.",
    tags: ["SEO", "Content"],
    image: "/images/stock/search-analytics.jpg",
  },
];

export const WORK_CATEGORIES: ("All" | WorkCategory)[] = [
  "All",
  "Websites",
  "Social Media",
  "SEO",
  "Ads",
  "AI Automation",
  "Branding",
];

export const INDUSTRIES = [
  { slug: "real-estate", image: "/images/stock/house-keys.jpg", name: "Real Estate", need: "Listings that generate qualified buyer and tenant enquiries.", services: ["Websites", "Meta Ads", "Video"] },
  { slug: "restaurants-cafes", image: "/images/stock/restaurant-interior.jpg", name: "Restaurants & Cafés", need: "Full tables from Instagram, Google Maps and delivery apps.", services: ["Social", "Photography", "Local SEO"] },
  { slug: "healthcare-clinics", image: "/images/stock/dental-clinic.jpg", name: "Healthcare & Clinics", need: "Patients who find you first and trust you before they call.", services: ["Local SEO", "Websites", "Google Ads"] },
  { slug: "ecommerce-retail", image: "/images/stock/retail-store.jpg", name: "E-commerce & Retail", need: "Stores that convert, with ads that pay for themselves.", services: ["Online stores", "Ads", "AI video"] },
  { slug: "beauty-salons", image: "/images/stock/beauty-hair.jpg", name: "Beauty & Salons", need: "A booked calendar built on reels, reviews and repeat clients.", services: ["Social", "Branding", "Automation"] },
  { slug: "construction-contracting", image: "/images/stock/construction-site.jpg", name: "Construction & Contracting", need: "Credibility online that wins tenders and project leads.", services: ["Websites", "SEO", "Branding"] },
  { slug: "education-training", image: "/images/stock/students-laptops.jpg", name: "Education & Training", need: "More enrolments from parents and learners searching now.", services: ["Google Ads", "SEO", "Lead funnels"] },
  { slug: "hospitality-tourism", image: "/images/stock/resort-pool.jpg", name: "Hospitality & Tourism", need: "Direct bookings from guests planning their Dubai trip.", services: ["Video", "Social", "Websites"] },
];

export const PROCESS = [
  { when: "Week 1", title: "Audit & strategy", text: "We review your website, socials, Google Business Profile, competitors and ad accounts, then set targets for leads and sales." },
  { when: "Weeks 2–3", title: "Build & create", text: "Brand assets, content calendar, landing pages, tracking and automations are set up before anything goes live." },
  { when: "Every month", title: "Launch & run", text: "Posts, reels, campaigns and SEO work go out on schedule, with budgets moved toward what converts." },
  { when: "Every month", title: "Report & scale", text: "A clear report on reach, leads, cost per lead and rankings, plus the plan for the month ahead." },
];

export const BLOG_CATEGORIES = [
  { name: "Digital Marketing", slug: "digital-marketing", text: "Strategy, funnels and budgets for UAE businesses." },
  { name: "Social Media Marketing", slug: "social-media-marketing", text: "Content, reels and community that grow a following." },
  { name: "Website Design & Development", slug: "website-design-development", text: "Sites that load fast and convert." },
  { name: "SEO & GEO", slug: "seo-geo", text: "Ranking on Google and in AI answers." },
  { name: "AI Tools & Automation", slug: "ai-tools-automation", text: "Agents and workflows that save hours." },
  { name: "Business Growth", slug: "business-growth", text: "Leads, pricing and scaling in the Gulf." },
  { name: "Branding & Creative Design", slug: "branding-creative-design", text: "Identity and design that people remember." },
];

export const AUDIT_STAGES = [
  "Connecting to website",
  "Running mobile audit",
  "Running desktop audit",
  "Analysing SEO",
  "Checking accessibility",
  "Generating recommendations",
];

export const INTERESTS = ["Website", "Social media", "SEO", "Meta / Google Ads", "Branding & design", "Photo & video", "AI automation"];

export type Launch = {
  title: string;
  sector: string;
  /** Short line shown under the title. */
  summary: string;
  /** Screenshot of the site's homepage, ideally 1600 x 1000 or larger. */
  image: string;
  /** Address shown in the browser bar. */
  display: string;
  /** Set to the live address to show a "Live" badge and link the card to the site. */
  url?: string;
};

/** The three newest finished websites, shown as stacked cards on the homepage. */
export const LAUNCHES: Launch[] = [
  {
    title: "Al Rawabi Dairy",
    sector: "Food & beverage · Dubai",
    summary: "Brand website for a Dubai dairy, with product pages, the company story and a sustainability section.",
    image: "/images/works/alrawabidairy.jpg",
    display: "alrawabidairy.com",
    url: "https://alrawabidairy.com",
  },
  {
    title: "Regal Sky Gold & Jewellery",
    sector: "Gold trading · Dubai Gold Souq",
    summary: "Website for a gold bullion trader and scrap gold buyer, with product pages, live rates and WhatsApp contact.",
    image: "/images/works/regalskygold.jpg",
    display: "regalskygold.com",
    url: "https://regalskygold.com",
  },
  {
    title: "Rogers Denim",
    sector: "Fashion · Online store",
    summary: "Online clothing store with category browsing, collections, new arrivals and WhatsApp contact.",
    image: "/images/works/rogersdenim.jpg",
    display: "rogersdenim.com",
    url: "https://rogersdenim.com",
  },
];
