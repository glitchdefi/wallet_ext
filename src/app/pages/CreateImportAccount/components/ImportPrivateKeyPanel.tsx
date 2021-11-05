import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import TextareaAutosize from 'react-autosize-textarea/lib';
import styled from 'styled-components';

import { messages } from '../messages';
import { Routes } from 'constants/routes';

import {
  useAccountActionHandlers,
  useAccounts,
  useIsInvalidPrivateKey,
  useWalletSlice,
} from 'state/wallet/hooks';
import { useApplicationSlice } from 'state/application/hooks';

import { colors } from 'theme/colors';

import { Box, Flex } from 'app/components/Box';
import { Input, Label } from 'app/components/Form';
import { Button, ButtonShadow } from 'app/components/Button';
import { MessageBox } from 'app/components/MessageBox';
import { Text } from 'app/components/Text';
import { SnippetsIcon } from 'app/components/Svg';

export const ImportPrivateKeyPanel: React.FC = () => {
  useApplicationSlice();
  useWalletSlice();

  const history = useHistory();
  const { t } = useTranslation();

  const { accounts } = useAccounts();
  const { isInvalidPrivateKey } = useIsInvalidPrivateKey();
  const { onClearIsInvalidPrivateKey, onImportAccount } =
    useAccountActionHandlers();
  const totalAccount = Object.entries(accounts).length;

  const [name, setName] = useState<string>('');
  const [privateKey, setPrivateKey] = useState<string>('');

  return (
    <Box mt="32px">
      <MessageBox message={t(messages.importAccountWarning())} />

      <Box mt="24px">
        <Label>{t(messages.accountName())}</Label>
        <Input
          value={name}
          placeholder={`${t(messages.account())} ${totalAccount + 1}`}
          onChange={(e) => setName(e.target.value)}
        />
      </Box>

      <Box mt="24px">
        <Label>{t(messages.privateKeys())}</Label>
        <InputWrapper isError={isInvalidPrivateKey} alignItems="center">
          <StyledInput
            hasBorder={false}
            id="private-key-input"
            value={privateKey}
            as={TextareaAutosize}
            placeholder={t(messages.enterPrivateKeys())}
            onChange={(e: any) => {
              const { value } = e.target;
              !value && isInvalidPrivateKey && onClearIsInvalidPrivateKey();
              setPrivateKey(value);
            }}
          />
          <Button
            p="0px"
            pl="12px"
            onClick={() => {
              var pasteText = document.getElementById('private-key-input');
              pasteText.focus();
              document.execCommand('paste');

              pasteText.textContent &&
                setPrivateKey(`${privateKey}${pasteText.textContent?.trim()}`);
            }}
          >
            <SnippetsIcon width="15px" />
          </Button>
        </InputWrapper>
        {isInvalidPrivateKey && (
          <Text mt="2px" fontSize="12px" color={colors.error}>
            {t(messages.invalidPrivateKeys())}
          </Text>
        )}
      </Box>

      <Flex mt="89px" pb="16px">
        <Button
          mr="8px"
          width="50%"
          variant="cancel"
          onClick={() => history.push(Routes.home)}
        >
          {t(messages.cancel())}
        </Button>
        {privateKey ? (
          <ButtonShadow
            ml="8px"
            width="50%"
            onClick={() => {
              const accountName = name ? name : `Account ${totalAccount + 1}`;
              onImportAccount(accountName, privateKey);
            }}
          >
            {t(messages.import())}
          </ButtonShadow>
        ) : (
          <Button width="50%" variant="disable-primary">
            {t(messages.import())}
          </Button>
        )}
      </Flex>
    </Box>
  );
};

const InputWrapper = styled(Flex)<{ isError?: boolean }>`
  border: 1px solid ${colors.gray8};
  transition: all 0.5s;
  padding: 8px 12px;
  border-color: ${({ isError }) => isError && colors.error};

  &:focus-within {
    border: 1px solid ${colors.primary};
    border-color: ${({ isError }) => isError && colors.error};
  }
`;

const StyledInput = styled(Input)`
  width: 100%;
  border: none;
  padding: 0px;
  resize: none;
`;
