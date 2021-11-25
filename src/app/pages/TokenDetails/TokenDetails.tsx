import React from 'react';
import { useHistory } from 'react-router';
import { Routes } from 'constants/routes';

import { colors } from 'theme/colors';
import { useAccount } from 'state/wallet/hooks';

import { Flex } from 'app/components/Box';
import { PageLayout } from 'app/layouts';
import { Header } from '../Home/components/Header';
import { Text } from 'app/components/Text';
import { GlitchLogo } from 'app/components/Image';
import { QrCodeIcon, SendIcon } from 'app/components/Svg';
import { Button } from 'app/components/Button';
import { TransactionHistorySection } from './components/TransactionHistorySection';

const TokenDetails: React.FC = React.memo(() => {
  const history = useHistory();

  const account = useAccount();
  const { balance, totalValue } = account;

  return (
    <PageLayout>
      <Header account={account} hasBackButton hasBottomBorder />

      <Flex height="527px" flexDirection="column" px="16px" overflowY="scroll">
        <Flex mt="26px" flexDirection="column" alignItems="center">
          <GlitchLogo width={64} height={64} />

          <Flex mt="12px" alignItems="flex-end">
            <Text fontSize="24px" bold color={colors.white}>
              {balance}
            </Text>
            <Text pb="4px" ml="8px" color={colors.white}>
              GLCH
            </Text>
          </Flex>

          <Text fontSize="12px" color={colors.gray6}>
            {`~ $${totalValue} USD`}
          </Text>
        </Flex>

        <Flex
          width="100%"
          alignItems="center"
          justifyContent="center"
          mt="24px"
        >
          <Button
            variant="primary"
            mr="16px"
            onClick={() => history.push(Routes.sendToken)}
          >
            <Flex alignItems="center" justifyContent="center" width="115px">
              <SendIcon />
              <Text bold color={colors.gray1} ml="9px">
                Send
              </Text>
            </Flex>
          </Button>

          <Button
            variant="primary"
            onClick={() => history.push(Routes.receiveToken)}
          >
            <Flex alignItems="center" justifyContent="center" width="115px">
              <QrCodeIcon />
              <Text bold color={colors.gray1} ml="9px">
                Receive
              </Text>
            </Flex>
          </Button>
        </Flex>

        <TransactionHistorySection />
      </Flex>
    </PageLayout>
  );
});

export default TokenDetails;
