import React from 'react';
import { useHistory } from 'react-router';

import { colors } from 'theme/colors';
import { useAccount } from 'state/wallet/hooks';

// Components
import { Box, Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { AddAssetsButton } from './AddAssetsButton';
import { AssetItem } from './AssetItem';
import { Routes } from 'constants/routes';

export const AssetsSection: React.FC = () => {
  const history = useHistory();
  const { totalValue, balance } = useAccount();

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
          totalValue={totalValue}
          onClick={() => history.push(Routes.tokenDetails)}
        />
      </Box>
    </Box>
  );
};
