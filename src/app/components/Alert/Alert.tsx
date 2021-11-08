import React from 'react';
import styled from 'styled-components';
import { Text } from '../Text';
import { CloseIcon } from '../Svg';
import Flex from '../Box/Flex';
import { AlertProps, variants } from './types';
import { Button } from '../Button';
import { colors } from 'theme/colors';

const Alert: React.FC<AlertProps> = ({ title, children, variant, onClick }) => {
  return (
    <StyledAlert>
      <Details hasHandler={!!onClick}>
        {title && <Text bold>{title}</Text>}
        {typeof children === 'string' ? <Text>{children}</Text> : children}
      </Details>
      {onClick && (
        <Button p="0px" onClick={onClick}>
          <CloseIcon width="14px" color={colors.gray5} />
        </Button>
      )}
    </StyledAlert>
  );
};

const Details = styled.div<{ hasHandler: boolean }>`
  flex: 1;
`;

const StyledAlert = styled(Flex)`
  position: relative;
  padding: 16px;
  background-color: ${colors.gray1};
  border: 1px solid ${colors.green};
`;

export default Alert;
