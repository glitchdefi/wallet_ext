import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { shuffle } from 'lodash';

import { messages } from '../messages';

// Components
import { Box, Flex } from 'app/components/Box';
import { Button, ButtonShadow } from 'app/components/Button';
import VerifyMnemonicView from './VerifyMnemonicView';
interface Props {
  seedPhrases: string;
  onSubmit?: () => void;
}

const VerifyMnemonicStep: React.FC<Props> = ({ seedPhrases, onSubmit }) => {
  const { t } = useTranslation();
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
    <Flex flexDirection="column" flex={1}>
      <Box height="315px" px="16px" overflowY="scroll">
        <VerifyMnemonicView
          isValid={isValid}
          list={seedPhrasesList}
          confirmList={confirmSeedPhraseList}
          onItemClick={(list) => setConfirmSeedPhraseList(list)}
          onItemConfirmClick={(list) => setConfirmSeedPhraseList(list)}
        />
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
};

export default React.memo(VerifyMnemonicStep);
