import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { useRef, useState, type ReactElement } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Button } from '../Button/Button';
import { Dialog } from './Dialog';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

function DialogHarness(): ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open settings</Button>
      <Dialog
        footer={<Button onClick={() => setIsOpen(false)}>Save</Button>}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="Settings"
      >
        <button type="button">Inner action</button>
      </Dialog>
    </>
  );
}

describe('Dialog', () => {
  it('opens modally, ignores content clicks, and restores trigger focus after backdrop close', () => {
    render(<DialogHarness />);
    const trigger = screen.getByRole('button', { name: 'Open settings' });

    trigger.focus();
    fireEvent.click(trigger);

    const dialog = screen.getByRole<HTMLDialogElement>('dialog', {
      name: 'Settings',
    });

    expect(dialog.open).toBe(true);
    expect(dialog.getAttribute('aria-modal')).toBe('true');

    fireEvent.click(screen.getByRole('button', { name: 'Inner action' }));
    expect(dialog.open).toBe(true);

    fireEvent.click(dialog);
    expect(dialog.open).toBe(false);
    expect(document.activeElement).toBe(trigger);
  });

  it('keeps native cancel controlled and requests an Escape close', () => {
    const handleOpenChange = vi.fn();

    render(
      <Dialog
        isOpen
        onOpenChange={handleOpenChange}
        size="large"
        title="Preferences"
      >
        Preferences content
      </Dialog>,
    );
    const dialog = screen.getByRole<HTMLDialogElement>('dialog', {
      name: 'Preferences',
    });
    const cancelEvent = new Event('cancel', { cancelable: true });

    fireEvent(dialog, cancelEvent);

    expect(cancelEvent.defaultPrevented).toBe(true);
    expect(handleOpenChange).toHaveBeenCalledWith(false);
    expect(dialog.getAttribute('data-size')).toBe('large');
  });

  it('renders a footer and lets the close control request a controlled close', () => {
    const handleOpenChange = vi.fn();

    render(
      <Dialog
        closeLabel="Close preferences"
        footer={<Button>Apply</Button>}
        isOpen
        onOpenChange={handleOpenChange}
        title="Preferences"
      >
        Content
      </Dialog>,
    );

    expect(screen.getByRole('button', { name: 'Apply' })).toBeDefined();
    fireEvent.click(
      screen.getByRole('button', { name: 'Close preferences' }),
    );

    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it('ignores a delayed internal close event after reopening', async () => {
    vi.spyOn(
      HTMLDialogElement.prototype,
      'showModal',
    ).mockImplementation(function (this: HTMLDialogElement): void {
      this.setAttribute('open', '');
    });
    vi.spyOn(
      HTMLDialogElement.prototype,
      'close',
    ).mockImplementation(function (this: HTMLDialogElement): void {
      this.removeAttribute('open');
      setTimeout(() => this.dispatchEvent(new Event('close')), 0);
    });
    const handleOpenChange = vi.fn();

    function renderDialog(isOpen: boolean): ReactElement {
      return (
        <Dialog
          isOpen={isOpen}
          onOpenChange={handleOpenChange}
          title="Preferences"
        >
          Preferences content
        </Dialog>
      );
    }

    const { rerender } = render(renderDialog(true));
    rerender(renderDialog(false));
    rerender(renderDialog(true));

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(handleOpenChange).not.toHaveBeenCalled();
    expect(
      screen.getByRole<HTMLDialogElement>('dialog', { name: 'Preferences' })
        .open,
    ).toBe(true);
  });
});

function ConfirmationComposition({
  onConfirm,
  onOpenChange,
}: {
  onConfirm: () => void;
  onOpenChange: (isOpen: boolean) => void;
}): ReactElement {
  const cancelButtonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <Dialog
      aria-describedby="discard-description"
      footer={(
        <>
          <Button
            ref={cancelButtonRef}
            onClick={() => onOpenChange(false)}
            variant="secondary"
          >
            Keep editing
          </Button>
          <Button onClick={onConfirm} variant="critical">
            Discard changes
          </Button>
        </>
      )}
      initialFocusRef={cancelButtonRef}
      isOpen
      onOpenChange={onOpenChange}
      role="alertdialog"
      size="small"
      title="Discard changes?"
    >
      <span id="discard-description">Unsaved changes will be lost.</span>
    </Dialog>
  );
}

describe('Dialog confirmation composition', () => {
  it('focuses the safe action and forwards both decisions', () => {
    const handleConfirm = vi.fn();
    const handleOpenChange = vi.fn();

    render(
      <ConfirmationComposition
        onConfirm={handleConfirm}
        onOpenChange={handleOpenChange}
      />,
    );

    const dialog = screen.getByRole('alertdialog', {
      name: 'Discard changes?',
    });
    const cancelButton = screen.getByRole('button', { name: 'Keep editing' });

    expect(dialog.getAttribute('aria-describedby')).toBeTruthy();
    expect(document.activeElement).toBe(cancelButton);

    fireEvent.click(screen.getByRole('button', { name: 'Discard changes' }));
    fireEvent.click(cancelButton);

    expect(handleConfirm).toHaveBeenCalledTimes(1);
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });
});
