import React from 'react';
import styled from 'styled-components';
import { background, border, layout, position, space } from 'styled-system';
import { BoxProps, Flex, FlexProps } from 'app/components/Box';

interface Props extends FlexProps {}

export const Page: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <PageWrap>
      <Flex width="100%" height="100%" flexDirection="column" {...rest}>
        {children}
      </Flex>
    </PageWrap>
  );
};

const PageWrap = styled.div<BoxProps>`
  background-color: rgba(0, 12, 23, 0.6);
  display: flex;
  flex: 1;
`;

export default Page;
