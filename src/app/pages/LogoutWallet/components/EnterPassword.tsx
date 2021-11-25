import React, { useEffect, useState } from 'react';

import {
  useSeedPhrase,
  useWalletActionHandlers,
  useWrongPassword,
} from 'state/wallet/hooks';

import { Flex, Box } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { colors } from 'theme/colors';
import { Label, PasswordInput } from 'app/components/Form';
import { Button, ButtonShadow } from 'app/components/Button';

interface Props {
  step?: number;
  isNoBackedUp?: boolean;
  onShow?: (seedPhrase: string, password: string) => void;
  onCancel: () => void;
}

export const EnterPassword: React.FC<Props> = React.memo(
  ({ step, isNoBackedUp, onShow, onCancel }) => {
    const { isWrongPassword } = useWrongPassword();
    const { seedPhrase } = useSeedPhrase();
    const {
      onLogoutWallet,
      onShowSeedPhrase,
      onClearIsWrongPassword,
      onClearSeedPhrase,
    } = useWalletActionHandlers();

    const [password, setPassword] = useState<string>('');

    useEffect(() => {
      return () => {
        onClearIsWrongPassword();
        onClearSeedPhrase();
      };
    }, []);

    useEffect(() => {
      if (seedPhrase) onShow(seedPhrase, password);
    }, [seedPhrase]);

    return (
      <Flex flex={1} flexDirection="column" pt="32px" pb="24px" px="32px">
        {isNoBackedUp && (
          <Flex mb="32px">
            <Flex>
              <Text color={colors.secondary} large bold>
                [
              </Text>
              <Text color={colors.primary} large bold>
                {step}
              </Text>
              <Text color={colors.secondary} large bold>
                ]
              </Text>
            </Flex>

            <Text ml="8px" large color={colors.gray7} bold>
              Glitch password
            </Text>
          </Flex>
        )}

        <Box p="16px" background={colors.geekBlue}>
          <Text fontSize="12px" color={colors.cyan5}>
            Are you sure that you want to log out your wallet from Glitch?
          </Text>

          <Box mt="16px">
            <Label>Glitch Password</Label>
            <PasswordInput
              isError={isWrongPassword}
              value={password}
              placeholder="Password"
              onChange={(e) => {
                const { value } = e.target;
                isWrongPassword && onClearIsWrongPassword();

                setPassword(value);
              }}
              msgError="Incorrect password"
            />
          </Box>
        </Box>

        {isNoBackedUp ? (
          <Flex mt="auto">
            <Button mr="16px" width="50%" variant="cancel" onClick={onCancel}>
              Cancel
            </Button>
            {password ? (
              <ButtonShadow
                width="50%"
                onClick={() => onShowSeedPhrase(password)}
              >
                Show
              </ButtonShadow>
            ) : (
              <Button width="50%" variant="disable-primary">
                Show
              </Button>
            )}
          </Flex>
        ) : (
          <Box mt="auto">
            <Button
              width="100%"
              variant={password ? 'warning' : 'disable-secondary'}
              onClick={() => onLogoutWallet(password)}
            >
              Log out
            </Button>
            <Button width="100%" mt="16px" variant="cancel" onClick={onCancel}>
              Cancel
            </Button>
          </Box>
        )}
      </Flex>
    );
  }
);
