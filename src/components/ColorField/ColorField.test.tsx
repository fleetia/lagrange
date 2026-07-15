import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { FormField } from '../FormField/FormField';
import { ColorField } from './ColorField';

afterEach(cleanup);

describe('ColorField', () => {
  it('connects FormField state and submits a normalized value', () => {
    const { container } = render(
      <form>
        <FormField error="색상을 확인하세요." label="강조색" required>
          <ColorField defaultValue="rgb(102, 51, 153)" name="accent" />
        </FormField>
      </form>,
    );
    const input = screen.getByRole('textbox', { name: '강조색' });
    const form = container.querySelector('form');

    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.hasAttribute('required')).toBe(true);
    expect(new FormData(form ?? undefined).get('accent')).toBe('#663399');
  });

  it('emits only a valid normalized commit', () => {
    const handleValueChange = vi.fn();
    render(
      <ColorField
        aria-label="배경색"
        defaultValue="#663399"
        onValueChange={handleValueChange}
      />,
    );
    const input = screen.getByRole<HTMLInputElement>('textbox', {
      name: '배경색',
    });

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'not-a-color' } });
    expect(handleValueChange).not.toHaveBeenCalled();

    fireEvent.blur(input);
    expect(input.value).toBe('#663399');
    expect(handleValueChange).not.toHaveBeenCalled();

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'hsl(9, 100%, 64%)' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(input.value).toBe('#ff6347');
    expect(handleValueChange).toHaveBeenLastCalledWith('#ff6347');
  });

  it('reverts an invalid draft on Escape without emitting', () => {
    const handleValueChange = vi.fn();
    render(
      <ColorField
        aria-label="텍스트 색"
        defaultValue="#123456"
        onValueChange={handleValueChange}
      />,
    );
    const input = screen.getByRole<HTMLInputElement>('textbox', {
      name: '텍스트 색',
    });

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: '#12' } });
    fireEvent.keyDown(input, { key: 'Escape' });

    expect(input.value).toBe('#123456');
    expect(handleValueChange).not.toHaveBeenCalled();
  });

  it('preserves alpha when the native swatch changes RGB channels', () => {
    const handleValueChange = vi.fn();
    render(
      <ColorField
        aria-label="오버레이 색"
        defaultValue="rgba(0, 0, 0, 0.5)"
        onValueChange={handleValueChange}
        showAlpha
        swatchLabel="오버레이 색상 선택"
      />,
    );
    const swatch = screen.getByLabelText<HTMLInputElement>(
      '오버레이 색상 선택',
    );

    fireEvent.change(swatch, { target: { value: '#ff6347' } });

    expect(handleValueChange).toHaveBeenLastCalledWith('#ff634780');
    expect(
      screen.getByRole<HTMLInputElement>('textbox', { name: '오버레이 색' })
        .value,
    ).toBe('#ff634780');
  });

  it('edits alpha as a percentage while preserving RGB channels', () => {
    const handleValueChange = vi.fn();
    render(
      <ColorField
        alphaLabel="배경 투명도"
        aria-label="배경색"
        defaultValue="rgba(102, 51, 153, 0.5)"
        onValueChange={handleValueChange}
        showAlpha
      />,
    );
    const alpha = screen.getByRole<HTMLInputElement>('slider', {
      name: '배경 투명도',
    });

    expect(alpha.value).toBe('50');
    expect(alpha.getAttribute('aria-valuetext')).toBe('50%');

    fireEvent.change(alpha, { target: { value: '25' } });

    expect(handleValueChange).toHaveBeenLastCalledWith('#66339940');
    expect(alpha.value).toBe('25');
    expect(screen.getByText('배경 투명도: 25%')).toBeDefined();
    expect(
      screen.getByRole<HTMLInputElement>('textbox', { name: '배경색' }).value,
    ).toBe('#66339940');
  });

  it('keeps controlled display and form values aligned until the parent updates', () => {
    const handleValueChange = vi.fn();
    const { container, rerender } = render(
      <form>
        <ColorField
          aria-label="Controlled color"
          name="accent"
          onValueChange={handleValueChange}
          swatchLabel="Controlled color swatch"
          value="#123456"
        />
      </form>,
    );
    const input = screen.getByRole<HTMLInputElement>('textbox', {
      name: 'Controlled color',
    });
    const swatch = screen.getByLabelText<HTMLInputElement>(
      'Controlled color swatch',
    );

    fireEvent.change(swatch, { target: { value: '#abcdef' } });

    expect(handleValueChange).toHaveBeenCalledWith('#abcdef');
    expect(input.value).toBe('#123456');
    expect(new FormData(container.querySelector('form') ?? undefined).get('accent'))
      .toBe('#123456');

    rerender(
      <form>
        <ColorField
          aria-label="Controlled color"
          name="accent"
          onValueChange={handleValueChange}
          swatchLabel="Controlled color swatch"
          value="#abcdef"
        />
      </form>,
    );

    expect(input.value).toBe('#abcdef');
    expect(new FormData(container.querySelector('form') ?? undefined).get('accent'))
      .toBe('#abcdef');
  });

  it('disables the native swatch for a read-only field', () => {
    render(
      <ColorField
        alphaLabel="고정 색 투명도"
        aria-label="고정 색"
        defaultValue="#663399"
        readOnly
        showAlpha
        swatchLabel="고정 색상 선택"
      />,
    );

    expect(screen.getByLabelText('고정 색상 선택').hasAttribute('disabled')).toBe(
      true,
    );
    expect(
      screen.getByRole('textbox', { name: '고정 색' }).hasAttribute('readonly'),
    ).toBe(true);
    expect(
      screen
        .getByRole('slider', { name: '고정 색 투명도' })
        .hasAttribute('disabled'),
    ).toBe(true);
  });
});
