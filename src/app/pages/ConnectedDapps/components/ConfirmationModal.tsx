import React from 'react';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';
import { space, typography } from 'styled-system';

import { colors } from 'theme/colors';

import { Box, Flex } from 'app/components/Box';
import { WarningIcon } from 'app/components/Svg';
import { Text, TextProps } from 'app/components/Text';
import { Button, ButtonShadow } from 'app/components/Button';

interface Props {
  type: 'connect' | 'disconnect' | 'remove';
  show: boolean;
  url: string;
  onCancel?(): void;
  onConfirm?(): void;
}

export const ConfirmationModal: React.FC<Props> = ({
  type,
  show,
  url,
  onCancel,
  onConfirm,
}) => {
  return (
    <StyledModal show={show} centered>
      <Flex alignItems="flex-start">
        <WarningIcon
          mr="17px"
          width="21px"
          height="21px"
          color={colors.orange}
        />
        <Box>
          <Text color={colors.gray9} large fontWeight="600" mb="8px">
            Confirmation
          </Text>

          {type === 'connect' ? (
            <Box>
              <ModalText color={colors.white} fontWeight="600" mr="6px">
                {url}
              </ModalText>
              <ModalText>would like to connect to your wallet</ModalText>
            </Box>
          ) : (
            <Box>
              <ModalText>Are you sure to disconnect to</ModalText>
              <ModalText mx="6px" color={colors.white} fontWeight="600">
                {url}
              </ModalText>
              <ModalText>?</ModalText>
            </Box>
          )}

          <Flex mt="32px" alignItems="center">
            <Button
              fontSize="14px"
              px="16px"
              py="5px"
              mr="16px"
              variant="cancel"
              width="100%"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <ConfirmButton width="100%" onClick={onConfirm}>
              {type === 'connect' ? 'Connect' : 'Confirm'}
            </ConfirmButton>
          </Flex>
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

const ConfirmButton = styled(ButtonShadow)`
  .btn-wrap {
    font-size: 14px;
    padding: 5px 0px;
  }
`;

const ModalText = styled.span<TextProps>`
  font-size: 14px;
  line-height: 22px;
  color: ${({ color }) => color || colors.gray6};
  ${space}
  ${typography}
`;
