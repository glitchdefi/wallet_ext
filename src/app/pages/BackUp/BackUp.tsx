import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

import { Routes } from 'constants/routes';
import { colors } from 'theme/colors';

import {
  useSeedPhrases,
  useWalletActionHandlers,
  useStepTitleDesc,
} from 'state/wallet/hooks';

import { messages } from './messages';

// Components
import { PageLayout } from 'app/layouts';
import { Box, Flex } from 'app/components/Box';
import { LeftArrowIcon } from 'app/components/Svg';
import { Text } from 'app/components/Text';
import { Button } from 'app/components/Button';
import { EnterPassword } from './components/EnterPassword';
import { MnemonicPhraseStep } from '../CreateWallet/components/CreateStep/MnemonicPhraseStep';
import { VerifyMnemonicStep } from '../CreateWallet/components/CreateStep/VerifyMnemonicStep';

const BackUp: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();

  const [step, setStep] = useState(0);
  const [password, setPassword] = useState('');

  const { onShowSeedPhrase, onClearSeedPhrase, onBackupWalletAction } =
    useWalletActionHandlers();
  const { seedPhrases } = useSeedPhrases();
  const { stepTitle, stepDesc } = useStepTitleDesc(step, messages, 'create');

  useEffect(() => {
    if (seedPhrases && step === 0) setStep(1);
  }, [seedPhrases]);

  useEffect(() => {
    return () => {
      onClearSeedPhrase();
    };
  }, []);

  return (
    <PageLayout>
      <Flex
        alignItems="center"
        borderBottom={`1px solid ${colors.magenta2}`}
        p="16px"
      >
        <Button
          p="0px"
          onClick={() => {
            if (step === 0) {
              history.push(Routes.home);
            } else {
              setStep(step - 1);
            }
          }}
        >
          <LeftArrowIcon width="13px" />
        </Button>
        <Text mt="3px" bold ml="16px" color={colors.gray7}>
          Back up
        </Text>
      </Flex>

      {step === 0 && (
        <EnterPassword
          initValue={password}
          onChange={(password) => {
            seedPhrases && onClearSeedPhrase();
            setPassword(password);
            onShowSeedPhrase(password);
          }}
        />
      )}

      {(step === 1 || step === 2) && (
        <Flex flexDirection="column" p="16px">
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
            <MnemonicPhraseStep
              seedPhrases={seedPhrases}
              onNextStep={() => setStep(2)}
            />
          )}

          {step === 2 && (
            <VerifyMnemonicStep
              seedPhrases={seedPhrases}
              onSubmit={onBackupWalletAction}
            />
          )}
        </Flex>
      )}
    </PageLayout>
  );
};

export default BackUp;
