import type { MDXComponents } from 'mdx/types';

import { MigrationDiagram, Todo } from '@/components/CaseStudy';

/**
 * Components available in every MDX file. Typography comes from the
 * `prose` wrapper on the case study page.
 */
const components: MDXComponents = {
  MigrationDiagram,
  Todo,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
