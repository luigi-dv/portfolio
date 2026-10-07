export interface VentureCompany {
  name: string;
  href: string;
  logoUrl: string;
  role: string;
  /** `YYYY-MM` */
  start: string;
  location: string;
  description: string;
  lines: { title: string; text: string }[];
}

export interface VentureProduct {
  name: string;
  href: string;
  linkLabel: string;
  appStoreUrl?: string;
  /** Slug of a case study in src/content/case-studies */
  caseStudy?: string;
  iconUrl: string;
  imageUrl: string;
  imageAlt: string;
  role: string;
  /** `YYYY-MM` */
  start: string;
  tagline: string;
  highlights: { value: string; label: string }[];
  /** Supports `**bold**` */
  bullets: string[];
  stack: string[];
}

export interface Ventures {
  company: VentureCompany;
  products: VentureProduct[];
}
