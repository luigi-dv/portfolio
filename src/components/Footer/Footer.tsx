import React from 'react';

// Utilities
import { getCurrentYear } from '@/utilities/date';
export const Footer = () => {
  return (
    <footer className='w-full text-center py-4'>
      <p>© {getCurrentYear()} Luigelo. All rights reserved.</p>
    </footer>
  );
};
