import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

import { messages } from './messages';

// Hooks
import {
  useStepTitleDesc,
  useWalletActionHandlers,
  useWalletSlice,
  useSeedPhrases,
} from 'state/wallet/hooks';

// Components
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

  const [step, setStep] = useState<number>(0);
  const [password, setPassword] = useState<string>();

  const { seedPhrases } = useSeedPhrases();
  const { onCreateSeedPhrases } = useWalletActionHandlers();
  const { stepTitle, stepDesc } = useStepTitleDesc(step, messages);

  const stepProgress = ((step + 1) / MAX_STEP) * 100;

  return (
    <StepProgressLayout
      title={t(messages.title())}
      step={step + 1}
      stepProgress={stepProgress}
      stepTitle={t(stepTitle)}
      stepDescription={t(stepDesc)}
      onBack={() => history.push('/')}
    >
      {step === 0 && (
        <CreatePasswordStep
          onSetupPassword={(password) => {
            setPassword(password);
            onCreateSeedPhrases();
            // Move to mnemonic phrase step
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
      {step === 2 && <VerifyMnemonicStep seedPhrases={seedPhrases} />}
    </StepProgressLayout>
  );
};

export default CreateWallet;
