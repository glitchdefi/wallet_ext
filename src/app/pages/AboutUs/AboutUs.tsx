import React from 'react';
import { colors } from 'theme/colors';
import { useHistory } from 'react-router';

import logo from '../../../assets/img/gl_logo.png';

import { Routes } from 'constants/routes';

// Components
import { PageLayout } from 'app/layouts';
import { Box, Flex } from 'app/components/Box';
import { LeftArrowIcon, RightArrowIcon } from 'app/components/Svg';
import { Text } from 'app/components/Text';
import { Image } from 'app/components/Image';
import { Button } from 'app/components/Button';

const AboutUs: React.FC = () => {
  const history = useHistory();

  return (
    <PageLayout>
      <Flex
        alignItems="center"
        borderBottom={`1px solid ${colors.magenta2}`}
        p="16px"
      >
        <Button p="0px" onClick={() => history.push(Routes.home)}>
          <LeftArrowIcon width="13px" />
        </Button>
        <Text mt="3px" bold ml="16px" color={colors.gray7}>
          About Glitch
        </Text>
      </Flex>

      <Box p="16px">
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          background={colors.geekBlue}
          pt="8px"
          px="16px"
          pb="16px"
        >
          <Image src={logo} width={150} height={72} />
          <Text bold large mt="12px">
            Glitch Wallet
          </Text>
          <Text fontSize="12px" color={colors.gray5}>
            Current version 1.1.0
          </Text>
        </Flex>
      </Box>

      <Box px="16px" mt="16px">
        <Item label="Terms of Service" />
        <Item label="Privacy Policy" />

        <Box my="16px" height="1px" background={colors.magenta2} />

        <Item label="Visit our Official website" />
        <Item label="Join us on Telegram" />
        <Item label="Follow us on Twitter" />
        <Item label="Follow us on Medium" />
      </Box>
    </PageLayout>
  );
};

const Item: React.FC<{ label: string; onClick?(): void }> = ({
  label,
  onClick,
}) => (
  <Button width="100%" px="16" py="21px" onClick={onClick}>
    <Flex alignItems="center" justifyContent="space-between">
      <Text>{label}</Text>

      <RightArrowIcon width="16px" />
    </Flex>
  </Button>
);

export default AboutUs;
