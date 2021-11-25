import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import TextareaAutosize from 'react-autosize-textarea/lib';
import styled from 'styled-components';

import { Routes } from 'constants/routes';
import { colors } from 'theme/colors';
import { truncateAddress } from 'utils/strings';
import { messages } from './messages';

import {
  useAccount,
  useAccountActionHandlers,
  useShowPrivateKey,
  useWalletActionHandlers,
  useWrongPassword,
} from 'state/wallet/hooks';

import { Box, Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { PageLayout } from 'app/layouts';
import { Button, ButtonShadow } from 'app/components/Button';
import { CheckIcon, CloseIcon, CopyIcon } from 'app/components/Svg';
import { Input, Label, PasswordInput } from 'app/components/Form';
import { MessageBox } from 'app/components/MessageBox';
import { Avatar } from 'app/components/Shared';

const ShowPrivateKeys: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();

  const { name, avatar, address } = useAccount();
  const { showPrivateKey } = useShowPrivateKey();
  const { isWrongPassword } = useWrongPassword();
  const { onClearShowPrivateKey, onShowPrivateKeys } =
    useAccountActionHandlers();
  const { onClearIsWrongPassword } = useWalletActionHandlers();

  const [copied, setCopied] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 1500);
    }
  }, [copied]);

  const onCopy = () => {
    navigator.clipboard.writeText(showPrivateKey);
    setCopied(true);
  };

  useEffect(() => {
    return () => {
      onClearIsWrongPassword();
      onClearShowPrivateKey();
    };
  }, []);

  return (
    <PageLayout minHeight="600px">
      <Box p="16px">
        <Flex
          background={colors.gray2}
          alignItems="center"
          justifyContent="space-between"
          p="16px"
        >
          <Text color={colors.gray7} bold>
            {t(messages.title())}
          </Text>

          <Button p="0px" onClick={() => history.push(Routes.home)}>
            <CloseIcon width="12px" fill={colors.gray7} />
          </Button>
        </Flex>

        <Flex
          p="16px"
          flexDirection="column"
          height="512px"
          background={colors.gray1}
        >
          <AccountWrapper>
            <Avatar src={avatar} />

            <Box ml="16px">
              <Text color={colors.gray7} bold>
                {name}
              </Text>
              <Text fontSize="12px" color={colors.gray6}>
                {truncateAddress(address)}
              </Text>
            </Box>
          </AccountWrapper>

          <Box mt="32px">
            {!isWrongPassword && showPrivateKey ? (
              <InputWrapper alignItems="center">
                <StyledInput
                  disabled
                  hasBorder={false}
                  value={showPrivateKey}
                  as={TextareaAutosize}
                />
                <Button ml="12px" p="0px" onClick={onCopy}>
                  {copied ? (
                    <CheckIcon width="15px" color={colors.primary} />
                  ) : (
                    <CopyIcon width="15px" />
                  )}
                </Button>
              </InputWrapper>
            ) : (
              <>
                <Label>Glitch password</Label>
                <PasswordInput
                  isError={isWrongPassword}
                  msgError="Incorrect password"
                  value={password}
                  placeholder="Enter Glitch password"
                  onChange={(e) => {
                    const { value } = e.target;

                    isWrongPassword && onClearIsWrongPassword();
                    setPassword(value);
                  }}
                />
              </>
            )}
          </Box>

          <Box mt="24px">
            <MessageBox message={t(messages.warningMsg())} />
          </Box>

          <Flex mt="auto">
            {!isWrongPassword && showPrivateKey ? (
              <Button
                width="100%"
                variant="cancel"
                onClick={() => history.push(Routes.home)}
              >
                Close
              </Button>
            ) : (
              <Flex width="100%">
                <Button
                  width="50%"
                  variant="cancel"
                  mr="16px"
                  onClick={() => history.push(Routes.home)}
                >
                  Cancel
                </Button>
                {password ? (
                  <ButtonShadow
                    width="50%"
                    onClick={() => onShowPrivateKeys(password)}
                  >
                    Confirm
                  </ButtonShadow>
                ) : (
                  <Button width="50%" variant="disable-primary">
                    Confirm
                  </Button>
                )}
              </Flex>
            )}
          </Flex>
        </Flex>
      </Box>
    </PageLayout>
  );
};

const AccountWrapper = styled.div`
  display: flex;
  align-items: center;
  user-select: none;
`;

const InputWrapper = styled(Flex)`
  border: 1px solid ${colors.gray8};
  padding: 8px 12px;
`;

const StyledInput = styled(Input)`
  width: 100%;
  border: none;
  padding: 0px;
  resize: none;
`;

export default ShowPrivateKeys;
