import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

import { messages } from '../messages';
import { Routes } from 'constants/routes';

import {
  useAccountActionHandlers,
  useAccounts,
  useWalletSlice,
} from 'state/wallet/hooks';
import { useApplicationSlice } from 'state/application/hooks';

import { Box, Flex } from 'app/components/Box';
import { Input, Label } from 'app/components/Form';
import { Button, ButtonShadow } from 'app/components/Button';

export const CreateAccountPanel: React.FC = () => {
  useApplicationSlice();
  useWalletSlice();

  const history = useHistory();
  const { t } = useTranslation();

  const { accounts } = useAccounts();
  const { onAddNewAccount } = useAccountActionHandlers();
  const totalAccount = Object.entries(accounts).length;

  const [name, setName] = useState<string>('');

  return (
    <Box mt="32px">
      <Label>{t(messages.accountName())}</Label>
      <Input
        value={name}
        placeholder={`${t(messages.account())} ${totalAccount + 1}`}
        onChange={(e) => setName(e.target.value)}
      />

      <Flex mt="294px" pb="16px">
        <Button
          mr="8px"
          width="50%"
          variant="cancel"
          onClick={() => history.push(Routes.home)}
        >
          {t(messages.cancel())}
        </Button>
        <ButtonShadow
          ml="8px"
          width="50%"
          onClick={() => {
            const accountName = name ? name : `Account ${totalAccount + 1}`;
            onAddNewAccount(accountName);
          }}
        >
          {t(messages.create())}
        </ButtonShadow>
      </Flex>
    </Box>
  );
};
