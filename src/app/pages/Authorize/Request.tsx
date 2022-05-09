import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router';

import { AccountTypes, RequestAuthorizeTab } from 'scripts/types';

import { useToast } from 'hooks/useToast';
import { useWallet } from 'contexts/WalletContext/hooks';
import { useApplication } from 'contexts/ApplicationContext/hooks';
import {
  approveAuthRequest,
  hiddenAccount,
  rejectAuthRequest,
  updateWalletStorage,
} from 'scripts/ui/messaging';

import { Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { colors } from 'theme/colors';
import { Button } from 'app/components/Button';
import { CloseIcon } from 'app/components/Svg';
import RequestStep1 from './components/RequestStep1';
import RequestStep2 from './components/RequestStep2';
import { CONNECTED_DAPP_KEY } from 'constants/values';

interface Props {
  authId: string;
  request: RequestAuthorizeTab;
  url: string;
}

const Request: React.FC<Props> = ({ authId, request: { origin }, url }) => {
  const history = useHistory();
  const { setAppLoading } = useApplication();
  const { toastError } = useToast();
  const { walletCtx, setWalletCtx } = useWallet();
  const { accounts } = walletCtx || {};

  const [accountsSelected, setAccountsSelected] = useState<string[]>([]);
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);

  const splitUrl = url?.split('/');
  const dappUrl = splitUrl?.length ? `${splitUrl[2]}` : '';

  const onConnect = useCallback(async (): Promise<void> => {
    setAppLoading(true);
    let newAccounts = { ...accounts };

    await Promise.all(
      Object.entries(accounts).map(([address, _]: [string, AccountTypes]) => {
        newAccounts = {
          ...newAccounts,
          [address]: {
            ...accounts[address],
            isHidden: accountsSelected.includes(address) ? false : true,
          },
        };

        return hiddenAccount({
          address,
          isHidden: accountsSelected.includes(address) ? false : true,
        });
      })
    );

    updateWalletStorage({ data: { ...walletCtx, accounts: newAccounts } }).then(
      (data) => {
        approveAuthRequest(authId)
          .then(() => {
            localStorage.setItem(CONNECTED_DAPP_KEY, dappUrl);
            history.push('/');
          })
          .catch((error: Error) => toastError(null, error.message))
          .finally(() => {
            setWalletCtx(data);
            setAppLoading(false);
          });
      }
    );
  }, [authId, accountsSelected]);

  const onCancel = useCallback(async (): Promise<void> => {
    setAppLoading(true);
    let newAccounts = { ...accounts };

    await Promise.all(
      Object.entries(accounts).map(([address, _]: [string, AccountTypes]) => {
        newAccounts = {
          ...newAccounts,
          [address]: {
            ...accounts[address],
            isHidden: true,
          },
        };

        return hiddenAccount({ address, isHidden: true });
      })
    ).catch((error: Error) => toastError(null, error.message));

    updateWalletStorage({ data: { ...walletCtx, accounts: newAccounts } }).then(
      (data) => {
        rejectAuthRequest(authId)
          .then(() => history.push('/'))
          .catch((error: Error) => toastError(null, error.message))
          .finally(() => {
            setWalletCtx(data);
            setAppLoading(false);
          });
      }
    );
  }, [authId]);

  const onAccountSelect = useCallback(
    (address: string): void => {
      const currentIndex = accountsSelected.findIndex(
        (_address) => _address === address
      );

      if (currentIndex > -1) {
        accountsSelected.splice(currentIndex, 1);
        setAccountsSelected([...accountsSelected]);
      } else {
        setAccountsSelected([...accountsSelected, address]);
      }

      setIsCheckAll(false);
    },
    [accountsSelected, isCheckAll]
  );

  return (
    <Flex height="100%" flexDirection="column" p="16px">
      <Flex
        background={colors.gray2}
        p="16px"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text color={colors.gray7} fontWeight="600">
          Connect Wallet
        </Text>

        <Button p="0px" onClick={onCancel}>
          <CloseIcon width="13px" fill={colors.gray7} />
        </Button>
      </Flex>

      {step === 1 && (
        <RequestStep1
          accountsSelected={accountsSelected}
          request={{ origin: dappUrl }}
          accounts={accounts}
          isCheckAll={isCheckAll}
          onCheckAll={() => {
            if (isCheckAll) {
              setAccountsSelected([]);
              setIsCheckAll(false);
            } else {
              const accountsKey = Object.keys(accounts).map((key) => key);
              setAccountsSelected(accountsKey);
              setIsCheckAll(true);
            }
          }}
          onChange={onAccountSelect}
          onCancel={onCancel}
          onNext={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <RequestStep2
          accountsSelected={accountsSelected}
          accounts={accounts}
          request={{ origin: dappUrl }}
          onBack={() => setStep(1)}
          onConnect={onConnect}
        />
      )}
    </Flex>
  );
};

export default Request;
