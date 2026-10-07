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
      repository: project.repo ? await getRepository(project.repo) : null,
    }))
  );
};
