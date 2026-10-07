'use client';

import React, { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

interface MeteorsProps extends React.HTMLAttributes<HTMLSpanElement> {
  number?: number;
}
export const Meteors = ({ number = 20, ...props }: MeteorsProps) => {
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>(
    []
  );

  useEffect(() => {
    const styles = [...new Array(number)].map(() => ({
      animationDelay: Math.random() * 1 + 0.2 + 's',
      animationDuration: Math.floor(Math.random() * 8 + 2) + 's',
      left: Math.floor(Math.random() * window.innerWidth) + 'px',
      top: -5,
    }));
    // Random, window-dependent styles must be computed after mount to avoid a
    // hydration mismatch, so setting state here is intentional
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMeteorStyles(styles);
  }, [number]);

  return (
    <>
      {[...meteorStyles].map((style, idx) => (
        // Meteor Head
        <span
          key={idx}
          className={cn(
            'pointer-events-none absolute left-1/2 top-1/2 size-0.5 rotate-[215deg] animate-meteor rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10]'
          )}
          style={style}
          {...props}
        >
          {/* Meteor Tail */}
          <div className='pointer-events-none absolute top-1/2 -z-10 h-px w-[50px] -translate-y-1/2 bg-gradient-to-r from-slate-500 to-transparent' />
        </span>
      ))}
    </>
  );
};
