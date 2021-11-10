import React from 'react';
import moment from 'moment';
import web3Utils from 'web3-utils';

import { colors } from 'theme/colors';
import { TransactionItemType } from 'types/TransactionsState';

import { Box, Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { OutlineSelectIcon } from 'app/components/Svg';
import { Skeleton } from 'app/components/Skeleton';
import { Button } from 'app/components/Button';
import { TransactionStatus } from './TransactionStatus';

const FORMAT_TIME = 'MMM DD, YYYY • HH:mm';

interface Props {
  data: TransactionItemType;
  index: number;
  Placeholder?: React.ReactNode;
}

export const TransactionItem: React.FC<Props> = ({ data, index }) => {
  const { hash, create_at, type, result_log, value } = data || {};

  const isReceive = type?.toLowerCase() === 'in';
  const amount = web3Utils.fromWei(value);

  return (
    <Box mt={index > 0 ? '8px' : '0px'}>
      <Box px="16px" py="12px" background={colors.gray1}>
        <Flex alignItems="center" justifyContent="space-between">
          <Text color={colors.gray6}>Txn</Text>
          <Text>{isReceive ? 'Receive' : 'Send'}</Text>
        </Flex>

        <Flex mt="4px" alignItems="center" justifyContent="space-between">
          <Text color={colors.gray6}>Amount</Text>
          <Text color={isReceive ? colors.blue6 : colors.secondary}>{`${
            isReceive ? '+' : '-'
          }${amount}`}</Text>
        </Flex>

        <Flex mt="4px" alignItems="center" justifyContent="space-between">
          <Text color={colors.gray6}>Status</Text>
          <TransactionStatus status={result_log} />
        </Flex>

        <Flex mt="4px" alignItems="center" justifyContent="space-between">
          <Text color={colors.gray6}>Time</Text>
          <Text>{moment.utc(create_at).format(FORMAT_TIME)}</Text>
        </Flex>
      </Box>

      <Flex
        py="8px"
        px="16px"
        background={colors.gray2}
        justifyContent="flex-end"
      >
        <Button
          p="0px"
          onClick={() => {
            window.open(`https://testnet-explorer.glitch.finance/tx/${hash}`);
          }}
        >
          <Flex alignItems="center">
            <Text fontSize="12px" bold color={colors.primary} mr="8px">
              View on Glitch Explorer
            </Text>
            <OutlineSelectIcon width="14px" />
          </Flex>
        </Button>
      </Flex>
    </Box>
  );
};

export const PlaceHolder: React.FC<{ index?: number }> = ({ index }) => (
  <Box mt={index > 0 ? '8px' : '0px'}>
    <Box px="16px" py="12px" background={colors.gray1}>
      <Flex alignItems="center" justifyContent="space-between">
        <Skeleton width="15%" />
        <Skeleton width="10%" />
      </Flex>
      <Flex mt="4px" alignItems="center" justifyContent="space-between">
        <Skeleton width="20%" />
        <Skeleton width="20%" />
      </Flex>
      <Flex mt="4px" alignItems="center" justifyContent="space-between">
        <Skeleton width="18%" />
        <Skeleton width="25%" />
      </Flex>
      <Flex mt="4px" alignItems="center" justifyContent="space-between">
        <Skeleton width="10%" />
        <Skeleton width="30%" />
      </Flex>
    </Box>

    <Flex
      py="8px"
      px="16px"
      background={colors.gray2}
      justifyContent="flex-end"
    >
      <Skeleton width="40%" />
    </Flex>
  </Box>
);
