import React from 'react';

import { colors } from 'theme/colors';

import { Flex } from 'app/components/Box';
import { LeftArrowIcon } from 'app/components/Svg';
import { Text } from 'app/components/Text';
import { Button } from 'app/components/Button';

interface Props {
  onBack?: () => void;
  title?: string;
}

const Header: React.FC<Props> = ({ onBack, title }) => {
  return (
    <Flex
      alignItems="center"
      borderBottom={`1px solid ${colors.magenta2}`}
      p="16px"
    >
      <Button p="0px" onClick={() => onBack && onBack()}>
        <LeftArrowIcon width="13px" />
      </Button>
      <Text mt="3px" bold ml="16px" color={colors.gray7}>
        {title}
      </Text>
    </Flex>
  );
};

export default React.memo(Header);
