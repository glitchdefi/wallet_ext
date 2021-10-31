import React from 'react';
import crypto from 'crypto';

import { useMakeTextFile } from 'hooks/useMakeTextFile';
import { colors } from 'theme/colors';

import { Flex, Box } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { Button, ButtonShadow, CopyButton } from 'app/components/Button';
import { MessageBox } from 'app/components/MessageBox';
import { CopyIcon, DownloadIcon } from 'app/components/Svg';
import { MnemonicPhraseItem } from '../../CreateWallet/components/MnemonicPhraseItem';

interface Props {
  seedPhrases: string;
  onConfirm: () => void;
}

export const ViewMnemonicPhrase: React.FC<Props> = ({
  seedPhrases,
  onConfirm,
}) => {
  const seedPhrasesList: string[] = seedPhrases?.split(' ');
  const { downloadLink } = useMakeTextFile(seedPhrasesList);
  const fileName = crypto.randomBytes(6).toString('hex');

  return (
    <Flex
      flexDirection="column"
      pt="32px"
      pb="24px"
      px="32px"
      minHeight="511px"
    >
      <Flex>
        <Flex>
          <Text color={colors.secondary} large bold>
            [
          </Text>
          <Text color={colors.primary} large bold>
            2
          </Text>
          <Text color={colors.secondary} large bold>
            ]
          </Text>
        </Flex>

        <Text ml="8px" large color={colors.gray7} bold>
          View Mnemonic phrase
        </Text>
      </Flex>

      <MessageBox
        mt="32px"
        message="Never share your Mnemonic phrase! Anyone who has it can access your funds from anywhere."
      />

      <Box p="16px" mt="16px" background={colors.geekBlue}>
        <Text fontSize="12px" color={colors.cyan5}>
          Your Mnemonic phrase
        </Text>
        <Flex
          mt="16px"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="center"
          minHeight="120px"
        >
          {seedPhrasesList?.map((word: string, i: number) => (
            <MnemonicPhraseItem
              variants="selected"
              word={word}
              num={i}
              key={i}
            />
          ))}
        </Flex>
      </Box>

      <Flex alignItems="center" mt="16px" justifyContent="space-around">
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
              Download
            </Text>
          </Flex>
        </Button>

        <CopyButton
          id="copy-mnemonic"
          component={
            <Flex>
              <CopyIcon width="12px" />
              <Text ml="8px" color={colors.primary} bold>
                Copy
              </Text>
            </Flex>
          }
          value={seedPhrases}
        />
      </Flex>

      <Box mt="auto">
        <ButtonShadow width="100%" mt="16px" onClick={onConfirm}>
          Confirm backup
        </ButtonShadow>
      </Box>
    </Flex>
  );
};
