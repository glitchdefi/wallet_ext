import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import PickerPanel from 'rc-picker/lib/PickerPanel';
import 'rc-picker/assets/index.css';
import enUS from 'rc-picker/lib/locale/en_US';
import momentGenerateConfig from 'rc-picker/lib/generate/moment';
import styled from 'styled-components';
import { colors } from 'theme/colors';

import { Box, Flex } from 'app/components/Box';
import { Button } from 'app/components/Button';
import { Text } from 'app/components/Text';
import { CalendarIcon, CloseIcon, SwapRightIcon } from 'app/components/Svg';
import { useOnClickOutside } from 'hooks/useOnClickOutside';

interface Props {
  values: { startTime: number; endTime: number };
  onCalendarChange: (startTime: number, endTime: number) => void;
}

export const DateRangePicker: React.FC<Props> = React.memo(
  ({ values, onCalendarChange }) => {
    const ref = useRef();
    const [startTime, setStartTime] = useState<number>();
    const [endTime, setEndTime] = useState<number>();
    const [isStartTime, setIsStartTime] = useState<boolean>(false);
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

    useOnClickOutside(ref, () => setShowDatePicker(false));

    useEffect(() => {
      setStartTime(values.startTime);
      setEndTime(values.endTime);
    }, [values.startTime, values.endTime]);

    return (
      <Box ref={ref}>
        <DateInputWrapper ref={ref}>
          <Flex alignItems="center">
            <Button
              p="0px"
              onClick={() => {
                setShowDatePicker(true);
                setIsStartTime(true);
              }}
            >
              <Label
                active={showDatePicker && isStartTime}
                color={startTime ? colors.gray9 : colors.gray5}
              >
                {startTime
                  ? moment(startTime).format('YYYY-MM-DD')
                  : 'Select time'}
              </Label>
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
              <Label
                active={showDatePicker && !isStartTime}
                color={endTime ? colors.gray9 : colors.gray5}
              >
                {endTime ? moment(endTime).format('YYYY-MM-DD') : 'Select time'}
              </Label>
            </Button>
          </Flex>

          <StyledButton>
            <Button
              display="flex"
              p="0px"
              onClick={() => {
                if (startTime || endTime) {
                  setStartTime(null);
                  setEndTime(null);
                  onCalendarChange(null, null);
                  setShowDatePicker(false);
                }
              }}
            >
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
          <PickerPanelWrapper>
            <PickerPanel
              value={
                isStartTime && startTime
                  ? moment(startTime)
                  : endTime
                  ? moment(endTime)
                  : null
              }
              disabledDate={(date) => {
                const endCondition =
                  !isStartTime &&
                  startTime &&
                  date.valueOf() < moment(startTime).valueOf();

                const startCondition =
                  isStartTime &&
                  endTime &&
                  date.valueOf() > moment(endTime).valueOf();

                return (
                  startCondition ||
                  endCondition ||
                  date.valueOf() > moment().valueOf()
                );
              }}
              generateConfig={momentGenerateConfig}
              picker="date"
              locale={enUS}
              onChange={(value) => {
                const st = isStartTime ? value.valueOf() : startTime;
                const et = !isStartTime ? value.valueOf() : endTime;

                setStartTime(st);
                setEndTime(et);

                onCalendarChange(st, et);

                setShowDatePicker(false);
              }}
              dateRender={(currentDate, today) => {
                const isRange =
                  startTime && endTime
                    ? currentDate.valueOf() > moment(startTime).valueOf() &&
                      currentDate.valueOf() < moment(endTime).valueOf()
                    : false;

                return (
                  <div
                    className={`rc-picker-cell-inner ${
                      isRange ? 'rc-picker-cell-inner-range' : ''
                    }`}
                  >
                    {currentDate.format('DD')}
                  </div>
                );
              }}
              showToday
            />
          </PickerPanelWrapper>
        )}
      </Box>
    );
  },
  areEqual
);

function areEqual(prevProps, nextProps) {
  if (JSON.stringify(prevProps.values) === JSON.stringify(nextProps.values)) {
    return true;
  } else {
    return false;
  }
}

const Label = styled(Text)<{ active?: boolean }>`
  transition: all 0.3s;
  color: ${({ active }) => active && colors.primary};
`;

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

    .rc-picker-cell-disabled {
      .rc-picker-cell-inner {
        &:hover {
          cursor: not-allowed;
        }
      }
    }

    .rc-picker-cell-inner-range {
      border: 1px solid ${colors.secondary};
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
