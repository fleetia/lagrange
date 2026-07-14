import type { ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { ThemeRoot } from '../../theme/ThemeRoot';
import { VisuallyHidden } from './VisuallyHidden';

const meta = {
  title: 'Components/VisuallyHidden',
  component: VisuallyHidden,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof VisuallyHidden>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '보조 기술에서만 읽히는 설명',
  },
  render: (args): ReactElement => (
    <ThemeRoot>
      화면에는 이 문장만 보입니다.
      <VisuallyHidden {...args} />
    </ThemeRoot>
  ),
};

export const Variants: Story = {
  render: (): ReactElement => (
    <ThemeRoot>
      <VisuallyHidden>항상 숨겨진 보조 설명</VisuallyHidden>
      <VisuallyHidden isFocusable tabIndex={0}>
        포커스되면 표시되는 건너뛰기 링크
      </VisuallyHidden>
    </ThemeRoot>
  ),
};

export const States: Story = {
  render: (): ReactElement => (
    <ThemeRoot>
      <button type="button">
        <span aria-hidden="true">×</span>
        <VisuallyHidden>닫기</VisuallyHidden>
      </button>
    </ThemeRoot>
  ),
};

export const Accessibility: Story = {
  render: (): ReactElement => (
    <ThemeRoot>
      <button type="button">
        <span aria-hidden="true">→</span>
        <VisuallyHidden>다음 항목</VisuallyHidden>
      </button>
    </ThemeRoot>
  ),
};
