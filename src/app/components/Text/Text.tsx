import styled from 'styled-components';
import { space, typography, layout } from 'styled-system';
import { TextProps } from './types';
import { colors } from '../../../theme/colors';

const getFontSize = ({ fontSize, large }: TextProps) => {
  return large ? '16px' : fontSize || '14px';
};

const Text = styled.div<TextProps>`
  color: ${({ color }) => color};
  font-size: ${getFontSize};
  font-weight: ${({ bold }) => (bold ? 600 : 400)};
  line-height: 1.5;
  font-feature-settings: 'zero' on;
  text-decoration: none;
  word-break: break-word;
  &:hover {
    color: ${({ color }) => color};
  }
  ${({ textTransform }) => textTransform && `text-transform: ${textTransform};`}
  ${({ ellipsis }) =>
    ellipsis &&
    `white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;`}
    
  ${space}
  ${typography}
  ${layout}
`;

Text.defaultProps = {
  color: colors.gray9,
  large: false,
  ellipsis: false,
};

export default Text;
