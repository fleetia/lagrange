import { StrictMode, type ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Action,
  Heading,
  Inline,
  Rule,
  Stack,
  Text,
  ThemeRoot,
} from '@fleetia/lagrange';

import '@fleetia/lagrange/styles.css';
import './consumer.css';

export function ConsumerApp(): ReactElement {
  return (
    <ThemeRoot className="consumer-shell">
      <Stack gap="lg">
        <Stack gap="xs">
          <Text tone="muted" variant="caption" weight="strong">
            EXTERNAL CONSUMER · WORKSPACE PROTOCOL
          </Text>
          <Heading level={1} variant="display">
            Lagrange is connected.
          </Heading>
          <Text as="p" tone="muted">
            This Vite app imports the public package entry and its exported stylesheet.
          </Text>
        </Stack>
        <Rule variant="structural" />
        <Inline gap="lg" justify="between">
          <Text variant="data">@fleetia/lagrange · workspace:*</Text>
          <Action size="compact">새 기록</Action>
        </Inline>
      </Stack>
    </ThemeRoot>
  );
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Consumer root element was not found.');
}

createRoot(rootElement).render(
  <StrictMode>
    <ConsumerApp />
  </StrictMode>,
);
