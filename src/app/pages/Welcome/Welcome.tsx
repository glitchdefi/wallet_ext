import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import logo from '../../../assets/img/gl_logo.png';
import { messages } from './message';

// Components
import { Text } from '../../components/Text';

function Welcome(): JSX.Element {
  const { t } = useTranslation();

  return (
    <Container>
      <img src={logo} width="200px" />
      <Text mt="12px" color="white" fontSize="20px" bold>
        {t(messages.title())}
      </Text>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #333;
  align-items: center;
`;

export default Welcome;
