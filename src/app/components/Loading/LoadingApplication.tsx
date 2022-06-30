import React from 'react';
import styled from 'styled-components';
import { Loading } from './Loading';
interface Props {
  loading?: boolean;
}

const LoadingApplication: React.FC<Props> = ({ loading }) => {
  if (!loading) return null;

  return (
    <Overlay>
      <Loading />
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
  z-index: 1060;
`;

export default React.memo(
  LoadingApplication,
  (prevProps, nextProps) => prevProps.loading === nextProps.loading
);
