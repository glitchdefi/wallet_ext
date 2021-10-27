import React from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import { colors } from 'theme/colors';

import { Box, BoxProps } from '../Box';

interface Props extends BoxProps {
  isOpen: boolean;
  onRequestClose?(event: React.MouseEvent | React.KeyboardEvent): void;
}

const Modal: React.FC<Props> = ({
  isOpen,
  onRequestClose,
  children,
  ...rest
}) => {
  return (
    <>
      {/* <Overlay /> */}
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={{
          overlay: {
            backgroundColor: 'transparent',
            position: undefined,
          },
        }}
        contentElement={(props, children) => (
          <StyledContent {...props} {...rest}>
            {children}
          </StyledContent>
        )}
      >
        {children}
      </ReactModal>
    </>
  );
};

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
`;

const StyledContent = styled(Box)`
  padding: 0px !important;
  background-color: ${colors.gray1} !important;
  border: none !important;
  border-radius: 0px !important;
  inset: 16px !important;
  top: 0px !important;
  right: 16px !important;
  left: 16px !important;
`;

export default Modal;
