import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import QRCode from 'qrcode.react';

import { Routes } from 'constants/routes';
import { colors } from 'theme/colors';

import { Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { PageLayout } from 'app/layouts';
import { Button } from 'app/components/Button';
import { CheckIcon, CopyIcon, LeftArrowIcon } from 'app/components/Svg';

const ReceiveToken: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();

  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 1500);
    }
  }, [copied]);

  const onCopy = () => {
    navigator.clipboard.writeText('');
    setCopied(true);
  };

  return (
    <PageLayout minHeight="600px">
      <Flex
        alignItems="center"
        borderBottom={`1px solid ${colors.magenta2}`}
        p="16px"
      >
        <Button p="0px" onClick={() => history.goBack()}>
          <LeftArrowIcon width="13px" />
        </Button>
        <Text mt="3px" bold ml="16px" color={colors.gray7}>
          Receive
        </Text>
      </Flex>

      <Flex
        pt="32px"
        alignItems="center"
        flexDirection="column"
        px="32px"
        height="512px"
      >
        <Flex alignItems="center">
          <Text color={colors.gray7} bold>
            Account 1
          </Text>
        </Flex>

        <StyledBorder>
          <QRCode
            value="0xCfE3075e2827f8e1450Ba752c4dB47E058B40bfb"
            size={160}
          />
        </StyledBorder>

        <Flex
          mt="24px"
          background={colors.gray1}
          flexWrap="wrap"
          py="8px"
          px="26px"
        >
          <Text textAlign="center" color={colors.gray7} large>
            0xCfE3075e2827f8e1450Ba752c4dB47E058B40bfb
          </Text>
        </Flex>

        <Button width="160px" mt="24px" variant="secondary" onClick={onCopy}>
          <Flex justifyContent="center" alignItems="center">
            {copied ? (
              <CheckIcon width="12px" color={colors.primary} />
            ) : (
              <CopyIcon width="12px" />
            )}
            <Text ml="10px" color={colors.primary} bold>
              {copied ? 'Copied' : 'Copy address'}
            </Text>
          </Flex>
        </Button>
      </Flex>
    </PageLayout>
  );
};

const StyledBorder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 32px;
  width: 192px;
  height: 192px;
  background: ${colors.gray1};
  box-shadow: -3px 3px 0px ${colors.primary}, 3px -1px 0px ${colors.secondary};
`;

export default ReceiveToken;