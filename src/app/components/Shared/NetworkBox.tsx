import React from 'react';
import styled from 'styled-components';

import { colors } from 'theme/colors';
import { GlitchNetwork } from 'constants/networks';

import { useNetwork, useSettings } from 'contexts/SettingsContext/hooks';

// Components
import { Text } from 'app/components/Text';
import { Box, Flex } from 'app/components/Box';
import { DownArrowIcon } from 'app/components/Svg';
import { Dropdown } from '../Dropdown';
interface Props {
  showArrow?: boolean;
  customName?: string;
}

const NetworkBox: React.FC<Props> = React.memo((props) => {
  const network = useNetwork();
  const { setNetwork } = useSettings();
  const { showArrow = true, customName } = props;

  const networkName = GlitchNetwork.find((n) => n.key === network)?.label;

  return (
    <Wrapper>
      <Dropdown
        showChecked
        activeKey={network}
        onSelect={(key) => {
          if (showArrow) {
            setNetwork({ network: key });
          }
        }}
        customToggle={
          <Flex
            width="fit-content"
            alignItems="center"
            p="8px"
            border={`1px solid ${colors.gray2}`}
          >
            <Box
              width="10px"
              height="10px"
              borderRadius="5px"
              background={colors.green}
            />
            <Text mx="8px" fontSize="12px">
              {customName || networkName}
            </Text>
            {showArrow && <DownArrowIcon width="12px" color={colors.gray7} />}
          </Flex>
        }
        items={GlitchNetwork}
      />
    </Wrapper>
  );
});

const Wrapper = styled.div`
  .dropdown-menu {
    min-width: 12rem;
  }
`;

export default NetworkBox;
