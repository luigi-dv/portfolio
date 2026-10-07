import React from 'react';

import { cn } from '@/lib/utils';

type BoxVariant = 'default' | 'external' | 'highlight' | 'legacy';

interface BoxProps {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  lines?: string[];
  variant?: BoxVariant;
}

const BOX_STYLES: Record<BoxVariant, string> = {
  default: 'fill-card stroke-border',
  external: 'fill-muted stroke-border',
  highlight: 'fill-card stroke-primary [stroke-width:2]',
  legacy: 'fill-card stroke-muted-foreground/50 [stroke-dasharray:4_3]',
};

const Box = ({
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
      y={y + 20}
      fontSize={12.5}
      className='fill-foreground font-sans font-medium'
    >
      {title}
    </text>
    {lines.map((line, index) => (
      <text
        key={line}
        x={x + 12}
        y={y + 38 + index * 16}
        fontSize={11}
        className='fill-muted-foreground font-sans'
      >
        {line}
      </text>
    ))}
  </g>
);

interface ArrowProps {
  d: string;
  dashed?: boolean;
}

const Arrow = ({ d, dashed }: ArrowProps) => (
  <path
    d={d}
    fill='none'
    markerEnd='url(#arrowhead)'
    className={cn(
      'stroke-muted-foreground stroke-[1.25]',
      dashed && '[stroke-dasharray:4_3]'
    )}
  />
);

/**
 * The migration pattern: the monolith hands work to the new service through a
 * transactional outbox and a message broker, reads documents back with a
 * fallback to legacy storage, and a resumable backfill copies the history.
 */
export const MigrationDiagram = () => (
  <figure className='not-prose my-8 space-y-3'>
    <div className='-mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0'>
      <svg
        viewBox='0 0 760 480'
        className='h-auto w-full min-w-[640px]'
        role='img'
        aria-labelledby='migration-diagram-title'
      >
        <title id='migration-diagram-title'>
          Migration architecture. The monolith writes invoice requests to an
          outbox, a relay publishes them to a message broker, and the new
          invoicing service renders, numbers, stores and delivers documents,
          then publishes events the monolith projects back. Reads go to the
          service first, with a fallback to legacy storage. A resumable backfill
          copies history from the monolith database to the service database.
        </title>
        <defs>
          <marker
            id='arrowhead'
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

        <Box
          x={20}
          y={20}
          w={220}
          h={44}
          title='Web app and other services'
          variant='external'
        />

        <Box
          x={20}
          y={90}
          w={220}
          h={150}
          title='Monolith'
          lines={[
            'Outbox + relay',
            'Cohort switch',
            'Read path + fallback',
            'Projection consumer',
          ]}
        />
        <Box
          x={290}
          y={90}
          w={180}
          h={150}
          title='Message broker'
          lines={['invoice requested', '', 'document events']}
        />
        <Box
          x={520}
          y={90}
          w={220}
          h={150}
          title='Invoicing service'
          variant='highlight'
          lines={['Render', 'Number per account', 'Store', 'Deliver']}
        />

        <Box x={20} y={270} w={220} h={44} title='Cohort flags (set and %)' />
        <Box
          x={520}
          y={270}
          w={105}
          h={60}
          title='Documents'
          lines={['shadow prefix']}
        />
        <Box
          x={635}
          y={270}
          w={105}
          h={60}
          title='Database'
          lines={['service']}
        />
        <Box x={20} y={344} w={220} h={44} title='Monolith database' />
        <Box
          x={290}
          y={344}
          w={180}
          h={60}
          title='Backfill'
          lines={['PK batches, watermark']}
        />
        <Box
          x={20}
          y={418}
          w={220}
          h={44}
          title='Legacy document storage'
          variant='legacy'
        />

        <Arrow d='M130,64 V88' />

        <Arrow d='M240,128 H288' />
        <Arrow d='M470,128 H518' />
        <Arrow d='M520,160 H472' />
        <Arrow d='M290,160 H242' />

        <Arrow d='M210,90 V74 H580 V88' />
        <text
          x={395}
          y={68}
          fontSize={11}
          textAnchor='middle'
          className='fill-muted-foreground font-sans'
        >
          document lookup
        </text>
        <Arrow d='M20,220 H8 V440 H18' dashed />

        <Arrow d='M572,240 V268' />
        <Arrow d='M687,240 V268' />

        <Arrow d='M130,270 V242' />
        <Arrow d='M240,366 H288' />
        <Arrow d='M470,374 H710 V332' />
      </svg>
    </div>
    <figcaption className='text-xs text-muted-foreground text-pretty'>
      Solid lines are steady-state flows. The dashed line exists only during the
      transition: reads fall back to legacy storage when the new service
      doesn&apos;t have a document yet.
    </figcaption>
  </figure>
);
