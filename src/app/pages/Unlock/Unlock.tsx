import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import logo from '../../../assets/img/gl_logo.png';
import { messages } from './messages';
import { Routes } from 'constants/routes';

import { useWallet } from 'contexts/WalletContext/hooks';

import { walletValidate } from 'scripts/ui/messaging';
// Theme
import { colors } from 'theme/colors';

// Components
import { Text } from 'app/components/Text';
import { Button, ButtonShadow } from 'app/components/Button';
import { Box, Flex } from 'app/components/Box';
import { NeedHelpContact } from 'app/components/Footer';
import { Label, PasswordInput } from 'app/components/Form';
import { NetworkBox, TextGradient } from 'app/components/Shared';
import { PageLayout } from 'app/layouts';

const Unlock: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const { walletCtx } = useWallet();
  const { onUnlockWallet } = useWallet();

  const [password, setPassword] = useState<string>('');
  const [isPassValid, setIsPassValid] = useState<boolean>(true);

  useEffect(() => {
    if (!walletCtx?.isLocked) {
      history.push(Routes.home);
    }
  }, [walletCtx]);

  // Trigger when user enter
  const onKeyPress = (event: { keyCode: any; which: any }) => {
    const code = event.keyCode || event.which;
    if (code === 13 && password) {
      walletValidate({ password }).then((isValid: boolean) => {
        if (isValid) {
          onUnlockWallet();
        }
        setIsPassValid(isValid);
      });
    }
  };

  return (
    <PageLayout hasOverlay={false}>
      <Box p="16px">
        <NetworkBox />
      </Box>

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
                  <ButtonShadow
                    width="100%"
                    onClick={() => {
                      walletValidate({ password }).then((isValid: boolean) => {
                        if (isValid) {
                          onUnlockWallet();
                        }
                        setIsPassValid(isValid);
                      });
                    }}
                  >
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
