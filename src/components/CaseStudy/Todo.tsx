import React from 'react';

/**
 * Marks a gap in a draft case study. Drafts are never published, so these
 * only ever render in development.
 */
export const Todo = ({ children }: { children: React.ReactNode }) => (
  <aside className='not-prose my-4 rounded-md border border-dashed border-amber-500/60 bg-amber-500/10 px-4 py-3 text-sm text-amber-900 dark:text-amber-200'>
    <p className='font-medium'>To fill in</p>
    <div className='mt-1 space-y-1'>{children}</div>
  </aside>
);
