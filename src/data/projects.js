// Public claims are based on the owner brief and reviewed source, not app marketing.
const primary = [
  {
    slug: "lwr-local",
    name: "LWR Local",
    featured: true,
    category: "Local discovery platform",
    group: "Discovery",
    tone: "local",
    summary:
      "A guide to Lakewood Ranch, Florida, with searchable local businesses and services, a map, and community guides.",
    status: "In active development",
    liveUrl: "https://lwrlocal.com/",
    githubUrl: null,
    stack: ["Next.js", "React", "TypeScript", "Sanity"],
    features: [
      "Searchable place and service directories",
      "Category filters and map-based discovery",
      "Local guides and selected events",
      "Responsive navigation and mobile layouts",
    ],
    evidence:
      "Local package.json, app/page.tsx, app/explore/page.tsx, and components/ExploreExperience.tsx; public homepage reviewed.",
    media: {
      desktop: "/projects/lwr-local-desktop.webp",
      desktopSmall: "/projects/lwr-local-desktop-640.webp",
      mobile: "/projects/lwr-local-mobile.webp",
      alt: "LWR Local homepage with its Lakewood Ranch discovery interface",
      caption: "Public homepage. Captured October 26, 2026.",
    },
    caseStudy: {
      problem:
        "Lakewood Ranch residents and visitors often have to check several sites to find a place, a service, or a local event. I wanted to give them one starting point.",
      role: "I developed the product and implemented the frontend, including the directory and the search, filters, and map in the explorer.",
      architecture:
        "Next.js App Router pages compose React components in TypeScript. Server pages load directory content from Sanity. The explore interface manages search, category filters, and selected places with React state; its map is loaded separately on the client.",
      process:
        "I separated page layout, directory data, and explorer controls so the same listings could support different ways of browsing.",
      challenges:
        "Listings without verified coordinates stay searchable in the directory. Only places with coordinates appear on the map.",
      results:
        "Visitors can look up businesses and services, filter listings by category, or browse local guides and events.",
      next: "I plan to verify more listings and test the path from search results to business profiles on smaller screens.",
    },
  },
  {
    slug: "bokigym",
    name: "BokiGym / Gym Master",
    featured: true,
    category: "Fitness web application",
    group: "Fitness",
    tone: "gym",
    summary:
      "A React fitness app that brings exercise browsing, a workout generator interface, and fitness calculators into one place.",
    status: "Public demo",
    liveUrl: "https://bokigym.netlify.app/",
    githubUrl: "https://github.com/bokigolic/exercise-app",
    sourcePath: "src/App.jsx",
    stack: ["React", "Vite", "Tailwind CSS", "Framer Motion", "React Router"],
    features: [
      "Exercise browsing and discovery",
      "Workout generator interface",
      "Fitness hub and calculator interfaces",
      "Profile interface",
    ],
    evidence:
      "Public exercise-app package.json and src/App.jsx; live homepage and navigation reviewed. AI output and saved progress are not asserted as verified.",
    media: {
      desktop: "/projects/bokigym-desktop.webp",
      desktopSmall: "/projects/bokigym-desktop-640.webp",
      mobile: "/projects/bokigym-mobile.webp",
      alt: "Gym Master fitness homepage showing exercise and workout navigation",
      caption: "Public demo homepage. Captured October 26, 2026.",
    },
    caseStudy: {
      problem:
        "I wanted to make it easier to move from looking up an exercise to planning a workout or using a fitness calculator.",
      role: "I built BokiGym as an independent project. This case study focuses on the React page structure, routing, and loading behavior.",
      architecture:
        "React Router defines the exercise, generator, hub, assistant, and profile pages. React lazy imports and Suspense split page code. Vite builds the app; Tailwind CSS and Framer Motion are declared in its package configuration.",
      process:
        "I kept the navigation in a shared layout so the exercise browser, workout tools, and profile use the same controls.",
      challenges:
        "The router loads feature pages on demand with a shared loading state. A scroll manager handles route changes and in-page links.",
      results:
        "The demo opens to the fitness homepage, with navigation to exercise browsing, the workout generator, and the fitness hub.",
      next: "I plan to test the exercise filters and workout flows end to end. The anatomy-guide route still needs to be completed.",
    },
  },
  {
    slug: "english-learning",
    name: "Be Fluent",
    featured: true,
    category: "English learning application",
    group: "Learning",
    tone: "fluent",
    summary:
      "An English-learning app for Serbian speakers, with dictionary lookup, grammar and vocabulary practice, and a progress view.",
    status: "Public demo",
    liveUrl: "https://be-fluent.netlify.app/",
    githubUrl: "https://github.com/bokigolic/befluent",
    sourcePath: "src/App.jsx",
    stack: ["React", "Vite", "Zustand", "TanStack Query"],
    features: [
      "English and Serbian dictionary interface",
      "Learning and practice pages",
      "Grammar category navigation",
      "Progress and profile screens",
    ],
    evidence:
      "Public befluent package.json and src/App.jsx; live onboarding reviewed. Detailed lesson counts and AI integrations are not asserted.",
    media: {
      desktop: "/projects/english-learning-desktop.webp",
      desktopSmall: "/projects/english-learning-desktop-640.webp",
      mobile: "/projects/english-learning-mobile.webp",
      alt: "Be Fluent English learning application with its learning navigation",
      caption:
        "Public learning interface after local onboarding. Captured October 26, 2026.",
    },
    caseStudy: {
      problem:
        "Looking up an unfamiliar word is often the first step. I wanted Serbian-speaking learners to have grammar and vocabulary practice close at hand.",
      role: "I built Be Fluent as an independent app. This case study focuses on onboarding, navigation, and how the learning screens share state.",
      architecture:
        "React and Vite form the application foundation. Zustand holds shared application state. The source includes separate learning and practice pages, grammar categories, and lazy-loaded progress, profile, and settings screens. TanStack Query is declared in the package configuration.",
      process:
        "Onboarding asks visitors to choose a learning level. The main navigation then gives them direct access to learning, practice, grammar, and progress.",
      challenges:
        "A shared store keeps learner preferences and the active learning section consistent across views. Secondary screens load on demand.",
      results:
        "The public demo includes level selection and an English–Serbian dictionary interface, along with learning, practice, and progress screens.",
      next: "I plan to test a complete grammar and vocabulary session, including what happens when a learner returns or loses their connection.",
    },
  },
];
const additional = [
  {
    slug: "bookeasy",
    name: "BookEasy",
    category: "Appointment booking",
    group: "Business tools",
    tone: "booking",
    summary:
      "Public booking pages and business and client workspaces for managing appointments and services.",
    stack: ["React", "Vite", "Supabase"],
    liveUrl: "https://boki-book-easy.netlify.app/",
    githubUrl: "https://github.com/bokigolic/bookeasy",
    features: ["Booking pages", "Appointments", "Client management"],
    sourcePath: "src/App.jsx",
  },
  {
    slug: "invoicepro",
    name: "InvoicePro",
    category: "Invoicing workspace",
    group: "Business tools",
    tone: "invoice",
    summary:
      "An invoicing application with client management, invoice creation, previews, and reporting pages.",
    stack: ["React", "Vite", "Supabase", "jsPDF"],
    liveUrl: "https://boki-invoice-pro.netlify.app/",
    githubUrl: "https://github.com/bokigolic/invoicepro",
    features: ["Clients and invoices", "Invoice previews", "Reports"],
    sourcePath: "src/App.jsx",
  },
  {
    slug: "iv-clean",
    name: "IV Clean",
    category: "Service business website",
    group: "Websites",
    tone: "clean",
    summary:
      "A local service website for carpet, tile, upholstery, and floor cleaning in Lakewood Ranch.",
    stack: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://ivclean.netlify.app/",
    githubUrl: "https://github.com/bokigolic/IV-celan",
    features: [
      "Service information",
      "Local business details",
      "Estimate inquiries",
    ],
    sourcePath: "index.html",
  },
  {
    slug: "fitpro",
    name: "FitPro",
    category: "Activity tracking",
    group: "Fitness",
    tone: "gym",
    summary:
      "A fitness web app with walking and cycling sessions, weight history, and personal records.",
    stack: ["JavaScript", "HTML", "CSS", "Leaflet"],
    liveUrl: null,
    githubUrl: "https://github.com/bokigolic/fitpro",
    features: ["Activity sessions", "Weight history", "Personal records"],
    sourcePath: "index.html",
  },
];
export const projects = [
  ...primary,
  ...additional.map((p) => ({
    ...p,
    featured: false,
    status: p.liveUrl ? "Public demo" : "Source available",
    media: null,
    caseStudy: {
      architecture: `Reviewed project configuration includes ${p.stack.join(", ")}.`,
    },
  })),
];
export const featuredProjects = projects.filter((p) => p.featured);
export const additionalProjects = projects.filter((p) => !p.featured);
export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug) ?? null;
}
