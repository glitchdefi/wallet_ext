import React from 'react';
import styled from 'styled-components';
import {
  useApplicationSlice,
  useLoadingApplication,
} from 'state/application/hooks';

import Spinner from './Spinner';

const LoadingApplication: React.FC = () => {
  useApplicationSlice();

  const { isLoading } = useLoadingApplication();

  if (isLoading)
    return (
      <Overlay>
        <Spinner size="36px" />
      </Overlay>
    );

  return null;
};

const Overlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 12, 23, 0.6);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
`;

export default LoadingApplication;
