import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import Modal from 'react-bootstrap/Modal';

import { useWallet } from 'contexts/WalletContext/hooks';

import { truncateAddress } from 'utils/strings';
import { Routes } from 'constants/routes';
import { colors } from 'theme/colors';

import { Box, Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { Button } from 'app/components/Button';
import { CheckIcon, CloseIcon } from 'app/components/Svg';
import { useTranslation } from 'react-i18next';
import { messages } from '../messages';

interface Props {
  isOpen: boolean;
  onClose?(): void;
}

export const ManageAccountModal: React.FC<Props> = React.memo(
  ({ isOpen, onClose }) => {
    const history = useHistory();
    const { t } = useTranslation();
    const { walletCtx, onChangeAccount } = useWallet();

    const { selectedAddress, accounts } = walletCtx || {};

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
            {t(messages.manageAccount())}
          </Text>

          <Button p="0px" onClick={onClose}>
            <CloseIcon width="13px" fill={colors.gray7} />
          </Button>
        </Flex>

        <Flex height="330px" flexDirection="column" overflowY="scroll">
          {accounts &&
            Object.entries(accounts)
              .sort(([, a], [, b]) => {
                return b.whenCreated - a.whenCreated;
              })
              .map((val, i) => {
                const account = val[1];
                const checked = account.address === selectedAddress;

                return (
                  <AccountWrapper
                    key={i}
                    onClick={() => {
                      if (account.address !== selectedAddress) {
                        onChangeAccount({ address: account.address });
                      }
                    }}
                  >
                    <Box>
                      <Text color={colors.gray7} bold>
                        {account?.name}
                      </Text>
                      <Text fontSize="12px" color={colors.gray7}>
                        {truncateAddress(account?.address)}
                      </Text>
                    </Box>
                    {checked && (
                      <CheckIcon width="18px" color={colors.primary} />
                    )}
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
            {t(messages.createAccount())}
          </Button>
          <Button
            mt="12px"
            variant="secondary"
            width="100%"
            onClick={() =>
              history.push(Routes.createImportAccount, { activeTab: 1 })
            }
          >
            {t(messages.importPrivateKey())}
          </Button>
        </Box>
      </StyledModal>
    );
  }
);

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

  @media only screen and (min-width: 375px) {
    .modal-dialog {
      margin: 0px auto;
      padding-left: 16px;
      padding-right: 16px;
    }
  }

  @media only screen and (min-width: 768px) {
    .modal-dialog {
      padding-left: 0px;
      padding-right: 0px;
      max-width: 712px;
      margin-top: 136px !important;
    }
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
