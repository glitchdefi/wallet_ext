import React from 'react';
import styled from 'styled-components';

import { Flex, Box } from 'app/components/Box';
import { CheckBox, Input } from 'app/components/Form';
import { colors } from 'theme/colors';
import { GlitchLogo } from 'app/components/Image';
import { SearchIcon } from 'app/components/Svg';
import { Text } from 'app/components/Text';
import { Button, ButtonShadow } from 'app/components/Button';

export const SearchPanel: React.FC = () => {
  return (
    <Flex flexDirection="column" mt="24px">
      <SearchWrapper>
        <Input placeholder="Search asset" />
        <Button height="42px" px="13px" variant="primary">
          <Flex alignItems="center" justifyContent="center">
            <SearchIcon width="16px" />
          </Flex>
        </Button>
      </SearchWrapper>

      <Box overflowY="scroll" height="293px" mt="16px">
        {[1, 2, 3, 4, 5].map((o) => (
          <TokenItem p="16px" alignItems="center">
            <label style={{ width: '100%' }} htmlFor={`${o}`}>
              <Flex flex={1} alignItems="center">
                <GlitchLogo width={36} height={36} />
                <Box ml="16px">
                  <Text fontSize="16px" bold>
                    GLCH
                  </Text>
                  <Text fontSize="12px" color={colors.gray6}>
                    0x038a68...d41bd564
                  </Text>
                </Box>
              </Flex>
            </label>
            <StyledCheckBox id={`${o}`} checked type="checkbox" />
          </TokenItem>
        ))}
      </Box>

      <Box px="16px" pb="16px" mt="16px">
        <ButtonShadow width="100%">Add Assets</ButtonShadow>
      </Box>
    </Flex>
  );
};

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;

  input {
    border: 1px solid ${colors.primary};
  }
`;

const TokenItem = styled(Flex)`
  cursor: pointer;
  &:hover {
    transition: all 0.3s;
    background-color: rgba(255, 255, 255, 0.03);
  }
`;

const StyledCheckBox = styled.input`
  position: absolute;
  opacity: 0;

  & + label {
    display: flex;
    position: relative;
    cursor: pointer;
    padding: 0;
  }

  & + label:before {
    content: '';
    margin-right: 8px;
    display: inline-block;
    vertical-align: text-top;
    width: 16px;
    min-width: 16px;
    height: 16px;
    border: 1px solid ${colors.gray5};
  }

  &:focus + label:before {
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.12);
  }

  &:checked + label:before {
    background: ${colors.primary};
    border: 1px solid ${colors.primary};
  }

  &:disabled + label {
    color: #b8b8b8;
    cursor: auto;
  }

  &:disabled + label:before {
    box-shadow: none;
    background: #ddd;
  }

  &:checked + label:after {
    content: '';
    position: absolute;
    left: 3px;
    top: 7px;
    background: ${colors.gray1};
    width: 2px;
    height: 2px;
    box-shadow: 2px 0 0 ${colors.gray1}, 4px 0 0 ${colors.gray1},
      4px -2px 0 ${colors.gray1}, 4px -4px 0 ${colors.gray1},
      4px -6px 0 ${colors.gray1}, 4px -8px 0 ${colors.gray1};
    transform: rotate(45deg);
  }
`;
