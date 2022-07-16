import React from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Routes } from 'constants/routes';
import styled from 'styled-components';

import { colors } from 'theme/colors';
import {
  calcTotalBalance,
  formatDollarAmount,
  formatNumberDownRoundWithExtractMax,
} from 'utils/number';
import { useAccount, useWallet } from 'contexts/WalletContext/hooks';
import { useTokenPrice } from 'contexts/TokenPriceContext/hooks';

import { messages } from './messages';

import { Flex } from 'app/components/Box';
import { PageLayout } from 'app/layouts';
import { Header } from '../Home/components/Header';
import { Text } from 'app/components/Text';
import { GlitchLogo } from 'app/components/Image';
import { QrCodeIcon, SendIcon } from 'app/components/Svg';
import { Button } from 'app/components/Button';
import { TransactionHistorySection } from './components/TransactionHistorySection';

const TokenDetails: React.FC = React.memo(() => {
  const { t } = useTranslation();
  const history = useHistory();
  const { onLockWallet } = useWallet();

  const { tokenPrice } = useTokenPrice();
  const account = useAccount();
  const { balance } = account;
  const totalBalance = calcTotalBalance(balance);
  const totalValue = totalBalance * tokenPrice;

  return (
    <PageLayout>
      <Header
        account={account}
        onLockWallet={onLockWallet}
        hasBackButton
        hasBottomBorder
      />

      <ContentWrapper flexDirection="column" px="16px" overflowY="scroll">
        <Flex mt="26px" flexDirection="column" alignItems="center">
          <GlitchLogo width={64} height={64} />
          <Text fontSize="12px" color={colors.blue6}>
            (Substrate address)
          </Text>

          <Flex mt="12px" alignItems="flex-end">
            <Text fontSize="24px" bold color={colors.white}>
              {formatNumberDownRoundWithExtractMax(totalBalance, 6)}
            </Text>
            <Text pb="4px" ml="8px" color={colors.white}>
              GLCH
            </Text>
          </Flex>

          <Text fontSize="12px" color={colors.gray6}>
            {`~ ${formatDollarAmount(totalValue)} USD`}
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
                {t(messages.send())}
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
                {t(messages.receive())}
              </Text>
            </Flex>
          </Button>
        </Flex>

        <TransactionHistorySection />
      </ContentWrapper>
    </PageLayout>
  );
});

const ContentWrapper = styled(Flex)`
  height: 527px;

  @media only screen and (min-width: 768px) {
    height: calc(100vh - 136px);
  }
`;

export default TokenDetails;
