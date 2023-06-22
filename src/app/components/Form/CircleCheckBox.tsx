import React from 'react';
import styled from 'styled-components';
import { SpaceProps } from 'styled-system';
import { colors } from 'theme/colors';
import { Box } from '../Box';

interface Props extends SpaceProps {
  checked: boolean;
  id?: string;
  labelComponent?: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

function CirleCheckBox({
  labelComponent,
  id,
  onChange,
  checked,
  ...rest
}: Props) {
  return (
    <Box pl="8px" {...rest}>
      <StyledCheckBox
        checked={checked}
        id={id}
        type="checkbox"
        onChange={onChange}
      />
      <label htmlFor={id}>{labelComponent}</label>
    </Box>
  );
}

const StyledCheckBox = styled.input`
  position: absolute;
  opacity: 0;

  & + label {
    display: flex;
    position: relative;
    cursor: pointer;
    padding: 0;
    font-size: 14px;
    color: ${colors.gray7};
  }

  & + label:before {
    content: '';
    margin-right: 16px;
    display: inline-block;
    vertical-align: text-top;
    width: 16px;
    min-width: 16px;
    height: 16px;
    border: 1px solid ${colors.gray5};
    border-radius: 50%;
  }

  &:focus + label:before {
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.12);
  }

  &:checked + label:before {
    background: ${colors.primary};
    border: 1px solid ${colors.primary};
  }

  &:disabled + label {
    color: #b8b8b8;
    cursor: auto;
  }

  &:disabled + label:before {
    box-shadow: none;
    background: #ddd;
  }

  &:checked + label:after {
    content: '';
    position: absolute;
    left: 3px;
    top: 7px;
    background: ${colors.gray1};
    width: 2px;
    height: 2px;
    box-shadow: 2px 0 0 ${colors.gray1}, 4px 0 0 ${colors.gray1},
      4px -2px 0 ${colors.gray1}, 4px -4px 0 ${colors.gray1},
      4px -6px 0 ${colors.gray1}, 4px -8px 0 ${colors.gray1};
    transform: rotate(45deg);
  }
`;

export default CirleCheckBox;
