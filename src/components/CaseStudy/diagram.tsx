import React from 'react';

import { cn } from '@/lib/utils';

/** Shared building blocks for case study architecture diagrams. */

type BoxVariant = 'default' | 'external' | 'highlight' | 'legacy';

const BOX_STYLES: Record<BoxVariant, string> = {
  default: 'fill-card stroke-border',
  external: 'fill-muted stroke-border',
  highlight: 'fill-card stroke-primary [stroke-width:2]',
  legacy: 'fill-card stroke-muted-foreground/50 [stroke-dasharray:4_3]',
};

/** Every arrowhead is identical, so one id is safe even with several diagrams on a page */
const MARKER_ID = 'diagram-arrowhead';

interface BoxProps {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  /** Detail lines under the title; use '' for a blank line */
  lines?: string[];
  variant?: BoxVariant;
}

export const Box = ({
  h,
  lines = [],
  title,
  variant = 'default',
  w,
  x,
  y,
}: BoxProps) => (
  <g>
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={6}
      className={cn('stroke-[1.25]', BOX_STYLES[variant])}
    />
    <text
      x={x + 12}
      y={y + 21}
      fontSize={13.5}
      className='fill-foreground font-sans font-medium'
    >
      {title}
    </text>
    {lines.map((line, index) => (
      <text
        key={index}
        x={x + 12}
        y={y + 40 + index * 17}
        fontSize={12}
        className='fill-muted-foreground font-sans'
      >
        {line}
      </text>
    ))}
  </g>
);

export const Arrow = ({ d, dashed }: { d: string; dashed?: boolean }) => (
  <path
    d={d}
    fill='none'
    markerEnd={`url(#${MARKER_ID})`}
    className={cn(
      'stroke-muted-foreground stroke-[1.25]',
      dashed && '[stroke-dasharray:4_3]'
    )}
  />
);

export const Label = ({
  children,
  x,
  y,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
}) => (
  <text
    x={x}
    y={y}
    fontSize={12}
    textAnchor='middle'
    className='fill-muted-foreground font-sans'
  >
    {children}
  </text>
);

interface DiagramFigureProps {
  /** Unique on the page; used for the accessible title id */
  name: string;
  width: number;
  height: number;
  /** Full text description for screen readers */
  description: string;
  caption: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Responsive SVG figure: scales with the column, and scrolls sideways on
 * narrow screens instead of shrinking text below a readable size.
 */
export const DiagramFigure = ({
  caption,
  children,
  description,
  height,
  name,
  width,
}: DiagramFigureProps) => {
  const titleId = `${name}-diagram-title`;

  return (
    <figure className='not-prose my-8 space-y-3'>
      <div className='-mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0'>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className='h-auto w-full min-w-[640px] sm:min-w-0'
          role='img'
          aria-labelledby={titleId}
        >
          <title id={titleId}>{description}</title>
          <defs>
            <marker
              id={MARKER_ID}
              viewBox='0 0 10 10'
              refX='9'
              refY='5'
              markerWidth='7'
              markerHeight='7'
              orient='auto-start-reverse'
            >
              <path d='M0,0 L10,5 L0,10 z' className='fill-muted-foreground' />
            </marker>
          </defs>
          {children}
        </svg>
      </div>
      <figcaption className='text-xs text-muted-foreground text-pretty'>
        {caption}
      </figcaption>
    </figure>
  );
};
