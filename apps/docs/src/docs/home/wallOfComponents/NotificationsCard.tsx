import { FunctionComponent } from 'react';
import { Text, Avatar, Tag } from '@seedui-react/seedui';
import { useTheme } from '@seedui-react/seedui/sc';
import { WallCard, MiniLabel, NotifItem } from './shared';

export const NotificationsCard: FunctionComponent = () => {
  const theme = useTheme();
  const isLight = theme.mode === 'light';

  return (
    <WallCard>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <MiniLabel style={{ marginBottom: 0 }}>Notifications</MiniLabel>
        <Tag color="error" size="sm">
          3 new
        </Tag>
      </div>
      <NotifItem>
        <Avatar name="David R" size="sm" color="info" />
        <div style={{ flex: 1 }}>
          <Text variant="small" style={{ fontWeight: 500 }}>
            Design review requested
          </Text>
          <Text variant="caption" style={{ color: isLight ? theme.colors.neutral[400] : theme.colors.neutral[800], fontSize: 11 }}>
            David wants your feedback on the new layout
          </Text>
        </div>
      </NotifItem>
      <NotifItem>
        <Avatar name="CI" size="sm" color="success" />
        <div style={{ flex: 1 }}>
          <Text variant="small" style={{ fontWeight: 500 }}>
            Build passed
          </Text>
          <Text variant="caption" style={{ color: isLight ? theme.colors.neutral[400] : theme.colors.neutral[800], fontSize: 11 }}>
            All 47 tests passed on main
          </Text>
        </div>
      </NotifItem>
      <NotifItem>
        <Avatar name="PM" size="sm" color="warning" />
        <div style={{ flex: 1 }}>
          <Text variant="small" style={{ fontWeight: 500 }}>
            Sprint ends tomorrow
          </Text>
          <Text variant="caption" style={{ color: isLight ? theme.colors.neutral[400] : theme.colors.neutral[800], fontSize: 11 }}>
            2 tasks still in progress
          </Text>
        </div>
      </NotifItem>
    </WallCard>
  );
};
