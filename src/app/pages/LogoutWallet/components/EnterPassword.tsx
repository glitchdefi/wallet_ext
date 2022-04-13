import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useApplication } from 'contexts/ApplicationContext/hooks';

import { Flex, Box } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { colors } from 'theme/colors';
import { Label, PasswordInput } from 'app/components/Form';
import { Button, ButtonShadow } from 'app/components/Button';
import { useWallet } from 'contexts/WalletContext/hooks';
import { showWalletSeed, walletValidate } from 'scripts/ui/messaging';
interface Props {
  step?: number;
  isNoBackedUp?: boolean;
  onShow?: (seed: string) => void;
  onCancel: () => void;
}

export const EnterPassword: React.FC<Props> = React.memo(
  ({ step, isNoBackedUp, onShow, onCancel }) => {
    const history = useHistory();
    const { setAppLoading } = useApplication();
    const { onLogoutWallet } = useWallet();

    const [seed, setSeed] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [validPassword, setValidPassword] = useState<boolean>(true);

    useEffect(() => {
      if (seed) onShow(seed);
    }, [seed]);

    const onShowSeedClick = () => {
      setAppLoading(true);

      walletValidate({ password }).then(async (valid) => {
        if (valid) {
          const seed = await showWalletSeed();
          setSeed(seed);
        }
        setAppLoading(false);
        setValidPassword(valid);
      });
    };

    const onLogoutClick = () => {
      setAppLoading(true);

      walletValidate({ password }).then((valid) => {
        if (valid) {
          onLogoutWallet(history);
        } else {
          setAppLoading(false);
        }
        setValidPassword(valid);
      });
    };

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
            {isNoBackedUp
              ? 'Please enter the Glitch password to proceed.'
              : 'Are you sure that you want to log out your wallet from Glitch?'}
          </Text>

          <Box mt="16px">
            <Label>Glitch Password</Label>
            <PasswordInput
              isError={!validPassword}
              value={password}
              placeholder="Password"
              onChange={(e) => {
                const { value } = e.target;
                setPassword(value);
                !validPassword && setValidPassword(true);
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
              <ButtonShadow width="50%" onClick={onShowSeedClick}>
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
              onClick={onLogoutClick}
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
