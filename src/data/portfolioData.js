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
  contactEmail: "hello@peaceorc.dev",
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
  "Web3 & FinTech",
  "Spatial & AI",
  "Design Systems"
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
    metrics: "3.2M+ Streams Visualized",
    description: "An experimental audio-reactive browser installation that transforms ambient audio frequencies into fluid 3D geometric particle landscapes at persistent 60 FPS.",
    challenge: "Rendering over 250,000 instanced audio-reactive mesh particles while keeping CPU usage under 12% across varied consumer mobile browsers.",
    solution: "Leveraged offscreen Web Workers for spectral Fast Fourier Transform (FFT) analysis and compiled custom vertex displacement GLSL shaders in Three.js.",
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
    metrics: "<12ms Render Latency",
    description: "A high-performance algorithmic trading interface engineered for crypto market makers and quantitative derivatives desks.",
    challenge: "Handling up to 8,000 tick updates per second without triggering DOM thrashing or memory garbage collection spikes.",
    solution: "Designed an in-memory double-buffered Canvas 2D engine that renders dynamic depth charts and order ladders with zero layout shifts.",
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
    metrics: "1,200+ Interactive Stars",
    description: "A developer toolkit and playground demonstrating how physical mechanics—gravity, friction, elasticity, and inertia—can elevate web navigation.",
    challenge: "Bridging mathematical Verlet physics integration with React component lifecycle events cleanly and declaratively.",
    solution: "Formulated a lightweight custom physics loop module (<4KB) that directly writes transform matrices to GPU compositing layers.",
    techStack: ["React 19", "HTML5 Canvas API", "Verlet Physics", "Lenis", "Vite"],
    liveUrl: "https://kinetic-foundry.example.com",
    githubUrl: "https://github.com/peaceorc/kinetic-foundry",
    featured: true,
  },
  {
    id: "chrono-editorial",
    title: "Chrono Typography Matrix",
    category: "Design Systems",
    year: "2023",
    client: "Chrono Press Berlin",
    tagline: "Avant-garde editorial publication system with dynamic optical sizing",
    accentColor: "#f43f5e", // Rose
    metrics: "100% Lighthouse Performance",
    description: "A fluid typography design system and reading experience tailored for modern architectural and high-fashion periodicals.",
    challenge: "Achieving seamless responsive leading and optical variable font axis transformations as the user scrolls at varied velocities.",
    solution: "Mapped Lenis scroll delta vectors to CSS variable font weight and optical axis properties with custom easing functions.",
    techStack: ["Next.js", "Framer Motion", "Lenis Scroll", "Variable Fonts", "Tailwind CSS"],
    liveUrl: "https://chrono-press.example.com",
    githubUrl: "https://github.com/peaceorc/chrono-editorial",
    featured: false,
  },
  {
    id: "synapse-canvas",
    title: "Synapse Node Workspace",
    category: "Spatial & AI",
    year: "2025",
    client: "Synapse AI Lab",
    tagline: "Infinite spatial canvas for visual multimodal AI pipeline construction",
    accentColor: "#fbbf24", // Amber
    metrics: "4.8/5 Developer Rating",
    description: "A visual programming environment that enables designers to link generative models, vision models, and code nodes into interactive pipelines.",
    challenge: "Providing 60 FPS panning, zooming, and bezier wire rerouting across thousands of nested canvas nodes.",
    solution: "Used spatial quadtree partitioning for viewport culling and decoupled node coordinate states into a zero-overhead observable store.",
    techStack: ["React 19", "Canvas API", "WebGL", "Framer Motion", "Tailwind CSS"],
    liveUrl: "https://synapse-canvas.example.com",
    githubUrl: "https://github.com/peaceorc/synapse-canvas",
    featured: true,
  }
];

export const playgroundPhysicsBadges = [
  { label: "React 19", category: "Core", color: "#61dafb" },
  { label: "Vite", category: "Build", color: "#bd34fe" },
  { label: "TypeScript", category: "Language", color: "#3178c6" },
  { label: "Tailwind CSS", category: "Style", color: "#38bdf8" },
  { label: "Lenis Scroll", category: "Motion", color: "#d9f99d" },
  { label: "Framer Motion", category: "Animation", color: "#ff0055" },
  { label: "Canvas API", category: "Graphics", color: "#f59e0b" },
  { label: "Web Audio API", category: "Audio", color: "#10b981" },
  { label: "Three.js / WebGL", category: "3D", color: "#a855f7" },
  { label: "Physics Engines", category: "Physics", color: "#ec4899" },
  { label: "Node.js", category: "Backend", color: "#22c55e" },
  { label: "Docker & Cloudflare", category: "Infra", color: "#f97316" }
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


