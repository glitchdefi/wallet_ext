import React from 'react';
import styled from 'styled-components';
import { colors } from 'theme/colors';

export const Loading: React.FC = () => {
  return <Wrapper />;
};

const Wrapper = styled.div`
  position: relative;
  text-indent: -9999em;
  border-top: 0.4em solid rgba(255, 255, 255, 0.2);
  border-right: 0.4em solid rgba(255, 255, 255, 0.2);
  border-bottom: 0.4em solid rgba(255, 255, 255, 0.2);
  border-left: 0.4em solid ${colors.primary};
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 0.5s infinite linear;
  animation: load8 0.5s infinite linear;
  border-radius: 50%;
  width: 3em;
  height: 3em;

  &:after {
    border-radius: 50%;
    width: 3em;
    height: 3em;
  }

  @-webkit-keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;
