import React, { useEffect, useState } from 'react';

import { colors } from 'theme/colors';
import {
  useSelectedAddress,
  useTokenPrice,
  useWalletActionHandlers,
  useWrongPassword,
  useTransferAction,
} from 'state/wallet/hooks';
import { formatDollarAmount } from 'utils/number';

// Components
import { Box, Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { GlitchLogo } from 'app/components/Image';
import { Label, PasswordInput } from 'app/components/Form';
import { Button, ButtonShadow } from 'app/components/Button';
interface Props {
  amount?: any;
  toAddress?: any;
  estimateFee?: string;
}

export const Confirmation: React.FC<Props> = React.memo(
  ({ amount, estimateFee, toAddress }) => {
    const [password, setPassword] = useState<string>('');

    const { selectedAddress } = useSelectedAddress();
    const { priceUsd } = useTokenPrice();
    const { isWrongPassword } = useWrongPassword();
    const { onClearIsWrongPassword } = useWalletActionHandlers();
    const { onTransfer } = useTransferAction();

    return (
      <Box height="543px" overflowY="scroll">
        <Flex height="471px" flexDirection="column" overflowY="scroll">
          <Flex p="16px" flexDirection="column">
            <Text bold large>
              Confirmation
            </Text>

            <Box mt="16px">
              <Text fontSize="12px" color={colors.gray5}>
                From
              </Text>
              <Text mt="4px" color={colors.gray7}>
                {selectedAddress}
              </Text>
            </Box>

            <Box mt="16px">
              <Text fontSize="12px" color={colors.gray5}>
                To
              </Text>
              <Text mt="4px" color={colors.gray7}>
                {toAddress}
              </Text>
            </Box>

            <Box mt="16px">
              <Text fontSize="12px" color={colors.gray5}>
                Amount
              </Text>
              <Flex mt="5px">
                <GlitchLogo width={24} height={24} />
                <Text ml="8px">{amount} GLCH</Text>
                <Text ml="8px" color={colors.gray5}>
                  {`~ ${formatDollarAmount(priceUsd * amount)} USD`}
                </Text>
              </Flex>
            </Box>

            <Box mt="16px">
              <Text fontSize="12px" color={colors.gray5}>
                Network fee
              </Text>
              <Flex mt="4px">
                <Text>{`${estimateFee} GLCH`}</Text>
                <Text ml="8px" color={colors.gray5}>
                  {`~ ${formatDollarAmount(
                    parseFloat(estimateFee) * priceUsd
                  )} USD`}
                </Text>
              </Flex>
            </Box>
          </Flex>

          <Box background={colors.geekBlue} mt="16px" p="16px">
            <Text fontSize="12px" color={colors.cyan5}>
              Please enter the Glitch password to complete your transaction
            </Text>

            <Box mt="16px">
              <Label>Glitch Password</Label>
              <PasswordInput
                isError={isWrongPassword}
                value={password}
                placeholder="Password"
                onChange={(e) => {
                  const { value } = e.target;
                  isWrongPassword && onClearIsWrongPassword();
                  setPassword(value);
                }}
                msgError="Incorrect password"
              />
            </Box>
          </Box>
        </Flex>

        <Box py="16px" px="16px">
          {password ? (
            <ButtonShadow
              width="100%"
              onClick={() => onTransfer(password, toAddress, amount)}
            >
              Confirm
            </ButtonShadow>
          ) : (
            <Button width="100%" variant="disable-primary">
              Confirm
            </Button>
          )}
        </Box>
      </Box>
    );
  }
);
