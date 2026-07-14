import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { PlacementPicker } from './PlacementPicker';

afterEach(cleanup);

describe('PlacementPicker', () => {
  it('renders all nine placements as one accessible radio group', () => {
    render(
      <PlacementPicker label="Content placement" value="top-left" />,
    );

    const group = screen.getByRole('radiogroup', {
      name: 'Content placement',
    });
    const options = screen.getAllByRole('radio');

    expect(group).toBeDefined();
    expect(options).toHaveLength(9);
    expect(
      screen.getByRole('radio', { name: 'top-left' }).getAttribute(
        'aria-checked',
      ),
    ).toBe('true');
    expect(screen.getByRole('radio', { name: 'top-left' }).tabIndex).toBe(0);
    expect(screen.getByRole('radio', { name: 'center-center' }).tabIndex).toBe(
      -1,
    );
  });

  it('updates an uncontrolled selection and reports the placement', () => {
    const handleValueChange = vi.fn();

    render(
      <PlacementPicker
        defaultValue="top-left"
        label="Content placement"
        onValueChange={handleValueChange}
      />,
    );
    const bottomRight = screen.getByRole('radio', {
      name: 'bottom-right',
    });

    fireEvent.click(bottomRight);

    expect(handleValueChange).toHaveBeenCalledWith('bottom-right');
    expect(bottomRight.getAttribute('aria-checked')).toBe('true');
    expect(bottomRight.tabIndex).toBe(0);
  });

  it('disables every option and supports localized item labels', () => {
    render(
      <PlacementPicker
        disabled
        getItemLabel={(placement) => `위치 ${placement}`}
        label="콘텐츠 위치"
      />,
    );

    expect(
      screen.getByRole('radio', { name: '위치 center-center' }).hasAttribute(
        'disabled',
      ),
    ).toBe(true);
    expect(screen.getByRole('radiogroup').getAttribute('aria-disabled')).toBe(
      'true',
    );
  });
});
