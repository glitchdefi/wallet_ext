import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import logo from '../../../assets/img/gl_logo.png';
import { messages } from './messages';
import { Routes } from 'constants/routes';

// Components
import { Button, ButtonShadow } from 'app/components/Button';
import { Box, Flex } from 'app/components/Box';
import { NeedHelpContact } from 'app/components/Footer';
import { NetworkBox, TextGradient } from 'app/components/Shared';
import { PageLayout } from 'app/layouts';

const Welcome: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();

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
        pt="32px"
        pb="24px"
        px="32px"
      >
        <Flex flexDirection="column" alignItems="center">
          <img src={logo} width="200px" />
          <TextGradient mt="12px" mb="32px" bold>
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

export default Welcome;
