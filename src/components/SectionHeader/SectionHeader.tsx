import type {
  ComponentPropsWithoutRef,
  ReactElement,
  ReactNode,
} from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';

import { Rule, type RuleVariant } from '../Rule/Rule';
import {
  Heading,
  Text,
  type HeadingLevel,
  type HeadingVariant,
} from '../Typography/Typography';
import * as styles from './SectionHeader.css';

export type SectionHeaderRule = RuleVariant | 'none';

export type SectionHeaderProps = Omit<
  ComponentPropsWithoutRef<'header'>,
  'children' | 'title'
> & {
  aside?: ReactNode;
  description?: ReactNode;
  eyebrow?: ReactNode;
  headingId?: string;
  headingLevel?: HeadingLevel;
  headingVariant?: HeadingVariant;
  rule?: SectionHeaderRule;
  title: ReactNode;
};

export const SectionHeader = forwardRef<HTMLElement, SectionHeaderProps>(
  (
    {
      aside,
      className,
      description,
      eyebrow,
      headingId,
      headingLevel = 2,
      headingVariant = 'section',
      rule = 'boundary',
      title,
      ...props
    },
    ref,
  ): ReactElement => (
    <header ref={ref} {...props} className={clsx(styles.header, className)}>
      <div className={styles.main}>
        <div className={styles.copy}>
          {eyebrow !== undefined && eyebrow !== null ? (
            <Text
              className={styles.eyebrow}
              tone="muted"
              variant="caption"
              weight="strong"
            >
              {eyebrow}
            </Text>
          ) : null}
          <Heading
            id={headingId}
            level={headingLevel}
            variant={headingVariant}
          >
            {title}
          </Heading>
          {description !== undefined && description !== null ? (
            <Text
              as="p"
              className={styles.description}
              tone="muted"
              variant="caption"
            >
              {description}
            </Text>
          ) : null}
        </div>
        {aside !== undefined && aside !== null ? (
          <div className={styles.aside}>{aside}</div>
        ) : null}
      </div>
      {rule === 'none' ? null : <Rule variant={rule} />}
    </header>
  ),
);

SectionHeader.displayName = 'SectionHeader';
