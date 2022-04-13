import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styled from 'styled-components';

import { colors } from 'theme/colors';

import { Box, Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { PageLayout } from 'app/layouts';
import { Button } from 'app/components/Button';
import { CloseIcon } from 'app/components/Svg';
import { CustomAssetPanel } from './components/CustomAssetPanel';
import { SearchPanel } from './components/SearchPanel';

const AddAssets: React.FC = () => {
  const history = useHistory();

  const [activeTab, setActiveTab] = useState(0);

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
            Add assets
          </Text>

          <Button p="0px" onClick={() => history.push('/')}>
            <CloseIcon width="12px" fill={colors.gray7} />
          </Button>
        </Flex>

        <Flex
          alignItems="center"
          flexDirection="column"
          minHeight="512px"
          background={colors.gray1}
        >
          <StyledTabs
            selectedIndex={activeTab}
            onSelect={(index) => setActiveTab(index)}
          >
            <Box px="16px">
              <TabList>
                <StyledTab isactive={activeTab === 0 ? 'true' : 'false'}>
                  Search
                </StyledTab>
                <StyledTab isactive={activeTab === 1 ? 'true' : 'false'}>
                  Custom asset
                </StyledTab>
              </TabList>
            </Box>

            <TabPanel>
              <SearchPanel />
            </TabPanel>
            <TabPanel>
              <CustomAssetPanel />
            </TabPanel>
          </StyledTabs>
        </Flex>
      </Box>
    </PageLayout>
  );
};

const StyledTabs = styled(Tabs)`
  width: 100%;

  ul {
    list-style: none;
    display: flex;
    margin: 0px;
    padding: 0px;
    align-items: center;
    padding-top: 16px;
    border-bottom: 1px solid ${colors.gray8};
  }
`;

const StyledTab = styled(Tab)<{ isactive?: string }>`
  user-select: none;
  padding-top: 8px;
  padding-bottom: ${({ isactive }) => (isactive === 'true' ? '10px' : '11px')};
  cursor: pointer;
  margin-right: 32px;
  border-bottom: ${({ isactive }) =>
    isactive === 'true' && `1px solid ${colors.primary}`};

  color: ${({ isactive }) =>
    isactive === 'true' ? colors.primary : colors.gray6};
  font-size: 14px;
`;

export default AddAssets;
