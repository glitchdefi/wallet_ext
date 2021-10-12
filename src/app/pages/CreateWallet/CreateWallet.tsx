import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { colors } from '../../../theme/colors';

// Components
import { Flex, Box } from '../../components/Box';
import { Label, PasswordInput, CheckBox } from '../../components/Form';
import { Text } from '../../components/Text';
import { ButtonShadow } from '../../components/Button';
import { StepProgressLayout } from '../../components/StepProgressLayout';
import { MessageBox } from '../../components/MessageBox';
import { PasswordRulesTooltip } from './components/PasswordRulesTooltip';
import { MnemonicPhraseStep } from './components/CreateStep/MnemonicPhraseStep';

function CreateWallet(): JSX.Element {
  const history = useHistory();

  return (
    <StepProgressLayout
      title="Create new wallet"
      step={1}
      stepProgress={80}
      stepTitle="Create a password"
      stepDescription="Protect your wallet with a password"
      onBack={() => history.push('/')}
    >
      <MnemonicPhraseStep />
    </StepProgressLayout>
  );
}

export default CreateWallet;
