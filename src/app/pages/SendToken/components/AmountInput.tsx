import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BN from 'bn.js';
import web3Utils from 'web3-utils';

import { GlitchToken } from '../../../../constants/tokens';
import { colors } from 'theme/colors';
import { isValidAmountSend } from 'utils/number';

import { Box, Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { Button } from 'app/components/Button';
import { Input } from 'app/components/Form';

type Value = {
  amount: any;
  isValid: boolean;
};

interface Props {
  initAmount?: any;
  balance?: any;
  onChange: ({ amount, isValid }: Value) => void;
}

export const AmountInput: React.FC<Props> = ({
  initAmount,
  onChange,
  balance,
}) => {
  const [amount, setAmount] = useState<any>('');
  const [isValid, setIsValid] = useState(false);
  const [hasDecimalsError, setHasDecimalsError] = useState(false);
  const [isMaxClicked, setIsMaxClicked] = useState(false);

  useEffect(() => {
    initAmount && setAmount(initAmount);
  }, [initAmount]);

  // Check validate
  useEffect(() => {
    setIsValid(isValidAmountSend(amount, balance, GlitchToken.fee.toString()));
  }, [balance, amount]);

  useEffect(() => {
    onChange({ amount, isValid: isValid && !hasDecimalsError });
  }, [amount, isValid]);

  /**
   *
   */
  const onInputChange = (event: any) => {
    const { value } = event.target;

    // E.g: 100.888888888
    const isDecimalsError =
      value?.split('.')?.length > 0 && value?.split('.')[1]?.length > 18;

    setHasDecimalsError(isDecimalsError);
    setAmount(value);
    isMaxClicked && setIsMaxClicked(false);
  };

  /**
   *
   *
   */
  const onMaxClick = () => {
    if (Number(balance) <= 0) return;
    
    // Reset error
    setHasDecimalsError(false);
    
    const balanceToBN = new BN(web3Utils.toWei(balance));
    const feeToBN = new BN(web3Utils.toWei(GlitchToken.fee.toString()));
    
    // amount =  balance - fee
    setAmount(web3Utils.fromWei(balanceToBN.sub(feeToBN)));
    setIsMaxClicked(true);
  };

  return (
    <>
      <InputWrap
        isError={
          Number(amount) > Number(balance) ||
          (Number(amount) > 0 && !isValid) ||
          Number(amount) < 0 ||
          hasDecimalsError
        }
      >
        <Input
          value={amount}
          type="number"
          hasBorder={false}
          placeholder="0"
          onChange={onInputChange}
        />

        <Box>
          <Flex
            flex={1}
            alignItems="center"
            justifyContent="flex-end"
            px="12px"
          >
            <Text large color={colors.gray4}>
              GLCH
            </Text>
            <Text large mx="12px" color={colors.gray4}>
              |
            </Text>
            <MaxButtonWrap
              disabled={Number(balance) <= 0}
              isMaxClicked={isMaxClicked}
            >
              <Button
                className="max-button"
                py="2px"
                px="8px"
                variant="secondary"
                onClick={onMaxClick}
              >
                <Text
                  color={isMaxClicked ? colors.white : colors.primary}
                  fontSize="12px"
                >
                  Max
                </Text>
              </Button>
            </MaxButtonWrap>
          </Flex>
        </Box>
      </InputWrap>

      {Number(amount) > 0 && !isValid && (
        <Text fontSize="12px" mt="2px" color={colors.error}>
          Insufficient token
        </Text>
      )}
      {Number(amount) < 0 && (
        <Text fontSize="12px" mt="2px" color={colors.error}>
          Invalid amount
        </Text>
      )}
      {hasDecimalsError && (
        <Text fontSize="12px" mt="2px" color={colors.error}>
          Cannot enter more than 18 decimal places.
        </Text>
      )}
    </>
  );
};

const InputWrap = styled.div<{ isError?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s;
  border: 1px solid ${({ isError }) => (isError ? colors.error : colors.gray8)};

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  &:focus-within {
    border: 1px solid
      ${({ isError }) => (isError ? colors.error : colors.primary)};
  }

  input {
    width: 100%;
    flex: 1;
  }
`;

const MaxButtonWrap = styled.div<{
  isMaxClicked?: boolean;
  disabled?: boolean;
}>`
  .max-button {
    ${({ disabled }) => disabled && 'cursor: not-allowed !important'};
    ${({ isMaxClicked }) =>
      isMaxClicked && `background-color: rgba(0, 255, 255, 0.8)`};
  }
`;
