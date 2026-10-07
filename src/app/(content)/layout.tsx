import React from 'react';

// Components
import { NavigationBar } from '@/components/NavigationBar';
// Services
import { getContactData } from '@/services/contactService';
import { getNavigationData } from '@/services/navigationService';

/**
 * Home Layout
 * @param children
 * @constructor
 */
export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigationData = await getNavigationData();
  const contactData = await getContactData();

  return (
    <>
      <main id='top' className='flex flex-col min-h-[100dvh] gap-y-20'>
        {children}
      </main>
      {navigationData && contactData && (
        <NavigationBar
          navigation={navigationData.navbar}
          contact={contactData.contact}
        />
      )}
    </>
  );
}
