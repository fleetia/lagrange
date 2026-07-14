import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Breadcrumb } from './Breadcrumb';

afterEach(cleanup);

describe('Breadcrumb', () => {
  it('renders link and button items in an accessible navigation landmark', () => {
    render(
      <Breadcrumb
        aria-label="북마크 경로"
        items={[
          { href: '/bookmarks', label: 'Bookmarks' },
          { label: 'Design systems' },
        ]}
      />,
    );

    expect(screen.getByRole('navigation', { name: '북마크 경로' })).toBeDefined();
    expect(screen.getByRole('link', { name: 'Bookmarks' }).getAttribute('href')).toBe(
      '/bookmarks',
    );
    expect(screen.getByRole('button', { name: 'Design systems' })).toBeDefined();
  });

  it('marks only the final item as the current page', () => {
    render(
      <Breadcrumb
        items={[
          { label: 'Work' },
          { label: 'Research' },
          { label: 'Lagrange' },
        ]}
      />,
    );

    expect(screen.getByRole('button', { name: 'Work' }).hasAttribute('aria-current')).toBe(
      false,
    );
    expect(
      screen.getByRole('button', { name: 'Lagrange' }).getAttribute('aria-current'),
    ).toBe('page');
  });

  it('forwards item selection and native navigation props', () => {
    const handleClick = vi.fn();

    render(
      <Breadcrumb
        className="consumer-breadcrumb"
        data-testid="breadcrumb"
        items={[{ label: 'Root', onClick: handleClick }]}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Root' }));

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('breadcrumb').className).toContain(
      'consumer-breadcrumb',
    );
  });
});
