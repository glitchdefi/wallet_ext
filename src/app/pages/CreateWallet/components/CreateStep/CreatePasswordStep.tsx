import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { colors } from 'theme/colors';

import { messages } from '../../messages';

// Components
import { Flex, Box } from 'app/components/Box';
import { Label, PasswordInput, CheckBox } from 'app/components/Form';
import { Text } from 'app/components/Text';
import { Button, ButtonShadow } from 'app/components/Button';
import { MessageBox } from 'app/components/MessageBox';
import { PasswordRulesTooltip } from '../PasswordRulesTooltip';

interface Props {
  onSetupPassword: (password: string) => void;
  initValue?: string;
}

export const CreatePasswordStep: React.FC<Props> = ({
  initValue,
  onSetupPassword,
}) => {
  const { t } = useTranslation();

  const [password, setPassword] = useState<string>(initValue);
  const [confirmPassword, setConfirmPassword] = useState<string>(initValue);
  const [isPassedRules, setIsPassedRules] = useState<boolean>(false);
  const [checked, setChecked] = useState<{
    agree: boolean;
    understand: boolean;
  }>({
    agree: false,
    understand: false,
  });

  const isEnableButton =
    confirmPassword === password &&
    isPassedRules &&
    checked.agree &&
    checked.understand;

  return (
    <>
      <Box>
        <Label>{t(messages.password())}</Label>
        <PasswordInput
          value={password}
          placeholder={t(messages.enterPassword())}
          data-tip=""
          data-for="password-input"
          data-event="focus"
          data-event-off="focusout"
          onChange={(e) => setPassword(e.target.value?.trim())}
        />
        <PasswordRulesTooltip
          value={password}
          onPassed={(isPassed) => setIsPassedRules(isPassed)}
        />
      </Box>

      <Box mt="24px">
        <Label>{t(messages.confirmPassword())}</Label>
        <PasswordInput
          value={confirmPassword}
          isError={confirmPassword && confirmPassword !== password}
          msgError={t(messages.confirmPasswordNotMatch())}
          placeholder={t(messages.reEnterPassword())}
          onChange={(e) => setConfirmPassword(e.target.value?.trim())}
        />
      </Box>

      <MessageBox mt="24px" message={t(messages.warningPassword())} />

      <Box mt="24px">
        <CheckBox
          id="terms-of-service"
          checked={checked.agree}
          onChange={(e) => setChecked({ ...checked, agree: e.target.checked })}
          labelComponent={
            <Flex>
              <Text style={{ userSelect: 'none' }}>
                {t(messages.iAgreeToThe())}
              </Text>
              <Text
                as="a"
                target="_blank"
                href="https://google.com"
                ml="8px"
                color={colors.primary}
              >
                {t(messages.termAndServices())}
              </Text>
            </Flex>
          }
        />

        <CheckBox
          id="i-understand"
          checked={checked.understand}
          mt="12px"
          onChange={(e) =>
            setChecked({ ...checked, understand: e.target.checked })
          }
          labelComponent={
            <Text style={{ userSelect: 'none' }}>
              {t(messages.iUnderstandThatGlitch())}
            </Text>
          }
        />
      </Box>

      <Box pt="24px" pb="16px">
        {isEnableButton ? (
          <ButtonShadow width="100%" onClick={() => onSetupPassword(password)}>
            {t(messages.setupPassword())}
          </ButtonShadow>
        ) : (
          <Button variant="disable-primary" width="100%">
            {t(messages.setupPassword())}
          </Button>
        )}
      </Box>
    </>
  );
};
