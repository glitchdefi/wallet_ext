import React, { useCallback } from 'react';
import styled from 'styled-components';

import { AuthUrlInfo } from '../../../../scripts/lib/handler/State';
import { colors } from 'theme/colors';

import { Box, Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { DeleteIcon } from 'app/components/Svg';

interface Props {
  info: AuthUrlInfo;
  currentAddress: string;
  removeAuth: (url: string) => void;
  toggleAuth: (url: string) => void;
  url: string;
}

export const ListItem: React.FC<Props> = ({
  url,
  info,
  toggleAuth,
  currentAddress,
  removeAuth,
}) => {
  const switchAccess = useCallback(() => {
    toggleAuth(url);
  }, [toggleAuth, url]);

  const _removeAuth = useCallback(() => {
    removeAuth(url);
  }, [removeAuth, url]);

  return (
    <ItemWrapper>
      <Flex alignItems="center">
        <Flex flex={1} alignItems="center">
          {/* <Box mr="8px">
          <img width="32px" height="32px" />
        </Box> */}
          <Text color={colors.gray9}>{url}</Text>
        </Flex>

        <DeleteIcon width="18px" onClick={_removeAuth} />
      </Flex>

      <Box>
        {info.isAllowed[currentAddress] === true ? (
          <Flex alignItems="center">
            <Text color={colors.green} fontSize="12px" mr="4px">
              Approved
            </Text>
            <LinkText color={colors.gray} onClick={switchAccess}>
              Disconnect
            </LinkText>
          </Flex>
        ) : (
          <Flex alignItems="center">
            <Text color={colors.gray6} fontSize="12px" mr="4px">
              Denied.
            </Text>
            <LinkText color={colors.primary} onClick={switchAccess}>
              Connect
            </LinkText>
          </Flex>
        )}
      </Box>
    </ItemWrapper>
  );
};

const ItemWrapper = styled.div`
  transition: all 0.3s;
  padding: 16px;

  svg {
    cursor: pointer;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.03);
  }
`;

const LinkText = styled(Text)`
  text-decoration: underline;
  font-weight: 600;
  font-size: 12px;
  cursor: pointer;
`;
