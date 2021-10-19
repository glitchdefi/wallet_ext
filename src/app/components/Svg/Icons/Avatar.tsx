import React from 'react';
import Svg from '../Svg';
import { SvgProps } from '../types';

function Icon(props: SvgProps) {
  return (
    <Svg viewBox="0 0 40 40" fill="none" {...props}>
      <circle cx="20" cy="20" r="19.5" stroke="url(#paint0_linear_1240:3649)" />
      <circle cx="20" cy="20" r="16" fill="#23353B" />
      <path
        d="M12 33.8564C9.81331 32.5939 7.95647 30.8318 6.58127 28.7142C5.20607 26.5966 4.35158 24.1836 4.08765 21.6725C3.82372 19.1613 4.15785 16.6234 5.06271 14.2661C5.96758 11.9088 7.4175 9.79921 9.29391 8.10968C11.1703 6.42015 13.42 5.19869 15.8589 4.54519C18.2978 3.89168 20.8568 3.82467 23.3266 4.34964C25.7964 4.87461 28.1069 5.97666 30.0691 7.56567C32.0314 9.15468 33.5897 11.1856 34.6167 13.4922L20 20L12 33.8564Z"
        fill="#395660"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1240:3649"
          x1="0"
          y1="-20.8696"
          x2="40"
          y2="-20.8696"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#00FFFF" />
          <stop offset="1" stop-color="#F100F5" />
        </linearGradient>
      </defs>
    </Svg>
  );
}

export default Icon;
