import profileData from '@/data/profile.json';

import { Profile } from '@/types/Profile';

export const getProfileData = async () => profileData as Profile;
