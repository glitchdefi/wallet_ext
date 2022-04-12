import React from 'react';
import styled from 'styled-components';

import { Box, Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { DeleteIcon } from 'app/components/Svg';
import { colors } from 'theme/colors';

interface Props {
  onRemove?(): void;
}

export const ListItem: React.FC<Props> = ({ onRemove }) => {
  return (
    <ItemWrapper>
      <Flex flex={1} alignItems="center">
        <Box mr="8px">
          <img width="32px" height="32px" />
        </Box>
        <Text color={colors.gray9}>app.1inch.info</Text>
      </Flex>

      <DeleteIcon width="18px" onClick={onRemove} />
    </ItemWrapper>
  );
};

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
  padding: 16px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.03);
  }
`;
