import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

import { Routes } from 'constants/routes';
import { colors } from 'theme/colors';

import { useStepTitleDesc } from 'state/wallet/hooks';
import { useWallet } from 'contexts/WalletContext/hooks';
import { useApplication } from 'contexts/ApplicationContext/hooks';
import { showWalletSeed, walletValidate } from 'scripts/ui/messaging';

import { messages } from './messages';

// Components
import { PageLayout } from 'app/layouts';
import { Box, Flex } from 'app/components/Box';
// import { LeftArrowIcon } from 'app/components/Svg';
import { Text } from 'app/components/Text';
// import { Button } from 'app/components/Button';
import {
  Header,
  MnemonicPhraseStep,
  VerifyMnemonicStep,
} from 'app/components/Shared';
import { EnterPassword } from './components/EnterPassword';

const BackUp: React.FC = React.memo(() => {
  const history = useHistory();
  const { t } = useTranslation();
  const { setAppLoading } = useApplication();
  const { onBackupWallet } = useWallet();

  const [step, setStep] = useState<number>(0);
  const [password, setPassword] = useState<string>('');
  const [seed, setSeed] = useState<string>('');
  const [validPassword, setValidPassword] = useState<boolean>(true);

  const { stepTitle, stepDesc } = useStepTitleDesc(step, messages, 'create');

  const _onShowWalletSeed = (password: string) => {
    setAppLoading(true);
    setPassword(password);
    walletValidate({ password }).then(async (valid) => {
      if (valid) {
        const seed = await showWalletSeed();
        setSeed(seed);
        setStep(1);
      }
      setAppLoading(false);
      setValidPassword(valid);
    });
  };

  return (
    <PageLayout>
      <Header
        onBack={() => {
          if (step === 0) {
            history.push(Routes.home);
          } else {
            setStep(step - 1);
          }
        }}
        title="Back up"
      />

      {step === 0 && (
        <EnterPassword
          initValue={password}
          passwordValidate={validPassword}
          onClearPasswordValidate={() => setValidPassword(true)}
          onSubmit={_onShowWalletSeed}
        />
      )}

      {(step === 1 || step === 2) && (
        <Flex flex={1} flexDirection="column" p="16px">
          <Flex mb="24px" alignItems="flex-start">
            <Flex>
              <Text color={colors.secondary} large bold>
                [
              </Text>
              <Text color={colors.primary} large bold>
                {step}
              </Text>
              <Text color={colors.secondary} large bold>
                ]
              </Text>
            </Flex>
            <Box ml="8px">
              <Text color={colors.gray7} large bold>
                {t(stepTitle)}
              </Text>
              <Text mt="4px" fontSize="12px" color={colors.gray5}>
                {t(stepDesc)}
              </Text>
            </Box>
          </Flex>

          {step === 1 && (
            <MnemonicPhraseStep seed={seed} onNextStep={() => setStep(2)} />
          )}

          {step === 2 && (
            <VerifyMnemonicStep
              seed={seed}
              onSubmit={() => onBackupWallet(history)}
            />
          )}
        </Flex>
      )}
    </PageLayout>
  );
});

export default BackUp;
