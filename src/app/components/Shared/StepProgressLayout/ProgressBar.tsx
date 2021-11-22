import React from 'react';
import styled from 'styled-components';
import { SpaceProps } from 'styled-system';
import { colors } from 'theme/colors';

import { Box } from 'app/components/Box';

interface Props extends SpaceProps {
  percentage: number;
  height: string;
}

export const ProgressBar: React.FC<Props> = ({
  height,
  percentage,
  ...rest
}) => {
  return (
    <ProgressBarContainer height={height} {...rest}>
      <ProgressBarIndicator
        percentage={percentage}
        style={{ width: `${percentage}%` }}
      />
    </ProgressBarContainer>
  );
};

const ProgressBarContainer = styled(Box)`
  background-color: ${colors.gray2};
  position: relative;
`;

const ProgressBarIndicator = styled.div<{ percentage?: number }>`
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
    background-image: linear-gradient(
      to right,
      ${colors.primary},
      ${({ percentage }) =>
        percentage > 60 ? colors.primary : colors.secondary},
      ${colors.secondary},
      ${colors.secondary}
    );
  }
`;
