'use client';

import React from 'react';

import Link from 'next/link';
import { track } from '@vercel/analytics';

interface TrackedLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  /** Custom event name shown in Vercel Web Analytics */
  event: string;
  /** Extra event data, e.g. where on the page the link sits */
  eventData?: Record<string, string>;
}

/**
 * A link that records a Web Analytics custom event on click. Internal pages
 * use client-side navigation; files and external URLs use a plain `<a>`.
 * Navigation is never blocked or delayed.
 */
export const TrackedLink = ({
  event,
  eventData,
  href,
  onClick,
  ...props
}: TrackedLinkProps) => {
  const handleClick = (clickEvent: React.MouseEvent<HTMLAnchorElement>) => {
    track(event, eventData);
    onClick?.(clickEvent);
  };

  const isInternalPage = href.startsWith('/') && !props.download;
  return isInternalPage ? (
    <Link href={href} onClick={handleClick} {...props} />
  ) : (
    <a href={href} onClick={handleClick} {...props} />
  );
};
