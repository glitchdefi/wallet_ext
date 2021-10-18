import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import logo from '../../../assets/img/gl_logo.png';
import { messages } from './messages';
import { Routes } from '../../../constants/routes';

// Theme
import { colors } from '../../../theme/colors';

// Components
import { Text } from '../../components/Text';
import { Button, ButtonShadow } from '../../components/Button';
import { Box, Flex } from '../../components/Box';
import { NeedHelpContact } from '../../components/Footer';

function Welcome(): JSX.Element {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <Container>
      <Flex mt="48px" alignItems="center" flexDirection="column" px="32px">
        <img src={logo} width="200px" />
        <TextGradient mt="12px" bold>
          {t(messages.title())}
        </TextGradient>

        <ButtonShadow
          mt="72px"
          width="100%"
          onClick={() =>
            history.push(Routes.internetWarning, { route: Routes.createWallet })
          }
        >
          {t(messages.createWallet())}
        </ButtonShadow>
        <Button
          mt="24px"
          width="100%"
          variant="secondary"
          onClick={() =>
            history.push(Routes.internetWarning, { route: Routes.restoreWallet })
          }
        >
          {t(messages.restoreWallet())}
        </Button>

        <Box pb="24px" mt="100px">
          <NeedHelpContact />
        </Box>
      </Flex>
    </Container>
  );
}

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

export default Welcome;
