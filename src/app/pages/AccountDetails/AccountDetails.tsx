import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import QRCode from 'qrcode.react';

import { Routes } from 'constants/routes';
import { colors } from 'theme/colors';

import {
  useAccountActionHandlers,
  useAccounts,
  useSelectedAddress,
  useWalletSlice,
} from 'state/wallet/hooks';

import { Box, Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { PageLayout } from 'app/layouts';
import { Button } from 'app/components/Button';
import { CheckIcon, CloseIcon, CopyIcon, EditIcon } from 'app/components/Svg';
import { messages } from './messages';
import { Input } from 'app/components/Form';

const AccountDetails: React.FC = () => {
  useWalletSlice();
  const history = useHistory();
  const { t } = useTranslation();

  const { selectedAddress } = useSelectedAddress();
  const { accounts } = useAccounts();
  const { onChangeAccountName } = useAccountActionHandlers();

  const [copied, setCopied] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [name, setName] = useState<string>(
    accounts[selectedAddress].name || ''
  );

  useEffect(() => {
    showEdit && setShowEdit(false);
  }, [accounts[selectedAddress].name]);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 1500);
    }
  }, [copied]);

  const onCopy = () => {
    navigator.clipboard.writeText('');
    setCopied(true);
  };

  return (
    <PageLayout minHeight="600px">
      <Box p="16px">
        <Flex
          background={colors.gray2}
          alignItems="center"
          justifyContent="space-between"
          p="16px"
        >
          <Text color={colors.gray7} bold>
            {t(messages.title())}
          </Text>

          <Button p="0px" onClick={() => history.push(Routes.home)}>
            <CloseIcon width="12px" fill={colors.gray7} />
          </Button>
        </Flex>

        <Flex
          pt="32px"
          alignItems="center"
          flexDirection="column"
          px="16px"
          height="512px"
          background={colors.gray1}
        >
          {showEdit ? (
            <Flex width="100%" alignItems="center">
              <Input
                value={name}
                placeholder="Enter account name"
                onChange={(e) => setName(e.target.value)}
              />

              <Button
                ml="16px"
                p="0px"
                onClick={() => {
                  if (name) {
                    name !== accounts[selectedAddress].name
                      ? onChangeAccountName(name)
                      : setShowEdit(false);
                  }
                }}
              >
                <CheckIcon
                  width="20px"
                  color={name ? colors.primary : colors.gray}
                />
              </Button>
            </Flex>
          ) : (
            <Flex alignItems="center">
              <Button p="0px" mr="10px" onClick={() => setShowEdit(true)}>
                <EditIcon width="14px" />
              </Button>
              <Text color={colors.gray7} bold>
                {accounts[selectedAddress].name}
              </Text>
            </Flex>
          )}

          <StyledBorder>
            <QRCode value={selectedAddress} size={160} />
          </StyledBorder>

          <Flex
            mt="24px"
            background={colors.gray2}
            flexWrap="wrap"
            py="8px"
            px="26px"
          >
            <Text textAlign="center" color={colors.gray7} large>
              {selectedAddress}
            </Text>
          </Flex>

          <Button width="160px" mt="24px" variant="secondary" onClick={onCopy}>
            <Flex justifyContent="center" alignItems="center">
              {copied ? (
                <CheckIcon width="12px" color={colors.primary} />
              ) : (
                <CopyIcon width="12px" />
              )}
              <Text ml="10px" color={colors.primary} bold>
                {copied ? 'Copied' : 'Copy address'}
              </Text>
            </Flex>
          </Button>
        </Flex>
      </Box>
    </PageLayout>
  );
};

const StyledBorder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 32px;
  width: 192px;
  height: 192px;
  background: ${colors.gray1};
  box-shadow: -3px 3px 0px ${colors.primary}, 3px -1px 0px ${colors.secondary};
`;

export default AccountDetails;
