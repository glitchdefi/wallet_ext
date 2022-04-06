import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

import { messages } from '../messages';
import { Routes } from 'constants/routes';
import { validateNameExist } from 'utils/strings';
import { colors } from 'theme/colors';
import { useWallet } from 'contexts/WalletContext/hooks';

import { Flex } from 'app/components/Box';
import { Input, Label } from 'app/components/Form';
import { Button, ButtonShadow } from 'app/components/Button';
import { Text } from 'app/components/Text';

export const CreateAccountPanel: React.FC = React.memo(() => {
  const history = useHistory();
  const { t } = useTranslation();
  const { walletCtx, onCreateAccount } = useWallet();
  const { accounts } = walletCtx || {};
  const accountLength = Object.keys(accounts)?.length;

  const [name, setName] = useState<string>('');
  const [isNameExist, setIsNameExist] = useState<boolean>(false);

  useEffect(() => {
    // Reset validate
    if (isNameExist) setIsNameExist(false);

    if (name) {
      // Validate name
      const isError = validateNameExist(accounts, name, '');
      isError && setIsNameExist(true);
    }
  }, [name]);

  return (
    <Flex flex={1} flexDirection="column" mt="32px">
      <Flex flex={1} flexDirection="column">
        <Label>{t(messages.accountName())}</Label>
        <Input
          isError={isNameExist}
          value={name}
          placeholder={`${t(messages.account())} ${accountLength + 1}`}
          onChange={(e) => setName(e.target.value)}
        />
        {isNameExist && (
          <Text mt="2px" color={colors.error}>
            This account name already exists
          </Text>
        )}
      </Flex>

      <Flex py="16px">
        <Button
          mr="8px"
          width="50%"
          variant="cancel"
          onClick={() => history.push(Routes.home)}
        >
          {t(messages.cancel())}
        </Button>
        {isNameExist ? (
          <Button ml="8px" width="50%" variant="disable-primary">
            {t(messages.create())}
          </Button>
        ) : (
          <ButtonShadow
            ml="8px"
            width="50%"
            onClick={() => {
              const accountName = name ? name : `Account ${accountLength + 1}`;
              onCreateAccount({ name: accountName }, history);
            }}
          >
            {t(messages.create())}
          </ButtonShadow>
        )}
      </Flex>
    </Flex>
  );
});
