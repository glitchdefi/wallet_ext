import styled from 'styled-components';
import { space, layout, variant } from 'styled-system';
import { styleVariants } from './theme';
import { BaseButtonProps } from './types';

const StyledButton = styled.button<BaseButtonProps>`
  background-color: transparent;
  border: 0;
  border-radius: 0;
  position: relative;
  padding: 0;
  outline: none !important;
  box-shadow: none !important;
  pointer-events: all;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  font-family: IBM Plex Mono;
  padding: 8px 0px;
  &:hover {
    opacity: 0.9;
  }

  ${variant({
    variants: styleVariants,
  })}
  ${layout}
  ${space}
`;

export default StyledButton;
