import styled from 'styled-components';

import { colors } from '../../../../theme/colors';
import { InputProps } from './types';

const Input = styled.input<InputProps>`
  font-family: IBM Plex Mono;
  transition: all 0.5s;
  background-color: transparent;
  border: ${({ hasBorder = true }) =>
    hasBorder ? `1px solid ${colors.gray3}` : 'none'};
  border-color: ${({ isError }) => isError && colors.red};
  color: ${colors.gray9};
  text-transform: ${({ textTransform }) => textTransform};
  display: block;
  font-size: 16px;
  outline: 0;
  padding: 8px 12px;
  width: 100%;
  &::placeholder {
    color: ${colors.gray4};
  }
  &:focus {
    transition: all 0.5s;
    border: ${({ hasBorder }) =>
      hasBorder ? `1px solid ${colors.primary}` : 'none'};
    border-color: ${({ isError }) => isError && colors.red};
  }
`;

Input.defaultProps = {};

export default Input;
