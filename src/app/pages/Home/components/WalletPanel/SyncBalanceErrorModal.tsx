import React from 'react';
import { Modal } from 'react-bootstrap';
import styled from 'styled-components';

import { Box, Flex } from 'app/components/Box';

import { colors } from 'theme/colors';
import { Text } from 'app/components/Text';
import { ButtonShadow } from 'app/components/Button';
import { WarningIcon } from 'app/components/Svg';

export const SyncBalanceErrorModal: React.FC = () => {
  return (
    <StyledModal show={false} centered>
      <Flex>
        <Flex mt="2px" mr="18px">
          <WarningIcon color={colors.orange} width="21px" height="21px" />
        </Flex>
        <Box>
          <Text mb="8px" large bold>
            Error
          </Text>
          <Text mb="10px" color={colors.gray6}>
            Something went wrong. But don’t worry, your balance is safe!
          </Text>
          <Text mb="32px" color={colors.gray6}>
            Please check your internet connection and try again later.
          </Text>
          <ButtonShadow>
            <Box px="32px">
              <Text color={colors.gray1} bold>
                OK
              </Text>
            </Box>
          </ButtonShadow>
        </Box>
      </Flex>
    </StyledModal>
  );
};

const StyledModal = styled(Modal)`
  overflow-y: hidden;

  .modal-dialog {
    margin: 16px;
  }
  .modal-content {
    padding: 32px;
    border-radius: 0px;
    background-color: ${colors.gray2};
  }
  @media only screen and (min-width: 375px) {
    .modal-dialog {
      margin: 0px auto;
      padding-left: 16px;
      padding-right: 16px;
    }
  }
  @media only screen and (min-width: 768px) {
    .modal-dialog {
      padding-left: 0px;
      padding-right: 0px;
      max-width: 712px;
    }
  }
`;
