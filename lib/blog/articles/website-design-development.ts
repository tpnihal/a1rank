import { s, type Article } from "../types";

export const websiteDesignDevelopment: Article[] = [
  {
    slug: "what-makes-a-website-convert-visitors-into-enquiries",
    category: "website-design-development",
    title: "What Makes a Website Convert Visitors Into Enquiries?",
    description: "Seven things high-converting business websites have in common, and how to check your own site against them.",
    image: "/images/stock/code-laptop.jpg",
    imageAlt: "Laptop on a desk showing website code",
    date: "2026-11-16",
    intro:
      "A website can look beautiful and still bring in nothing. Conversion comes from clarity: a visitor understands what you offer, believes you and knows what to do next.",
    sections: [
      s("Say what you do in the first screen", [
        "Within a few seconds a visitor should know what you sell, who it is for and where you operate. A clear headline such as 'Family dental clinic in Jumeirah' does more than a clever slogan.",
      ]),
      s("Give one main action", [
        "Decide the single action you want, such as a booking, a call or a quote request, and repeat it through the page. Too many competing buttons lead to no click at all.",
      ]),
      s("Show proof", ["Visitors look for reasons to trust you. Add what you genuinely have:"], [
        "Reviews with names and, where possible, a link to the source.",
        "Photos of real work, premises and people.",
        "Client logos, certificates and licences.",
        "Clear numbers, only if you can back them up.",
      ]),
      s("Make contact effortless", [
        "Put a WhatsApp button and a tap-to-call number where thumbs can reach them on mobile. Keep forms short. Every extra field loses some people, so ask only for what you need to reply.",
      ]),
      s("Be fast and mobile first", [
        "Most visitors arrive on a phone, often on mobile data. A slow page loses them before they read a word. You can check your own site with our [free website audit](/website-audit) and read more about [Core Web Vitals](/blog/website-speed-and-core-web-vitals-explained).",
      ]),
      s("Answer questions before they are asked", [
        "Price ranges, service areas, process and timelines are the things people want to know. A short FAQ on each page removes doubt and reduces repetitive enquiries.",
      ]),
    ],
    takeaway: "Clear message, one action, real proof, easy contact and speed. Fix those five before you spend more on traffic.",
    next: { label: "Run a free website audit", href: "/website-audit" },
  },
  {
    slug: "website-speed-and-core-web-vitals-explained",
    category: "website-design-development",
    title: "Website Speed and Core Web Vitals Explained in Plain English",
    description: "What LCP, INP and CLS mean, the scores Google considers good and the usual causes of a slow website.",
    image: "/images/stock/dashboard-dark.jpg",
    imageAlt: "Performance metrics on a dark dashboard",
    date: "2026-11-02",
    intro:
      "Core Web Vitals are three measurements Google uses to describe how a page feels to a real visitor: how fast it appears, how quickly it responds and how stable it is while loading.",
    sections: [
      s("The three measurements", [], [
        "Largest Contentful Paint (LCP): how long the main content takes to appear. Good is 2.5 seconds or less.",
        "Interaction to Next Paint (INP): how quickly the page reacts when someone taps or clicks. Good is 200 milliseconds or less.",
        "Cumulative Layout Shift (CLS): how much the layout jumps around while loading. Good is 0.1 or less.",
      ]),
      s("Why they matter", [
        "People leave slow pages, especially on mobile. Page experience is also one of the signals Google takes into account for ranking. Speed will not rescue weak content, but between two similar pages the faster one has the advantage.",
      ]),
      s("Common causes of a slow site", [], [
        "Large images uploaded straight from a camera or phone.",
        "Too many plugins, trackers and chat widgets loading at once.",
        "Heavy themes and page builders that ship code you do not use.",
        "Cheap or distant hosting with slow server response.",
        "Web fonts and videos that block the first view.",
      ]),
      s("Fixes that usually help most", [
        "Compress and resize images and serve modern formats such as WebP or AVIF. Lazy-load anything below the first screen. Remove scripts you no longer use. Set width and height on images so the layout does not shift. Use caching and a content delivery network.",
      ]),
      s("How to check your site", [
        "Google PageSpeed Insights reports both lab tests and, where available, data from real visitors. Our [free website audit](/website-audit) uses the same source and explains the results. If the fixes are beyond your current setup, a [rebuild](/services#website-design-development) is sometimes the faster route.",
      ]),
    ],
    takeaway: "Aim for LCP under 2.5 seconds, INP under 200 milliseconds and CLS under 0.1. Images and unused scripts are the first places to look.",
    next: { label: "Check your site speed", href: "/website-audit" },
  },
  {
    slug: "wordpress-or-nextjs-which-is-right-for-your-website",
    category: "website-design-development",
    title: "WordPress or Next.js: Which Is Right for Your Business Website?",
    description: "An honest comparison of the two most common ways we build websites, and how to choose between them.",
    image: "/images/stock/team-meeting.jpg",
    imageAlt: "Team reviewing website options in a meeting",
    date: "2026-10-19",
    intro:
      "Clients often ask which technology is best. There is no single answer. The right choice depends on who will update the site, how much it needs to do and how important speed is to you.",
    sections: [
      s("WordPress in short", [
        "WordPress is a content management system with a visual editor and a huge library of themes and plugins. Your team can add pages and blog posts without a developer, and WooCommerce adds a full online store.",
        "The trade-offs are maintenance and speed. Plugins need regular updates, and a site loaded with them can become slow or insecure if it is neglected.",
      ]),
      s("Next.js in short", [
        "Next.js is a framework for building custom websites with React. Pages are generated ahead of time, so they load very quickly and score well on Core Web Vitals. The design is not limited by a theme.",
        "The trade-off is that changes to layout need a developer, unless the site is connected to a content system for the parts you want to edit yourself.",
      ]),
      s("How to choose", [], [
        "Choose WordPress if your team wants to edit everything, you need a store quickly or the budget is tight.",
        "Choose Next.js if speed, a distinctive design and long-term performance matter most.",
        "Consider a headless setup, with WordPress for content and Next.js for the front end, if you want both.",
      ]),
      s("What matters more than the platform", [
        "Clear content, good photography, fast hosting and regular updates decide whether a site performs. A well-built WordPress site beats a careless custom build, and the reverse is also true.",
        "We build on both and recommend based on your goals. See our [website design and development](/services#website-design-development) service.",
      ]),
    ],
    takeaway: "Pick WordPress for easy editing and Next.js for speed and custom design. The quality of the build matters more than the name of the platform.",
    next: { label: "Discuss your website", href: "/contact" },
  },
  {
    slug: "landing-page-checklist-for-ad-campaigns",
    category: "website-design-development",
    title: "A Landing Page Checklist for Ad Campaigns",
    description: "Sending ad traffic to your homepage wastes budget. Use this checklist to build a landing page that turns clicks into leads.",
    image: "/images/stock/dashboard-laptop.jpg",
    imageAlt: "Laptop with campaign results on screen",
    date: "2026-10-02",
    intro:
      "An ad makes a specific promise. The page behind it should continue that exact conversation. A homepage talks about everything, which is why dedicated landing pages usually convert better.",
    sections: [
      s("Message match", [
        "The headline on the page should repeat the offer in the ad, in the same words. If the ad says 'Free site visit for villa renovations', the page should open with that and nothing else.",
      ]),
      s("The checklist", [], [
        "One offer and one call to action, repeated.",
        "A headline that matches the ad.",
        "A short explanation of what the customer gets.",
        "Three to five benefits in plain language.",
        "Proof: reviews, photos or client logos.",
        "A short form or WhatsApp button visible without scrolling.",
        "No main navigation menu to wander off into.",
        "A fast load time on mobile.",
        "Conversion tracking tested before launch.",
        "A thank-you page or message that confirms the next step.",
      ]),
      s("Keep the form short", [
        "Name, phone or email and one qualifying question are usually enough. You can ask the rest when you call back. Tell people what happens after they submit and how soon they will hear from you.",
      ]),
      s("Test one thing at a time", [
        "Once the page is live, test the headline first, then the offer, then the form. Change one element at a time so you know what made the difference.",
        "We review or build the landing page when we manage [Meta and Google Ads](/services#meta-google-ads), because the page decides what each click is worth.",
      ]),
    ],
    takeaway: "Match the page to the ad, remove distractions and make one action obvious. Then test and improve.",
    next: { label: "Get campaigns that convert", href: "/services#meta-google-ads" },
  },
  {
    slug: "signs-your-website-needs-a-redesign",
    category: "website-design-development",
    title: "Seven Signs Your Website Needs a Redesign (and How to Do It Safely)",
    description: "How to tell whether your website is holding the business back, and the steps that protect your rankings during a rebuild.",
    image: "/images/stock/brand-swatches.jpg",
    imageAlt: "Colour swatches and design sketches",
    date: "2026-09-08",
    intro:
      "Websites age. Phones change, your services change and customer expectations move on. A redesign is worth it when the site is costing you enquiries, not simply because you are tired of the look.",
    sections: [
      s("Seven signs", [], [
        "It is awkward to use on a phone.",
        "It loads slowly.",
        "Traffic arrives but enquiries do not.",
        "The content no longer describes what you sell.",
        "You cannot update it without calling someone.",
        "It looks dated next to competitors.",
        "It still carries template text, stock reviews or broken links.",
      ]),
      s("Start with goals, not colours", [
        "Write down what the new site must achieve: more bookings, better leads, fewer support calls. Those goals decide the structure, and the design follows from the structure.",
      ]),
      s("Protect your search rankings", ["A redesign can lose traffic if the old pages simply disappear. Before launch:"], [
        "List every existing URL and its traffic.",
        "Keep the same addresses where you can.",
        "Redirect each changed address to its new page.",
        "Carry over titles, descriptions and content that already rank.",
        "Submit the new sitemap in Google Search Console.",
      ]),
      s("Launch, then keep improving", [
        "Check forms, tracking, speed and mobile layouts on launch day. Watch Search Console for errors in the following weeks. Treat the launch as the starting point for testing and improvement.",
        "To see where your current site stands, run a [free audit](/website-audit) or read [what makes a website convert](/blog/what-makes-a-website-convert-visitors-into-enquiries).",
      ]),
    ],
    takeaway: "Redesign when the site is losing you business, plan it around goals and redirect every old address so your rankings survive.",
    next: { label: "Plan your redesign", href: "/services#website-design-development" },
  },
];
