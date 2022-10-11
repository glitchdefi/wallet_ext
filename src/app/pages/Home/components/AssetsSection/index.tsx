import React from 'react';
import { useHistory } from 'react-router';

import { colors } from 'theme/colors';
import { useAccount } from 'contexts/WalletContext/hooks';
import { useTokenPrice } from 'contexts/TokenPriceContext/hooks';
import { calcTotalBalance } from 'utils/number';

// Components
import { Box, Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
// import { AddAssetsButton } from './AddAssetsButton';
import { AssetItem } from './AssetItem';
import { Routes } from 'constants/routes';

export const AssetsSection: React.FC = () => {
  const history = useHistory();
  const { tokenPrice } = useTokenPrice();
  const { balance } = useAccount();
  const totalBalance = calcTotalBalance(balance);
  const totalValue = totalBalance * tokenPrice;

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
          amount={totalBalance}
          totalValue={totalValue}
          onClick={() => history.push(Routes.tokenDetails)}
        />
        {/* <AssetItem
          isERC20
          name="Glitch"
          amount={'0'}
          totalValue={'0'}
          onClick={() => history.push(Routes.tokenDetails)}
        /> */}
      </Box>
    </Box>
  );
};
