import React from 'react';
import styled from 'styled-components';
import { colors } from 'theme/colors';
import { Text } from '../Text';
import { CheckIcon, CloseIcon } from '../Svg';
import Flex from '../Box/Flex';
import { AlertProps } from './types';
import { Button } from '../Button';

const Alert: React.FC<AlertProps> = ({ title, children, variant, onClick }) => {
  const getIcon = () => {
    switch (variant) {
      case 'success':
        return <CheckIcon mt="4px" width="16px" color={colors.green} />;

      case 'info':
        return null;

      case 'danger':
        return null;

      case 'warning':
        return null;
    }
  };

  return (
    <StyledAlert>
      <Details hasHandler={!!onClick}>
        {/* {title && <Text bold>{title}</Text>} */}
        <Flex alignItems="flex-start" mr="10px">
          {getIcon()}

          {typeof children === 'string' ? (
            <Text ml="10px">{children}</Text>
          ) : (
            children
          )}
        </Flex>

        {onClick && (
          <Button mt="5px" display="flex" p="0px" onClick={onClick}>
            <CloseIcon width="12px" color={colors.gray5} />
          </Button>
        )}
      </Details>
    </StyledAlert>
  );
};

const Details = styled.div<{ hasHandler: boolean }>`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
`;

const StyledAlert = styled(Flex)`
  position: relative;
  padding: 16px;
  background-color: ${colors.gray1};
  border: 1px solid ${colors.green};
`;

export default Alert;
