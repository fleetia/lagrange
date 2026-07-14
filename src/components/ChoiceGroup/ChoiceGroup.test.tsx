import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Choice, ChoiceGroup } from './ChoiceGroup';

afterEach(cleanup);

describe('ChoiceGroup', () => {
  it('uses a native radio group while exposing the compact choice label', () => {
    render(
      <ChoiceGroup defaultValue="week" label="조회 단위" name="period">
        <Choice value="day">일</Choice>
        <Choice value="week">주</Choice>
        <Choice value="month">월</Choice>
      </ChoiceGroup>,
    );

    const week = screen.getByRole<HTMLInputElement>('radio', { name: '주' });

    expect(screen.getByRole('group', { name: '조회 단위' })).toBeDefined();
    expect(week.checked).toBe(true);
    expect(week.name).toBe('period');
  });

  it('reports selection changes without replacing native input events', () => {
    const handleValueChange = vi.fn();
    const handleChange = vi.fn();

    render(
      <ChoiceGroup label="조회 단위" onValueChange={handleValueChange}>
        <Choice onChange={handleChange} value="day">
          일
        </Choice>
        <Choice value="month">월</Choice>
      </ChoiceGroup>,
    );

    fireEvent.click(screen.getByRole('radio', { name: '일' }));

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleValueChange).toHaveBeenCalledWith('day');
  });

  it('applies group disabled and required state to every choice', () => {
    render(
      <ChoiceGroup disabled label="조회 단위" required>
        <Choice value="day">일</Choice>
        <Choice value="month">월</Choice>
      </ChoiceGroup>,
    );

    for (const choice of screen.getAllByRole('radio')) {
      expect(choice.hasAttribute('disabled')).toBe(true);
      expect(choice.hasAttribute('required')).toBe(true);
    }
  });

  it('keeps group selection and accessibility state authoritative', () => {
    const conflictingInputProps = {
      'aria-describedby': 'consumer-description',
      checked: true,
      defaultChecked: true,
      required: false,
    };

    render(
      <ChoiceGroup
        description="한 가지를 선택하세요"
        label="조회 단위"
        required
        value="week"
      >
        <Choice {...conflictingInputProps} value="day">
          일
        </Choice>
        <Choice value="week">주</Choice>
      </ChoiceGroup>,
    );

    const day = screen.getByRole<HTMLInputElement>('radio', { name: '일' });
    const week = screen.getByRole<HTMLInputElement>('radio', { name: '주' });

    expect(day.checked).toBe(false);
    expect(week.checked).toBe(true);
    expect(day.hasAttribute('required')).toBe(true);
    expect(day.getAttribute('aria-describedby')).toContain('-description');
    expect(day.getAttribute('aria-describedby')).not.toContain(
      'consumer-description',
    );
  });

  it('generates unique description ids independently from the field name', () => {
    render(
      <>
        <form>
          <ChoiceGroup description="첫 번째 설명" label="첫 번째" name="period">
            <Choice value="day">일</Choice>
          </ChoiceGroup>
        </form>
        <form>
          <ChoiceGroup description="두 번째 설명" label="두 번째" name="period">
            <Choice value="day">일</Choice>
          </ChoiceGroup>
        </form>
      </>,
    );

    const firstDescriptionId = screen
      .getByRole('group', { name: '첫 번째' })
      .getAttribute('aria-describedby');
    const secondDescriptionId = screen
      .getByRole('group', { name: '두 번째' })
      .getAttribute('aria-describedby');

    expect(firstDescriptionId).toBeTruthy();
    expect(secondDescriptionId).toBeTruthy();
    expect(firstDescriptionId).not.toBe(secondDescriptionId);
  });

  it('requires Choice to be nested in ChoiceGroup', () => {
    expect(() => render(<Choice value="day">일</Choice>)).toThrow(
      'Choice must be rendered inside ChoiceGroup.',
    );
  });
});
