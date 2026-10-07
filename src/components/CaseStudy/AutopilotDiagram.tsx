import React from 'react';

import { Arrow, Box, DiagramFigure, Label } from './diagram';

/**
 * Autopilot's execution model: the backend classifies crumbs and evaluates
 * rules within guardrails; local executors pull assignments over MCP; results
 * wait for the user's approval in the app.
 */
export const AutopilotDiagram = () => (
  <DiagramFigure
    name='autopilot'
    width={750}
    height={320}
    description='Autopilot architecture. In the Syncflow app you build rules, run tests, approve, reject or edit results, and can pause everything. The Syncflow backend classifies each crumb, evaluates rules, enforces guardrails and records assignments and activity, calling your AI provider with your own key for cloud actions. On your own machine, Claude Code with the Syncflow MCP server in executor mode sends heartbeats, claims assignments and submits results; nothing is pushed to it. Results come back to the app as for approval.'
    caption={
      <>
        Your machine pulls work; nothing is pushed into it. Without{' '}
        <code>SYNCFLOW_EXECUTOR=1</code> the MCP server still offers Syncflow
        tools but never picks up assignments.
      </>
    }
  >
    <Box
      x={10}
      y={40}
      w={180}
      h={150}
      title='Syncflow app'
      lines={[
        'Focus Flow',
        'Approve, reject or edit',
        'Builder and test run',
        'Pause everything',
      ]}
    />
    <Box
      x={280}
      y={40}
      w={190}
      h={150}
      title='Syncflow backend'
      variant='highlight'
      lines={[
        'Classify each crumb',
        'Evaluate rules',
        'Enforce guardrails',
        'Assignments and Activity',
      ]}
    />
    <Box
      x={560}
      y={40}
      w={180}
      h={150}
      title='Your machine'
      lines={['Claude Code', '@syncflowme/mcp-server', 'SYNCFLOW_EXECUTOR=1']}
    />
    <Box
      x={280}
      y={250}
      w={190}
      h={44}
      title='AI provider (your key)'
      variant='external'
    />

    <Arrow d='M190,90 H278' />
    <Label x={235} y={82}>
      rules
    </Label>
    <Arrow d='M280,150 H192' />
    <Label x={235} y={142}>
      for approval
    </Label>

    <Arrow d='M560,72 H472' />
    <Label x={515} y={64}>
      heartbeat
    </Label>
    <Arrow d='M560,104 H472' />
    <Label x={515} y={96}>
      claim
    </Label>
    <Arrow d='M472,136 H558' />
    <Label x={515} y={128}>
      assignment
    </Label>
    <Arrow d='M560,168 H472' />
    <Label x={515} y={160}>
      submit result
    </Label>

    <Arrow d='M375,190 V248' />
    <Label x={425} y={224}>
      cloud actions
    </Label>
  </DiagramFigure>
);
