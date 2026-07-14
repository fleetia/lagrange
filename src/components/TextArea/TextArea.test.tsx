import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { FormField } from '../FormField/FormField';
import { TextArea } from './TextArea';

afterEach(cleanup);

describe('TextArea', () => {
  it('forwards native multiline input behavior and component options', () => {
    const handleChange = vi.fn();

    render(
      <TextArea
        aria-label="메모"
        className="consumer-class"
        onChange={handleChange}
        resize="none"
        rows={5}
      />,
    );
    const textArea = screen.getByRole('textbox', { name: '메모' });

    fireEvent.change(textArea, { target: { value: '첫째 줄\n둘째 줄' } });

    expect(textArea.className).toContain('consumer-class');
    expect(textArea.getAttribute('data-resize')).toBe('none');
    expect(textArea.getAttribute('rows')).toBe('5');
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('inherits label, required, description and error state from FormField', () => {
    render(
      <FormField
        description="기록에 함께 저장됩니다."
        error="메모를 확인하세요."
        label="메모"
        required
      >
        <TextArea />
      </FormField>,
    );
    const textArea = screen.getByLabelText('메모*');
    const describedBy = textArea.getAttribute('aria-describedby') ?? '';

    expect(textArea.hasAttribute('required')).toBe(true);
    expect(textArea.getAttribute('aria-invalid')).toBe('true');
    expect(textArea.getAttribute('data-invalid')).toBe('true');
    expect(describedBy.split(' ')).toHaveLength(2);
  });

  it('preserves native disabled and standalone invalid states', () => {
    render(
      <TextArea aria-label="설명" disabled isInvalid />,
    );
    const textArea = screen.getByRole('textbox', { name: '설명' });

    expect(textArea.hasAttribute('disabled')).toBe(true);
    expect(textArea.getAttribute('aria-invalid')).toBe('true');
  });
});
