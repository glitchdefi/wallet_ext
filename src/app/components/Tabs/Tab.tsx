import { Tab as ReactTab } from 'react-tabs';
import styled from 'styled-components';
import { colors } from 'theme/colors';

export const Tab = styled(ReactTab)<{ isactive?: string }>`
  user-select: none;
  padding-top: 8px;
  padding-bottom: ${({ isactive }) => (isactive === 'true' ? '10px' : '11px')};
  cursor: pointer;
  border-bottom: ${({ isactive }) =>
    isactive === 'true' && `1px solid ${colors.primary}`};

  div {
    transition: all 0.5s;

    color: ${({ isactive }) =>
      isactive === 'true' ? colors.primary : colors.gray6};
  }
`;
