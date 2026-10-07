import { Ventures } from '@/types/Venture';
import ventureData from '@/data/ventures.json';

export const getVentureData = async () => ventureData as Ventures;
