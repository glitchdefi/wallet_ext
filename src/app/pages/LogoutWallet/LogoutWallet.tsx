import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { Routes } from 'constants/routes';
import { colors } from 'theme/colors';

// Components
import { PageLayout } from 'app/layouts';
import { Flex } from 'app/components/Box';
import { LeftArrowIcon } from 'app/components/Svg';
import { Text } from 'app/components/Text';
import { Button } from 'app/components/Button';
import { EnterPassword } from './components/EnterPassword';
import { ViewMnemonicPhrase } from './components/ViewMnemonicPhrase';
import { ConfirmLogout } from './components/ConfirmLogout';
import { SelectedOption } from './components/SelectedOption';

const LogoutWallet: React.FC = () => {
  const history = useHistory();
  const [isBackedUp, setIsBackedUp] = useState({ yes: false, no: false });
  const [step, setStep] = useState(0);
  const [seedPhrase, setSeedPhrase] = useState('');
  const [password, setPassword] = useState('');

  return (
    <PageLayout>
      <Flex
        alignItems="center"
        borderBottom={`1px solid ${colors.magenta2}`}
        p="16px"
      >
        <Button p="0px" onClick={() => history.push(Routes.home)}>
          <LeftArrowIcon width="13px" />
        </Button>
        <Text mt="3px" bold ml="16px" color={colors.gray7}>
          Log out
        </Text>
      </Flex>
      {step === 0 && (
        <SelectedOption
          values={isBackedUp}
          onCancel={() => history.push(Routes.home)}
          onNext={(backedUp) => {
            setIsBackedUp(backedUp);
            setStep(1);
          }}
        />
      )}
      {step === 1 && (
        <EnterPassword
          isNoBackedUp={isBackedUp.no}
          step={step}
          onCancel={() => setStep(step - 1)}
          onShow={(seed, password) => {
            setSeedPhrase(seed);
            setPassword(password);
            setStep(2);
          }}
        />
      )}
      {step === 2 && (
        <ViewMnemonicPhrase
          seedPhrases={seedPhrase}
          onConfirm={() => {
            setStep(3);
          }}
        />
      )}
      {step === 3 && (
        <ConfirmLogout password={password} onCancel={() => setStep(step - 1)} />
      )}
    </PageLayout>
  );
};

export default LogoutWallet;
