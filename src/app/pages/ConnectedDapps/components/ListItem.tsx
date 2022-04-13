import React, { useCallback } from 'react';
import styled from 'styled-components';

import { AuthUrlInfo } from '../../../../scripts/lib/handler/State';
import { colors } from 'theme/colors';

import { Box, Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { DeleteIcon } from 'app/components/Svg';
import { Switch } from 'app/components/Switch';

interface Props {
  info: AuthUrlInfo;
  removeAuth: (url: string) => void;
  toggleAuth: (url: string) => void;
  url: string;
}

export const ListItem: React.FC<Props> = ({
  url,
  info,
  toggleAuth,
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

      <Box mt="8px">
        <Switch
          checked={info.isAllowed}
          checkedLabel="Allowed"
          onChange={switchAccess}
          uncheckedLabel="Denied"
        />
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
