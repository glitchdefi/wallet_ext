import React, {
  useState,
  ChangeEventHandler,
  FocusEventHandler,
  Ref,
} from 'react';
import styled from 'styled-components';
import { SpaceProps } from 'styled-system';

import { colors } from 'theme/colors';

import Input from './Input';
import { Flex } from '../../Box';
import { EyeOffIcon, EyeOnIcon } from '../../Svg';
import { Text } from '../../Text';
interface PasswordInputProps extends SpaceProps {
  ref?: Ref<HTMLInputElement>;
  isError?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
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

const PasswordInput: React.FC<PasswordInputProps> = (props) => {
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
    setShow((prev) => !prev);
  };

  return (
    <>
      <StyledWrapper isError={isError}>
        <Input
          value={value}
          hasBorder={false}
          type={show ? 'text' : 'password'}
          inputMode={inputMode}
          onChange={onChange}
          placeholder={placeholder}
          {...rest}
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
};

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
