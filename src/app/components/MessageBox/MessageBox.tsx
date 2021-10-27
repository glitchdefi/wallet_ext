import React from 'react';
import styled from 'styled-components';
import { SpaceProps } from 'styled-system';

import { Flex } from '../Box';
import { WarningIcon } from '../Svg';
import { Text } from '../Text';

interface Props extends SpaceProps {
  message: string;
}

const MessageBox: React.FC<Props> = (props) => {
  const { message, ...rest } = props;

  return (
    <MsgBoxContainer {...rest}>
      <WarningIcon pt="3px" width="16px" />
      <Text ml="10px" fontSize="12px">
        {message}
      </Text>
    </MsgBoxContainer>
  );
};

const MsgBoxContainer = styled(Flex)`
  padding: 6px 16px;
  align-items: flex-start;
  border: 1px solid #d87a16;
`;

export default MessageBox;
