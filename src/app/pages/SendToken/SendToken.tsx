import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { Routes } from 'constants/routes';

import { PageLayout } from 'app/layouts';
import { Confirmation } from './components/Confirmation';
import { SendForm } from './components/SendForm';
import { Header } from 'app/components/Shared';

const SendToken: React.FC = React.memo(() => {
  const history = useHistory();

  const [amount, setAmount] = useState<string>('');
  const [toAddress, setToAddress] = useState<string>('');
  const [fee, setFee] = useState<string>('0');
  const [step, setStep] = useState<number>(0);
  const [isMaxClicked, setIsMaxClicked] = useState<boolean>(false);

  return (
    <PageLayout>
      <Header
        onBack={() => {
          if (step === 0) {
            history.push(Routes.tokenDetails);
          } else {
            setStep(step - 1);
          }
        }}
        title="Send"
      />

      {step === 0 && (
        <SendForm
          initData={{ amount, toAddress, isMaxClicked }}
          onNext={(amount, estimateFee, toAddress, isMaxClicked) => {
            setAmount(amount);
            setToAddress(toAddress);
            setFee(estimateFee);
            setIsMaxClicked(isMaxClicked);
            setStep(1);
          }}
        />
      )}
      {step === 1 && (
        <Confirmation
          amount={amount}
          estimateFee={fee}
          toAddress={toAddress}
          isTransferAll={isMaxClicked}
        />
      )}
    </PageLayout>
  );
});

export default SendToken;
