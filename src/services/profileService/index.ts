import { Profile } from '@/types/Profile';
import profileData from '@/data/profile.json';

export const getProfileData = async () => profileData as Profile;
