import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { colors } from 'theme/colors';

import { Box, Flex } from 'app/components/Box';
import { Button } from 'app/components/Button';
import { LockIcon, LeftArrowIcon } from 'app/components/Svg';
import { ManageAccountModal } from './ManageAccountModal';
import { Avatar, ExpandButton, NetworkBox } from 'app/components/Shared';
interface Props {
  account?: { avatar?: string };
  hasBackButton?: boolean;
  hasExpandButton?: boolean;
  hasBottomBorder?: boolean;
  onLockWallet?: (history: any) => void;
}

export const Header: React.FC<Props> = ({
  account,
  hasBackButton,
  hasBottomBorder,
  hasExpandButton,
  onLockWallet,
}) => {
  const history = useHistory();
  const { avatar } = account;

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  return (
    <>
      <Flex
        borderBottom={hasBottomBorder && `1px solid ${colors.magenta2}`}
        p="16px"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex alignItems="center">
          {hasBackButton && (
            <Button p="0px" mr="16px" onClick={() => history.push('/')}>
              <LeftArrowIcon color={colors.primary} width="16px" />
            </Button>
          )}

          {hasExpandButton && (
            <Box mr="16px">
              <ExpandButton />
            </Box>
          )}
          <NetworkBox />
        </Flex>

        <Flex alignItems="center" justifyContent="flex-end">
          <Button p="0px" onClick={() => onLockWallet(history)}>
            <LockIcon />
          </Button>

          <Button
            p="0px"
            ml="24px"
            onClick={() => setIsOpenModal((prev) => !prev)}
          >
            <Avatar src={avatar} />
          </Button>
        </Flex>
      </Flex>

      <ManageAccountModal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      />
    </>
  );
};
