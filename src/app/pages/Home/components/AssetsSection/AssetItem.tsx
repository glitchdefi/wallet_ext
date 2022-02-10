import React from 'react';
import styled from 'styled-components';

import { colors } from 'theme/colors';
import { formatDollarAmount, formatNumberDownRoundWithExtractMax } from 'utils/number';

import { Box, Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { GlitchLogo } from 'app/components/Image';

interface Props {
  name?: string;
  amount?: any;
  totalValue?: any;
  onClick?: () => void;
}

export const AssetItem: React.FC<Props> = ({
  name,
  amount,
  totalValue,
  onClick,
}) => {
  return (
    <Wrapper py="20px" px="16px" alignItems="center" onClick={onClick}>
      <GlitchLogo width={36} height={36} />
      <Box ml="16px" width="100%">
        <Flex width="100%" alignItems="center" justifyContent="space-between">
          <Flex alignItems="center">
            <Text large bold>
              GLCH
            </Text>
            {/* <NetworkType>
              <Text fontSize="10px" color={colors.blue6}>
                ERC20
              </Text>
            </NetworkType> */}
          </Flex>
          <Text large bold>
            {formatNumberDownRoundWithExtractMax(amount, 6)}
          </Text>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between">
          <Text fontSize="12px" color={colors.gray6}>
            {name}
          </Text>

          <Text fontSize="12px" color={colors.gray6}>
            {`${formatDollarAmount(totalValue)} USD`}
          </Text>
        </Flex>
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled(Flex)`
  cursor: pointer;

  &:hover {
    transition: all 0.3s;
    background-color: rgba(255, 255, 255, 0.03);
  }
`;

const NetworkType = styled.div`
  margin-left: 10px;
  padding-left: 4px;
  padding-right: 4px;
  background-color: ${colors.blue1};
  border: 1px solid ${colors.blue3};
`;
