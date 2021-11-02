import React from 'react';
import { Button } from 'app/components/Button';
import { Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { colors } from 'theme/colors';

interface Props {
  onBackup: () => void;
}

export const BackedUpView: React.FC<Props> = ({ onBackup }) => {
  return (
    <Flex mx="16px" alignItems="center" p="16px" background={colors.geekBlue}>
      <Text fontSize="12px" mr="16px">
        Your wallet is not backed up
      </Text>
      <Button py="2px" px="8px" variant="cancel" onClick={onBackup}>
        <Text bold fontSize="12px">
          Backup now
        </Text>
      </Button>
    </Flex>
  );
};
