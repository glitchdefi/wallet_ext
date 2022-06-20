import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router';
import isEmpty from 'lodash/isEmpty';
import { AuthUrls, AuthUrlInfo } from '../../../scripts/lib/handler/State';
import {
  getAuthList,
  removeAuthorization,
  toggleAuthorization,
  updateWalletStorage,
} from 'scripts/ui/messaging';
import { useToast } from 'hooks/useToast';
import { useAccount, useWallet } from 'contexts/WalletContext/hooks';
import { AccountTypes } from 'scripts/types';

import { Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { colors } from 'theme/colors';
import { Button } from 'app/components/Button';
import { CloseIcon } from 'app/components/Svg';
import { PageLayout } from 'app/layouts';
import { ListItem } from './components/ListItem';
import { ConfirmationModal } from './components/ConfirmationModal';
import { Empty } from 'app/components/Empty';

const ConnectedDapps: React.FC = React.memo(() => {
  const history = useHistory();
  const { toastError } = useToast();
  const { walletCtx, setWalletCtx } = useWallet();
  const { address } = useAccount();
  const [authList, setAuthList] = useState<AuthUrls | null>(null);
  const [urlSelected, setUrlSelected] = useState<string>('');
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  const [modalType, setModalType] = useState<'connect' | 'remove'>('connect');
  const { accounts } = walletCtx || {};

  useEffect(() => {
    getAuthList()
      .then(({ list }) => setAuthList(list))
      .catch((error: Error) => toastError(null, error.message));
  }, []);

  const toggleAuth = useCallback(
    (dappUrl?: string): void => {
      const url = dappUrl || urlSelected;

      const newAccounts = {
        ...accounts,
        [address]: {
          ...accounts[address],
          allowedUrls: accounts[address].allowedUrls.includes(url)
            ? [...accounts[address].allowedUrls.filter((_url) => _url !== url)]
            : [...accounts[address].allowedUrls, url],
        },
      };

      updateWalletStorage({
        data: {
          ...walletCtx,
          accounts: newAccounts,
        },
      }).then((data) => {
        setWalletCtx(data);

        toggleAuthorization({ url, address })
          .then(({ list }) => setAuthList(list))
          .catch((error: Error) => toastError(null, error.message))
          .finally(() => setShowConfirmationModal(false));
      });
    },
    [walletCtx, urlSelected]
  );

  const removeAuth = useCallback(() => {
    let newAccounts = {};

    Object.entries(accounts).map(([address, _]: [string, AccountTypes]) => {
      newAccounts = {
        ...newAccounts,
        [address]: {
          ...accounts[address],
          allowedUrls: [
            ...accounts[address].allowedUrls.filter(
              (_url) => _url !== urlSelected
            ),
          ],
        },
      };
    });

    updateWalletStorage({
      data: {
        ...walletCtx,
        accounts: newAccounts,
      },
    }).then((data) => {
      setWalletCtx(data);

      removeAuthorization(urlSelected)
        .then(({ list }) => {
          setAuthList(list);
        })
        .catch((error: Error) => toastError(null, error.message))
        .finally(() => setShowConfirmationModal(false));
    });
  }, [walletCtx, urlSelected]);

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

          <Button p="0px" onClick={() => history.push('/')}>
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
                  currentAddress={address}
                  toggleAuth={(url: string, isApproved: boolean) => {
                    if (isApproved) {
                      toggleAuth(url);
                    } else {
                      setUrlSelected(url);
                      setModalType('connect');
                      setShowConfirmationModal(true);
                    }
                  }}
                  removeAuth={(url: string) => {
                    setUrlSelected(url);
                    setModalType('remove');
                    setShowConfirmationModal(true);
                  }}
                />
              )
            )
          )}
        </Flex>
      </Flex>

      <ConfirmationModal
        type={modalType}
        url={urlSelected}
        show={showConfirmationModal}
        onConfirm={() => {
          if (modalType === 'connect') {
            toggleAuth();
          } else {
            removeAuth();
          }
        }}
        onCancel={() => setShowConfirmationModal(false)}
      />
    </PageLayout>
  );
});

export default ConnectedDapps;
