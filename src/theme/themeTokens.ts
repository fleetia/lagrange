import { paperGrainTexture, selectIndicatorTexture } from './materials';
import {
  themeVars,
  type LagrangeTheme,
  type LagrangeThemeOverrides,
} from './themeContract.css';
import { tokens } from './tokens';

export const semanticTokens: LagrangeTheme['semantic'] = {
  colorScheme: 'light',
  color: {
    surface: {
      canvas: tokens.color.paper,
      raised: tokens.color.paperRaised,
      muted: tokens.color.paperMuted,
    },
    content: {
      primary: tokens.color.ink,
      secondary: tokens.color.inkMuted,
      accent: tokens.color.aubergine,
      onAccent: themeVars.semantic.color.surface.raised,
    },
    border: {
      strong: tokens.color.rule,
      subtle: tokens.color.ruleMuted,
    },
    interaction: {
      primary: themeVars.semantic.color.content.accent,
      primaryHover: themeVars.semantic.color.status.positive,
      focus: tokens.color.periwinkle,
      focusSurface: tokens.color.periwinkleWash,
    },
    selection: {
      indicator: themeVars.semantic.color.status.positive,
      surface: themeVars.semantic.color.interaction.focusSurface,
    },
    status: {
      positive: tokens.color.olive,
      positiveSurface: tokens.color.oliveWash,
      critical: tokens.color.vermilion,
      criticalSurface: tokens.color.vermilionWash,
    },
  },
  typography: {
    family: tokens.font,
    size: tokens.fontSize,
    lineHeight: tokens.lineHeight,
  },
  space: tokens.space,
  dimension: {
    control: tokens.size.control,
    row: tokens.size.row,
    ruleGap: tokens.size.ruleGap,
  },
  shape: {
    radius: tokens.radius,
  },
  border: {
    width: tokens.border,
  },
  material: {
    canvasTexture: paperGrainTexture,
    canvasTextureSize: '128px 128px',
  },
};

export const componentTokens: LagrangeTheme['component'] = {
  control: {
    height: themeVars.semantic.dimension.control,
    compactHeight: themeVars.semantic.dimension.row,
    text: themeVars.semantic.color.content.primary,
    placeholder: themeVars.semantic.color.content.secondary,
    border: themeVars.semantic.color.border.strong,
    hoverBorder: themeVars.semantic.color.interaction.primary,
    focusSurface: themeVars.semantic.color.interaction.focusSurface,
    focusIndicator: themeVars.semantic.color.interaction.focus,
    invalidSurface: themeVars.semantic.color.status.criticalSurface,
    invalidIndicator: themeVars.semantic.color.status.critical,
    disabledText: themeVars.semantic.color.content.secondary,
    disabledSurface: themeVars.semantic.color.surface.muted,
    selectIndicator: selectIndicatorTexture,
  },
  button: {
    primaryText: themeVars.semantic.color.content.onAccent,
    primaryBackground: themeVars.semantic.color.interaction.primary,
    primaryHoverBackground: themeVars.semantic.color.interaction.primaryHover,
    secondaryText: themeVars.semantic.color.content.accent,
    secondaryHoverBackground: themeVars.semantic.color.interaction.focusSurface,
    quietText: themeVars.semantic.color.content.secondary,
    quietHoverText: themeVars.semantic.color.content.accent,
    quietHoverBackground: themeVars.semantic.color.interaction.focusSurface,
    criticalText: themeVars.semantic.color.status.critical,
    criticalHoverBackground: themeVars.semantic.color.status.criticalSurface,
    focusIndicator: themeVars.semantic.color.interaction.focus,
    disabledText: themeVars.semantic.color.content.secondary,
    disabledBackground: themeVars.semantic.color.surface.muted,
    disabledBorder: themeVars.semantic.color.border.subtle,
  },
  choice: {
    text: themeVars.semantic.color.content.primary,
    border: themeVars.semantic.color.border.strong,
    checkIndicator: themeVars.semantic.color.interaction.primary,
    selectedIndicator: themeVars.semantic.color.selection.indicator,
    selectedSurface: themeVars.semantic.color.status.positiveSurface,
    activeSurface: themeVars.semantic.color.selection.surface,
    focusSurface: themeVars.semantic.color.interaction.focusSurface,
    critical: themeVars.semantic.color.status.critical,
    disabledText: themeVars.semantic.color.content.secondary,
    disabledSurface: themeVars.semantic.color.surface.muted,
  },
  table: {
    rowHeight: themeVars.semantic.dimension.row,
    text: themeVars.semantic.color.content.primary,
    captionText: themeVars.semantic.color.content.accent,
    headerText: themeVars.semantic.color.content.accent,
    headerSurface: themeVars.semantic.color.surface.muted,
    rowHoverSurface: themeVars.semantic.color.interaction.focusSurface,
    rowSelectedSurface: themeVars.semantic.color.selection.surface,
    rowSelectedIndicator: themeVars.semantic.color.selection.indicator,
    rowMutedText: themeVars.semantic.color.content.secondary,
    rowCriticalText: themeVars.semantic.color.status.critical,
    rowCriticalSurface: themeVars.semantic.color.status.criticalSurface,
    rowDivider: themeVars.semantic.color.border.subtle,
    structuralBorder: themeVars.semantic.color.border.strong,
    totalText: themeVars.semantic.color.content.accent,
    totalSurface: themeVars.semantic.color.status.positiveSurface,
    emptyText: themeVars.semantic.color.content.secondary,
  },
  rule: {
    strong: themeVars.semantic.color.border.strong,
    subtle: themeVars.semantic.color.border.subtle,
    gap: themeVars.semantic.dimension.ruleGap,
  },
  chart: {
    text: themeVars.semantic.color.content.accent,
    mutedText: themeVars.semantic.color.content.secondary,
    chrome: themeVars.semantic.color.content.accent,
    tick: themeVars.semantic.color.interaction.focus,
    surface: themeVars.semantic.color.surface.raised,
    alternate: themeVars.semantic.color.status.positive,
    pigmentDark: themeVars.semantic.color.content.accent,
    pigmentLight: themeVars.semantic.color.surface.raised,
    pigmentFiber: themeVars.semantic.color.content.secondary,
  },
  overlay: {
    backdrop: `color-mix(in srgb, ${themeVars.semantic.color.content.accent} 42%, transparent)`,
    surface: themeVars.semantic.color.surface.raised,
    border: themeVars.semantic.color.border.strong,
    text: themeVars.semantic.color.content.primary,
  },
  navigation: {
    text: themeVars.semantic.color.content.secondary,
    hoverText: themeVars.semantic.color.content.accent,
    hoverSurface: themeVars.semantic.color.interaction.focusSurface,
    selectedText: themeVars.semantic.color.content.accent,
    selectedSurface: themeVars.semantic.color.selection.surface,
    selectedIndicator: themeVars.semantic.color.selection.indicator,
    separator: themeVars.semantic.color.border.subtle,
  },
  range: {
    track: themeVars.semantic.color.border.subtle,
    activeTrack: themeVars.semantic.color.interaction.primary,
    thumb: themeVars.semantic.color.interaction.primary,
    focusIndicator: themeVars.semantic.color.interaction.focus,
    disabledTrack: themeVars.semantic.color.border.subtle,
    disabledThumb: themeVars.semantic.color.content.secondary,
  },
};

export const lagrangeTheme: LagrangeTheme = {
  semantic: semanticTokens,
  component: componentTokens,
};

const mergeTokenGroup = <Group extends object>(
  defaults: Group,
  overrides: Partial<Group> | undefined,
): Group => {
  const definedOverrides = Object.fromEntries(
    Object.entries(overrides ?? {}).filter(([, value]) => value !== undefined),
  );

  return { ...defaults, ...definedOverrides };
};

export const createThemeTokens = (
  overrides: LagrangeThemeOverrides = {},
): LagrangeTheme => ({
  semantic: {
    colorScheme:
      overrides.semantic?.colorScheme ?? semanticTokens.colorScheme,
    color: {
      surface: mergeTokenGroup(
        semanticTokens.color.surface,
        overrides.semantic?.color?.surface,
      ),
      content: mergeTokenGroup(
        semanticTokens.color.content,
        overrides.semantic?.color?.content,
      ),
      border: mergeTokenGroup(
        semanticTokens.color.border,
        overrides.semantic?.color?.border,
      ),
      interaction: mergeTokenGroup(
        semanticTokens.color.interaction,
        overrides.semantic?.color?.interaction,
      ),
      selection: mergeTokenGroup(
        semanticTokens.color.selection,
        overrides.semantic?.color?.selection,
      ),
      status: mergeTokenGroup(
        semanticTokens.color.status,
        overrides.semantic?.color?.status,
      ),
    },
    typography: {
      family: mergeTokenGroup(
        semanticTokens.typography.family,
        overrides.semantic?.typography?.family,
      ),
      size: mergeTokenGroup(
        semanticTokens.typography.size,
        overrides.semantic?.typography?.size,
      ),
      lineHeight: mergeTokenGroup(
        semanticTokens.typography.lineHeight,
        overrides.semantic?.typography?.lineHeight,
      ),
    },
    space: mergeTokenGroup(
      semanticTokens.space,
      overrides.semantic?.space,
    ),
    dimension: mergeTokenGroup(
      semanticTokens.dimension,
      overrides.semantic?.dimension,
    ),
    shape: {
      radius: mergeTokenGroup(
        semanticTokens.shape.radius,
        overrides.semantic?.shape?.radius,
      ),
    },
    border: {
      width: mergeTokenGroup(
        semanticTokens.border.width,
        overrides.semantic?.border?.width,
      ),
    },
    material: mergeTokenGroup(
      semanticTokens.material,
      overrides.semantic?.material,
    ),
  },
  component: {
    control: mergeTokenGroup(
      componentTokens.control,
      overrides.component?.control,
    ),
    button: mergeTokenGroup(
      componentTokens.button,
      overrides.component?.button,
    ),
    choice: mergeTokenGroup(
      componentTokens.choice,
      overrides.component?.choice,
    ),
    table: mergeTokenGroup(
      componentTokens.table,
      overrides.component?.table,
    ),
    rule: mergeTokenGroup(
      componentTokens.rule,
      overrides.component?.rule,
    ),
    chart: mergeTokenGroup(
      componentTokens.chart,
      overrides.component?.chart,
    ),
    overlay: mergeTokenGroup(
      componentTokens.overlay,
      overrides.component?.overlay,
    ),
    navigation: mergeTokenGroup(
      componentTokens.navigation,
      overrides.component?.navigation,
    ),
    range: mergeTokenGroup(
      componentTokens.range,
      overrides.component?.range,
    ),
  },
});
