import React from 'react';

import { colors } from '../../../../../theme/colors';

import { Flex, Box } from '../../../../components/Box';
import { MessageBox } from '../../../../components/MessageBox';
import { Button, ButtonShadow } from '../../../../components/Button';
import { MnemonicPhraseItem } from '../MnemonicPhraseItem';
import { DownloadIcon, CopyIcon } from '../../../../components/Svg';
import { Text } from '../../../../components/Text';

export function MnemonicPhraseStep() {
  return (
    <Box>
      <Flex
        p="12px"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
        background={colors.gray1}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((o) => (
          <MnemonicPhraseItem />
        ))}
      </Flex>

      <Flex mt="16px" justifyContent="space-around">
        <Button p="0px">
          <Flex>
            <DownloadIcon width="16px" />
            <Text ml="8px" color={colors.primary} bold>
              Download
            </Text>
          </Flex>
        </Button>

        <Button p="0px">
          <Flex>
            <CopyIcon width="12px" />
            <Text ml="8px" color={colors.primary} bold>
              Copy
            </Text>
          </Flex>
        </Button>
      </Flex>

      <MessageBox
        mt="24px"
        message="Never share your Mnemonic phrase with anyone! If you lose your Mnemonic phrase, you will not able to access your funds!"
      />

      <Box pt="32px" pb="24px">
        <ButtonShadow width="100%">I wrote down my Mnemonic</ButtonShadow>
      </Box>
    </Box>
  );
}
