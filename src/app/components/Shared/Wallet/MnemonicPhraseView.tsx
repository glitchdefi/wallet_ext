import React from 'react';
import crypto from 'crypto';
import { useTranslation } from 'react-i18next';
import { colors } from 'theme/colors';

// Hooks
import { useMakeTextFile } from 'hooks/useMakeTextFile';
import { messages } from '../messages';

import { Flex } from 'app/components/Box';
import { Button, CopyButton } from 'app/components/Button';
import { Text } from 'app/components/Text';
import { DownloadIcon, CopyIcon } from 'app/components/Svg';
import MnemonicPhraseItem from './MnemonicPhraseItem';

interface Props {
  seed: string;
  label?: string;
  background?: string;
}

const MnemonicPhraseView: React.FC<Props> = ({ seed, label, background }) => {
  const { t } = useTranslation();
  const seedList: string[] = seed?.split(' ');
  const { downloadLink } = useMakeTextFile(seedList);
  const fileName = crypto.randomBytes(6).toString('hex');

  return (
    <>
      <Flex flexDirection="column" background={background || colors.gray1}>
        {label && (
          <Text
            mx="16px"
            mt="16px"
            mb="4px"
            fontSize="12px"
            color={colors.cyan5}
          >
            {label}
          </Text>
        )}
        <Flex
          py="6px"
          px="12px"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="center"
          minHeight="120px"
        >
          {seedList?.map((word: string, i) => (
            <MnemonicPhraseItem
              variants="selected"
              word={word}
              num={i}
              key={i}
            />
          ))}
        </Flex>
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
          value={seed}
        />
      </Flex>
    </>
  );
};

export default React.memo(MnemonicPhraseView);
