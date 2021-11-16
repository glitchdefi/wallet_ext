import React, { useEffect, useState } from 'react';

import { useTransactions } from 'state/transactions/hooks';

import { colors } from 'theme/colors';
import { PAGE_SIZE } from 'constants/values';
import { useSelectedAddress } from 'state/wallet/hooks';

import { Box, Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { FilterIcon } from 'app/components/Svg';
import { Button } from 'app/components/Button';
import { TransactionList } from './TransactionList';
import { FilterModal } from './FilterModal';

export const TransactionHistorySection: React.FC = () => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [filter, setFilter] = useState({
    txStatus: 2,
    txType: 0,
    startTime: null,
    endTime: null,
  }); // Status 2 -> all, TxType 0 -> all
  const [dateType, setDateType] = useState<'select' | 'calendar'>('select');

  const { selectedAddress } = useSelectedAddress();

  const { isFetchingTransactions, transactions } = useTransactions({
    pageIndex,
    pageSize: PAGE_SIZE,
    txStatus: filter.txStatus,
    txType: filter.txType,
    startTime: filter.startTime,
    endTime: filter.endTime,
  });

  // Reset filter when account changed
  useEffect(() => {
    setFilter({ txStatus: 2, txType: 0, startTime: null, endTime: null });
  }, [selectedAddress]);

  return (
    <>
      <Flex
        borderTop={`1px solid ${colors.magenta2}`}
        mt="32px"
        pt="32px"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text color={colors.gray7} bold>
          Transaction history
        </Text>

        {transactions?.length ? (
          <Button p="0px" onClick={() => setShowFilterModal(true)}>
            <Flex alignItems="center">
              <FilterIcon width="14px" />
              <Text bold color={colors.primary} ml="8px">
                Filter
              </Text>
            </Flex>
          </Button>
        ) : null}
      </Flex>

      <Box mt="16px" mb="16px">
        <TransactionList loading={isFetchingTransactions} data={transactions} />
      </Box>

      <FilterModal
        initFilter={filter}
        initDateType={dateType}
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onFilter={({ txStatus, txType, startTime, endTime }) => {
          setFilter({ txStatus, txType, startTime, endTime });
          setShowFilterModal(false);
        }}
        onChangeDateType={(type) => setDateType(type)}
      />
    </>
  );
};