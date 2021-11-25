import React, { useEffect, useState } from 'react';
import TextareaAutosize from 'react-autosize-textarea/lib';
import styled from 'styled-components';
import { mnemonicValidate } from '@polkadot/util-crypto';

import { messages } from '../messages';
import { colors } from 'theme/colors';

import { Input, Label } from 'app/components/Form';
import { Box, Flex } from 'app/components/Box';
import { SnippetsIcon } from 'app/components/Svg';
import { Button, ButtonShadow } from 'app/components/Button';
import { Text } from 'app/components/Text';
import { useTranslation } from 'react-i18next';

interface Props {
  defaultSeedPhrase: string;
  onNextStep: (seedPhrase: string) => void;
}

export const EnterSeedPhraseStep: React.FC<Props> = React.memo(
  ({ defaultSeedPhrase, onNextStep }) => {
    const { t } = useTranslation();
    const [seedPhrase, setSeedPhrase] = useState<string>(defaultSeedPhrase);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
      const isValidMnemonic = mnemonicValidate(seedPhrase);
      setIsValid(isValidMnemonic);
    }, [seedPhrase]);

    return (
      <>
        <Box px="16px">
          <Label>{t(messages.mnemonic())}</Label>
          <InputWrapper isError={seedPhrase && !isValid} alignItems="center">
            <StyledInput
              hasBorder={false}
              id="seed-phrase-input"
              value={seedPhrase}
              as={TextareaAutosize}
              placeholder={t(messages.enterYourMnemonic())}
              onChange={(e: any) => setSeedPhrase(e.target.value?.trim())}
            />
            <Button
              p="0px"
              onClick={() => {
                var pasteText = document.getElementById('seed-phrase-input');
                pasteText.focus();
                document.execCommand('paste');

                pasteText.textContent &&
                  setSeedPhrase(
                    `${seedPhrase}${pasteText.textContent?.trim()}`
                  );
              }}
            >
              <SnippetsIcon width="15px" />
            </Button>
          </InputWrapper>
          {seedPhrase && !isValid && (
            <Text mt="2px" fontSize="12px" color={colors.error}>
              {t(messages.mnemonicContainInvalidWords())}
            </Text>
          )}
        </Box>

        <Box mt="32px" px="16px">
          {!isValid ? (
            <Button width="100%" variant="disable-primary">
              {t(messages.startRestore())}
            </Button>
          ) : (
            <ButtonShadow width="100%" onClick={() => onNextStep(seedPhrase)}>
              {t(messages.startRestore())}
            </ButtonShadow>
          )}
        </Box>
      </>
    );
  }
);

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
