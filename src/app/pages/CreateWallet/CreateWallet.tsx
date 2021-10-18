import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

import { colors } from '../../../theme/colors';

import { messages } from './messages';

// Hooks
import { useStepTitleDesc } from '../../../state/wallet/hooks';

// Components
import { Flex, Box } from '../../components/Box';
import { Label, PasswordInput, CheckBox } from '../../components/Form';
import { Text } from '../../components/Text';
import { ButtonShadow } from '../../components/Button';
import { StepProgressLayout } from '../../components/StepProgressLayout';
import { MessageBox } from '../../components/MessageBox';
import { PasswordRulesTooltip } from './components/PasswordRulesTooltip';
import { MnemonicPhraseStep } from './components/CreateStep/MnemonicPhraseStep';
import { CreatePasswordStep } from './components/CreateStep/CreatePasswordStep';

const MAX_STEP = 3;

function CreateWallet(): JSX.Element {
  const history = useHistory();
  const { t } = useTranslation();

  const [step, setStep] = useState<number>(0);
  const [password, setPassword] = useState<string>();

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
      {step === 0 && <CreatePasswordStep />}
      {step === 1 && <MnemonicPhraseStep />}
    </StepProgressLayout>
  );
}

export default CreateWallet;
