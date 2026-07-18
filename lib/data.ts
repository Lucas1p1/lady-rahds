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
  email: "drahmatadeola@gmail.com",
 socials: [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rahmat-adeola-dawood-792b9a171" },
  { label: "Instagram", href: "https://www.instagram.com/rahdel_a" },
  { label: "Twitter / X", href: "https://x.com/dee_rahmah" },
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
    year: "Jan 2026 — Jun 2026",
    role: "Operations Executive",
    org: "TDAdvisory",
    category: "business",
    description:
      "Coordinated daily business operations and administrative workflows, supported cross-functional project execution, and helped develop SOPs to improve internal processes.",
  },
  {
    year: "Jan 2026 — Apr 2026",
    role: "Operations Manager",
    org: "Clafiya",
    category: "business",
    description:
      "Managed daily operations to support efficient healthcare service delivery, coordinated customer support, and drove workflow improvements across cross-functional teams.",
  },
  {
    year: "Jun 2024 — Jun 2025",
    role: "Intern Medical Laboratory Scientist",
    org: "Federal Medical Centre, Abeokuta",
    category: "science",
    description:
      "Rotated through Haematology, Blood Transfusion Science, Chemical Pathology, Microbiology, Parasitology, and Histopathology — flagging critical values to clinicians and using LIMS for specimen tracking.",
  },
  {
    year: "Nov 2022 — May 2023",
    role: "Student Intern",
    org: "Obafemi Awolowo University Teaching Hospital, Ile-Ife",
    category: "science",
    description:
      "Performed PCR and full blood count testing under supervision, communicated patient records and procedures professionally, and reported results to physicians in a timely manner.",
  },
  {
    year: "Sep 2022 — Oct 2022",
    role: "Student Intern",
    org: "Federal Medical Centre, Abeokuta",
    category: "science",
    description:
      "Carried out laboratory testing across chemical, hematological, microbiological, and histopathological units, and gained competency on automated chemistry and hematology analyzers.",
  },
  {
    year: "Jan 2021 — Aug 2022",
    role: "Student Intern",
    org: "Federal Medical Centre, Owo",
    category: "science",
    description:
      "Analyzed samples across Microbiology, Clinical Chemistry, Haematology, Serology, Histopathology, and Blood Transfusion under a Lead Scientist, and performed correct phlebotomy practice.",
  },
  {
    year: "Mar 2022 — May 2022",
    role: "Student Intern",
    org: "Kenny Ogun Laboratory Complex, Abeokuta",
    category: "science",
    description:
      "Collaborated with trainees from other institutions to generate quality test results, and assisted in developing and evaluating new lab procedures.",
  },
  {
    year: "Dec 2020 — Jan 2021",
    role: "Student Intern",
    org: "Dunia Hospital, Agege",
    category: "science",
    description:
      "Handled collection and processing of clinical samples for routine analysis under close supervision of the Lead Medical Laboratory Scientist.",
  },
  {
    year: "Aug 2019 — Oct 2019",
    role: "Student Intern",
    org: "Compromed Laboratory Services, Abeokuta",
    category: "science",
    description:
      "Conducted lab tasks across chemical, hematology, microbiology, and serology, checking test accuracy before reporting with close attention to detail.",
  },
  {
    year: "2019 — 2023",
    role: "B.MLS, Medical Laboratory Science",
    org: "Achievers University, Owo",
    category: "science",
    description:
      "Graduated First Class with honors including Best Student in Haematology & Blood Group Serology and Most Industrious Student — a foundation in clinical diagnostics that underpins everything since.",
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
    "A beauty and modest-wear business built on the same standard I hold in the lab: nothing leaves until it's right. Abayas, scarves, perfumes, and skincare — curated and sold with the same care.",
  gallery: [
    {
      title: "Abaya Collection",
      caption: "Signature abayas, tailored silhouette",
      image:
        "https://images.pexels.com/photos/19987022/pexels-photo-19987022.jpeg?cs=srgb&dl=pexels-darkshadephotos-19987022.jpg&fm=jpg",
    },
    {
      title: "Silk Scarves",
      caption: "Hand-finished, limited runs",
      image:
        "https://images.pexels.com/photos/31776039/pexels-photo-31776039.jpeg?cs=srgb&dl=pexels-m-zass-2150951548-31776039.jpg&fm=jpg",
    },
    {
      title: "Perfumes & Perfume Oils",
      caption: "Signature scents, long-lasting oils",
      image:
        "https://images.pexels.com/photos/34690231/pexels-photo-34690231.jpeg?cs=srgb&dl=pexels-oceanofstars-34690231.jpg&fm=jpg",
    },
    {
      title: "Oriflame Skincare",
      caption: "Trusted skincare essentials",
      image:
        "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F45590%2FNG%2F45590_1.png&MediaId=17460209&Version=1&w=1600&bc=%23f5f5f5&ib=%23f5f5f5&q=90&imageFormat=WebP",
    },
  ],
};

export const certifications = [
  { name: "Medical Laboratory Science License", issuer: "National Board", year: "2018" },
  { name: "Clinical Quality Management", issuer: "Professional Institute", year: "2021" },
  { name: "Phlebotomy & Sample Handling", issuer: "Health Sciences Council", year: "2019" },
  { name: "Digital Marketing Fundamentals", issuer: "Industry Certification", year: "2023" },
  { name: "Small Business Leadership", issuer: "Entrepreneurship Academy", year: "2024" },
];