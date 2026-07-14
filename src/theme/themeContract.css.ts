import {
  createGlobalThemeContract,
  fallbackVar,
} from '@vanilla-extract/css';

import { selectIndicatorTexture } from './materials';

const themeTokenShape = {
  semantic: {
    colorScheme: null,
    color: {
      surface: {
        canvas: null,
        raised: null,
        muted: null,
      },
      content: {
        primary: null,
        secondary: null,
        accent: null,
        onAccent: null,
      },
      border: {
        strong: null,
        subtle: null,
      },
      interaction: {
        primary: null,
        primaryHover: null,
        focus: null,
        focusSurface: null,
      },
      selection: {
        indicator: null,
        surface: null,
      },
      status: {
        positive: null,
        positiveSurface: null,
        critical: null,
        criticalSurface: null,
      },
    },
    typography: {
      family: {
        display: null,
        ui: null,
        data: null,
      },
      size: {
        caption: null,
        label: null,
        body: null,
        data: null,
        headingSm: null,
        headingMd: null,
        headingLg: null,
      },
      lineHeight: {
        tight: null,
        compact: null,
        body: null,
      },
    },
    space: {
      none: null,
      xxs: null,
      xs: null,
      sm: null,
      md: null,
      lg: null,
      xl: null,
      xxl: null,
    },
    dimension: {
      control: null,
      row: null,
      ruleGap: null,
    },
    shape: {
      radius: {
        none: null,
        subtle: null,
      },
    },
    border: {
      width: {
        hairline: null,
      },
    },
    material: {
      canvasTexture: null,
      canvasTextureSize: null,
    },
  },
  component: {
    control: {
      height: null,
      compactHeight: null,
      text: null,
      placeholder: null,
      border: null,
      hoverBorder: null,
      focusSurface: null,
      focusIndicator: null,
      invalidSurface: null,
      invalidIndicator: null,
      disabledText: null,
      disabledSurface: null,
      selectIndicator: null,
    },
    button: {
      primaryText: null,
      primaryBackground: null,
      primaryHoverBackground: null,
      secondaryText: null,
      secondaryHoverBackground: null,
      quietText: null,
      quietHoverText: null,
      quietHoverBackground: null,
      criticalText: null,
      criticalHoverBackground: null,
      focusIndicator: null,
      disabledText: null,
      disabledBackground: null,
      disabledBorder: null,
    },
    choice: {
      text: null,
      border: null,
      checkIndicator: null,
      selectedIndicator: null,
      selectedSurface: null,
      activeSurface: null,
      focusSurface: null,
      critical: null,
      disabledText: null,
      disabledSurface: null,
    },
    table: {
      rowHeight: null,
      text: null,
      captionText: null,
      headerText: null,
      headerSurface: null,
      rowHoverSurface: null,
      rowSelectedSurface: null,
      rowSelectedIndicator: null,
      rowMutedText: null,
      rowCriticalText: null,
      rowCriticalSurface: null,
      rowDivider: null,
      structuralBorder: null,
      totalText: null,
      totalSurface: null,
      emptyText: null,
    },
    rule: {
      strong: null,
      subtle: null,
      gap: null,
    },
    chart: {
      text: null,
      mutedText: null,
      chrome: null,
      tick: null,
      surface: null,
      alternate: null,
      pigmentDark: null,
      pigmentLight: null,
      pigmentFiber: null,
    },
  },
} as const;

type ThemeValues<T> = T extends null
  ? string
  : { readonly [Key in keyof T]: ThemeValues<T[Key]> };

type DeepPartial<T> = T extends string
  ? string
  : { readonly [Key in keyof T]?: DeepPartial<T[Key]> };

export type LagrangeTheme = ThemeValues<typeof themeTokenShape>;
export type LagrangeThemeOverrides = DeepPartial<LagrangeTheme>;

const toKebabCase = (value: string): string =>
  value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

export const themeVars = createGlobalThemeContract(
  themeTokenShape,
  (_value, path): string =>
    `lagrange-${path.map(toKebabCase).join('-')}`,
);

export const themeContract = themeVars;

const withFallback = (tokenVar: string, defaultValue: string): string =>
  fallbackVar(tokenVar, defaultValue);

export const semanticVars = {
  ...themeVars.semantic,
  color: {
    ...themeVars.semantic.color,
    content: {
      ...themeVars.semantic.color.content,
      onAccent: withFallback(
        themeVars.semantic.color.content.onAccent,
        themeVars.semantic.color.surface.raised,
      ),
    },
    interaction: {
      ...themeVars.semantic.color.interaction,
      primary: withFallback(
        themeVars.semantic.color.interaction.primary,
        themeVars.semantic.color.content.accent,
      ),
      primaryHover: withFallback(
        themeVars.semantic.color.interaction.primaryHover,
        themeVars.semantic.color.status.positive,
      ),
    },
    selection: {
      indicator: withFallback(
        themeVars.semantic.color.selection.indicator,
        themeVars.semantic.color.status.positive,
      ),
      surface: withFallback(
        themeVars.semantic.color.selection.surface,
        themeVars.semantic.color.interaction.focusSurface,
      ),
    },
  },
} as const;

export const componentVars = {
  control: {
    height: withFallback(
      themeVars.component.control.height,
      semanticVars.dimension.control,
    ),
    compactHeight: withFallback(
      themeVars.component.control.compactHeight,
      semanticVars.dimension.row,
    ),
    text: withFallback(
      themeVars.component.control.text,
      semanticVars.color.content.primary,
    ),
    placeholder: withFallback(
      themeVars.component.control.placeholder,
      semanticVars.color.content.secondary,
    ),
    border: withFallback(
      themeVars.component.control.border,
      semanticVars.color.border.strong,
    ),
    hoverBorder: withFallback(
      themeVars.component.control.hoverBorder,
      semanticVars.color.interaction.primary,
    ),
    focusSurface: withFallback(
      themeVars.component.control.focusSurface,
      semanticVars.color.interaction.focusSurface,
    ),
    focusIndicator: withFallback(
      themeVars.component.control.focusIndicator,
      semanticVars.color.interaction.focus,
    ),
    invalidSurface: withFallback(
      themeVars.component.control.invalidSurface,
      semanticVars.color.status.criticalSurface,
    ),
    invalidIndicator: withFallback(
      themeVars.component.control.invalidIndicator,
      semanticVars.color.status.critical,
    ),
    disabledText: withFallback(
      themeVars.component.control.disabledText,
      semanticVars.color.content.secondary,
    ),
    disabledSurface: withFallback(
      themeVars.component.control.disabledSurface,
      semanticVars.color.surface.muted,
    ),
    selectIndicator: withFallback(
      themeVars.component.control.selectIndicator,
      selectIndicatorTexture,
    ),
  },
  button: {
    primaryText: withFallback(
      themeVars.component.button.primaryText,
      semanticVars.color.content.onAccent,
    ),
    primaryBackground: withFallback(
      themeVars.component.button.primaryBackground,
      semanticVars.color.interaction.primary,
    ),
    primaryHoverBackground: withFallback(
      themeVars.component.button.primaryHoverBackground,
      semanticVars.color.interaction.primaryHover,
    ),
    secondaryText: withFallback(
      themeVars.component.button.secondaryText,
      semanticVars.color.content.accent,
    ),
    secondaryHoverBackground: withFallback(
      themeVars.component.button.secondaryHoverBackground,
      semanticVars.color.interaction.focusSurface,
    ),
    quietText: withFallback(
      themeVars.component.button.quietText,
      semanticVars.color.content.secondary,
    ),
    quietHoverText: withFallback(
      themeVars.component.button.quietHoverText,
      semanticVars.color.content.accent,
    ),
    quietHoverBackground: withFallback(
      themeVars.component.button.quietHoverBackground,
      semanticVars.color.interaction.focusSurface,
    ),
    criticalText: withFallback(
      themeVars.component.button.criticalText,
      semanticVars.color.status.critical,
    ),
    criticalHoverBackground: withFallback(
      themeVars.component.button.criticalHoverBackground,
      semanticVars.color.status.criticalSurface,
    ),
    focusIndicator: withFallback(
      themeVars.component.button.focusIndicator,
      semanticVars.color.interaction.focus,
    ),
    disabledText: withFallback(
      themeVars.component.button.disabledText,
      semanticVars.color.content.secondary,
    ),
    disabledBackground: withFallback(
      themeVars.component.button.disabledBackground,
      semanticVars.color.surface.muted,
    ),
    disabledBorder: withFallback(
      themeVars.component.button.disabledBorder,
      semanticVars.color.border.subtle,
    ),
  },
  choice: {
    text: withFallback(
      themeVars.component.choice.text,
      semanticVars.color.content.primary,
    ),
    border: withFallback(
      themeVars.component.choice.border,
      semanticVars.color.border.strong,
    ),
    checkIndicator: withFallback(
      themeVars.component.choice.checkIndicator,
      semanticVars.color.interaction.primary,
    ),
    selectedIndicator: withFallback(
      themeVars.component.choice.selectedIndicator,
      semanticVars.color.selection.indicator,
    ),
    selectedSurface: withFallback(
      themeVars.component.choice.selectedSurface,
      semanticVars.color.status.positiveSurface,
    ),
    activeSurface: withFallback(
      themeVars.component.choice.activeSurface,
      semanticVars.color.selection.surface,
    ),
    focusSurface: withFallback(
      themeVars.component.choice.focusSurface,
      semanticVars.color.interaction.focusSurface,
    ),
    critical: withFallback(
      themeVars.component.choice.critical,
      semanticVars.color.status.critical,
    ),
    disabledText: withFallback(
      themeVars.component.choice.disabledText,
      semanticVars.color.content.secondary,
    ),
    disabledSurface: withFallback(
      themeVars.component.choice.disabledSurface,
      semanticVars.color.surface.muted,
    ),
  },
  table: {
    rowHeight: withFallback(
      themeVars.component.table.rowHeight,
      semanticVars.dimension.row,
    ),
    text: withFallback(
      themeVars.component.table.text,
      semanticVars.color.content.primary,
    ),
    captionText: withFallback(
      themeVars.component.table.captionText,
      semanticVars.color.content.accent,
    ),
    headerText: withFallback(
      themeVars.component.table.headerText,
      semanticVars.color.content.accent,
    ),
    headerSurface: withFallback(
      themeVars.component.table.headerSurface,
      semanticVars.color.surface.muted,
    ),
    rowHoverSurface: withFallback(
      themeVars.component.table.rowHoverSurface,
      semanticVars.color.interaction.focusSurface,
    ),
    rowSelectedSurface: withFallback(
      themeVars.component.table.rowSelectedSurface,
      semanticVars.color.selection.surface,
    ),
    rowSelectedIndicator: withFallback(
      themeVars.component.table.rowSelectedIndicator,
      semanticVars.color.selection.indicator,
    ),
    rowMutedText: withFallback(
      themeVars.component.table.rowMutedText,
      semanticVars.color.content.secondary,
    ),
    rowCriticalText: withFallback(
      themeVars.component.table.rowCriticalText,
      semanticVars.color.status.critical,
    ),
    rowCriticalSurface: withFallback(
      themeVars.component.table.rowCriticalSurface,
      semanticVars.color.status.criticalSurface,
    ),
    rowDivider: withFallback(
      themeVars.component.table.rowDivider,
      semanticVars.color.border.subtle,
    ),
    structuralBorder: withFallback(
      themeVars.component.table.structuralBorder,
      semanticVars.color.border.strong,
    ),
    totalText: withFallback(
      themeVars.component.table.totalText,
      semanticVars.color.content.accent,
    ),
    totalSurface: withFallback(
      themeVars.component.table.totalSurface,
      semanticVars.color.status.positiveSurface,
    ),
    emptyText: withFallback(
      themeVars.component.table.emptyText,
      semanticVars.color.content.secondary,
    ),
  },
  rule: {
    strong: withFallback(
      themeVars.component.rule.strong,
      semanticVars.color.border.strong,
    ),
    subtle: withFallback(
      themeVars.component.rule.subtle,
      semanticVars.color.border.subtle,
    ),
    gap: withFallback(
      themeVars.component.rule.gap,
      semanticVars.dimension.ruleGap,
    ),
  },
  chart: {
    text: withFallback(
      themeVars.component.chart.text,
      semanticVars.color.content.accent,
    ),
    mutedText: withFallback(
      themeVars.component.chart.mutedText,
      semanticVars.color.content.secondary,
    ),
    chrome: withFallback(
      themeVars.component.chart.chrome,
      semanticVars.color.content.accent,
    ),
    tick: withFallback(
      themeVars.component.chart.tick,
      semanticVars.color.interaction.focus,
    ),
    surface: withFallback(
      themeVars.component.chart.surface,
      semanticVars.color.surface.raised,
    ),
    alternate: withFallback(
      themeVars.component.chart.alternate,
      semanticVars.color.status.positive,
    ),
    pigmentDark: withFallback(
      themeVars.component.chart.pigmentDark,
      semanticVars.color.content.accent,
    ),
    pigmentLight: withFallback(
      themeVars.component.chart.pigmentLight,
      semanticVars.color.surface.raised,
    ),
    pigmentFiber: withFallback(
      themeVars.component.chart.pigmentFiber,
      semanticVars.color.content.secondary,
    ),
  },
} as const;
