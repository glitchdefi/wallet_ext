import React, { useState, useEffect } from 'react';

import { GlitchToken } from '../../../../constants/tokens';

import { colors } from 'theme/colors';
import { useTokenPrice, useAccount } from 'state/wallet/hooks';
import { isValidAddressPolkadotAddress } from 'utils/strings';
import { formatNumberDownRoundWithExtractMax } from 'utils/number';

import { Box, Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { Button, ButtonShadow } from 'app/components/Button';
import { DownArrowIcon } from 'app/components/Svg';
import { GlitchLogo } from 'app/components/Image';
import { Label, Input } from 'app/components/Form';
import { AmountInput } from './AmountInput';
import { NetworkFee } from './NetworkFee';
interface Props {
  initData: { amount: any; toAddress: string };
  onNext: (amount: any, toAddress: string) => void;
}

export const SendForm: React.FC<Props> = React.memo(({ initData, onNext }) => {
  const { address, balance } = useAccount();
  const { priceUsd } = useTokenPrice();

  const [toAddress, setToAddress] = useState<string>('');
  const [amount, setAmount] = useState<any>('');
  const [isValidAmount, setIsValidAmount] = useState(false);
  const [isValidAddress, setIsValidAddress] = useState(false);

  const feeToUsd = GlitchToken.fee * priceUsd;
  const isEnableSendButton = isValidAddress && isValidAmount;

  useEffect(() => {
    if (initData) {
      !toAddress && setToAddress(initData.toAddress);
      !amount && setAmount(initData.amount);
    }
  }, [initData]);

  useEffect(() => {
    setIsValidAddress(isValidAddressPolkadotAddress(toAddress));
  }, [toAddress]);

  return (
    <>
      <Flex flexDirection="column" p="16px">
        <Flex
          py="10px"
          px="16px"
          width="100%"
          background={colors.gray1}
          alignItems="center"
        >
          <Flex flex={1} alignItems="center">
            <GlitchLogo width={32} height={32} />
            <Text large ml="12px" bold>
              GLCH
            </Text>
          </Flex>

          {/* <DownArrowIcon width="16px" color={colors.primary} /> */}
        </Flex>

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
                {formatNumberDownRoundWithExtractMax(balance, 6)}
              </Text>
              <Text bold ml="8px">
                GLCH
              </Text>
            </Flex>
          </Flex>

          <AmountInput
            initAmount={amount}
            onChange={({ amount, isValid }) => {
              setAmount(amount);
              setIsValidAmount(isValid);
            }}
            balance={balance}
          />
        </Box>

        <Box mt="24px">
          <NetworkFee fee={feeToUsd?.toFixed(9)} />
        </Box>
      </Flex>

      <Box px="16px" pb="16px" mt="auto">
        {isEnableSendButton ? (
          <ButtonShadow width="100%" onClick={() => onNext(amount, toAddress)}>
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
