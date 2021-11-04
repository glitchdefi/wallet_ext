import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import Modal from 'react-bootstrap/Modal';

import {
  useAccountActionHandlers,
  useAccounts,
  useSelectedAddress,
  useWalletSlice,
} from 'state/wallet/hooks';
import { useApplicationSlice } from 'state/application/hooks';

import { truncateAddress } from 'utils/strings';
import { Routes } from 'constants/routes';
import { colors } from 'theme/colors';

// import { Modal } from 'app/components/Modal';
import { Box, Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { Button } from 'app/components/Button';
import { CheckIcon, CloseIcon } from 'app/components/Svg';

interface Props {
  isOpen: boolean;
  onClose?(): void;
}

export const ManageAccountModal: React.FC<Props> = ({ isOpen, onClose }) => {
  useApplicationSlice();
  useWalletSlice();

  const history = useHistory();
  const { onChangeAccount } = useAccountActionHandlers();
  const { selectedAddress } = useSelectedAddress();
  const { accounts } = useAccounts();

  useEffect(() => {
    onClose && onClose();
  }, [selectedAddress]);

  return (
    <StyledModal show={isOpen}>
      <Flex
        borderBottom={`1px solid ${colors.gray8}`}
        p="12px"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text color={colors.gray7} bold>
          Manage Account
        </Text>

        <Button p="0px" onClick={onClose}>
          <CloseIcon width="13px" fill={colors.gray7} />
        </Button>
      </Flex>

      <Flex height="330px" flexDirection="column" overflowY="scroll">
        {Object.entries(accounts)
          .sort(([, a], [, b]) => {
            return b.createdAt - a.createdAt;
          })
          .map((val, i) => {
            const account = val[1];
            const checked = account.address === selectedAddress;

            return (
              <AccountWrapper
                key={i}
                onClick={() => onChangeAccount(account.address)}
              >
                <Box>
                  <Text color={colors.gray7} bold>
                    {account?.name}
                  </Text>
                  <Text fontSize="12px" color={colors.gray7}>
                    {truncateAddress(account?.address)}
                  </Text>
                </Box>
                {checked && <CheckIcon width="18px" color={colors.primary} />}
              </AccountWrapper>
            );
          })}
      </Flex>

      <Box p="16px">
        <Button
          variant="primary"
          width="100%"
          onClick={() =>
            history.push(Routes.createImportAccount, { activeTab: 0 })
          }
        >
          Create Account
        </Button>
        <Button
          mt="12px"
          variant="secondary"
          width="100%"
          onClick={() =>
            history.push(Routes.createImportAccount, { activeTab: 1 })
          }
        >
          Import Private Keys
        </Button>
      </Box>
    </StyledModal>
  );
};

const StyledModal = styled(Modal)`
  padding-right: 0px !important;

  .modal-dialog {
    margin-top: 76px !important;
    margin: 16px;

    .modal-content {
      border-radius: 0px;
      border: none;
      background-color: ${colors.gray1};
    }
  }

  .modal-backdrop.show {
    opacity: 0;
  }
`;

const AccountWrapper = styled.div`
  display: flex;
  padding: 16px;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: rgba(255, 255, 255, 0.03);
  }
`;
