import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { DateField } from '../DateField/DateField';
import { FormField } from '../FormField/FormField';
import { Stack } from '../Layout/Layout';
import { Select } from '../Select/Select';
import { TextField } from '../TextField/TextField';
import { ThemeRoot } from '../../theme/ThemeRoot';
import { FieldGrid, FieldGroup } from './FieldGroup';

const DEFAULT_FIELDS = (
  <FieldGrid>
    <FormField label="거래일" marker="A1">
      <DateField defaultValue="2026-07-14" />
    </FormField>
    <FormField label="내용" marker="A2">
      <TextField defaultValue="카페라떼" />
    </FormField>
  </FieldGrid>
);

const meta = {
  title: 'Components/Structure/FieldGroup',
  id: 'components-fieldgroup',
  component: FieldGroup,
  subcomponents: { FieldGrid },
  decorators: [
    (Story) => (
      <ThemeRoot className="lagrange-story lagrange-story--compact">
        <Story />
      </ThemeRoot>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Semantic fieldset grouping with a structural double rule and responsive field grid.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FieldGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: DEFAULT_FIELDS,
    description: '한 번에 함께 읽고 수정하는 입력 묶음입니다.',
    legend: '기본 정보',
  },
};

export const Variants: Story = {
  args: {
    children: DEFAULT_FIELDS,
    legend: '입력 배치',
  },
  render: () => (
    <Stack gap="xxl">
      <FieldGroup legend="한 열">
        <FieldGrid columns="single">
          <FormField label="내용">
            <TextField defaultValue="카페라떼" />
          </FormField>
        </FieldGrid>
      </FieldGroup>
      <FieldGroup legend="두 열">
        <FieldGrid columns="double">
          <FormField label="거래일">
            <DateField defaultValue="2026-07-14" />
          </FormField>
          <FormField label="내용">
            <TextField defaultValue="카페라떼" />
          </FormField>
        </FieldGrid>
      </FieldGroup>
      <FieldGroup legend="자동 열">
        <FieldGrid columns="auto">
          <FormField label="구분">
            <Select defaultValue="expense">
              <option value="expense">지출</option>
              <option value="income">수입</option>
            </Select>
          </FormField>
          <FormField label="거래일">
            <DateField defaultValue="2026-07-14" />
          </FormField>
          <FormField label="내용">
            <TextField defaultValue="카페라떼" />
          </FormField>
        </FieldGrid>
      </FieldGroup>
    </Stack>
  ),
};

export const States: Story = {
  args: {
    children: DEFAULT_FIELDS,
    legend: '입력 상태',
  },
  render: () => (
    <Stack gap="xxl">
      <FieldGroup description="모든 하위 control을 함께 비활성화합니다." disabled legend="잠긴 정보">
        {DEFAULT_FIELDS}
      </FieldGroup>
      <FieldGroup description="개별 FormField가 자신의 오류를 설명합니다." legend="검토 필요">
        <FieldGrid>
          <FormField error="날짜를 확인하세요" label="거래일">
            <DateField defaultValue="2025-12-31" />
          </FormField>
          <FormField error="내용을 입력하세요" label="내용">
            <TextField />
          </FormField>
        </FieldGrid>
      </FieldGroup>
    </Stack>
  ),
};

export const Accessibility: Story = {
  args: {
    children: DEFAULT_FIELDS,
    legend: '키보드 입력 순서',
  },
  render: () => (
    <FieldGroup
      description="DOM 순서와 시각 순서를 같게 유지합니다."
      legend="키보드 입력 순서"
    >
      <FieldGrid>
        <FormField label="첫 번째 입력">
          <TextField />
        </FormField>
        <FormField label="두 번째 입력">
          <DateField />
        </FormField>
      </FieldGrid>
    </FieldGroup>
  ),
  play: async ({ canvas, userEvent }): Promise<void> => {
    const first = canvas.getByLabelText('첫 번째 입력');
    const second = canvas.getByLabelText('두 번째 입력');

    await userEvent.tab();
    await expect(first).toHaveFocus();
    await userEvent.tab();
    await expect(second).toHaveFocus();
  },
};
