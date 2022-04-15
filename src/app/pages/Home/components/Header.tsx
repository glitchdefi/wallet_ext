import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router';

import { colors } from 'theme/colors';

import { Flex } from 'app/components/Box';
import { Button } from 'app/components/Button';
import { LockIcon, LeftArrowIcon, ExpandIcon } from 'app/components/Svg';
import { ManageAccountModal } from './ManageAccountModal';
import { Avatar, NetworkBox } from 'app/components/Shared';
import { windowOpen } from 'scripts/ui/messaging';
import { useToast } from 'hooks/useToast';
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
  const { toastError } = useToast();
  const { avatar } = account;

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const onExpand = useCallback(() => {
    windowOpen('/').catch((error: Error) => toastError(null, error.message));
  }, []);

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
            <Button p="0px" mr="16px" onClick={onExpand}>
              <Flex>
                <ExpandIcon />
              </Flex>
            </Button>
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
