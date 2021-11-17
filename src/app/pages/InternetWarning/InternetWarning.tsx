import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router';

import { colors } from 'theme/colors';

import { Routes } from 'constants/routes';

// Components
import { PageLayout } from 'app/layouts';
import { Flex, Box } from 'app/components/Box';
import { CloseIcon } from 'app/components/Svg';
import { Text } from 'app/components/Text';
import { Button, ButtonShadow } from 'app/components/Button';
import { NeedHelpContact } from 'app/components/Footer';
import { messages } from './message';

const InternetWarning: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation<{ route: string }>();
  const { state } = location;

  const isRedirectCreateWallet = state.route === Routes.createWallet;
  const descType = isRedirectCreateWallet
    ? t(messages.createANew())
    : t(messages.importA());

  return (
    <PageLayout>
      <Flex alignItems="center" justifyContent="flex-end" px="16px" py="22px">
        <Button px="8px" onClick={() => history.goBack()}>
          <CloseIcon fill={colors.primary} />
        </Button>
      </Flex>

      <Flex
        flex={1}
        flexDirection="column"
        justifyContent="space-between"
        pt="48px"
        pb="24px"
        px="32px"
      >
        <Box>
          <Text fontSize="20px" color={colors.orange} bold>
            {t(messages.title())}
          </Text>
          <Text mt="16px" color={colors.gray7} fontSize="14px">
            {t(messages.desc(), { type: descType })}
          </Text>

          <ButtonShadow
            mt="32px"
            width="50%"
            onClick={() => history.push(state.route)}
          >
            {t(messages.ok())}
          </ButtonShadow>
        </Box>

        <Flex alignItems="center" justifyContent="center">
          <NeedHelpContact />
        </Flex>
      </Flex>
    </PageLayout>
  );
};

export default InternetWarning;
