import React from 'react';
import Svg from '../Svg';
import { SvgProps } from '../types';

function Icon({ ...rest }: SvgProps) {
  return (
    <Svg viewBox="0 0 17 16" fill="none" {...rest}>
      <path
        d="M7.8125 2H3C2.72344 2 2.5 2.22344 2.5 2.5V7.3125C2.5 7.38125 2.55625 7.4375 2.625 7.4375H7.8125C7.88125 7.4375 7.9375 7.38125 7.9375 7.3125V2.125C7.9375 2.05625 7.88125 2 7.8125 2ZM6.9375 6.4375H3.5V3H6.9375V6.4375ZM4.78125 5.28125H5.65625C5.725 5.28125 5.78125 5.225 5.78125 5.15625V4.28125C5.78125 4.2125 5.725 4.15625 5.65625 4.15625H4.78125C4.7125 4.15625 4.65625 4.2125 4.65625 4.28125V5.15625C4.65625 5.225 4.7125 5.28125 4.78125 5.28125ZM7.8125 8.5625H2.625C2.55625 8.5625 2.5 8.61875 2.5 8.6875V13.5C2.5 13.7766 2.72344 14 3 14H7.8125C7.88125 14 7.9375 13.9438 7.9375 13.875V8.6875C7.9375 8.61875 7.88125 8.5625 7.8125 8.5625ZM6.9375 13H3.5V9.5625H6.9375V13ZM4.78125 11.8438H5.65625C5.725 11.8438 5.78125 11.7875 5.78125 11.7188V10.8438C5.78125 10.775 5.725 10.7188 5.65625 10.7188H4.78125C4.7125 10.7188 4.65625 10.775 4.65625 10.8438V11.7188C4.65625 11.7875 4.7125 11.8438 4.78125 11.8438ZM14 2H9.1875C9.11875 2 9.0625 2.05625 9.0625 2.125V7.3125C9.0625 7.38125 9.11875 7.4375 9.1875 7.4375H14.375C14.4438 7.4375 14.5 7.38125 14.5 7.3125V2.5C14.5 2.22344 14.2766 2 14 2ZM13.5 6.4375H10.0625V3H13.5V6.4375ZM11.3438 5.28125H12.2188C12.2875 5.28125 12.3438 5.225 12.3438 5.15625V4.28125C12.3438 4.2125 12.2875 4.15625 12.2188 4.15625H11.3438C11.275 4.15625 11.2188 4.2125 11.2188 4.28125V5.15625C11.2188 5.225 11.275 5.28125 11.3438 5.28125ZM14.375 8.5625H13.625C13.5562 8.5625 13.5 8.61875 13.5 8.6875V10.7812H12.2812V8.6875C12.2812 8.61875 12.225 8.5625 12.1562 8.5625H9.1875C9.11875 8.5625 9.0625 8.61875 9.0625 8.6875V13.875C9.0625 13.9438 9.11875 14 9.1875 14H9.9375C10.0062 14 10.0625 13.9438 10.0625 13.875V10.0625H11.2812V11.6562C11.2812 11.725 11.3375 11.7812 11.4062 11.7812H14.375C14.4438 11.7812 14.5 11.725 14.5 11.6562V8.6875C14.5 8.61875 14.4438 8.5625 14.375 8.5625ZM12.1562 13H11.4062C11.3375 13 11.2812 13.0562 11.2812 13.125V13.875C11.2812 13.9438 11.3375 14 11.4062 14H12.1562C12.225 14 12.2812 13.9438 12.2812 13.875V13.125C12.2812 13.0562 12.225 13 12.1562 13ZM14.375 13H13.625C13.5562 13 13.5 13.0562 13.5 13.125V13.875C13.5 13.9438 13.5562 14 13.625 14H14.375C14.4438 14 14.5 13.9438 14.5 13.875V13.125C14.5 13.0562 14.4438 13 14.375 13Z"
        fill="#151F23"
      />
    </Svg>
  );
}

export default Icon;
