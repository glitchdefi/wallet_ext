import React, { useState } from 'react';
import { useHistory } from 'react-router';

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
  const [seed, setSeed] = useState<string>('');

  return (
    <PageLayout>
      <Header
        onBack={() => {
          if (step === 0) {
            history.push('/');
          } else {
            setStep(step - 1);
          }
        }}
        title="Logout"
      />

      {step === 0 && (
        <SelectedOption
          values={isBackedUp}
          onCancel={() => history.push('/')}
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
          onCancel={() => history.push('/')}
          onShow={(seed) => {
            setSeed(seed);
            setStep(2);
          }}
        />
      )}
      {step === 2 && (
        <ViewMnemonicPhrase
          seed={seed}
          onConfirm={() => {
            setStep(3);
          }}
        />
      )}
      {step === 3 && <ConfirmLogout onCancel={() => history.push('/')} />}
    </PageLayout>
  );
});

export default LogoutWallet;
