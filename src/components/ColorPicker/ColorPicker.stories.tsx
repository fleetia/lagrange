import { useState } from 'react';
import type { ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { ThemeRoot } from '../../theme/ThemeRoot';
import { FormField } from '../FormField';
import { Stack } from '../Layout';
import { ColorPicker } from './ColorPicker';
import type { ColorPickerProps } from './types';

function ControlledPicker(props: ColorPickerProps): ReactElement {
  const [value, setValue] = useState(props.value);
  return <ColorPicker {...props} value={value} onValueChange={setValue} />;
}

const meta = {
  title: 'Components/Input/ColorPicker',
  id: 'components-colorpicker',
  component: ColorPicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Compact controlled color selector. Opens an anchored dialog with a keyboard-operable hue wheel, saturation/lightness controls, native color input and HEX/RGBA/HSLA channel editing. Values are normalized to hex (or hex8 with showAlpha). Coarse pointers retain the native picker and alpha control. Escape closes the panel after reverting any active input draft.',
      },
    },
  },
  decorators: [
    (Story): ReactElement => (
      <ThemeRoot style={{ padding: 24, minHeight: 650 }}>
        <Story />
      </ThemeRoot>
    ),
  ],
  args: { label: '승', value: '#663399' },
  render: (args): ReactElement => <ControlledPicker {...args} />,
} satisfies Meta<typeof ColorPicker>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Variants: Story = {
  render: (): ReactElement => (
    <Stack gap="md">
      <FormField label="승">
        <ControlledPicker label="승" value="#e53b34" />
      </FormField>
      <FormField label="오버레이">
        <ControlledPicker label="오버레이" value="#66339980" showAlpha />
      </FormField>
    </Stack>
  ),
};
export const States: Story = {
  render: (): ReactElement => (
    <Stack gap="md">
      <ControlledPicker label="기본" value="#663399" />
      <ColorPicker label="읽기 전용" value="#667744" readOnly />
      <ColorPicker label="비활성" value="#9b4635" disabled />
      <FormField label="오류" error="지원하는 색상을 입력하세요.">
        <ColorPicker label="오류" value="invalid" />
      </FormField>
    </Stack>
  ),
};
export const Accessibility: Story = {
  args: { showAlpha: true, value: '#ff000080' },
  play: async ({ canvas, userEvent }): Promise<void> => {
    const trigger = canvas.getByRole('button', { name: '승: #ff000080' });
    await userEvent.hover(trigger);
    await userEvent.tab();
    await expect(trigger).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    const panel = within(canvas.getByRole('dialog', { name: '승 색상 선택' }));
    const input = panel.getByRole('textbox', { name: 'CSS color' });
    await expect(input).toHaveFocus();
    await userEvent.clear(input);
    await userEvent.type(input, '#00ff0080{Enter}');
    await expect(input).toHaveValue('#00ff0080');
    const wheel = panel.getByRole('slider', { name: 'Hue' });
    await userEvent.click(wheel);
    await userEvent.keyboard('{Home}{ArrowRight}');
    await expect(wheel).toHaveAttribute('aria-valuenow', '1');
    await userEvent.keyboard('{Escape}');
    await expect(trigger).toHaveFocus();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  },
};
