import React from 'react';

import Image from 'next/image';

/**
 * A row of phone screenshots with one caption. Screenshots are 660×1434
 * WebP files (iPhone captures resized), served from the link's own asset
 * folder so they disappear with it.
 */
export const Screens = ({
  caption,
  children,
}: {
  caption: React.ReactNode;
  children: React.ReactNode;
}) => (
  <figure className='not-prose my-8 space-y-3'>
    <div className='flex justify-center gap-4 sm:gap-6'>{children}</div>
    <figcaption className='text-xs text-muted-foreground text-pretty'>
      {caption}
    </figcaption>
  </figure>
);

interface ShotProps {
  /** File name inside the link's asset folder */
  src: string;
  alt: string;
  /** Asset folder of the link, injected by the /case/[id] page */
  basePath: string;
}

export const Shot = ({ alt, basePath, src }: ShotProps) => (
  <Image
    src={`${basePath}/${src}`}
    alt={alt}
    width={660}
    height={1434}
    // Already sized; the optimizer would cache copies that outlive the link
    unoptimized
    className='h-auto w-full max-w-[220px] min-w-0 rounded-[1.75rem] border shadow-sm'
  />
);
