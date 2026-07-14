import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { StatusMarker } from './StatusMarker';

afterEach(cleanup);

describe('StatusMarker', () => {
  it('pairs a decorative marker with a textual status', () => {
    const { container } = render(
      <StatusMarker shape="square" tone="positive">
        동기화 완료
      </StatusMarker>,
    );

    const marker = screen.getByText('동기화 완료').parentElement;

    expect(marker?.dataset.shape).toBe('square');
    expect(marker?.dataset.tone).toBe('positive');
    expect(container.querySelector('[aria-hidden="true"]')).not.toBeNull();
  });

  it('forwards live-region semantics when the consumer needs an announcement', () => {
    render(
      <StatusMarker aria-live="polite" role="status" tone="critical">
        확인 필요
      </StatusMarker>,
    );

    const status = screen.getByRole('status');

    expect(status.getAttribute('aria-live')).toBe('polite');
    expect(status.textContent).toBe('확인 필요');
  });
});
