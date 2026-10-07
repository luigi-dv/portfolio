export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Language {
  name: string;
  level: string;
}

export interface Profile {
  name: string;
  initials: string;
  headline: string;
  /** Paragraphs; supports `**bold**` */
  summary: string[];
  email: string;
  url: string;
  avatarUrl: string;
  location: string;
  githubUrl: string;
  linkedinUrl: string;
  skills: SkillGroup[];
  languages: Language[];
}
