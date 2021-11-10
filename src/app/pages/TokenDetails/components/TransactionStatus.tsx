import React from 'react';
import { colors } from 'theme/colors';

import { Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { CheckIcon, WarningIcon } from 'app/components/Svg';

interface Props {
  status: number;
}

export const TransactionStatus: React.FC<Props> = ({ status }) => {
  const isSuccess = status === 1;

  return (
    <Flex>
      {isSuccess ? (
        <CheckIcon width="14px" color={colors.green} />
      ) : (
        <WarningIcon width="14px" color={colors.error} />
      )}

      <Text ml="8px" color={isSuccess ? colors.green : colors.error}>
        {isSuccess ? 'Success' : 'Failed'}
      </Text>
    </Flex>
  );
};
