import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import logo from '../../../assets/img/gl_logo.png';
import { messages } from './messages';
import { Routes } from 'constants/routes';

import { useWallet } from 'contexts/WalletContext/hooks';
import { useApplication } from 'contexts/ApplicationContext/hooks';
import { walletValidate } from 'scripts/ui/messaging';
// Theme
import { colors } from 'theme/colors';

// Components
import { Text } from 'app/components/Text';
import { Button, ButtonShadow } from 'app/components/Button';
import { Box, Flex } from 'app/components/Box';
import { NeedHelpContact } from 'app/components/Footer';
import { Label, PasswordInput } from 'app/components/Form';
import { ExpandButton, NetworkBox, TextGradient } from 'app/components/Shared';
import { PageLayout } from 'app/layouts';

const Unlock: React.FC = () => {
  const history = useHistory();
  const { setAppLoading } = useApplication();
  const { t } = useTranslation();
  const { onUnlockWallet } = useWallet();

  const [password, setPassword] = useState<string>('');
  const [isPassValid, setIsPassValid] = useState<boolean>(true);

  const _unlockWallet = () => {
    setAppLoading(true);

    walletValidate({ password }).then((isValid: boolean) => {
      if (isValid) {
        onUnlockWallet(history);
      } else {
        setAppLoading(false);
      }
      setIsPassValid(isValid);
    });
  };

  // Trigger when user enter
  const onKeyPress = (event: { keyCode: any; which: any }) => {
    const code = event.keyCode || event.which;
    if (code === 13 && password) {
      _unlockWallet();
    }
  };

  return (
    <PageLayout hasOverlay={false}>
      <Flex alignItems="center" p="16px">
        <Box mr="16px">
          <ExpandButton />
        </Box>
        <NetworkBox />
      </Flex>

      <Flex
        flex={1}
        alignItems="center"
        flexDirection="column"
        justifyContent="space-between"
        px="32px"
        pb="24px"
      >
        <Flex alignItems="center" flexDirection="column">
          <img src={logo} width="200px" />
          <TextGradient mt="12px" mb="16px" bold>
            {t(messages.title())}
          </TextGradient>

          <Box mt="16px" py="16px">
            <Text fontSize="12px" color={colors.cyan5}>
              {t(messages.lockedMsg())}
            </Text>

            <Box mt="16px">
              <Label>{t(messages.glitchPassword())}</Label>
              <PasswordInput
                isError={!isPassValid}
                value={password}
                placeholder={t(messages.password())}
                onChange={(e) => {
                  const { value } = e.target;
                  setPassword(value);
                  !isPassValid && setIsPassValid(true);
                }}
                msgError={t(messages.incorrectPassword())}
                onKeyPress={onKeyPress}
              />

              <Box mt="32px">
                {!password ? (
                  <Button width="100%" variant="disable-primary">
                    {t(messages.unlock())}
                  </Button>
                ) : (
                  <ButtonShadow width="100%" onClick={_unlockWallet}>
                    {t(messages.unlock())}
                  </ButtonShadow>
                )}
              </Box>
            </Box>
          </Box>
        </Flex>

        <Box>
          <Flex justifyContent="center" alignItems="center">
            <Text fontSize="12px">{t(messages.or())}</Text>
            <Button
              ml="8px"
              py="0px"
              onClick={() => {
                history.push(Routes.restoreWallet);
              }}
            >
              <Text fontSize="12px" color={colors.primary} bold>
                {t(messages.restoreWallet()).toLocaleLowerCase()}
              </Text>
            </Button>
          </Flex>

          <Box mt="12px">
            <NeedHelpContact />
          </Box>
        </Box>
      </Flex>
    </PageLayout>
  );
};

export default React.memo(Unlock);
