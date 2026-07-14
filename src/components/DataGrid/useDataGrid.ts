import type { Key, KeyboardEvent } from 'react';
import { useRef, useState } from 'react';

import {
  getNextCellPosition,
  isEditableColumn,
  type DataGridCellPosition,
} from './helpers';
import type {
  DataGridCellCommit,
  DataGridColumn,
  DataGridSelectionMode,
} from './types';

type UseDataGridOptions<TData> = {
  columns: readonly DataGridColumn<TData>[];
  containerId: string;
  getRowKey: (row: TData, rowIndex: number) => Key;
  onCellCommit?: (change: DataGridCellCommit<TData>) => void;
  onRowSelectionChange?: (
    rowKey: Key,
    row: TData,
    isSelected: boolean,
  ) => void;
  rows: readonly TData[];
  selectedRowKeys: ReadonlySet<Key>;
  selectionMode: DataGridSelectionMode;
};

type UseDataGridReturn<TData> = {
  draft: string;
  editingCell: DataGridCellIdentity | null;
  finishEditing: (
    row: TData,
    rowIndex: number,
    column: DataGridColumn<TData>,
    columnIndex: number,
    shouldCommit: boolean,
    shouldRestoreFocus: boolean,
  ) => void;
  focusedCell: DataGridCellIdentity | null;
  handleCellKeyDown: (
    event: KeyboardEvent<HTMLTableCellElement>,
    row: TData,
    rowIndex: number,
    column: DataGridColumn<TData>,
    columnIndex: number,
  ) => void;
  handleEditorKeyDown: (
    event: KeyboardEvent<HTMLInputElement>,
    row: TData,
    rowIndex: number,
    column: DataGridColumn<TData>,
    columnIndex: number,
  ) => void;
  setDraftValue: (value: string) => void;
  setFocusedCell: (position: DataGridCellPosition) => void;
  startEditing: (
    row: TData,
    rowIndex: number,
    column: DataGridColumn<TData>,
    columnIndex: number,
  ) => void;
};

type DataGridCellIdentity = {
  columnId: string;
  rowKey: Key;
};

const NAVIGATION_KEYS: ReadonlySet<string> = new Set([
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'End',
  'Home',
]);

export function useDataGrid<TData>({
  columns,
  containerId,
  getRowKey,
  onCellCommit,
  onRowSelectionChange,
  rows,
  selectedRowKeys,
  selectionMode,
}: UseDataGridOptions<TData>): UseDataGridReturn<TData> {
  function getCellIdentity(
    position: DataGridCellPosition,
  ): DataGridCellIdentity | null {
    if (
      position.rowIndex < 0 ||
      position.rowIndex >= rows.length ||
      position.columnIndex < 0 ||
      position.columnIndex >= columns.length
    ) {
      return null;
    }

    const row = rows[position.rowIndex] as TData;
    const column = columns[position.columnIndex];

    return column
      ? { columnId: column.id, rowKey: getRowKey(row, position.rowIndex) }
      : null;
  }

  function isCellAvailable(identity: DataGridCellIdentity): boolean {
    const hasColumn = columns.some(({ id }) => id === identity.columnId);
    const hasRow = rows.some(
      (row, rowIndex) => getRowKey(row, rowIndex) === identity.rowKey,
    );

    return hasColumn && hasRow;
  }

  const [focusedCellState, setFocusedCellIdentity] =
    useState<DataGridCellIdentity | null>(() =>
      getCellIdentity({ columnIndex: 0, rowIndex: 0 }),
    );
  const [editingCellState, setEditingCell] =
    useState<DataGridCellIdentity | null>(null);
  const [draft, setDraft] = useState('');
  const draftRef = useRef('');
  const defaultFocusedCell = getCellIdentity({ columnIndex: 0, rowIndex: 0 });
  const isFocusedCellAvailable = Boolean(
    focusedCellState && isCellAvailable(focusedCellState),
  );
  const isEditingCellAvailable = Boolean(
    editingCellState && isCellAvailable(editingCellState),
  );

  if (focusedCellState && !isFocusedCellAvailable) {
    setFocusedCellIdentity(defaultFocusedCell);
  }

  if (editingCellState && !isEditingCellAvailable) {
    setEditingCell(null);
  }

  const focusedCell = isFocusedCellAvailable
    ? focusedCellState
    : defaultFocusedCell;
  const editingCell = isEditingCellAvailable ? editingCellState : null;

  function setDraftValue(value: string): void {
    draftRef.current = value;
    setDraft(value);
  }

  function setFocusedCell(position: DataGridCellPosition): void {
    setFocusedCellIdentity(getCellIdentity(position));
  }

  function focusCell(position: DataGridCellPosition): void {
    setFocusedCell(position);
    const selector = `[data-grid-cell="${position.rowIndex}-${position.columnIndex}"]`;
    document
      .getElementById(containerId)
      ?.querySelector<HTMLElement>(selector)
      ?.focus();
  }

  function startEditing(
    row: TData,
    rowIndex: number,
    column: DataGridColumn<TData>,
    columnIndex: number,
  ): void {
    if (!isEditableColumn(column, row, rowIndex)) {
      return;
    }

    const identity = getCellIdentity({ columnIndex, rowIndex });

    if (!identity) {
      return;
    }

    setDraftValue(column.getEditValue?.(row, rowIndex) ?? '');
    setEditingCell(identity);
  }

  function finishEditing(
    row: TData,
    rowIndex: number,
    column: DataGridColumn<TData>,
    columnIndex: number,
    shouldCommit: boolean,
    shouldRestoreFocus: boolean,
  ): void {
    setEditingCell(null);

    if (shouldCommit) {
      const initialValue = column.getEditValue?.(row, rowIndex) ?? '';

      if (draftRef.current !== initialValue) {
        onCellCommit?.({
          columnId: column.id,
          row,
          rowIndex,
          value: draftRef.current,
        });
      }
    }

    if (shouldRestoreFocus) {
      queueMicrotask(() => focusCell({ columnIndex, rowIndex }));
    }
  }

  function handleCellKeyDown(
    event: KeyboardEvent<HTMLTableCellElement>,
    row: TData,
    rowIndex: number,
    column: DataGridColumn<TData>,
    columnIndex: number,
  ): void {
    if (event.key === 'Enter' || event.key === 'F2') {
      event.preventDefault();
      startEditing(row, rowIndex, column, columnIndex);
      return;
    }

    if (event.key === ' ' && selectionMode !== 'none') {
      event.preventDefault();
      const rowKey = getRowKey(row, rowIndex);
      onRowSelectionChange?.(
        rowKey,
        row,
        !selectedRowKeys.has(rowKey),
      );
      return;
    }

    if (!NAVIGATION_KEYS.has(event.key)) {
      return;
    }

    event.preventDefault();
    const nextPosition = getNextCellPosition(
      { columnIndex, rowIndex },
      event.key,
      rows.length,
      columns.length,
    );

    if (
      nextPosition.columnIndex === columnIndex &&
      nextPosition.rowIndex === rowIndex
    ) {
      return;
    }

    focusCell(nextPosition);
  }

  function handleEditorKeyDown(
    event: KeyboardEvent<HTMLInputElement>,
    row: TData,
    rowIndex: number,
    column: DataGridColumn<TData>,
    columnIndex: number,
  ): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      finishEditing(row, rowIndex, column, columnIndex, false, true);
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      finishEditing(row, rowIndex, column, columnIndex, true, true);
    }
  }

  return {
    draft,
    editingCell,
    finishEditing,
    focusedCell,
    handleCellKeyDown,
    handleEditorKeyDown,
    setDraftValue,
    setFocusedCell,
    startEditing,
  };
}
