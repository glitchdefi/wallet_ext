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

function CreateWallet(): JSX.Element {
  const history = useHistory();
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isPassedRules, setIsPassedRules] = useState<boolean>(false);

  return (
    <StepProgressLayout
      title="Create new wallet"
      step={1}
      stepProgress={80}
      stepTitle="Create a password"
      stepDescription="Protect your wallet with a password"
      onBack={() => history.push('/')}
    >
      <Box>
        <Label>Password</Label>
        <PasswordInput
          placeholder="Enter password"
          data-event="click"
          data-tip=""
          onChange={(e) => setPassword(e.target.value?.trim())}
        />
        <PasswordRulesTooltip
          value={password}
          onPassed={(isPassed) => setIsPassedRules(isPassed)}
        />
      </Box>

      <Box mt="24px">
        <Label>Confirm password</Label>
        <PasswordInput
          placeholder="Re-enter your password"
          onChange={(e) => setPassword(e.target.value?.trim())}
        />
      </Box>

      <MessageBox
        mt="24px"
        message="Please remember this password. If you lose your password, everything in this account is lost."
      />

      <Box mt="24px">
        <CheckBox
          id="terms-of-service"
          labelComponent={
            <Flex>
              <Text>I agree to the</Text>
              <Text
                as="a"
                target="_blank"
                href="https://google.com"
                ml="8px"
                color={colors.primary}
              >
                Terms of Service
              </Text>
            </Flex>
          }
        />

        <CheckBox
          id="i-understand"
          mt="12px"
          labelComponent={
            <Text>
              I understand that Glitch Wallet cannot recover this password for
              me
            </Text>
          }
        />
      </Box>

      <Box pt="32px" pb="24px">
        <ButtonShadow width="100%">Set up Password</ButtonShadow>
      </Box>
    </StepProgressLayout>
  );
}

export default CreateWallet;
