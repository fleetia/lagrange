import type {
  ChangeEvent,
  Key,
  ReactElement,
  ReactNode,
} from 'react';
import { useId } from 'react';
import clsx from 'clsx';

import {
  getNextSortDirection,
  getSortMarker,
  isEditableColumn,
  isInteractiveGridDescendant,
} from './helpers';
import * as styles from './DataGrid.css';
import type {
  DataGridColumn,
  DataGridEditorRenderProps,
  DataGridProps,
} from './types';
import { useDataGrid } from './useDataGrid';

const EMPTY_SELECTED_KEYS: ReadonlySet<Key> = new Set<Key>();

type StructuralBoundaryProps = {
  columnCount: number;
};

function StructuralBoundary({
  columnCount,
}: StructuralBoundaryProps): ReactElement {
  return (
    <tr aria-hidden="true" data-boundary="structural">
      <td className={styles.structuralCell} colSpan={columnCount} />
    </tr>
  );
}

export function DataGrid<TData>({
  className,
  columns,
  commitOnBlur = true,
  containerClassName,
  emptyState = '표시할 항목이 없습니다.',
  getRowKey,
  getRowTone,
  onCellCommit,
  onRowSelectionChange,
  onSortChange,
  rows,
  selectedRowKeys = EMPTY_SELECTED_KEYS,
  selectionMode = 'none',
  sort,
  stickyHeader = true,
  totals,
  ...tableProps
}: DataGridProps<TData>): ReactElement {
  const generatedId = useId();
  const containerId = `lagrange-data-grid-${generatedId}`;
  const hasEditableColumns = columns.some((column) =>
    Boolean(column.getEditValue || column.renderEditor),
  );
  const {
    draft,
    editingCell,
    finishEditing,
    focusedCell,
    handleCellKeyDown,
    handleEditorKeyDown,
    setDraftValue,
    setFocusedCell,
    startEditing,
  } = useDataGrid({
    columns,
    containerId,
    getRowKey,
    onCellCommit,
    onRowSelectionChange,
    rows,
    selectedRowKeys,
    selectionMode,
  });

  function renderEditor(
    row: TData,
    rowIndex: number,
    column: DataGridColumn<TData>,
    columnIndex: number,
  ): ReactNode {
    const ariaLabel = column.getEditorLabel?.(row, rowIndex) ?? column.id;
    const editorProps: DataGridEditorRenderProps<TData> = {
      ariaLabel,
      cancel: () => finishEditing(
        row,
        rowIndex,
        column,
        columnIndex,
        false,
        true,
      ),
      commit: () => finishEditing(
        row,
        rowIndex,
        column,
        columnIndex,
        true,
        true,
      ),
      onValueChange: setDraftValue,
      row,
      rowIndex,
      value: draft,
    };

    if (column.renderEditor) {
      return column.renderEditor(editorProps);
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>): void {
      setDraftValue(event.currentTarget.value);
    }

    return (
      <input
        aria-label={ariaLabel}
        autoFocus
        className={styles.editor}
        onBlur={
          commitOnBlur
            ? () => finishEditing(
                row,
                rowIndex,
                column,
                columnIndex,
                true,
                false,
              )
            : undefined
        }
        onChange={handleChange}
        onKeyDown={(event) =>
          handleEditorKeyDown(event, row, rowIndex, column, columnIndex)
        }
        value={draft}
      />
    );
  }

  return (
    <div
      className={clsx(styles.container, containerClassName)}
      id={containerId}
    >
      <table
        {...tableProps}
        aria-colcount={columns.length}
        aria-multiselectable={selectionMode === 'multiple' || undefined}
        aria-readonly={!hasEditableColumns}
        className={clsx(styles.table, className)}
        role="grid"
      >
        <thead className={stickyHeader ? styles.stickyHeader : undefined}>
          <tr>
            {columns.map((column) => {
              const sortDirection =
                sort?.columnId === column.id ? sort.direction : undefined;

              return (
                <th
                  aria-sort={column.sortable ? sortDirection ?? 'none' : undefined}
                  className={clsx(
                    styles.headerCell,
                    styles.align[column.align ?? 'start'],
                  )}
                  key={column.id}
                  scope="col"
                  style={{ width: column.width }}
                >
                  {column.sortable && onSortChange ? (
                    <button
                      className={styles.sortButton}
                      onClick={() =>
                        onSortChange({
                          columnId: column.id,
                          direction: getNextSortDirection(sortDirection),
                        })
                      }
                      type="button"
                    >
                      {column.header}
                      <span aria-hidden="true" className={styles.sortMarker}>
                        {getSortMarker(sortDirection)}
                      </span>
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              );
            })}
          </tr>
          <StructuralBoundary columnCount={columns.length} />
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td className={styles.emptyCell} colSpan={columns.length}>
                {emptyState}
              </td>
            </tr>
          ) : (
            rows.map((row, rowIndex) => {
              const rowKey = getRowKey(row, rowIndex);
              const isSelected = selectedRowKeys.has(rowKey);
              const rowTone = getRowTone?.(row, rowIndex) ?? 'default';

              return (
                <tr
                  aria-selected={selectionMode === 'none' ? undefined : isSelected}
                  className={clsx(
                    styles.row,
                    styles.rowTone[rowTone],
                    isSelected && styles.selectedRow,
                  )}
                  data-row-tone={rowTone}
                  key={rowKey}
                >
                  {columns.map((column, columnIndex) => {
                    const isEditing =
                      editingCell?.rowKey === rowKey &&
                      editingCell.columnId === column.id;
                    const isEditable = isEditableColumn(column, row, rowIndex);
                    const isFocused =
                      focusedCell?.rowKey === rowKey &&
                      focusedCell.columnId === column.id;

                    return (
                      <td
                        className={clsx(
                          styles.cell,
                          styles.align[column.align ?? 'start'],
                        )}
                        data-editable={isEditable || undefined}
                        data-editing={isEditing || undefined}
                        data-grid-cell={`${rowIndex}-${columnIndex}`}
                        key={column.id}
                        onClick={(event) => {
                          if (
                            event.target !== event.currentTarget &&
                            (isEditing ||
                              isInteractiveGridDescendant(
                                event.target,
                                event.currentTarget,
                              ))
                          ) {
                            return;
                          }

                          setFocusedCell({ columnIndex, rowIndex });
                          event.currentTarget.focus();
                        }}
                        onDoubleClick={(event) => {
                          if (
                            event.target !== event.currentTarget &&
                            (isEditing ||
                              isInteractiveGridDescendant(
                                event.target,
                                event.currentTarget,
                              ))
                          ) {
                            return;
                          }

                          startEditing(row, rowIndex, column, columnIndex);
                        }}
                        onFocus={(event) => {
                          if (event.target === event.currentTarget) {
                            setFocusedCell({ columnIndex, rowIndex });
                          }
                        }}
                        onKeyDown={(event) => {
                          if (event.target !== event.currentTarget) {
                            return;
                          }

                          handleCellKeyDown(
                            event,
                            row,
                            rowIndex,
                            column,
                            columnIndex,
                          );
                        }}
                        role="gridcell"
                        tabIndex={isFocused ? 0 : -1}
                      >
                        {isEditing
                          ? renderEditor(row, rowIndex, column, columnIndex)
                          : column.renderCell(row, rowIndex)}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
        {totals ? (
          <tfoot>
            <StructuralBoundary columnCount={columns.length} />
            <tr>
              {columns.map((column, columnIndex) => (
                <td
                  className={clsx(
                    styles.totalCell,
                    styles.align[column.align ?? 'start'],
                  )}
                  key={column.id}
                  role="gridcell"
                >
                  {totals[columnIndex]}
                </td>
              ))}
            </tr>
          </tfoot>
        ) : null}
      </table>
    </div>
  );
}
