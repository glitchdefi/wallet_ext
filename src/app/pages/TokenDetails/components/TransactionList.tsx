import React from 'react';

import { TransactionItemType } from 'types/TransactionsState';

import { Empty } from 'app/components/Empty';
import { PlaceHolder, TransactionItem } from './TransactionItem';
import { Box } from 'app/components/Box';

interface Props {
  loading: boolean;
  data: TransactionItemType[];
}

export const TransactionList: React.FC<Props> = React.memo(
  ({ loading, data }) => {
    if (loading) {
      return (
        <Box>
          {[1, 2, 3].map((o, i) => (
            <PlaceHolder key={o} index={i} />
          ))}
        </Box>
      );
    }

    if (!data?.length) {
      return <Empty my="48px" message="You have no transactions" />;
    }

    return (
      <Box>
        {data.map((tx, i) => {
          return <TransactionItem key={i} data={tx} index={i} />;
        })}
      </Box>
    );
  }
);
