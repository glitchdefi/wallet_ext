import React from 'react';
import { colors } from 'theme/colors';
import { Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { RightArrowIcon } from 'app/components/Svg';
import { Button } from 'app/components/Button';

interface Props {
  label: string;
  actionLabel?: any;
  leftIcon: React.ReactNode;
  rightComponent?: React.ReactNode;
  onClick?(): void;
}

export const SettingItem: React.FC<Props> = ({
  label,
  actionLabel,
  rightComponent,
  leftIcon,
  onClick,
}) => {
  const getContent = () => (
    <Flex py="21px" alignItems="center" justifyContent="space-between">
      <Flex flex={1} alignItems="center">
        {React.isValidElement(leftIcon) && React.cloneElement(leftIcon)}
        <Text ml="8px">{label}</Text>
      </Flex>

      {React.isValidElement(rightComponent) ? (
        React.cloneElement(rightComponent)
      ) : (
        <Flex alignItems="center">
          {actionLabel && <Text color={colors.gray6}>{actionLabel}</Text>}
          <RightArrowIcon ml="21px" />
        </Flex>
      )}
    </Flex>
  );

  return React.isValidElement(rightComponent) ? (
    getContent()
  ) : (
    <Button width="100%" p="0px" onClick={onClick}>
      {getContent()}
    </Button>
  );
};
