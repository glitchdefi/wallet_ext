import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

import bg from '../../../../../assets/img/account_card_bg.jpg';

import { useAccount, useIsBackup } from 'state/wallet/hooks';

import { truncateAddress } from 'utils/strings';
import { formatNumberDownRoundWithExtractMax } from 'utils/number';
import { Routes } from 'constants/routes';
import { colors } from 'theme/colors';

import { Box, Flex } from 'app/components/Box';
import { CopyButton } from 'app/components/Button';
import { Text } from 'app/components/Text';
import { EllipsisIcon, GatewayIcon, ProfileIcon } from 'app/components/Svg';
import { GlitchLogo } from 'app/components/Image';
import { Dropdown } from 'app/components/Dropdown';
import { AssetsSection } from '../AssetsSection';
import { Header } from '../Header';
import { BackedUpView } from './BackedUpView';
import { messages } from '../../messages';

export const WalletPanel: React.FC = React.memo(() => {
  const { t } = useTranslation();
  const history = useHistory();

  const account = useAccount();
  const { name, balance, totalValue, address } = account;
  const { isBackUp } = useIsBackup();

  return (
    <Box height="540.94px" overflowY="scroll">
      <Header account={account} />

      {!isBackUp && (
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
              ]}
            />
          </Flex>

          <Flex alignItems="center">
            <Text fontSize="12px" color={colors.primary}>
              {truncateAddress(address)}
            </Text>
            <CopyButton value={address} p="2px" ml="6px" width="10px" />
          </Flex>

          <Flex alignItems="center" mt="16px">
            <Box width="24px" height="24px" pt="2px">
              <GlitchLogo width={24} height={24} />
            </Box>

            <Flex ml="8px" alignItems="flex-end">
              <Text color={colors.white} fontSize="24px" bold>
                {formatNumberDownRoundWithExtractMax(balance, 6)}
              </Text>
              <Text ml="8px" pb="5px" color={colors.white}>
                GLCH
              </Text>
            </Flex>
          </Flex>

          <Text mt="4px" fontSize="12px" color={colors.gray6}>
            {`~ $${totalValue} USD`}
          </Text>
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
