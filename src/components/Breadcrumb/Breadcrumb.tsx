import type {
  ComponentPropsWithoutRef,
  ReactElement,
  ReactNode,
} from 'react';
import { forwardRef, Fragment } from 'react';
import clsx from 'clsx';

import * as styles from './Breadcrumb.css';

export type BreadcrumbItem = {
  href?: string;
  key?: string;
  label: ReactNode;
  onClick?: () => void;
};

export type BreadcrumbProps = Omit<
  ComponentPropsWithoutRef<'nav'>,
  'children'
> & {
  items: readonly BreadcrumbItem[];
};

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      'aria-label': ariaLabel = 'Breadcrumb',
      className,
      items,
      ...props
    },
    ref,
  ): ReactElement => (
    <nav
      ref={ref}
      aria-label={ariaLabel}
      className={clsx(styles.breadcrumb, className)}
      {...props}
    >
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;
          const itemClassName = clsx(
            styles.item,
            isCurrent && styles.currentItem,
          );

          return (
            <Fragment key={item.key ?? index}>
              {index > 0 ? (
                <li aria-hidden="true" className={styles.separator}>
                  /
                </li>
              ) : null}
              <li className={styles.listItem}>
                {item.href ? (
                  <a
                    aria-current={isCurrent ? 'page' : undefined}
                    className={itemClassName}
                    href={item.href}
                    onClick={item.onClick}
                  >
                    {item.label}
                  </a>
                ) : (
                  <button
                    aria-current={isCurrent ? 'page' : undefined}
                    className={itemClassName}
                    onClick={item.onClick}
                    type="button"
                  >
                    {item.label}
                  </button>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  ),
);

Breadcrumb.displayName = 'Breadcrumb';
