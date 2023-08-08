import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

import { colors } from 'theme/colors';

import { useApplication } from 'contexts/ApplicationContext/hooks';
import {
  cancelSignRequest,
  evmSignTypedData,
  walletValidate,
} from 'scripts/ui/messaging';

import { Box, Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { ButtonShadow, Button, CopyButton } from 'app/components/Button';
import { CloseIcon } from 'app/components/Svg';
import { useToast } from 'hooks/useToast';
import { Label, PasswordInput } from 'app/components/Form';
import { useWallet } from 'contexts/WalletContext/hooks';

interface Props {
  request: any;
}

export const EvmSignTypedData: React.FC<Props> = ({ request }) => {
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
    request: {
      payload: { typedDataJSON },
    },
  } = request;

  const {
    message: { spender, value, deadline, nonce },
  } = typedDataJSON || {};

  const onSign = useCallback((): void => {
    setAppLoading(true);

    walletValidate({ password }).then((valid: boolean) => {
      if (valid) {
        evmSignTypedData(id)
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
          Signature Request
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

        <Text mb="16px" color={colors.gray6}>
          Only sign this message if you fully understand the content and trust
          the requesting site.
        </Text>

        <Box mb="6px">
          <Text mb="3px" fontSize="12px" color={colors.gray5}>
            Owner
          </Text>
          <Text color={colors.gray7}>{account?.name}</Text>
        </Box>

        <Box mb="6px">
          <Text mb="3px" fontSize="12px" color={colors.gray5}>
            Spender
          </Text>
          <Text color={colors.gray7}>{spender}</Text>
        </Box>

        <Box mb="6px">
          <Text mb="3px" fontSize="12px" color={colors.gray5}>
            Value
          </Text>
          <Text color={colors.gray7}>{value}</Text>
        </Box>

        <Box mb="6px">
          <Text mb="3px" fontSize="12px" color={colors.gray5}>
            Nonce
          </Text>
          <Text color={colors.gray7}>{nonce}</Text>
        </Box>

        <Box mb="6px">
          <Text mb="3px" fontSize="12px" color={colors.gray5}>
            Deadline
          </Text>
          <Text color={colors.gray7}>{deadline}</Text>
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
          <ButtonShadow width="100%" onClick={onSign}>
            Sign
          </ButtonShadow>
        ) : (
          <Button width="100%" variant="disable-primary">
            Sign
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
