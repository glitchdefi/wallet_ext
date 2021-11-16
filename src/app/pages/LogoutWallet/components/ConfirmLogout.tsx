import React from 'react';

// Components
import { Box, Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { Button } from 'app/components/Button';
import { useWalletActionHandlers } from 'state/wallet/hooks';

interface Props {
  password: string;
  onCancel: () => void;
}

export const ConfirmLogout: React.FC<Props> = ({ password, onCancel }) => {
  const { onLogoutWallet } = useWalletActionHandlers();

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
          onClick={() => onLogoutWallet(password)}
        >
          Log out
        </Button>
        <Button width="100%" mt="16px" variant="cancel" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Flex>
  );
};
