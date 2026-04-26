import { FunctionComponent, useState } from 'react';
import { Text, Toggle } from '@juliensouki/seedui';
import { useTheme } from '@juliensouki/seedui/sc';
import { WallCard, MiniLabel, SettingRow } from './shared';

export const SettingsCard: FunctionComponent = () => {
  const theme = useTheme();
  const isLight = theme.mode === 'light';
  const [notif, setNotif] = useState(true);
  const [dark, setDark] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <WallCard>
      <MiniLabel>Preferences</MiniLabel>
      <SettingRow>
        <div>
          <Text variant="small" style={{ fontWeight: 500 }}>
            Push notifications
          </Text>
          <Text variant="caption" style={{ color: isLight ? theme.colors.neutral[400] : theme.colors.neutral[800], fontSize: 11 }}>
            Receive alerts on your device
          </Text>
        </div>
        <Toggle checked={notif} onChange={() => setNotif(!notif)} />
      </SettingRow>
      <SettingRow>
        <div>
          <Text variant="small" style={{ fontWeight: 500 }}>
            Dark mode
          </Text>
          <Text variant="caption" style={{ color: isLight ? theme.colors.neutral[400] : theme.colors.neutral[800], fontSize: 11 }}>
            Use dark color scheme
          </Text>
        </div>
        <Toggle checked={dark} onChange={() => setDark(!dark)} />
      </SettingRow>
      <SettingRow>
        <div>
          <Text variant="small" style={{ fontWeight: 500 }}>
            Auto-save
          </Text>
          <Text variant="caption" style={{ color: isLight ? theme.colors.neutral[400] : theme.colors.neutral[800], fontSize: 11 }}>
            Save changes automatically
          </Text>
        </div>
        <Toggle checked={autoSave} onChange={() => setAutoSave(!autoSave)} />
      </SettingRow>
    </WallCard>
  );
};
