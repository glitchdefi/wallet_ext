import React from 'react';

import { Flex } from 'app/components/Box';
import { GradientBorder } from 'app/components/Svg';

interface Props {
  src: string;
}

const Avatar: React.FC<Props> = ({ src }) => {
  return (
    <Flex position="relative" alignItems="center" justifyContent="center">
      <GradientBorder width="40px" />
      <img style={{ position: 'absolute' }} src={src} width="32px" />
    </Flex>
  );
};

export default Avatar;
