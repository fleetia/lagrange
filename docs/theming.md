# Theming Lagrange

Lagrange의 theme API는 raw palette를 component에 직접 연결하지 않고, 의미와 구현 결정을 분리합니다.

```text
primitiveTokens
  └─ semanticTokens
       └─ componentTokens

themeVars (raw authoring contract)
  └─ semanticVars (semantic fallback)
       └─ componentVars (component fallback)
            └─ component styles
```

| Layer | 책임 | 예시 |
| --- | --- | --- |
| `primitiveTokens` | 의미가 없는 raw scale과 palette | `palette.aubergine`, `space.sm` |
| `semanticTokens` | 화면 전체에서 공유하는 역할 | `color.surface.canvas`, `color.status.critical` |
| `componentTokens` | component가 semantic 역할을 사용하는 방식 | `button.primaryBackground`, `table.headerSurface` |
| `themeVars` | stable CSS variable contract | `--lagrange-semantic-color-surface-canvas` |
| `semanticVars` | derived semantic 역할을 use site에서 해석하는 값 | `interaction.primary` → `content.accent` |
| `componentVars` | component override와 semantic 기본값을 합성한 값 | `button.primaryBackground` → `interaction.primary` |

Application code는 layout 계산처럼 raw scale이 필요한 경우를 제외하면 semantic 또는 component 역할을 선택합니다. 새 component stylesheet에서 legacy `tokens`와 `vars`를 직접 사용하지 않습니다.

Navigation, overlay, range control은 각각 `component.navigation`, `component.overlay`, `component.range` contract를 공유합니다. 이 slot은 Breadcrumb/Tabs, Dialog/ContextMenu, RangeField처럼 같은 시각 역할을 공유하는 component 사이의 theme 일관성을 유지합니다.

## Public API

Theme authoring API는 React component와 분리된 subpath에서 가져올 수 있습니다.

```ts
import {
  componentVars,
  componentTokens,
  createSelectIndicatorTexture,
  createThemeTokens,
  lagrangeTheme,
  lagrangeThemeClass,
  primitiveTokens,
  semanticVars,
  semanticTokens,
  themeVars,
  type LagrangeTheme,
  type LagrangeThemeOverrides,
} from '@fleetia/lagrange/theme';
```

- `lagrangeTheme`은 모든 contract leaf를 채운 기본 theme value입니다.
- `lagrangeThemeClass`는 package stylesheet에 compile된 기본 class입니다.
- `createThemeTokens`는 partial override를 기본 theme과 합쳐 완전한 `LagrangeTheme`을 반환하는 pure function입니다.
- `createSelectIndicatorTexture`는 custom control color를 encoded Select indicator asset으로 만듭니다.
- `themeVars`의 variable name은 public contract이며 plain CSS에서도 사용할 수 있습니다.
- `semanticVars`와 `componentVars`는 fallback을 포함한 effective value입니다. Lagrange component stylesheet는 이 둘을 사용합니다.

`tokens`, `vars`, `themeClass`는 이전 consumer를 위한 compatibility facade입니다. 새 code에서는 각각 `primitiveTokens`, `themeVars`, `lagrangeThemeClass`를 사용합니다.

## Complete theme replacement

완전히 다른 theme boundary는 consumer가 Vanilla Extract integration을 소유하고 build time에 class를 만듭니다. Lagrange는 runtime `ThemeProvider`나 theme object context를 요구하지 않습니다.

```bash
pnpm add -D @vanilla-extract/css @vanilla-extract/vite-plugin
```

Vite consumer는 plugin을 application config에 등록합니다.

```ts
// vite.config.ts
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
});
```

```ts
// brandTheme.css.ts
import { createTheme } from '@vanilla-extract/css';
import {
  createSelectIndicatorTexture,
  createThemeTokens,
  themeVars,
} from '@fleetia/lagrange/theme';

export const brandThemeClass = createTheme(
  themeVars,
  createThemeTokens({
    semantic: {
      colorScheme: 'light',
      color: {
        surface: {
          canvas: '#e8e3d3',
          raised: '#f4efe1',
          muted: '#d8d1bd',
        },
        content: {
          primary: '#253138',
          secondary: '#5b676b',
          accent: '#214f5d',
          onAccent: '#f7f1e2',
        },
      },
      material: {
        canvasTexture: 'none',
      },
    },
    component: {
      control: {
        selectIndicator: createSelectIndicatorTexture('#214f5d'),
      },
      table: {
        headerSurface: '#cbd3ca',
      },
    },
  }),
);
```

```tsx
import type { ReactElement } from 'react';
import { ThemeRoot } from '@fleetia/lagrange';
import { brandThemeClass } from './brandTheme.css';

export function Root(): ReactElement {
  return <ThemeRoot themeClassName={brandThemeClass}>...</ThemeRoot>;
}
```

`themeClassName`은 default class를 함께 붙이지 않고 교체합니다. 두 complete theme class의 source order가 우연히 결과를 결정하지 않게 하기 위한 동작입니다.

## Partial CSS override

Build tool에 Vanilla Extract를 추가하지 않는 application은 stable CSS variable을 override할 수 있습니다. 이 경우 `themeClassName`이 아니라 일반 `className`을 사용해 complete default theme을 유지합니다.

```css
.brand-surface {
  --lagrange-semantic-color-content-accent: #294f59;
  --lagrange-semantic-color-interaction-primary: #294f59;
  --lagrange-semantic-color-interaction-primary-hover: #7a5736;
}
```

```tsx
<ThemeRoot className="brand-surface">...</ThemeRoot>
```

Application stylesheet는 `@fleetia/lagrange/styles.css` 뒤에 import합니다. Default theme은 derived semantic variable과 component variable을 fallback으로 해석하므로, 하위 element에서 base semantic variable 하나만 바꿔도 연결된 component에 전파됩니다.

특정 component만 조정하려면 component variable을 직접 override합니다.

```css
.dense-ledger {
  --lagrange-component-table-row-height: 1.375rem;
  --lagrange-component-table-header-surface: #d6d1be;
}
```

## Nested boundaries

독립된 theme class는 application 안에 중첩할 수 있습니다.

```tsx
<ThemeRoot>
  <MainApplication />
  <ThemeRoot themeClassName={brandThemeClass}>
    <EmbeddedLedger />
  </ThemeRoot>
</ThemeRoot>
```

이미 상위 element가 complete theme contract를 제공한다면 `themeClassName={null}`로 default class 없이 inheritance만 사용할 수 있습니다.

기본 `ThemeRoot`를 complete custom theme 안에 다시 중첩하면 semantic/component override를 default 값으로 reset합니다. 반대로 바깥 theme을 그대로 이어받아야 하는 boundary만 `themeClassName={null}`을 사용합니다.

## Material tokens

Paper grain도 `semantic.material.canvasTexture`와 `canvasTextureSize`에 포함됩니다. Color token만 교체하고 기존 Lagrange pigment texture가 남는 theme leak을 막기 위한 경계입니다. Custom theme은 data URI, CSS gradient 또는 `none`을 사용할 수 있습니다.

Select indicator처럼 CSS image 자체에 색이 포함되는 asset은 `component.control.selectIndicator`로 교체합니다. Custom control palette에서는 `createSelectIndicatorTexture(color)`로 theme에 맞는 image value를 생성합니다. Native date/time control의 밝기는 `semantic.colorScheme`에서 `light`, `dark` 또는 browser가 지원하는 조합으로 지정합니다.

## Authoring rules

- Primitive name과 raw `themeVars`를 component stylesheet에서 직접 사용하지 않습니다. `semanticVars` 또는 `componentVars`를 사용합니다.
- 같은 default color를 사용하더라도 의미가 다르면 semantic/component slot을 분리합니다.
- Shared intent는 semantic token에서, 단일 component의 예외는 component token에서 바꿉니다.
- Theme override는 layout shift를 피하도록 focus/error state의 border width와 control size를 일관되게 유지합니다.
- Stable CSS variable을 rename하거나 제거하는 변경은 public API 변경으로 취급합니다.
