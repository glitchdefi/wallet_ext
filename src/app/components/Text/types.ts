import { LayoutProps, SpaceProps, TypographyProps } from 'styled-system';

export interface TextProps extends SpaceProps, TypographyProps, LayoutProps {
  color?: string;
  fontSize?: string;
  bold?: boolean;
  large?: boolean;
  ellipsis?: boolean;
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize';
}
