const existingProjects = [
  {
    slug: "lwr-local",
    name: "LWR Local",
    shortName: "LWR",
    category: "Local discovery platform",
    featuredLabel: "Flagship product",
    summary:
      "A local discovery platform for finding businesses, services, places, local guides, and curated events.",
    status: "In development",
    facts: {
      verified: [
        {
          label: "Product direction",
          value:
            "Local discovery across businesses, services, places, guides, and events",
          source: "Owner-provided project description",
        },
      ],
      needsVerification: [
        "Current feature set and user journeys",
        "Technology stack and architecture",
        "Your exact role and project timeline",
        "Screenshots, live URL, outcomes, and metrics",
      ],
    },
    caseStudy: {
      challenge: null,
      responsibilities: [],
      technicalApproach: [],
      functionality: [],
      evidence: [],
      futureImprovements: [],
    },
    media: {
      type: "placeholder",
      label: "LWR Local product screenshots pending",
    },
  },
  {
    slug: "bokigym",
    name: "BokiGym / Gym Master",
    shortName: "BG",
    category: "Fitness application",
    featuredLabel: "Personal product",
    summary:
      "A fitness application concept covering exercise discovery, workout planning, profiles, progress tracking, and anatomy-related learning.",
    status: "In development",
    facts: {
      verified: [
        {
          label: "Product direction",
          value: "Fitness, workout planning, progress, and anatomy education",
          source: "Owner-provided project description",
        },
      ],
      needsVerification: [
        "Which listed features are implemented and usable today",
        "Technology stack and architecture",
        "Your exact role and project timeline",
        "Screenshots, live URL, outcomes, and metrics",
      ],
    },
    caseStudy: {
      challenge: null,
      responsibilities: [],
      technicalApproach: [],
      functionality: [],
      evidence: [],
      futureImprovements: [],
    },
    media: {
      type: "placeholder",
      label: "BokiGym / Gym Master screenshots pending",
    },
  },
  {
    slug: "english-learning",
    name: "English Learning App",
    shortName: "EN",
    category: "Learning application",
    featuredLabel: "Personal product",
    summary:
      "A personal English-learning application. Product details are being verified before publication.",
    status: "Details to verify",
    facts: {
      verified: [],
      needsVerification: [
        "Implemented functionality and learner flows",
        "Technology stack and architecture",
        "Your exact role and project timeline",
        "Screenshots, live URL, outcomes, and metrics",
      ],
    },
    caseStudy: {
      challenge: null,
      responsibilities: [],
      technicalApproach: [],
      functionality: [],
      evidence: [],
      futureImprovements: [],
    },
    media: {
      type: "placeholder",
      label: "English Learning App screenshots pending",
    },
  },
];

// Live URLs come from project READMEs, source, or owner confirmation.
// Leave liveUrl empty until the deployment is identified; never guess a hostname.
const showcaseProjects = [
  {
    slug: "english-learning",
    name: "Be Fluent",
    shortName: "Bf.",
    category: "Language learning",
    group: "Learning",
    accent: "#7054c8",
    tone: "fluent",
    tagline: "A little practice. A bigger vocabulary.",
    summary:
      "An English-learning app for Serbian speakers, bringing vocabulary, dictionary search, saved words, and daily learning goals into one place.",
    repo: "befluent",
    liveUrl: "https://be-fluent.netlify.app/",
    stack: ["React", "Vite", "JavaScript", "PWA"],
    features: [
      "Dictionary & vocabulary",
      "Saved words",
      "Daily learning goals",
    ],
    sourcePath: "README.md",
  },
  {
    slug: "bokigym",
    name: "BokiGym",
    shortName: "BG/",
    group: "Fitness",
    category: "Fitness & education",
    accent: "#cbff72",
    tone: "gym",
    tagline: "Understand movement. Build your routine.",
    summary:
      "A fitness application connecting exercise discovery, muscle anatomy, workout generation, and a personal fitness hub.",
    repo: "exercise-app",
    liveUrl: "https://bokigym.netlify.app/",
    stack: ["React", "Vite", "Firebase", "Recharts"],
    features: [
      "Exercise discovery",
      "Workout generator",
      "Fitness hub & profiles",
    ],
    sourcePath: "src/App.jsx",
  },
  {
    slug: "iv-clean",
    name: "IV Clean",
    shortName: "iv.",
    group: "Websites",
    category: "Local service website",
    accent: "#5ec8d6",
    tone: "clean",
    tagline: "A local business. A clearer presence.",
    summary:
      "A service website presenting carpet, tile, upholstery, and floor cleaning for a Lakewood Ranch business, with service information and estimate inquiries.",
    repo: "IV-celan",
    liveUrl: "https://ivclean.netlify.app/",
    stack: ["HTML", "CSS", "JavaScript", "Netlify"],
    features: [
      "Service presentation",
      "Local business information",
      "Estimate inquiries",
    ],
    sourcePath: "index.html",
  },
  {
    slug: "bookeasy",
    name: "BookEasy",
    shortName: "be/",
    group: "Business tools",
    category: "Booking application",
    accent: "#9e8aff",
    tone: "booking",
    tagline: "Less back and forth. More bookings.",
    summary:
      "A booking application with public booking pages and separate business and client areas for appointments, services, and client management.",
    repo: "bookeasy",
    liveUrl: "https://boki-book-easy.netlify.app/",
    stack: ["React", "Vite", "Supabase", "Tailwind CSS"],
    features: [
      "Public booking pages",
      "Appointment management",
      "Business & client areas",
    ],
    sourcePath: "src/App.jsx",
  },
  {
    slug: "invoicepro",
    name: "InvoicePro",
    shortName: "ip.",
    group: "Business tools",
    category: "Invoicing application",
    accent: "#f0b56d",
    tone: "invoice",
    tagline: "From client work to a clear invoice.",
    summary:
      "An invoicing application with client management, invoice creation and previews, public invoice links, and reporting pages.",
    repo: "invoicepro",
    liveUrl: "https://boki-invoice-pro.netlify.app/",
    stack: ["React", "Vite", "Supabase", "jsPDF"],
    features: ["Clients & invoices", "Invoice previews", "Reporting"],
    sourcePath: "src/App.jsx",
  },
  {
    slug: "fitpro",
    name: "FitPro",
    shortName: "FP+",
    group: "Fitness",
    category: "Activity tracking",
    accent: "#00e87a",
    tone: "fitpro",
    tagline: "Every walk. Every ride. Your progress.",
    summary:
      "A fitness web app with walking and cycling sessions, weight history, personal records, and installable app support.",
    repo: "fitpro",
    liveUrl: null,
    stack: ["JavaScript", "HTML", "CSS", "Leaflet"],
    features: [
      "Walking & cycling sessions",
      "Weight history",
      "Personal records",
    ],
    sourcePath: "index.html",
  },
];

export const projects = [
  ...showcaseProjects.map((project) => ({
    ...project,
    githubUrl: `https://github.com/bokigolic/${project.repo}`,
    status: project.liveUrl ? "Live on Netlify" : "Source available",
    media: { type: "identity", label: project.tagline },
    facts: { verified: [], needsVerification: [] },
    caseStudy: {
      functionality: project.features,
      technicalApproach: [`Built with ${project.stack.join(", ")}.`],
    },
  })),
  // Retain the existing flagship concept without implying a deployment exists.
  {
    ...existingProjects[0],
    group: "In progress",
    accent: "#a5ad83",
    tone: "local",
    tagline: "Discover the places around you.",
    stack: [],
    features: [],
    githubUrl: null,
    liveUrl: null,
  },
];

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug) ?? null;
}

// Portfolio presentation titles retain the product brands and stable route slugs.
const presentations = {
  bokigym: {
    title: "BokiGym",
    descriptor: "Fitness, with understanding.",
    order: 1,
  },
  bookeasy: {
    title: "BookEasy",
    descriptor: "A simpler way to get booked.",
    order: 2,
  },
  invoicepro: {
    title: "InvoicePro",
    descriptor: "Less admin. More clarity.",
    order: 3,
  },
  "english-learning": {
    title: "Be Fluent",
    descriptor: "Make learning a daily habit.",
    order: 4,
  },
  "iv-clean": {
    title: "IV Clean",
    descriptor: "A clear path from search to service.",
    order: 5,
  },
};
for (const project of projects) {
  Object.assign(
    project,
    presentations[project.slug] ?? {
      title: project.name,
      descriptor: project.tagline,
      order: 99,
    },
  );
}
