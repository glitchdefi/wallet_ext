import { Tabs as ReactTabs } from 'react-tabs';
import styled from 'styled-components';
import { colors } from 'theme/colors';

export const Tabs = styled(ReactTabs)`
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
