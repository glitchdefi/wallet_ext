import React from 'react';
import styled from 'styled-components';
import { Flex, FlexProps } from 'app/components/Box';

interface Props extends FlexProps {
  hasOverlay?: boolean;
}

export const Page: React.FC<Props> = ({ children, hasOverlay, ...rest }) => {
  return (
    <PageWrap hasOverlay={hasOverlay}>
      <Flex width="100%" minHeight="100%" flexDirection="column" {...rest}>
        {children}
      </Flex>
    </PageWrap>
  );
};

const PageWrap = styled.div<{ hasOverlay?: boolean }>`
  background-color: ${({ hasOverlay }) =>
    hasOverlay ? 'rgba(0, 12, 23, 0.6)' : 'transparent'};
  display: flex;
  flex: 1;
`;

Page.defaultProps = {
  hasOverlay: true,
};

export default Page;
