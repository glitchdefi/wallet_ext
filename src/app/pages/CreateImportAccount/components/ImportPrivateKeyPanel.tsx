import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import TextareaAutosize from 'react-autosize-textarea/lib';
import styled from 'styled-components';

import { messages } from '../messages';

import { useWallet } from 'contexts/WalletContext/hooks';

import { colors } from 'theme/colors';
import { isHexSeed, validateNameExist } from 'utils/strings';

import { Box, Flex } from 'app/components/Box';
import { Input, Label } from 'app/components/Form';
import { Button, ButtonShadow } from 'app/components/Button';
import { MessageBox } from 'app/components/MessageBox';
import { Text } from 'app/components/Text';
import { SnippetsIcon } from 'app/components/Svg';
import { privateKeyValidate } from 'scripts/ui/messaging';

export const ImportPrivateKeyPanel: React.FC = React.memo(() => {
  const history = useHistory();
  const { t } = useTranslation();
  const { walletCtx, onImportAccount } = useWallet();
  const { accounts } = walletCtx || {};
  const accountLength = Object.keys(accounts)?.length;

  const [name, setName] = useState<string>('');

  const [isNameExist, setIsNameExist] = useState<boolean>(false);

  const [validatePrivateKey, setValidatePrivateKey] = useState<{
    substrate: { isValid: boolean; isExist: boolean };
    evm: { isValid: boolean; isExist: boolean };
  }>({
    substrate: { isValid: false, isExist: false },
    evm: { isValid: false, isExist: false },
  });

  const [privateKey, setPrivateKey] = useState<{
    substrate: string;
    evm: string;
  }>({ substrate: '', evm: '' });

  const isSubstratePrivateKeyValid = privateKey.substrate
    ? validatePrivateKey.substrate.isValid
    : true;

  const isEVMPrivateKeyValid = privateKey.evm
    ? validatePrivateKey.evm.isValid
    : true;

  const isEnableImport =
    !isNameExist &&
    (privateKey.substrate && !privateKey.evm
      ? isSubstratePrivateKeyValid
      : !privateKey.substrate && privateKey.evm
      ? isEVMPrivateKeyValid
      : privateKey.substrate && privateKey.evm
      ? isSubstratePrivateKeyValid && isEVMPrivateKeyValid
      : false);

  useEffect(() => {
    setValidatePrivateKey((prev) => ({
      substrate: {
        ...prev.substrate,
        isValid: isHexSeed(privateKey.substrate),
      },
      evm: {
        ...prev.evm,
        isValid: isHexSeed(privateKey.evm),
      },
    }));
  }, [privateKey.evm, privateKey.substrate]);

  useEffect(() => {
    // Reset validate
    if (isNameExist) setIsNameExist(false);

    if (name) {
      // Validate name
      const isError = validateNameExist(accounts, name, '');
      isError && setIsNameExist(true);
    }
  }, [name]);

  const _onImportAccount = () => {
    const accountName = name ? name : `Account ${accountLength + 1}`;
    privateKeyValidate({
      substratePrivateKey: privateKey.substrate,
      evmPrivateKey: privateKey.evm,
    }).then(({ substrateExists, evmExists }) => {
      if (!substrateExists && !evmExists) {
        onImportAccount(
          {
            name: accountName,
            substratePrivateKey: privateKey.substrate,
            evmPrivateKey: privateKey.evm,
          },
          history
        );
      }
      setValidatePrivateKey((prev) => ({
        substrate: {
          ...prev.substrate,
          isExist:
            (privateKey.substrate && substrateExists) ||
            (privateKey.substrate && !privateKey.evm && evmExists)
              ? true
              : false,
        },
        evm: {
          ...prev.evm,
          isExist:
            (privateKey.evm && evmExists) ||
            (privateKey.evm && !privateKey.substrate && substrateExists)
              ? true
              : false,
        },
      }));
    });
  };

  return (
    <Flex flexDirection="column" height="455px" pt="32px" pb="16px">
      <Flex flexDirection="column" flex={1} overflowY="scroll">
        <MessageBox message={t(messages.importAccountWarning())} />

        <Box mt="24px">
          <Label>{t(messages.accountName())}</Label>
          <Input
            isError={isNameExist}
            value={name}
            placeholder={`${t(messages.account())} ${accountLength + 1}`}
            onChange={(e) => setName(e.target.value)}
          />
          {isNameExist && (
            <Text mt="2px" fontSize="12px" color={colors.error}>
              This account name already exists
            </Text>
          )}
        </Box>

        {/* Substrate */}
        <Box mt="24px">
          <Label>Substrate</Label>
          <InputWrapper
            isError={
              !isSubstratePrivateKeyValid ||
              validatePrivateKey.substrate.isExist
            }
            alignItems="center"
          >
            <StyledInput
              hasBorder={false}
              id="substrate-private-key-input"
              value={privateKey.substrate}
              as={TextareaAutosize}
              placeholder={t(messages.enterPrivateKeys())}
              onChange={(e: any) => {
                const { value } = e.target;
                setPrivateKey((prev) => ({ ...prev, substrate: value }));
                validatePrivateKey.substrate.isExist &&
                  setValidatePrivateKey((prev) => ({
                    ...prev,
                    substrate: {
                      ...prev.substrate,
                      isExist: false,
                    },
                  }));
              }}
            />
            <Button
              p="0px"
              pl="12px"
              onClick={() => {
                var pasteText = document.getElementById(
                  'substrate-private-key-input'
                );
                pasteText.focus();
                document.execCommand('paste');

                pasteText.textContent &&
                  setPrivateKey((prev) => ({
                    ...prev,
                    substrate: `${
                      privateKey.substrate
                    }${pasteText.textContent?.trim()}`,
                  }));
              }}
            >
              <SnippetsIcon width="15px" />
            </Button>
          </InputWrapper>
          {!isSubstratePrivateKeyValid && (
            <Text mt="2px" fontSize="12px" color={colors.error}>
              {t(messages.invalidPrivateKeys())}
            </Text>
          )}
          {validatePrivateKey.substrate.isExist && (
            <Text mt="2px" fontSize="12px" color={colors.error}>
              The account you're trying to import is a duplicate
            </Text>
          )}
        </Box>

        {/* EVM */}
        <Box mt="24px">
          <Label>EVM</Label>
          <InputWrapper
            isError={!isEVMPrivateKeyValid || validatePrivateKey.evm.isExist}
            alignItems="center"
          >
            <StyledInput
              hasBorder={false}
              id="evm-private-key-input"
              value={privateKey.evm}
              as={TextareaAutosize}
              placeholder={t(messages.enterPrivateKeys())}
              onChange={(e: any) => {
                const { value } = e.target;
                setPrivateKey((prev) => ({ ...prev, evm: value }));
                validatePrivateKey.evm.isExist &&
                  setValidatePrivateKey((prev) => ({
                    ...prev,
                    evm: {
                      ...prev.evm,
                      isExist: false,
                    },
                  }));
              }}
            />
            <Button
              p="0px"
              pl="12px"
              onClick={() => {
                var pasteText = document.getElementById(
                  'evm-private-key-input'
                );
                pasteText.focus();
                document.execCommand('paste');

                pasteText.textContent &&
                  setPrivateKey((prev) => ({
                    ...prev,
                    evm: `${privateKey.evm}${pasteText.textContent?.trim()}`,
                  }));
              }}
            >
              <SnippetsIcon width="15px" />
            </Button>
          </InputWrapper>
          {!isEVMPrivateKeyValid && (
            <Text mt="2px" fontSize="12px" color={colors.error}>
              {t(messages.invalidPrivateKeys())}
            </Text>
          )}
          {validatePrivateKey.evm.isExist && (
            <Text mt="2px" fontSize="12px" color={colors.error}>
              The account you're trying to import is a duplicate
            </Text>
          )}
        </Box>
      </Flex>

      <Flex mt="16px">
        <Button
          mr="8px"
          width="50%"
          variant="cancel"
          onClick={() => history.push('/')}
        >
          {t(messages.cancel())}
        </Button>
        {isEnableImport ? (
          <ButtonShadow ml="8px" width="50%" onClick={_onImportAccount}>
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
