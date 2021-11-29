import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { Routes } from 'constants/routes';
import { colors } from 'theme/colors';

import {
  useSeedPhrase,
  useWalletActionHandlers,
  useWrongPassword,
} from 'state/wallet/hooks';

// Components
import { PageLayout } from 'app/layouts';
import { Box, Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { Button, ButtonShadow } from 'app/components/Button';
import { MessageBox } from 'app/components/MessageBox';
import { Label, PasswordInput } from 'app/components/Form';
import { Header, MnemonicPhraseView } from 'app/components/Shared';

const RevealMnemonicPhrase: React.FC = React.memo(() => {
  const history = useHistory();

  const { isWrongPassword } = useWrongPassword();
  const { seedPhrase } = useSeedPhrase();
  const { onShowSeedPhrase, onClearIsWrongPassword, onClearSeedPhrase } =
    useWalletActionHandlers();

  const [password, setPassword] = useState('');
  const [showSeedPhrase, setShowSeedPhrase] = useState(false);

  useEffect(() => {
    if (seedPhrase) setShowSeedPhrase(true);
  }, [seedPhrase]);

  useEffect(() => {
    return () => {
      onClearIsWrongPassword();
      onClearSeedPhrase();
    };
  }, []);

  return (
    <PageLayout>
      <Header
        onBack={() => history.push(Routes.home)}
        title="Reveal Mnemonic phrase"
      />

      <Flex height="543px" flexDirection="column" overflowY="scroll">
        <Box height="503px" overflowY="scroll" p="32px">
          <MessageBox
            textComponent={
              <Box ml="10px">
                <Text color={colors.orange} fontSize="12px">
                  Never share your Mnemonic phrase! Anyone who has it can access
                  your funds from anywhere.
                </Text>

                <Text mt="10px" color={colors.orange} fontSize="12px">
                  This is the ONLY way to restore your account by using your
                  Mnemonic phrase when you have lost your password or reinstall
                  Glitch wallet.
                </Text>
              </Box>
            }
          />
          {showSeedPhrase ? (
            <Box mt="16px">
              <MnemonicPhraseView
                label="Your Mnemonic phrase"
                seed={seedPhrase}
                background={colors.geekBlue}
              />
            </Box>
          ) : (
            <Box p="16px" background={colors.geekBlue} mt="16px">
              <Text fontSize="12px" color={colors.cyan5}>
                Please enter the Glitch password to view your Mnemonic phrase.
              </Text>

              <Box mt="16px">
                <Label>Glitch password</Label>
                <PasswordInput
                  isError={isWrongPassword}
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
          )}
        </Box>

        <Box px="32px" pb="24px">
          {showSeedPhrase ? (
            <Box mt="auto" onClick={() => history.push(Routes.home)}>
              <ButtonShadow width="100%">Done</ButtonShadow>
            </Box>
          ) : (
            <Flex mt="auto">
              <Button
                mr="16px"
                width="50%"
                variant="cancel"
                onClick={() => history.push(Routes.home)}
              >
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
          )}
        </Box>
      </Flex>
    </PageLayout>
  );
});

export default RevealMnemonicPhrase;
