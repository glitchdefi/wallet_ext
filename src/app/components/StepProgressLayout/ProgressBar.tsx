import React from 'react';
import styled from 'styled-components';
import { SpaceProps } from 'styled-system';
import { Box } from '../Box';

interface Props extends SpaceProps {
  percentage: number;
  height: string;
}

export function ProgressBar({ height, percentage, ...rest }: Props) {
  return (
    <ProgressBarContainer height={height} {...rest}>
      <ProgressBarIndicator style={{ width: `${percentage}%` }} />
    </ProgressBarContainer>
  );
}

const ProgressBarContainer = styled(Box)`
  background-color: #1c2a2f;
  position: relative;
`;

const ProgressBarIndicator = styled.div`
  height: 100%;
  -webkit-mask: linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0);

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(to right, #00ffff, #f100f5, #f100f5);
  }
`;
