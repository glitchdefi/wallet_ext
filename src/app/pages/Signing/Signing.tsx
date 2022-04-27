import React, { useCallback, useState } from 'react';
import { PageLayout } from 'app/layouts';
import { useHistory } from 'react-router';
import isEmpty from 'lodash/isEmpty';
import styled from 'styled-components';

import { colors } from 'theme/colors';
import { truncateAddress } from 'utils/strings';
import { formatDollarAmount } from 'utils/number';
import { SigningRequest } from 'scripts/types';

import { useSigningReq } from 'contexts/SigningReqContext/hooks';
import { useApplication } from 'contexts/ApplicationContext/hooks';
import {
  approveSignRequest,
  cancelSignRequest,
  walletValidate,
} from 'scripts/ui/messaging';

import { GlitchLogo } from 'app/components/Image';
import { Box, Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { ButtonShadow, Button, CopyButton } from 'app/components/Button';
import { CloseIcon } from 'app/components/Svg';
import { NetworkBox } from 'app/components/Shared';
import { useToast } from 'hooks/useToast';
import { Label, PasswordInput } from 'app/components/Form';

const Signing: React.FC = () => {
  const history = useHistory();
  const { setAppLoading } = useApplication();
  const [password, setPassword] = useState<string>('');
  const [validPassword, setValidPassword] = useState<boolean>(true);
  const { toastError } = useToast();
  const { signRequests } = useSigningReq();
  const request = !isEmpty(signRequests) ? signRequests[0] : {};
  const { id, account, url } = request as SigningRequest;

  const onApprove = useCallback((): void => {
    setAppLoading(true);

    walletValidate({ password }).then((valid: boolean) => {
      if (valid) {
        approveSignRequest(id)
          .then(() => history.push('/'))
          .catch((error: Error) => toastError(null, error.message));
      }
      setValidPassword(valid);
      setAppLoading(false);
    });
  }, [history, id, password]);

  const onReject = useCallback((): void => {
    cancelSignRequest(id)
      .then(() => history.push('/'))
      .catch((error: Error) => toastError(null, error.message));
  }, [history, id]);

  return (
    <PageLayout>
      <Flex height="100%" flexDirection="column" p="16px">
        <Flex
          background={colors.gray2}
          p="16px"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text color={colors.gray7} fontWeight="600">
            Transaction approval
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
          <Box mb="8px">
            <NetworkBox showArrow={false} />
          </Box>

          <Box mb="32px">
            <Text color={colors.gray7} bold>
              {account?.name}
            </Text>
            <Flex alignItems="center">
              <Text fontSize="12px" color={colors.primary}>
                {truncateAddress(account?.address)}
              </Text>
              <CopyButton
                value={account?.address}
                p="2px"
                ml="6px"
                width="10px"
              />
            </Flex>
          </Box>

          <Text fontSize="20px" fontWeight="600" mb="16px" color={colors.gray9}>
            Allow {url} to spend your GLCH?
          </Text>

          <Text mb="16px" color={colors.gray6}>
            Do you trust this site? By granting this permission, you’re allowing{' '}
            {url} to spend your GLCH and automate transactions for you.
          </Text>

          <Box mb="16px">
            <Text mb="5px" fontSize="12px" color={colors.gray5}>
              Amount
            </Text>
            <Flex>
              <GlitchLogo width={24} height={24} />
              <Text ml="8px" color={colors.gray7}>
                - GLCH
              </Text>
              <Text ml="8px" color={colors.gray5}>
                {`~ ${formatDollarAmount(0)} USD`}
              </Text>
            </Flex>
          </Box>

          <Box mb="16px">
            <Text mb="5px" fontSize="12px" color={colors.gray5}>
              Network fee
            </Text>
            <Flex>
              <Text color={colors.gray7}>- GLCH</Text>
              <Text ml="8px" color={colors.gray5}>
                {`~ ${formatDollarAmount(0)} USD`}
              </Text>
            </Flex>
          </Box>

          <Box background={colors.gray2} mt="16px" p="16px">
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
        </ContentWrapper>

        <Flex background={colors.gray1} pb="16px" px="16px" alignItems="center">
          <Button variant="cancel" width="100%" mr="16px" onClick={onReject}>
            Reject
          </Button>
          {password ? (
            <ButtonShadow width="100%" onClick={onApprove}>
              Approve
            </ButtonShadow>
          ) : (
            <Button width="100%" variant="disable-primary">
              Approve
            </Button>
          )}
        </Flex>
      </Flex>
    </PageLayout>
  );
};

const ContentWrapper = styled(Flex)`
  height: 454px;

  @media only screen and (min-width: 768px) {
    height: 100%;
  }
`;

export default Signing;
