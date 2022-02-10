import React from 'react';

import { GlitchToken } from '../../../../constants/tokens';
import { colors } from 'theme/colors';

import { Box, Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { DownArrowIcon } from 'app/components/Svg';
import { formatDollarAmount } from 'utils/number';

interface Props {
  fee?: string | number;
}

export const NetworkFee: React.FC<Props> = ({ fee }) => {
  return (
    <Flex
      py="12px"
      px="16px"
      background={colors.gray1}
      justifyContent="space-between"
    >
      <Flex>
        <Text>Network fee</Text>
      </Flex>

      <Flex>
        <Flex alignItems="flex-end" flexDirection="column">
          <Text>{GlitchToken.fee} GLCH</Text>
          <Text fontSize="12px" color={colors.gray5}>
            {`~ ${formatDollarAmount(fee)} USD`}
          </Text>
        </Flex>

        {/* <Box ml="8px">
          <DownArrowIcon color={colors.primary} width="16px" />
        </Box> */}
      </Flex>
    </Flex>
  );
};
