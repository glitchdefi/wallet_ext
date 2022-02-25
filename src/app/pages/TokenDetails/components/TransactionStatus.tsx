import React from 'react';
import { useTranslation } from 'react-i18next';
import { colors } from 'theme/colors';

import { messages } from '../messages';

import { Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { CheckIcon, WarningIcon } from 'app/components/Svg';

interface Props {
  status: string;
}

export const TransactionStatus: React.FC<Props> = React.memo(({ status }) => {
  const { t } = useTranslation();
  const isSuccess = status === 'success';

  return (
    <Flex>
      {isSuccess ? (
        <CheckIcon width="14px" color={colors.green} />
      ) : (
        <WarningIcon width="14px" color={colors.error} />
      )}

      <Text ml="8px" color={isSuccess ? colors.green : colors.error}>
        {isSuccess ? t(messages.success()) : t(messages.failed())}
      </Text>
    </Flex>
  );
});
