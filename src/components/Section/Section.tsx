import React from 'react';

interface SectionProps {
  id: string;
  title: string;
  description?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export const Section = ({
  children,
  className,
  description,
  id,
  title,
}: SectionProps) => (
  <section id={id} aria-labelledby={`${id}-title`} className={className}>
    <header className='mb-6 space-y-1.5'>
      <h2
        id={`${id}-title`}
        className='font-display text-lg font-semibold tracking-tight'
      >
        {title}
      </h2>
      {description && (
        <p className='text-sm text-muted-foreground text-pretty max-w-prose'>
          {description}
        </p>
      )}
    </header>
    {children}
  </section>
);
