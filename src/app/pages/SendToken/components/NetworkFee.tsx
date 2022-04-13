import React from 'react';

import { colors } from 'theme/colors';

import { Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
// import { DownArrowIcon } from 'app/components/Svg';
import { formatDollarAmount } from 'utils/number';
import { Spinner } from 'app/components/Loading';

interface Props {
  loading?: boolean;
  fee?: string | number;
  feeToUsd: string | number;
}

export const NetworkFee: React.FC<Props> = ({ loading, fee, feeToUsd }) => {
  return (
    <Flex
      py="12px"
      px="16px"
      background={colors.gray1}
      alignItems={loading ? 'center' : 'flex-start'}
      justifyContent="space-between"
    >
      <Flex>
        <Text>Network fee</Text>
      </Flex>

      <Flex>
        {loading ? (
          <Spinner />
        ) : (
          <Flex alignItems="flex-end" flexDirection="column">
            <Text>{fee} GLCH</Text>
            {feeToUsd && (
              <Text fontSize="12px" color={colors.gray5}>
                {`~ ${formatDollarAmount(feeToUsd)} USD`}
              </Text>
            )}
          </Flex>
        )}

        {/* <Box ml="8px">
          <DownArrowIcon color={colors.primary} width="16px" />
        </Box> */}
      </Flex>
    </Flex>
  );
};
