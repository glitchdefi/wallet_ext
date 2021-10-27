import React from 'react';
import { Flex } from 'app/components/Box';
import { Button } from 'app/components/Button';
import { LockIcon, AvatarIcon } from 'app/components/Svg';

interface Props {
  onAvatarClick?(): void;
  onLockClick?(): void;
}

export const Header: React.FC<Props> = ({ onLockClick, onAvatarClick }) => {
  return (
    <Flex p="16px" alignItems="center">
      <Flex width="100%" alignItems="center" justifyContent="flex-end">
        <Button p="0px" onClick={onLockClick}>
          <LockIcon />
        </Button>

        <Button p="0px" ml="24px" onClick={onAvatarClick}>
          <AvatarIcon width="40px" />
        </Button>
      </Flex>
    </Flex>
  );
};
