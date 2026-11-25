// Public claims are based on the owner brief and reviewed source, not app marketing.
const primary = [
  {
    slug: "lwr-local",
    name: "LWR Local",
    featured: true,
    category: "Local guide",
    group: "Discovery",
    tone: "local",
    summary:
      "Find local businesses, services, and events around Lakewood Ranch, Florida, in one directory with a map.",
    sectionTitles: { process: "One listing, two views" },
    status: "In active development",
    liveUrl: "https://lwrlocal.com/",
    githubUrl: null,
    stack: ["Next.js", "React", "TypeScript", "Sanity"],
    features: [
      "Search for places and services",
      "Browse by category or on the map",
      "Read local guides and find events",
      "Browse comfortably on a phone",
    ],
    evidence:
      "Local package.json, app/page.tsx, app/explore/page.tsx, and components/ExploreExperience.tsx; public homepage reviewed.",
    media: {
      desktop: "/projects/lwr-local-desktop.webp",
      desktopSmall: "/projects/lwr-local-desktop-640.webp",
      mobile: "/projects/lwr-local-mobile.webp",
      alt: "LWR Local homepage for the Lakewood Ranch directory",
      caption: "LWR Local homepage, October 26, 2026.",
    },
    caseStudy: {
      problem:
        "Finding a local service or a nearby event can mean checking several sites. I wanted people in Lakewood Ranch to have one place to start.",
      role: "I built the directory and designed how people search, narrow down the results, and find places on the map.",
      architecture:
        "The Next.js app pulls listings from Sanity on the server. The React interface loads the map separately, so people can browse the list while the map loads.",
      process:
        "The list and the map use the same records. That gives me one place to update a listing when its details change.",
      challenges:
        "I keep listings in search even when I can’t confirm their location. Only places with coordinates get a pin.",
      results:
        "Open Explore to search for a business or service. You can also browse the local guides and events from the homepage.",
      next: "I’d like to verify more listings and see how easy it is to get from a search result to a business profile on a phone.",
    },
  },
  {
    slug: "bokigym",
    name: "BokiGym / Gym Master",
    featured: true,
    category: "Fitness app",
    group: "Fitness",
    tone: "gym",
    summary:
      "Browse exercises, put together a workout, and find fitness calculators in one place.",
    sectionTitles: { process: "Shared navigation" },
    status: "Public demo",
    liveUrl: "https://bokigym.netlify.app/",
    githubUrl: "https://github.com/bokigolic/exercise-app",
    sourcePath: "src/App.jsx",
    stack: ["React", "Vite", "Tailwind CSS", "Framer Motion", "React Router"],
    features: [
      "Exercise library",
      "Workout builder",
      "Fitness tools and calculators",
      "Profile screen",
    ],
    evidence:
      "Public exercise-app package.json and src/App.jsx; live homepage and navigation reviewed. AI output and saved progress are not asserted as verified.",
    media: {
      desktop: "/projects/bokigym-desktop.webp",
      desktopSmall: "/projects/bokigym-desktop-640.webp",
      mobile: "/projects/bokigym-mobile.webp",
      alt: "Gym Master homepage with links to exercises and the workout builder",
      caption: "Gym Master demo homepage, October 26, 2026.",
    },
    caseStudy: {
      problem:
        "I wanted a simple way to go from looking up an exercise to putting together a workout, without switching apps.",
      role: "I built BokiGym as a side project. I put together the React screens and decided how people move between them.",
      architecture:
        "React Router gives the exercise library, workout builder, fitness tools, assistant, and profile their own pages. Vite builds the app.",
      process:
        "The same menu stays in place as you move between exercises, workout tools, and your profile.",
      challenges:
        "Pages load when you open them. React’s lazy loading and Suspense handle the wait, and the app takes care of scroll position as you move around.",
      results:
        "From the demo homepage, you can browse exercises, open the workout builder, or try the calculators in the fitness hub.",
      next: "I want to test the exercise filters and workout setup from start to finish. The anatomy-guide route still needs to be completed.",
    },
  },
  {
    slug: "english-learning",
    name: "Be Fluent",
    featured: true,
    category: "English learning app",
    group: "Learning",
    tone: "fluent",
    summary:
      "An app for Serbian speakers who want to look up English words, practice grammar and vocabulary, and check their progress.",
    sectionTitles: { process: "Choosing a level" },
    status: "Public demo",
    liveUrl: "https://be-fluent.netlify.app/",
    githubUrl: "https://github.com/bokigolic/befluent",
    sourcePath: "src/App.jsx",
    stack: ["React", "Vite", "Zustand", "TanStack Query"],
    features: [
      "English–Serbian dictionary",
      "Lessons and practice",
      "Grammar topics",
      "Progress and profile",
    ],
    evidence:
      "Public befluent package.json and src/App.jsx; live onboarding reviewed. Detailed lesson counts and AI integrations are not asserted.",
    media: {
      desktop: "/projects/english-learning-desktop.webp",
      desktopSmall: "/projects/english-learning-desktop-640.webp",
      mobile: "/projects/english-learning-mobile.webp",
      alt: "Be Fluent dictionary and learning menu",
      caption: "Be Fluent after choosing a level, October 26, 2026.",
    },
    caseStudy: {
      problem:
        "Looking up a word is often just the start. I wanted Serbian speakers to be able to go straight from the dictionary to practice.",
      role: "I built Be Fluent and worked on what happens from the first visit through choosing a level and finding something to practice.",
      architecture:
        "I built the app with React and Vite. Zustand lets the learning and practice pages use the same settings. The profile and settings pages load when you open them.",
      process:
        "You pick a level on your first visit. From the main menu, you can go straight to practice, grammar, or your progress.",
      challenges:
        "I keep the selected level and preferences in one place so they stay the same when you move between sections.",
      results:
        "Pick a level in the demo, look up a word in the dictionary, or open the practice and progress pages.",
      next: "I’d like to test a full practice session and see what happens when someone comes back later or loses their connection.",
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
      "Clients can book online. Businesses and their clients have separate pages to manage appointments.",
    architecture:
      "The booking screens use React and Vite. The project also includes Supabase.",
    stack: ["React", "Vite", "Supabase"],
    liveUrl: "https://boki-book-easy.netlify.app/",
    githubUrl: "https://github.com/bokigolic/bookeasy",
    features: [
      "Online booking pages",
      "Appointment management",
      "Client management",
    ],
    sourcePath: "src/App.jsx",
  },
  {
    slug: "invoicepro",
    name: "InvoicePro",
    category: "Invoicing workspace",
    group: "Business tools",
    tone: "invoice",
    summary:
      "Keep track of clients, create and preview invoices, and review reports in one place.",
    architecture:
      "The project uses React and Vite and includes Supabase and jsPDF.",
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
      "A site for a Lakewood Ranch cleaning business. See what it cleans and ask for a quote.",
    architecture: "I built this site with HTML, CSS, and JavaScript.",
    stack: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://ivclean.netlify.app/",
    githubUrl: "https://github.com/bokigolic/IV-celan",
    features: [
      "Cleaning services",
      "Business contact details",
      "Quote inquiries",
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
      "Log walks and bike rides, track your weight, and see your personal records.",
    architecture:
      "The app uses HTML, CSS, and JavaScript, with Leaflet for maps.",
    stack: ["JavaScript", "HTML", "CSS", "Leaflet"],
    liveUrl: null,
    githubUrl: "https://github.com/bokigolic/fitpro",
    features: ["Walk and ride logs", "Weight history", "Personal records"],
    sourcePath: "index.html",
  },
];
export const projects = [
  ...primary,
  ...additional.map(({ architecture, ...p }) => ({
    ...p,
    featured: false,
    status: p.liveUrl ? "Public demo" : "Source available",
    media: null,
    caseStudy: { architecture },
  })),
];
export const featuredProjects = projects.filter((p) => p.featured);
