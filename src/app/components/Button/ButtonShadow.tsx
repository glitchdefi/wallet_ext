import React from 'react';
import styled from 'styled-components';
import { LayoutProps, SpaceProps, TypographyProps } from 'styled-system';
import StyledButton from './StyledButton';
import { colors } from '../../../theme/colors';

interface Props extends LayoutProps, SpaceProps, TypographyProps {
  onClick?: () => void;
  children?: React.ReactNode;
}

function ButtonShadow(props: Props): JSX.Element {
  const { onClick, children, ...rest } = props;
  return (
    <ButtonShadowWrapper onClick={onClick} {...rest}>
      <div className="btn-wrap">{children}</div>
    </ButtonShadowWrapper>
  );
}

const ButtonShadowWrapper = styled(StyledButton)`
  padding: 0px;

  .btn-wrap {
    background-color: ${colors.gray3};
    color: ${colors.gray1};
    font-weight: 600;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
    width: 100%;
    padding: 8px 0px;
  }
  &:before,
  &:after {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    z-index: 0;
    transition: all ease-in-out 0.2s;
  }
  &:before {
    background-color: ${colors.shadow1};
    top: -1px;
    left: 4px;
  }
  &:after {
    background-color: ${colors.shadow2};
    top: 3px;
    left: -3px;
  }
`;

export default ButtonShadow;
