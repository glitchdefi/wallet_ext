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
  list: { key: string; value: string }[];
  confirmList: { key: string; value: string }[];
  isValid: boolean;
  onItemClick: (list: { key: string; value: string }[]) => void;
  onItemConfirmClick: (list: { key: string; value: string }[]) => void;
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
        {confirmList?.map((o, i) => (
          <MnemonicPhraseItem
            variants="selected"
            word={o.value}
            num={i}
            key={i}
            onClick={() => {
              const newList = confirmList.filter((_o) => _o.key !== o.key);
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

      <MpWrapper mt="16px">
        {list?.map((o, i) => (
          <MnemonicPhraseItem
            variants={
              confirmList.findIndex((_o) => _o.key === o.key) > -1
                ? 'disable'
                : 'default'
            }
            word={o.value}
            num={i}
            key={i}
            onClick={() => {
              if (confirmList.findIndex((_o) => _o.key === o.key) <= -1)
                onItemConfirmClick([...confirmList, o]);
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
