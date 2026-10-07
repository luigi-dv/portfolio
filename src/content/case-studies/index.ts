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
];

export const isPublished = (study: CaseStudy) =>
  !study.draft || process.env.NODE_ENV !== 'production';

export const getCaseStudy = (slug: string) =>
  caseStudies.find((study) => study.slug === slug && isPublished(study));
