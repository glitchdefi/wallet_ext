import React from 'react';
import styled from 'styled-components';

import { colors } from '../../../../theme/colors';

// Components
import { Text } from '../../../components/Text';
import { Flex } from '../../../components/Box';

export function MnemonicPhraseItem() {
  return (
    <StyledWrapper>
      <Text color={colors.green}>1.</Text>
      <Text>fringe</Text>
    </StyledWrapper>
  );
}

const StyledWrapper = styled(Flex)`
  border: 1px solid ${colors.gray8};
  padding: 1px 8px;
  align-items: center;
`;
