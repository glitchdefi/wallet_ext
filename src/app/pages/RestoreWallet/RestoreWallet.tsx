import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

import { messages } from './messages';

// Hooks
import { useStepTitleDesc } from 'state/wallet/hooks';

import { PageLayout } from 'app/layouts';
import { StepProgressLayout } from 'app/components/StepProgressLayout';

const MAX_STEP = 2;

const RestoreWallet: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const [step, setStep] = useState<number>(0);

  const { stepTitle, stepDesc } = useStepTitleDesc(step, messages, 'restore');

  const stepProgress = ((step + 1) / MAX_STEP) * 100;

  return (
    <PageLayout minHeight="600px">
      <StepProgressLayout
        title={t(messages.title())}
        step={step + 1}
        stepProgress={stepProgress}
        stepTitle={t(stepTitle)}
        stepDescription={t(stepDesc)}
        onBack={() => history.push('/')}
      >
        shsh
      </StepProgressLayout>
    </PageLayout>
  );
};

export default RestoreWallet;
