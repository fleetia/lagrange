import type { Preview } from '@storybook/react-vite';

import './preview.css';

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    a11y: {
      test: 'error',
    },
    backgrounds: {
      disable: true,
    },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'fullscreen',
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Foundations',
          [
            'Visual Language',
            'ThemeRoot',
            'Typography',
            'Layout',
            'Rule',
            'VisuallyHidden',
            '*',
          ],
          'Components',
          [
            'Structure',
            'Command',
            'Input',
            'Choice',
            'Overlay',
            'Feedback',
            'Data',
            '*',
          ],
          'Compositions',
          '*',
        ],
      },
    },
  },
};

export default preview;
