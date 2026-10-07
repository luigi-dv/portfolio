import contactService from '@/data/contact.json';

export const getContactData = async () => {
  try {
    return contactService;
  } catch (error) {
    console.error('There was a problem fetching the contact data:', error);
  }
};
