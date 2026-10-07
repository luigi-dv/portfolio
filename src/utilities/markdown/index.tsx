import React from 'react';

/**
 * Renders inline `**bold**` markup. Deliberately tiny: JSON copy only needs
 * emphasis, not full markdown.
 */
export const renderInline = (text: string) =>
  text.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={index} className='font-semibold text-foreground'>
        {part.slice(2, -2)}
      </strong>
    ) : (
      <React.Fragment key={index}>{part}</React.Fragment>
    )
  );
