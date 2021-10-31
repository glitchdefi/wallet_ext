import React from 'react';
import { useHistory } from 'react-router';

import { colors } from 'theme/colors';
import { Routes } from 'constants/routes';

import { Box } from 'app/components/Box';
import { Text } from 'app/components/Text';
import {
  ClockCircleIcon,
  CurrencyIcon,
  LogoutIcon,
  OneToOneIcon,
  TranslationIcon,
} from 'app/components/Svg';
import { GlitchLogo } from 'app/components/Image';
import { SettingItem } from './SettingItem';

export const SettingsPanel: React.FC = () => {
  const history = useHistory();

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
        <SettingItem
          leftIcon={<TranslationIcon width="24px" />}
          label="Language"
          actionLabel="English"
        />
        <SettingItem
          leftIcon={<CurrencyIcon width="24px" />}
          label="Currency"
          actionLabel="USD"
        />
        <SettingItem
          leftIcon={<ClockCircleIcon width="24px" />}
          label="Auto-lock timer"
          actionLabel="USD"
        />
        <SettingItem
          leftIcon={<OneToOneIcon width="24px" />}
          label="Reveal Mnemonic phrase"
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
