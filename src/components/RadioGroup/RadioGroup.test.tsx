import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Radio, RadioGroup } from './RadioGroup';

afterEach(cleanup);

describe('RadioGroup', () => {
  it('groups radios by name and selects its default value', () => {
    render(
      <RadioGroup
        defaultValue="expense"
        description="한 가지를 선택하세요"
        label="거래 구분"
        name="kind"
      >
        <Radio description="자산이 줄어드는 거래" value="expense">
          지출
        </Radio>
        <Radio value="income">수입</Radio>
      </RadioGroup>,
    );

    const expense = screen.getByRole<HTMLInputElement>('radio', {
      name: '지출',
    });
    const income = screen.getByRole<HTMLInputElement>('radio', {
      name: '수입',
    });

    expect(screen.getByRole('group', { name: '거래 구분' })).toBeDefined();
    expect(expense.name).toBe('kind');
    expect(income.name).toBe('kind');
    expect(expense.checked).toBe(true);
    expect(expense.getAttribute('aria-describedby')?.split(' ')).toHaveLength(
      2,
    );
  });

  it('forwards the selected value through native radio activation', () => {
    const handleValueChange = vi.fn();

    render(
      <RadioGroup
        defaultValue="expense"
        label="거래 구분"
        onValueChange={handleValueChange}
      >
        <Radio value="expense">지출</Radio>
        <Radio value="income">수입</Radio>
      </RadioGroup>,
    );

    fireEvent.click(screen.getByRole('radio', { name: '수입' }));

    expect(handleValueChange).toHaveBeenCalledWith('income');
  });

  it('associates required and error feedback with every option', () => {
    render(
      <RadioGroup error="구분을 선택하세요" label="거래 구분" required>
        <Radio value="expense">지출</Radio>
        <Radio value="income">수입</Radio>
      </RadioGroup>,
    );

    for (const radio of screen.getAllByRole('radio')) {
      expect(radio.hasAttribute('required')).toBe(true);
      expect(radio.getAttribute('aria-invalid')).toBe('true');
      expect(radio.getAttribute('aria-describedby')).toContain('-error');
    }
    expect(screen.getByRole('alert').textContent).toBe('구분을 선택하세요');
  });

  it('keeps group selection and accessibility state authoritative', () => {
    const conflictingInputProps = {
      'aria-describedby': 'consumer-description',
      'aria-invalid': false,
      'aria-labelledby': 'consumer-label',
      checked: true,
      defaultChecked: true,
      required: false,
    };

    render(
      <RadioGroup
        error="구분을 선택하세요"
        label="거래 구분"
        required
        value="income"
      >
        <Radio {...conflictingInputProps} value="expense">
          지출
        </Radio>
        <Radio value="income">수입</Radio>
      </RadioGroup>,
    );

    const expense = screen.getByRole<HTMLInputElement>('radio', {
      name: '지출',
    });
    const income = screen.getByRole<HTMLInputElement>('radio', {
      name: '수입',
    });

    expect(expense.checked).toBe(false);
    expect(income.checked).toBe(true);
    expect(expense.hasAttribute('required')).toBe(true);
    expect(expense.getAttribute('aria-invalid')).toBe('true');
    expect(expense.getAttribute('aria-describedby')).toContain('-error');
    expect(expense.getAttribute('aria-describedby')).not.toContain(
      'consumer-description',
    );
  });

  it('generates unique feedback ids independently from the field name', () => {
    render(
      <>
        <form>
          <RadioGroup error="첫 번째 오류" label="첫 번째" name="kind">
            <Radio value="expense">지출</Radio>
          </RadioGroup>
        </form>
        <form>
          <RadioGroup error="두 번째 오류" label="두 번째" name="kind">
            <Radio value="expense">지출</Radio>
          </RadioGroup>
        </form>
      </>,
    );

    const firstFeedbackId = screen
      .getByRole('group', { name: '첫 번째' })
      .getAttribute('aria-describedby');
    const secondFeedbackId = screen
      .getByRole('group', { name: '두 번째' })
      .getAttribute('aria-describedby');

    expect(firstFeedbackId).toBeTruthy();
    expect(secondFeedbackId).toBeTruthy();
    expect(firstFeedbackId).not.toBe(secondFeedbackId);
  });

  it('requires Radio to be nested in RadioGroup', () => {
    expect(() => render(<Radio value="expense">지출</Radio>)).toThrow(
      'Radio must be rendered inside RadioGroup.',
    );
  });
});
