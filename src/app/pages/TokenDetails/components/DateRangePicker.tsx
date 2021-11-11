import React, { useRef, useState } from 'react';
import moment from 'moment';
import PickerPanel from 'rc-picker/lib/PickerPanel';
import 'rc-picker/assets/index.css';
import enUS from 'rc-picker/lib/locale/en_US';
import momentGenerateConfig from 'rc-picker/lib/generate/moment';
import styled from 'styled-components';
import { colors } from 'theme/colors';

import { Flex } from 'app/components/Box';
import { Button } from 'app/components/Button';
import { Text } from 'app/components/Text';
import { CalendarIcon, CloseIcon, SwapRightIcon } from 'app/components/Svg';
import { useOnClickOutside } from 'hooks/useOnClickOutside';

export const DateRangePicker: React.FC = () => {
  const ref = useRef();
  const [startTime, setStartTime] = useState<number>();
  const [endTime, setEndTime] = useState<number>();
  const [isStartTime, setIsStartTime] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  useOnClickOutside(ref, () => setShowDatePicker(false));

  return (
    <>
      <DateInputWrapper ref={ref}>
        <Flex alignItems="center">
          <Button
            p="0px"
            onClick={() => {
              setShowDatePicker(true);
              setIsStartTime(true);
            }}
          >
            <Text color={startTime ? colors.gray9 : colors.gray5}>
              {startTime
                ? moment(startTime).format('YYYY-MM-DD')
                : 'Select time'}
            </Text>
          </Button>

          <SwapRightIcon
            color={startTime || endTime ? colors.primary : colors.gray5}
            mx="12px"
          />

          <Button
            p="0px"
            onClick={() => {
              setShowDatePicker(true);
              setIsStartTime(false);
            }}
          >
            <Text color={endTime ? colors.gray9 : colors.gray5}>
              {endTime ? moment(endTime).format('YYYY-MM-DD') : 'Select time'}
            </Text>
          </Button>
        </Flex>

        <StyledButton>
          <Button display="flex" p="0px">
            <CalendarIcon
              className="calendar-icon"
              width="16px"
              color={colors.gray5}
            />
            <CloseIcon
              display="none"
              className="clear-icon"
              width="12px"
              color={colors.gray5}
            />
          </Button>
        </StyledButton>
      </DateInputWrapper>
      {showDatePicker && (
        <PickerPanelWrapper ref={ref}>
          <PickerPanel
            value={isStartTime ? moment(startTime) : moment(endTime)}
            disabledDate={(date) => {
              return (
                !isStartTime &&
                startTime &&
                date.valueOf() < moment(startTime).valueOf()
              );
            }}
            generateConfig={momentGenerateConfig}
            picker="date"
            locale={enUS}
            onChange={(value) => {
              isStartTime
                ? setStartTime(value.valueOf())
                : setEndTime(value.valueOf());

              setShowDatePicker(false);
            }}
            showToday
          />
        </PickerPanelWrapper>
      )}
    </>
  );
};

const DateInputWrapper = styled(Flex)`
  position: relative;
  align-items: center;
  justify-content: space-between;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 12px;
  padding-right: 12px;
  border: 1px solid ${colors.gray4};
`;

const PickerPanelWrapper = styled(Flex)`
  flex-direction: column;
  position: absolute;
  left: 16px;
  right: 16px;
  z-index: 1100;
  transition: all 0.3s;

  .rc-picker-panel {
    background-color: ${colors.gray2};
    box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
      0 9px 28px 8px #0000000d;
    border: none;
  }

  button {
    background: transparent;
    outline: none;
    border: none;
  }

  .rc-picker-month-btn {
    margin-right: 8px;
  }

  .rc-picker-month-btn,
  .rc-picker-year-btn,
  .rc-picker-decade-btn {
    font-weight: 600;
    color: ${colors.gray9};
    font-size: 14px;
  }

  .rc-picker-header-super-prev-btn,
  .rc-picker-header-prev-btn,
  .rc-picker-header-next-btn,
  .rc-picker-header-super-next-btn {
    color: ${colors.primary};
    font-size: 18px;
    font-weight: 400;
  }

  .rc-picker-header {
    padding: 8px;
    border-bottom: 1px solid ${colors.gray8};
  }

  .rc-picker-content {
    width: 100%;
  }

  .rc-picker-content {
    thead tr th {
      color: ${colors.gray9};
      font-weight: 400;
      font-size: 14px;
    }

    .rc-picker-cell-inner {
      font-size: 14px;
      min-width: 24px;
      height: 24px;
      line-height: 24px;
    }

    .rc-picker-cell {
      color: ${colors.gray4};
    }

    .rc-picker-cell-in-view {
      color: ${colors.gray9};
    }

    .rc-picker-cell-today > .rc-picker-cell-inner {
      border: none;
      color: ${colors.primary};
    }

    .rc-picker-cell-inner:hover {
      background: transparent;
      border: 1px solid ${colors.primary};
    }

    .rc-picker-cell-selected {
      background: transparent;

      .rc-picker-cell-inner {
        background: transparent;
        border: 1px solid ${colors.primary};
      }
    }
  }

  .rc-picker-body {
    padding-top: 13px;
    padding-bottom: 13px;
  }

  .rc-picker-footer {
    background-color: ${colors.gray2};
    padding-top: 10px;
    padding-bottom: 10px;
    border-top: 1px solid ${colors.gray8};
    text-align: center;

    .rc-picker-today-btn {
      color: ${colors.primary};
      font-size: 14px;
      font-weight: bold;
      text-decoration: none;
      cursor: pointer;
    }
  }
`;

const StyledButton = styled.div`
  .clear-icon {
    display: none;
  }

  .calendar-icon {
    display: block;
  }

  &:hover {
    transition: all 0.5s;

    .clear-icon {
      display: block;
    }

    .calendar-icon {
      display: none;
    }
  }
`;
