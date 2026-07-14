import type { CSSProperties, ReactElement } from 'react';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { ThemeRoot } from '../../theme/ThemeRoot';
import { tokens } from '../../theme/tokens';
import { Action } from '../Action/Action';
import { Toolbar, type ToolbarBoundary } from './Toolbar';

const BOUNDARIES: readonly ToolbarBoundary[] = [
  'none',
  'weak',
  'boundary',
  'structural',
];

const LABEL_STYLE: CSSProperties = {
  margin: 0,
  color: tokens.color.inkMuted,
  fontFamily: tokens.font.data,
  fontSize: tokens.fontSize.caption,
};

function AccessibleToolbarStory(): ReactElement {
  const [message, setMessage] = useState('선택 대기');

  return (
    <div style={{ display: 'grid', gap: tokens.space.md }}>
      <Toolbar label="거래 편집 도구">
        <Action onClick={() => setMessage('거래 추가 선택됨')}>거래 추가</Action>
        <Action onClick={() => setMessage('내보내기 선택됨')} variant="quiet">
          내보내기
        </Action>
      </Toolbar>
      <output aria-live="polite" role="status">
        {message}
      </output>
    </div>
  );
}

const meta = {
  title: 'Components/Toolbar',
  component: Toolbar,
  args: {
    children: [
      <Action key="add">거래 추가</Action>,
      <Action key="export" variant="quiet">
        내보내기
      </Action>,
    ],
    label: '거래 도구',
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Toolbar는 controls를 labelled group으로 묶고 native Tab order를 유지합니다. Rule과 alignment만 제공하며 ARIA toolbar의 arrow-key behavior를 가장하지 않습니다.',
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeRoot style={{ padding: tokens.space.xl }}>
        <Story />
      </ThemeRoot>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    align: {
      control: 'select',
      options: ['start', 'end', 'between'],
    },
    boundary: {
      control: 'select',
      options: BOUNDARIES,
    },
  },
} satisfies Meta<typeof Toolbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (): ReactElement => (
    <div style={{ display: 'grid', gap: tokens.space.lg }}>
      {BOUNDARIES.map((boundary) => (
        <div key={boundary}>
          <p style={LABEL_STYLE}>{boundary}</p>
          <Toolbar boundary={boundary} label={`${boundary} 거래 도구`}>
            <Action size="compact">추가</Action>
            <Action size="compact" variant="quiet">
              내보내기
            </Action>
          </Toolbar>
        </div>
      ))}
    </div>
  ),
};

export const States: Story = {
  render: (): ReactElement => (
    <div style={{ maxWidth: '20rem' }}>
      <Toolbar boundary="structural" label="좁은 화면 거래 도구" wrap>
        <Action size="compact">추가</Action>
        <Action size="compact">복제</Action>
        <Action size="compact" variant="quiet">
          내보내기
        </Action>
        <Action disabled size="compact" variant="critical">
          삭제
        </Action>
      </Toolbar>
    </div>
  ),
};

export const Accessibility: Story = {
  render: AccessibleToolbarStory,
  play: async ({ canvas, userEvent }): Promise<void> => {
    const group = canvas.getByRole('group', { name: '거래 편집 도구' });
    const addAction = canvas.getByRole('button', { name: '거래 추가' });
    const exportAction = canvas.getByRole('button', { name: '내보내기' });

    await expect(group).toBeVisible();
    await userEvent.tab();
    await expect(addAction).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(canvas.getByRole('status')).toHaveTextContent('거래 추가 선택됨');
    await userEvent.tab();
    await expect(exportAction).toHaveFocus();
  },
};
