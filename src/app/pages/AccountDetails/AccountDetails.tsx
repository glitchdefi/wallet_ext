import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import { TabList, TabPanel } from 'react-tabs';

import { colors } from 'theme/colors';

import { useWallet, useAccount } from 'contexts/WalletContext/hooks';

import { Box, Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { PageLayout } from 'app/layouts';
import { Button } from 'app/components/Button';
import { CheckIcon, CloseIcon, EditIcon } from 'app/components/Svg';
import { messages } from './messages';
import { Input } from 'app/components/Form';
import { validateNameExist } from 'utils/strings';
import { Tab, Tabs } from 'app/components/Tabs';
import { AccountInfoWithQRCode } from 'app/components/Shared';

const AccountDetails: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const { walletCtx, onEditAccount } = useWallet();
  const { accounts } = walletCtx || {};

  const account = useAccount();
  const { name: accountName, address, evmAddress } = account;

  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [isNameExist, setIsNameExist] = useState<boolean>(false);
  const [name, setName] = useState<string>(accountName || '');
  const [activeTab, setActiveTab] = useState<number>(0);

  useEffect(() => {
    showEdit && setShowEdit(false);
  }, [accountName]);

  useEffect(() => {
    // Reset validate
    if (isNameExist) setIsNameExist(false);

    if (name) {
      // Validate name
      const isError = validateNameExist(accounts, name, address);
      isError && setIsNameExist(true);
    }
  }, [name]);

  return (
    <PageLayout minHeight="600px">
      <Flex flex={1} flexDirection="column" p="16px">
        <Flex
          background={colors.gray2}
          alignItems="center"
          justifyContent="space-between"
          p="16px"
        >
          <Text color={colors.gray7} bold>
            {t(messages.title())}
          </Text>

          <Button p="0px" onClick={() => history.push('/')}>
            <CloseIcon width="12px" fill={colors.gray7} />
          </Button>
        </Flex>

        <Flex
          pt="32px"
          alignItems="center"
          flexDirection="column"
          px="16px"
          flex={1}
          background={colors.gray1}
        >
          {showEdit ? (
            <Box width="100%">
              <Flex width="100%" alignItems="center">
                <Input
                  isError={isNameExist}
                  value={name}
                  placeholder="Enter account name"
                  onChange={(e) => setName(e.target.value)}
                />

                <Button
                  ml="16px"
                  p="0px"
                  onClick={() => {
                    if (name && !isNameExist) {
                      name !== accountName
                        ? onEditAccount({ name })
                        : setShowEdit(false);
                    }
                  }}
                >
                  <CheckIcon
                    width="20px"
                    color={name && !isNameExist ? colors.primary : colors.gray}
                  />
                </Button>
              </Flex>

              {isNameExist && (
                <Text mt="2px" color={colors.error}>
                  This account name already exists
                </Text>
              )}
            </Box>
          ) : (
            <Flex alignItems="center">
              <Button p="0px" mr="10px" onClick={() => setShowEdit(true)}>
                <EditIcon width="14px" />
              </Button>
              <Text color={colors.gray7} bold>
                {accountName}
              </Text>
            </Flex>
          )}

          <Tabs
            selectedIndex={activeTab}
            onSelect={(index) => setActiveTab(index)}
          >
            <TabList>
              <Tab isactive={activeTab === 0 ? 'true' : 'false'}>
                <Text>Substrate Address</Text>
              </Tab>
              <Tab isactive={activeTab === 1 ? 'true' : 'false'}>
                <Text>EVM Address</Text>
              </Tab>
            </TabList>

            <TabPanel>
              <AccountInfoWithQRCode address={address} />
            </TabPanel>
            <TabPanel>
              <AccountInfoWithQRCode address={evmAddress} />
            </TabPanel>
          </Tabs>
        </Flex>
      </Flex>
    </PageLayout>
  );
};

export default AccountDetails;
