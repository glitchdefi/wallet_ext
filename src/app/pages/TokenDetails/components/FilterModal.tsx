import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';

import { KIND_OF_TXN_LIST, STATUS_TYPE_LIST } from 'constants/values';
import { colors } from 'theme/colors';

import { Box, Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { CloseIcon } from 'app/components/Svg';
import { Button, ButtonShadow } from 'app/components/Button';
import { FilterButtonList } from './FilterButtonList';

interface Props {
  isOpen: boolean;
  onClose?(): void;
  initFilter: { txStatus?: number; txType?: number };
  onFilter?({ txStatus, txType }: { txStatus?: number; txType?: number }): void;
}

export const FilterModal: React.FC<Props> = ({
  initFilter,
  isOpen,
  onClose,
  onFilter,
}) => {
  const [filter, setFilter] = useState({ txStatus: 2, txType: 0 }); // Status 2 -> all, TxType 0 -> all

  useEffect(() => {
    initFilter &&
      setFilter({ txStatus: initFilter.txStatus, txType: initFilter.txType });
  }, [initFilter]);

  return (
    <StyledModal show={isOpen}>
      <Flex
        borderBottom={`1px solid ${colors.gray8}`}
        p="12px"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text color={colors.gray7} bold>
          Filter
        </Text>

        <Button p="0px" onClick={onClose}>
          <CloseIcon width="13px" fill={colors.gray7} />
        </Button>
      </Flex>

      <Box p="16px" mt="16px">
        <Box>
          <Text>Kind of txn</Text>
          <Box mt="8px">
            <FilterButtonList
              list={KIND_OF_TXN_LIST}
              activeKey={filter.txType}
              onItemClick={(key) => setFilter({ ...filter, txType: key })}
            />
          </Box>
        </Box>

        <Box mt="32px">
          <Text>Status</Text>
          <Box mt="8px">
            <FilterButtonList
              list={STATUS_TYPE_LIST}
              activeKey={filter.txStatus}
              onItemClick={(key) => setFilter({ ...filter, txStatus: key })}
            />
          </Box>
        </Box>

        <Box mt="32px">
          <ButtonShadow width="100%" onClick={() => onFilter(filter)}>
            Show results
          </ButtonShadow>
        </Box>
      </Box>
    </StyledModal>
  );
};

const StyledModal = styled(Modal)`
  padding-right: 0px !important;
  top: auto;
  bottom: 0 !important;
  height: auto;

  .modal-dialog {
    margin: 16px;

    .modal-content {
      border-radius: 0px;
      border: none;
      background-color: ${colors.gray1};
    }
  }
`;
