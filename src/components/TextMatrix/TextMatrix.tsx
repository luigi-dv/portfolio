'use client';

// React Modules
import { useEffect, useState } from 'react';

// Constants
import { chars } from '@/constants/chars';
// Types
import { TextSymbolProps } from '@/types/TextSymbolProps';

export const TextMatrix = (props: TextSymbolProps) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    const textInterval = setInterval(() => {
      if (currentIndex >= props.primaryText.length) {
        clearInterval(textInterval);
        return;
      }

      const newText = props.primaryText
        .split('')
        .map((char, index) =>
          index <= currentIndex
            ? char
            : chars[Math.floor(Math.random() * chars.length)]
        )
        .join('');

      setDisplayedText(newText);

      currentIndex++;
    }, 100);

    return () => clearInterval(textInterval);
  }, [props.primaryText]);

  return <p className='text-center text-xl mt-4'>{displayedText}</p>;
};
