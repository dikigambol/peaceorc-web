export const personalInfo = {
  name: "PEACEORC",
  handle: "@peaceorc",
  title: "Creative Technologist & Interaction Designer",
  status: "Available for Q2/Q3 Projects",
  statusAvailable: true,
  location: "Jakarta, ID",
  timezone: "Asia/Jakarta",
  tagline: "Architecting tactile digital experiences, physics-driven interactions, and resilient modern web systems.",
  editorialBio: "Operating at the intersection of graphic precision and computer graphics. Every pixel carries intent; every interaction responds with weight, momentum, and tactile delight.",
  contactEmail: "peaceorc@gmail.com",
  stats: [
    { label: "Years Experience", value: "6+" },
    { label: "Shipped Projects", value: "35+" },
    { label: "Lighthouse Score", value: "98+" },
    { label: "Satisfaction Rate", value: "10/10" },
  ],
  socials: [
    { name: "GitHub", url: "https://github.com/peaceorc", handle: "github/peaceorc" },
    { name: "LinkedIn", url: "https://linkedin.com/in/peaceorc", handle: "linkedin/peaceorc" },
    { name: "X (Twitter)", url: "https://x.com/peaceorc", handle: "@peaceorc" },
    { name: "ReadCV", url: "https://read.cv/peaceorc", handle: "read.cv/peaceorc" },
  ]
};

export const projectCategories = [
  "All",
  "Experimental"
];

export const projects = [
  {
    id: "ami-red-flag",
    title: "Am I The Red Flag?",
    category: "Experimental",
    subCategory: "AI Behavioral Simulator",
    year: "2026",
    client: "Peaceorc Lab",
    tagline: "AI-driven WhatsApp behavioral chat simulator for psychological dynamics, empathy, and emotional analysis",
    accentColor: "#f43f5e", // Rose / Red Flag
    image: "/projects/ami-redflag.jpg",
    metrics: "1,200+ Assessment Sessions",
    description: "An interactive AI chat simulator engineered to test emotional maturity, empathy, and interpersonal responses in real-time WhatsApp scenario dialogues with exportable digital ID report cards.",
    techStack: ["AI Simulation", "JavaScript", "HTML5 Canvas", "Google Auth", "Dynamic Viewport", "Tailwind CSS"],
    liveUrl: "https://ami.peaceorc.web.id",
    githubUrl: "https://github.com/peaceorc",
    featured: true,
  },
  {
    id: "peace-oracle",
    title: "Peace Oracle",
    category: "Experimental",
    subCategory: "WebGL Cosmic Portal",
    year: "2026",
    client: "Peaceorc Lab",
    tagline: "Cosmic destiny portal featuring real-time WebGL space environments, Western Zodiac & Eastern Shio",
    accentColor: "#a855f7", // Cosmic Purple
    image: "/projects/neura-spatial.jpg",
    metrics: "WebGL 60 FPS Canvas",
    description: "An experiential astronomical gateway fusing ancient esoteric divination with real-time WebGL planetary canvas shaders and interactive celestial navigation.",
    techStack: ["WebGL", "Three.js / Canvas", "Space Grotesk", "JavaScript", "CSS 3D Motion"],
    liveUrl: "https://oracle.peaceorc.web.id",
    githubUrl: "https://github.com/peaceorc",
    featured: true,
  },
  {
    id: "kriptoyoi",
    title: "KriptoYoi",
    category: "Experimental",
    subCategory: "Crypto Radar & Telemetry",
    year: "2026",
    client: "Peaceorc Lab",
    tagline: "Sub-millisecond cryptocurrency trading terminal & radar telemetry with live Tokocrypto WebSocket streams",
    accentColor: "#10b981", // Emerald
    image: "/projects/aether-terminal.jpg",
    metrics: "<10ms WebSocket Stream",
    description: "High-density crypto intelligence dashboard streaming live tickers, TradingView Lightweight Charts, and real-time algorithmic radar signals.",
    techStack: ["WebSockets", "Lightweight Charts", "Vanilla JS", "Live Telemetry", "HUD UI"],
    liveUrl: "https://kriptoyoi.peaceorc.web.id",
    githubUrl: "https://github.com/peaceorc",
    featured: true,
  }
];

export const playgroundPhysicsBadges = [
  // AI Engineering & LLMs
  { label: "Claude 3.7", category: "AI Tools", color: "#d97706" },
  { label: "Cursor AI", category: "AI Tools", color: "#38bdf8" },
  { label: "OpenAI GPT-4o", category: "AI Tools", color: "#10b981" },
  { label: "v0 by Vercel", category: "AI Tools", color: "#e4e4e7" },
  { label: "LangChain", category: "AI Tools", color: "#06b6d4" },

  // Frontend Core & 3D
  { label: "React 19", category: "Frontend", color: "#61dafb" },
  { label: "Next.js 15", category: "Fullstack", color: "#f4f4f5" },
  { label: "TypeScript", category: "Language", color: "#3178c6" },
  { label: "Tailwind CSS v4", category: "Styling", color: "#38bdf8" },
  { label: "Three.js / WebGL", category: "3D Graphics", color: "#a855f7" },
  { label: "Framer Motion", category: "Animation", color: "#ff0055" },
  { label: "Canvas 2D / Shaders", category: "Graphics", color: "#f59e0b" },

  // Backend & Systems
  { label: "Rust", category: "Systems", color: "#ea580c" },
  { label: "Go", category: "Backend", color: "#00add8" },
  { label: "Node.js / Bun", category: "Runtime", color: "#22c55e" },
  { label: "PostgreSQL", category: "Database", color: "#336791" },
  { label: "Supabase", category: "BaaS", color: "#3ecf8e" },
  { label: "Redis", category: "Cache", color: "#ef4444" },

  // Design Systems & DevOps
  { label: "Figma Systems", category: "UI/UX", color: "#a259ff" },
  { label: "Design Tokens", category: "Design", color: "#d9f99d" },
  { label: "Docker", category: "DevOps", color: "#0db7ed" },
  { label: "Cloudflare Workers", category: "Edge", color: "#f97316" }
];

export const devFrameworkSteps = [
  "PRODUCT BLUEPRINT", "SYSTEM SCHEMA", "UX JOURNEY", "API CONTRACT", "TECH SCOPING",
  "ATOMIC TOKENS", "FIGMA SYNC", "TACTILE UI", "STATE MACHINES", "DESIGN SYSTEM",
  "AI PAIRING", "TYPE SAFETY", "CLEAN ARCH", "CI/CD PIPELINE", "UNIT TESTS",
  "60FPS PERF", "EDGE CACHING", "WCAG AAA", "ZERO DOWNTIME", "OBSERVABILITY"
];

export const experiences = [
  {
    period: "2024 — Present",
    role: "Lead Creative Technologist",
    company: "Studio Nexus",
    location: "Remote / Hybrid",
    description: "Spearheading the engineering of interactive digital products, avant-garde design systems, and web graphics pipelines for global brand clients.",
    highlights: [
      "Architected bespoke physics-enabled canvas modules delivering 60 FPS across desktop & mobile devices.",
      "Established company-wide performance budgets resulting in 95+ average Lighthouse scores.",
      "Mentored 6 engineers in creative frontend development and shader mathematics."
    ],
    skills: ["React 19", "WebGL", "Framer Motion", "Tailwind CSS", "Architecture"]
  },
  {
    period: "2022 — 2024",
    role: "Senior Interaction Engineer",
    company: "Kinetic Media Group",
    location: "Jakarta, ID",
    description: "Engineered experiential web installations, micro-interaction suites, and real-time data visualization platforms.",
    highlights: [
      "Built real-time audio reactive web experiences visited by over 1.5 million users.",
      "Integrated Lenis smooth scrolling and magnetic spring micro-interactions across 18 high-profile projects.",
      "Reduced bundle footprint by 42% through aggressive tree-shaking and dynamic code-splitting."
    ],
    skills: ["TypeScript", "Canvas 2D", "Three.js", "WebSockets", "CSS Motion"]
  },
  {
    period: "2020 — 2022",
    role: "Frontend Systems Developer",
    company: "Vertex Technologies",
    location: "Jakarta, ID",
    description: "Developed mission-critical web applications, financial dashboards, and accessible component design libraries.",
    highlights: [
      "Designed and maintained an institutional design system utilized across 12 product squads.",
      "Achieved full WCAG 2.1 AA accessibility compliance across core client portal workflows.",
      "Pioneered automated visual regression testing pipeline with zero downtime releases."
    ],
    skills: ["React", "JavaScript", "Design Systems", "Web Performance", "Jest/Cypress"]
  }
];

export const capabilities = [
  {
    title: "Creative Frontend Engineering",
    description: "Building responsive, editorial, and tactile user interfaces with React, modern CSS, and fluid spring animations."
  },
  {
    title: "Physics & Canvas Visuals",
    description: "Simulating 2D/3D physics, particle systems, collision mechanics, and interactive micro-games directly in the browser."
  },
  {
    title: "Performance & Architecture",
    description: "Ensuring 60 FPS rendering, zero layout shifts, ultra-lean bundles (<150KB initial JS), and 95+ Lighthouse scores."
  },
  {
    title: "Design System Architecture",
    description: "Bridging the gap between Figma design precision and production code with composable, tokenized UI component libraries."
  }
];

export const teamMembers = [
  {
    id: "diki",
    tag: "01 // CREATIVE DEVELOPER & ARCHITECT",
    name: "Diki",
    avatar: "/devs/diki.jpg",
    title: "Design Engineer & Systems Architect",
    role: "Creative Code, 3D Physics & UI/UX Architecture",
    accentColor: "#d9f99d", // Acid neon
    status: "Designing & Coding in Real-Time",
    statusColor: "#10b981",
    bio: "Fluidly bridges Figma prototypes with production code. Obsessed with 60 FPS physics engines, spatial interaction design, and resilient backend micro-architectures.",
    superpower: "Spatial UI/UX + 3D Physics & Scalable Systems",
    quote: "Design without code is just a still picture; code without design is just machine logic. I fuse both without compromise.",
    terminalPrompt: "peaceorc@core:~$ figma-tokens sync && cargo build --release",
    stack: ["Figma Systems", "React 19", "Three.js / WebGL", "Rust & Go", "Tailwind CSS"],
    designStack: ["Figma Systems", "3D / Spatial UI", "Interaction Specs", "Design Tokens"],
    codeStack: ["React 19", "Three.js / WebGL", "Rust & Go", "Docker", "Tailwind CSS"],
    social: { github: "https://github.com/peaceorc", x: "https://x.com/peaceorc" },
    initialHighFives: 218,
  }
];


