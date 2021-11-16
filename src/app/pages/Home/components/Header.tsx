import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { useWalletActionHandlers } from 'state/wallet/hooks';
import { colors } from 'theme/colors';
import { Routes } from 'constants/routes';

import { Flex, Box } from 'app/components/Box';
import { Button } from 'app/components/Button';
import {
  LockIcon,
  AvatarIcon,
  LeftArrowIcon,
  DownArrowIcon,
} from 'app/components/Svg';
import { ManageAccountModal } from './ManageAccountModal';
import { Text } from 'app/components/Text';
interface Props {
  account?: { avatar?: string };
  hasBackButton?: boolean;
  hasBottomBorder?: boolean;
}

export const Header: React.FC<Props> = ({
  account,
  hasBackButton,
  hasBottomBorder,
}) => {
  const history = useHistory();
  const { avatar } = account;

  const { onLockWallet } = useWalletActionHandlers();

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
            <Button p="0px" mr="16px" onClick={() => history.push(Routes.home)}>
              <LeftArrowIcon color={colors.primary} width="16px" />
            </Button>
          )}

          <Flex
            width="fit-content"
            alignItems="center"
            p="8px"
            border={`1px solid ${colors.gray2}`}
          >
            <Box
              width="10px"
              height="10px"
              borderRadius="5px"
              background={colors.green}
            />
            <Text mx="8px" fontSize="12px">
              Glitch Testnet
            </Text>
            <DownArrowIcon width="12px" color={colors.gray7} />
          </Flex>
        </Flex>

        <Flex alignItems="center" justifyContent="flex-end">
          <Button p="0px" onClick={onLockWallet}>
            <LockIcon />
          </Button>

          <Button
            p="0px"
            ml="24px"
            onClick={() => setIsOpenModal((prev) => !prev)}
          >
            <Flex
              position="relative"
              alignItems="center"
              justifyContent="center"
            >
              <AvatarIcon width="40px" />
              <img style={{ position: 'absolute' }} src={avatar} width="32px" />
            </Flex>
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
