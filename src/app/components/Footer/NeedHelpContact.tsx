import React from 'react';
import { useTranslation } from 'react-i18next';
import { messages } from './message';

// Components
import { Flex } from '../Box';
import { Text } from '../Text';
import { colors } from '../../../theme/colors';
import styled from 'styled-components';

function NeedHelpContact() {
  const { t } = useTranslation();

  return (
    <Flex>
      <Text color={colors.gray6} fontSize="12px">
        {t(messages.needHelpContact())}
      </Text>
      <StyledText
        as="a"
        href="https://google.com"
        target="_blank"
        ml="6px"
        fontSize="12px"
        color={colors.primary}
        bold
      >
        {t(messages.glchFinanceSupport())}
      </StyledText>
    </Flex>
  );
}

const StyledText = styled(Text)`
  text-decoration: none;
`;

export default NeedHelpContact;
