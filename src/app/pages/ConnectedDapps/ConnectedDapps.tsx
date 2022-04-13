import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router';
import isEmpty from 'lodash/isEmpty';
import { AuthUrls, AuthUrlInfo } from '../../../scripts/lib/handler/State';
import {
  getAuthList,
  removeAuthorization,
  toggleAuthorization,
} from 'scripts/ui/messaging';
import { useToast } from 'hooks/useToast';

import { Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { colors } from 'theme/colors';
import { Button } from 'app/components/Button';
import { CloseIcon } from 'app/components/Svg';
import { PageLayout } from 'app/layouts';
import { ListItem } from './components/ListItem';
import { DisconnectModal } from './components/DisconnectModal';
import { Empty } from 'app/components/Empty';

const ConnectedDapps: React.FC = React.memo(() => {
  const history = useHistory();
  const { toastError } = useToast();
  const [authList, setAuthList] = useState<AuthUrls | null>(null);
  const [urlSelected, setUrlSelected] = useState<string>('');
  const [showDisconnectModal, setShowDisconnectModal] =
    useState<boolean>(false);

  useEffect(() => {
    getAuthList()
      .then(({ list }) => setAuthList(list))
      .catch((error: Error) => toastError(null, error.message));
  }, []);

  const toggleAuth = useCallback((url: string) => {
    toggleAuthorization(url)
      .then(({ list }) => setAuthList(list))
      .catch((error: Error) => toastError(null, error.message));
  }, []);

  const removeAuth = useCallback(() => {
    removeAuthorization(urlSelected)
      .then(({ list }) => {
        setAuthList(list);
        setShowDisconnectModal(false);
      })
      .catch((error: Error) => toastError(null, error.message));
  }, [urlSelected]);

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

          <Button p="0px" onClick={() => history.push("/")}>
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
          {isEmpty(authList) ? (
            <Flex flex={1} alignItems="center" justifyContent="center">
              <Empty message="Not connected Dapps found" />
            </Flex>
          ) : (
            Object.entries(authList)?.map(
              ([url, info]: [string, AuthUrlInfo]) => (
                <ListItem
                  key={url}
                  url={url}
                  info={info}
                  toggleAuth={toggleAuth}
                  removeAuth={(url: string) => {
                    setUrlSelected(url);
                    setShowDisconnectModal(true);
                  }}
                />
              )
            )
          )}
        </Flex>
      </Flex>

      <DisconnectModal
        url={urlSelected}
        show={showDisconnectModal}
        onConfirm={removeAuth}
        onCancel={() => setShowDisconnectModal(false)}
      />
    </PageLayout>
  );
});

export default ConnectedDapps;
