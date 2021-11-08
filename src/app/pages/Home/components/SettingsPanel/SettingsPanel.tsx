import React from 'react';
import { useHistory } from 'react-router';

import { colors } from 'theme/colors';
import { Routes } from 'constants/routes';
import { LOCK_TIME_LIST } from 'constants/values';

import { useIsBackup, useWalletSlice } from 'state/wallet/hooks';

import { Box, Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import {
  ClockCircleIcon,
  CurrencyIcon,
  DownArrowIcon,
  ExclaimationCircleIcon,
  LogoutIcon,
  OneToOneIcon,
  TranslationIcon,
} from 'app/components/Svg';
import { GlitchLogo } from 'app/components/Image';
import { Dropdown } from 'app/components/Dropdown';
import { SettingItem } from './SettingItem';

export const SettingsPanel: React.FC = () => {
  useWalletSlice();
  const history = useHistory();

  const { isBackUp } = useIsBackup();

  return (
    <Box minHeight="600px" overflowY="scroll">
      <Box px="16px">
        <Box borderBottom={`1px solid ${colors.magenta2}`} py="16px">
          <Text color={colors.gray7} fontSize="24px" bold>
            Settings
          </Text>
        </Box>
      </Box>

      <Box px="16px" mt="8px">
        {/* <SettingItem
          leftIcon={<TranslationIcon width="24px" />}
          label="Language"
          actionLabel="English"
        />
        <SettingItem
          leftIcon={<CurrencyIcon width="24px" />}
          label="Currency"
          actionLabel="USD"
        /> */}
        <SettingItem
          leftIcon={<ClockCircleIcon width="24px" />}
          label="Auto-lock timer"
          actionLabel="USD"
          rightComponent={
            <Dropdown
              onSelect={(eventKey) => {
                if (eventKey == 0) history.push(Routes.accountDetails);
                if (eventKey == 1) history.push(Routes.showPrivateKeys);
              }}
              customToggle={
                <Flex
                  py="5px"
                  px="12px"
                  border={`1px solid ${colors.gray8}`}
                  alignItems="center"
                >
                  <Text mr="21px">Never</Text>
                  <DownArrowIcon color={colors.gray9} />
                </Flex>
              }
              items={LOCK_TIME_LIST}
            />
          }
        />
        <SettingItem
          leftIcon={<OneToOneIcon width="24px" />}
          label={
            !isBackUp
              ? 'Your wallet is not backed up'
              : 'Reveal Mnemonic phrase'
          }
          actionLabel={!isBackUp && <ExclaimationCircleIcon />}
          onClick={() =>
            history.push(
              !isBackUp ? Routes.backUp : Routes.revealMnemonicPhrase
            )
          }
        />
        <SettingItem
          leftIcon={<LogoutIcon width="24px" />}
          label="Log out"
          onClick={() => history.push(Routes.logoutWallet)}
        />
        <SettingItem
          leftIcon={<GlitchLogo width={24} height={24} />}
          label="About Glitch"
          onClick={() => history.push(Routes.aboutUs)}
        />
      </Box>
    </Box>
  );
};
