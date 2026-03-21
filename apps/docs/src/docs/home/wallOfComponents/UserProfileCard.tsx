import { FunctionComponent } from 'react';
import { Text, Divider, Button, Avatar, Tag } from '@seedui-react/seedui';
import { useTheme } from '@seedui-react/seedui/sc';
import { WallCard, StatValue, StatLabel } from './shared';

export const UserProfileCard: FunctionComponent = () => {
  const theme = useTheme();
  const isLight = theme.mode === 'light';
  return (
    <WallCard>
      <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 16 }}>
        <Avatar name="Jane Doe" size="lg" color="primary" />
        <div style={{ flex: 1 }}>
          <Text variant="h6" style={{ lineHeight: 1.2 }}>
            Jane Doe
          </Text>
          <Text variant="caption" style={{ color: isLight ? theme.colors.neutral[400] : theme.colors.neutral[800], marginTop: 2 }}>
            Senior Product Designer
          </Text>
        </div>
        <Tag color="success" size="md">
          Online
        </Tag>
      </div>
      <Divider spacing={0} />
      <div style={{ display: 'flex', gap: 16, padding: '14px 0 10px' }}>
        <div>
          <StatValue>128</StatValue>
          <StatLabel>Contributions</StatLabel>
        </div>
        <div>
          <StatValue>14</StatValue>
          <StatLabel>Projects</StatLabel>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        <Button variant="filled" color="primary" size="md" style={{ flex: 1 }}>
          Message
        </Button>
        <Button variant="transparent" color="neutral" size="md" style={{ flex: 1 }}>
          Follow
        </Button>
      </div>
    </WallCard>
  );
};
