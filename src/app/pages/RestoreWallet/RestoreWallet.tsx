import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

import { messages } from './messages';
import { Routes } from 'constants/routes';

// Hooks
import {
  useIsInitialized,
  useStepTitleDesc,
  useWalletActionHandlers,
  useWalletSlice,
} from 'state/wallet/hooks';

import {
  useApplicationSlice,
  useLoadingApplication,
} from 'state/application/hooks';

import { PageLayout } from 'app/layouts';
import { StepProgressLayout } from 'app/components/StepProgressLayout';
import { EnterSeedPhraseStep } from './components/EnterSeedPhraseStep';
import { CreatePasswordStep } from '../CreateWallet/components/CreateStep/CreatePasswordStep';

const MAX_STEP = 2;

const RestoreWallet: React.FC = () => {
  useWalletSlice();
  useApplicationSlice();

  const history = useHistory();
  const { t } = useTranslation();

  const [step, setStep] = useState<number>(0);
  const [seedPhrase, setSeedPhrase] = useState<string>('');

  const { isLoading } = useLoadingApplication();
  const { isInitialized } = useIsInitialized();
  const { onRestoreWallet } = useWalletActionHandlers();
  const { stepTitle, stepDesc } = useStepTitleDesc(step, messages, 'restore');

  const stepProgress = ((step + 1) / MAX_STEP) * 100;

  useEffect(() => {
    if (!isLoading && isInitialized === 'completed') {
      history.push(Routes.home);
    }
  }, [isLoading, isInitialized]);

  return (
    <PageLayout minHeight="600px">
      <StepProgressLayout
        title={t(messages.title())}
        step={step + 1}
        stepProgress={stepProgress}
        stepTitle={t(stepTitle)}
        stepDescription={t(stepDesc)}
        onBack={() => {
          if (step === 0) {
            history.push('/');
          } else {
            setStep(step - 1);
          }
        }}
      >
        {step === 0 && (
          <EnterSeedPhraseStep
            defaultSeedPhrase={seedPhrase}
            onNextStep={(seedPhrase) => {
              setSeedPhrase(seedPhrase);
              setStep(1);
            }}
          />
        )}
        {step === 1 && (
          <CreatePasswordStep
            onSetupPassword={(password) =>
              onRestoreWallet(seedPhrase, password)
            }
          />
        )}
      </StepProgressLayout>
    </PageLayout>
  );
};

export default RestoreWallet;
