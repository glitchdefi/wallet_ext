import React from 'react';
import styled from 'styled-components';
import { SpaceProps } from 'styled-system';
import { AccountTypes } from 'scripts/types';

import { Box, Flex } from 'app/components/Box';
import { CheckBox } from 'app/components/Form';
import { Text } from 'app/components/Text';
import { colors } from 'theme/colors';
import { calcTotalBalance } from 'utils/number';

interface Props extends SpaceProps {
  hasChecked?: boolean;
  id: string;
  checked: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  data: AccountTypes;
}

export const AccountItem: React.FC<Props> = (props) => {
  const { id, checked, onChange, data, hasChecked = true, ...rest } = props;
  return (
    <AccountItemWrapper p="16px" alignItems="center" {...rest}>
      {hasChecked ? (
        <CheckBox
          id={id}
          checked={checked}
          onChange={onChange}
          labelComponent={
            <Flex ml="8px" alignItems="center">
              <Box mr="16px">
                <img src={data.avatar} alt="" width="40px" height="40px" />
              </Box>
              <Box>
                <Flex alignItems="center">
                  <Text bold>{data.name}</Text>
                </Flex>
                <Text fontSize="12px">{data.address}</Text>
                <Text fontSize="12px" color={colors.gray6}>
                  {calcTotalBalance(data.balance)} GLCH
                </Text>
              </Box>
            </Flex>
          }
        />
      ) : (
        <Flex alignItems="center">
          <Box mr="16px">
            <img src={data.avatar} alt="" width="40px" height="40px" />
          </Box>
          <Box>
            <Flex alignItems="center">
              <Text bold>{data.name}</Text>
            </Flex>
            <Text fontSize="12px">{data.address}</Text>
            <Text fontSize="12px" color={colors.gray6}>
              {calcTotalBalance(data.balance)} GLCH
            </Text>
          </Box>
        </Flex>
      )}
    </AccountItemWrapper>
  );
};

const AccountItemWrapper = styled(Flex)`
  transition: all 0.3s ease;

  label {
    align-items: center;
  }

  label:after {
    left: 3px;
    top: 37px !important;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.03);
  }

  @media only screen and (min-width: 768px) {
    label:after {
      top: 28px !important;
    }
  }
`;
