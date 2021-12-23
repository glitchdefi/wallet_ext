import React, { ElementType } from 'react';
import StyledButton from './StyledButton';
import { ButtonProps } from './types';

function Button<E extends ElementType = 'button'>(
  props: ButtonProps<E>
): JSX.Element {
  const { id, children, variant, onClick, ...rest } = props;

  return (
    <StyledButton
      id={id}
      variant={variant}
      onClick={(e) => {
        if (variant !== 'disable-primary' && variant !== 'disable-secondary') {
          onClick && onClick(e);
        }
      }}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}

Button.defaultProps = {
  external: false,
};

export default Button;
