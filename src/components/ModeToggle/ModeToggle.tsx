'use client';

import { Button } from '@/components/ui/button';

import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant='ghost'
      type='button'
      size='icon'
      className='px-2'
      aria-label='Toggle dark mode'
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <SunIcon className='h-[1.2rem] w-[1.2rem] text-neutral-800 dark:hidden dark:text-neutral-200' />
      <MoonIcon className='hidden h-[1.2rem] w-[1.2rem] text-neutral-800 dark:block dark:text-neutral-200' />
    </Button>
  );
}
