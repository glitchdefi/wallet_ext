import React from 'react';

import logo from '../../../../assets/img/gl_logo.png';
import { AccountTypes, RequestAuthorizeTab } from 'scripts/types';

import { AccountItem } from './AccountItem';

import { Box, Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { colors } from 'theme/colors';
import { ButtonShadow, Button } from 'app/components/Button';
import { CheckBox } from 'app/components/Form';
import { Empty } from 'app/components/Empty';

interface Props {
  request: RequestAuthorizeTab;
  accounts: {
    [key: string]: AccountTypes;
  };
  accountsSelected: string[];
  isCheckAll?: boolean;
  onCheckAll: () => void;
  onChange: (address: string) => void;
  onCancel: () => void;
  onNext: () => void;
}

const RequestStep1: React.FC<Props> = ({
  request: { origin },
  accounts,
  accountsSelected,
  isCheckAll,
  onCheckAll,
  onChange,
  onCancel,
  onNext,
}) => {
  return (
    <Flex
      flex={1}
      position="relative"
      flexDirection="column"
      background={colors.gray1}
    >
      <Box px="16px">
        <Box mb="8px" width={186} height={88}>
          <img src={logo} width="100%" height="100%" />
        </Box>
        <Text mb="24px" large bold>
          {origin} would like to connect to your wallet
        </Text>
        <Text mb="16px" color={colors.gray6}>
          Select account(s)
        </Text>
        {accounts && (
          <Box mb="16px">
            <CheckBox
              id="select-add-accounts"
              checked={isCheckAll}
              onChange={onCheckAll}
              labelComponent={
                <Text ml="8px" fontSize="12px">
                  Select all accounts
                </Text>
              }
            />
          </Box>
        )}
      </Box>

      <Box height="200px" overflowY="scroll">
        {accounts ? (
          Object.entries(accounts)
            .sort(([, a], [, b]) => {
              return b.whenCreated - a.whenCreated;
            })
            .map(([key, account]: [string, AccountTypes]) => {
              return (
                <AccountItem
                  key={key}
                  id={key}
                  checked={accountsSelected.includes(key)}
                  onChange={() => onChange(key)}
                  data={account}
                />
              );
            })
        ) : (
          <Flex height="100%" alignItems="center" justifyContent="center">
            <Empty message="No accounts found" />
          </Flex>
        )}
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
        {accountsSelected?.length ? (
          <ButtonShadow width="100%" onClick={onNext}>
            Next
          </ButtonShadow>
        ) : (
          <Button variant="disable-primary" width="100%">
            Next
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
export default RequestStep1;
