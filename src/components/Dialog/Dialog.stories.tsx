import type { ReactElement, ReactNode } from 'react';
import { useId, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';

import { ThemeRoot } from '../../theme/ThemeRoot';
import { Button } from '../Button/Button';
import { Stack } from '../Layout/Layout';
import { Text } from '../Typography/Typography';
import { Dialog, type DialogSize } from './Dialog';

type DialogExampleProps = {
  children: ReactNode;
  initialIsOpen?: boolean;
  size?: DialogSize;
  title: ReactNode;
};

function DialogExample({
  children,
  initialIsOpen = true,
  size = 'medium',
  title,
}: DialogExampleProps): ReactElement {
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  return (
    <ThemeRoot className="lagrange-story lagrange-story--compact">
      <Button onClick={() => setIsOpen(true)}>Open dialog</Button>
      <Dialog
        closeLabel="Close dialog"
        footer={(
          <>
            <Button onClick={() => setIsOpen(false)} variant="quiet">
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>Save changes</Button>
          </>
        )}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        size={size}
        title={title}
      >
        {children}
      </Dialog>
    </ThemeRoot>
  );
}

function ConfirmationDialogExample(): ReactElement {
  const [isOpen, setIsOpen] = useState(true);
  const cancelButtonRef = useRef<HTMLButtonElement | null>(null);
  const descriptionId = `dialog-confirm-${useId()}`;

  return (
    <ThemeRoot className="lagrange-story lagrange-story--compact">
      <Button onClick={() => setIsOpen(true)}>Reset theme</Button>
      <Dialog
        aria-describedby={descriptionId}
        footer={(
          <>
            <Button
              ref={cancelButtonRef}
              onClick={() => setIsOpen(false)}
              variant="secondary"
            >
              Keep theme
            </Button>
            <Button
              onClick={() => setIsOpen(false)}
              variant="critical"
            >
              Reset theme
            </Button>
          </>
        )}
        initialFocusRef={cancelButtonRef}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        role="alertdialog"
        size="small"
        title="Reset appearance?"
      >
        <Text id={descriptionId}>
          Your custom colors will be replaced with the Lagrange defaults.
        </Text>
      </Dialog>
    </ThemeRoot>
  );
}

const meta = {
  title: 'Components/Overlay/Dialog',
  id: 'components-dialog',
  component: Dialog,
  args: {
    children: 'Dialog content',
    isOpen: true,
    onOpenChange: fn(),
    title: 'Dialog title',
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A controlled native dialog with modal focus behavior, backdrop and Escape dismissal, focus restoration, three sizes, and an optional footer.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (): ReactElement => (
    <DialogExample title="Settings">
      <Stack gap="md">
        <Text weight="strong">General preferences</Text>
        <Text tone="muted">
          Changes remain in a draft until the footer action saves them.
        </Text>
      </Stack>
    </DialogExample>
  ),
};

export const Variants: Story = {
  render: (): ReactElement => (
    <DialogExample size="large" title="Starlit appearance">
      <Stack gap="lg">
        <Text weight="strong">Large settings surface</Text>
        <Text>
          The large size leaves room for nested navigation and a live bookmark
          preview without introducing a separate modal primitive.
        </Text>
      </Stack>
    </DialogExample>
  ),
};

export const States: Story = {
  render: (): ReactElement => <ConfirmationDialogExample />,
};

export const Accessibility: Story = {
  render: (): ReactElement => (
    <DialogExample initialIsOpen={false} title="Keyboard settings">
      <Text>Escape closes the dialog and returns focus to its trigger.</Text>
    </DialogExample>
  ),
  play: async ({ canvas, userEvent }): Promise<void> => {
    const trigger = canvas.getByRole('button', { name: 'Open dialog' });

    await userEvent.click(trigger);
    await expect(
      canvas.getByRole('dialog', { name: 'Keyboard settings' }),
    ).toBeVisible();

    await userEvent.keyboard('{Escape}');
    await expect(trigger).toHaveFocus();

    await userEvent.click(trigger);
    await expect(
      canvas.getByRole('dialog', { name: 'Keyboard settings' }),
    ).toBeVisible();
  },
};
