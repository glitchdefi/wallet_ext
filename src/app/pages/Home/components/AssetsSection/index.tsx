import React from 'react';

import { colors } from 'theme/colors';

// Components
import { Box, Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { AddAssetsButton } from './AddAssetsButton';
import { AssetItem } from './AssetItem';

export const AssetsSection: React.FC = () => {
  return (
    <Box mt="24px">
      <Flex justifyContent="space-between" px="16px">
        <Text fontSize="20px" color={colors.gray7} bold>
          Assets
        </Text>
        <AddAssetsButton />
      </Flex>

      <Box mt="8px">
        {[1, 2, 3, 4, 5].map((o) => (
          <AssetItem />
        ))}
      </Box>
    </Box>
  );
};
