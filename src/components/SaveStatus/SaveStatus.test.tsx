import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { SaveStatus } from './SaveStatus';

afterEach(cleanup);

describe('SaveStatus', () => {
  it('announces successful saves politely', () => {
    const { container } = render(<SaveStatus state="saved" />);

    const status = screen.getByRole('status');
    expect(status.getAttribute('aria-live')).toBe('polite');
    expect(status.getAttribute('aria-atomic')).toBe('true');
    expect(status.textContent).toContain('저장됨');
    expect(container.firstElementChild?.getAttribute('aria-live')).toBeNull();
    expect(container.firstElementChild?.getAttribute('role')).toBeNull();
  });

  it('announces errors assertively and renders an action', () => {
    render(
      <SaveStatus action={<button type="button">다시 시도</button>} state="error" />,
    );

    const alert = screen.getByRole('alert');
    const action = screen.getByRole('button', { name: '다시 시도' });

    expect(alert.getAttribute('aria-live')).toBe('assertive');
    expect(alert.contains(action)).toBe(false);
    expect(alert.textContent).not.toContain('다시 시도');
  });
});
