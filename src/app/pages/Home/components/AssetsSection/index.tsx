import React from 'react';
import { useHistory } from 'react-router';

import { colors } from 'theme/colors';
import {
  useSelectedAddress,
  useAccounts,
  useTokenPrice,
} from 'state/wallet/hooks';

// Components
import { Box, Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { AddAssetsButton } from './AddAssetsButton';
import { AssetItem } from './AssetItem';
import { Routes } from 'constants/routes';

export const AssetsSection: React.FC = () => {
  const history = useHistory();

  const { selectedAddress } = useSelectedAddress();
  const { accounts } = useAccounts();
  const { priceUsd } = useTokenPrice();

  const balance = accounts[selectedAddress].balance;

  return (
    <Box mt="24px">
      <Flex justifyContent="space-between" px="16px">
        <Text fontSize="20px" color={colors.gray7} bold>
          Assets
        </Text>
        {/* <AddAssetsButton onClick={() => history.push(Routes.addAssets)} /> */}
      </Flex>

      <Box mt="8px">
        <AssetItem
          name="Glitch"
          amount={balance}
          totalValue={Number(balance) * priceUsd}
          onClick={() => history.push(Routes.tokenDetails)}
        />
      </Box>
    </Box>
  );
};
