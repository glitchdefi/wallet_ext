import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { TabList, TabPanel } from 'react-tabs';

import { colors } from 'theme/colors';
import { useAccount } from 'contexts/WalletContext/hooks';

import { Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { PageLayout } from 'app/layouts';
import { Button } from 'app/components/Button';
import { LeftArrowIcon } from 'app/components/Svg';
import { Tab, Tabs } from 'app/components/Tabs';
import { AccountInfoWithQRCode } from 'app/components/Shared';

const ReceiveToken: React.FC = () => {
  const history = useHistory();

  const { name, address, evmAddress } = useAccount();
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <PageLayout minHeight="600px">
      <Flex
        alignItems="center"
        borderBottom={`1px solid ${colors.magenta2}`}
        p="16px"
      >
        <Button p="0px" onClick={() => history.goBack()}>
          <LeftArrowIcon width="13px" />
        </Button>
        <Text mt="3px" bold ml="16px" color={colors.gray7}>
          Receive
        </Text>
      </Flex>

      <Flex
        pt="32px"
        alignItems="center"
        flexDirection="column"
        px="32px"
        height="512px"
      >
        <Flex flexDirection="column" alignItems="center">
          <Text color={colors.gray7} bold>
            {name}
          </Text>
        </Flex>

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
    </PageLayout>
  );
};

export default ReceiveToken;
