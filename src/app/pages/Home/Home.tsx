import React, { useState } from 'react';
import styled from 'styled-components';

import { colors } from 'theme/colors';
import { truncateAddress } from 'utils/strings';

import bg from '../../../assets/img/account_card_bg.jpg';
import { formatNumberDownRoundWithExtractMax } from 'utils/number';

import {
  useAccounts,
  useSelectedAddress,
  useWalletSlice,
} from 'state/wallet/hooks';

// Components
import { PageLayout } from 'app/layouts';
import { Box, Flex } from 'app/components/Box';
import { Button, CopyButton } from 'app/components/Button';
import { Text } from 'app/components/Text';
import { EllipsisIcon } from 'app/components/Svg';
import { GlitchLogo } from 'app/components/Image';
import { AssetsSection } from './components/AssetsSection';
import { Header } from './components/Header';
import { ManageAccountModal } from './components/ManageAccountModal';

const Home: React.FC = () => {
  useWalletSlice();

  const { selectedAddress } = useSelectedAddress();
  const { accounts } = useAccounts();

  const [isOpenMnaModal, setIsOpenMnaModal] = useState<boolean>(false);

  return (
    <PageLayout>
      <Header onAvatarClick={() => setIsOpenMnaModal(!isOpenMnaModal)} />

      <Box px="16px" mt="16px">
        <AccountCard>
          <Flex alignItems="center" justifyContent="space-between">
            <Text color={colors.gray7} bold>
              {accounts[selectedAddress].name}
            </Text>
            <Button p="0px">
              <Flex width="24px" height="24px" alignItems="center">
                <EllipsisIcon />
              </Flex>
            </Button>
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
