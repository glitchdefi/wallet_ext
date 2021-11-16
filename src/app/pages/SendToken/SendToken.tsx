import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { colors } from 'theme/colors';
import { Routes } from 'constants/routes';

import { PageLayout } from 'app/layouts';
import { Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { Button } from 'app/components/Button';
import { LeftArrowIcon } from 'app/components/Svg';
import { Confirmation } from './components/Confirmation';
import { SendForm } from './components/SendForm';

const SendToken: React.FC = () => {
  const history = useHistory();

  const [amount, setAmount] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [step, setStep] = useState(0);

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
              history.push(Routes.tokenDetails);
            } else {
              setStep(step - 1);
            }
          }}
        >
          <LeftArrowIcon width="13px" />
        </Button>
        <Text mt="3px" bold ml="16px" color={colors.gray7}>
          Send
        </Text>
      </Flex>

      {step === 0 && (
        <SendForm
          initData={{ amount, toAddress }}
          onNext={(amount, toAddress) => {
            setAmount(amount);
            setToAddress(toAddress);
            setStep(1);
          }}
        />
      )}
      {step === 1 && <Confirmation amount={amount} toAddress={toAddress} />}
    </PageLayout>
  );
};

export default SendToken;
