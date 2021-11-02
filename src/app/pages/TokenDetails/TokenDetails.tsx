import React from 'react';
import { useHistory } from 'react-router';
import { Routes } from 'constants/routes';

import { colors } from 'theme/colors';

import { Box, Flex } from 'app/components/Box';
import { PageLayout } from 'app/layouts';
import { Header } from '../Home/components/Header';
import { Text } from 'app/components/Text';
import { GlitchLogo, Image } from 'app/components/Image';
import { QrCodeIcon, SendIcon } from 'app/components/Svg';
import { Button } from 'app/components/Button';
import { Empty } from 'app/components/Empty';

const TokenDetails: React.FC = () => {
  const history = useHistory();

  return (
    <PageLayout>
      <Header />

      <Flex flexDirection="column" px="16px">
        <Flex mt="26px" flexDirection="column" alignItems="center">
          <GlitchLogo width={64} height={64} />

          <Flex mt="12px" alignItems="flex-end">
            <Text fontSize="24px" bold color={colors.white}>
              500.00000
            </Text>
            <Text pb="4px" ml="8px" color={colors.white}>
              GLCH
            </Text>
          </Flex>

          <Text fontSize="12px" color={colors.gray6}>
            ~ $309.84 USD
          </Text>
        </Flex>

        <Flex
          width="100%"
          alignItems="center"
          justifyContent="center"
          mt="24px"
        >
          <Button variant="primary" mr="16px">
            <Flex alignItems="center" justifyContent="center" width="115px">
              <SendIcon />
              <Text bold color={colors.gray1} ml="9px">
                Send
              </Text>
            </Flex>
          </Button>

          <Button
            variant="primary"
            onClick={() => history.push(Routes.receiveToken)}
          >
            <Flex alignItems="center" justifyContent="center" width="115px">
              <QrCodeIcon />
              <Text bold color={colors.gray1} ml="9px">
                Receive
              </Text>
            </Flex>
          </Button>
        </Flex>

        <Box my="32px" width="100%" height="1px" background={colors.magenta2} />

        <Text color={colors.gray7} bold>
          Transaction history
        </Text>

        <Empty my="48px" message="You have no transactions" />
      </Flex>
    </PageLayout>
  );
};

export default TokenDetails;
