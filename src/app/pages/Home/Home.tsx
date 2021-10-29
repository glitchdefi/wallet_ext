import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';

import { colors } from 'theme/colors';
import { truncateAddress } from 'utils/strings';
import { Routes } from 'constants/routes';

import bg from '../../../assets/img/account_card_bg.jpg';
import { formatNumberDownRoundWithExtractMax } from 'utils/number';

import {
  useAccounts,
  useSelectedAddress,
  useWalletSlice,
} from 'state/wallet/hooks';
import { useScrollBlock } from 'hooks/useScrollBlock';

// Components
import { PageLayout } from 'app/layouts';
import { Box, Flex } from 'app/components/Box';
import { CopyButton } from 'app/components/Button';
import { Text } from 'app/components/Text';
import { EllipsisIcon, GatewayIcon, ProfileIcon } from 'app/components/Svg';
import { GlitchLogo } from 'app/components/Image';
import { AssetsSection } from './components/AssetsSection';
import { Header } from './components/Header';
import { Dropdown } from 'app/components/Dropdown';
import { ManageAccountModal } from './components/ManageAccountModal';

const Home: React.FC = () => {
  useWalletSlice();
  const history = useHistory();

  const { selectedAddress } = useSelectedAddress();
  const { accounts } = useAccounts();
  const [blockScroll, allowScroll] = useScrollBlock();

  const [isOpenMnaModal, setIsOpenMnaModal] = useState<boolean>(false);

  useEffect(() => {
    isOpenMnaModal ? blockScroll() : allowScroll();
  }, [isOpenMnaModal]);

  return (
    <PageLayout>
      <Header onAvatarClick={() => setIsOpenMnaModal(!isOpenMnaModal)} />

      <Box px="16px" mt="16px">
        <AccountCard>
          <Flex alignItems="center" justifyContent="space-between">
            <Text color={colors.gray7} bold>
              {accounts[selectedAddress].name}
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
                { key: 0, icon: <ProfileIcon />, label: 'Account details' },
                {
                  key: 1,
                  icon: <GatewayIcon />,
                  label: 'Show Private Keys',
                },
              ]}
            />
          </Flex>

          <Flex alignItems="center">
            <Text fontSize="12px" color={colors.primary}>
              {truncateAddress(selectedAddress)}
            </Text>
            <CopyButton value={selectedAddress} p="2px" ml="6px" width="10px" />
          </Flex>

          <Flex alignItems="center" mt="24px">
            <Box width="24px" height="24px" pt="2px">
              <GlitchLogo width={24} height={24} />
            </Box>

            <Flex ml="8px" alignItems="flex-end">
              <Text color={colors.white} fontSize="24px" bold>
                {formatNumberDownRoundWithExtractMax(
                  accounts[selectedAddress].balance,
                  6
                )}
              </Text>
              <Text ml="8px" pb="5px" color={colors.white}>
                GLCH
              </Text>
            </Flex>
          </Flex>
        </AccountCard>
      </Box>

      <ManageAccountModal
        isOpen={isOpenMnaModal}
        onClose={() => setIsOpenMnaModal(false)}
      />
      <AssetsSection />
    </PageLayout>
  );
};

const AccountCard = styled.div`
  padding: 16px;
  border-top: 3px solid #a900ac;
  background-image: url(${bg});
`;

export default Home;
