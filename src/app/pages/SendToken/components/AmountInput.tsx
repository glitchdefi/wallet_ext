import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BN from 'bn.js';
import web3Utils from 'web3-utils';
import { BN_HUNDRED } from '@polkadot/util';

import { colors } from 'theme/colors';
import { isValidAmountSend } from 'utils/number';

import { Box, Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { Button } from 'app/components/Button';
import { Input } from 'app/components/Form';
import { Spinner } from 'app/components/Loading';

type Value = {
  amount: any;
  isValid: boolean;
  isMaxClicked?: boolean;
};

interface Props {
  initAmount?: any;
  balance?: any;
  onChange: ({ amount, isValid }: Value) => void;
  isFeeLoading?: boolean;
  estimateFee?: string;
}

export const AmountInput: React.FC<Props> = ({
  initAmount,
  onChange,
  balance,
  isFeeLoading,
  estimateFee,
}) => {
  const [amount, setAmount] = useState<any>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [hasDecimalsError, setHasDecimalsError] = useState<boolean>(false);
  const [isMaxClicked, setIsMaxClicked] = useState<boolean>(false);
  const [isMaxLoading, setIsMaxLoading] = useState<boolean>(false);

  useEffect(() => {
    initAmount && setAmount(initAmount);
  }, [initAmount]);

  // Check validate
  useEffect(() => {
    !isMaxLoading &&
      setIsValid(isValidAmountSend(amount || '0', balance, estimateFee));
  }, [isFeeLoading, balance, amount, estimateFee, isMaxLoading]);

  useEffect(() => {
    onChange({
      amount,
      isValid: isValid && !hasDecimalsError,
      isMaxClicked,
    });
  }, [amount, isValid, estimateFee]);

  useEffect(() => {
    setTimeout(() => {
      if (isMaxLoading && !isFeeLoading && parseFloat(estimateFee) > 0) {
        const balanceToBN = new BN(web3Utils.toWei(balance));
        const feeToBN = new BN(web3Utils.toWei(estimateFee));
        const adjFee = feeToBN.muln(110).div(BN_HUNDRED);

        setIsMaxClicked(true);
        // amount =  balance - fee
        setAmount(web3Utils.fromWei(balanceToBN.sub(adjFee)));
        setIsMaxLoading(false);
      }
    }, 500);
  }, [isFeeLoading, estimateFee, isMaxLoading]);

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
    if (Number(balance) <= 0 || isMaxClicked) return;

    setIsMaxLoading(true);
    setAmount(balance);
    // Reset error
    setIsValid(true);
    setHasDecimalsError(false);
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
          value={isMaxLoading ? '' : amount}
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
                {isMaxLoading ? (
                  <Flex py="2px">
                    <Spinner size="12px" />
                  </Flex>
                ) : (
                  <Text
                    color={isMaxClicked ? colors.white : colors.primary}
                    fontSize="12px"
                  >
                    Max
                  </Text>
                )}
              </Button>
            </MaxButtonWrap>
          </Flex>
        </Box>
      </InputWrap>

      {Number(amount) > 0 &&
        Number(balance) > 0 &&
        !isValid &&
        !hasDecimalsError && (
          <Text fontSize="12px" mt="2px" color={colors.error}>
            Insufficient funds
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
    display: flex;
    ${({ disabled }) => disabled && 'cursor: not-allowed !important'};
    ${({ isMaxClicked }) =>
      isMaxClicked && `background-color: rgba(0, 255, 255, 0.8)`};
  }
`;
