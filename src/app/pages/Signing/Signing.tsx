import React, { useCallback } from 'react';
import { PageLayout } from 'app/layouts';
import isEmpty from 'lodash/isEmpty';
import { useHistory } from 'react-router';

import { colors } from 'theme/colors';
import { truncateAddress } from 'utils/strings';
import { formatDollarAmount } from 'utils/number';
import { SigningRequest } from 'scripts/types';

import { useSigningReq } from 'contexts/SigningReqContext/hooks';
import { approveSignRequest, cancelSignRequest } from 'scripts/ui/messaging';

import { GlitchLogo } from 'app/components/Image';
import { Box, Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { ButtonShadow, Button, CopyButton } from 'app/components/Button';
import { CloseIcon } from 'app/components/Svg';
import { NetworkBox } from 'app/components/Shared';
import { useToast } from 'hooks/useToast';

const Signing: React.FC = () => {
  const history = useHistory();
  const { toastError } = useToast();
  const { signRequests } = useSigningReq();
  const request = !isEmpty(signRequests) ? signRequests[0] : {};
  const { id, account, url } = request as SigningRequest;

  const onApprove = useCallback((): void => {
    approveSignRequest(id)
      .then(() => history.push('/'))
      .catch((error: Error) => toastError(null, error.message));
  }, [history, id]);

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

        <Flex
          height="454px"
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
        </Flex>

        <Flex background={colors.gray1} pb="16px" px="16px" alignItems="center">
          <Button variant="cancel" width="100%" mr="16px" onClick={onReject}>
            Reject
          </Button>
          <ButtonShadow width="100%" onClick={onApprove}>
            Approve
          </ButtonShadow>
        </Flex>
      </Flex>
    </PageLayout>
  );
};

export default Signing;
