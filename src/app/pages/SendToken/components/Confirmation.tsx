import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { colors } from 'theme/colors';
import { formatDollarAmount } from 'utils/number';
import { useTokenPrice } from 'contexts/TokenPriceContext/hooks';
import { transfer, walletValidate } from 'scripts/ui/messaging';
import { useToast } from 'hooks/useToast';
import { Routes } from 'constants/routes';
import { useWallet } from 'contexts/WalletContext/hooks';
import { useApplication } from 'contexts/ApplicationContext/hooks';

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
  isTransferAll?: boolean;
}

export const Confirmation: React.FC<Props> = React.memo(
  ({ amount, estimateFee, toAddress, isTransferAll }) => {
    const history = useHistory();
    const { setAppLoading } = useApplication();
    const { walletCtx, onClaimEvmBalance } = useWallet();
    const { toastSuccess, toastError } = useToast();
    const [password, setPassword] = useState<string>('');
    const [validPassword, setValidPassword] = useState<boolean>(true);

    const { selectedAddress } = walletCtx || {};
    const { tokenPrice } = useTokenPrice();

    const onConfirm = () => {
      setAppLoading(true);

      walletValidate({ password }).then((valid) => {
        if (valid) {
          transfer({ toAddress, amount }).then((res) => {
            const { success, message } = res || {};
            if (success) {
              if (isTransferAll) {
                onClaimEvmBalance({ address: selectedAddress });
              }
              toastSuccess(
                null,
                'Sent has been successfully! It might take some time for changes to take affect.'
              );
            } else {
              toastError(null, message);
            }
            history.push(Routes.tokenDetails);
            setAppLoading(false);
          });
        } else {
          setAppLoading(false);
        }
        setValidPassword(valid);
      });
    };

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
                <Text as="span" ml="4px" fontSize="12px" color={colors.blue6}>
                  (Substrate address)
                </Text>
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
                  {`~ ${formatDollarAmount(tokenPrice * amount)} USD`}
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
                    parseFloat(estimateFee) * tokenPrice
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
                isError={!validPassword}
                value={password}
                placeholder="Password"
                onChange={(e) => {
                  const { value } = e.target;
                  !validPassword && setValidPassword(true);
                  setPassword(value);
                }}
                msgError="Incorrect password"
              />
            </Box>
          </Box>
        </Flex>

        <Box py="16px" px="16px">
          {password ? (
            <ButtonShadow width="100%" onClick={onConfirm}>
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
