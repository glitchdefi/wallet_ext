import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import logo from '../../../assets/img/gl_logo.png';
import { messages } from './messages';
import { Routes } from 'constants/routes';

// Theme
import { colors } from 'theme/colors';

// Components
import { Text } from 'app/components/Text';
import { Button, ButtonShadow } from 'app/components/Button';
import { Box, Flex } from 'app/components/Box';
import { NeedHelpContact } from 'app/components/Footer';
import { NetworkBox } from 'app/components/Shared';
import { PageLayout } from 'app/layouts';

const Welcome: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <PageLayout hasOverlay={false}>
      <NetworkBox />

      <Flex
        flex={1}
        alignItems="center"
        flexDirection="column"
        justifyContent="space-between"
        pt="32px"
        pb="24px"
        px="32px"
      >
        <Flex flexDirection="column" alignItems="center">
          <img src={logo} width="200px" />
          <TextGradient mt="12px" bold>
            {t(messages.title())}
          </TextGradient>

          <ButtonShadow
            mt="72px"
            width="100%"
            onClick={() =>
              history.push(Routes.internetWarning, {
                route: Routes.createWallet,
              })
            }
          >
            {t(messages.createWallet())}
          </ButtonShadow>
          <Button
            mt="24px"
            width="100%"
            variant="secondary"
            onClick={() =>
              history.push(Routes.internetWarning, {
                route: Routes.restoreWallet,
              })
            }
          >
            {t(messages.restoreWallet())}
          </Button>
        </Flex>

        <NeedHelpContact />
      </Flex>
    </PageLayout>
  );
};

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

  -webkit-animation: hue 5s infinite linear;
`;

export default Welcome;
