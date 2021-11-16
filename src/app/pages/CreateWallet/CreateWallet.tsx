import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

import { Routes } from 'constants/routes';
import { messages } from './messages';

// Hooks
import {
  useStepTitleDesc,
  useWalletActionHandlers,
  useSeedPhrases,
  useIsInitialized,
} from 'state/wallet/hooks';
import { useLoadingApplication } from 'state/application/hooks';

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

  const [step, setStep] = useState<number>(0);
  const [password, setPassword] = useState<string>('');

  const { isLoading } = useLoadingApplication();
  const { isInitialized } = useIsInitialized();
  const { seedPhrases } = useSeedPhrases();
  const { onResetState, onCreateCompleted, onCreateWallet } =
    useWalletActionHandlers();
  const { stepTitle, stepDesc } = useStepTitleDesc(step, messages, 'create');

  const stepProgress = ((step + 1) / MAX_STEP) * 100;

  useEffect(() => {
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
            onResetState();
          } else {
            setStep(step - 1);
          }
        }}
      >
        {step === 0 && (
          <CreatePasswordStep
            initValue={password}
            onSetupPassword={(password) => {
              setPassword(password);
              onCreateWallet(password);
              setStep(1);
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
