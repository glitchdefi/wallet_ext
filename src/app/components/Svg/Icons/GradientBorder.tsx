import React from 'react';
import Svg from '../Svg';
import { SvgProps } from '../types';

function Icon(props: SvgProps) {
  return (
    <Svg viewBox="0 0 40 40" fill="none" {...props}>
      <circle cx="20" cy="20" r="19.5" stroke="url(#paint0_linear_1240:3649)" />
      <defs>
        <linearGradient
          id="paint0_linear_1240:3649"
          x1="0"
          y1="-20.8696"
          x2="40"
          y2="-20.8696"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00FFFF" />
          <stop offset="1" stopColor="#F100F5" />
        </linearGradient>
      </defs>
    </Svg>
  );
}

export default Icon;
