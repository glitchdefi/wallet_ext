import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { colors } from 'theme/colors';
import { showWalletSeed, walletValidate } from 'scripts/ui/messaging';
import { useApplication } from 'contexts/ApplicationContext/hooks';

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

  const { setAppLoading } = useApplication();
  const [password, setPassword] = useState<string>('');
  const [seed, setSeed] = useState<string>('');
  const [validPassword, setValidPassword] = useState<boolean>(true);

  const _onShowWalletSeed = () => {
    setAppLoading(true);

    walletValidate({ password }).then(async (valid: boolean) => {
      if (valid) {
        const seed = await showWalletSeed();
        setSeed(seed);
      }
      setAppLoading(false);
      setValidPassword(valid);
    });
  };
  return (
    <PageLayout>
      <Header onBack={() => history.push('/')} title="Reveal Mnemonic phrase" />

      <Flex position="relative" flex={1} flexDirection="column">
        <Box p="32px">
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
          {seed ? (
            <Box mt="16px">
              <MnemonicPhraseView
                label="Your Mnemonic phrase"
                seed={seed}
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
                  isError={!validPassword}
                  placeholder="Password"
                  onChange={(e) => {
                    const { value } = e.target;
                    !validPassword && setValidPassword(true);
                    setPassword(value);
                  }}
                  msgError="Incorrect password"
                />
              </Box>
            </Box>
          )}
        </Box>

        <Box
          position="absolute"
          left="0px"
          right="0px"
          bottom="0px"
          px="32px"
          pb="24px"
        >
          {seed ? (
            <Box onClick={() => history.push('/')}>
              <ButtonShadow width="100%">Done</ButtonShadow>
            </Box>
          ) : (
            <Flex>
              <Button
                mr="16px"
                width="50%"
                variant="cancel"
                onClick={() => history.push('/')}
              >
                Cancel
              </Button>
              {password ? (
                <ButtonShadow width="50%" onClick={_onShowWalletSeed}>
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
