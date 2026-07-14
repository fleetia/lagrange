import type {
  CSSProperties,
  Key,
  ReactNode,
  TableHTMLAttributes,
} from 'react';

export type DataGridAlign = 'start' | 'center' | 'end';
export type DataGridRowTone = 'default' | 'muted' | 'critical';
export type DataGridSelectionMode = 'none' | 'single' | 'multiple';
export type DataGridSortDirection = 'ascending' | 'descending';

export type DataGridSort = {
  columnId: string;
  direction: DataGridSortDirection;
};

export type DataGridCellCommit<TData> = {
  columnId: string;
  row: TData;
  rowIndex: number;
  value: string;
};

export type DataGridEditorRenderProps<TData> = {
  ariaLabel: string;
  cancel: () => void;
  commit: () => void;
  onValueChange: (value: string) => void;
  row: TData;
  rowIndex: number;
  value: string;
};

export type DataGridColumn<TData> = {
  align?: DataGridAlign;
  getEditValue?: (row: TData, rowIndex: number) => string;
  getEditorLabel?: (row: TData, rowIndex: number) => string;
  header: ReactNode;
  id: string;
  isEditable?: boolean | ((row: TData, rowIndex: number) => boolean);
  renderCell: (row: TData, rowIndex: number) => ReactNode;
  renderEditor?: (
    editor: DataGridEditorRenderProps<TData>,
  ) => ReactNode;
  sortable?: boolean;
  width?: CSSProperties['width'];
};

export type DataGridProps<TData> = Omit<
  TableHTMLAttributes<HTMLTableElement>,
  'children' | 'onChange'
> & {
  columns: readonly DataGridColumn<TData>[];
  commitOnBlur?: boolean;
  containerClassName?: string;
  emptyState?: ReactNode;
  getRowKey: (row: TData, rowIndex: number) => Key;
  getRowTone?: (row: TData, rowIndex: number) => DataGridRowTone;
  onCellCommit?: (change: DataGridCellCommit<TData>) => void;
  onRowSelectionChange?: (
    rowKey: Key,
    row: TData,
    isSelected: boolean,
  ) => void;
  onSortChange?: (sort: DataGridSort) => void;
  rows: readonly TData[];
  selectedRowKeys?: ReadonlySet<Key>;
  selectionMode?: DataGridSelectionMode;
  sort?: DataGridSort;
  stickyHeader?: boolean;
  totals?: readonly ReactNode[];
};
