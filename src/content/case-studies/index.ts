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
      'The playbook I used to move invoicing out of a monolith: strangler fig by cohort, a transactional outbox, shadow rendering and a verified, resumable backfill of 40M+ records with zero lost.',
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
      'How I designed Syncflow Autopilot, an AI agent that never finishes a step without asking, built it with parallel AI coding agents, and then moved it out of the main product.',
    title: 'Building an AI agent that always asks first, then hiding it',
  },
];

/** Drafts show in development, or in a local build run with SHOW_DRAFTS=1 */
export const isPublished = (study: CaseStudy) =>
  !study.draft ||
  process.env.NODE_ENV !== 'production' ||
  process.env.SHOW_DRAFTS === '1';

export const getCaseStudy = (slug: string) =>
  caseStudies.find((study) => study.slug === slug && isPublished(study));
