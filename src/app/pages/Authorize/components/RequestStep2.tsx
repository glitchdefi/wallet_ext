import React from 'react';
import styled from 'styled-components';
import { AccountTypes, RequestAuthorizeTab } from 'scripts/types';

import { AccountItem } from './AccountItem';

import { Box, Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { colors } from 'theme/colors';
import { ButtonShadow, Button } from 'app/components/Button';
import { CheckIcon } from 'app/components/Svg';

interface Props {
  request: RequestAuthorizeTab;
  accountsSelected: string[];
  accounts: {
    [key: string]: AccountTypes;
  };
  onBack: () => void;
  onConnect: () => void;
}

const RequestStep2: React.FC<Props> = ({
  request: { origin },
  accountsSelected,
  accounts,
  onBack,
  onConnect,
}) => {
  return (
    <Flex
      flex={1}
      position="relative"
      flexDirection="column"
      background={colors.gray1}
    >
      <Box pt="16px" px="16px">
        <Title mb="24px" large>
          <span>{origin}</span> would like to connect to your accounts:
        </Title>
        <Box height="1px" width="100%" background={colors.gray8} />
      </Box>

      <Box height="160px" my="16px" overflowY="scroll">
        {Object.entries(accounts)
          .filter(([key]) => {
            return accountsSelected.includes(key);
          })
          .map(([key, account]: [string, AccountTypes]) => {
            return (
              <AccountItem
                hasChecked={false}
                py="8px"
                key={key}
                id={key}
                checked
                data={account}
              />
            );
          })}
      </Box>

      <Box mb="10px" mx="16px" height="1px" background={colors.gray8} />

      <Box px="16px">
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
        <Button variant="cancel" width="100%" mr="16px" onClick={onBack}>
          Back
        </Button>
        <ButtonShadow width="100%" onClick={onConnect}>
          Connect
        </ButtonShadow>
      </Flex>
    </Flex>
  );
};

const Title = styled(Text)`
  span {
    font-weight: 600;
  }
`;

export default RequestStep2;
