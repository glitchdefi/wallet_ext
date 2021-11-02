import React, { useState } from 'react';

import { useWalletActionHandlers, useWalletSlice } from 'state/wallet/hooks';

import { Flex } from 'app/components/Box';
import { Button } from 'app/components/Button';
import { LockIcon, AvatarIcon } from 'app/components/Svg';
import { ManageAccountModal } from './ManageAccountModal';

interface Props {
  hasBottomBorder?: boolean;
}

export const Header: React.FC<Props> = ({ hasBottomBorder }) => {
  useWalletSlice();

  const { onLockWallet } = useWalletActionHandlers();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  return (
    <>
      <Flex p="16px" alignItems="center">
        <Flex width="100%" alignItems="center" justifyContent="flex-end">
          <Button p="0px" onClick={onLockWallet}>
            <LockIcon />
          </Button>

          <Button p="0px" ml="24px" onClick={() => setIsOpenModal(true)}>
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
