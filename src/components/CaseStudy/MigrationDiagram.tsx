import React from 'react';

import { Arrow, Box, DiagramFigure, Label } from './diagram';

/**
 * The migration pattern: the monolith hands work to the new service through a
 * transactional outbox and a message broker, reads documents back with a
 * fallback to legacy storage, and a resumable backfill copies the history.
 */
export const MigrationDiagram = () => (
  <DiagramFigure
    name='migration'
    width={760}
    height={480}
    description='Migration architecture. The monolith writes invoice requests to an outbox, a relay publishes them to a message broker, and the new invoicing service renders, numbers, stores and delivers documents, then publishes events the monolith projects back. Reads go to the service first, with a fallback to legacy storage. A resumable backfill copies history from the monolith database to the service database.'
    caption={
      <>
        Solid lines are steady-state flows. The dashed line exists only during
        the transition: reads fall back to legacy storage when the new service
        doesn&apos;t have a document yet.
      </>
    }
  >
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
    <Box x={635} y={270} w={105} h={60} title='Database' lines={['service']} />
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
    <Label x={395} y={68}>
      document lookup
    </Label>
    <Arrow d='M20,220 H8 V440 H18' dashed />

    <Arrow d='M572,240 V268' />
    <Arrow d='M687,240 V268' />

    <Arrow d='M130,270 V242' />
    <Arrow d='M240,366 H288' />
    <Arrow d='M470,374 H710 V332' />
  </DiagramFigure>
);
