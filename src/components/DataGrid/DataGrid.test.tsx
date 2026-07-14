import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { DataGrid } from './DataGrid';
import type { DataGridColumn } from './types';

type Row = {
  amount: string;
  id: string;
  memo: string;
};

const ROWS: readonly Row[] = [
  { amount: '6500', id: 'row-1', memo: '카페라떼' },
  { amount: '12000', id: 'row-2', memo: '점심 식사' },
];

const COLUMNS: readonly DataGridColumn<Row>[] = [
  {
    getEditValue: (row) => row.memo,
    getEditorLabel: (_row, rowIndex) => `내용 ${rowIndex + 1}`,
    header: '내용',
    id: 'memo',
    renderCell: (row) => row.memo,
    sortable: true,
  },
  {
    align: 'end',
    getEditValue: (row) => row.amount,
    getEditorLabel: (_row, rowIndex) => `금액 ${rowIndex + 1}`,
    header: '금액',
    id: 'amount',
    renderCell: (row) => row.amount,
  },
];

afterEach(cleanup);

describe('DataGrid', () => {
  it('renders a semantic editable grid with totals', () => {
    render(
      <DataGrid
        aria-label="거래"
        columns={COLUMNS}
        getRowKey={(row) => row.id}
        rows={ROWS}
        totals={['합계', '18500']}
      />,
    );

    const grid = screen.getByRole('grid', { name: '거래' });
    expect(grid.getAttribute('aria-readonly')).toBe('false');
    expect(screen.getAllByRole('columnheader')).toHaveLength(2);
    expect(screen.getAllByRole('gridcell')).toHaveLength(6);
    expect(document.querySelectorAll('[data-boundary="structural"]')).toHaveLength(2);
  });

  it('sorts a sortable column through a controlled callback', () => {
    const handleSortChange = vi.fn();
    render(
      <DataGrid
        aria-label="거래"
        columns={COLUMNS}
        getRowKey={(row) => row.id}
        onSortChange={handleSortChange}
        rows={ROWS}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /내용/ }));

    expect(handleSortChange).toHaveBeenCalledWith({
      columnId: 'memo',
      direction: 'ascending',
    });
  });

  it('moves between cells and commits an edit with the keyboard', () => {
    const handleCellCommit = vi.fn();
    render(
      <DataGrid
        aria-label="거래"
        columns={COLUMNS}
        getRowKey={(row) => row.id}
        onCellCommit={handleCellCommit}
        rows={ROWS}
      />,
    );

    const cells = screen.getAllByRole('gridcell');
    cells[0]?.focus();
    fireEvent.keyDown(cells[0] as HTMLElement, { key: 'ArrowRight' });

    expect(document.activeElement).toBe(cells[1]);

    fireEvent.keyDown(cells[1] as HTMLElement, { key: 'Enter' });
    const editor = screen.getByRole('textbox', { name: '금액 1' });
    editor.focus();
    fireEvent.click(editor);
    expect(document.activeElement).toBe(editor);
    expect(fireEvent.keyDown(editor, { key: ' ' })).toBe(true);
    fireEvent.change(editor, { target: { value: '7000' } });
    fireEvent.keyDown(editor, { key: 'Enter' });

    expect(handleCellCommit).toHaveBeenCalledWith(
      expect.objectContaining({
        columnId: 'amount',
        row: ROWS[0],
        rowIndex: 0,
        value: '7000',
      }),
    );
    expect(screen.queryByRole('textbox', { name: '금액 1' })).toBeNull();
  });

  it('toggles row selection with Space', () => {
    const handleSelectionChange = vi.fn();
    render(
      <DataGrid
        aria-label="거래"
        columns={COLUMNS}
        getRowKey={(row) => row.id}
        onRowSelectionChange={handleSelectionChange}
        rows={ROWS}
        selectionMode="multiple"
      />,
    );

    const firstCell = screen.getAllByRole('gridcell')[0] as HTMLElement;
    fireEvent.keyDown(firstCell, { key: ' ' });

    expect(handleSelectionChange).toHaveBeenCalledWith(
      'row-1',
      ROWS[0],
      true,
    );
  });

  it('cancels an edit with Escape', () => {
    const handleCellCommit = vi.fn();
    render(
      <DataGrid
        aria-label="거래"
        columns={COLUMNS}
        getRowKey={(row) => row.id}
        onCellCommit={handleCellCommit}
        rows={ROWS}
      />,
    );

    const firstCell = screen.getAllByRole('gridcell')[0] as HTMLElement;
    fireEvent.keyDown(firstCell, { key: 'Enter' });
    const editor = screen.getByRole('textbox', { name: '내용 1' });
    fireEvent.change(editor, { target: { value: '취소할 값' } });
    fireEvent.keyDown(editor, { key: 'Escape' });

    expect(handleCellCommit).not.toHaveBeenCalled();
    expect(screen.queryByRole('textbox', { name: '내용 1' })).toBeNull();
  });

  it('commits the latest value from a synchronous custom editor action', () => {
    const handleCellCommit = vi.fn();
    const columns: readonly DataGridColumn<Row>[] = [
      {
        getEditValue: (row) => row.memo,
        header: '내용',
        id: 'memo',
        renderCell: (row) => row.memo,
        renderEditor: ({ commit, onValueChange }) => (
          <button
            onClick={() => {
              onValueChange('빠른 저장 값');
              commit();
            }}
            type="button"
          >
            빠른 저장
          </button>
        ),
      },
    ];
    render(
      <DataGrid
        aria-label="거래"
        columns={columns}
        getRowKey={(row) => row.id}
        onCellCommit={handleCellCommit}
        rows={ROWS.slice(0, 1)}
      />,
    );

    fireEvent.doubleClick(screen.getByRole('gridcell'));
    fireEvent.click(screen.getByRole('button', { name: '빠른 저장' }));

    expect(handleCellCommit).toHaveBeenCalledWith(
      expect.objectContaining({
        row: ROWS[0],
        value: '빠른 저장 값',
      }),
    );
  });

  it('does not steal focus from interactive cell content', () => {
    const columns: readonly DataGridColumn<Row>[] = [
      {
        header: '내용',
        id: 'memo',
        renderCell: (row) => row.memo,
      },
      {
        header: '작업',
        id: 'action',
        renderCell: () => <button type="button">상세 보기</button>,
      },
    ];
    render(
      <DataGrid
        aria-label="거래"
        columns={columns}
        getRowKey={(row) => row.id}
        rows={ROWS.slice(0, 1)}
      />,
    );
    const cells = screen.getAllByRole('gridcell');
    const actionCell = cells[1] as HTMLElement;
    const button = screen.getByRole('button', { name: '상세 보기' });

    button.focus();
    fireEvent.click(button);

    expect(document.activeElement).toBe(button);
    expect(actionCell.tabIndex).toBe(-1);
  });

  it('preserves an editor draft when its input is double-clicked', () => {
    render(
      <DataGrid
        aria-label="거래"
        columns={COLUMNS}
        getRowKey={(row) => row.id}
        rows={ROWS}
      />,
    );
    const firstCell = screen.getAllByRole('gridcell')[0] as HTMLElement;

    fireEvent.doubleClick(firstCell);
    const editor = screen.getByRole<HTMLInputElement>('textbox', {
      name: '내용 1',
    });
    fireEvent.change(editor, { target: { value: '선택 중인 문장' } });
    fireEvent.doubleClick(editor);

    expect(editor.value).toBe('선택 중인 문장');
  });

  it('keeps editing attached to row and column identities after reordering', () => {
    const handleCellCommit = vi.fn();
    const { rerender } = render(
      <DataGrid
        aria-label="거래"
        columns={COLUMNS}
        getRowKey={(row) => row.id}
        onCellCommit={handleCellCommit}
        rows={ROWS}
      />,
    );

    fireEvent.doubleClick(screen.getAllByRole('gridcell')[0] as HTMLElement);
    fireEvent.change(screen.getByRole('textbox', { name: '내용 1' }), {
      target: { value: '재정렬 뒤 저장' },
    });

    rerender(
      <DataGrid
        aria-label="거래"
        columns={[COLUMNS[1]!, COLUMNS[0]!]}
        getRowKey={(row) => row.id}
        onCellCommit={handleCellCommit}
        rows={[ROWS[1]!, ROWS[0]!]}
      />,
    );

    const editor = screen.getByRole('textbox', { name: '내용 2' });
    fireEvent.keyDown(editor, { key: 'Enter' });

    expect(handleCellCommit).toHaveBeenCalledWith({
      columnId: 'memo',
      row: ROWS[0],
      rowIndex: 1,
      value: '재정렬 뒤 저장',
    });
  });

  it('restores a tabbable cell when the focused row and column are removed', () => {
    const { rerender } = render(
      <DataGrid
        aria-label="거래"
        columns={COLUMNS}
        getRowKey={(row) => row.id}
        rows={ROWS}
      />,
    );
    const cells = screen.getAllByRole('gridcell');
    const lastCell = cells.at(-1) as HTMLElement;
    fireEvent.click(lastCell);
    expect(lastCell.tabIndex).toBe(0);

    rerender(
      <DataGrid
        aria-label="거래"
        columns={COLUMNS.slice(0, 1)}
        getRowKey={(row) => row.id}
        rows={ROWS.slice(0, 1)}
      />,
    );

    expect((screen.getByRole('gridcell') as HTMLElement).tabIndex).toBe(0);
  });

  it('exposes multiple selection semantics without an incorrect row count', () => {
    render(
      <DataGrid
        aria-label="거래"
        columns={COLUMNS}
        getRowKey={(row) => row.id}
        rows={ROWS}
        selectionMode="multiple"
      />,
    );

    const grid = screen.getByRole('grid', { name: '거래' });
    expect(grid.getAttribute('aria-multiselectable')).toBe('true');
    expect(grid.hasAttribute('aria-rowcount')).toBe(false);
  });

  it('prevents page scrolling at grid navigation boundaries', () => {
    render(
      <DataGrid
        aria-label="거래"
        columns={COLUMNS}
        getRowKey={(row) => row.id}
        rows={ROWS}
      />,
    );
    const firstCell = screen.getAllByRole('gridcell')[0] as HTMLElement;
    firstCell.focus();

    expect(fireEvent.keyDown(firstCell, { key: 'ArrowUp' })).toBe(false);
    expect(document.activeElement).not.toBe(document.body);
  });
});
