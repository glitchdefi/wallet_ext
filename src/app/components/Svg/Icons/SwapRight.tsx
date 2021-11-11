import React from 'react';
import Svg from '../Svg';
import { SvgProps } from '../types';

function Icon({ ...rest }: SvgProps) {
  return (
    <Svg viewBox="0 0 17 16" fill="none" {...rest}>
      <path
        d="M14.1422 9.31563L11.5797 6.06563C11.533 6.00629 11.4734 5.95832 11.4055 5.92531C11.3375 5.89229 11.263 5.87509 11.1875 5.875H10.175C10.0703 5.875 10.0125 5.99531 10.0766 6.07812L12.3313 8.9375H2.875C2.80625 8.9375 2.75 8.99375 2.75 9.0625V10C2.75 10.0687 2.80625 10.125 2.875 10.125H13.7484C14.1672 10.125 14.4 9.64375 14.1422 9.31563Z"
        fill="current"
      />
    </Svg>
  );
}

export default Icon;
