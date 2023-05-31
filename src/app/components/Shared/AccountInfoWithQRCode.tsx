import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from 'theme/colors';

import QRCode from 'qrcode.react';
import { Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { Button } from 'app/components/Button';
import { CheckIcon, CopyIcon } from 'app/components/Svg';

interface AccountInfoWithQRCodeProps {
  address: string;
}

export const AccountInfoWithQRCode: React.FC<AccountInfoWithQRCodeProps> = (
  props
) => {
  const { address } = props;
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 1500);
    }
  }, [copied]);

  const onCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
  };

  return (
    <Flex flexDirection="column" alignItems="center">
      <StyledBorder>
        <QRCode value={address} size={160} />
      </StyledBorder>

      <Flex
        mt="24px"
        background={colors.gray2}
        flexWrap="wrap"
        py="8px"
        px="26px"
      >
        <Text textAlign="center" color={colors.gray7} large>
          {address}
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
