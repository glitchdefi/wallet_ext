import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { Routes } from 'constants/routes';
import { Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { colors } from 'theme/colors';
import { Button } from 'app/components/Button';
import { CloseIcon } from 'app/components/Svg';
import { PageLayout } from 'app/layouts';
import { ListItem } from './components/ListItem';
import { DisconnectModal } from './components/DisconnectModal';

const ConnectedDapps: React.FC = React.memo(() => {
  const history = useHistory();
  const [showDisconnectModal, setShowDisconnectModal] =
    useState<boolean>(false);

  return (
    <PageLayout>
      <Flex height="100%" flexDirection="column" p="16px">
        <Flex
          background={colors.gray2}
          p="16px"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text color={colors.gray7} fontWeight="600">
            Connected Dapps
          </Text>

          <Button p="0px" onClick={() => history.push(Routes.home)}>
            <CloseIcon width="13px" fill={colors.gray7} />
          </Button>
        </Flex>

        <Flex
          flex={1}
          position="relative"
          flexDirection="column"
          background={colors.gray1}
          overflowY="scroll"
        >
          <ListItem onRemove={() => setShowDisconnectModal(true)} />
          <ListItem />
          <ListItem />
        </Flex>
      </Flex>

      <DisconnectModal
        show={showDisconnectModal}
        onCancel={() => setShowDisconnectModal(false)}
      />
    </PageLayout>
  );
});

export default ConnectedDapps;
