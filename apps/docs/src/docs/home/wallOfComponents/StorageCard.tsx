import { FunctionComponent } from 'react';
import { Text, Button, ProgressBar } from '@seedui-react/seedui';
import { useTheme } from '@seedui-react/seedui/sc';
import { WallCard, MiniLabel, StatValue, StatLabel } from './shared';

export const StorageCard: FunctionComponent = () => {
  const theme = useTheme();
  const isLight = theme.mode === 'light';

  return (
    <WallCard>
      <MiniLabel>Storage</MiniLabel>
      <div style={{ display: 'flex', gap: 20, marginBottom: 16 }}>
        <div>
          <StatValue style={{ fontSize: 22 }}>4.2</StatValue>
          <StatLabel>GB used</StatLabel>
        </div>
        <div>
          <StatValue style={{ fontSize: 22 }}>10</StatValue>
          <StatLabel>GB total</StatLabel>
        </div>
      </div>
      {[
        { label: 'Documents', pct: 45, color: 'primary' as const },
        { label: 'Images', pct: 28, color: 'info' as const },
        { label: 'Other', pct: 12, color: 'neutral' as const },
      ].map((item) => (
        <div key={item.label} style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text variant="caption" style={{ fontWeight: 500 }}>
              {item.label}
            </Text>
            <Text variant="caption" style={{ color: isLight ? theme.colors.neutral[400] : theme.colors.neutral[800] }}>
              {item.pct}%
            </Text>
          </div>
          <ProgressBar value={item.pct} color={item.color} height={6} />
        </div>
      ))}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
        <Button variant="filled" color="primary" size="md">
          Upgrade Plan
        </Button>
      </div>
    </WallCard>
  );
};
