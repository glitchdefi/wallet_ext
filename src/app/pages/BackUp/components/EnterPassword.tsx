import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { colors } from 'theme/colors';
import { Routes } from 'constants/routes';

import {
  useWalletActionHandlers,
  useWalletSlice,
  useWrongPassword,
} from 'state/wallet/hooks';

// Components
import { Flex, Box } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { Label, PasswordInput } from 'app/components/Form';
import { Button, ButtonShadow } from 'app/components/Button';

interface Props {
  initValue: string;
  onChange: (password: string) => void;
}

export const EnterPassword: React.FC<Props> = ({ initValue, onChange }) => {
  useWalletSlice();
  const history = useHistory();

  const [password, setPassword] = useState(initValue);

  const { onClearIsWrongPassword } = useWalletActionHandlers();
  const { isWrongPassword } = useWrongPassword();

  useEffect(() => {
    return () => {
      onClearIsWrongPassword();
    };
  }, []);

  return (
    <Flex flex={1} p="32px" flexDirection="column">
      <Box background={colors.geekBlue} p="16px">
        <Text fontSize="12px" color={colors.cyan5}>
          Please enter the Glitch password to back up your wallet
        </Text>

        <Box mt="16px">
          <Label>Glitch password</Label>
          <PasswordInput
            isError={isWrongPassword}
            value={password}
            placeholder="Password"
            onChange={(e) => {
              const { value } = e.target;
              !value && onClearIsWrongPassword();

              setPassword(value);
            }}
            msgError="Incorrect password"
          />
        </Box>
      </Box>
      <Flex mt="auto" alignItems="center">
        <Button
          width="50%"
          variant="cancel"
          mr="16px"
          onClick={() => history.push(Routes.home)}
        >
          Cancel
        </Button>

        {password ? (
          <ButtonShadow width="50%" onClick={() => onChange(password)}>
            OK
          </ButtonShadow>
        ) : (
          <Button width="50%" variant="disable-primary">
            OK
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
