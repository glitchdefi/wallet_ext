import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import TextareaAutosize from 'react-autosize-textarea/lib';
import styled from 'styled-components';

import { colors } from 'theme/colors';
import { truncateAddress } from 'utils/strings';
import { messages } from './messages';

import { useAccount } from 'contexts/WalletContext/hooks';
import { useApplication } from 'contexts/ApplicationContext/hooks';
import { showAccountPrivateKey, walletValidate } from 'scripts/ui/messaging';

import { Box, Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { PageLayout } from 'app/layouts';
import { Button, ButtonShadow } from 'app/components/Button';
import { CheckIcon, CloseIcon, CopyIcon } from 'app/components/Svg';
import { Input, Label, PasswordInput } from 'app/components/Form';
import { MessageBox } from 'app/components/MessageBox';
import { Avatar } from 'app/components/Shared';
import { ResponsePrivatekeyGet } from 'scripts/types';

const ShowPrivateKeys: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();

  const { setAppLoading } = useApplication();
  const { name, avatar, address, evmAddress } = useAccount();

  const [copied, setCopied] = useState<string | null>(null);
  const [password, setPassword] = useState<string>('');
  const [validPassword, setValidPassword] = useState<boolean>(true);
  const [privateKey, setPrivateKey] = useState<ResponsePrivatekeyGet>({
    evm: '',
    substrate: '',
  });

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(null);
      }, 1500);
    }
  }, [copied]);

  const renderPrivateKeyView = () => {
    if (privateKey.evm === privateKey.substrate) {
      return (
        <InputWrapper alignItems="center">
          <StyledInput
            disabled
            hasBorder={false}
            value={privateKey.substrate}
            as={TextareaAutosize}
          />
          <Button
            ml="12px"
            p="0px"
            onClick={() => onCopy(privateKey.substrate)}
          >
            {copied === privateKey.substrate ? (
              <CheckIcon width="15px" color={colors.primary} />
            ) : (
              <CopyIcon width="15px" />
            )}
          </Button>
        </InputWrapper>
      );
    }
    return (
      <>
        <Box mb="16px">
          <Text fontSize="12px" color={colors.gray6} mb="4px">
            Substrate
          </Text>
          <InputWrapper alignItems="center">
            <StyledInput
              disabled
              hasBorder={false}
              value={privateKey.substrate}
              as={TextareaAutosize}
            />
            <Button
              ml="12px"
              p="0px"
              onClick={() => onCopy(privateKey.substrate)}
            >
              {copied === privateKey.substrate ? (
                <CheckIcon width="15px" color={colors.primary} />
              ) : (
                <CopyIcon width="15px" />
              )}
            </Button>
          </InputWrapper>
        </Box>
        <Text fontSize="12px" color={colors.gray6} mb="4px">
          EVM
        </Text>
        <InputWrapper alignItems="center">
          <StyledInput
            disabled
            hasBorder={false}
            value={privateKey.evm}
            as={TextareaAutosize}
          />
          <Button ml="12px" p="0px" onClick={() => onCopy(privateKey.evm)}>
            {copied === privateKey.evm ? (
              <CheckIcon width="15px" color={colors.primary} />
            ) : (
              <CopyIcon width="15px" />
            )}
          </Button>
        </InputWrapper>
      </>
    );
  };

  const onCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(value);
  };

  const onConfirm = () => {
    setAppLoading(true);

    walletValidate({ password }).then(async (valid: boolean) => {
      if (valid) {
        const pk = await showAccountPrivateKey();
        setPrivateKey(pk);
      }
      setAppLoading(false);
      setValidPassword(valid);
    });
  };

  return (
    <PageLayout height="600px">
      <Flex overflowY="hidden" flex={1} flexDirection="column" p="16px">
        <Flex
          background={colors.gray2}
          alignItems="center"
          justifyContent="space-between"
          p="16px"
        >
          <Text color={colors.gray7} bold>
            {t(messages.title())}
          </Text>

          <Button p="0px" onClick={() => history.push('/')}>
            <CloseIcon width="12px" fill={colors.gray7} />
          </Button>
        </Flex>

        <Flex
          p="16px"
          flexDirection="column"
          height="512px"
          flex={1}
          background={colors.gray1}
          overflowY="auto"
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
              <Text fontSize="12px" color={colors.gray6}>
                {truncateAddress(evmAddress)}
              </Text>
            </Box>
          </AccountWrapper>

          <Box mt="32px">
            {privateKey.evm && privateKey.substrate ? (
              renderPrivateKeyView()
            ) : (
              <>
                <Label>Glitch password</Label>
                <PasswordInput
                  isError={!validPassword}
                  msgError="Incorrect password"
                  value={password}
                  placeholder="Enter Glitch password"
                  onChange={(e) => {
                    const { value } = e.target;
                    !validPassword && setValidPassword(true);
                    setPassword(value);
                  }}
                />
              </>
            )}
          </Box>

          <Box mt="24px">
            <MessageBox message={t(messages.warningMsg())} />
          </Box>

          <Flex mt="auto" pt="24px">
            {privateKey.evm && privateKey.substrate ? (
              <Button
                width="100%"
                variant="cancel"
                onClick={() => history.push('/')}
              >
                Close
              </Button>
            ) : (
              <Flex mt="auto" width="100%">
                <Button
                  width="50%"
                  variant="cancel"
                  mr="16px"
                  onClick={() => history.push('/')}
                >
                  Cancel
                </Button>
                {password ? (
                  <ButtonShadow width="50%" onClick={onConfirm}>
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
      </Flex>
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
