import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { TextField } from '../TextField/TextField';
import { FieldGrid, FieldGroup } from './FieldGroup';

afterEach(cleanup);

describe('FieldGroup', () => {
  it('renders a named fieldset and associates its description', () => {
    render(
      <FieldGroup description="거래에 공통으로 적용됩니다." legend="기본 정보">
        <TextField aria-label="메모" />
      </FieldGroup>,
    );

    const group = screen.getByRole('group', { name: '기본 정보' });
    const descriptionId = group.getAttribute('aria-describedby');

    expect(document.getElementById(descriptionId ?? '')?.textContent).toBe(
      '거래에 공통으로 적용됩니다.',
    );
  });

  it('uses native fieldset disabled behavior for descendant controls', () => {
    render(
      <FieldGroup disabled legend="잠긴 정보">
        <TextField aria-label="메모" />
      </FieldGroup>,
    );

    expect(screen.getByRole('group', { name: '잠긴 정보' })).toHaveProperty(
      'disabled',
      true,
    );
  });

  it('exposes the selected responsive grid contract', () => {
    render(
      <FieldGrid columns="triple" data-testid="field-grid">
        <span>One</span>
      </FieldGrid>,
    );

    expect(screen.getByTestId('field-grid').getAttribute('data-columns')).toBe(
      'triple',
    );
  });
});
