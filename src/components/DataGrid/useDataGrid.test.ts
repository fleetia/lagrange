import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import type { DataGridColumn } from './types';
import { useDataGrid } from './useDataGrid';

type Row = {
  id: string;
  memo: string;
};

const ROW: Row = { id: 'row-1', memo: '카페라떼' };
const COLUMN: DataGridColumn<Row> = {
  getEditValue: (row) => row.memo,
  header: '내용',
  id: 'memo',
  renderCell: (row) => row.memo,
};
const COLUMNS = [COLUMN] as const;

describe('useDataGrid', () => {
  it('commits only values changed during an editing session', () => {
    const handleCellCommit = vi.fn();
    const { result } = renderHook(() =>
      useDataGrid({
        columns: COLUMNS,
        containerId: 'test-grid',
        getRowKey: (row) => row.id,
        onCellCommit: handleCellCommit,
        rows: [ROW],
        selectedRowKeys: new Set(),
        selectionMode: 'none',
      }),
    );

    act(() => {
      result.current.startEditing(ROW, 0, COLUMN, 0);
    });
    expect(result.current.draft).toBe('카페라떼');

    act(() => {
      result.current.finishEditing(
        ROW,
        0,
        COLUMN,
        0,
        true,
        false,
      );
    });
    expect(handleCellCommit).not.toHaveBeenCalled();

    act(() => {
      result.current.startEditing(ROW, 0, COLUMN, 0);
      result.current.setDraftValue('점심 식사');
    });
    act(() => {
      result.current.finishEditing(
        ROW,
        0,
        COLUMN,
        0,
        true,
        false,
      );
    });

    expect(handleCellCommit).toHaveBeenCalledWith({
      columnId: 'memo',
      row: ROW,
      rowIndex: 0,
      value: '점심 식사',
    });
  });

  it('commits the latest draft when change and commit happen synchronously', () => {
    const handleCellCommit = vi.fn();
    const { result } = renderHook(() =>
      useDataGrid({
        columns: COLUMNS,
        containerId: 'test-grid',
        getRowKey: (row) => row.id,
        onCellCommit: handleCellCommit,
        rows: [ROW],
        selectedRowKeys: new Set(),
        selectionMode: 'none',
      }),
    );

    act(() => {
      result.current.startEditing(ROW, 0, COLUMN, 0);
      result.current.setDraftValue('동기 저장 값');
      result.current.finishEditing(ROW, 0, COLUMN, 0, true, false);
    });

    expect(handleCellCommit).toHaveBeenCalledWith({
      columnId: 'memo',
      row: ROW,
      rowIndex: 0,
      value: '동기 저장 값',
    });
  });
});
