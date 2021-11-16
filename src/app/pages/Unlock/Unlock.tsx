import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import logo from '../../../assets/img/gl_logo.png';
import { messages } from './messages';
import { Routes } from 'constants/routes';

import { useWalletActionHandlers, useWrongPassword } from 'state/wallet/hooks';

// Theme
import { colors } from 'theme/colors';

// Components
import { Text } from 'app/components/Text';
import { Button, ButtonShadow } from 'app/components/Button';
import { Box, Flex } from 'app/components/Box';
import { NeedHelpContact } from 'app/components/Footer';
import { Label, PasswordInput } from 'app/components/Form';
import { DownArrowIcon } from 'app/components/Svg';

const Unlock: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const { isWrongPassword } = useWrongPassword();
  const { onClearIsWrongPassword, onUnlockWallet } = useWalletActionHandlers();

  const [password, setPassword] = useState<string>('');

  return (
    <Container>
      <Box p="16px">
        <Flex
          width="fit-content"
          alignItems="center"
          p="8px"
          border={`1px solid ${colors.gray2}`}
        >
          <Box
            width="10px"
            height="10px"
            borderRadius="5px"
            background={colors.green}
          />
          <Text mx="8px" fontSize="12px">
            Glitch Testnet
          </Text>
          <DownArrowIcon width="12px" color={colors.gray7} />
        </Flex>
      </Box>

      <Flex mt="16px" alignItems="center" flexDirection="column" px="32px">
        <img src={logo} width="200px" />
        <TextGradient mt="12px" bold>
          {t(messages.title())}
        </TextGradient>

        <Box mt="16px" py="16px">
          <Text fontSize="12px" color={colors.cyan5}>
            {t(messages.lockedMsg())}
          </Text>

          <Box mt="16px">
            <Label>{t(messages.glitchPassword())}</Label>
            <PasswordInput
              isError={isWrongPassword}
              value={password}
              placeholder={t(messages.password())}
              onChange={(e) => {
                const { value } = e.target;

                setPassword(e.target.value);
                !value && onClearIsWrongPassword();
              }}
              msgError={t(messages.incorrectPassword())}
            />

            <Box mt="32px">
              {!password ? (
                <Button width="100%" variant="disable-primary">
                  {t(messages.unlock())}
                </Button>
              ) : (
                <ButtonShadow
                  width="100%"
                  onClick={() => onUnlockWallet(password)}
                >
                  {t(messages.unlock())}
                </ButtonShadow>
              )}
            </Box>
          </Box>
        </Box>

        <Box pb="24px" mt="32px">
          <Flex justifyContent="center" alignItems="center">
            <Text fontSize="12px">{t(messages.or())}</Text>
            <Button
              ml="8px"
              py="0px"
              onClick={() => {
                isWrongPassword && onClearIsWrongPassword();
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
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const TextGradient = styled(Text)`
  font-size: 20px;
  background-image: linear-gradient(
    45deg,
    ${colors.shadow2} 20%,
    ${colors.shadow1} 80%
  );
  -webkit-background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 32px;
`;

export default Unlock;
