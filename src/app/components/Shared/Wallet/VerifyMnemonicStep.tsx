import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { shuffle } from 'lodash';

import { messages } from '../messages';

// Components
import { Box, Flex } from 'app/components/Box';
import { Button, ButtonShadow } from 'app/components/Button';
import VerifyMnemonicView from './VerifyMnemonicView';
interface Props {
  seed: string;
  onSubmit?: () => void;
}

const VerifyMnemonicStep: React.FC<Props> = ({ seed, onSubmit }) => {
  const { t } = useTranslation();
  const [seedList, setSeedList] = useState<{ key: string; value: string }[]>(
    []
  );
  const [confirmSeedList, setConfirmSeedList] = useState<
    { key: string; value: string }[]
  >([]);

  const isValid =
    JSON.stringify(seed?.split(' ')) ===
    JSON.stringify(confirmSeedList.map((o) => o.value));

  useEffect(() => {
    const shuffleList = shuffle(seed?.split(' '));
    const sList = shuffleList.map((word: string, index: number) => {
      return {
        key: `${word}-${index}`,
        value: word,
      };
    });
    setSeedList(sList);
  }, []);

  return (
    <Flex flexDirection="column" flex={1}>
      <Box height="100%" px="16px">
        <VerifyMnemonicView
          isValid={isValid}
          list={seedList}
          confirmList={confirmSeedList}
          onItemClick={setConfirmSeedList}
          onItemConfirmClick={setConfirmSeedList}
        />
      </Box>

      <Box mt="16px" px="16px">
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
