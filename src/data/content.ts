/**
 * ═══════════════════════════════════════════════════════════════════
 *  SINGLE SOURCE OF TRUTH — every word on the site lives in this file.
 *  (Constitution, Article II)
 *
 *  HOW TO EDIT: change values here; never edit copy inside components.
 *  Anything marked  TODO  or  [Placeholder]  MUST be replaced with your
 *  real information before the site goes live (Constitution, Article IV
 *  — USCIS/lawyers will read this site; nothing may look real that isn't).
 * ═══════════════════════════════════════════════════════════════════
 */

/* ------------------------------ Types ------------------------------ */

export interface Social {
  label: string;
  url: string;
  /** shown as mono text, e.g. "gh" */
  short: string;
}

export interface Stat {
  value: string;
  label: string;
  hint?: string;
}

export interface SkillGroup {
  category: string;
  /** decorative syntax color token for the group header */
  color: 'blue' | 'violet' | 'orange' | 'green' | 'red';
  items: string[];
}

export interface EducationItem {
  degree: string;
  school: string;
  years: string;
  details?: string;
}

export interface ProjectLanguage {
  name: string;
  /** GitHub-convention language color */
  color: string;
  /** percentage 0–100; a project's languages should sum to 100 */
  pct: number;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  /** measurable outcomes — investors & USCIS love numbers */
  impact: string[];
  stack: string[];
  languages: ProjectLanguage[];
  status: 'active' | 'shipped' | 'research';
  featured: boolean;
  /** proprietary code → links are optional (writeups, demos) */
  links: { label: string; url: string }[];
}

export interface ExperienceItem {
  role: string;
  org: string;
  start: string;
  end: string;
  location: string;
  summary: string;
  highlights: string[];
  tags: string[];
}

export interface Publication {
  title: string;
  venue: string;
  year: string;
  authors: string;
  type: 'journal' | 'conference' | 'preprint' | 'article';
  /** authoritative link (publisher DOI) */
  link?: string;
  /** open-access preprint (arXiv) of the same work */
  preprint?: string;
  note?: string;
}

export interface Talk {
  title: string;
  event: string;
  year: string;
  link?: string;
}

export interface Award {
  title: string;
  issuer: string;
  year: string;
  description: string;
}

export interface PressItem {
  outlet: string;
  title: string;
  year: string;
  link?: string;
}

export interface JudgingItem {
  role: string;
  org: string;
  year: string;
  description: string;
}

export interface Membership {
  org: string;
  level: string;
  year: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  org: string;
  relationship: string;
}

export interface EvidenceLink {
  label: string;
  description: string;
  to: string;
}

export interface NavItem {
  label: string;
  to: string;
}

/* ------------------------------ Content ---------------------------- */

export const profile = {
  // Matches the publication record (C. E. Gudumotou) — keep the name identical
  // everywhere reviewers might cross-check: paper, Scholar, LinkedIn, this site.
  name: 'Carol Eunice Gudumotou',
  firstName: 'Carol',
  initials: 'CG',
  title: 'Software Engineer · FinTech & Algorithmic Trading',
  // The typewriter in the hero cycles through these lines
  typewriterLines: [
    'building algorithmic trading systems',
    'Python · TypeScript · AWS',
    'turning market data into decisions',
    'open to research collaborations',
  ],
  heroIntro:
    'I design and build proprietary trading systems — from market-data pipelines to ' +
    'strategy engines — with an engineer’s obsession for correctness and a ' +
    'researcher’s curiosity about markets.',
  location: 'Los Angeles, CA', // TODO: confirm
  timezone: 'PT (UTC-7)',
  email: 'caroleunicetr@gmail.com',
  availability: 'Open to collaborations, interviews & speaking',
  socials: [
    // TODO: replace with your real profiles
    { label: 'GitHub', url: 'https://github.com/IreneMargherita', short: 'gh' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/your-username', short: 'in' },
    { label: 'Google Scholar', url: 'https://scholar.google.com/citations?user=Wafg1TYAAAAJ', short: 'gs' },
    { label: 'Email', url: 'mailto:caroleunicetr@gmail.com', short: '@' },
  ] satisfies Social[],
};

export const nav: NavItem[] = [
  { label: 'home', to: '/' },
  { label: 'about', to: '/about' },
  { label: 'projects', to: '/projects' },
  { label: 'experience', to: '/experience' },
  { label: 'research', to: '/research' },
  { label: 'awards', to: '/awards' },
  { label: 'testimonials', to: '/testimonials' },
  { label: 'contact', to: '/contact' },
];

/** Home page stats row — TODO: replace with your real numbers */
export const stats: Stat[] = [
  { value: '4+', label: 'years writing software', hint: '[Placeholder]' },
  { value: '12', label: 'projects shipped', hint: '[Placeholder]' },
  { value: '1', label: 'peer-reviewed publication' },
  { value: '2', label: 'awards & honors', hint: '[Placeholder]' },
];

/** The "reviewing my credentials?" band on the home page */
export const evidenceLinks: EvidenceLink[] = [
  {
    label: 'Original contributions',
    description: 'Proprietary trading systems & the problems they solve',
    to: '/projects',
  },
  {
    label: 'Scholarly work',
    description: 'Publications, preprints & technical talks',
    to: '/research',
  },
  {
    label: 'Awards & press',
    description: 'Recognition, media mentions, judging & memberships',
    to: '/awards',
  },
  {
    label: 'Recommendations',
    description: 'What professors & collaborators say',
    to: '/testimonials',
  },
];

export const about = {
  paragraphs: [
    // TODO: replace with your real story — keep it specific and human
    'I’m Carol — a software engineer who fell in love with the place where code ' +
      'meets markets. Today I’m building a proprietary algorithmic trading ' +
      'platform: the data pipelines that listen to the market, the backtesting ' +
      'engine that interrogates every idea, and the execution layer that acts on ' +
      'the survivors. [Placeholder — replace with your real bio]',
    'I care about software that can be trusted with real money: typed interfaces, ' +
      'reproducible experiments, and boring, observable deployments. I’m ' +
      'currently deepening my systems-design and cloud (AWS) skills, and I document ' +
      'what I learn as I go. [Placeholder]',
    'Long-term, I want to collaborate with researchers and builders applying ' +
      'quantitative methods to real-world problems. If that’s you, say hello. ' +
      '[Placeholder]',
  ],
  /** lines rendered inside the "currently" terminal window */
  currently: [
    { cmd: 'cat focus.txt', out: 'Designing a multi-strategy trading engine (Python)' },
    { cmd: 'cat learning.txt', out: 'Low-level system design · AWS architecture' },
    { cmd: 'cat status.txt', out: 'Open to collaborations & interviews' },
  ],
  education: [
    // TODO: real degrees, real years
    {
      degree: 'M.S. Computer Science — [Placeholder]',
      school: 'University Name',
      years: '20XX – 20XX',
      details: 'Focus: machine learning & distributed systems',
    },
    {
      degree: 'B.S. Computer Science — [Placeholder]',
      school: 'University Name',
      years: '20XX – 20XX',
    },
  ] satisfies EducationItem[],
  skills: [
    {
      category: 'Languages',
      color: 'blue',
      items: ['Python', 'TypeScript', 'SQL', 'C++ (learning)'],
    },
    {
      category: 'FinTech & Data',
      color: 'orange',
      items: ['Algorithmic trading', 'Backtesting', 'pandas · NumPy', 'Market data (OHLCV, order books)'],
    },
    {
      category: 'Web & Frameworks',
      color: 'violet',
      items: ['React 18', 'Node.js', 'FastAPI', 'Tailwind CSS'],
    },
    {
      category: 'Cloud & Systems',
      color: 'green',
      items: ['AWS (EC2, S3, Lambda)', 'Docker', 'Linux', 'CI/CD', 'PostgreSQL'],
    },
  ] satisfies SkillGroup[],
  interests: [
    'quantitative finance',
    'systems design',
    'teaching & mentoring',
    'open-source',
  ],
};

/* GitHub-convention language colors */
const LANG = {
  python: '#3572A5',
  typescript: '#3178C6',
  sql: '#E38C00',
  shell: '#89E051',
};

export const projects: Project[] = [
  // TODO: replace all projects with your real work. Numbers below are
  // examples of the KIND of metric to include — never publish estimates
  // you can't defend.
  {
    slug: 'strategy-engine',
    name: 'quant-strategy-engine',
    tagline: 'Multi-strategy algorithmic trading engine',
    description:
      'The core of the trading platform: pluggable strategy interfaces, ' +
      'risk limits enforced before every order, and a full audit trail of ' +
      'every decision the system makes. [Placeholder]',
    impact: [
      '[Placeholder] Executes N strategies concurrently with per-strategy risk budgets',
      '[Placeholder] 100% of orders pass pre-trade risk checks in <5 ms',
    ],
    stack: ['Python', 'asyncio', 'PostgreSQL', 'Docker'],
    languages: [
      { name: 'Python', color: LANG.python, pct: 86 },
      { name: 'SQL', color: LANG.sql, pct: 9 },
      { name: 'Shell', color: LANG.shell, pct: 5 },
    ],
    status: 'active',
    featured: true,
    links: [],
  },
  {
    slug: 'backtester',
    name: 'backtest-lab',
    tagline: 'Event-driven backtesting & research framework',
    description:
      'Replays years of historical market data through the exact same code ' +
      'that trades live, so a strategy’s simulated past and real future ' +
      'can’t quietly drift apart. [Placeholder]',
    impact: [
      '[Placeholder] Replays X years of minute bars in under Y minutes',
      '[Placeholder] Caught look-ahead bias in Z candidate strategies before live deployment',
    ],
    stack: ['Python', 'pandas', 'NumPy', 'Parquet'],
    languages: [
      { name: 'Python', color: LANG.python, pct: 94 },
      { name: 'Shell', color: LANG.shell, pct: 6 },
    ],
    status: 'active',
    featured: true,
    links: [],
  },
  {
    slug: 'market-data',
    name: 'market-data-pipeline',
    tagline: 'Real-time & historical market data ingestion',
    description:
      'Streams ticks and bars from broker APIs into validated, queryable ' +
      'storage — the single source of truth every other system reads from. ' +
      '[Placeholder]',
    impact: [
      '[Placeholder] Ingests N symbols in real time with automated gap-detection',
      '[Placeholder] Schema validation rejects malformed vendor data before it corrupts research',
    ],
    stack: ['Python', 'AWS S3', 'PostgreSQL', 'WebSockets'],
    languages: [
      { name: 'Python', color: LANG.python, pct: 78 },
      { name: 'SQL', color: LANG.sql, pct: 15 },
      { name: 'Shell', color: LANG.shell, pct: 7 },
    ],
    status: 'shipped',
    featured: true,
    links: [],
  },
  {
    slug: 'risk-dashboard',
    name: 'risk-dashboard',
    tagline: 'Live portfolio risk & P&L monitoring UI',
    description:
      'A React dashboard that turns raw positions into the questions that ' +
      'matter: how exposed are we, to what, and what happens in a bad hour? ' +
      '[Placeholder]',
    impact: ['[Placeholder] Sub-second refresh of exposure, drawdown & P&L views'],
    stack: ['TypeScript', 'React', 'Vite', 'Tailwind'],
    languages: [{ name: 'TypeScript', color: LANG.typescript, pct: 100 }],
    status: 'research',
    featured: false,
    links: [],
  },
];

export const projectsNote =
  'The trading codebase is proprietary, so repositories are private. I’m happy ' +
  'to walk through architecture, testing strategy, and (where appropriate) ' +
  'anonymized results in a technical interview or diligence call.';

export const experience: ExperienceItem[] = [
  // TODO: replace with your real roles (most recent first)
  {
    role: 'Founding Engineer — [Placeholder]',
    org: 'Proprietary Trading Project',
    start: '2025',
    end: 'present',
    location: 'Remote',
    summary:
      'Designing and building a personal-capital algorithmic trading platform end to end.',
    highlights: [
      '[Placeholder] Sole architect of data, research, and execution systems',
      '[Placeholder] Established spec-driven development workflow and CI checks',
    ],
    tags: ['Python', 'AWS', 'System design'],
  },
  {
    role: 'Software Engineer — [Placeholder]',
    org: 'Company Name',
    start: '20XX',
    end: '20XX',
    location: 'City, Country',
    summary: 'One sentence on the company and the critical role you played.',
    highlights: [
      '[Placeholder] Impact statement with a number (latency ↓, revenue ↑, users ↑)',
      '[Placeholder] Something only you could have done — critical-role evidence',
    ],
    tags: ['TypeScript', 'React', 'PostgreSQL'],
  },
];

/*
 * Teaching note: these arrays get an explicit type annotation (`: Publication[]`)
 * rather than `satisfies`, because pages read OPTIONAL fields like `link`.
 * With `satisfies`, TypeScript keeps the exact literal shape (no `link` key at
 * all), so `pub.link` is a compile error. An annotation widens each entry to
 * the full interface — optional fields exist and are simply `undefined`.
 */
const publications: Publication[] = [
  // Real, verified citation (journal version is primary; the arXiv preprint is
  // the same work, so it's listed as a link — never as a second publication).
  {
    title: 'Deep operator networks for Bayesian parameter estimation in PDEs',
    venue: 'Computer Physics Communications, Vol. 317, Art. 109853 (Elsevier)',
    year: '2025',
    authors: 'A. Raj, S. Bun, K. Srinivasa, C. E. Gudumotou, A. Sarshar',
    type: 'journal',
    link: 'https://doi.org/10.1016/j.cpc.2025.109853',
    preprint: 'https://arxiv.org/abs/2501.10684',
    note: 'Open access · Special issue "Advances in Physics-Aware Machine Learning"',
  },
];

const talks: Talk[] = [
  {
    title: '[Placeholder] Talk Title — e.g. "Backtesting Without Fooling Yourself"',
    event: 'Meetup / Conference name',
    year: '2025',
  },
];

export const research = {
  intro:
    'Where my engineering meets the academic world — papers, preprints, and talks. ' +
    'Full texts and slides available on request.',
  publications,
  talks,
};

const press: PressItem[] = [
  {
    outlet: '[Placeholder] Publication Name',
    title: 'Headline of the article that features or quotes you',
    year: '2025',
  },
];

export const recognition = {
  intro:
    'Awards, media coverage, judging service, and memberships — the paper trail of ' +
    'peer recognition.',
  awards: [
    // TODO: real awards only — issuer, year, why it was given
    {
      title: '[Placeholder] Award or Honor Name',
      issuer: 'Issuing Organization',
      year: '2025',
      description: 'One line on what the award recognizes and how selective it is.',
    },
    {
      title: '[Placeholder] Scholarship / Hackathon / Grant',
      issuer: 'Organization',
      year: '2024',
      description: 'Selection ratio or jury details make this stronger (e.g. "top 3 of 400 teams").',
    },
  ] satisfies Award[],
  press,
  judging: [
    {
      role: '[Placeholder] Hackathon Judge / Peer Reviewer',
      org: 'Event or Journal',
      year: '2025',
      description: 'Judging the work of others is a distinct O-1A criterion — list every instance.',
    },
  ] satisfies JudgingItem[],
  memberships: [
    {
      org: '[Placeholder] Professional Association (e.g. ACM, IEEE)',
      level: 'Member',
      year: '2024 – present',
    },
  ] satisfies Membership[],
};

export const testimonials = {
  intro:
    'Short excerpts from people I’ve studied and built with. Complete signed ' +
    'letters are available to reviewers on request.',
  items: [
    // TODO: real quotes with written permission from each person
    {
      quote:
        '[Placeholder] “Two or three sentences from a professor or collaborator about ' +
        'what makes your work exceptional — specific, not generic.”',
      name: 'Prof. Firstname Lastname',
      title: 'Assistant Professor, Computer Science',
      org: 'University Name',
      relationship: 'Research advisor',
    },
    {
      quote:
        '[Placeholder] “A colleague or founder on what it’s like to ship ' +
        'production systems with you.”',
      name: 'Firstname Lastname',
      title: 'CTO',
      org: 'Company',
      relationship: 'Collaborator',
    },
    {
      quote:
        '[Placeholder] “A third voice — ideally someone independent and senior in ' +
        'your field.”',
      name: 'Firstname Lastname',
      title: 'Senior Engineer',
      org: 'Company',
      relationship: 'Mentor',
    },
  ] satisfies Testimonial[],
};

export const contact = {
  headline: 'Let’s build something.',
  body:
    'Whether you’re an investor doing diligence, a researcher with an idea, ' +
    'or a reviewer verifying credentials — my inbox is open. I typically reply ' +
    'within 48 hours.',
  openTo: [
    'Research collaborations in quantitative finance & ML',
    'Technical interviews & speaking invitations',
    'Credential verification for immigration review',
    'FinTech engineering conversations',
  ],
};

export const footer = {
  line: 'designed & built by Carol Eunice Gudumotou',
  stack: 'React 18 · TypeScript · Vite · Tailwind',
  sourceNote: 'v0.1.0 — MVP',
};
