import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

import bg from '../../../../../assets/img/account_card_bg.jpg';

import { useWallet, useAccount } from 'contexts/WalletContext/hooks';
import { useTokenPrice } from 'contexts/TokenPriceContext/hooks';

import { truncateAddress } from 'utils/strings';
import {
  calcTotalBalance,
  formatDollarAmount,
  formatNumberDownRoundWithExtractMax,
} from 'utils/number';
import { Routes } from 'constants/routes';
import { colors } from 'theme/colors';

import { Box, Flex } from 'app/components/Box';
import { CopyButton } from 'app/components/Button';
import { Text } from 'app/components/Text';
import {
  EllipsisIcon,
  GatewayIcon,
  LinkIcon,
  ProfileIcon,
} from 'app/components/Svg';
import { GlitchLogo } from 'app/components/Image';
import { Dropdown } from 'app/components/Dropdown';
import { AssetsSection } from '../AssetsSection';
import { Header } from '../Header';
import { BackedUpView } from './BackedUpView';
import { messages } from '../../messages';
import { ConnectedDappNoti } from './ConnectedDappNoti';

export const WalletPanel: React.FC = React.memo(() => {
  const { t } = useTranslation();
  const history = useHistory();
  const { tokenPrice } = useTokenPrice();
  const { walletCtx, onLockWallet } = useWallet();
  const account = useAccount();
  const { isBackup } = walletCtx || {};
  const { name, balance, address, evmAddress } = account;
  const totalBalance = calcTotalBalance(balance);
  const totalValue = totalBalance * tokenPrice;

  return (
    <Box height="540.94px" overflowY="scroll">
      <ConnectedDappNoti />
      <Header hasExpandButton account={account} onLockWallet={onLockWallet} />

      {!isBackup && (
        <BackedUpView onBackup={() => history.push(Routes.backUp)} />
      )}

      <Box px="16px" mt="16px">
        <AccountCard>
          <Flex alignItems="center" justifyContent="space-between">
            <Text color={colors.gray7} bold>
              {name}
            </Text>

            <Dropdown
              onSelect={(eventKey) => {
                if (eventKey == 0) history.push(Routes.accountDetails);
                if (eventKey == 1) history.push(Routes.showPrivateKeys);
                if (eventKey == 2) history.push(Routes.connectedDapps);
              }}
              customToggle={
                <Flex width="24px" height="24px" alignItems="center">
                  <EllipsisIcon />
                </Flex>
              }
              items={[
                {
                  key: 0,
                  icon: <ProfileIcon />,
                  label: t(messages.accountDetails()),
                },
                {
                  key: 1,
                  icon: <GatewayIcon />,
                  label: t(messages.showPrivateKey()),
                },
                {
                  key: 2,
                  icon: <LinkIcon />,
                  label: t(messages.connectedDapps()),
                },
              ]}
            />
          </Flex>

          <Flex alignItems="center">
            <Text fontSize="12px" color={colors.primary}>
              {truncateAddress(address)}
            </Text>
            <CopyButton value={address} p="2px" ml="6px" width="10px" />
            <Text fontSize="12px" ml="10px" color={colors.gray6}>
              (Substrate address)
            </Text>
          </Flex>

          <Flex alignItems="center">
            <Text fontSize="12px" color={colors.primary}>
              {truncateAddress(evmAddress)}
            </Text>
            <CopyButton value={evmAddress} p="2px" ml="6px" width="10px" />
            <Text fontSize="12px" ml="10px" color={colors.gray6}>
              (EVM address)
            </Text>
          </Flex>

          <Flex alignItems="center" justifyContent="space-between" mt="16px">
            <Flex alignItems="center">
              <Box width="24px" height="24px" pt="2px">
                <GlitchLogo width={24} height={24} />
              </Box>

              <Flex ml="8px" alignItems="flex-end">
                <Text color={colors.white} fontSize="24px" bold>
                  {formatNumberDownRoundWithExtractMax(totalBalance, 6)}
                </Text>
                <Text ml="8px" pb="5px" color={colors.white}>
                  GLCH
                </Text>
              </Flex>
            </Flex>

            {/* <SyncBalanceView /> */}
          </Flex>

          <Text mt="4px" fontSize="12px" color={colors.gray6}>
            {`~ ${formatDollarAmount(totalValue)} USD`}
          </Text>

          {/* <Button p="0px" mt="8px">
            <Text
              style={{ textDecoration: 'underline' }}
              fontWeight="600"
              fontSize="12px"
              color={colors.primary}
            >
              Switch to EVM address
            </Text>
          </Button> */}
        </AccountCard>
      </Box>
      <AssetsSection />
    </Box>
  );
});

const AccountCard = styled.div`
  padding: 16px;
  border-top: 3px solid #a900ac;
  background-image: url(${bg});
`;
