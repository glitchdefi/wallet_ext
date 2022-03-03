import React from 'react';
import moment from 'moment';
import web3Utils from 'web3-utils';
import { useTranslation } from 'react-i18next';

import { colors } from 'theme/colors';
import { TransactionItemType } from 'types/TransactionsState';

import { messages } from '../messages';

import { Box, Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { OutlineSelectIcon } from 'app/components/Svg';
import { Skeleton } from 'app/components/Skeleton';
import { Button } from 'app/components/Button';
import { TransactionStatus } from './TransactionStatus';
import { useAccount } from 'state/wallet/hooks';

const FORMAT_TIME = 'MMM DD, YYYY • HH:mm';

interface Props {
  data: TransactionItemType;
  index: number;
  Placeholder?: React.ReactNode;
}

export const TransactionItem: React.FC<Props> = React.memo(
  ({ data, index }) => {
    const { t } = useTranslation();
    const { address } = useAccount();
    const { hash, time, to, status, value } = data || {};

    const isReceive = to === address;
    const amount = web3Utils.fromWei(value);

    return (
      <Box mt={index > 0 ? '8px' : '0px'}>
        <Box px="16px" py="12px" background={colors.gray1}>
          <Flex alignItems="center" justifyContent="space-between">
            <Text color={colors.gray6}>{t(messages.txn())}</Text>
            <Text>
              {isReceive ? t(messages.receive()) : t(messages.send())}
            </Text>
          </Flex>

          <Flex mt="4px" alignItems="center" justifyContent="space-between">
            <Text color={colors.gray6}>{t(messages.amount())}</Text>
            <Text color={isReceive ? colors.blue6 : colors.secondary}>{`${
              isReceive ? '+' : '-'
            }${amount} GLCH`}</Text>
          </Flex>

          <Flex mt="4px" alignItems="center" justifyContent="space-between">
            <Text color={colors.gray6}>{t(messages.status())}</Text>
            <TransactionStatus status={status} />
          </Flex>

          <Flex mt="4px" alignItems="center" justifyContent="space-between">
            <Text color={colors.gray6}>{t(messages.time())}</Text>
            <Text>{moment.utc(time).format(FORMAT_TIME)}</Text>
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
                {t(messages.viewOnExplorer())}
              </Text>
              <OutlineSelectIcon width="14px" />
            </Flex>
          </Button>
        </Flex>
      </Box>
    );
  }
);

export const PlaceHolder: React.FC<{ index?: number }> = React.memo(
  ({ index }) => (
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
  )
);
