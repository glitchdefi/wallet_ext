import React from 'react';
import styled from 'styled-components';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { colors } from 'theme/colors';

// Components
import { PageLayout } from 'app/layouts';
import { SettingIcon, WalletIcon } from 'app/components/Svg';
import { WalletPanel } from './components/WalletPanel/WalletPanel';
import { SettingsPanel } from './components/SettingsPanel/SettingsPanel';
import { useApplication } from 'contexts/ApplicationContext/hooks';

const Home: React.FC = () => {
  const { activeTabHomePage, onSetActiveTabHomePage } = useApplication();

  return (
    <PageLayout>
      <StyledTabs
        selectedIndex={activeTabHomePage}
        onSelect={(index) => onSetActiveTabHomePage(index)}
      >
        <TabPanel>
          <WalletPanel />
        </TabPanel>
        <TabPanel>
          <SettingsPanel />
        </TabPanel>

        <TabList>
          <StyledTab isactive={activeTabHomePage === 0 ? 'true' : 'false'}>
            <WalletIcon
              width="24px"
              color={activeTabHomePage === 0 ? colors.primary : colors.gray6}
            />
          </StyledTab>
          <StyledTab isactive={activeTabHomePage === 1 ? 'true' : 'false'}>
            <SettingIcon
              width="24px"
              color={activeTabHomePage === 1 ? colors.primary : colors.gray6}
            />
          </StyledTab>
        </TabList>
      </StyledTabs>
    </PageLayout>
  );
};

const StyledTabs = styled(Tabs)`
  ul {
    position: fixed;
    bottom: 0px;
    left: 0px;
    right: 0px;
    list-style: none;
    display: flex;
    margin: 0px;
    padding: 0px;
    align-items: center;
    border-top: 1px solid #480049;
    background-color: rgb(0, 12, 23);
    padding-top: 14px;
    padding-bottom: 10px;
    padding-left: 48px;
    padding-right: 48px;
    justify-content: space-around;
  }

  @media only screen and (min-width: 375px) {
    ul {
      position: absolute;
    }
  }
`;

const StyledTab = styled(Tab)<{ isactive?: string }>`
  transition: color 0.3s;
  user-select: none;
  cursor: pointer;
  border-bottom: ${({ isactive }) =>
    isactive === 'true' && `3px solid ${colors.primary}`};

  padding-bottom: ${({ isactive }) => (isactive === 'true' ? '4px' : '7px')};

  div {
    transition: all 0.5s;

    color: ${({ isactive }) =>
      isactive === 'true' ? colors.primary : colors.gray6};
  }
`;

export default Home;
