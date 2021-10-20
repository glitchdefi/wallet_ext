import React from 'react';
import ReactTooltip, { TooltipProps } from 'react-tooltip';
import styled from 'styled-components';
import { colors } from 'theme/colors';

interface Props extends TooltipProps {
  children?: React.ReactNode;
}

const Tooltip: React.FC<Props> = ({ children, className, ...rest }) => {
  return (
    <Wrapper>
      {children ? (
        <ReactTooltip
          className={`glch-tooltip ${className}`}
          place="top"
          effect="solid"
          backgroundColor={colors.gray2}
          {...rest}
        >
          {children}
        </ReactTooltip>
      ) : (
        <ReactTooltip
          className={`glch-tooltip ${className}`}
          place="top"
          effect="solid"
          backgroundColor={colors.gray2}
          {...rest}
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .glch-tooltip {
    padding: 12px;
    opacity: 1 !important;
    width: 3rem;
    text-align: center;
  }
`;

export default Tooltip;
