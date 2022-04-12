import React from 'react';
import { useHistory } from 'react-router';

// Components
import { Box, Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { Button } from 'app/components/Button';
import { useWallet } from 'contexts/WalletContext/hooks';
interface Props {
  onCancel: () => void;
}

export const ConfirmLogout: React.FC<Props> = React.memo(({ onCancel }) => {
  const history = useHistory();
  const { onLogoutWallet } = useWallet();

  return (
    <Flex flexDirection="column" px="32px" minHeight="543px">
      <Text mt="124px" large>
        Are you sure you would like to log out your wallet from Glitch?
      </Text>

      <Box width="100%">
        <Button
          width="100%"
          mt="64px"
          variant="warning"
          onClick={() => onLogoutWallet(history)}
        >
          Log out
        </Button>
        <Button width="100%" mt="16px" variant="cancel" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Flex>
  );
});
