import React from 'react';
import Svg from '../Svg';
import { SvgProps } from '../types';

function Icon({ ...rest }: SvgProps) {
  return (
    <Svg viewBox="0 0 14 12" fill="none" {...rest}>
      <path
        d="M13.5 4.125C13.6375 4.125 13.75 4.0125 13.75 3.875V1C13.75 0.8625 13.6375 0.75 13.5 0.75H10.625C10.4875 0.75 10.375 0.8625 10.375 1V1.875H3.625V1C3.625 0.8625 3.5125 0.75 3.375 0.75H0.5C0.3625 0.75 0.25 0.8625 0.25 1V3.875C0.25 4.0125 0.3625 4.125 0.5 4.125H1.375V7.875H0.5C0.3625 7.875 0.25 7.9875 0.25 8.125V11C0.25 11.1375 0.3625 11.25 0.5 11.25H3.375C3.5125 11.25 3.625 11.1375 3.625 11V10.125H10.375V11C10.375 11.1375 10.4875 11.25 10.625 11.25H13.5C13.6375 11.25 13.75 11.1375 13.75 11V8.125C13.75 7.9875 13.6375 7.875 13.5 7.875H12.625V4.125H13.5ZM11.375 1.75H12.75V3.125H11.375V1.75ZM1.25 3.125V1.75H2.625V3.125H1.25ZM2.625 10.25H1.25V8.875H2.625V10.25ZM12.75 8.875V10.25H11.375V8.875H12.75ZM11.5 7.875H10.625C10.4875 7.875 10.375 7.9875 10.375 8.125V9H3.625V8.125C3.625 7.9875 3.5125 7.875 3.375 7.875H2.5V4.125H3.375C3.5125 4.125 3.625 4.0125 3.625 3.875V3H10.375V3.875C10.375 4.0125 10.4875 4.125 10.625 4.125H11.5V7.875Z"
        fill="#00FFFF"
      />
    </Svg>
  );
}

export default Icon;
