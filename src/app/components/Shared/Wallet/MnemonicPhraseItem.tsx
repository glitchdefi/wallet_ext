import React from 'react';
import styled from 'styled-components';

import { colors } from 'theme/colors';

// Components
import { Text } from 'app/components/Text';
import { Flex } from 'app/components/Box';

interface Props {
  variants?: 'selected' | 'default' | 'disable';
  num: number;
  word: string;
  onClick?: () => void;
}

const MnemonicPhraseItem: React.FC<Props> = ({
  num,
  word,
  variants,
  onClick,
}) => {
  return (
    <StyledWrapper
      background={variants === 'disable' ? colors.gray8 : 'transparent'}
      onClick={onClick}
      style={{
        cursor:
          variants === 'disable'
            ? 'not-allowed'
            : onClick
            ? 'pointer'
            : 'default',
        opacity: variants === 'disable' ? 0.3 : 1,
      }}
    >
      {variants === 'selected' && <Text color={colors.green}>{num + 1}.</Text>}
      <Text color={variants === 'disable' ? colors.gray7 : colors.gray9}>
        {word}
      </Text>
    </StyledWrapper>
  );
};

const StyledWrapper = styled(Flex)`
  border: 1px solid ${colors.gray8};
  padding: 1px 8px;
  align-items: center;
  margin: 6px;
  height: fit-content;
  user-select: none;

  &:hover {
    opacity: 0.8;
  }
`;

export default React.memo(MnemonicPhraseItem);
