import { HTMLAttributes, ImgHTMLAttributes } from 'react';
import { SpaceProps } from 'styled-system';

export interface WrapperProps
  extends SpaceProps,
    HTMLAttributes<HTMLDivElement> {
  width: number;
  height: number;
}

export interface ImageProps
  extends ImgHTMLAttributes<HTMLImageElement>,
    SpaceProps {
  width: number;
  height: number;
  wrapperProps?: WrapperProps;
}
