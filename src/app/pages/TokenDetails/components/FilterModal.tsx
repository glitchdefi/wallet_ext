import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';

import {
  DATE_LIST,
  KIND_OF_TXN_LIST,
  STATUS_TYPE_LIST,
} from 'constants/values';
import { colors } from 'theme/colors';

import { messages } from '../messages';

import { Box, Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { CloseIcon } from 'app/components/Svg';
import { Button, ButtonShadow } from 'app/components/Button';
import { FilterButtonList } from './FilterButtonList';
import { DateRangePicker } from './DateRangePicker';
interface Props {
  isOpen: boolean;
  onClose?(): void;
  initFilter: {
    txStatus?: number;
    txType?: number;
    startTime?: number;
    endTime?: number;
  };
  onFilter?({
    txStatus,
    txType,
    startTime,
    endTime,
  }: {
    txStatus?: number;
    txType?: number;
    startTime?: number;
    endTime?: number;
  }): void;
  onChangeDateType: (type?: 'select' | 'calendar') => void;
  initDateType?: 'select' | 'calendar';
}

export const FilterModal: React.FC<Props> = React.memo(
  ({
    initFilter,
    isOpen,
    onClose,
    onFilter,
    initDateType,
    onChangeDateType,
  }) => {
    const { t } = useTranslation();
    const [filter, setFilter] = useState({
      txStatus: 2,
      txType: 0,
      startTime: null,
      endTime: null,
    }); // Status 2 -> all, TxType 0 -> all
    const [dateType, setDateType] = useState<'select' | 'calendar'>('select');

    useEffect(() => {
      initFilter &&
        setFilter({
          txStatus: initFilter.txStatus,
          txType: initFilter.txType,
          startTime: initFilter.startTime,
          endTime: initFilter?.endTime,
        });
    }, [initFilter]);

    useEffect(() => {
      initDateType && setDateType(initDateType);
    }, [initDateType]);

    return (
      <StyledModal show={isOpen} centered>
        <Flex
          borderBottom={`1px solid ${colors.gray8}`}
          p="12px"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text color={colors.gray7} bold>
            {t(messages.filter())}
          </Text>

          <Button p="0px" onClick={onClose}>
            <CloseIcon width="13px" fill={colors.gray7} />
          </Button>
        </Flex>

        <Box p="16px" mt="16px">
          {/* Date */}
          <Box>
            <Text>{t(messages.selectTime())}</Text>
            <Box mt="8px">
              <FilterButtonList
                list={DATE_LIST}
                activeKey={
                  dateType === 'calendar' ? null : filter.startTime || 0
                }
                onItemClick={(key) => {
                  setDateType('select');
                  setFilter({
                    ...filter,
                    startTime: DATE_LIST[key].startTime,
                    endTime: DATE_LIST[key].endTime,
                  });
                }}
              />
            </Box>

            <Box mt="16px">
              <DateRangePicker
                values={
                  dateType === 'calendar'
                    ? {
                        startTime: filter.startTime,
                        endTime: filter.endTime,
                      }
                    : {
                        startTime: null,
                        endTime: null,
                      }
                }
                onCalendarChange={(startTime, endTime) => {
                  setDateType(startTime || endTime ? 'calendar' : 'select');
                  setFilter({ ...filter, startTime, endTime });
                }}
              />
            </Box>
          </Box>

          {/* Kind of Txn */}
          <Box mt="32px">
            <Text>{t(messages.kindOfTxn())}</Text>
            <Box mt="8px">
              <FilterButtonList
                list={KIND_OF_TXN_LIST}
                activeKey={filter.txType}
                onItemClick={(key) => setFilter({ ...filter, txType: key })}
              />
            </Box>
          </Box>

          {/* Status */}
          <Box mt="32px">
            <Text>{t(messages.status())}</Text>
            <Box mt="8px">
              <FilterButtonList
                list={STATUS_TYPE_LIST}
                activeKey={filter.txStatus}
                onItemClick={(key) => setFilter({ ...filter, txStatus: key })}
              />
            </Box>
          </Box>

          <Box mt="32px">
            <ButtonShadow
              width="100%"
              onClick={() => {
                onFilter(filter);
                onChangeDateType(dateType);
              }}
            >
              {t(messages.showResults())}
            </ButtonShadow>
          </Box>
        </Box>
      </StyledModal>
    );
  }
);

const StyledModal = styled(Modal)`
  padding-right: 0px !important;
  bottom: 0 !important;
  height: auto;
  overflow: hidden;

  .modal-dialog {
    margin: 16px;

    .modal-content {
      border-radius: 0px;
      border: none;
      background-color: ${colors.gray1};
    }
  }
`;
