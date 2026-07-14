export type ContextMenuPoint = {
  x: number;
  y: number;
};

type Size = {
  height: number;
  width: number;
};

export type ContextMenuPosition = {
  left: number;
  top: number;
};

function clampAxis(
  value: number,
  contentSize: number,
  viewportSize: number,
  viewportPadding: number,
): number {
  const maximum = Math.max(
    viewportPadding,
    viewportSize - contentSize - viewportPadding,
  );

  return Math.min(Math.max(value, viewportPadding), maximum);
}

export function getClampedMenuPosition(
  anchorPoint: ContextMenuPoint,
  menuSize: Size,
  viewportSize: Size,
  viewportPadding = 4,
): ContextMenuPosition {
  return {
    left: clampAxis(
      anchorPoint.x,
      menuSize.width,
      viewportSize.width,
      viewportPadding,
    ),
    top: clampAxis(
      anchorPoint.y,
      menuSize.height,
      viewportSize.height,
      viewportPadding,
    ),
  };
}
