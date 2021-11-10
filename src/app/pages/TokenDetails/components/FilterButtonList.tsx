import React from 'react';
import styled from 'styled-components';

import { colors } from 'theme/colors';

import { Text } from 'app/components/Text';

type List = {
  label: string;
  key: any;
};

interface Props {
  list: List[];
  onItemClick: (key: any) => void;
  activeKey: any;
}

export const FilterButtonList: React.FC<Props> = ({
  list,
  activeKey,
  onItemClick,
}) => {
  return (
    <ListWrapper>
      {list.map((o, i) => {
        const isActive = activeKey == o.key;
        const hasBorderRight = i < list.length - 1;

        return (
          <StyledButton
            isActive={isActive}
            hasBorderRight={hasBorderRight}
            key={i}
            onClick={() => onItemClick(o.key)}
          >
            <Label isActive={isActive}>{o.label}</Label>
          </StyledButton>
        );
      })}
    </ListWrapper>
  );
};

const ListWrapper = styled.div`
  display: flex;
  border: 1px solid ${colors.gray4};
`;

const StyledButton = styled.div<{
  isActive?: boolean;
  hasBorderRight?: boolean;
}>`
  width: 100%;
  padding-top: 5px;
  padding-bottom: 5px;
  border-right: ${({ hasBorderRight }) =>
    hasBorderRight && `1px solid ${colors.gray4}`};
  cursor: pointer;
  background-color: ${({ isActive }) => isActive && colors.primary};

  &:hover {
    opacity: 0.8;
  }
`;

const Label = styled(Text)<{ isActive?: boolean }>`
  text-align: center;
  color: ${({ isActive }) => (isActive ? colors.gray1 : colors.gray5)};
  font-weight: ${({ isActive }) => (isActive ? '600' : '400')};
`;
