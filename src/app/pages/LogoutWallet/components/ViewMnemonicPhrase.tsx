import React from 'react';

import { colors } from 'theme/colors';

import { Flex, Box } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { ButtonShadow } from 'app/components/Button';
import { MessageBox } from 'app/components/MessageBox';
import { MnemonicPhraseView } from 'app/components/Shared';
interface Props {
  seedPhrases: string;
  onConfirm: () => void;
}

export const ViewMnemonicPhrase: React.FC<Props> = React.memo(
  ({ seedPhrases, onConfirm }) => {
    return (
      <Flex flex={1} flexDirection="column" pt="32px" pb="24px" px="32px">
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
          mt="16px"
          message="Never share your Mnemonic phrase! Anyone who has it can access your funds from anywhere."
          textColor={colors.orange}
        />

        <Box mt="16px">
          <MnemonicPhraseView
            label="Your Mnemonic phrase"
            seed={seedPhrases}
            background={colors.geekBlue}
          />
        </Box>

        <Box mt="auto">
          <ButtonShadow width="100%" mt="16px" onClick={onConfirm}>
            Confirm backup
          </ButtonShadow>
        </Box>
      </Flex>
    );
  }
);
