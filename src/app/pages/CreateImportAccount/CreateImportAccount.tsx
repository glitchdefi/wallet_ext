import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { messages } from './messages';

import { Routes } from 'constants/routes';
import { colors } from 'theme/colors';

import { PageLayout } from 'app/layouts';
import { Box, Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { Button } from 'app/components/Button';
import { CloseIcon } from 'app/components/Svg';
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

          <Button p="0px" onClick={() => history.push(Routes.home)}>
            <CloseIcon width="12px" fill={colors.gray7} />
          </Button>
        </Flex>

        <Box height="100%" px="16px" background={colors.gray1}>
          <StyledTabs
            selectedIndex={activeTab}
            onSelect={(index) => setActiveTab(index)}
          >
            <TabList>
              <StyledTab isactive={activeTab === 0 ? 'true' : 'false'}>
                <Text>{t(messages.createAccount())}</Text>
              </StyledTab>
              <StyledTab isactive={activeTab === 1 ? 'true' : 'false'}>
                <Text>{t(messages.importPrivateKeys())}</Text>
              </StyledTab>
            </TabList>

            <TabPanel>
              <CreateAccountPanel />
            </TabPanel>
            <TabPanel>
              <ImportPrivateKeyPanel />
            </TabPanel>
          </StyledTabs>
        </Box>
      </Flex>
    </PageLayout>
  );
};

const StyledTabs = styled(Tabs)`
  display: flex;
  flex-direction: column;
  height: 100%;

  ul {
    list-style: none;
    display: flex;
    margin: 0px;
    padding: 0px;
    align-items: center;
    justify-content: space-between;
    padding-top: 16px;
    border-bottom: 1px solid ${colors.gray8};
  }

  .react-tabs__tab-panel--selected {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;

const StyledTab = styled(Tab)<{ isactive?: string }>`
  user-select: none;
  padding-top: 8px;
  padding-bottom: ${({ isactive }) => (isactive === 'true' ? '10px' : '11px')};
  cursor: pointer;
  border-bottom: ${({ isactive }) =>
    isactive === 'true' && `1px solid ${colors.primary}`};

  div {
    transition: all 0.5s;

    color: ${({ isactive }) =>
      isactive === 'true' ? colors.primary : colors.gray6};
  }
`;

export default CreateImportAccount;
