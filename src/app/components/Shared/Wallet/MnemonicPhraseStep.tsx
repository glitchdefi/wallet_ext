import React from 'react';
import crypto from 'crypto';
import { useTranslation } from 'react-i18next';
import { colors } from 'theme/colors';

// Hooks
import { useMakeTextFile } from 'hooks/useMakeTextFile';
import { messages } from '../messages';

import { Flex, Box } from 'app/components/Box';
import { MessageBox } from 'app/components/MessageBox';
import { Button, ButtonShadow, CopyButton } from 'app/components/Button';
import { Text } from 'app/components/Text';
import { DownloadIcon, CopyIcon } from 'app/components/Svg';
import MnemonicPhraseItem from './MnemonicPhraseItem';

interface Props {
  seedPhrases: string;
  onNextStep: () => void;
}

const MnemonicPhraseStep: React.FC<Props> = ({ seedPhrases, onNextStep }) => {
  const { t } = useTranslation();
  const seedPhrasesList: string[] = seedPhrases?.split(' ');
  const { downloadLink } = useMakeTextFile(seedPhrasesList);
  const fileName = crypto.randomBytes(6).toString('hex');

  return (
    <Flex flex={1} flexDirection="column" px="16px">
      <Flex
        py="6px"
        px="12px"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
        background={colors.gray1}
        minHeight="120px"
      >
        {seedPhrasesList?.map((word: string, i) => (
          <MnemonicPhraseItem variants="selected" word={word} num={i} key={i} />
        ))}
      </Flex>

      <Flex mt="16px" justifyContent="space-around">
        <Button p="0px">
          <Flex>
            <DownloadIcon width="16px" />
            <Text
              as="a"
              download={`${fileName}.txt`}
              href={downloadLink}
              ml="8px"
              color={colors.primary}
              bold
            >
              {t(messages.download())}
            </Text>
          </Flex>
        </Button>

        <CopyButton
          id="copy-mnemonic"
          component={
            <Flex>
              <CopyIcon width="12px" />
              <Text ml="8px" color={colors.primary} bold>
                {t(messages.copy())}
              </Text>
            </Flex>
          }
          value={seedPhrases}
        />
      </Flex>

      <MessageBox mt="24px" message={t(messages.neverShareYourMnemonic())} />

      <Box mt="auto">
        <ButtonShadow width="100%" onClick={onNextStep}>
          {t(messages.iWroteDownMnemonic())}
        </ButtonShadow>
      </Box>
    </Flex>
  );
};

export default MnemonicPhraseStep;
