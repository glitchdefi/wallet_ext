import React from 'react';
import { SpaceProps } from 'styled-system';
import logo from '../../../assets/img/gl_logo_no_text.png';
import Image from './Image';

interface Props extends SpaceProps {
  width: number;
  height: number;
}

const GlitchLogo: React.FC<Props> = ({ width, height, ...rest }) => {
  return (
    <Image src={logo} alt="glch-logo" width={width} height={height} {...rest} />
  );
};

export default GlitchLogo;
