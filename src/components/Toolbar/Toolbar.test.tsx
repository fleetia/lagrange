import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Toolbar } from './Toolbar';

afterEach(cleanup);

describe('Toolbar', () => {
  it('groups native controls under a required accessible name', () => {
    render(
      <Toolbar label="거래 도구">
        <button type="button">추가</button>
        <button type="button">삭제</button>
      </Toolbar>,
    );

    const toolbar = screen.getByRole('group', { name: '거래 도구' });

    expect(toolbar.dataset.align).toBe('start');
    expect(toolbar.dataset.boundary).toBe('boundary');
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('preserves child activation and native disabled behavior', () => {
    const handleAdd = vi.fn();
    const handleDelete = vi.fn();

    render(
      <Toolbar align="between" boundary="structural" label="편집 도구" wrap={false}>
        <button onClick={handleAdd} type="button">
          추가
        </button>
        <button disabled onClick={handleDelete} type="button">
          삭제
        </button>
      </Toolbar>,
    );

    fireEvent.click(screen.getByRole('button', { name: '추가' }));
    fireEvent.click(screen.getByRole('button', { name: '삭제' }));

    const toolbar = screen.getByRole('group', { name: '편집 도구' });

    expect(toolbar.dataset.align).toBe('between');
    expect(toolbar.dataset.boundary).toBe('structural');
    expect(handleAdd).toHaveBeenCalledTimes(1);
    expect(handleDelete).not.toHaveBeenCalled();
  });
});
