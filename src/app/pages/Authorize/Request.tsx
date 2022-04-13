import React, { useCallback } from 'react';
import { useHistory } from 'react-router';

import logo from '../../../assets/img/gl_logo.png';
import { RequestAuthorizeTab } from 'scripts/types';

import { useToast } from 'hooks/useToast';
import { approveAuthRequest, rejectAuthRequest } from 'scripts/ui/messaging';

import { Box, Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { colors } from 'theme/colors';
import { ButtonShadow, Button } from 'app/components/Button';
import { CheckIcon, CloseIcon } from 'app/components/Svg';

interface Props {
  authId: string;
  request: RequestAuthorizeTab;
  url: string;
}

const Request: React.FC<Props> = ({ authId, request: { origin }, url }) => {
  const history = useHistory();
  const { toastError } = useToast();

  const onConnect = useCallback((): void => {
    approveAuthRequest(authId)
      .then(() => history.push('/'))
      .catch((error: Error) => toastError(null, error.message));
  }, []);

  const onCancel = useCallback((): void => {
    rejectAuthRequest(authId)
      .then(() => history.push('/'))
      .catch((error: Error) => toastError(null, error.message));
  }, []);

  return (
    <Flex height="100%" flexDirection="column" p="16px">
      <Flex
        background={colors.gray2}
        p="16px"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text color={colors.gray7} fontWeight="600">
          Connect Wallet
        </Text>

        <Button p="0px" onClick={onCancel}>
          <CloseIcon width="13px" fill={colors.gray7} />
        </Button>
      </Flex>

      <Flex
        flex={1}
        position="relative"
        flexDirection="column"
        background={colors.gray1}
        p="16px"
      >
        <Box mb="8px" width={186} height={88}>
          <img src={logo} width="100%" height="100%" />
        </Box>
        <Text mb="32px" color={colors.primary} large bold>
          {origin} would like to connect to your wallet
        </Text>
        <Box>
          <Text mb="16px" color={colors.gray6}>
            This site would like to:
          </Text>
          <Flex alignItems="center" mb="16px">
            <CheckIcon mr="8px" color={colors.primary} width="12px" />
            <Text color={colors.gray9} letterSpacing="-0.5px">
              View your wallet balance & activity
            </Text>
          </Flex>
          <Flex alignItems="center">
            <CheckIcon mr="8px" color={colors.primary} width="12px" />
            <Text color={colors.gray9} letterSpacing="-0.5px">
              Request approval for transactions
            </Text>
          </Flex>
        </Box>

        <Flex
          position="absolute"
          bottom="16px"
          left="16px"
          right="16px"
          alignItems="center"
        >
          <Button variant="cancel" width="100%" mr="16px" onClick={onCancel}>
            Cancel
          </Button>
          <ButtonShadow width="100%" onClick={onConnect}>
            Connect
          </ButtonShadow>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Request;
