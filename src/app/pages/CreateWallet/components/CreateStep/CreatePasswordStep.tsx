import React, { useState } from 'react';

import { colors } from '../../../../../theme/colors';

import { messages } from '../../messages';

// Components
import { Flex, Box } from '../../../../components/Box';
import { Label, PasswordInput, CheckBox } from '../../../../components/Form';
import { Text } from '../../../../components/Text';
import { ButtonShadow } from '../../../../components/Button';
import { MessageBox } from '../../../../components/MessageBox';
import { PasswordRulesTooltip } from '../PasswordRulesTooltip';
import { useTranslation } from 'react-i18next';

export function CreatePasswordStep() {
  const { t } = useTranslation();
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isPassedRules, setIsPassedRules] = useState<boolean>(false);

  return (
    <>
      <Box>
        <Label>{t(messages.password())}</Label>
        <PasswordInput
          placeholder={t(messages.enterPassword())}
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
        <Label>{t(messages.confirmPassword())}</Label>
        <PasswordInput
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
          labelComponent={
            <Flex>
              <Text>{t(messages.iAgreeToThe())}</Text>
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
          mt="12px"
          labelComponent={<Text>{t(messages.iUnderstandThatGlitch())}</Text>}
        />
      </Box>

      <Box pt="32px" pb="24px">
        <ButtonShadow width="100%">{t(messages.setupPassword())}</ButtonShadow>
      </Box>
    </>
  );
}
