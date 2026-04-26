import { FunctionComponent, useState } from 'react';
import { Text, Button, Input } from '@juliensouki/seedui';
import { useTheme } from '@juliensouki/seedui/sc';
import { WallCard, MiniLabel } from './shared';

export const InviteCard: FunctionComponent = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Editor');
  const [inviteSent, setInviteSent] = useState(false);

  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  return (
    <WallCard>
      <MiniLabel>Invite team member</MiniLabel>
      <Input
        placeholder="colleague@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
        width="100%"
        inputValidation={(v) => isValidEmail(v)}
      />
      <div style={{ marginTop: 10 }}>
        <Input
          placeholder="Editor"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          label="Role"
          width="100%"
        />
      </div>
      {inviteSent && (
        <Text variant="caption" style={{ color: theme.colors.success[500], marginTop: 8 }}>
          Invite sent successfully!
        </Text>
      )}
      <div style={{ display: 'flex', gap: 8, marginTop: 14, justifyContent: 'flex-end' }}>
        <Button
          variant="transparent"
          color="neutral"
          size="md"
          onClick={() => {
            setEmail('');
            setRole('Editor');
            setInviteSent(false);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="filled"
          color="primary"
          size="md"
          onClick={() => {
            if (isValidEmail(email)) {
              setInviteSent(true);
              setTimeout(() => setInviteSent(false), 2000);
              setEmail('');
              setRole('Editor');
            }
          }}
        >
          Send Invite
        </Button>
      </div>
    </WallCard>
  );
};
