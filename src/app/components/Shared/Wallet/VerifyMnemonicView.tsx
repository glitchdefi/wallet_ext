import React from 'react';
import { colors } from 'theme/colors';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { messages } from '../messages';

// Components
import { Box, Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import MnemonicPhraseItem from './MnemonicPhraseItem';

interface Props {
  list: string[];
  confirmList: string[];
  isValid: boolean;
  onItemClick: (list: string[]) => void;
  onItemConfirmClick: (list: string[]) => void;
}

const VerifyMnemonicView: React.FC<Props> = ({
  isValid,
  list,
  confirmList,
  onItemClick,
  onItemConfirmClick,
}) => {
  const { t } = useTranslation();

  return (
    <Box>
      <MpWrapper>
        {confirmList?.map((word: string, i) => (
          <MnemonicPhraseItem
            variants="selected"
            word={word}
            num={i + 1}
            key={i}
            onClick={() => {
              const newList = confirmList.filter((cWord) => cWord !== word);
              onItemClick(newList);
            }}
          />
        ))}
      </MpWrapper>
      {!isValid && confirmList?.length >= 12 && (
        <Text fontSize="12px" mt="4px" color={colors.error} textAlign="center">
          {t(messages.invalidMnemonicPhrase())}
        </Text>
      )}

      <MpWrapper mt="32px">
        {list?.map((word: string, i) => (
          <MnemonicPhraseItem
            variants={confirmList.includes(word) ? 'disable' : 'default'}
            word={word}
            num={i}
            key={i}
            onClick={() => {
              if (!confirmList.includes(word)) onItemConfirmClick([...confirmList, word]);
            }}
          />
        ))}
      </MpWrapper>
    </Box>
  );
};

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

export default React.memo(VerifyMnemonicView);
