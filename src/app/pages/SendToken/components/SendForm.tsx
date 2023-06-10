import React, { useState, useEffect } from 'react';
import { useDebounce } from 'use-lodash-debounce';
import styled from 'styled-components';

import { colors } from 'theme/colors';
import { isValidAddressPolkadotAddress } from 'utils/strings';
import {
  calcTotalBalance,
  formatNumberDownRoundWithExtractMax,
} from 'utils/number';
import { useAccount } from 'contexts/WalletContext/hooks';
import { useTokenPrice } from 'contexts/TokenPriceContext/hooks';
import { getEstimateFee } from 'scripts/ui/messaging';
import { GLITCH_CHAINS } from 'constants/values';

import { Box, Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { Button, ButtonShadow } from 'app/components/Button';
// import { DownArrowIcon } from 'app/components/Svg';
import { GlitchLogo } from 'app/components/Image';
import { Label, Input } from 'app/components/Form';
import { AmountInput } from './AmountInput';
import { NetworkFee } from './NetworkFee';
import { MessageBox } from 'app/components/MessageBox';
import { Dropdown } from 'app/components/Dropdown';
import { CheckIcon, DownArrowIcon } from 'app/components/Svg';

interface Props {
  initData: { amount: any; toAddress: string; isMaxClicked: boolean };
  onNext: (
    amount: any,
    estimateFee: string,
    toAddress: string,
    isMaxClicked: boolean
  ) => void;
}

export const SendForm: React.FC<Props> = React.memo(({ initData, onNext }) => {
  const { balance } = useAccount();
  const totalBalance = calcTotalBalance(balance);
  const { tokenPrice } = useTokenPrice();

  const [toAddress, setToAddress] = useState<string>('');
  const [amount, setAmount] = useState<any>('');
  const [isValidAmount, setIsValidAmount] = useState<boolean>(false);
  const [isValidAddress, setIsValidAddress] = useState<boolean>(false);
  const [isMaxClicked, setIsMaxClicked] = useState<boolean>(false);
  const [estimateFee, setEstimateFee] = useState<string>('0');
  const [isFeeLoading, setIsFeeLoading] = useState<boolean>(false);
  const debouncedAmount = useDebounce(amount, 500);
  const debouncedToAddress = useDebounce(toAddress, 500);

  const feeToUsd = estimateFee ? parseFloat(estimateFee) * tokenPrice : null;
  const isEnableSendButton =
    isValidAddress &&
    isValidAmount &&
    !isFeeLoading &&
    parseFloat(estimateFee) > 0;

  useEffect(() => {
    if (initData) {
      !toAddress && setToAddress(initData.toAddress);
      !amount && setAmount(initData.amount);
      !isMaxClicked && setIsMaxClicked(initData.isMaxClicked);
    }
  }, [initData.toAddress, initData.amount, initData.isMaxClicked]);

  useEffect(() => {
    setIsValidAddress(isValidAddressPolkadotAddress(toAddress));
  }, [toAddress]);

  useEffect(() => {
    if (toAddress && isValidAddress && amount && !isFeeLoading) {
      setIsFeeLoading(true);
    }
  }, [amount, toAddress]);

  useEffect(() => {
    async function getFee() {
      if (toAddress && isValidAddress && parseFloat(amount) > 0) {
        const fee = await getEstimateFee({ toAddress, amount });
        setEstimateFee(fee);
      } else {
        setEstimateFee('0');
      }
      setIsFeeLoading(false);
    }
    getFee();
  }, [debouncedAmount, debouncedToAddress]);

  return (
    <>
      <Flex flexDirection="column" p="16px">
        <SelectChainWrapper>
          <Dropdown
            showChecked
            activeKey={'substrate'}
            // onSelect={(key) => {
            //   if (showArrow) {
            //     setNetwork({ network: key });
            //   }
            // }}
            customToggle={
              <Flex
                py="10px"
                px="16px"
                width="100%"
                background={colors.gray1}
                alignItems="center"
              >
                <Flex flex={1} alignItems="center">
                  <GlitchLogo width={32} height={32} />
                  <Text large ml="12px" mr="4px" bold>
                    GLCH
                  </Text>
                </Flex>

                <DownArrowIcon width="16px" color={colors.primary} />
              </Flex>
            }
            renderItem={(item) => (
              <Flex alignItems="center" justifyContent="space-between">
                <Flex flex={1} alignItems="center">
                  <GlitchLogo width={24} height={24} mr="12px" />
                  <Text mr="6px" bold>
                    GLCH
                  </Text>
                  {/* <Text fontSize="12px" color={colors.gray6}>
                    {item.label}
                  </Text> */}
                </Flex>

                <CheckIcon width="14px" color={colors.primary} />
              </Flex>
            )}
            items={GLITCH_CHAINS}
          />
        </SelectChainWrapper>

        <Box mt="24px">
          <Label>Send to</Label>
          <Input
            isError={toAddress && !isValidAddress}
            value={toAddress}
            placeholder="Enter the address"
            onChange={(e) => {
              const { value } = e.target;
              setToAddress(value);
            }}
          />
          {toAddress && !isValidAddress && (
            <Text mt="2px" color={colors.error}>
              Invalid recipient's address
            </Text>
          )}
        </Box>

        <Box mt="24px">
          <Flex alignItems="center" justifyContent="space-between">
            <Label>Amount</Label>
            <Flex mb="8px">
              <Text color={colors.gray6}>Balance:</Text>
              <Text bold ml="8px">
                {formatNumberDownRoundWithExtractMax(totalBalance, 6)}
              </Text>
              <Text bold ml="8px">
                GLCH
              </Text>
            </Flex>
          </Flex>

          <AmountInput
            initAmount={amount}
            isMaxClicked={isMaxClicked}
            isFeeLoading={isFeeLoading}
            estimateFee={estimateFee}
            onChange={({ amount, isValid, isMaxClicked }) => {
              setAmount(amount);
              setIsValidAmount(isValid);
              setIsMaxClicked(isMaxClicked);
            }}
            balance={totalBalance}
          />
        </Box>

        <Box mt="24px">
          <NetworkFee
            loading={isFeeLoading}
            fee={estimateFee}
            feeToUsd={feeToUsd?.toFixed(9)}
          />
        </Box>

        {isMaxClicked && (
          <MessageBox
            mt="16px"
            message="When the balance is available to afford the transaction fees, the system will deduct the charges from the balance. If not, the system will deduct it from the total volume."
          />
        )}
      </Flex>

      <Box px="16px" pb="16px" mt="auto">
        {isEnableSendButton ? (
          <ButtonShadow
            width="100%"
            onClick={() => onNext(amount, estimateFee, toAddress, isMaxClicked)}
          >
            Send
          </ButtonShadow>
        ) : (
          <Button width="100%" variant="disable-primary">
            Send
          </Button>
        )}
      </Box>
    </>
  );
});

const SelectChainWrapper = styled.div`
  .glch-dropdown {
    .dropdown-menu {
      min-width: calc(100vw - 32px);
    }

    button {
      width: 100%;
    }

    @media screen and (min-width: 768px) {
      .dropdown-menu {
        min-width: calc(744px - 32px);
      }
    }
  }
`;
