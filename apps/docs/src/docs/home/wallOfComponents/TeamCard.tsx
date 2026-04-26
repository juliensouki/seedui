import { FunctionComponent } from 'react';
import { Text, Button, Avatar, Tag } from '@juliensouki/seedui';
import { useTheme } from '@juliensouki/seedui/sc';
import { WallCard, MiniLabel } from './shared';

export const TeamCard: FunctionComponent = () => {
  const theme = useTheme();
  const isLight = theme.mode === 'light';

  return (
    <WallCard elementProps={{ rootDiv: { style: { gridColumn: 'span 2' } } }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <MiniLabel style={{ marginBottom: 0 }}>Team</MiniLabel>
        <Button variant="filled" color="primary" size="md">
          Add Member
        </Button>
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        {[
          { name: 'Jane', role: 'Design', color: 'info' as const },
          { name: 'Alice', role: 'Frontend', color: 'primary' as const },
          { name: 'Bob', role: 'Backend', color: 'success' as const },
          { name: 'Carol', role: 'PM', color: 'warning' as const },
        ].map((m) => (
          <div
            key={m.name}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              padding: '14px 8px',
              borderRadius: 10,
              backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[200],
            }}
          >
            <Avatar name={m.name} size="md" color={m.color} />
            <Text variant="small" style={{ fontWeight: 500 }}>
              {m.name}
            </Text>
            <div>
              <Tag color="neutral" size="sm">
                {m.role}
              </Tag>
            </div>
          </div>
        ))}
      </div>
    </WallCard>
  );
};
