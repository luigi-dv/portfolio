export interface Project {
  title: string;
  context: string;
  year: string;
  /** One sentence on the result, written for someone scanning */
  outcome: string;
  stack: string[];
  /** Code lives in a private repository */
  private: boolean;
  href?: string;
  /** Slug of a case study in src/content/case-studies */
  caseStudy?: string;
  /** `owner/name` of a public GitHub repo to enrich with live data */
  repo?: string;
}
