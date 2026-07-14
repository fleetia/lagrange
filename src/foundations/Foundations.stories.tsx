import type { CSSProperties, ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  componentTokens,
  Heading,
  Inline,
  primitiveTokens,
  Rule,
  semanticTokens,
  Stack,
  Text,
  ThemeRoot,
} from '../index';

const meta = {
  title: 'Foundations/Visual Language',
  id: 'foundations-visual-language',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          'Lagrange의 primitive token 전체와 semantic/component layer의 역할을 보여주는 visual foundation catalog입니다. Theme authoring의 전체 contract는 docs/theming.md에서 다룹니다.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const DARK_SWATCHES = new Set([
  'aubergine',
  'ink',
  'inkMuted',
  'olive',
  'periwinkle',
  'rule',
  'vermilion',
]);

const PALETTE = Object.entries(primitiveTokens.palette).map(
  ([name, value]) => ({
    ink: DARK_SWATCHES.has(name)
      ? primitiveTokens.palette.paperRaised
      : primitiveTokens.palette.ink,
    name,
    value,
  }),
);

const TOKEN_GROUP_GRID_STYLE: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(14rem, 1fr))',
  gap: primitiveTokens.space.xl,
  marginTop: primitiveTokens.space.lg,
};

const TOKEN_LIST_STYLE: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'minmax(6rem, 1fr) minmax(0, 2fr)',
  gap: `${primitiveTokens.space.xs} ${primitiveTokens.space.md}`,
  margin: 0,
};

const TOKEN_VALUE_STYLE: CSSProperties = {
  overflowWrap: 'anywhere',
  fontFamily: primitiveTokens.fontFamily.data,
  fontSize: primitiveTokens.fontSize.caption,
};

type TokenListProps = {
  label: string;
  values: Readonly<Record<string, string>>;
};

function TokenList({ label, values }: TokenListProps): ReactElement {
  return (
    <section aria-label={label}>
      <Heading level={3} variant="label">
        {label}
      </Heading>
      <dl style={TOKEN_LIST_STYLE}>
        {Object.entries(values).map(([name, value]) => (
          <div key={name} style={{ display: 'contents' }}>
            <dt>
              <Text variant="caption" tone="muted">
                {name}
              </Text>
            </dt>
            <dd style={{ ...TOKEN_VALUE_STYLE, margin: 0 }}>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function PaletteAndTypeStory(): ReactElement {
  return (
    <ThemeRoot className="lagrange-story lagrange-story--compact" data-testid="foundation-story">
      <header className="lagrange-story__header">
        <div>
          <p className="lagrange-story__kicker">Lagrange foundation · specimen 01</p>
          <Heading level={1} variant="display">
            생활 회계 관찰 기록
          </Heading>
        </div>
        <div className="lagrange-story__meta">Aged paper / precise data / compact rhythm</div>
      </header>

      <Rule variant="structural" />

      <section className="lagrange-story__section" aria-labelledby="palette-heading">
        <div className="lagrange-story__section-heading">
          <Heading id="palette-heading" level={2} variant="subsection">
            Palette
          </Heading>
          <span className="lagrange-story__index">14 TOKENS</span>
        </div>
        <div className="lagrange-story__swatches">
          {PALETTE.map((color) => (
            <div
              className="lagrange-story__swatch"
              key={color.name}
              style={{ backgroundColor: color.value, color: color.ink }}
            >
              <span className="lagrange-story__swatch-name">{color.name}</span>
              <span className="lagrange-story__swatch-value">{color.value}</span>
            </div>
          ))}
        </div>
      </section>

      <Rule variant="weak" />

      <section className="lagrange-story__section" aria-labelledby="type-heading">
        <div className="lagrange-story__section-heading">
          <Heading id="type-heading" level={2} variant="subsection">
            Typography
          </Heading>
          <span className="lagrange-story__index">DISPLAY / UI / DATA</span>
        </div>
        <div className="lagrange-story__type-specimens">
          <Stack gap="md" className="lagrange-story__type-column">
            <Heading level={3} variant="display">
              기록은 가볍게,
              <br />흐름은 정확하게.
            </Heading>
            <Text as="p" tone="muted">
              일상의 수입과 지출을 작은 단위로 관찰하고, 숫자 사이의 관계를 또렷하게
              남깁니다.
            </Text>
          </Stack>
          <Stack gap="sm" className="lagrange-story__type-column">
            <Text variant="label" weight="strong" tone="accent">
              JULY CASH FLOW · FIG. 03
            </Text>
            <Text variant="data">2026.07.13 MON 14:24</Text>
            <Text variant="data" tone="positive">
              + ₩ 3,200,000
            </Text>
            <Text variant="data" tone="critical">
              − ₩ 1,248,500
            </Text>
            <Text variant="caption" tone="muted">
              Tabular figures stay compact and comparable.
            </Text>
          </Stack>
        </div>
        <div style={TOKEN_GROUP_GRID_STYLE}>
          <TokenList
            label="Font family"
            values={primitiveTokens.fontFamily}
          />
          <TokenList label="Font size" values={primitiveTokens.fontSize} />
          <TokenList label="Line height" values={primitiveTokens.lineHeight} />
        </div>
      </section>
    </ThemeRoot>
  );
}

function SpacingAndShapeStory(): ReactElement {
  return (
    <ThemeRoot
      className="lagrange-story lagrange-story--compact"
      data-testid="spacing-shape-story"
    >
      <header className="lagrange-story__header">
        <div>
          <p className="lagrange-story__kicker">
            Lagrange foundation · specimen 02
          </p>
          <Heading level={1} variant="display">
            Spacing & shape
          </Heading>
        </div>
        <Text variant="caption" tone="muted">
          Compact rhythm / stable geometry
        </Text>
      </header>

      <Rule variant="structural" />

      <section
        className="lagrange-story__section"
        aria-labelledby="spacing-heading"
      >
        <div className="lagrange-story__section-heading">
          <Heading id="spacing-heading" level={2} variant="subsection">
            Spacing scale
          </Heading>
          <span className="lagrange-story__index">0—2REM</span>
        </div>
        <Stack gap="sm">
          {Object.entries(primitiveTokens.space).map(([name, value]) => (
            <div
              key={name}
              style={{
                display: 'grid',
                gridTemplateColumns: '5rem minmax(0, 1fr) 4rem',
                alignItems: 'center',
                gap: primitiveTokens.space.md,
              }}
            >
              <Text variant="caption" tone="muted">
                {name}
              </Text>
              <span
                aria-hidden="true"
                style={{
                  width: value === '0' ? '1px' : value,
                  height: primitiveTokens.space.sm,
                  background: primitiveTokens.palette.aubergine,
                }}
              />
              <span style={TOKEN_VALUE_STYLE}>{value}</span>
            </div>
          ))}
        </Stack>
      </section>

      <Rule variant="weak" />

      <div style={TOKEN_GROUP_GRID_STYLE}>
        <TokenList label="Dimension" values={primitiveTokens.dimension} />
        <TokenList label="Radius" values={primitiveTokens.radius} />
        <TokenList label="Border width" values={primitiveTokens.borderWidth} />
      </div>
    </ThemeRoot>
  );
}

const TOKEN_LAYERS = [
  {
    name: 'primitiveTokens',
    responsibility: 'Raw palette, type, spacing, dimension, radius, border scale',
    groups: Object.keys(primitiveTokens),
  },
  {
    name: 'semanticTokens',
    responsibility: 'Application-wide roles such as surface, content and status',
    groups: Object.keys(semanticTokens),
  },
  {
    name: 'componentTokens',
    responsibility: 'Component decisions that consume semantic roles',
    groups: Object.keys(componentTokens),
  },
] as const;

function TokenLayersStory(): ReactElement {
  return (
    <ThemeRoot
      className="lagrange-story lagrange-story--compact"
      data-testid="token-layers-story"
    >
      <header className="lagrange-story__header">
        <div>
          <p className="lagrange-story__kicker">
            Lagrange foundation · token contract
          </p>
          <Heading level={1} variant="display">
            Token layers
          </Heading>
        </div>
        <Text variant="caption" tone="muted">
          Raw value → shared role → component decision
        </Text>
      </header>

      <Rule variant="structural" />

      <ol
        className="lagrange-story__section"
        style={{ display: 'grid', gap: primitiveTokens.space.xl, paddingLeft: 0 }}
      >
        {TOKEN_LAYERS.map((layer, index) => (
          <li
            key={layer.name}
            style={{ display: 'grid', gap: primitiveTokens.space.sm }}
          >
            <Inline align="baseline" gap="md">
              <span className="lagrange-story__index">0{index + 1}</span>
              <Heading level={2} variant="subsection">
                {layer.name}
              </Heading>
            </Inline>
            <Text as="p">{layer.responsibility}</Text>
            <Text as="p" variant="caption" tone="muted">
              {layer.groups.join(' · ')}
            </Text>
            {index < TOKEN_LAYERS.length - 1 ? <Rule variant="weak" /> : null}
          </li>
        ))}
      </ol>

      <Text as="p" variant="caption" tone="muted">
        Stable CSS variable, fallback, custom theme authoring은 package의{' '}
        <a href="https://github.com/fleetia/lagrange/blob/main/docs/theming.md">
          docs/theming.md
        </a>
        를 참고합니다.
      </Text>
    </ThemeRoot>
  );
}

function RuleHierarchyStory(): ReactElement {
  return (
    <ThemeRoot className="lagrange-story lagrange-story--compact" data-testid="rule-story">
      <header className="lagrange-story__header">
        <div>
          <p className="lagrange-story__kicker">Lagrange foundation · specimen 02</p>
          <Heading level={1} variant="display">
            Rule hierarchy
          </Heading>
        </div>
        <Text variant="caption" tone="muted">
          1px geometry / no boxes
        </Text>
      </header>

      <Rule variant="structural" />

      <div className="lagrange-story__section lagrange-story__rule-list">
        <div className="lagrange-story__rule-example">
          <Stack gap="xxs">
            <Text variant="label" weight="strong">01 · Weak</Text>
            <Text variant="caption" tone="muted">Body grouping</Text>
          </Stack>
          <Rule variant="weak" />
        </div>
        <div className="lagrange-story__rule-example">
          <Stack gap="xxs">
            <Text variant="label" weight="strong">02 · Boundary</Text>
            <Text variant="caption" tone="muted">Ordinary boundary</Text>
          </Stack>
          <Rule variant="boundary" />
        </div>
        <div className="lagrange-story__rule-example">
          <Stack gap="xxs">
            <Text variant="label" weight="strong">03 · Structural</Text>
            <Text variant="caption" tone="muted">Section transition</Text>
          </Stack>
          <Rule variant="structural" />
        </div>
        <Inline gap="lg" align="stretch">
          <Text variant="caption" tone="muted">Vertical structure</Text>
          <Rule orientation="vertical" variant="structural" />
          <Text as="p">
            Double rules mark a change in information structure, not a decorative emphasis.
          </Text>
        </Inline>
      </div>
    </ThemeRoot>
  );
}

export const PaletteAndType: Story = {
  render: PaletteAndTypeStory,
};

export const SpacingAndShape: Story = {
  render: SpacingAndShapeStory,
};

export const TokenLayers: Story = {
  render: TokenLayersStory,
};

export const Rules: Story = {
  render: RuleHierarchyStory,
};
