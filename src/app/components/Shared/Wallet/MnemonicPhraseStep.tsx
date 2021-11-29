import React from 'react';
import { useTranslation } from 'react-i18next';

// Hooks
import { messages } from '../messages';

import { Flex, Box } from 'app/components/Box';
import { MessageBox } from 'app/components/MessageBox';
import { ButtonShadow } from 'app/components/Button';
import MnemonicPhraseView from './MnemonicPhraseView';
interface Props {
  seedPhrases: string;
  onNextStep: () => void;
}

const MnemonicPhraseStep: React.FC<Props> = ({ seedPhrases, onNextStep }) => {
  const { t } = useTranslation();

  return (
    <Flex flex={1} flexDirection="column" px="16px">
      <MnemonicPhraseView seed={seedPhrases} />

      <MessageBox mt="24px" message={t(messages.neverShareYourMnemonic())} />

      <Box mt="auto">
        <ButtonShadow width="100%" onClick={onNextStep}>
          {t(messages.iWroteDownMnemonic())}
        </ButtonShadow>
      </Box>
    </Flex>
  );
};

export default React.memo(MnemonicPhraseStep);
