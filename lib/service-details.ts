import type { PackageSlug } from "./site";

export type ServiceDetail = {
  headline: string;
  intro: string;
  deliverables: string[];
  steps: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  /** Packages that include this service */
  packages: PackageSlug[];
  /** Industry slugs where this service matters most */
  industries: string[];
};

export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  "digital-marketing-strategy": {
    headline: "A growth plan built on numbers, not guesswork.",
    intro:
      "Before a dirham is spent on ads or content, we map where your customers are, what your competitors are doing and which channels can realistically move your sales. You get a 90-day roadmap with clear targets and an owner for every action.",
    deliverables: [
      "Market, audience and competitor research for the UAE",
      "Audit of your website, social profiles and ad accounts",
      "Channel plan with budget split and expected outcomes",
      "Customer journey and lead funnel map",
      "90-day action roadmap with monthly targets",
      "Tracking plan so every lead can be traced to its source",
    ],
    steps: [
      { title: "Discover", text: "A working session on your business model, margins, best customers and what has and hasn't worked so far." },
      { title: "Research", text: "We study search demand, competitor activity and audience behaviour in your category and emirate." },
      { title: "Plan", text: "Channels, budgets, content themes and targets are set out in one document you can hold us to." },
      { title: "Review", text: "Results are checked against the plan every month and the roadmap is adjusted to what the data shows." },
    ],
    faqs: [
      { q: "Do I need a strategy if I only want social media or ads?", a: "A short one, yes. Even a single channel performs better when the audience, offer and targets are agreed first. For smaller scopes we keep the strategy step light." },
      { q: "How long does the strategy phase take?", a: "Usually the first week of an engagement, running alongside account setup so nothing is delayed." },
      { q: "Will you work with our in-house team?", a: "Yes. The roadmap states clearly who does what, whether that is our team, yours or a mix." },
    ],
    packages: ["pro", "pro-max", "grox"],
    industries: ["real-estate", "ecommerce-retail", "education-training"],
  },
  "social-media-management": {
    headline: "Social media that looks premium and brings in enquiries.",
    intro:
      "We plan, design, write and publish your content on Instagram, Facebook and LinkedIn, then stay on top of comments and messages. Every month has a theme, a calendar and a goal, so your feed works as a sales channel and not just a gallery.",
    deliverables: [
      "Monthly content calendar approved by you before posting",
      "Designed posts, carousels and stories in your brand style",
      "Reels scripted, shot or edited for each platform",
      "Captions and hashtags written for reach and clarity",
      "Community management: comments and message replies",
      "Monthly report on reach, engagement and enquiries",
    ],
    steps: [
      { title: "Set the direction", text: "We agree your audience, tone of voice, content pillars and what you want people to do after seeing a post." },
      { title: "Plan the month", text: "You receive a calendar with every post, visual and caption for approval." },
      { title: "Publish and engage", text: "Content goes out at the times your audience is active, and we reply to comments and messages." },
      { title: "Learn and improve", text: "The best-performing formats get more space next month. The weak ones are dropped." },
    ],
    faqs: [
      { q: "Which platforms do you manage?", a: "Instagram, Facebook and LinkedIn are the core. The number of platforms depends on your package: one on GO, two on Pro and three on Pro Max." },
      { q: "Do you create the content or do we?", a: "We create it. If you have photos, videos or offers you want featured, we build them into the calendar." },
      { q: "Can we approve posts before they go live?", a: "Always. Nothing is published until you have approved the monthly calendar." },
    ],
    packages: ["go", "pro", "pro-max", "grox"],
    industries: ["restaurants-cafes", "beauty-salons", "hospitality-tourism"],
  },
  "graphic-design-branding": {
    headline: "A brand people recognise before they read the name.",
    intro:
      "From a new logo to a full identity system, we design brands that look consistent everywhere: signage, social, packaging, proposals and your website. You receive organised files and clear guidelines your whole team can follow.",
    deliverables: [
      "Logo design or refinement of your existing logo",
      "Colour palette, typography and brand guidelines",
      "Social media templates for posts, stories and highlights",
      "Business cards, letterheads and company profiles",
      "Brochures, menus, flyers and packaging",
      "Print-ready and web-ready files in every format",
    ],
    steps: [
      { title: "Brief", text: "We learn your positioning, audience and the brands you admire or want to avoid looking like." },
      { title: "Concepts", text: "You see distinct design directions presented on real applications, not just on a white page." },
      { title: "Refine", text: "The chosen direction is refined with your feedback until every detail is right." },
      { title: "Hand over", text: "Final files, templates and a guideline document are delivered, ready for print and digital." },
    ],
    faqs: [
      { q: "We already have a logo. Can you work with it?", a: "Yes. Many clients keep their logo and ask us to tidy it up and build a consistent system around it." },
      { q: "Do we own the final designs?", a: "Yes. Once the project is paid for, the final approved designs and source files are yours." },
      { q: "Can you handle printing?", a: "We prepare print-ready files to the printer's specification and can coordinate with a print partner in Dubai if you need it." },
    ],
    packages: ["go", "pro", "pro-max", "grox"],
    industries: ["beauty-salons", "restaurants-cafes", "construction-contracting"],
  },
  "website-design-development": {
    headline: "Websites built to load fast and turn visits into enquiries.",
    intro:
      "We design and build websites and online stores that explain what you do in seconds, work beautifully on a phone and make it easy to call, message or buy. Every site ships with tracking, on-page SEO and a simple way for you to update content.",
    deliverables: [
      "Custom design for desktop and mobile, in your brand",
      "WordPress, WooCommerce or modern Next.js builds",
      "Clear calls to action: WhatsApp, call and enquiry forms",
      "On-page SEO: titles, meta descriptions, schema and speed",
      "Arabic and English versions where needed",
      "Analytics, conversion tracking and training for your team",
    ],
    steps: [
      { title: "Structure", text: "We plan the pages and the journey from landing on the site to making an enquiry." },
      { title: "Design", text: "You approve the look on real page designs for both mobile and desktop." },
      { title: "Build", text: "The site is developed, loaded with content and tested on real devices." },
      { title: "Launch and support", text: "We handle the go-live, connect tracking and stay available after launch." },
    ],
    faqs: [
      { q: "How long does a website take?", a: "A landing page can be ready in days. A full company website typically takes a few weeks, depending on the number of pages and how quickly content is approved." },
      { q: "Can you redesign our existing website?", a: "Yes. We can refresh the design, rebuild it on a faster platform or fix the specific pages that are losing you enquiries." },
      { q: "Will we be able to update the site ourselves?", a: "Yes. We set up an editor for the content you change often and show your team how to use it." },
    ],
    packages: ["pro", "pro-max", "grox"],
    industries: ["real-estate", "healthcare-clinics", "construction-contracting"],
  },
  "seo-google-business-profile": {
    headline: "Be the business people find first.",
    intro:
      "We improve where you appear on Google Search, Google Maps and in AI-generated answers. That means fixing the technical issues, building the right pages for what your customers search and keeping your Google Business Profile active and well reviewed.",
    deliverables: [
      "Technical SEO audit and fixes",
      "Keyword research for your services and service areas",
      "On-page optimisation and new landing pages",
      "Google Business Profile setup, posts and review strategy",
      "Content for AI search visibility (GEO)",
      "Monthly ranking, traffic and call report",
    ],
    steps: [
      { title: "Audit", text: "We check how Google sees your site today: speed, structure, content gaps and local listings." },
      { title: "Fix the foundations", text: "Technical issues, titles, internal links and your Business Profile are put right first." },
      { title: "Build relevance", text: "Service pages, location pages and articles are created around real search demand." },
      { title: "Track and extend", text: "Rankings and enquiries are reported monthly and the keyword set grows as you move up." },
    ],
    faqs: [
      { q: "How long before SEO shows results?", a: "Local and Google Business Profile improvements can show within weeks. Competitive keywords usually take a few months of consistent work. We report progress every month so you can see the direction." },
      { q: "Can you guarantee the number one position?", a: "No honest agency can, because Google controls the rankings. What we commit to is the work, the reporting and steady improvement in visibility and enquiries." },
      { q: "What is GEO?", a: "Generative Engine Optimisation: structuring your content so AI tools such as ChatGPT and Google's AI answers can understand and cite your business." },
    ],
    packages: ["go", "pro", "pro-max", "grox"],
    industries: ["healthcare-clinics", "restaurants-cafes", "education-training"],
  },
  "meta-google-ads": {
    headline: "Ad budgets that are spent where they convert.",
    intro:
      "We plan, build and manage campaigns on Meta (Instagram and Facebook) and Google. Creative, audiences and landing pages are tested continuously, and budget moves toward whatever produces leads or sales at the lowest cost.",
    deliverables: [
      "Account, pixel and conversion tracking setup",
      "Campaign structure for awareness, leads and sales",
      "Ad creatives: static, carousel and video",
      "Audience research, retargeting and lookalikes",
      "Landing page recommendations or builds",
      "Weekly optimisation and a clear monthly report",
    ],
    steps: [
      { title: "Set up tracking", text: "Pixels, conversions and call tracking are configured so results can be measured properly." },
      { title: "Launch tests", text: "Several audiences and creatives go live with controlled budgets to find early winners." },
      { title: "Optimise", text: "Spend shifts to the best performers, weak ads are paused and new variations are introduced." },
      { title: "Scale", text: "Once cost per lead is stable, budgets grow in steps while we protect the return." },
    ],
    faqs: [
      { q: "Is ad spend included in the package price?", a: "No. Ad spend is paid directly by you to Meta or Google. Our fee covers strategy, creative, management and reporting." },
      { q: "How much should we spend on ads?", a: "It depends on your market and goals. We recommend a starting budget after the audit and adjust it based on actual cost per lead." },
      { q: "Who owns the ad accounts?", a: "You do. Campaigns run in your own ad accounts, so the data and history always stay with you." },
    ],
    packages: ["pro", "pro-max", "grox"],
    industries: ["real-estate", "ecommerce-retail", "education-training"],
  },
  "photography-videography": {
    headline: "Real photos and video of your business, done properly.",
    intro:
      "Stock images look like everyone else. We shoot your products, food, properties, team and locations across Dubai, then edit the results for your website, ads and social media in the right sizes for each platform.",
    deliverables: [
      "Product, food and lifestyle photography",
      "Property and interior shoots",
      "Team portraits and behind-the-scenes content",
      "Short-form video for reels and ads",
      "Professional editing, colour and retouching",
      "Files delivered in web, social and print sizes",
    ],
    steps: [
      { title: "Plan the shoot", text: "We agree the shot list, locations, styling and where each image or clip will be used." },
      { title: "Shoot", text: "Our crew captures the content on site or in studio, working around your business hours." },
      { title: "Edit", text: "Selections are retouched, colour graded and cut into the formats you need." },
      { title: "Deliver", text: "You receive an organised library ready for your website, social calendar and ads." },
    ],
    faqs: [
      { q: "Where do you shoot?", a: "Across Dubai, at your premises or on location. Shoots elsewhere in the UAE can be arranged." },
      { q: "How many shoots are included?", a: "Pro Max includes a monthly shoot in Dubai and Grox includes more. Shoots can also be booked as a one-off project." },
      { q: "Can the footage be used for ads?", a: "Yes. We plan each shoot with your ad and social formats in mind so the content works everywhere." },
    ],
    packages: ["pro-max", "grox"],
    industries: ["restaurants-cafes", "real-estate", "hospitality-tourism"],
  },
  "ai-video-creative-content": {
    headline: "More video, made faster, without losing the craft.",
    intro:
      "We combine AI video tools with human direction and editing to produce reels, ad creatives and explainers quickly. It lets you test more ideas and stay visible every week, while a creative director keeps everything on brand.",
    deliverables: [
      "AI-assisted reels and short-form video",
      "Ad creative variations for testing",
      "Product visuals and animated explainers",
      "Voice-over, captions and sound design",
      "Scripts and hooks written for each platform",
      "Edits in vertical, square and landscape formats",
    ],
    steps: [
      { title: "Concept", text: "We write hooks and scripts around your offer and what your audience responds to." },
      { title: "Generate", text: "AI tools produce footage, visuals and voice options at speed." },
      { title: "Direct and edit", text: "Our editors select, refine and assemble the best material so it feels made, not generated." },
      { title: "Test", text: "Variations run on social and ads, and the winners shape the next batch." },
    ],
    faqs: [
      { q: "Will AI video look fake?", a: "Not when it is directed well. We use AI where it adds speed and mix it with real footage of your business where authenticity matters." },
      { q: "Which tools do you use?", a: "A mix that changes as the tools improve, including CapCut, Canva AI and leading AI video and voice models." },
      { q: "Can AI video replace a real shoot?", a: "For some content, yes. For food, people and property we usually recommend real footage supported by AI editing." },
    ],
    packages: ["pro-max", "grox"],
    industries: ["ecommerce-retail", "beauty-salons", "hospitality-tourism"],
  },
  "ai-agents-automation": {
    headline: "Reply in seconds. Follow up automatically. Lose fewer leads.",
    intro:
      "We build AI agents and automations that answer enquiries on WhatsApp and your website, qualify leads, book appointments and keep your CRM up to date. Your team spends time on customers who are ready, not on repeating the same answers.",
    deliverables: [
      "AI chat agent for WhatsApp and website",
      "Lead capture, qualification and routing",
      "Appointment booking and reminders",
      "CRM and spreadsheet integrations",
      "n8n workflows connecting your tools",
      "Monitoring, handover to humans and monthly improvements",
    ],
    steps: [
      { title: "Map the process", text: "We document how enquiries arrive today, the questions people ask and where leads get lost." },
      { title: "Design the agent", text: "Answers, tone, escalation rules and the data to collect are agreed with your team." },
      { title: "Build and connect", text: "The agent and workflows are built in n8n and connected to WhatsApp, your site and your CRM." },
      { title: "Test and tune", text: "We test with real conversations, launch, then refine the answers every month." },
    ],
    faqs: [
      { q: "Will customers know they are talking to an AI?", a: "We recommend being open about it. The agent introduces itself as an assistant and hands over to a person whenever a customer asks or the question is sensitive." },
      { q: "What if the agent does not know an answer?", a: "It says so, collects the customer's details and alerts your team instead of guessing." },
      { q: "Does it work in Arabic?", a: "Yes. Agents can reply in English and Arabic, and other languages on request." },
    ],
    packages: ["pro-max", "grox"],
    industries: ["healthcare-clinics", "real-estate", "beauty-salons"],
  },
  "analytics-reporting-lead-generation": {
    headline: "Know exactly where every lead came from.",
    intro:
      "Marketing only improves when it is measured. We set up tracking across your website, ads and social, build lead funnels that capture enquiries properly and send a monthly report written in plain language.",
    deliverables: [
      "Google Analytics 4 and Tag Manager setup",
      "Meta pixel and conversion API configuration",
      "Call, form and WhatsApp click tracking",
      "Lead funnels and landing pages",
      "Live dashboard of leads and cost per lead",
      "Monthly report with clear next steps",
    ],
    steps: [
      { title: "Define what counts", text: "We agree which actions matter: calls, forms, WhatsApp chats, bookings or purchases." },
      { title: "Install tracking", text: "Tags, pixels and events are set up and tested end to end." },
      { title: "Build the funnel", text: "Landing pages and forms are tuned so more visitors become enquiries." },
      { title: "Report and act", text: "Each month you see what worked, what it cost and what we will change." },
    ],
    faqs: [
      { q: "We already have Google Analytics. Is that enough?", a: "Often it is installed but not tracking the actions that matter. We check your setup and fix the gaps before relying on the numbers." },
      { q: "What will the monthly report show?", a: "Reach, traffic, leads by channel, cost per lead and rankings, followed by the plan for the next month." },
      { q: "Can you track WhatsApp enquiries?", a: "Yes. We track clicks to WhatsApp from your site and ads, and can connect conversations to your CRM through automation." },
    ],
    packages: ["go", "pro", "pro-max", "grox"],
    industries: ["ecommerce-retail", "real-estate", "education-training"],
  },
};
