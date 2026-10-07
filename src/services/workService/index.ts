import workData from '@/data/work.json';
import { WorkItem } from '@/types/WorkItem';

export const getWorkData = async () => workData.work as WorkItem[];
