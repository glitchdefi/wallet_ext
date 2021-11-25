import React from 'react';
import styled from 'styled-components';
import { SpaceProps } from 'styled-system';
import { colors } from 'theme/colors';

import { Flex } from '../Box';
import { WarningIcon } from '../Svg';
import { Text } from '../Text';

interface Props extends SpaceProps {
  message?: string;
  textColor?: string;
  textComponent?: React.ReactNode;
}

const MessageBox: React.FC<Props> = (props) => {
  const { message, textColor, textComponent, ...rest } = props;

  return (
    <MsgBoxContainer {...rest}>
      <WarningIcon color={colors.orange} pt="3px" width="16px" />
      {React.isValidElement(textComponent) ? (
        React.cloneElement(textComponent)
      ) : (
        <Text color={textColor} ml="10px" fontSize="12px">
          {message}
        </Text>
      )}
    </MsgBoxContainer>
  );
};

const MsgBoxContainer = styled(Flex)`
  padding: 6px 16px;
  align-items: flex-start;
  border: 1px solid ${colors.orange};
  background-color: ${colors.gray1};
`;

export default MessageBox;
