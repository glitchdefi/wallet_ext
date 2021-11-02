import React from 'react';
import styled from 'styled-components';

import { Flex, Box } from 'app/components/Box';
import { Input, Label } from 'app/components/Form';
import { colors } from 'theme/colors';
import { GlitchLogo } from 'app/components/Image';
import { DownArrowIcon } from 'app/components/Svg';
import { Text } from 'app/components/Text';
import { ButtonShadow } from 'app/components/Button';

export const CustomAssetPanel: React.FC = () => {
  return (
    <Flex px="16px" flexDirection="column" mt="24px">
      <Box>
        <Label>Network</Label>
        <NetworkWrapper>
          <Flex flex={1} alignItems="center">
            <GlitchLogo width={19} height={19} />
            <Text fontSize="16px" ml="4px">
              GLCH
            </Text>
          </Flex>

          <DownArrowIcon width="16px" color={colors.primary} />
        </NetworkWrapper>
      </Box>

      <Box mt="24px">
        <Label>Contract address</Label>
        <Input placeholder="Enter Contract address" />
      </Box>

      <Box mt="24px">
        <Label>Symbol</Label>
        <Input placeholder="GLCH" />
      </Box>

      <Box mt="24px">
        <Label>Decimals of Precision</Label>
        <Input placeholder="0" />
      </Box>

      <Box mt="36px" pb="24px">
        <ButtonShadow width="100%">Next</ButtonShadow>
      </Box>
    </Flex>
  );
};

const NetworkWrapper = styled.div`
  border: 1px solid ${colors.gray8};
  padding: 8px 12px;
  display: flex;
  align-items: center;
`;
