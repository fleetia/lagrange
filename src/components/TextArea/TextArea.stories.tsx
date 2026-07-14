import type { ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { FormField } from '../FormField/FormField';
import { Stack } from '../Layout/Layout';
import { ThemeRoot } from '../../theme/ThemeRoot';
import { TextArea } from './TextArea';

const meta = {
  title: 'Components/TextArea',
  component: TextArea,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    'aria-label': '메모',
    placeholder: '자세한 내용을 입력하세요.',
  },
  argTypes: {
    resize: { control: 'select', options: ['none', 'vertical', 'both'] },
  },
} satisfies Meta<typeof TextArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args): ReactElement => (
    <ThemeRoot><TextArea {...args} /></ThemeRoot>
  ),
};

export const Variants: Story = {
  render: (): ReactElement => (
    <ThemeRoot>
      <Stack gap="md">
        <FormField label="고정 높이"><TextArea resize="none" /></FormField>
        <FormField label="세로 조절"><TextArea resize="vertical" /></FormField>
        <FormField label="양방향 조절"><TextArea resize="both" /></FormField>
      </Stack>
    </ThemeRoot>
  ),
};

export const States: Story = {
  render: (): ReactElement => (
    <ThemeRoot>
      <Stack gap="md">
        <FormField label="기본"><TextArea defaultValue="수정할 수 있는 메모" /></FormField>
        <FormField label="비활성"><TextArea defaultValue="잠긴 메모" disabled /></FormField>
        <FormField error="내용을 다시 확인하세요." label="오류">
          <TextArea defaultValue="검토가 필요한 메모" />
        </FormField>
      </Stack>
    </ThemeRoot>
  ),
};

export const Accessibility: Story = {
  render: (): ReactElement => (
    <ThemeRoot>
      <FormField
        description="입력한 설명은 항목과 함께 저장됩니다."
        label="상세 설명"
        required
      >
        <TextArea placeholder="두 줄 이상의 설명" />
      </FormField>
    </ThemeRoot>
  ),
};
