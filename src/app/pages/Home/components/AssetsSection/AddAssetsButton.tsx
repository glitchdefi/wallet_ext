import React from 'react';

import { colors } from 'theme/colors';

import { Button } from 'app/components/Button';
import { Flex } from 'app/components/Box';
import { PlusIcon } from 'app/components/Svg';
import { Text } from 'app/components/Text';

interface Props {
  onClick?: () => void;
}

export const AddAssetsButton: React.FC<Props> = () => {
  return (
    <Button py="0px" px="8px" variant="secondary">
      <Flex alignItems="center">
        <PlusIcon />
        <Text ml="8px" color={colors.primary} bold>
          Add assets
        </Text>
      </Flex>
    </Button>
  );
};
