import type { MDXContent } from 'mdx/types';

export interface CaseStudy {
  slug: string;
  title: string;
  /** One sentence for metadata and link previews */
  summary: string;
  company: string;
  role: string;
  period: string;
  stack: string[];
  /** Key facts shown above the write-up */
  facts: { label: string; value: string }[];
  /** Drafts render in development only and 404 in production */
  draft: boolean;
  load: () => Promise<{ default: MDXContent }>;
}

export const caseStudies: CaseStudy[] = [
  {
    company: 'Zoloo',
    draft: false,
    facts: [
      { label: 'Records migrated', value: '40M+' },
      { label: 'Records lost', value: '0' },
      { label: 'Maintenance window', value: 'None' },
    ],
    load: () => import('./invoicing-migration.mdx'),
    period: '2025–now',
    role: 'Led the migration',
    slug: 'invoicing-migration',
    stack: ['Python', 'FastAPI', 'Celery', 'RabbitMQ', 'MySQL'],
    summary:
      "How I moved invoicing out of Zoloo's monolith into its own service: shadow mode, the smallest accounts first, and 40M+ records migrated without losing one.",
    title: 'Moving invoicing out of a monolith without losing a record',
  },
  {
    company: 'Syncflow',
    draft: false,
    facts: [
      { label: 'Highest autonomy', value: 'Ask first' },
      { label: 'Daily action cap', value: '20' },
      { label: 'Shadow period', value: '3 days' },
    ],
    load: () => import('./syncflow-autopilot.mdx'),
    period: '2026',
    role: 'Founder and sole engineer',
    slug: 'syncflow-autopilot',
    stack: ['Next.js', 'TypeScript', 'MCP', 'LLM APIs'],
    summary:
      'How I designed Syncflow Autopilot, a beta AI agent that never finishes a step without asking, and built it with parallel AI coding agents. It started with changing my car brakes.',
    title: 'Building an AI agent that always asks first',
  },
];

/** Drafts show in development, or in a local build run with SHOW_DRAFTS=1 */
export const isPublished = (study: CaseStudy) =>
  !study.draft ||
  process.env.NODE_ENV !== 'production' ||
  process.env.SHOW_DRAFTS === '1';

export const getCaseStudy = (slug: string) =>
  caseStudies.find((study) => study.slug === slug && isPublished(study));
