import React from 'react';
import styled from 'styled-components';

import Spinner from './Spinner';

const LoadingApplication: React.FC = () => {
  return (
    <Overlay>
      <Spinner size="36px" />
    </Overlay>
  );
};

const Overlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 12, 23, 0.6);
  left: 0;
  bottom: 0;
  z-index: 999;
`;

export default LoadingApplication;
