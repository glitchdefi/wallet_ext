import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { TabList, TabPanel } from 'react-tabs';

import { messages } from './messages';

import { colors } from 'theme/colors';

import { PageLayout } from 'app/layouts';
import { Box, Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { Button } from 'app/components/Button';
import { CloseIcon } from 'app/components/Svg';
import { Tab, Tabs } from 'app/components/Tabs';
import { CreateAccountPanel } from './components/CreateAccountPanel';
import { ImportPrivateKeyPanel } from './components/ImportPrivateKeyPanel';

const CreateImportAccount: React.FC = () => {
  const history = useHistory();
  const location = useLocation<{ activeTab?: number }>();

  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<number>(location.state.activeTab);

  return (
    <PageLayout>
      <Flex flexDirection="column" height="100%" p="16px">
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

        <Box height="100%" px="16px" background={colors.gray1}>
          <Tabs
            selectedIndex={activeTab}
            onSelect={(index) => setActiveTab(index)}
          >
            <TabList>
              <Tab isactive={activeTab === 0 ? 'true' : 'false'}>
                <Text>{t(messages.createAccount())}</Text>
              </Tab>
              <Tab isactive={activeTab === 1 ? 'true' : 'false'}>
                <Text>{t(messages.importPrivateKeys())}</Text>
              </Tab>
            </TabList>

            <TabPanel>
              <CreateAccountPanel />
            </TabPanel>
            <TabPanel>
              <ImportPrivateKeyPanel />
            </TabPanel>
          </Tabs>
        </Box>
      </Flex>
    </PageLayout>
  );
};

export default CreateImportAccount;
