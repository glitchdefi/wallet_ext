import React, { useEffect, useState } from 'react';
import { shuffle } from 'lodash';
import { colors } from 'theme/colors';

// Components
import { Box, Flex } from 'app/components/Box';
import { Button, ButtonShadow } from 'app/components/Button';
import { Text } from 'app/components/Text';
import { MnemonicPhraseItem } from '../MnemonicPhraseItem';
interface Props {
  seedPhrases: string;
  onSubmit: () => void;
}

export const VerifyMnemonicStep: React.FC<Props> = ({
  seedPhrases,
  onSubmit,
}) => {
  const [seedPhrasesList, setSeedPhrasesList] = useState<string[]>([]);
  const [confirmSeedPhraseList, setConfirmSeedPhraseList] = useState<string[]>(
    []
  );
  const isValid =
    JSON.stringify(seedPhrases?.split(' ')) ===
    JSON.stringify(confirmSeedPhraseList);

  useEffect(() => {
    setSeedPhrasesList(shuffle(seedPhrases?.split(' ')));
  }, []);

  return (
    <>
      <Flex
        py="6px"
        px="12px"
        flexWrap="wrap"
        justifyContent="center"
        background={colors.gray1}
      >
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
      </Flex>
      {!isValid && confirmSeedPhraseList?.length >= 12 && (
        <Text fontSize="12px" mt="4px" color={colors.error} textAlign="center">
          Invalid Mnemonic phrase. Please check again
        </Text>
      )}

      <Flex
        mt="32px"
        py="6px"
        px="12px"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
        background={colors.gray1}
        minHeight="120px"
      >
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
      </Flex>

      <Box pt="48px" pb="24px">
        {isValid ? (
          <ButtonShadow width="100%" onClick={onSubmit}>
            Confirm
          </ButtonShadow>
        ) : (
          <Button variant="disable-primary" width="100%">
            Confirm
          </Button>
        )}
      </Box>
    </>
  );
};
