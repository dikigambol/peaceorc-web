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
  "Creative Tech",
  "Web3 & FinTech"
];

export const projects = [
  {
    id: "neura-spatial",
    title: "Neura Spatial Engine",
    category: "Creative Tech",
    year: "2025",
    client: "Neura Labs Inc.",
    tagline: "Real-time generative 3D sound visualizer with GLSL spectral shaders",
    accentColor: "#d9f99d", // Acid lime
    image: "/projects/neura-spatial.jpg",
    metrics: "3.2M+ Streams Visualized",
    description: "An experimental audio-reactive browser installation that transforms ambient audio frequencies into fluid 3D geometric particle landscapes at persistent 60 FPS.",
    techStack: ["React 19", "Three.js", "Web Audio API", "GLSL Shaders", "Tailwind CSS"],
    liveUrl: "https://neura-spatial.example.com",
    githubUrl: "https://github.com/peaceorc/neura-spatial",
    featured: true,
  },
  {
    id: "aether-terminal",
    title: "Aether Liquidity Terminal",
    category: "Web3 & FinTech",
    year: "2024",
    client: "Aether Protocol",
    tagline: "Sub-millisecond institutional order book with high-density canvas streaming",
    accentColor: "#a855f7", // Electric purple
    image: "/projects/aether-terminal.jpg",
    metrics: "<12ms Render Latency",
    description: "A high-performance algorithmic trading interface engineered for crypto market makers and quantitative derivatives desks.",
    techStack: ["React", "TypeScript", "HTML5 Canvas", "WebSockets", "Tailwind CSS"],
    liveUrl: "https://aether-vault.example.com",
    githubUrl: "https://github.com/peaceorc/aether-terminal",
    featured: true,
  },
  {
    id: "kinetic-foundry",
    title: "Kinetic Physics Foundry",
    category: "Creative Tech",
    year: "2024",
    client: "Open Source / Lab",
    tagline: "Rigid-body 2D physics sandbox and micro-interaction laboratory",
    accentColor: "#38bdf8", // Sky blue
    image: "/projects/kinetic-foundry.jpg",
    metrics: "1,200+ Interactive Stars",
    description: "A developer toolkit and playground demonstrating how physical mechanics—gravity, friction, elasticity, and inertia—can elevate web navigation.",
    techStack: ["React 19", "HTML5 Canvas API", "Verlet Physics", "Lenis", "Vite"],
    liveUrl: "https://kinetic-foundry.example.com",
    githubUrl: "https://github.com/peaceorc/kinetic-foundry",
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
    tag: "01 // HYBRID DESIGN ENGINEER",
    name: "Diki",
    title: "Design Engineer & Systems Architect",
    role: "Creative Code, 3D Physics & UI/UX Architecture",
    accentColor: "#d9f99d", // Acid neon
    status: "Designing & Coding in Real-Time",
    statusColor: "#10b981",
    bio: "Fluidly bridges Figma prototypes with production code. Obsessed with 60 FPS physics engines, spatial interaction design, and resilient backend micro-architectures.",
    superpower: "Spatial UI/UX + 3D Physics & Scalable Systems",
    quote: "Design without code is just a still picture; code without design is just machine logic. We fuse both without compromise.",
    terminalPrompt: "peaceorc@core:~$ figma-tokens sync && cargo build --release",
    stack: ["Figma Systems", "React 19", "Three.js / WebGL", "Rust & Go", "Tailwind CSS"],
    designStack: ["Figma Systems", "3D / Spatial UI", "Interaction Specs", "Design Tokens"],
    codeStack: ["React 19", "Three.js / WebGL", "Rust & Go", "Docker", "Tailwind CSS"],
    social: { github: "https://github.com/peaceorc", x: "https://x.com/peaceorc" },
    initialHighFives: 218,
  },
  {
    id: "ridho",
    tag: "02 // HYBRID DESIGN ENGINEER",
    name: "Ridho",
    title: "Design Engineer & Product Architect",
    role: "Product Strategy, Design Systems & Full-Stack UI",
    accentColor: "#a855f7", // Electric violet
    status: "Architecting Tokens & Composable Code",
    statusColor: "#a855f7",
    bio: "Unites conversion-driven UX psychology and bespoke typography with modern component architecture, state management, and edge API engineering.",
    superpower: "Atomic Design Systems + Modern Full-Stack Web",
    quote: "When the designer also writes the production code, nothing ever gets lost in translation. The final build feels exactly as intended.",
    terminalPrompt: "partner@core:~$ npm test --components && figma --audit=wcag-aaa",
    stack: ["Design Systems", "TypeScript", "Next.js / React", "Conversion UX", "Framer Motion"],
    designStack: ["Design Systems", "Conversion UX", "Bespoke Typography", "Micro-Interactions"],
    codeStack: ["TypeScript", "Next.js / React", "Node & Edge APIs", "Framer Motion", "GraphQL/REST"],
    social: { github: "https://github.com", x: "https://x.com" },
    initialHighFives: 194,
  }
];


