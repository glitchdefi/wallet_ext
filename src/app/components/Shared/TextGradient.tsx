import styled from 'styled-components';
import { colors } from 'theme/colors';
import { Text } from '../Text';

const TextGradient = styled(Text)`
  font-size: 20px;
  background-image: linear-gradient(
    45deg,
    ${colors.shadow2} 20%,
    ${colors.shadow1} 80%
  );
  -webkit-background-clip: text;
  -webkit-background-clip: text;
  color: transparent;

  background-size: 400% 400%;
  -webkit-animation: gradient 8s ease infinite;
`;

export default TextGradient;
