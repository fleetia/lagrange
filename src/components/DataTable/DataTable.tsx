import type {
  CSSProperties,
  Key,
  ReactElement,
  ReactNode,
  TableHTMLAttributes,
} from 'react';
import clsx from 'clsx';

import * as styles from './DataTable.css';

export type DataTableAlign = 'start' | 'center' | 'end';
export type DataTableRowTone = 'default' | 'selected' | 'muted' | 'critical';

export type DataTableColumn<TData> = {
  align?: DataTableAlign;
  header: ReactNode;
  id: string;
  renderCell: (row: TData, rowIndex: number) => ReactNode;
  width?: CSSProperties['width'];
};

export type DataTableProps<TData> = Omit<
  TableHTMLAttributes<HTMLTableElement>,
  'children'
> & {
  caption?: ReactNode;
  columns: readonly DataTableColumn<TData>[];
  containerClassName?: string;
  emptyState?: ReactNode;
  getRowKey: (row: TData, rowIndex: number) => Key;
  getRowTone?: (row: TData, rowIndex: number) => DataTableRowTone;
  rows: readonly TData[];
  totals?: readonly ReactNode[];
};

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

export function DataTable<TData>({
  caption,
  className,
  columns,
  containerClassName,
  emptyState = '표시할 항목이 없습니다.',
  getRowKey,
  getRowTone,
  rows,
  totals,
  ...tableProps
}: DataTableProps<TData>): ReactElement {
  return (
    <div className={clsx(styles.container, containerClassName)}>
      <table className={clsx(styles.table, className)} {...tableProps}>
        {caption ? <caption className={styles.caption}>{caption}</caption> : null}
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                className={clsx(
                  styles.headerCell,
                  styles.align[column.align ?? 'start'],
                )}
                key={column.id}
                scope="col"
                style={{ width: column.width }}
              >
                {column.header}
              </th>
            ))}
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
              const tone = getRowTone?.(row, rowIndex) ?? 'default';

              return (
                <tr
                  aria-selected={tone === 'selected' || undefined}
                  className={clsx(styles.bodyRow, styles.rowTone[tone])}
                  data-row-tone={tone}
                  key={getRowKey(row, rowIndex)}
                >
                  {columns.map((column) => (
                    <td
                      className={clsx(
                        styles.bodyCell,
                        styles.align[column.align ?? 'start'],
                      )}
                      key={column.id}
                    >
                      {column.renderCell(row, rowIndex)}
                    </td>
                  ))}
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
