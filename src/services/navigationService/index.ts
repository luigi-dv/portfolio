import navigationData from '@/data/navigation.json';

export const getNavigationData = async () => {
  try {
    return navigationData;
  } catch (error) {
    console.error('There was a problem fetching the navigation data:', error);
  }
};
