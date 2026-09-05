import { useState } from 'react';
import type { ReactElement } from 'react';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { FormField } from '../FormField';
import { ColorPicker } from './ColorPicker';

afterEach(cleanup);

function ControlledPicker({
  initialValue = '#66339980',
}: {
  initialValue?: string;
}): ReactElement {
  const [value, setValue] = useState(initialValue);
  return (
    <ColorPicker label="승" value={value} onValueChange={setValue} showAlpha />
  );
}

function openPicker(): HTMLElement {
  fireEvent.click(screen.getByRole('button', { name: /승:/ }));
  return screen.getByRole('dialog', { name: '승 색상 선택' });
}

describe('ColorPicker', () => {
  it('connects the trigger to FormField without leaking its id into panel controls', () => {
    const { container } = render(
      <form>
        <FormField label="승" error="색상을 확인하세요.">
          <ColorPicker
            label="승"
            value="#663399"
            name="win"
            className="custom-picker"
          />
        </FormField>
      </form>,
    );
    const trigger = screen.getByRole('button', { name: '승: #663399' });
    expect(trigger.className).toContain('custom-picker');
    expect(trigger.getAttribute('aria-invalid')).toBe('true');
    expect(trigger.getAttribute('aria-haspopup')).toBe('dialog');
    const panel = openPicker();
    expect(
      within(panel).getByRole('textbox', { name: 'CSS color' }).id,
    ).not.toBe(trigger.id);
    expect(
      new FormData(container.querySelector('form') ?? undefined).getAll('win'),
    ).toEqual(['#663399']);
  });

  it('commits valid CSS colors and preserves alpha when native RGB channels change', () => {
    render(<ControlledPicker />);
    const panel = openPicker();
    const input = within(panel).getByRole<HTMLInputElement>('textbox', {
      name: 'CSS color',
    });
    fireEvent.change(input, { target: { value: 'rgba(255, 0, 0, 0.5)' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(input.value).toBe('#ff000080');
    fireEvent.change(within(panel).getByLabelText('승 기본 색상 선택'), {
      target: { value: '#00ff00' },
    });
    expect(input.value).toBe('#00ff0080');
    fireEvent.change(within(panel).getByRole('slider', { name: 'Alpha' }), {
      target: { value: '25' },
    });
    expect(input.value).toBe('#00ff0040');
  });

  it('edits RGB and HSL channels through draft input and retains invalid drafts until commit', () => {
    render(<ControlledPicker />);
    const panel = openPicker();
    const format = within(panel).getByRole('combobox', {
      name: 'Color format',
    });
    fireEvent.change(format, { target: { value: 'rgba' } });
    const red = within(panel).getByRole<HTMLInputElement>('textbox', {
      name: 'R',
    });
    fireEvent.change(red, { target: { value: '' } });
    fireEvent.change(red, { target: { value: '255' } });
    fireEvent.keyDown(red, { key: 'Enter' });
    expect(
      within(panel).getByRole<HTMLInputElement>('textbox', {
        name: 'CSS color',
      }).value,
    ).toBe('#ff339980');
    fireEvent.change(format, { target: { value: 'hsla' } });
    const lightness = within(panel).getByRole('textbox', { name: 'L' });
    fireEvent.change(lightness, { target: { value: '0' } });
    fireEvent.blur(lightness);
    expect(
      within(panel).getByRole<HTMLInputElement>('textbox', {
        name: 'CSS color',
      }).value,
    ).toBe('#00000080');
  });

  it.each(['#000000ff', '#ffffffff'])(
    'keeps saturation edits at %s until lightness reveals the color',
    (initialValue) => {
      render(<ControlledPicker initialValue={initialValue} />);
      const panel = openPicker();
      const saturation = within(panel).getByRole<HTMLInputElement>('slider', {
        name: 'Saturation',
      });
      const lightness = within(panel).getByRole('slider', {
        name: 'Lightness',
      });
      fireEvent.change(saturation, { target: { value: '100' } });
      expect(saturation.value).toBe('100');
      fireEvent.change(lightness, { target: { value: '50' } });
      expect(
        within(panel).getByRole<HTMLInputElement>('textbox', {
          name: 'CSS color',
        }).value,
      ).toBe('#ff0000ff');
    },
  );

  it.each(['0', '100'])(
    'preserves chromatic saturation through lightness %s',
    (lightnessValue) => {
      render(<ControlledPicker initialValue="#ff000080" />);
      const panel = openPicker();
      const lightness = within(panel).getByRole('slider', {
        name: 'Lightness',
      });
      fireEvent.change(lightness, { target: { value: lightnessValue } });
      expect(
        within(panel).getByRole<HTMLInputElement>('slider', {
          name: 'Saturation',
        }).value,
      ).toBe('100');
      fireEvent.change(lightness, { target: { value: '50' } });
      expect(
        within(panel).getByRole<HTMLInputElement>('textbox', {
          name: 'CSS color',
        }).value,
      ).toBe('#ff000080');
    },
  );

  it('synchronizes a different external color and preserves HSL through alpha-only changes', () => {
    const { rerender } = render(
      <ColorPicker label="승" value="#00000080" showAlpha />,
    );
    const panel = openPicker();
    const saturation = within(panel).getByRole<HTMLInputElement>('slider', {
      name: 'Saturation',
    });
    fireEvent.change(saturation, { target: { value: '100' } });
    rerender(<ColorPicker label="승" value="#00000040" showAlpha />);
    expect(saturation.value).toBe('100');
    rerender(<ColorPicker label="승" value="#80808040" showAlpha />);
    expect(saturation.value).toBe('0');
    expect(
      Number(
        within(panel).getByRole<HTMLInputElement>('slider', {
          name: 'Lightness',
        }).value,
      ),
    ).toBeCloseTo(50.2, 1);
  });

  it('keeps controlled values authoritative and does not emit for malformed CSS', () => {
    const onValueChange = vi.fn();
    render(
      <ColorPicker label="승" value="#663399" onValueChange={onValueChange} />,
    );
    const panel = openPicker();
    const input = within(panel).getByRole<HTMLInputElement>('textbox', {
      name: 'CSS color',
    });
    fireEvent.change(input, { target: { value: '#12' } });
    fireEvent.blur(input);
    expect(onValueChange).not.toHaveBeenCalled();
    fireEvent.change(input, { target: { value: '#ff0000' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onValueChange).toHaveBeenLastCalledWith('#ff0000');
    expect(input.value).toBe('#663399');
  });

  it('keeps HSL controls synchronized when the parent rejects an edit', () => {
    const onValueChange = vi.fn();
    render(
      <ColorPicker label="승" value="#ff0000" onValueChange={onValueChange} />,
    );
    const panel = openPicker();
    const saturation = within(panel).getByRole<HTMLInputElement>('slider', {
      name: 'Saturation',
    });
    fireEvent.change(saturation, { target: { value: '50' } });
    expect(onValueChange).toHaveBeenLastCalledWith('#bf4040');
    expect(saturation.value).toBe('100');
  });

  it('preserves precise alpha when an unchanged channel loses focus', () => {
    render(<ControlledPicker initialValue="#ff000001" />);
    const panel = openPicker();
    fireEvent.change(
      within(panel).getByRole('combobox', { name: 'Color format' }),
      { target: { value: 'rgba' } },
    );
    const alpha = within(panel).getByRole('textbox', { name: 'A' });
    fireEvent.focus(alpha);
    fireEvent.blur(alpha);
    expect(
      within(panel).getByRole<HTMLInputElement>('textbox', {
        name: 'CSS color',
      }).value,
    ).toBe('#ff000001');
  });

  it('reverts a draft before closing on Escape and does not reopen after disabling', () => {
    const { rerender } = render(<ColorPicker label="승" value="#663399" />);
    const panel = openPicker();
    const input = within(panel).getByRole<HTMLInputElement>('textbox', {
      name: 'CSS color',
    });
    fireEvent.change(input, { target: { value: '#12' } });
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(input.value).toBe('#663399');
    expect(screen.queryByRole('dialog')).not.toBeNull();
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();
    openPicker();
    rerender(<ColorPicker label="승" value="#663399" disabled />);
    rerender(<ColorPicker label="승" value="#663399" />);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it.each([{ disabled: true }, { readOnly: true }])(
    'prevents editing in a noneditable state: %j',
    (state) => {
      render(<ColorPicker label="승" value="#663399" {...state} />);
      const trigger = screen.getByRole<HTMLButtonElement>('button', {
        name: '승: #663399',
      });
      expect(trigger.disabled).toBe(true);
      fireEvent.click(trigger);
      expect(screen.queryByRole('dialog')).toBeNull();
    },
  );
});
