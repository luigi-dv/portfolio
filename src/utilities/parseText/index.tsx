import React from 'react';

export const parseDescription = (description: string | string[]) => {
  return typeof description != 'string' ? (
    description?.map((line: string, index: number) => {
      const parts = line.split(':');
      if (parts.length > 1) {
        return (
          <p key={index} className='text-pretty mb-4'>
            <span className='font-bold'>{parts[0]}</span>:
            {parts.slice(1).join(':')}
          </p>
        );
      } else {
        return (
          <p key={index} className='text-pretty mb-4'>
            {line}
          </p>
        );
      }
    })
  ) : (
    <p className='text-pretty mb-4'>{description}</p>
  );
};
