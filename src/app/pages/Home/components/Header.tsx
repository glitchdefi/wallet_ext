import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { useWalletActionHandlers, useWalletSlice } from 'state/wallet/hooks';
import { colors } from 'theme/colors';
import { Routes } from 'constants/routes';

import { Flex } from 'app/components/Box';
import { Button } from 'app/components/Button';
import { LockIcon, AvatarIcon, LeftArrowIcon } from 'app/components/Svg';
import { ManageAccountModal } from './ManageAccountModal';
interface Props {
  hasBackButton?: boolean;
  hasBottomBorder?: boolean;
}

export const Header: React.FC<Props> = ({ hasBackButton, hasBottomBorder }) => {
  useWalletSlice();
  const history = useHistory();

  const { onLockWallet } = useWalletActionHandlers();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  return (
    <>
      <Flex
        borderBottom={hasBottomBorder && `1px solid ${colors.magenta2}`}
        p="16px"
        alignItems="center"
      >
        {hasBackButton && (
          <Button p="0px" onClick={() => history.push(Routes.home)}>
            <LeftArrowIcon color={colors.primary} width="16px" />
          </Button>
        )}

        <Flex width="100%" alignItems="center" justifyContent="flex-end">
          <Button p="0px" onClick={onLockWallet}>
            <LockIcon />
          </Button>

          <Button
            p="0px"
            ml="24px"
            onClick={() => setIsOpenModal((prev) => !prev)}
          >
            <AvatarIcon width="40px" />
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
