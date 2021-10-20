import React, { isValidElement, useEffect, useRef, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { SpaceProps } from 'styled-system';

import Button from './Button';
import { Tooltip } from '../Tooltip';
import { CopyIcon } from '../Svg';

interface Props extends SpaceProps {
  width?: string;
  value?: string;
  component?: React.ReactNode;
}

function CopyButton({ width, value, component, ...rest }: Props) {
  const [copied, setCopied] = useState(false);
  const tooltipRef = useRef();

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
  }, [copied]);

  const onCopy = () => {
    ReactTooltip.show(tooltipRef.current);
    navigator.clipboard.writeText(value);
    setCopied(true);
  };

  return (
    <>
      <div ref={tooltipRef} data-tip="" data-for={value} onClick={onCopy}>
        <Button p="0px" {...rest}>
          {isValidElement(component) ? (
            React.cloneElement(component)
          ) : (
            <CopyIcon width={width} />
          )}
        </Button>
      </div>

      <Tooltip id={value} getContent={() => (copied ? 'Copied' : 'Copy')} />
    </>
  );
}

export default CopyButton;
