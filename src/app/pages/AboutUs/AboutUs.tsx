import React from 'react';
import { colors } from 'theme/colors';
import { useHistory } from 'react-router';
import secrets from 'secrets';

import logo from '../../../assets/img/gl_logo.png';

import { Routes } from 'constants/routes';

// Components
import { PageLayout } from 'app/layouts';
import { Box, Flex } from 'app/components/Box';
import { RightArrowIcon } from 'app/components/Svg';
import { Text } from 'app/components/Text';
import { Image } from 'app/components/Image';
import { Button } from 'app/components/Button';
import { Header } from 'app/components/Shared';

const AboutUs: React.FC = () => {
  const history = useHistory();

  return (
    <PageLayout>
      <Header onBack={() => history.push(Routes.home)} title="About Glitch" />

      <Box height="543px" overflowY="scroll">
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
              Current version {secrets.walletVersion}
            </Text>
          </Flex>
        </Box>

        <Box px="16px">
          <Item
            label="Privacy Policy"
            href="https://glitch.finance/privacy-policy/"
          />

          <Box my="16px" height="1px" background={colors.magenta2} />

          <Item
            label="Visit our Official website"
            href="https://glitch.finance/"
          />
          <Item
            label="Join us on Telegram"
            href="https://t.me/glitchprotocol"
          />
          <Item
            label="Follow us on Twitter"
            href="https://twitter.com/glitchprotocol"
          />
          <Item
            label="Follow us on Medium"
            href="https://medium.com/glitchfinance"
          />
        </Box>
      </Box>
    </PageLayout>
  );
};

const Item: React.FC<{ label: string; href?: string }> = ({ label, href }) => (
  <Button width="100%" px="16" py="21px" onClick={() => window.open(href)}>
    <Flex alignItems="center" justifyContent="space-between">
      <Text>{label}</Text>
      <RightArrowIcon width="16px" />
    </Flex>
  </Button>
);

export default AboutUs;
