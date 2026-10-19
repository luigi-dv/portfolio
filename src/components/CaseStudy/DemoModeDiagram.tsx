import React from 'react';

import { Arrow, Box, DiagramFigure, Label } from './diagram';

/**
 * How App Store screenshots are made without real data: a UI test launches
 * the real app in a debug-only demo mode that answers every API call from
 * one catalog of fake data.
 */
export const DemoModeDiagram = () => (
  <DiagramFigure
    name='demo-mode'
    width={750}
    height={300}
    description='Screenshot pipeline. A UI test launches the app with a demo flag, once per language. Demo mode seeds a signed-in session and swaps in a URL stub. The real app runs its normal views and view models while the stub answers its API calls. The test takes snapshots on every device and language and frames them into store-ready images. A demo catalog of fake products, orders and plans, with dates anchored to today, supplies both the seeded session and the stubbed API responses.'
    caption='Debug builds only: the demo mode is compiled out of the App Store build. One command regenerates every screenshot, on every device, in every language.'
  >
    <Box
      x={10}
      y={40}
      w={160}
      h={96}
      title='UI test'
      lines={['Launches the app', 'with a demo flag,', 'once per language']}
    />
    <Box
      x={200}
      y={40}
      w={160}
      h={96}
      title='Demo mode'
      variant='highlight'
      lines={['Seeds a signed-in', 'session, swaps in', 'a URL stub']}
    />
    <Box
      x={390}
      y={40}
      w={160}
      h={96}
      title='The real app'
      lines={['Same views and', 'stores; the stub', 'answers the API']}
    />
    <Box
      x={580}
      y={40}
      w={160}
      h={96}
      title='Snapshot, frame'
      lines={['Every device', 'and language,', 'store-ready images']}
    />
    <Box
      x={200}
      y={200}
      w={350}
      h={86}
      title='Demo catalog'
      variant='external'
      lines={['Fake products, orders and plans,', 'dates anchored to today']}
    />

    <Arrow d='M170,88 H198' />
    <Arrow d='M360,88 H388' />
    <Arrow d='M550,88 H578' />

    <Arrow d='M280,200 V138' />
    <Label x={312} y={174}>
      session
    </Label>
    <Arrow d='M470,200 V138' />
    <Label x={518} y={174}>
      responses
    </Label>
  </DiagramFigure>
);
