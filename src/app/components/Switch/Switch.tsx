import React, { useCallback } from 'react';
import styled from 'styled-components';
import { colors } from 'theme/colors';

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
  uncheckedLabel: string;
  checkedLabel: string;
  className?: string;
}

function Switch({
  checked,
  checkedLabel,
  className,
  onChange,
  uncheckedLabel,
}: Props): React.ReactElement<Props> {
  const _onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      onChange(event.target.checked),
    [onChange]
  );

  return (
    <div className={className}>
      <label>
        <input
          checked={checked}
          className="checkbox"
          onChange={_onChange}
          type="checkbox"
        />
        <span className="slider" />
      </label>
      <span className="label">{checked ? checkedLabel : uncheckedLabel}</span>
    </div>
  );
}

export default styled(Switch)`
  label {
    position: relative;
    display: inline-block;
    width: 48px;
    height: 24px;
  }

  span.label {
    margin-left: 8px;
    font-size: 12px;
    color: ${colors.gray7};
  }

  .checkbox {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + .slider:before {
      transform: translateX(24px);
      background-color: ${colors.primary};
    }
    &:checked + .slider {
      border: 1px solid ${colors.primary};
    }
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    transition: 0.2s;
    border-radius: 100px;
    border: 1px solid ${colors.red};

    &:before {
      position: absolute;
      content: '';
      height: 16px;
      width: 16px;
      left: 4px;
      bottom: 3px;
      background-color: ${colors.red};
      transition: 0.4s;
      border-radius: 50%;
    }
  }
`;
