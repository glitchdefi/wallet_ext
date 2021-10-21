import styled from 'styled-components';
import { background, border, layout, position, space } from 'styled-system';
import { BoxProps } from 'app/components/Box';

const Page = styled.div<BoxProps>`
  background-color: rgba(0, 12, 23, 0.6);
  ${background}
  ${border}
  ${layout}
  ${position}
  ${space}
`;

export default Page;
