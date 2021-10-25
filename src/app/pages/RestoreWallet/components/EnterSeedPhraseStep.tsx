import React, { useEffect, useState } from 'react';
import TextareaAutosize from 'react-autosize-textarea/lib';
import styled from 'styled-components';

import { messages } from '../messages';
import { colors } from 'theme/colors';

// Hooks
import {
  useWalletActionHandlers,
  useWalletSlice,
  useIsValidSeedPhrase,
} from 'state/wallet/hooks';
import { useApplicationSlice } from 'state/application/hooks';

import { Input, Label } from 'app/components/Form';
import { Box, Flex } from 'app/components/Box';
import { SnippetsIcon } from 'app/components/Svg';
import { Button, ButtonShadow } from 'app/components/Button';
import { Text } from 'app/components/Text';

interface Props {
  defaultSeedPhrase: string;
  onNextStep: (seedPhrase: string) => void;
}

export const EnterSeedPhraseStep: React.FC<Props> = ({
  defaultSeedPhrase,
  onNextStep,
}) => {
  useApplicationSlice();
  useWalletSlice();

  const [seedPhrase, setSeedPhrase] = useState<string>(defaultSeedPhrase);

  const { isValidSeedPhrase } = useIsValidSeedPhrase();
  const { onCheckIsValidSeedPhrase } = useWalletActionHandlers();

  useEffect(() => {
    if (seedPhrase) onCheckIsValidSeedPhrase(seedPhrase);
  }, [seedPhrase]);

  return (
    <>
      <Box>
        <Label>Mnemonic</Label>
        <InputWrapper
          isError={seedPhrase && !isValidSeedPhrase}
          alignItems="center"
        >
          <StyledInput
            value={seedPhrase}
            as={TextareaAutosize}
            placeholder="Enter your Mnemonic"
            onChange={(e: any) => setSeedPhrase(e.target.value?.trim())}
          />
          <Button
            p="0px"
            onClick={async () => {
              const text = await navigator.clipboard.readText();
            }}
          >
            <SnippetsIcon width="15px" />
          </Button>
        </InputWrapper>
        {seedPhrase && !isValidSeedPhrase && (
          <Text mt="2px" fontSize="12px" color={colors.error}>
            Mnemonic phrase contains an invalid word
          </Text>
        )}
      </Box>

      <Box mt="32px">
        {!isValidSeedPhrase ? (
          <Button width="100%" variant="disable-primary">
            Start restore
          </Button>
        ) : (
          <ButtonShadow width="100%" onClick={() => onNextStep(seedPhrase)}>
            Start restore
          </ButtonShadow>
        )}
      </Box>
    </>
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
