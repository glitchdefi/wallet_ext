import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

import { colors } from 'theme/colors';

import { useApplication } from 'contexts/ApplicationContext/hooks';
import { useTokenPrice } from 'contexts/TokenPriceContext/hooks';
import {
  approveEvmRequest,
  cancelSignRequest,
  walletValidate,
} from 'scripts/ui/messaging';

import { GlitchLogo, Image } from 'app/components/Image';
import { Box, Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { ButtonShadow, Button, CopyButton } from 'app/components/Button';
import { CloseIcon } from 'app/components/Svg';
import { NetworkBox } from 'app/components/Shared';
import { useToast } from 'hooks/useToast';
import { Label, PasswordInput } from 'app/components/Form';
import { GlitchNetwork } from 'constants/networks';
import { useAccount, useWallet } from 'contexts/WalletContext/hooks';
import { formatNumberDownRoundWithExtractMax } from 'utils/number';
import { fromBase } from 'utils/strings';
import TokenSigs from 'scripts/providers/ethereum/libs/transaction/lists/tokenSigs';

import tetherLogo from '../../../../assets/img/tether-logo.png';
import { formatFloatingPointValue } from 'utils/number-formatter';

interface Props {
  request: any;
}

export const EvmApprovalRequest: React.FC<Props> = ({ request }) => {
  const history = useHistory();
  const { setAppLoading } = useApplication();
  const { toastError } = useToast();
  const { walletCtx } = useWallet();
  const { accounts } = walletCtx || {};

  const [password, setPassword] = useState<string>('');
  const [validPassword, setValidPassword] = useState<boolean>(true);

  const {
    id,
    account,
    url,
    request: {
      payload: {
        genesisHash,
        data,
        decodedData,
        value: tokenValue,
        estimatedFee,
      },
    },
  } = request;

  const isApproval =
    decodedData?.decoded && data?.startsWith(TokenSigs.approve);

  const amount = fromBase(tokenValue || '0x0', 18);

  const onApprove = useCallback((): void => {
    setAppLoading(true);

    walletValidate({ password }).then((valid: boolean) => {
      if (valid) {
        approveEvmRequest(id)
          .then(() => history.push('/'))
          .catch((error: Error) => toastError(null, error.message))
          .finally(() => setAppLoading(false));
      } else {
        setValidPassword(valid);
        setAppLoading(false);
      }
    });
  }, [history, id, password]);

  const onReject = useCallback((): void => {
    cancelSignRequest(id)
      .then(() => history.push('/'))
      .catch((error: Error) => toastError(null, error.message));
  }, [history, id]);

  return (
    <Flex height="100%" flexDirection="column" p="16px">
      <Flex
        background={colors.gray2}
        p="16px"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text color={colors.gray7} fontWeight="600">
          Verify Transaction
        </Text>

        <Button p="0px" onClick={onReject}>
          <CloseIcon width="13px" fill={colors.gray7} />
        </Button>
      </Flex>

      <ContentWrapper
        position="relative"
        flexDirection="column"
        background={colors.gray1}
        overflow="auto"
        p="16px"
      >
        {genesisHash && (
          <Box mb="8px">
            <NetworkBox
              showArrow={false}
              customName={
                GlitchNetwork.find((n) => n.genesisHash === genesisHash)?.label
              }
            />
          </Box>
        )}

        <Box mb="32px">
          <Text color={colors.gray7} bold>
            {account?.name}
          </Text>
          <Flex alignItems="center">
            <Text fontSize="12px" color={colors.primary}>
              {accounts[account?.address]?.evmAddress}
            </Text>
            <CopyButton
              value={accounts[account?.address]?.evmAddress}
              p="2px"
              ml="6px"
              width="10px"
            />
          </Flex>
        </Box>

        {isApproval && (
          <Text fontSize="20px" fontWeight="600" mb="16px" color={colors.gray9}>
            Allow {url} to spend your USDT?
          </Text>
        )}

        {isApproval && (
          <Text mb="16px" color={colors.gray6}>
            Do you trust this site? By granting this permission, you’re allowing{' '}
            {url} to spend your USDT.
          </Text>
        )}

        {!isApproval && (
          <Box mb="16px">
            <Text mb="5px" fontSize="12px" color={colors.gray5}>
              Amount
            </Text>
            <Flex>
              <GlitchLogo width={24} height={24} />
              <Text ml="8px" color={colors.gray7}>
                {formatFloatingPointValue(amount).value} GLCH
              </Text>
            </Flex>
          </Box>
        )}

        <Box mb="16px">
          <Text mb="5px" fontSize="12px" color={colors.gray5}>
            Estimated fee
          </Text>
          <Flex>
            <GlitchLogo width={24} height={24} />
            <Text ml="8px" color={colors.gray7}>
              {formatFloatingPointValue(estimatedFee).value} GLCH
            </Text>
          </Flex>
        </Box>

        <Box mb="16px">
          <Text mb="5px" fontSize="12px" color={colors.gray5}>
            Data
          </Text>
          <Box>
            <Text color={colors.gray7}>{data}</Text>
          </Box>
        </Box>

        <Box background={colors.gray2} mt="16px" p="16px">
          <Text fontSize="12px" color={colors.cyan5}>
            Please enter the Glitch password to send your transaction
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
      </ContentWrapper>

      <Flex background={colors.gray1} pb="16px" px="16px" alignItems="center">
        <Button variant="cancel" width="100%" mr="16px" onClick={onReject}>
          Reject
        </Button>
        {password ? (
          <ButtonShadow width="100%" onClick={onApprove}>
            Send
          </ButtonShadow>
        ) : (
          <Button width="100%" variant="disable-primary">
            Send
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

const ContentWrapper = styled(Flex)`
  height: 447px;

  @media only screen and (min-width: 768px) {
    height: 100%;
  }
`;