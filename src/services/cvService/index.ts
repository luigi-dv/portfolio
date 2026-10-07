import { Cv } from '@/types/Cv';
import cvData from '@/data/cv.json';

/**
 * CV content, kept separate from the site data so it can be tuned for
 * recruiters and ATS parsing without changing the portfolio.
 */
export const getCvData = async () => cvData as Cv;
