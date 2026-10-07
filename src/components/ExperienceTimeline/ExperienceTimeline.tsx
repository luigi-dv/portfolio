'use client';

import React, { useId, useState } from 'react';

import { ChevronDownIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { formatDuration, formatPeriod } from '@/utilities/date';

import { cn } from '@/lib/utils';
import { WorkItem, WorkRole } from '@/types/WorkItem';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Role = ({
  defaultOpen,
  role,
}: {
  role: WorkRole;
  defaultOpen: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const panelId = useId();
  const hasBullets = role.bullets.length > 0;

  return (
    <li className='relative pl-6'>
      <span
        className={cn(
          'absolute left-0 top-1.5 size-2.5 rounded-full border-2 border-background',
          role.end === null ? 'bg-primary' : 'bg-muted-foreground/40'
        )}
        aria-hidden='true'
      />
      <div className='flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-x-4'>
        <h4 className='font-medium leading-snug text-sm'>{role.title}</h4>
        <p className='shrink-0 text-xs tabular-nums text-muted-foreground'>
          {formatPeriod(role.start, role.end)}
          <span className='text-muted-foreground/70'>
            {' '}
            ({formatDuration(role.start, role.end)})
          </span>
        </p>
      </div>
      {role.note && (
        <p className='text-xs text-muted-foreground'>{role.note}</p>
      )}
      {role.intro && (
        <p className='mt-2 text-sm text-pretty max-w-prose'>{role.intro}</p>
      )}
      {hasBullets && (
        <>
          <button
            type='button'
            aria-expanded={isOpen}
            aria-controls={panelId}
            onClick={() => setIsOpen((open) => !open)}
            className='mt-2 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground'
          >
            {isOpen ? 'Hide details' : `Show ${role.bullets.length} highlights`}
            <ChevronDownIcon
              className={cn(
                'size-3.5 transition-transform duration-200',
                isOpen && 'rotate-180'
              )}
              aria-hidden='true'
            />
          </button>
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.ul
                id={panelId}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className='overflow-hidden list-disc pl-4 marker:text-muted-foreground/60 space-y-1.5 text-sm text-pretty max-w-prose'
              >
                {role.bullets.map((bullet) => (
                  <li key={bullet} className='first:mt-2'>
                    {bullet}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </>
      )}
    </li>
  );
};

export const ExperienceTimeline = ({ work }: { work: WorkItem[] }) => (
  <ol className='space-y-10'>
    {work.map((item, itemIndex) => (
      <li key={item.company}>
        <div className='flex items-center gap-3'>
          <Avatar className='size-10 border bg-white'>
            <AvatarImage src={item.logoUrl} alt='' className='object-contain' />
            <AvatarFallback>{item.company[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className='font-semibold leading-tight'>
              <a
                href={item.href}
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-primary'
              >
                {item.company}
              </a>
            </h3>
            <p className='text-xs text-muted-foreground'>{item.location}</p>
          </div>
        </div>
        <ol className='relative mt-4 ml-5 space-y-6 border-l pl-0 [&>li]:-ml-[5px]'>
          {item.roles.map((role, roleIndex) => (
            <Role
              key={`${role.title}-${role.start}`}
              role={role}
              defaultOpen={itemIndex === 0 && roleIndex === 0}
            />
          ))}
        </ol>
      </li>
    ))}
  </ol>
);
