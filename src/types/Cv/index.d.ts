import { WorkRole } from '@/types/WorkItem';
import { Language, SkillGroup } from '@/types/Profile';

export interface CvExperience {
  company: string;
  context?: string;
  location: string;
  roles: WorkRole[];
}

export interface Cv {
  meta: {
    fileName: string;
    pageLimit: number;
    showPhoto: boolean;
    /** `YYYY-MM`, shown on the CV so recruiters can see it is current */
    updated: string;
  };
  basics: {
    name: string;
    headline: string;
    location: string;
    availability?: string;
    photoUrl: string;
    links: { label: string; href: string }[];
  };
  /** Supports `**bold**` */
  summary: string;
  /** Role bullets support `**bold**` */
  experience: CvExperience[];
  skills: SkillGroup[];
  education: {
    degree: string;
    school: string;
    location: string;
    start: string;
    end: string;
  }[];
  certifications: { name: string; issuer: string; year: number }[];
  languages: Language[];
}
