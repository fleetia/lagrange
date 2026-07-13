import type { ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Heading,
  Inline,
  Rule,
  Stack,
  Text,
  ThemeRoot,
  tokens,
} from '../index';

const meta = {
  title: 'Foundations/Visual Language',
  component: ThemeRoot,
  parameters: {
    controls: { disable: true },
  },
} satisfies Meta<typeof ThemeRoot>;

export default meta;

type Story = StoryObj<typeof meta>;

const PALETTE = [
  { name: 'Paper', value: tokens.color.paper, ink: tokens.color.ink },
  { name: 'Aubergine', value: tokens.color.aubergine, ink: tokens.color.paperRaised },
  { name: 'Periwinkle', value: tokens.color.periwinkle, ink: tokens.color.paperRaised },
  { name: 'Olive', value: tokens.color.olive, ink: tokens.color.paperRaised },
  { name: 'Vermilion', value: tokens.color.vermilion, ink: tokens.color.paperRaised },
] as const;

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
          <span className="lagrange-story__index">01—05</span>
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
      </section>
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

export const Rules: Story = {
  render: RuleHierarchyStory,
};
