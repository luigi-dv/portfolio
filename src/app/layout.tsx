import React from 'react';

import type { Metadata } from 'next';

import { Instrument_Sans, Unbounded } from 'next/font/google';

import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { TooltipProvider } from '@/components/ui/tooltip';

import './globals.css';

const display = Unbounded({ subsets: ['latin'], variable: '--font-display' });
const sans = Instrument_Sans({ subsets: ['latin'], variable: '--font-sans' });

const description =
  'Full-stack engineer shipping web, mobile and cloud products from architecture to production. Senior engineer at Zoloo, founder of Ldvloper and Syncflow.';

export const metadata: Metadata = {
  description,
  metadataBase: new URL('https://luigelo.ldvloper.com'),
  openGraph: {
    description,
    title: 'Luigelo Davila, full-stack engineer',
    type: 'profile',
  },
  title: 'Luigelo Davila | Full-stack engineer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' data-scroll-behavior='smooth' suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto pt-12 pb-32 sm:pt-24 px-6',
          display.variable,
          sans.variable
        )}
      >
        <ThemeProvider attribute='class' defaultTheme='light'>
          <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
