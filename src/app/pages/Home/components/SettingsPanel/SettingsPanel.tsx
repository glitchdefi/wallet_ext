import React from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import secrets from 'secrets';

import { colors } from 'theme/colors';
import { Routes } from 'constants/routes';
import { LOCK_TIME_LIST } from 'constants/values';

import { useWallet } from 'contexts/WalletContext/hooks';
import { useAutoLock, useSettings } from 'contexts/SettingsContext/hooks';

import { Box, Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import {
  ClockCircleIcon,
  // CurrencyIcon,
  DownArrowIcon,
  ExclaimationCircleIcon,
  LogoutIcon,
  OneToOneIcon,
  // TranslationIcon,
} from 'app/components/Svg';
import { GlitchLogo } from 'app/components/Image';
import { Dropdown } from 'app/components/Dropdown';
import { SettingItem } from './SettingItem';
import { messages } from '../../messages';

export const SettingsPanel: React.FC = React.memo(() => {
  const { t } = useTranslation();
  const history = useHistory();
  const { walletCtx } = useWallet();
  const { isBackup } = walletCtx || {};
  const { setAutoLock } = useSettings();
  const { duration } = useAutoLock();

  const activeTimer = LOCK_TIME_LIST.find((o) => o.time === duration);

  return (
    <Box minHeight="600px" overflowY="scroll">
      <Box px="16px">
        <Box borderBottom={`1px solid ${colors.magenta2}`} py="16px">
          <Text color={colors.gray7} fontSize="24px" bold>
            {t(messages.settings())}
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
          label={t(messages.autoLockTimer())}
          actionLabel="USD"
          rightComponent={
            <Dropdown
              showChecked
              activeKey={activeTimer?.key}
              onSelect={(key) => {
                const { time } = LOCK_TIME_LIST[key];
                setAutoLock({ openTime: new Date().getTime(), duration: time });
              }}
              customToggle={
                <Flex
                  py="5px"
                  px="12px"
                  border={`1px solid ${colors.gray8}`}
                  alignItems="center"
                >
                  <Text mr="21px">{activeTimer?.label}</Text>
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
            !isBackup
              ? t(messages.yourWalletNotBackup())
              : t(messages.revealMnemonicPhrase())
          }
          actionLabel={!isBackup && <ExclaimationCircleIcon />}
          onClick={() =>
            history.push(
              !isBackup ? Routes.backUp : Routes.revealMnemonicPhrase
            )
          }
        />
        <SettingItem
          leftIcon={<LogoutIcon width="24px" />}
          label={t(messages.logout())}
          onClick={() => history.push(Routes.logoutWallet)}
        />
        <SettingItem
          leftIcon={<GlitchLogo width={24} height={24} />}
          label={t(messages.aboutGlitch())}
          actionLabel={`v${secrets.walletVersion}`}
          onClick={() => history.push(Routes.aboutUs)}
        />
      </Box>
    </Box>
  );
});
