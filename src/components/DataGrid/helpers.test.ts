import { describe, expect, it } from 'vitest';

import {
  getNextCellPosition,
  getNextSortDirection,
  getSortMarker,
  isInteractiveGridDescendant,
} from './helpers';

describe('DataGrid helpers', () => {
  it('keeps keyboard navigation inside the available grid', () => {
    expect(
      getNextCellPosition(
        { columnIndex: 0, rowIndex: 0 },
        'ArrowUp',
        2,
        3,
      ),
    ).toEqual({ columnIndex: 0, rowIndex: 0 });
    expect(
      getNextCellPosition(
        { columnIndex: 1, rowIndex: 0 },
        'End',
        2,
        3,
      ),
    ).toEqual({ columnIndex: 2, rowIndex: 0 });
  });

  it('toggles sort direction and exposes a stable visual marker', () => {
    expect(getNextSortDirection()).toBe('ascending');
    expect(getNextSortDirection('ascending')).toBe('descending');
    expect(getSortMarker('descending')).toBe('↓');
  });

  it('distinguishes interactive descendants from presentational content', () => {
    const cell = document.createElement('td');
    const label = document.createElement('span');
    const button = document.createElement('button');
    const buttonLabel = document.createElement('span');
    button.append(buttonLabel);
    cell.append(label, button);

    expect(isInteractiveGridDescendant(label, cell)).toBe(false);
    expect(isInteractiveGridDescendant(buttonLabel, cell)).toBe(true);
    expect(isInteractiveGridDescendant(cell, cell)).toBe(false);
  });
});
