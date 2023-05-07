import React, { useCallback } from 'react';
import styled from 'styled-components';

import { AuthUrlInfo } from 'scripts/lib/handler/State';
import { getFaviconFromUrl } from 'utils/getFaviconFromUrl';
import { colors } from 'theme/colors';

import { Box, Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { CheckCircle, CloseCircle, DeleteIcon } from 'app/components/Svg';

interface Props {
  info: AuthUrlInfo;
  currentAddress: string;
  removeAuth: (url: string) => void;
  toggleAuth: (url: string, isApproved: boolean) => void;
  url: string;
}

export const ListItem: React.FC<Props> = ({
  url,
  info,
  toggleAuth,
  currentAddress,
  removeAuth,
}) => {
  const dappIcon = getFaviconFromUrl(url);
  const isApproved = info.isAllowed[currentAddress] === true;

  const switchAccess = useCallback(() => {
    toggleAuth(url, isApproved);
  }, [toggleAuth, url]);

  const _removeAuth = useCallback(() => {
    removeAuth(url);
  }, [removeAuth, url]);

  return (
    <ItemWrapper>
      <Flex alignItems="center">
        <Flex flex={1} flexDirection="column">
          <Flex alignItems="center">
            <Box mr="8px">
              <img
                style={{ borderRadius: '16px' }}
                width="32px"
                height="32px"
                src={dappIcon}
              />
            </Box>

            <Box>
              <Text color={colors.gray9}>{url}</Text>
              <Box>
                {isApproved ? (
                  <Flex alignItems="center">
                    <Flex alignItems="center">
                      <CheckCircle mr="5px" width="14px" />
                      <Text color={colors.gray6} fontSize="12px" mr="4px">
                        Approved.
                      </Text>
                    </Flex>
                    <LinkText color={colors.error} onClick={switchAccess}>
                      Disconnect
                    </LinkText>
                  </Flex>
                ) : (
                  <Flex alignItems="center">
                    <Flex alignItems="center">
                      <CloseCircle mr="5px" width="14px" />
                      <Text color={colors.gray6} fontSize="12px" mr="4px">
                        Denied.
                      </Text>
                    </Flex>

                    <LinkText color={colors.primary} onClick={switchAccess}>
                      Connect
                    </LinkText>
                  </Flex>
                )}
              </Box>
            </Box>
          </Flex>
        </Flex>

        <DeleteIcon width="24px" onClick={_removeAuth} />
      </Flex>
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
