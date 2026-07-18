// ─────────────────────────────────────────────────────────────
// All site copy lives here. Replace the placeholder values with
// your real name, roles, history, and links — every component
// pulls from this file, so this is the only place you need to
// touch to personalize the site.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Rahmat Dawood", // TODO: replace with your real name
  role: "Medical Laboratory Scientist · Founder · Researcher",
  tagline:
    "I study what's under the microscope, and I build what people wear with pride. Precision and beauty are the same discipline to me.",
  location: "Lagos, Nigeria",
  email: "hello@rahmatdawood.com",
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Twitter / X", href: "https://twitter.com" },
  ],
};

export const about = {
  paragraphs: [
    "I trained as a Medical Laboratory Scientist because I wanted to work in a field where being right actually matters — where precision protects people. That discipline has never left me, even as my path widened.",
    "Outside the lab, I've built and led teams in sales, marketing, and management, and eventually started my own company. Somewhere along the way I stopped seeing “scientist” and “entrepreneur” as two different people I had to be.",
    "Today I run a luxury abaya and scarf business alongside my clinical and research work — one grounded in rigor, the other in craft and beauty. Both demand the same things from me: attention to detail, patience, and an unwillingness to ship anything I'm not proud of.",
  ],
  quote: "Precision is a mindset, not a profession.",
};

export const skillColumns = {
  scientific: {
    label: "Scientific & Analytical",
    color: "lab",
    items: [
      "Clinical Laboratory Diagnostics",
      "Hematology & Microbiology",
      "Quality Control & Assurance",
      "Research Design & Data Analysis",
      "Regulatory Compliance",
      "Lab Information Systems",
    ],
  },
  creative: {
    label: "Creative & Business",
    color: "silk",
    items: [
      "Brand & Product Development",
      "Sales & Client Relationships",
      "Marketing Strategy",
      "Luxury Retail Merchandising",
      "Team Leadership",
      "E-commerce Operations",
    ],
  },
  intersection: {
    label: "The Intersection",
    items: [
      "Strategic Thinking",
      "Storytelling",
      "Process Design",
      "People Management",
    ],
  },
};

export const experience = [
  {
    year: "2024 — Present",
    role: "Founder & Creative Director",
    org: "Luxury Abaya & Scarf Atelier",
    category: "business",
    description:
      "Built a boutique fashion label from concept to customer — sourcing, design direction, brand identity, and a direct-to-consumer sales channel.",
  },
  {
    year: "2022 — 2024",
    role: "Medical Laboratory Scientist",
    org: "Regional Diagnostic Centre",
    category: "science",
    description:
      "Delivered accurate diagnostic testing across hematology and microbiology, maintaining rigorous QA standards in a high-volume clinical environment.",
  },
  {
    year: "2021 — 2022",
    role: "Research Assistant",
    org: "University Medical Research Unit",
    category: "science",
    description:
      "Supported clinical research studies — protocol adherence, sample handling, and data collection feeding into peer-reviewed findings.",
  },
  {
    year: "2019 — 2021",
    role: "Sales & Business Development Lead",
    org: "Healthcare Distribution Company",
    category: "business",
    description:
      "Grew regional accounts and led a small commercial team, translating technical product knowledge into client trust and revenue.",
  },
  {
    year: "2018",
    role: "B.MLS, Medical Laboratory Science",
    org: "University Degree",
    category: "science",
    description:
      "Graduated with a foundation in clinical diagnostics, pathology, and laboratory management that still underpins everything I build today.",
  },
];

export const projects = [
  {
    title: "Rapid QC Dashboard",
    category: "research",
    size: "large",
    summary:
      "An internal quality-control tracking tool that flagged out-of-range lab results in real time, cutting review turnaround by half.",
    tags: ["Research", "Process Design", "Excel/VBA"],
  },
  {
    title: "Community Health Screening Drive",
    category: "research",
    size: "small",
    summary:
      "Organized and ran a free diagnostic screening event, coordinating volunteers, equipment, and 200+ patient records.",
    tags: ["Public Health", "Logistics"],
  },
  {
    title: "Brand Identity — Atelier Launch",
    category: "business",
    size: "large",
    summary:
      "Full brand system for the fashion label: naming, visual identity, packaging, and launch campaign across social channels.",
    tags: ["Branding", "Marketing"],
  },
  {
    title: "Direct-to-Consumer Sales Funnel",
    category: "business",
    size: "small",
    summary:
      "Built and optimized an online storefront and checkout flow that grew repeat purchase rate quarter over quarter.",
    tags: ["E-commerce", "Growth"],
  },
  {
    title: "Lab Onboarding Playbook",
    category: "research",
    size: "small",
    summary:
      "Authored a standardized training playbook for new lab technicians, reducing onboarding time and error rate.",
    tags: ["Documentation", "Training"],
  },
];

export const fashion = {
  intro:
    "A luxury abaya and scarf label built on the same standard I hold in the lab: nothing leaves until it's right.",
  gallery: [
    { title: "The Noor Collection", caption: "Signature abayas, tailored silhouette" },
    { title: "Silk Route Scarves", caption: "Hand-finished, limited runs" },
    { title: "Atelier Essentials", caption: "Everyday luxury, made to layer" },
    { title: "Bridal Capsule", caption: "Made-to-order, seasonal" },
  ],
};

export const certifications = [
  { name: "Medical Laboratory Science License", issuer: "National Board", year: "2018" },
  { name: "Clinical Quality Management", issuer: "Professional Institute", year: "2021" },
  { name: "Phlebotomy & Sample Handling", issuer: "Health Sciences Council", year: "2019" },
  { name: "Digital Marketing Fundamentals", issuer: "Industry Certification", year: "2023" },
  { name: "Small Business Leadership", issuer: "Entrepreneurship Academy", year: "2024" },
];
