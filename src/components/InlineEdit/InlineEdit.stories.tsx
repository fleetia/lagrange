import type { ReactElement } from 'react';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { Stack } from '../Layout/Layout';
import { ThemeRoot } from '../../theme/ThemeRoot';
import { InlineEdit } from './InlineEdit';

const meta = {
  title: 'Components/Input/InlineEdit',
  id: 'components-inlineedit',
  component: InlineEdit,
  decorators: [
    (Story): ReactElement => (
      <ThemeRoot style={{ minHeight: 220, padding: 32 }}>
        <div style={{ maxWidth: 420 }}><Story /></div>
      </ThemeRoot>
    ),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '읽기 상태와 compact text input을 같은 자리에서 전환하는 inline editor입니다. Enter 또는 blur로 commit하고 Escape로 이전 값에 복귀합니다.',
      },
    },
  },
  args: {
    ariaLabel: '내용',
    onCommit: () => undefined,
    value: '카페라떼',
  },
} satisfies Meta<typeof InlineEdit>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <Stack gap="md">
      <InlineEdit ariaLabel="짧은 값" onCommit={() => undefined} value="카페라떼" />
      <InlineEdit
        ariaLabel="빈 값 안내"
        emptyLabel="클릭하여 입력"
        onCommit={() => undefined}
        value=""
      />
      <InlineEdit
        ariaLabel="숫자 값"
        inputProps={{ inputMode: 'numeric' }}
        onCommit={() => undefined}
        value="6,500"
      />
    </Stack>
  ),
};

export const States: Story = {
  render: () => (
    <Stack gap="md">
      <InlineEdit ariaLabel="기본" onCommit={() => undefined} value="카페라떼" />
      <InlineEdit ariaLabel="빈 값" onCommit={() => undefined} value="" />
      <InlineEdit ariaLabel="저장 중" isPending onCommit={() => undefined} value="저장 중" />
      <InlineEdit ariaLabel="오류" error="저장하지 못했습니다." onCommit={() => undefined} value="오류 값" />
      <InlineEdit ariaLabel="읽기 전용" onCommit={() => undefined} readOnly value="고정값" />
    </Stack>
  ),
};

function EditableExample(): ReactElement {
  const [value, setValue] = useState('카페라떼');

  return (
    <InlineEdit
      ariaLabel="내용"
      data-testid="inline-edit"
      onCommit={setValue}
      value={value}
    />
  );
}

function AccessibleEditableExample(): ReactElement {
  const [value, setValue] = useState('카페라떼');

  return (
    <Stack gap="sm">
      <InlineEdit
        ariaLabel="키보드 내용"
        onCommit={setValue}
        value={value}
      />
      <output aria-live="polite">저장된 값: {value}</output>
    </Stack>
  );
}

export const KeyboardEditing: Story = {
  render: EditableExample,
  play: async ({ canvas, userEvent }): Promise<void> => {
    await userEvent.click(canvas.getByRole('button', { name: '내용 수정' }));
    const input = canvas.getByRole('textbox', { name: '내용' });
    await userEvent.clear(input);
    await userEvent.type(input, '저녁 식사{Enter}');
    await expect(canvas.getByText('저녁 식사')).toBeVisible();
  },
};

export const Accessibility: Story = {
  render: AccessibleEditableExample,
  play: async ({ canvas, userEvent }): Promise<void> => {
    const trigger = canvas.getByRole('button', { name: '키보드 내용 수정' });

    await userEvent.tab();
    await expect(trigger).toHaveFocus();
    await userEvent.keyboard('{Enter}');

    const input = canvas.getByRole('textbox', { name: '키보드 내용' });
    await expect(input).toHaveFocus();
    await userEvent.clear(input);
    await userEvent.type(input, '저녁 식사');
    await userEvent.keyboard('{Enter}');

    await expect(canvas.getByText('저장된 값: 저녁 식사')).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: '키보드 내용 수정' }),
    ).toHaveFocus();
  },
};
