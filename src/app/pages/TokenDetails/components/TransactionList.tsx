import React from 'react';
import { useTranslation } from 'react-i18next';

import { messages } from '../messages';

import { Empty } from 'app/components/Empty';
import { PlaceHolder, TransactionItem } from './TransactionItem';
import { Box } from 'app/components/Box';

interface Props {
  loading: boolean;
  data: any[];
}

export const TransactionList: React.FC<Props> = React.memo(
  ({ loading, data }) => {
    const { t } = useTranslation();

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
      return <Empty my="48px" message={t(messages.txEmpty())} />;
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
