export type IndustryDetail = {
  headline: string;
  intro: string;
  challenges: string[];
  plays: { title: string; text: string; service: string }[];
  faqs: { q: string; a: string }[];
};

export const INDUSTRY_DETAILS: Record<string, IndustryDetail> = {
  "real-estate": {
    headline: "Qualified buyer and tenant enquiries, not just clicks.",
    intro:
      "Property in Dubai is one of the most competitive markets online. We help brokerages, developers and holiday-home operators stand out with listings that sell the lifestyle, ads that reach serious buyers and fast follow-up on every lead.",
    challenges: [
      "Portals bring leads, but you do not own the audience",
      "High ad costs with many unqualified enquiries",
      "Slow replies lose buyers to the next agent",
    ],
    plays: [
      { title: "A website that showcases listings", text: "Property search, rich galleries and WhatsApp buttons on every listing, in English and Arabic.", service: "website-design-development" },
      { title: "Lead campaigns on Meta and Google", text: "Project and community campaigns with forms that filter by budget and intent.", service: "meta-google-ads" },
      { title: "Property video and photography", text: "Walk-throughs, reels and drone-style visuals that make a listing feel real.", service: "photography-videography" },
      { title: "Instant reply and qualification", text: "An AI assistant answers on WhatsApp in seconds and passes ready buyers to your agents.", service: "ai-agents-automation" },
    ],
    faqs: [
      { q: "Can you market off-plan projects?", a: "Yes. We build project landing pages and lead campaigns aimed at investors and end users, with your approved marketing materials." },
      { q: "Can leads go straight into our CRM?", a: "Yes. Enquiries from forms, ads and WhatsApp can be routed into your CRM automatically." },
    ],
  },
  "restaurants-cafes": {
    headline: "Full tables, busy delivery and a feed people want to eat.",
    intro:
      "Diners in Dubai decide where to eat on Instagram and Google Maps. We make sure your restaurant or café looks irresistible in both, and that discovery turns into bookings, walk-ins and orders.",
    challenges: [
      "A crowded market where new venues open every week",
      "Great food that does not come across in phone photos",
      "Heavy reliance on delivery apps and their commissions",
    ],
    plays: [
      { title: "Food photography and reels", text: "Regular shoots that capture dishes, atmosphere and your team at their best.", service: "photography-videography" },
      { title: "Instagram that builds a following", text: "A monthly calendar of reels, stories and offers with active community replies.", service: "social-media-management" },
      { title: "Google Maps visibility", text: "An optimised Business Profile, fresh photos and a steady flow of reviews.", service: "seo-google-business-profile" },
      { title: "Launch and offer campaigns", text: "Targeted ads for openings, new menus, Ramadan and seasonal promotions.", service: "meta-google-ads" },
    ],
    faqs: [
      { q: "Do you work with influencers?", a: "We can plan and coordinate creator visits as part of your content calendar, matched to your audience and area." },
      { q: "Can you help us take direct orders?", a: "Yes. We can add ordering or booking to your website so more customers come to you directly." },
    ],
  },
  "healthcare-clinics": {
    headline: "Be the clinic patients find first and trust before they call.",
    intro:
      "Patients search for a doctor near them, read the reviews and choose within minutes. We build that first impression for clinics, dental practices and wellness centres, with marketing that stays accurate and professional.",
    challenges: [
      "Patients choose from the first few results on Google Maps",
      "Trust depends on reviews, credentials and a clear website",
      "Missed calls and slow replies become missed appointments",
    ],
    plays: [
      { title: "Local SEO for every treatment", text: "Service and doctor pages built around what patients actually search in your area.", service: "seo-google-business-profile" },
      { title: "A clear, reassuring website", text: "Treatments, doctors, insurance and booking explained simply on mobile.", service: "website-design-development" },
      { title: "Google Ads for high-intent searches", text: "Campaigns for the treatments that matter most to your practice.", service: "meta-google-ads" },
      { title: "Booking and reminders on WhatsApp", text: "An assistant that answers common questions, books appointments and reduces no-shows.", service: "ai-agents-automation" },
    ],
    faqs: [
      { q: "Do you follow healthcare advertising rules?", a: "Healthcare marketing in the UAE must follow the regulator's advertising rules. We prepare content for your review and approval so everything published is accurate and compliant." },
      { q: "Can you help us get more reviews?", a: "Yes. We set up a simple, ethical process that invites patients to leave a review after their visit." },
    ],
  },
  "ecommerce-retail": {
    headline: "A store that converts, with ads that pay for themselves.",
    intro:
      "Selling online in the UAE means competing with marketplaces and global brands. We help retailers and e-commerce brands build a store people enjoy buying from and campaigns that bring profitable orders.",
    challenges: [
      "Rising ad costs and thin margins",
      "Visitors who browse and leave without buying",
      "Not knowing which channel really drives sales",
    ],
    plays: [
      { title: "A faster, clearer store", text: "Product pages, checkout and mobile experience tuned to remove friction.", service: "website-design-development" },
      { title: "Full-funnel ad campaigns", text: "Prospecting, retargeting and catalogue ads across Meta and Google.", service: "meta-google-ads" },
      { title: "A steady stream of creative", text: "AI-assisted product videos and ad variations so you can test more, faster.", service: "ai-video-creative-content" },
      { title: "Tracking you can trust", text: "Purchase tracking and reporting that shows return on ad spend by channel.", service: "analytics-reporting-lead-generation" },
    ],
    faqs: [
      { q: "Which platforms do you build on?", a: "WooCommerce on WordPress is our most common choice, and we build custom storefronts where a project needs it." },
      { q: "Can you work with our existing store?", a: "Yes. We can improve the store you have and take over the marketing without a rebuild." },
    ],
  },
  "beauty-salons": {
    headline: "A booked calendar built on reels, reviews and repeat clients.",
    intro:
      "Beauty is visual and personal. We help salons, spas, barbers and aesthetic clinics show their best work, turn followers into bookings and bring clients back more often.",
    challenges: [
      "Results that are hard to show without great visuals",
      "Enquiries by DM that go unanswered during busy hours",
      "Quiet weekdays and one-time visitors",
    ],
    plays: [
      { title: "A feed that shows the result", text: "Before-and-after content, reels and stories planned every month.", service: "social-media-management" },
      { title: "A brand that feels premium", text: "Identity, price lists and templates that match the experience in your salon.", service: "graphic-design-branding" },
      { title: "Automatic booking replies", text: "An assistant that answers DMs and WhatsApp, shares prices and books appointments.", service: "ai-agents-automation" },
      { title: "Local discovery", text: "Google Business Profile and reviews that bring in nearby clients.", service: "seo-google-business-profile" },
    ],
    faqs: [
      { q: "Can you shoot content at our salon?", a: "Yes. We plan shoots around your working day so we capture real treatments and results." },
      { q: "Can you promote offers for quiet days?", a: "Yes. We run targeted offers to nearby audiences and past clients to fill slower periods." },
    ],
  },
  "construction-contracting": {
    headline: "Credibility online that wins tenders and project leads.",
    intro:
      "In contracting, fit-out and building services, clients check your track record before they call. We present your projects, capabilities and approvals in a way that builds confidence with developers, consultants and homeowners.",
    challenges: [
      "A strong portfolio that is not visible online",
      "A dated website that undersells the company",
      "Enquiries that depend on word of mouth alone",
    ],
    plays: [
      { title: "A company website with a real portfolio", text: "Projects, services, certifications and a simple quote request.", service: "website-design-development" },
      { title: "A professional brand and profile", text: "Company profile, proposal templates, vehicle and site branding.", service: "graphic-design-branding" },
      { title: "Search visibility for your services", text: "Pages built around the services and areas you cover in the UAE.", service: "seo-google-business-profile" },
      { title: "Project photography", text: "Completed work documented properly for your website, tenders and LinkedIn.", service: "photography-videography" },
    ],
    faqs: [
      { q: "Do you design company profiles for tenders?", a: "Yes. We design company profiles and capability documents in print and PDF formats." },
      { q: "Is LinkedIn worth it for contractors?", a: "For reaching developers, consultants and facility managers, yes. We include it in the social plan where it fits." },
    ],
  },
  "education-training": {
    headline: "More enrolments from parents and learners who are searching now.",
    intro:
      "Schools, nurseries, institutes and training centres compete for attention during short enrolment windows. We make sure you are visible when families and professionals are deciding, and that every enquiry is followed up.",
    challenges: [
      "Enrolment seasons where timing is everything",
      "Many enquiries, few completed registrations",
      "Courses and programmes that are hard to explain quickly",
    ],
    plays: [
      { title: "Search campaigns for each programme", text: "Google Ads aimed at the courses and age groups you want to fill.", service: "meta-google-ads" },
      { title: "Landing pages that convert", text: "One clear page per programme with fees, schedule and an enquiry form.", service: "analytics-reporting-lead-generation" },
      { title: "Organic visibility all year", text: "Course pages and articles that rank for what learners search.", service: "seo-google-business-profile" },
      { title: "A plan for every intake", text: "A calendar of campaigns built around your terms and intake dates.", service: "digital-marketing-strategy" },
    ],
    faqs: [
      { q: "Can you help with open days and events?", a: "Yes. We run event campaigns with registration pages and reminders." },
      { q: "Can enquiries be followed up automatically?", a: "Yes. Automated replies and reminders make sure every enquiry gets a response and a next step." },
    ],
  },
  "hospitality-tourism": {
    headline: "Direct bookings from guests planning their Dubai trip.",
    intro:
      "Travellers research on social media and search long before they arrive. We help hotels, holiday homes, tour operators and attractions inspire that decision and capture the booking directly.",
    challenges: [
      "Commission paid to booking platforms on every stay",
      "Seasonal demand that swings sharply",
      "Experiences that need video to be understood",
    ],
    plays: [
      { title: "Video that sells the experience", text: "Reels and short films of your rooms, tours and moments guests remember.", service: "photography-videography" },
      { title: "Social content for travellers", text: "A steady presence on the platforms where trips are planned.", service: "social-media-management" },
      { title: "A website built for direct booking", text: "Fast pages, clear offers and a simple path to book or enquire.", service: "website-design-development" },
      { title: "Seasonal campaigns", text: "Ads timed to peak travel periods and aimed at the right source markets.", service: "meta-google-ads" },
    ],
    faqs: [
      { q: "Can you target visitors from specific countries?", a: "Yes. Campaigns can be aimed at chosen source markets and languages." },
      { q: "Do you create content in other languages?", a: "English and Arabic are standard. Other languages can be arranged for specific campaigns." },
    ],
  },
};
