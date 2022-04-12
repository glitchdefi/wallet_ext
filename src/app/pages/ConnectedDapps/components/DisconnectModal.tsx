import React from 'react';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';

import { colors } from 'theme/colors';

import { Box, Flex } from 'app/components/Box';
import { WarningIcon } from 'app/components/Svg';
import { Text } from 'app/components/Text';
import { Button, ButtonShadow } from 'app/components/Button';

interface Props {
  show: boolean;
  onCancel?(): void;
  onConfirm?(): void;
}

export const DisconnectModal: React.FC<Props> = ({
  show,
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
          <Text color={colors.gray6} mb="32px">
            Are you sure to disconnect to app.compound.finance?
          </Text>

          <Flex alignItems="center">
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
              Confirm
            </ConfirmButton>
          </Flex>
        </Box>
      </Flex>
    </StyledModal>
  );
};

const StyledModal = styled(Modal)`
  .modal-dialog {
    margin: 16px;
  }
  .modal-content {
    padding: 32px;
    border-radius: 0px;
    background-color: ${colors.gray2};
  }
`;

const ConfirmButton = styled(ButtonShadow)`
  .btn-wrap {
    font-size: 14px;
    padding: 5px 0px;
  }
`;
