import React from 'react';

import { Arrow, Box, DiagramFigure, Label } from './diagram';

/**
 * The client architecture both iOS apps share: dumb views, observable
 * stores, a UI-free core that owns networking and tokens, and a widget that
 * reads the same Keychain but fetches on its own.
 */
export const NativeClientDiagram = () => (
  <DiagramFigure
    name='native-client'
    width={780}
    height={340}
    description='Client architecture shared by both apps. SwiftUI views, one folder per feature, send intents to Observable stores, which make async calls and optimistic writes that roll back on failure. The stores call the Core layer, which has no UI: an APIClient actor, the bearer token in the Keychain, a local cache with no CloudKit, proactive token refresh, and handling of 401 and 429 responses. Core calls the backend APIs over REST, which stay the source of truth shared with the web app, and a streaming service for AI replies over WebSocket. The widget and Live Activity read the token from the shared Keychain and make their own requests, falling back to cached data.'
    caption='The shape both apps share. The backend owns the data and the phone keeps a cache it can throw away. Simplified: service names and hosts are left out.'
  >
    <Box
      x={10}
      y={40}
      w={170}
      h={68}
      title='SwiftUI views'
      lines={['One folder per feature', 'No logic in views']}
    />
    <Box
      x={10}
      y={140}
      w={170}
      h={86}
      title='@Observable stores'
      lines={['Async calls', 'Optimistic writes', 'Rollback on failure']}
    />
    <Box
      x={270}
      y={40}
      w={200}
      h={186}
      title='Core (no UI)'
      variant='highlight'
      lines={[
        'APIClient actor',
        'Bearer token in Keychain',
        'Local cache, no CloudKit',
        'Token refresh before expiry',
        '401 signs out',
        '429 backs off',
      ]}
    />
    <Box
      x={560}
      y={40}
      w={180}
      h={68}
      title='Backend APIs'
      variant='external'
      lines={['Source of truth', 'Shared with the web app']}
    />
    <Box
      x={560}
      y={158}
      w={180}
      h={68}
      title='Streaming service'
      variant='external'
      lines={['AI replies', 'over WebSocket']}
    />
    <Box
      x={270}
      y={270}
      w={200}
      h={52}
      title='Widget, Live Activity'
      lines={['Own fetch, cached fallback']}
    />

    <Arrow d='M95,108 V138' />
    <Label x={128} y={128}>
      intent
    </Label>
    <Arrow d='M180,183 H268' />
    <Label x={224} y={175}>
      calls
    </Label>

    <Arrow d='M470,74 H558' />
    <Label x={514} y={66}>
      REST
    </Label>
    <Arrow d='M470,192 H558' />
    <Label x={514} y={184}>
      stream
    </Label>

    <Arrow d='M370,270 V228' dashed />
    <Label x={425} y={253}>
      shared Keychain
    </Label>
    <Arrow d='M470,296 H762 V74 H743' dashed />
    <Label x={616} y={288}>
      own request
    </Label>
  </DiagramFigure>
);
