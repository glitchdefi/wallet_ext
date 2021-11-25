import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { shuffle } from 'lodash';
import { colors } from 'theme/colors';
import styled from 'styled-components';

import { messages } from '../messages';

// Components
import { Box, Flex } from 'app/components/Box';
import { Button, ButtonShadow } from 'app/components/Button';
import { Text } from 'app/components/Text';
import MnemonicPhraseItem from './MnemonicPhraseItem';

interface Props {
  seedPhrases: string;
  onSubmit?: () => void;
}

const VerifyMnemonicStep: React.FC<Props> = React.memo(
  ({ seedPhrases, onSubmit }) => {
    const { t } = useTranslation();
    const [seedPhrasesList, setSeedPhrasesList] = useState<string[]>([]);
    const [confirmSeedPhraseList, setConfirmSeedPhraseList] = useState<
      string[]
    >([]);
    const isValid =
      JSON.stringify(seedPhrases?.split(' ')) ===
      JSON.stringify(confirmSeedPhraseList);

    useEffect(() => {
      setSeedPhrasesList(shuffle(seedPhrases?.split(' ')));
    }, []);

    return (
      <Flex flexDirection="column" flex={1}>
        <Box height="315px" px="16px" overflowY="scroll">
          <MpWrapper>
            {confirmSeedPhraseList?.map((word: string, i) => (
              <MnemonicPhraseItem
                variants="selected"
                word={word}
                num={i + 1}
                key={i}
                onClick={() => {
                  const newList = confirmSeedPhraseList.filter(
                    (cWord) => cWord !== word
                  );
                  setConfirmSeedPhraseList(newList);
                }}
              />
            ))}
          </MpWrapper>
          {!isValid && confirmSeedPhraseList?.length >= 12 && (
            <Text
              fontSize="12px"
              mt="4px"
              color={colors.error}
              textAlign="center"
            >
              {t(messages.invalidMnemonicPhrase())}
            </Text>
          )}

          <MpWrapper mt="32px">
            {seedPhrasesList?.map((word: string, i) => (
              <MnemonicPhraseItem
                variants={
                  confirmSeedPhraseList.includes(word) ? 'disable' : 'default'
                }
                word={word}
                num={i}
                key={i}
                onClick={() => {
                  if (!confirmSeedPhraseList.includes(word))
                    setConfirmSeedPhraseList([...confirmSeedPhraseList, word]);
                }}
              />
            ))}
          </MpWrapper>
        </Box>

        <Box mt="auto" pt="24px" px="16px">
          {isValid ? (
            <ButtonShadow width="100%" onClick={onSubmit}>
              {t(messages.confirm())}
            </ButtonShadow>
          ) : (
            <Button variant="disable-primary" width="100%">
              {t(messages.confirm())}
            </Button>
          )}
        </Box>
      </Flex>
    );
  }
);

const MpWrapper = styled(Flex)`
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 12px;
  padding-right: 12px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  min-height: 120px;
  background-color: ${colors.gray1};
`;

export default VerifyMnemonicStep;
