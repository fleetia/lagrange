import type { ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { ThemeRoot } from '../../theme/ThemeRoot';
import { Stack } from '../Layout/Layout';
import { Text } from '../Typography/Typography';
import {
  Tab,
  TabList,
  TabPanel,
  Tabs,
  type TabsOrientation,
} from './Tabs';

type SettingsTabsProps = {
  hasDisabledAppearance?: boolean;
  label: string;
  orientation?: TabsOrientation;
};

function SettingsTabs({
  hasDisabledAppearance = false,
  label,
  orientation = 'horizontal',
}: SettingsTabsProps): ReactElement {
  return (
    <Tabs defaultValue="general" orientation={orientation}>
      <TabList aria-label={label}>
        <Tab value="general">General</Tab>
        <Tab disabled={hasDisabledAppearance} value="appearance">
          Appearance
        </Tab>
        <Tab value="layout">Layout</Tab>
        <Tab value="css">CSS</Tab>
      </TabList>
      <TabPanel value="general">
        <Text>Language, backup, and reset controls.</Text>
      </TabPanel>
      <TabPanel value="appearance">
        <Text>Background, container, bookmark, and folder colors.</Text>
      </TabPanel>
      <TabPanel value="layout">
        <Text>Grid density, bookmark direction, and group layout.</Text>
      </TabPanel>
      <TabPanel value="css">
        <Text>Sanitized custom CSS overrides.</Text>
      </TabPanel>
    </Tabs>
  );
}

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Compound tabs with controlled or uncontrolled selection, automatic keyboard activation, roving focus, and horizontal or vertical navigation.',
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeRoot className="lagrange-story lagrange-story--compact">
        <Story />
      </ThemeRoot>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (): ReactElement => (
    <SettingsTabs label="Settings sections" />
  ),
};

export const Variants: Story = {
  render: (): ReactElement => (
    <Stack gap="xl">
      <section aria-labelledby="horizontal-tabs-heading">
        <Text
          as="p"
          id="horizontal-tabs-heading"
          variant="label"
          weight="strong"
        >
          Horizontal
        </Text>
        <SettingsTabs label="Horizontal settings sections" />
      </section>
      <section aria-labelledby="vertical-tabs-heading">
        <Text
          as="p"
          id="vertical-tabs-heading"
          variant="label"
          weight="strong"
        >
          Vertical
        </Text>
        <SettingsTabs
          label="Vertical appearance sections"
          orientation="vertical"
        />
      </section>
    </Stack>
  ),
};

export const States: Story = {
  render: (): ReactElement => (
    <SettingsTabs
      hasDisabledAppearance
      label="Settings with unavailable appearance"
    />
  ),
};

export const Accessibility: Story = {
  render: (): ReactElement => (
    <SettingsTabs
      hasDisabledAppearance
      label="Keyboard settings sections"
    />
  ),
  play: async ({ canvas, userEvent }): Promise<void> => {
    const generalTab = canvas.getByRole('tab', { name: 'General' });
    const layoutTab = canvas.getByRole('tab', { name: 'Layout' });
    const cssTab = canvas.getByRole('tab', { name: 'CSS' });

    await userEvent.tab();
    await expect(generalTab).toHaveFocus();

    await userEvent.keyboard('[ArrowRight]');
    await expect(layoutTab).toHaveFocus();
    await expect(layoutTab).toHaveAttribute('aria-selected', 'true');

    await userEvent.keyboard('[End]');
    await expect(cssTab).toHaveFocus();
    await expect(cssTab).toHaveAttribute('aria-selected', 'true');

    await userEvent.keyboard('[Home]');
    await expect(generalTab).toHaveFocus();
    await expect(generalTab).toHaveAttribute('aria-selected', 'true');
  },
};
