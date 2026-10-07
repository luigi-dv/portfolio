export interface WorkRole {
  title: string;
  note?: string;
  /** `YYYY-MM` */
  start: string;
  /** `YYYY-MM`, or `null` for a current role */
  end: string | null;
  intro?: string;
  bullets: string[];
}

export interface WorkItem {
  company: string;
  href: string;
  logoUrl: string;
  location: string;
  roles: WorkRole[];
}
