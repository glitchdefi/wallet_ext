import React, { useEffect, useState } from 'react';

import { Flex } from 'app/components/Box';
import { CheckIcon } from 'app/components/Svg';
import { Text } from 'app/components/Text';
import { colors } from 'theme/colors';
import { CONNECTED_DAPP_KEY } from 'constants/values';

export const ConnectedDappNoti: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const dappUrl = localStorage.getItem(CONNECTED_DAPP_KEY);

  useEffect(() => {
    if (dappUrl) {
      setShow(true);
    }
  }, [dappUrl]);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        localStorage.removeItem(CONNECTED_DAPP_KEY);
        setShow(false);
      }, 5000);
    }
  }, [show]);

  if (!show || !dappUrl) return null;
  return (
    <Flex
      px="16px"
      alignItems="center"
      width="100%"
      background={colors.background2}
    >
      <CheckIcon mr="6px" width="12px" color={colors.green} />
      <Text>Connected to {dappUrl}</Text>
    </Flex>
  );
};
