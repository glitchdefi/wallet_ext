import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { Routes } from 'constants/routes';

// Components
import { PageLayout } from 'app/layouts';
import { Header } from 'app/components/Shared';
import { EnterPassword } from './components/EnterPassword';
import { ViewMnemonicPhrase } from './components/ViewMnemonicPhrase';
import { ConfirmLogout } from './components/ConfirmLogout';
import { SelectedOption } from './components/SelectedOption';

const LogoutWallet: React.FC = React.memo(() => {
  const history = useHistory();
  const [isBackedUp, setIsBackedUp] = useState({ yes: false, no: false });
  const [step, setStep] = useState<number>(0);
  const [seedPhrase, setSeedPhrase] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <PageLayout>
      <Header onBack={() => history.push(Routes.home)} title="Logout" />

      {step === 0 && (
        <SelectedOption
          values={isBackedUp}
          onCancel={() => history.push(Routes.home)}
          onNext={(backedUp) => {
            setIsBackedUp(backedUp);
            setStep(1);
          }}
        />
      )}
      {step === 1 && (
        <EnterPassword
          isNoBackedUp={isBackedUp.no}
          step={step}
          onCancel={() => setStep(step - 1)}
          onShow={(seed, password) => {
            setSeedPhrase(seed);
            setPassword(password);
            setStep(2);
          }}
        />
      )}
      {step === 2 && (
        <ViewMnemonicPhrase
          seedPhrases={seedPhrase}
          onConfirm={() => {
            setStep(3);
          }}
        />
      )}
      {step === 3 && (
        <ConfirmLogout password={password} onCancel={() => setStep(step - 1)} />
      )}
    </PageLayout>
  );
});

export default LogoutWallet;
