// Public claims are based on the owner brief and reviewed source, not app marketing.
const primary = [
  {
    slug: "lwr-local",
    name: "LWR Local",
    shortName: "LWR",
    featured: true,
    category: "Local discovery platform",
    group: "Discovery",
    previewFocus:
      "Compare the discovery homepage: navigation, search entry point, and content hierarchy at desktop and mobile widths.",
    tone: "local",
    accent: "#9ac2a4",
    tagline: "A place to find your place.",
    summary:
      "A discovery platform for Lakewood Ranch, Florida, bringing businesses, local services, places, guides, and selected community events into one experience.",
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
        "Local information is spread across separate sites and categories. This project brings place discovery and practical community resources into a consistent interface.",
      role: "Personal project: product development and frontend implementation. This review covers the available project source and public interface; no team size or commercial results are claimed.",
      architecture:
        "Next.js App Router pages compose React components in TypeScript. Server pages load directory content from Sanity. The explore interface manages search, category filters, and selected places with React state; its map is loaded separately on the client.",
      process:
        "The source separates page composition, directory data, and reusable explorer components. The public interface provides visual evidence of the homepage; directory behavior described here is supported by reviewed implementation.",
      challenges:
        "The directory includes resources without verified coordinates. The source keeps those records in the directory rather than inventing map pins, and loads the interactive map independently of server-rendered page content.",
      results:
        "A public homepage is available and the source includes working directory and discovery components. Usage, revenue, and traffic outcomes have not been measured for this case study.",
      next: "Continue validating directory content, review complete search and map journeys across devices, and capture additional directory and business-profile screens.",
    },
  },
  {
    slug: "bokigym",
    name: "BokiGym / Gym Master",
    shortName: "BG",
    featured: true,
    category: "Fitness web application",
    group: "Fitness",
    previewFocus:
      "Inspect the fitness homepage and its navigation to exercise browsing and workout tools across screen sizes.",
    tone: "gym",
    accent: "#c8df93",
    tagline: "Train with a little more understanding.",
    summary:
      "A fitness application connecting exercise discovery, workout generation, and personal fitness tools in a responsive React experience.",
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
        "Exercise browsing, workout planning, and personal fitness tools often live in separate places. BokiGym connects these areas through one application shell.",
      role: "Personal fitness application. The implementation reviewed here covers React page composition, routing, and the project dependency configuration; exact development dates and wider contribution scope remain undocumented.",
      architecture:
        "React Router defines the exercise, generator, hub, assistant, and profile pages. React lazy imports and Suspense split page code. Vite builds the app; Tailwind CSS and Framer Motion are declared in its package configuration.",
      process:
        "A shared page shell provides navigation across separately loaded feature pages. Case-study claims are limited to reviewed source and visible demo behavior, rather than every feature advertised by the app.",
      challenges:
        "A feature-rich application can load more code than a visitor needs. The router uses lazy-loaded page components and a shared loading state. Its scroll manager also handles route changes and in-page anchors.",
      results:
        "The public fitness demo loads and exposes the documented navigation. No exercise-count, training-outcome, active-user, or AI-quality claims are included.",
      next: "Document complete exercise-filter and generated-workout journeys; independently test saved progress and assistant responses. The anatomy-guide route needs completion before anatomy education can be presented as implemented.",
    },
  },
  {
    slug: "english-learning",
    name: "Be Fluent",
    shortName: "BF",
    featured: true,
    category: "English learning application",
    group: "Learning",
    previewFocus:
      "Compare the English–Serbian dictionary screen: search controls, vocabulary cards, and mobile navigation.",
    tone: "fluent",
    accent: "#d8b58c",
    tagline: "Small moments. A growing vocabulary.",
    summary:
      "An English-learning application for Serbian speakers, combining dictionary lookup, learning and practice sections, and a personal progress interface.",
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
        "Language learning benefits from a short path between looking up a word and practicing it. This application brings dictionary, learning, and practice areas together for Serbian-speaking learners.",
      role: "Personal educational application. The reviewed materials establish the app structure and public interface; they do not establish a formal project timeline or measured learning outcomes.",
      architecture:
        "React and Vite form the application foundation. Zustand holds shared application state. The source includes separate learning and practice pages, grammar categories, and lazy-loaded progress, profile, and settings screens. TanStack Query is declared in the package configuration.",
      process:
        "Onboarding introduces the learning level before the main interface. Feature code is grouped into learning, practice, grammar, and progress areas, with common navigation around them.",
      challenges:
        "Learner preferences and active learning sections are shared across multiple views. The app centralizes those values in a store and loads some secondary screens on demand. Offline and AI behavior need separate end-to-end verification.",
      results:
        "The public application and onboarding are accessible. Reviewed code supports the documented learning areas. No retention, fluency improvement, lesson completion, or user-growth metrics are claimed.",
      next: "Capture and test a complete grammar and vocabulary practice session, verify persistence and offline recovery, and document any AI dependency before expanding the case study.",
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
    tagline: p.category,
    status: p.liveUrl ? "Public demo" : "Source available",
    media: null,
    caseStudy: {
      architecture: `Reviewed project configuration includes ${p.stack.join(", ")}.`,
      next: "A detailed implementation walkthrough and additional visual evidence have not yet been documented.",
    },
  })),
];
export const featuredProjects = projects.filter((p) => p.featured);
export const additionalProjects = projects.filter((p) => !p.featured);
export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug) ?? null;
}
