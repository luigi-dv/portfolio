import ventureData from '@/data/ventures.json';

import { Ventures } from '@/types/Venture';

export const getVentureData = async () => ventureData as Ventures;
