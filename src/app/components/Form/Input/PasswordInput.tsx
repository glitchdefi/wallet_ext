import React, { useState, ChangeEventHandler } from 'react';
import styled from 'styled-components';
import { SpaceProps } from 'styled-system';

import { colors } from '../../../../theme/colors';

import Input from './Input';
import { Flex } from '../../Box';
import { EyeOffIcon, EyeOnIcon } from '../../Svg';
import { Text } from '../../Text';
interface PasswordInputProps extends SpaceProps {
  isError?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  inputMode?:
    | 'none'
    | 'text'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal'
    | 'search';
  msgError?: string;
}

function PasswordInput(props: PasswordInputProps) {
  const {
    onChange,
    placeholder,
    inputMode,
    value,
    isError,
    msgError,
    ...rest
  } = props;
  const [show, setShow] = useState<boolean>(false);

  const onHandleShowPassword = () => {
    if (value) setShow((prev) => !prev);
  };

  return (
    <>
      <StyledWrapper isError={isError} {...rest}>
        <Input
          value={value}
          hasBorder={false}
          type={show ? 'text' : 'password'}
          inputMode={inputMode}
          onChange={onChange}
          placeholder={placeholder}
        />
        {show ? (
          <EyeOnIcon
            cursor="pointer"
            onClick={onHandleShowPassword}
            style={{ userSelect: 'none' }}
          />
        ) : (
          <EyeOffIcon
            cursor="pointer"
            onClick={onHandleShowPassword}
            style={{ userSelect: 'none' }}
          />
        )}
      </StyledWrapper>
      {isError && (
        <Text mt="2px" color={colors.error}>
          {msgError}
        </Text>
      )}
    </>
  );
}

const StyledWrapper = styled(Flex)<{ isError?: boolean }>`
  border: 1px solid ${({ isError }) => (isError ? colors.error : colors.gray8)};
  padding-right: 12px;
  transition: all 0.5s;

  &:focus-within {
    border: 1px solid
      ${({ isError }) => (isError ? colors.error : colors.primary)};
  }
`;

export default PasswordInput;
