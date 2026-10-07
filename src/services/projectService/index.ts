import { getCaseStudy } from '@/content/case-studies';

import { Project } from '@/types/Project';
import projectData from '@/data/projects.json';
import { getRepository } from '@/services/githubService';

/**
 * Featured projects, enriched with live GitHub data when a public repo is set.
 */
export const getProjects = async () => {
  const projects = projectData.projects as Project[];
  return Promise.all(
    projects.map(async (project) => ({
      ...project,
      // Only link case studies that are published (or drafts in development)
      caseStudyHref:
        project.caseStudy && getCaseStudy(project.caseStudy)
          ? `/work/${project.caseStudy}`
          : null,
      repository: project.repo ? await getRepository(project.repo) : null,
    }))
  );
};
