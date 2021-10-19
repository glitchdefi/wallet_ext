import React from 'react';
import styled from 'styled-components';

import { colors } from 'theme/colors';

// Components
import { Box, Flex } from 'app/components/Box';
import { Button, CopyButton } from 'app/components/Button';
import { Text } from 'app/components/Text';
import { LockIcon, AvatarIcon, EllipsisIcon } from 'app/components/Svg';
import { GlitchLogo } from 'app/components/Image';
import { AssetsSection } from './components/AssetsSection';

const Home: React.FC = () => {
  return (
    <>
      <Flex p="16px" alignItems="center">
        <Flex width="100%" alignItems="center" justifyContent="flex-end">
          <Button p="0px">
            <LockIcon />
          </Button>

          <Button p="0px" ml="24px">
            <AvatarIcon width="40px" />
          </Button>
        </Flex>
      </Flex>

      <Box px="16px" mt="16px">
        <AccountCard>
          <Flex alignItems="center" justifyContent="space-between">
            <Text color={colors.gray7} bold>
              Account 1
            </Text>
            <Button p="0px">
              <Flex width="24px" height="24px" alignItems="center">
                <EllipsisIcon />
              </Flex>
            </Button>
          </Flex>

          <Flex alignItems="center">
            <Text fontSize="12px" color={colors.primary}>
              0x7b17c2...22D89931
            </Text>
            <CopyButton p="2px" ml="6px" width="10px" />
          </Flex>

          <Flex alignItems="center" mt="24px">
            <Box width="24px" height="24px" pt="2px">
              <GlitchLogo width={24} height={24} />
            </Box>

            <Flex ml="8px" alignItems="flex-end">
              <Text color={colors.white} fontSize="24px" bold>
                500.000000
              </Text>
              <Text ml="8px" pb="5px" color={colors.white}>
                GLCH
              </Text>
            </Flex>
          </Flex>
        </AccountCard>
      </Box>

      <AssetsSection />
    </>
  );
};

const AccountCard = styled.div`
  padding: 16px;
  border-top: 3px solid #a900ac;
  background-color: #14162b;
`;

export default Home;
