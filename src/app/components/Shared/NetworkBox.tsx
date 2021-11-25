import React from 'react';

import { colors } from 'theme/colors';

// Components
import { Text } from 'app/components/Text';
import { Box, Flex } from 'app/components/Box';
import { DownArrowIcon } from 'app/components/Svg';

const NetworkBox: React.FC = React.memo(() => {
  return (
    <Flex
      width="fit-content"
      alignItems="center"
      p="8px"
      border={`1px solid ${colors.gray2}`}
    >
      <Box
        width="10px"
        height="10px"
        borderRadius="5px"
        background={colors.green}
      />
      <Text mx="8px" fontSize="12px">
        Glitch Testnet
      </Text>
      <DownArrowIcon width="12px" color={colors.gray7} />
    </Flex>
  );
});

export default NetworkBox;
