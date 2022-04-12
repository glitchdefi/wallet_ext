import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import { mnemonicGenerate } from '@polkadot/util-crypto';

import { GlitchToken } from 'constants/tokens';
import { Routes } from 'constants/routes';
import { messages } from './messages';

// Hooks
import { useStepTitleDesc } from 'hooks/useStepTitleDesc';

// Components
import { PageLayout } from 'app/layouts';
import {
  CreatePasswordStep,
  MnemonicPhraseStep,
  VerifyMnemonicStep,
  StepProgressLayout,
} from 'app/components/Shared';
import { useWallet } from 'contexts/WalletContext/hooks';

const MAX_STEP = 3;

const CreateWallet: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();

  const { onCreateWallet, onCreateWalletCompleted, onResetAppState } =
    useWallet();

  const [step, setStep] = useState<number>(0);
  const [password, setPassword] = useState<string>('');
  const [mnemonic, setMnemonic] = useState<string>('');

  const { stepTitle, stepDesc } = useStepTitleDesc(step, messages, 'create');

  const stepProgress = ((step + 1) / MAX_STEP) * 100;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  useEffect(() => {
    if (mnemonic) {
      onCreateWallet({ seed: mnemonic, name: 'Account 1', password });
    }
  }, [mnemonic]);

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
            onResetAppState();
            history.push(Routes.welcome);
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
              setMnemonic(
                mnemonicGenerate(GlitchToken.default_mnemonic_length)
              );
              setStep(1);
            }}
          />
        )}
        {step === 1 && (
          <MnemonicPhraseStep seed={mnemonic} onNextStep={() => setStep(2)} />
        )}
        {step === 2 && (
          <VerifyMnemonicStep
            seed={mnemonic}
            onSubmit={() => {
              onCreateWalletCompleted(history);
            }}
          />
        )}
      </StepProgressLayout>
    </PageLayout>
  );
};

export default React.memo(CreateWallet);
