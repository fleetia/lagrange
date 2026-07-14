import { describe, expect, it } from 'vitest';

import { vars } from './theme.css';
import {
  componentVars,
  semanticVars,
  themeVars,
} from './themeContract.css';
import { componentTokens, semanticTokens } from './themeTokens';

describe('theme contract', () => {
  it('keeps stable semantic and component CSS variable names', () => {
    expect(themeVars.semantic.color.content.accent).toBe(
      'var(--lagrange-semantic-color-content-accent)',
    );
    expect(themeVars.component.table.rowHeight).toBe(
      'var(--lagrange-component-table-row-height)',
    );
    expect(themeVars.semantic.colorScheme).toBe(
      'var(--lagrange-semantic-color-scheme)',
    );
  });

  it('keeps legacy variables connected to derived theme roles', () => {
    expect(vars.color.aubergine).toBe(
      themeVars.semantic.color.content.accent,
    );
    expect(semanticTokens.color.interaction.primary).toBe(
      vars.color.aubergine,
    );
    expect(semanticTokens.color.content.onAccent).toBe(
      vars.color.paperRaised,
    );
    expect(semanticTokens.color.interaction.primaryHover).toBe(
      vars.color.olive,
    );
    expect(semanticTokens.color.selection.surface).toBe(
      vars.color.periwinkleWash,
    );
    expect(componentTokens.table.rowHeight).toBe(vars.size.row);
  });

  it('resolves derived roles and component defaults at the use site', () => {
    expect(semanticVars.color.interaction.primary).toBe(
      'var(--lagrange-semantic-color-interaction-primary, var(--lagrange-semantic-color-content-accent))',
    );
    expect(semanticVars.color.selection.surface).toBe(
      'var(--lagrange-semantic-color-selection-surface, var(--lagrange-semantic-color-interaction-focus-surface))',
    );
    expect(componentVars.button.primaryBackground).toBe(
      'var(--lagrange-component-button-primary-background, var(--lagrange-semantic-color-interaction-primary, var(--lagrange-semantic-color-content-accent)))',
    );
  });
});
