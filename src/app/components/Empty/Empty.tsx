import React from 'react';
import { colors } from 'theme/colors';
import { Flex, FlexProps } from '../Box';
import { NotFoundIcon } from '../Svg';
import { Text } from '../Text';

interface Props extends FlexProps {
  message?: string;
}

const Empty: React.FC<Props> = ({ message, ...rest }) => {
  return (
    <Flex flexDirection="column" alignItems="center" {...rest}>
      <NotFoundIcon width="50px" />
      <Text fontSize="12px" color={colors.gray5} mt="24px">
        {message}
      </Text>
    </Flex>
  );
};

export default Empty;
