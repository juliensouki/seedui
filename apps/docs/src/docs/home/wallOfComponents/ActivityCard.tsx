import { FunctionComponent } from 'react';
import { Text, Divider, Avatar, AvatarStack } from '@juliensouki/seedui';
import { useTheme } from '@juliensouki/seedui/sc';
import { WallCard, MiniLabel } from './shared';

export const ActivityCard: FunctionComponent = () => {
  const theme = useTheme();
  const isLight = theme.mode === 'light';

  return (
    <WallCard>
      <MiniLabel>Recent activity</MiniLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {[
          { name: 'Alice', action: 'updated the design tokens', time: '2m ago', color: 'primary' as const },
          { name: 'Bob', action: 'pushed to main', time: '15m ago', color: 'success' as const },
          { name: 'Carol', action: 'left a comment', time: '1h ago', color: 'warning' as const },
        ].map((item) => (
          <div
            key={item.name}
            style={{
              display: 'flex',
              gap: 10,
              alignItems: 'center',
              padding: '8px 10px',
              borderRadius: 8,
            }}
          >
            <Avatar name={item.name} size="sm" color={item.color} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <Text variant="small" style={{ fontWeight: 500 }}>
                {item.name} <span style={{ fontWeight: 400, color: isLight ? theme.colors.neutral[500] : theme.colors.neutral[800] }}>{item.action}</span>
              </Text>
              <Text variant="caption" style={{ color: isLight ? theme.colors.neutral[400] : theme.colors.neutral[800], fontSize: 11 }}>
                {item.time}
              </Text>
            </div>
          </div>
        ))}
      </div>
      <Divider spacing={8} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <AvatarStack size="sm">
          <Avatar name="Alice" color="primary" />
          <Avatar name="Bob" color="success" />
          <Avatar name="Carol" color="warning" />
        </AvatarStack>
        <Text variant="caption" style={{ color: isLight ? theme.colors.neutral[400] : theme.colors.neutral[800] }}>
          3 team members
        </Text>
      </div>
    </WallCard>
  );
};
