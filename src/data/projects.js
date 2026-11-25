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
      detail: {
        desktop: "/projects/lwr-local-detail.webp",
        desktopSmall: "/projects/lwr-local-detail-640.webp",
        height: 900,
        alt: "LWR Local directory search results alongside a map of Lakewood Ranch",
        caption:
          "Directory results and map for a park search. Map © OpenStreetMap contributors.",
      },
      alt: "LWR Local homepage for the Lakewood Ranch directory",
      caption: "LWR Local homepage, October 26, 2026.",
    },
    caseStudy: {
      problem:
        "Finding a local service or a nearby event can mean checking several sites. I wanted people in Lakewood Ranch to have one place to start.",
      role: "I built the directory and its search, category filters, and map. I also worked on how the listings are organized so they can be maintained in Sanity.",
      architecture:
        "Next.js loads the listings from Sanity on the server and renders the directory with React and TypeScript. The interactive map loads separately in the browser, so the list can appear before the map is ready.",
      process:
        "The list and the map use the same records. That gives me one place to update a listing when its details change.",
      challenges:
        "Listings without confirmed coordinates still show up in search. I only place a pin when I have coordinates.",
      results:
        "The public Explore page shows filtered directory results, with map pins for entries that have coordinates. Local guides and events are available from the homepage.",
      next: "The directory is in active development. The next pass focuses on checking more listings and making it easier to open business profiles from search results on a phone.",
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
      detail: {
        desktop: "/projects/bokigym-detail.webp",
        desktopSmall: "/projects/bokigym-detail-640.webp",
        height: 800,
        alt: "Gym Master workout setup with four goal options and the remaining steps listed above",
        caption: "Workout setup, starting with goal selection.",
      },
      alt: "Gym Master homepage with links to exercises and the workout builder",
      caption: "Gym Master demo homepage, October 26, 2026.",
    },
    caseStudy: {
      problem:
        "I wanted to bring exercise browsing and workout setup into one app, so the two tasks can follow naturally from the same navigation.",
      role: "I built BokiGym as a side project. I organized its React screens for browsing exercises, setting up a workout, and looking up fitness tools.",
      architecture:
        "React Router gives the exercise library, workout builder, fitness tools, assistant, and profile their own pages. Vite builds the app.",
      process:
        "The same menu stays in place across exercises, workout tools, and the profile, so each section remains easy to reach.",
      challenges:
        "Each route loads its screen on demand through React lazy loading and Suspense. That keeps the workout setup and other tools out of the initial page bundle, while a shared loading indicator covers the wait.",
      results:
        "The public demo’s Workout Generator walks through choices like goal, level, equipment, and available time. The case-study screenshot captures the first step.",
      next: "The anatomy guide is still in development. Full workout plans still need an end-to-end check.",
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
      detail: {
        desktop: "/projects/english-learning-detail.webp",
        desktopSmall: "/projects/english-learning-detail-640.webp",
        height: 800,
        alt: "Be Fluent Practice screen with grammar, idiom, and vocabulary quiz options",
        caption: "The Practice menu after selecting a learning level.",
      },
      alt: "Be Fluent dictionary and learning menu",
      caption: "Be Fluent after choosing a level, October 26, 2026.",
    },
    caseStudy: {
      problem:
        "Looking up a word is often just the start. I wanted Serbian speakers to be able to go straight from the dictionary to practice.",
      role: "I built Be Fluent and designed the path from choosing a level to opening the dictionary or finding a practice activity.",
      architecture:
        "I built the app with React and Vite. Zustand lets the learning and practice pages use the same settings. The profile and settings pages load when you open them.",
      process:
        "On the first visit, learners choose a level. The main menu then gives them direct access to the dictionary, lessons, practice, and progress.",
      challenges:
        "I keep the selected level and preferences in Zustand. The learning and practice screens can use the same settings without asking learners to make the same choices again.",
      results:
        "The public demo opens a dictionary after level selection. The Practice screen offers separate grammar, idiom, and vocabulary quizzes, alongside the progress view in the main menu.",
      next: "Next is a closer look at how the practice session resumes after a break or a lost connection.",
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
