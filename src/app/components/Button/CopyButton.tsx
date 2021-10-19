import React from 'react';
import { SpaceProps } from 'styled-system';

import Button from './Button';
import { CopyIcon } from '../Svg';

interface Props extends SpaceProps {
  width?: string;
}

function CopyButton({ width, ...rest }: Props) {
  return (
    <Button p="0px" {...rest}>
      <CopyIcon width={width} />
    </Button>
  );
}

export default CopyButton;
