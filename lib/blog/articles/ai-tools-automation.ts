import { s, type Article } from "../types";

export const aiToolsAutomation: Article[] = [
  {
    slug: "ai-chatbots-for-whatsapp-lead-response",
    category: "ai-tools-automation",
    title: "AI Chat Agents for WhatsApp: Reply to Every Lead in Seconds",
    description: "How AI agents answer enquiries on WhatsApp and your website, what they should and should not handle, and how to set one up well.",
    image: "/images/stock/ai-robot.jpg",
    imageAlt: "Friendly robot representing an AI assistant",
    date: "2026-11-12",
    intro:
      "Enquiries arrive at night, on weekends and while your team is busy. An AI agent can reply at once, answer common questions and collect the details your team needs, so no lead is left waiting.",
    sections: [
      s("What an AI agent does", [
        "It reads the customer's message, replies in natural language using information you have given it, asks follow-up questions and passes the conversation to a person when needed. It is different from old menu-based bots that forced people to press 1 or 2.",
      ]),
      s("Good jobs for an agent", [], [
        "Answering questions on prices, hours, location and services.",
        "Qualifying a lead: what they need, when and where.",
        "Booking appointments into a calendar.",
        "Sending brochures, menus or location pins.",
        "Following up with people who went quiet.",
      ]),
      s("Jobs to keep with people", [
        "Complaints, negotiations, medical or legal advice and anything sensitive should go to a person quickly. A good setup makes the handover obvious and tells the customer that a team member is taking over.",
      ]),
      s("Setting one up properly", [], [
        "Write down your real questions and approved answers first.",
        "Use the official WhatsApp Business Platform, not unofficial tools.",
        "Tell customers they are chatting with an assistant.",
        "Connect it to your CRM or a spreadsheet so every lead is recorded.",
        "Review conversations weekly and improve the answers.",
      ]),
      s("What to expect", [
        "The main gain is speed. Leads who get an answer in seconds are far more likely to continue the conversation than those who wait hours. Your team spends its time on people who are ready to buy.",
        "We design and maintain these as part of [AI agents and automation](/services#ai-agents-automation).",
      ]),
    ],
    takeaway: "Let an AI agent handle first replies, common questions and booking, and hand sensitive conversations to a person without delay.",
    next: { label: "Explore AI agents", href: "/services#ai-agents-automation" },
  },
  {
    slug: "marketing-tasks-to-automate-first",
    category: "ai-tools-automation",
    title: "Seven Marketing Tasks to Automate First",
    description: "The repetitive jobs that are simple to automate and give a small team hours back every week.",
    image: "/images/stock/dashboard-laptop.jpg",
    imageAlt: "Laptop displaying automated reports",
    date: "2026-10-28",
    intro:
      "Automation is most useful on tasks that are frequent, rule-based and easy to forget. Start with these before attempting anything complicated.",
    sections: [
      s("The seven tasks", [], [
        "Instant replies to new enquiries, with a confirmation of what happens next.",
        "Saving every lead from forms, ads and WhatsApp into one sheet or CRM.",
        "Notifying the right team member when a lead arrives.",
        "Follow-up messages if a lead has not replied after a day or two.",
        "Appointment reminders to reduce no-shows.",
        "Review requests after a completed job.",
        "A weekly report of leads and spend sent to your inbox.",
      ]),
      s("How to choose where to start", [
        "List the tasks your team repeats every day. Mark the ones that follow the same steps each time and cause problems when missed. The first automation should save time within a week and be simple enough to understand at a glance.",
      ]),
      s("Tools that do the work", [
        "Workflow tools such as n8n, Make and Zapier connect your forms, ad platforms, WhatsApp, email and spreadsheets. We explain one of them in [n8n for small business](/blog/n8n-workflow-automation-for-small-business).",
      ]),
      s("Keep a person in the loop", [
        "Automate the routine and let people handle exceptions. Send alerts when something fails, check the logs weekly, and make sure customers can always reach a person.",
        "If you would like these built for you, see [AI agents and automation](/services#ai-agents-automation).",
      ]),
    ],
    takeaway: "Automate lead capture, replies, reminders and reports first. They are simple, low risk and pay back immediately.",
    next: { label: "Automate your follow-up", href: "/services#ai-agents-automation" },
  },
  {
    slug: "using-ai-for-content-without-losing-your-brand-voice",
    category: "ai-tools-automation",
    title: "Using AI for Content Without Losing Your Brand Voice",
    description: "AI tools speed up writing and design, but unedited output sounds like everyone else. How to keep your content recognisably yours.",
    image: "/images/stock/ai-abstract.jpg",
    imageAlt: "Abstract artificial intelligence artwork",
    date: "2026-10-13",
    intro:
      "ChatGPT, Claude, Gemini and Canva AI can produce a caption or a blog outline in seconds. The risk is that the result is generic. Used with a clear process, the same tools produce more content that still sounds like you.",
    sections: [
      s("Write a short voice guide", [
        "Describe how your brand speaks in a few lines: formal or friendly, the words you use and avoid, how you address customers. Add three or four examples of past posts you liked. Give this to the AI every time.",
      ]),
      s("Use AI for the right stages", [], [
        "Research and idea lists.",
        "Outlines and first drafts.",
        "Rewriting one piece for different platforms.",
        "Proofreading and shortening.",
        "Translating drafts for a native speaker to check.",
      ]),
      s("Always add what AI does not know", [
        "Your prices, your process, a real customer story, a photo from this week, an opinion formed from experience. These details are what make content useful and trustworthy, and they are what search engines and readers reward.",
      ]),
      s("Edit before you publish", [
        "Check every fact, figure and claim. AI tools can state incorrect information confidently. Remove filler phrases, shorten long sentences and read it aloud. If it does not sound like something your team would say, rewrite it.",
      ]),
      s("Be careful with images and video", [
        "Do not present AI-generated images as real results, real customers or real premises. Use AI visuals for concepts and backgrounds, and real photography for proof. Our [AI video and creative content](/services#ai-video-creative-content) work follows this rule.",
      ]),
    ],
    takeaway: "Give AI your voice and your facts, use it for drafts and variations, and have a person check and finish everything.",
    next: { label: "See AI creative services", href: "/services#ai-video-creative-content" },
  },
  {
    slug: "n8n-workflow-automation-for-small-business",
    category: "ai-tools-automation",
    title: "n8n for Small Business: Workflow Automation in Plain English",
    description: "What n8n is, how a workflow is put together and three starter workflows a small business can use straight away.",
    image: "/images/stock/code-laptop.jpg",
    imageAlt: "Laptop screen with a workflow open",
    date: "2026-09-24",
    intro:
      "n8n is a tool that connects your apps so that an event in one triggers actions in others. You build workflows visually by linking boxes together, with no programming needed for most tasks.",
    sections: [
      s("How a workflow works", [
        "Every workflow has a trigger and one or more actions. The trigger is the event that starts it, such as a new form submission. The actions are what happens next: add a row to a sheet, send a WhatsApp message, notify the team.",
      ]),
      s("Three starter workflows", [], [
        "New lead: form submitted, saved to a sheet, team notified, customer sent a confirmation.",
        "Missed follow-up: if a lead has had no update after 24 hours, remind the salesperson.",
        "Weekly summary: every Monday, collect last week's leads and ad spend and email a report.",
      ]),
      s("Adding AI to a workflow", [
        "n8n can pass text to an AI model in the middle of a workflow. Common uses are summarising a long enquiry, sorting leads by urgency and drafting a reply for a person to approve.",
      ]),
      s("n8n compared with Zapier and Make", [
        "All three do a similar job. Zapier is the simplest to begin with. Make offers more control at a lower cost per task. n8n is the most flexible and can be self-hosted, which keeps your data on your own server and makes costs predictable as volume grows.",
      ]),
      s("Things to get right", [
        "Name workflows clearly, add error alerts, store passwords and keys in the tool's credential manager and document what each workflow does. An automation nobody understands becomes a problem the day it breaks.",
        "We build and maintain n8n workflows as part of [AI agents and automation](/services#ai-agents-automation).",
      ]),
    ],
    takeaway: "Start with one trigger and two or three actions on a task you do every day. Add alerts and documentation from the first workflow.",
    next: { label: "Get a workflow built", href: "/services#ai-agents-automation" },
  },
  {
    slug: "ai-video-for-ads-what-works",
    category: "ai-tools-automation",
    title: "AI Video for Ads: What Works and What to Avoid",
    description: "Where AI video tools genuinely help advertisers, where they fall short and how to combine them with real footage.",
    image: "/images/stock/video-editing.jpg",
    imageAlt: "Video being edited on a computer",
    date: "2026-09-12",
    intro:
      "AI video tools have improved quickly. They can turn a script into a short clip, add voiceover and produce many versions of one ad. They work best as a support for real footage.",
    sections: [
      s("Where AI video helps", [], [
        "Producing several versions of an ad to test hooks and openings.",
        "Subtitles and translation into Arabic and other languages.",
        "Voiceover for explainers and product demos.",
        "Motion graphics and animated product shots.",
        "Resizing one video for stories, feeds and YouTube.",
      ]),
      s("Where it falls short", [
        "People buy from people. Fully generated faces and scenes can feel artificial, and viewers notice. For restaurants, clinics, property and anything where trust depends on what is real, genuine footage of your place and team performs better.",
      ]),
      s("A workflow that combines both", [
        "Film real footage once, in a batch. Use AI tools to cut it into many versions, add captions, test different first lines and adapt it for each platform. You get the credibility of real video with the volume of AI.",
      ]),
      s("Stay honest and on the right side of the rules", [
        "Do not use AI to show results that did not happen, people who do not exist as customers or a likeness of anyone without permission. Ad platforms have their own policies on altered and generated media, so check them before launch.",
      ]),
      s("Measure what the versions teach you", [
        "Test three or four openings against each other and keep the winner. The lesson, such as which problem or phrase catches attention, is as valuable as the ad. We run this process in [AI video and creative content](/services#ai-video-creative-content) alongside [paid ads](/services#meta-google-ads).",
      ]),
    ],
    takeaway: "Use AI to multiply and adapt real footage. Keep people and places genuine, and let testing decide which version runs.",
    next: { label: "Create more ad video", href: "/services#ai-video-creative-content" },
  },
];
