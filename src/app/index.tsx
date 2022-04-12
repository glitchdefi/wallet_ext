import React, { useEffect, useState } from 'react';
import { Router, Route, Switch } from 'react-router';
import { createMemoryHistory } from 'history';

import { GlobalStyles } from '../theme/GlobalStyle';
import { UPDATE_TIME } from 'constants/values';
import { Routes } from '../constants/routes';

import { ToastListener } from 'contexts/ToastsContext';
import { ExtensionStore } from '../scripts/lib/localStore';

// Hooks
import { useSettings } from 'contexts/SettingsContext/hooks';
import { useWallet } from 'contexts/WalletContext/hooks';
import { useTokenPrice } from 'contexts/TokenPriceContext/hooks';
import { useApplication } from 'contexts/ApplicationContext/hooks';
import {
  getTokenPrice,
  subscribeAuthorizeRequests,
} from 'scripts/ui/messaging';

// Components
import { ContainerLayout } from './layouts';
import { LoadingApplication } from './components/Loading';
import { ScrollToTop } from './components/ScrollToTop';

// Pages
import { HomePage } from './pages/Home';
import { WelcomePage } from './pages/Welcome';
import { RestoreWalletPage } from './pages/RestoreWallet';
import { CreateWalletPage } from './pages/CreateWallet';
import { InternetWarningPage } from './pages/InternetWarning';
import { UnlockPage } from './pages/Unlock';
import { CreateImportAccountPage } from './pages/CreateImportAccount';
import { AccountDetailsPage } from './pages/AccountDetails';
import { ShowPrivateKeysPage } from './pages/ShowPrivateKeys';
import { AboutUsPage } from './pages/AboutUs';
import { LogoutWalletPage } from './pages/LogoutWallet';
import { RevealMnemonicPhrasePage } from './pages/RevealMnemonicPhrase';
import { TokenDetailsPage } from './pages/TokenDetails';
import { ReceiveTokenPage } from './pages/ReceiveToken';
import { AddAssetsPage } from './pages/AddAssets';
import { BackUpPage } from './pages/BackUp';
import { SendTokenPage } from './pages/SendToken';
import { AuthorizePage } from './pages/Authorize';
import { AuthorizeRequest } from 'scripts/types';
import { ConnectedDapps } from './pages/ConnectedDapps';

const history = createMemoryHistory();

export const App: React.FC = () => {
  const { appLoading } = useApplication();
  const { setSettingsCtx } = useSettings();
  const { setTokenPrice } = useTokenPrice();
  const { walletCtx, setWalletCtx, onLockWallet, onGetAccountBalance } =
    useWallet();
  const { isInitialized } = walletCtx || {};

  const [timeQuery, setTimeQuery] = useState<number>(0);
  const [hasInternet, setHasInternet] = useState<boolean>(true);
  const [authRequests, setAuthRequests] = useState<null | AuthorizeRequest[]>(
    null
  );

  useEffect((): void => {
    Promise.all([subscribeAuthorizeRequests(setAuthRequests)]).catch(
      console.error
    );
  }, []);

  useEffect(() => {
    async function getInitialState() {
      const localStore = new ExtensionStore();
      const initState = await localStore.getAllStorageData();
      const { wallet, settings } = initState;
      const { isInitialized, isLocked } = wallet;
      const { autoLock } = settings;
      const { duration, openTime } = autoLock;

      console.log(initState);

      if (
        (isInitialized === 'pending' || isInitialized === 'completed') &&
        !isLocked
      ) {
        history.push(Routes.home);
      }

      // wallet locked -> redirect to unlock page
      if (wallet?.isLocked) {
        history.push(Routes.unlock);
      }

      // check autolock -> redirect to unlock page
      if (
        isInitialized !== 'none' &&
        duration &&
        new Date().getTime() - openTime > duration
      ) {
        onLockWallet(history);
      }

      setWalletCtx(wallet);
      setSettingsCtx(settings);
    }

    getInitialState();
  }, []);

  useEffect(() => {
    if (authRequests && authRequests.length) {
      history.push(Routes.authorize);
    }
  }, [authRequests]);

  useEffect(() => {
    let job: NodeJS.Timer;

    job = setInterval(() => {
      setTimeQuery((prev) => prev + 1);
    }, UPDATE_TIME);

    return () => {
      clearInterval(job);
    };
  }, []);

  // TODO: check again
  useEffect(() => {
    if (isInitialized !== 'none' && hasInternet && navigator.onLine) {
      onGetAccountBalance();
      getTokenPrice({ name: 'glitch-protocol', currency: 'usd' }).then(
        setTokenPrice
      );
    }
  }, [timeQuery, hasInternet]);

  useEffect(() => {
    addEventListener('offline', () => setHasInternet(false));
    addEventListener('online', () => setHasInternet(true));

    return () => {
      removeEventListener('online', () => setHasInternet(true));
      removeEventListener('offline', () => setHasInternet(false));
    };
  }, []);

  return (
    <Router history={history}>
      <GlobalStyles />
      <ScrollToTop />
      <ToastListener />
      <ContainerLayout>
        {appLoading && <LoadingApplication />}
        <Switch>
          <Route exact path={Routes.welcome} component={WelcomePage} />
          <Route path={Routes.authorize} component={AuthorizePage} />
          <Route path={Routes.connectedDapps} component={ConnectedDapps} />
          <Route
            path={Routes.internetWarning}
            component={InternetWarningPage}
          />
          <Route path={Routes.restoreWallet} component={RestoreWalletPage} />
          <Route path={Routes.createWallet} component={CreateWalletPage} />
          <Route path={Routes.unlock} component={UnlockPage} />
          <Route path={Routes.home} component={HomePage} />
          <Route
            path={Routes.createImportAccount}
            component={CreateImportAccountPage}
          />
          <Route path={Routes.accountDetails} component={AccountDetailsPage} />
          <Route
            path={Routes.showPrivateKeys}
            component={ShowPrivateKeysPage}
          />
          <Route path={Routes.aboutUs} component={AboutUsPage} />
          <Route path={Routes.logoutWallet} component={LogoutWalletPage} />
          <Route
            path={Routes.revealMnemonicPhrase}
            component={RevealMnemonicPhrasePage}
          />
          <Route path={Routes.tokenDetails} component={TokenDetailsPage} />
          <Route path={Routes.receiveToken} component={ReceiveTokenPage} />
          <Route path={Routes.sendToken} component={SendTokenPage} />
          <Route path={Routes.addAssets} component={AddAssetsPage} />
          <Route path={Routes.backUp} component={BackUpPage} />
        </Switch>
      </ContainerLayout>
    </Router>
  );
};
