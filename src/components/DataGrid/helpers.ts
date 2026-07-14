import type { DataGridColumn, DataGridSortDirection } from './types';

export type DataGridCellPosition = {
  columnIndex: number;
  rowIndex: number;
};

const INTERACTIVE_DESCENDANT_SELECTOR = [
  'a[href]',
  'button',
  'input',
  'select',
  'textarea',
  'summary',
  '[contenteditable]:not([contenteditable="false"])',
  '[role="button"]',
  '[role="link"]',
  '[role="checkbox"]',
  '[role="radio"]',
  '[role="switch"]',
  '[role="textbox"]',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(Math.max(value, minimum), maximum);
}

export function getNextCellPosition(
  current: DataGridCellPosition,
  key: string,
  rowCount: number,
  columnCount: number,
): DataGridCellPosition {
  const lastRowIndex = Math.max(rowCount - 1, 0);
  const lastColumnIndex = Math.max(columnCount - 1, 0);

  switch (key) {
    case 'ArrowUp':
      return {
        ...current,
        rowIndex: clamp(current.rowIndex - 1, 0, lastRowIndex),
      };
    case 'ArrowDown':
      return {
        ...current,
        rowIndex: clamp(current.rowIndex + 1, 0, lastRowIndex),
      };
    case 'ArrowLeft':
      return {
        ...current,
        columnIndex: clamp(current.columnIndex - 1, 0, lastColumnIndex),
      };
    case 'ArrowRight':
      return {
        ...current,
        columnIndex: clamp(current.columnIndex + 1, 0, lastColumnIndex),
      };
    case 'Home':
      return { ...current, columnIndex: 0 };
    case 'End':
      return { ...current, columnIndex: lastColumnIndex };
    default:
      return current;
  }
}

export function getNextSortDirection(
  currentDirection?: DataGridSortDirection,
): DataGridSortDirection {
  return currentDirection === 'ascending' ? 'descending' : 'ascending';
}

export function getSortMarker(
  direction?: DataGridSortDirection,
): string {
  if (direction === 'ascending') {
    return '↑';
  }

  if (direction === 'descending') {
    return '↓';
  }

  return '↕';
}

export function isEditableColumn<TData>(
  column: DataGridColumn<TData>,
  row: TData,
  rowIndex: number,
): boolean {
  const hasEditor = Boolean(column.getEditValue || column.renderEditor);

  if (!hasEditor) {
    return false;
  }

  if (typeof column.isEditable === 'function') {
    return column.isEditable(row, rowIndex);
  }

  return column.isEditable ?? true;
}

export function isInteractiveGridDescendant(
  target: EventTarget | null,
  cell: HTMLElement,
): boolean {
  if (!(target instanceof Element) || target === cell) {
    return false;
  }

  const interactiveElement = target.closest<HTMLElement>(
    INTERACTIVE_DESCENDANT_SELECTOR,
  );

  return Boolean(interactiveElement && cell.contains(interactiveElement));
}
