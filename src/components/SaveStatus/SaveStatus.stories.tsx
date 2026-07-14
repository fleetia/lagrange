import type { ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { Action } from '../Action/Action';
import { Stack } from '../Layout/Layout';
import { ThemeRoot } from '../../theme/ThemeRoot';
import { SaveStatus } from './SaveStatus';

const meta = {
  title: 'Components/SaveStatus',
  component: SaveStatus,
  decorators: [
    (Story): ReactElement => (
      <ThemeRoot style={{ minHeight: 220, padding: 32 }}>
        <div style={{ maxWidth: 480 }}><Story /></div>
      </ThemeRoot>
    ),
  ],
  tags: ['autodocs'],
  args: {
    state: 'saved',
  },
} satisfies Meta<typeof SaveStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <Stack gap="sm">
      <SaveStatus message="입력한 내용은 아직 저장되지 않았습니다." state="idle" />
      <SaveStatus message="3개 변경 사항을 저장하는 중입니다." state="saving" />
      <SaveStatus
        action={<Action size="compact" variant="quiet">변경 내역</Action>}
        message="오후 1:04에 저장했습니다."
        state="saved"
      />
      <SaveStatus
        action={<Action size="compact" variant="critical">다시 시도</Action>}
        message="네트워크 연결을 확인해 주세요."
        state="error"
      />
    </Stack>
  ),
};

export const States: Story = {
  render: () => (
    <Stack gap="sm">
      <SaveStatus state="idle" />
      <SaveStatus state="saving" />
      <SaveStatus state="saved" />
      <SaveStatus
        action={<Action size="compact" variant="critical">다시 시도</Action>}
        state="error"
      />
    </Stack>
  ),
};

export const Accessibility: Story = {
  render: () => (
    <SaveStatus
      action={<Action size="compact" variant="critical">다시 시도</Action>}
      message="저장하지 못했습니다."
      state="error"
    />
  ),
  play: async ({ canvas, userEvent }): Promise<void> => {
    const liveRegion = canvas.getByRole('alert');
    const action = canvas.getByRole('button', { name: '다시 시도' });

    await expect(liveRegion).toHaveAttribute('aria-live', 'assertive');
    await expect(liveRegion).toHaveAttribute('aria-atomic', 'true');
    await expect(liveRegion).toHaveTextContent('저장하지 못했습니다.');
    await expect(liveRegion.childElementCount).toBe(2);
    await expect(
      liveRegion.querySelector('[aria-hidden="true"]'),
    ).toHaveTextContent('×');
    await expect(liveRegion.contains(action)).toBe(false);

    await userEvent.tab();
    await expect(action).toHaveFocus();
  },
};
