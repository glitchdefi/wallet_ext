import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router';

import { colors } from '../../../theme/colors';

import { Routes } from '../../../constants/routes';

// Components
import { Flex, Box } from '../../components/Box';
import { CloseIcon } from '../../components/Svg';
import { Text } from '../../components/Text';
import { Button, ButtonShadow } from '../../components/Button';
import { NeedHelpContact } from '../../components/Footer';
import { messages } from './message';

function InternetWarning() {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation<{ route: string }>();
  const { state } = location;

  const isRedirectCreateWallet = state?.route === Routes.createWallet;
  const descType = isRedirectCreateWallet
    ? t(messages.createANew())
    : t(messages.importA());

  return (
    <div>
      <Flex alignItems="center" justifyContent="flex-end" px="16px" py="22px">
        <Button px="8px" onClick={() => history.goBack()}>
          <CloseIcon />
        </Button>
      </Flex>

      <Box pt="48px" px="32px">
        <Text fontSize="20px" color={colors.orange} bold>
          {t(messages.title())}
        </Text>
        <Text mt="16px" color={colors.gray7} fontSize="14px">
          {t(messages.desc(), { type: descType })}
        </Text>

        <ButtonShadow mt="32px" width="50%">
          {t(messages.ok())}
        </ButtonShadow>
      </Box>

      <Flex
        pb="24px"
        mt="100px"
        alignItems="center"
        justifyContent="center"
        px="32px"
      >
        <NeedHelpContact />
      </Flex>
    </div>
  );
}

export default InternetWarning;
