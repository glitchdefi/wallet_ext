import { SpaceProps } from 'styled-system';

export interface InputProps extends SpaceProps {
  as?: any;
  isError?: boolean;
  hasBorder?: boolean;
  textTransform?: 'uppercase' | 'lowercase';
  inputMode?:
    | 'none'
    | 'text'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal'
    | 'search';
}
