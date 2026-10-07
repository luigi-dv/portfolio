'use client';

import React from 'react';

// Components
import { TextMatrix } from '@/components/TextMatrix';

export const HomeHeader = () => {
  return (
    <header>
      <h1 className='text-center text-6xl lg:text-8xl font-bold mb-4'>
        Hello.
        <br />I am Luigelo
      </h1>
      <TextMatrix primaryText={'Full Stack Developer'} />
    </header>
  );
};
