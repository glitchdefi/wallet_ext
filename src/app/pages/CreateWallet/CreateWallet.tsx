import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

import { Routes } from 'constants/routes';
import { messages } from './messages';

// Hooks
import {
  useStepTitleDesc,
  useWalletActionHandlers,
  useWalletSlice,
  useSeedPhrases,
  useIsInitialized,
} from 'state/wallet/hooks';
import {
  useApplicationSlice,
  useLoadingApplication,
} from 'state/application/hooks';

// Components
import { PageLayout } from 'app/layouts';
import { MnemonicPhraseStep } from './components/CreateStep/MnemonicPhraseStep';
import { CreatePasswordStep } from './components/CreateStep/CreatePasswordStep';
import { VerifyMnemonicStep } from './components/CreateStep/VerifyMnemonicStep';
import { StepProgressLayout } from '../../components/StepProgressLayout';

const MAX_STEP = 3;

const CreateWallet: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();
  // Init wallet reducer
  useWalletSlice();
  useApplicationSlice();

  const [step, setStep] = useState<number>(0);

  const { isLoading } = useLoadingApplication();
  const { isInitialized } = useIsInitialized();
  const { seedPhrases } = useSeedPhrases();
  const { onCreateCompleted, onCreateWallet } = useWalletActionHandlers();
  const { stepTitle, stepDesc } = useStepTitleDesc(step, messages, 'create');

  const stepProgress = ((step + 1) / MAX_STEP) * 100;

  useEffect(() => {
    // Move to mnemonic phrase step
    if (!isLoading && seedPhrases && step === 0) {
      setStep(1);
    }

    // Create completed -> push to home page
    if (!isLoading && isInitialized === 'completed') {
      history.push(Routes.home);
    }
  }, [isLoading, step]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  return (
    <PageLayout>
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
            setStep(1);
          }
        }}
      >
        {step === 0 && (
          <CreatePasswordStep
            onSetupPassword={(password) => {
              onCreateWallet(password);
            }}
          />
        )}
        {step === 1 && (
          <MnemonicPhraseStep
            seedPhrases={seedPhrases}
            onNextStep={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <VerifyMnemonicStep
            seedPhrases={seedPhrases}
            onSubmit={onCreateCompleted}
          />
        )}
      </StepProgressLayout>
    </PageLayout>
  );
};

export default CreateWallet;
