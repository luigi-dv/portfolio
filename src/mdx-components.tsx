import type { MDXComponents } from 'mdx/types';

import {
  AutopilotDiagram,
  DemoModeDiagram,
  Illustrative,
  MigrationDiagram,
  NativeClientDiagram,
  Screens,
  Todo,
} from '@/components/CaseStudy';

/**
 * Components available in every MDX file. Typography comes from the
 * `prose` wrapper on the case study page. `Shot` is not here: it needs the
 * link's asset folder, so the /case/[id] page passes it in.
 */
const components: MDXComponents = {
  AutopilotDiagram,
  DemoModeDiagram,
  Illustrative,
  MigrationDiagram,
  NativeClientDiagram,
  Screens,
  Todo,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
