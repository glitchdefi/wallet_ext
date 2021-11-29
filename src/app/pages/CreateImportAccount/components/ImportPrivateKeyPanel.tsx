import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import TextareaAutosize from 'react-autosize-textarea/lib';
import styled from 'styled-components';

import { messages } from '../messages';
import { Routes } from 'constants/routes';

import { useAccountActionHandlers, useAccounts } from 'state/wallet/hooks';

import { colors } from 'theme/colors';
import { privateKeyValidate } from 'utils/strings';

import { Box, Flex } from 'app/components/Box';
import { Input, Label } from 'app/components/Form';
import { Button, ButtonShadow } from 'app/components/Button';
import { MessageBox } from 'app/components/MessageBox';
import { Text } from 'app/components/Text';
import { SnippetsIcon } from 'app/components/Svg';

export const ImportPrivateKeyPanel: React.FC = React.memo(() => {
  const history = useHistory();
  const { t } = useTranslation();

  const { accountLength } = useAccounts();
  const { onImportAccount } = useAccountActionHandlers();

  const [name, setName] = useState<string>('');
  const [privateKey, setPrivateKey] = useState<string>('');
  const [isValidPK, setIsValidPK] = useState<boolean>(false);
  const isError = privateKey && !isValidPK;
  const isEnableImport = privateKey && isValidPK;

  useEffect(() => {
    setIsValidPK(privateKeyValidate(privateKey));
  }, [privateKey]);

  return (
    <Flex flexDirection="column" height="455px" pt="32px" pb="16px">
      <Flex flexDirection="column" flex={1} overflowY="scroll">
        <MessageBox message={t(messages.importAccountWarning())} />

        <Box mt="24px">
          <Label>{t(messages.accountName())}</Label>
          <Input
            value={name}
            placeholder={`${t(messages.account())} ${accountLength + 1}`}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>

        <Box mt="24px">
          <Label>{t(messages.privateKeys())}</Label>
          <InputWrapper isError={isError} alignItems="center">
            <StyledInput
              hasBorder={false}
              id="private-key-input"
              value={privateKey}
              as={TextareaAutosize}
              placeholder={t(messages.enterPrivateKeys())}
              onChange={(e: any) => {
                const { value } = e.target;
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
                  setPrivateKey(
                    `${privateKey}${pasteText.textContent?.trim()}`
                  );
              }}
            >
              <SnippetsIcon width="15px" />
            </Button>
          </InputWrapper>
          {isError && (
            <Text mt="2px" fontSize="12px" color={colors.error}>
              {t(messages.invalidPrivateKeys())}
            </Text>
          )}
        </Box>
      </Flex>

      <Flex mt="16px">
        <Button
          mr="8px"
          width="50%"
          variant="cancel"
          onClick={() => history.push(Routes.home)}
        >
          {t(messages.cancel())}
        </Button>
        {isEnableImport ? (
          <ButtonShadow
            ml="8px"
            width="50%"
            onClick={() => {
              const accountName = name ? name : `Account ${accountLength + 1}`;
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
    </Flex>
  );
});

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
