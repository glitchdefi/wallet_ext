import React from 'react';
import ReactTooltip, { TooltipProps } from 'react-tooltip';
import styled from 'styled-components';
import { colors } from 'theme/colors';
interface Props extends TooltipProps {
  children?: React.ReactNode;
  width?: string;
}

const Tooltip: React.FC<Props> = ({ children, className, ...rest }) => {
  return children ? (
    <StyledTooltip
      className={`glch-tooltip ${className}`}
      place="top"
      effect="solid"
      backgroundColor={colors.gray2}
      {...rest}
    >
      {children}
    </StyledTooltip>
  ) : (
    <StyledTooltip
      className={`glch-tooltip ${className}`}
      place="top"
      effect="solid"
      backgroundColor={colors.gray2}
      {...rest}
    />
  );
};

const StyledTooltip = styled(ReactTooltip)<{ width?: string }>`
  padding: 12px;
  opacity: 1 !important;
  text-align: center;
  width: ${({ width }) => width && width};
`;

export default Tooltip;
