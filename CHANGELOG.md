# @fleetia/lagrange

## 0.2.0

### Minor Changes

- cdc5a01: Add a compact ColorPicker with an anchored dialog, keyboard-operable hue wheel, saturation and lightness controls, editable color channels, and native color selection that preserves alpha. Values use the existing ColorField normalized hex contract.

  Keep controlled HSL inputs synchronized when a parent rejects an edit, and preserve precise alpha values when an unchanged channel loses focus.

### Patch Changes

- cdc5a01: Lock background scrolling while dialogs are open and restore prior overflow styles after the last dialog closes or unmounts.

## 0.1.1

### Patch Changes

- 958e186: Add an accessible alpha percentage control to ColorField when showAlpha is enabled.

## 0.1.0

### Minor Changes

- 49a597b: Add the complete editorial component catalog, compact form controls, keyboard-editable data grid, save feedback, layout primitives, and accessible radial breakdown chart.
- 8653545: Add accessible Breadcrumb, Dialog, Tabs, ContextMenu, RangeField, ColorField, and PlacementPicker components with shared overlay, navigation, and range theme contracts.
- ed773f3: Introduce the Lagrange editorial design system foundations and first component set.
- ebe649c: Add composable primitive, semantic, and component theme tokens with stable CSS variables, custom ThemeRoot boundaries, and a dedicated theme authoring entry point.
