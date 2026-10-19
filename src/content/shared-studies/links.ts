import registry from './links.json';

/**
 * Shared links: unlisted, expiring copies of a case study, one per
 * recipient. `scripts/case-links.mjs` writes links.json; who received which
 * link is kept in the gitignored private/case-links.json, never here.
 */
export interface SharedLink {
  /** Eight random characters, the /case/[id] segment */
  id: string;
  /** Key of the study in ./index.ts */
  study: string;
  /** ISO timestamp; the link stops working ttlDays later */
  createdAt: string;
}

const DAY_MS = 24 * 60 * 60 * 1000;

const links: SharedLink[] = registry.links;

export const ASSETS_PATH = '/case-assets';

export const expiresAt = (link: SharedLink) =>
  new Date(Date.parse(link.createdAt) + registry.ttlDays * DAY_MS);

/** The link for an id, or undefined when it never existed or has expired */
export const getActiveLink = (id: string, now = Date.now()) => {
  const link = links.find((candidate) => candidate.id === id);
  if (!link || now >= expiresAt(link).getTime()) return undefined;
  return link;
};
