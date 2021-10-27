import { ComponentProps, ElementType, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { LayoutProps, SpaceProps } from 'styled-system';

export const variants = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  DISABLE_PRIMARY: 'disable-primary',
  DISABLE_SECONDARY: 'disable-secondary',
  CANCEL: 'cancel',
  WARNING: 'warning',
} as const;

export type Variant = typeof variants[keyof typeof variants];

/**
 * @see https://www.benmvp.com/blog/polymorphic-react-components-typescript/
 */
export type AsProps<E extends ElementType = ElementType> = {
  as?: E;
};

export type MergeProps<E extends ElementType> = AsProps<E> &
  Omit<ComponentProps<E>, keyof AsProps>;

export type PolymorphicComponentProps<E extends ElementType, P> = P &
  MergeProps<E>;

export type PolymorphicComponent<P, D extends ElementType = 'button'> = <
  E extends ElementType = D
>(
  props: PolymorphicComponentProps<E, P>
) => ReactElement | null;

export interface BaseButtonProps extends LayoutProps, SpaceProps {
  as?: 'a' | 'button' | typeof Link;
  variant?: Variant;
  external?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
}

export type ButtonProps<P extends ElementType = 'button'> =
  PolymorphicComponentProps<P, BaseButtonProps>;
