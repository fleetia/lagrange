import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Select } from '../Select/Select';
import { TextField } from '../TextField/TextField';
import { FormField } from './FormField';

afterEach(cleanup);

describe('Form controls', () => {
  it('connects label, required state, description and error to TextField', () => {
    render(
      <FormField
        description="결제 내역에 표시할 이름"
        error="내용을 입력하세요"
        label="내용"
        marker="A1"
        required
      >
        <TextField />
      </FormField>,
    );

    const input = screen.getByLabelText('내용*');
    const describedBy = input.getAttribute('aria-describedby') ?? '';

    expect(input.hasAttribute('required')).toBe(true);
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('data-invalid')).toBe('true');
    expect(describedBy.split(' ')).toHaveLength(2);
    expect(screen.getByRole('alert').textContent).toBe('내용을 입력하세요');
  });

  it('forwards native TextField input behavior', () => {
    const handleChange = vi.fn();

    render(
      <FormField label="금액">
        <TextField inputMode="numeric" onChange={handleChange} />
      </FormField>,
    );
    const input = screen.getByLabelText('금액');

    fireEvent.change(input, { target: { value: '6500' } });

    expect(input.getAttribute('inputmode')).toBe('numeric');
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('keeps the FormField label connected when a child id is provided', () => {
    render(
      <FormField id="amount-field" label="금액">
        <TextField id="ignored-child-id" />
      </FormField>,
    );

    const input = screen.getByLabelText('금액');

    expect(input.id).toBe('amount-field');
  });

  it('keeps FormField required state authoritative over child props', () => {
    render(
      <FormField label="금액" required>
        <TextField aria-required={false} required={false} />
      </FormField>,
    );

    const input = screen.getByLabelText('금액*');

    expect(input.hasAttribute('required')).toBe(true);
    expect(input.getAttribute('aria-required')).toBe('true');
  });

  it('keeps an explicit aria error visually invalid inside FormField', () => {
    render(
      <FormField label="메모">
        <TextField aria-invalid="grammar" />
      </FormField>,
    );

    const input = screen.getByLabelText('메모');

    expect(input.getAttribute('aria-invalid')).toBe('grammar');
    expect(input.getAttribute('data-invalid')).toBe('true');
  });

  it('keeps FormField errors authoritative over aria-invalid false', () => {
    render(
      <FormField error="내용을 확인하세요" label="메모">
        <TextField aria-invalid={false} />
      </FormField>,
    );

    const input = screen.getByLabelText('메모');

    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('data-invalid')).toBe('true');
  });

  it('renders Select as a native labelled control', () => {
    render(
      <FormField label="카테고리">
        <Select defaultValue="cafe">
          <option value="cafe">식비 › 카페</option>
          <option value="transport">교통비</option>
        </Select>
      </FormField>,
    );

    const select = screen.getByRole<HTMLSelectElement>('combobox', {
      name: '카테고리',
    });

    expect(select.tagName).toBe('SELECT');
    expect(select.value).toBe('cafe');
  });

  it('keeps the FormField label connected to Select child ids', () => {
    render(
      <FormField id="category-field" label="카테고리">
        <Select id="ignored-child-id">
          <option value="cafe">식비 › 카페</option>
        </Select>
      </FormField>,
    );

    expect(screen.getByLabelText('카테고리').id).toBe('category-field');
  });

  it('keeps optional FormField state authoritative over Select props', () => {
    render(
      <FormField label="카테고리">
        <Select aria-required required>
          <option value="cafe">식비 › 카페</option>
        </Select>
      </FormField>,
    );

    const select = screen.getByLabelText('카테고리');

    expect(select.hasAttribute('required')).toBe(false);
    expect(select.hasAttribute('aria-required')).toBe(false);
  });

  it('rejects fragments that contain multiple controls', () => {
    expect(() =>
      render(
        <FormField label="기간">
          <>
            <TextField />
            <TextField />
          </>
        </FormField>,
      ),
    ).toThrow('FormField requires one direct form control.');
  });
});
