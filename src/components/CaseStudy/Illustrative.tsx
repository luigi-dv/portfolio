import React from 'react';

export const ILLUSTRATIVE_NOTE =
  'Illustrative figure: rounded or replaced to keep client data confidential.';

/**
 * Marks a figure that is not the real number. The dagger points to the
 * note at the end of the page; the tooltip says it in place.
 */
export const Illustrative = ({ children }: { children: React.ReactNode }) => (
  <span title={ILLUSTRATIVE_NOTE}>
    {children}
    <sup className='ml-0.5 text-muted-foreground' aria-label='illustrative'>
      †
    </sup>
  </span>
);
