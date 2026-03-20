import React, { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, Text, Divider, Button, Input, Tag, Toggle, SearchBar, Textarea, useTheme } from '@seedui-react/seedui';
import { GithubIcon } from 'lucide-react';

const Section = styled('section')(() => ({
  marginBottom: 40,
}));


const FeatureGrid = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: 20,
}));

const FeatureCard = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    padding: '20px 24px',
    borderRadius: 10,
    border: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[300]}`,
    backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[200],
  };
});

const FeatureDescription = styled(Text)(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    color: isLight ? theme.colors.neutral[500] : theme.colors.neutral[800],
    fontSize: 14,
    lineHeight: 1.5,
  };
});

/* ── Hero layout ── */

const HeroSection = styled('div')(() => ({
  display: 'flex',
  alignItems: 'stretch',
  gap: 0,
  marginTop: -40,
  marginBottom: 0,
  height: 600,
  overflow: 'hidden',
  position: 'relative' as const,
}));

const HeroLeft = styled('div')(() => ({
  flex: '0 0 400px',
  display: 'flex',
  flexDirection: 'column' as const,
  justifyContent: 'center',
  paddingRight: 32,
  position: 'relative' as const,
  zIndex: 2,
}));

const HeroRight = styled('div')(() => ({
  flex: 1,
  overflow: 'hidden',
  minWidth: 0,
  position: 'relative' as const,
}));

const WallFade = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    position: 'absolute' as const,
    top: 0,
    left: -1,
    bottom: 0,
    width: 200,
    zIndex: 10,
    pointerEvents: 'none' as const,
    background: isLight
      ? 'linear-gradient(to right, #ffffff, #ffffff00)'
      : `linear-gradient(to right, ${theme.colors.neutral[100]}, ${theme.colors.neutral[100]}00)`,
  };
});

const ComponentWallWrapper = styled('div')(() => ({}));

const ScrollContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column' as const,
  animation: 'seedui-wall-scroll 60s linear infinite',
  '@keyframes seedui-wall-scroll': {
    '0%': { transform: 'translateY(0)' },
    '100%': { transform: 'translateY(-50%)' },
  },
}));

const ComponentWall = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(280px, 1fr))',
  gap: 16,
  padding: '16px 20px',
}));

/* ── Mini-UI card ── */

const MiniCard = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    padding: '20px',
    borderRadius: 12,
    border: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[300]}`,
    backgroundColor: isLight ? theme.colors.neutral.white : theme.colors.neutral[200],
    boxShadow: isLight
      ? '0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)'
      : '0 1px 3px rgba(0,0,0,0.2), 0 4px 12px rgba(0,0,0,0.15)',
  };
});

const MiniLabel = styled('span')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    fontSize: 11,
    fontWeight: 600,
    color: isLight ? theme.colors.neutral[400] : theme.colors.neutral[800],
    textTransform: 'uppercase' as const,
    letterSpacing: '0.04em',
    display: 'block',
    marginBottom: 12,
  };
});

const Row = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
}));

const SettingRow = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: `1px solid ${isLight ? theme.colors.neutral[100] : theme.colors.neutral[200]}`,
    '&:last-child': { borderBottom: 'none', paddingBottom: 0 },
    '&:first-child': { paddingTop: 0 },
  };
});

/* ── Avatar components ── */

const AvatarBase = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  fontWeight: 600,
  flexShrink: 0,
}));

const AvatarSm = styled(AvatarBase)(() => ({
  width: 32,
  height: 32,
  borderRadius: '50%',
  fontSize: 12,
}));

const AvatarLg = styled(AvatarBase)(({ theme }) => ({
  width: 52,
  height: 52,
  borderRadius: '50%',
  fontSize: 18,
  boxShadow: `0 0 0 2px ${theme.colors.neutral.white}, 0 0 0 4px ${theme.colors.primary[200]}`,
}));

const AvatarStack = styled('div')(() => ({
  display: 'flex',
  '& > *:not(:first-child)': {
    marginLeft: -8,
  },
}));

const AvatarStackItem = styled(AvatarBase)<{ $color: string }>(({ $color }) => ({
  width: 30,
  height: 30,
  borderRadius: '50%',
  fontSize: 11,
  backgroundColor: $color,
  border: '2px solid #fff',
}));

/* ── Stat / badge helpers ── */

const StatValue = styled(Text)(() => ({
  fontSize: 28,
  fontWeight: 700,
  lineHeight: 1,
}));

const StatLabel = styled(Text)(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    fontSize: 12,
    color: isLight ? theme.colors.neutral[400] : theme.colors.neutral[800],
    marginTop: 4,
  };
});

const StatusDot = styled('span')<{ $color: string }>(({ $color }) => ({
  display: 'inline-block',
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: $color,
  marginRight: 6,
}));

const NotifItem = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    display: 'flex',
    gap: 10,
    alignItems: 'flex-start',
    padding: '10px 12px',
    borderRadius: 8,
    backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[200],
    marginBottom: 6,
    '&:last-child': { marginBottom: 0 },
  };
});

const ProgressBar = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    height: 6,
    borderRadius: 3,
    backgroundColor: isLight ? theme.colors.neutral[200] : theme.colors.neutral[300],
    overflow: 'hidden',
  };
});

const ProgressFill = styled('div')<{ $width: number; $color: string }>(({ $width, $color }) => ({
  height: '100%',
  width: `${$width}%`,
  borderRadius: 3,
  backgroundColor: $color,
}));

const StepperMini = styled('div')(() => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 0,
}));

const StepItem = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  gap: 6,
  width: 56,
  flexShrink: 0,
}));

const StepDot = styled('div')<{ $active: boolean; $done: boolean; $color: string }>(
  ({ $active, $done, $color, theme }) => {
    const isLight = theme.mode === 'light';
    const filled = $done || $active;
    return {
      width: 12,
      height: 12,
      borderRadius: '50%',
      flexShrink: 0,
      backgroundColor: filled ? $color : isLight ? theme.colors.neutral[200] : theme.colors.neutral[300],
      boxShadow: $active ? `0 0 0 3px ${$color}33` : 'none',
      transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
    };
  },
);

const StepLine = styled('div')<{ $done: boolean; $color: string }>(({ $done, $color, theme }) => {
  const isLight = theme.mode === 'light';
  return {
    flex: 1,
    height: 2,
    marginTop: 5,
    backgroundColor: isLight ? theme.colors.neutral[200] : theme.colors.neutral[300],
    borderRadius: 1,
    overflow: 'hidden' as const,
    position: 'relative' as const,
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: $done ? '100%' : '0%',
      backgroundColor: $color,
      borderRadius: 1,
      transition: 'width 0.4s ease',
    },
  };
});

/* ── Wall content (purely decorative) ── */

const WallContent: FunctionComponent = () => {
  const theme = useTheme();
  const isLight = theme.mode === 'light';
  const [notif, setNotif] = useState(true);
  const [dark, setDark] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [search, setSearch] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Editor');
  const [feedback, setFeedback] = useState('');
  const [feedbackTag, setFeedbackTag] = useState('Feature');
  const [checkoutStep, setCheckoutStep] = useState(2);
  const [inviteSent, setInviteSent] = useState(false);

  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const projects = [
    { name: 'Design System', status: 'Active', color: theme.colors.success[500] },
    { name: 'Mobile App', status: 'In review', color: theme.colors.warning[500] },
    { name: 'API v2', status: 'Draft', color: theme.colors.neutral[400] },
  ];
  const filteredProjects = projects.filter(
    (p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.status.toLowerCase().includes(search.toLowerCase()),
  );

  const stepLabels = ['Cart', 'Shipping', 'Payment', 'Confirmation'];

  return (
    <ComponentWall>
      {/* ── User profile card ── */}
      <MiniCard>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 16 }}>
          <AvatarLg style={{ backgroundColor: theme.colors.primary[500] }}>JD</AvatarLg>
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
          <Button variant="filled" color="primary" size="md" elementProps={{ rootButton: { style: { flex: 1 } } }}>
            Message
          </Button>
          <Button variant="transparent" color="neutral" size="md" elementProps={{ rootButton: { style: { flex: 1 } } }}>
            Follow
          </Button>
        </div>
      </MiniCard>

      {/* ── Settings panel ── */}
      <MiniCard>
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
      </MiniCard>

      {/* ── Project card ── */}
      <MiniCard>
        <MiniLabel>Projects</MiniLabel>
        <SearchBar
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          width="100%"
        />
        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filteredProjects.length === 0 ? (
            <Text variant="caption" style={{ color: isLight ? theme.colors.neutral[400] : theme.colors.neutral[800], textAlign: 'center', padding: '12px 0' }}>
              No projects found
            </Text>
          ) : (
            filteredProjects.map((p) => (
              <div
                key={p.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  borderRadius: 8,
                  backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[200],
                }}
              >
                <Text variant="small" style={{ fontWeight: 500 }}>
                  <StatusDot $color={p.color} />
                  {p.name}
                </Text>
                <Text variant="caption" style={{ color: isLight ? theme.colors.neutral[400] : theme.colors.neutral[800] }}>
                  {p.status}
                </Text>
              </div>
            ))
          )}
        </div>
      </MiniCard>

      {/* ── Invite team member ── */}
      <MiniCard>
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
      </MiniCard>

      {/* ── Activity feed ── */}
      <MiniCard>
        <MiniLabel>Recent activity</MiniLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {[
            {
              initials: 'AL',
              name: 'Alice',
              action: 'updated the design tokens',
              time: '2m ago',
              bg: theme.colors.primary[500],
            },
            { initials: 'BK', name: 'Bob', action: 'pushed to main', time: '15m ago', bg: theme.colors.success[500] },
            { initials: 'CM', name: 'Carol', action: 'left a comment', time: '1h ago', bg: theme.colors.warning[500] },
          ].map((item) => (
            <div
              key={item.initials}
              style={{
                display: 'flex',
                gap: 10,
                alignItems: 'center',
                padding: '8px 10px',
                borderRadius: 8,
              }}
            >
              <AvatarSm style={{ backgroundColor: item.bg }}>{item.initials}</AvatarSm>
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
          <AvatarStack>
            <AvatarStackItem $color={theme.colors.primary[500]}>AL</AvatarStackItem>
            <AvatarStackItem $color={theme.colors.success[500]}>BK</AvatarStackItem>
            <AvatarStackItem $color={theme.colors.warning[500]}>CM</AvatarStackItem>
          </AvatarStack>
          <Text variant="caption" style={{ color: isLight ? theme.colors.neutral[400] : theme.colors.neutral[800] }}>
            3 team members
          </Text>
        </div>
      </MiniCard>

      {/* ── Feedback form ── */}
      <MiniCard>
        <MiniLabel>Feedback</MiniLabel>
        <Row style={{ gap: 6, marginBottom: 12 }}>
          {['Bug', 'Feature', 'Improvement', 'Other'].map((label) => (
            <Tag
              key={label}
              color={feedbackTag === label ? 'primary' : 'neutral'}
              size="md"
              elementProps={{ rootDiv: { style: { cursor: 'pointer' }, onClick: () => setFeedbackTag(label) } }}
            >
              {label}
            </Tag>
          ))}
        </Row>
        <Textarea
          placeholder="Describe your feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          width="100%"
        />
        <div style={{ display: 'flex', gap: 8, marginTop: 12, justifyContent: 'flex-end' }}>
          <Button
            variant="transparent"
            color="neutral"
            size="md"
            onClick={() => {
              setFeedback('');
              setFeedbackTag('Feature');
            }}
          >
            Clear
          </Button>
          <Button variant="filled" color="primary" size="md">
            Submit
          </Button>
        </div>
      </MiniCard>

      {/* ── Checkout ── */}
      <MiniCard style={{ gridColumn: 'span 2' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <MiniLabel style={{ marginBottom: 0 }}>Checkout</MiniLabel>
          <Tag color="info" size="md">
            {`Step ${checkoutStep + 1} of ${stepLabels.length}`}
          </Tag>
        </div>
        <StepperMini>
          {stepLabels.map((label, i) => (
            <React.Fragment key={label}>
              <StepItem>
                <StepDot $active={i === checkoutStep} $done={i < checkoutStep} $color={theme.colors.primary[500]} />
                <Text
                  variant="caption"
                  style={{
                    fontSize: 10,
                    color: i <= checkoutStep ? theme.colors.primary[500] : (isLight ? theme.colors.neutral[400] : theme.colors.neutral[800]),
                    fontWeight: i === checkoutStep ? 600 : 400,
                    transition: 'color 0.3s ease, font-weight 0.3s ease',
                  }}
                >
                  {label}
                </Text>
              </StepItem>
              {i < stepLabels.length - 1 && <StepLine $done={i < checkoutStep} $color={theme.colors.primary[500]} />}
            </React.Fragment>
          ))}
        </StepperMini>
        <Divider spacing={10} />
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <Button
            variant="transparent"
            color="neutral"
            size="md"
            onClick={() => setCheckoutStep((s) => Math.max(0, s - 1))}
          >
            Back
          </Button>
          <Button
            variant="filled"
            color="primary"
            size="md"
            onClick={() => setCheckoutStep((s) => Math.min(stepLabels.length - 1, s + 1))}
          >
            {checkoutStep === stepLabels.length - 1 ? 'Place Order' : `Continue to ${stepLabels[checkoutStep + 1]}`}
          </Button>
        </div>
      </MiniCard>

      {/* ── Notifications ── */}
      <MiniCard>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <MiniLabel style={{ marginBottom: 0 }}>Notifications</MiniLabel>
          <Tag color="error" size="sm">
            3 new
          </Tag>
        </div>
        <NotifItem>
          <AvatarSm style={{ backgroundColor: theme.colors.info[500], width: 28, height: 28, fontSize: 11 }}>
            DR
          </AvatarSm>
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
          <AvatarSm style={{ backgroundColor: theme.colors.success[500], width: 28, height: 28, fontSize: 11 }}>
            CI
          </AvatarSm>
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
          <AvatarSm style={{ backgroundColor: theme.colors.warning[500], width: 28, height: 28, fontSize: 11 }}>
            PM
          </AvatarSm>
          <div style={{ flex: 1 }}>
            <Text variant="small" style={{ fontWeight: 500 }}>
              Sprint ends tomorrow
            </Text>
            <Text variant="caption" style={{ color: isLight ? theme.colors.neutral[400] : theme.colors.neutral[800], fontSize: 11 }}>
              2 tasks still in progress
            </Text>
          </div>
        </NotifItem>
      </MiniCard>

      {/* ── Storage usage ── */}
      <MiniCard>
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
          { label: 'Documents', pct: 45, color: theme.colors.primary[500] },
          { label: 'Images', pct: 28, color: theme.colors.info[500] },
          { label: 'Other', pct: 12, color: theme.colors.neutral[400] },
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
            <ProgressBar>
              <ProgressFill $width={item.pct} $color={item.color} />
            </ProgressBar>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
          <Button variant="filled" color="primary" size="md">
            Upgrade Plan
          </Button>
        </div>
      </MiniCard>

      {/* ── Team members ── */}
      <MiniCard style={{ gridColumn: 'span 2' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <MiniLabel style={{ marginBottom: 0 }}>Team</MiniLabel>
          <Button variant="filled" color="primary" size="md">
            Add Member
          </Button>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {[
            { initials: 'JD', name: 'Jane', role: 'Design', bg: theme.colors.info[500] },
            { initials: 'AL', name: 'Alice', role: 'Frontend', bg: theme.colors.primary[500] },
            { initials: 'BK', name: 'Bob', role: 'Backend', bg: theme.colors.success[500] },
            { initials: 'CM', name: 'Carol', role: 'PM', bg: theme.colors.warning[500] },
          ].map((m) => (
            <div
              key={m.initials}
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
              <AvatarSm style={{ backgroundColor: m.bg, width: 38, height: 38, fontSize: 13 }}>{m.initials}</AvatarSm>
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
      </MiniCard>
    </ComponentWall>
  );
};

export const HomePage: FunctionComponent = () => {
  const theme = useTheme();
  const isLight = theme.mode === 'light';
  const navigate = useNavigate();

  return (
    <div>
      <HeroSection>
        <HeroLeft>
          <div>
            <Text variant="h1">seedui</Text>
            <Text variant="p" style={{ marginTop: 8, color: isLight ? theme.colors.neutral[500] : theme.colors.neutral.white }}>
              A simple and elegant React component library that&apos;s endlessly customizable.
            </Text>
            <Text variant="p" style={{ marginTop: 16, lineHeight: 1.7, color: isLight ? theme.colors.neutral[500] : theme.colors.neutral[800] }}>
              Everything you need to craft polished applications, internal tools, and delightful user experiences —
              designed to get out of your way.
            </Text>
            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              <Button
                variant="filled"
                color="primary"
                size="md"
                onClick={() => navigate('/getting-started/installation')}
              >
                How to install
              </Button>
              <Button variant="transparent" color="neutral" size="md">
                <GithubIcon size={16} style={{ marginRight: 6 }} />
                View on GitHub
              </Button>
            </div>
          </div>
        </HeroLeft>
        <HeroRight>
          <WallFade />
          <ComponentWallWrapper>
            <ScrollContainer>
              <WallContent />
              <WallContent />
            </ScrollContainer>
          </ComponentWallWrapper>
        </HeroRight>
      </HeroSection>

      <Divider spacing={0} style={{ marginBottom: 28 }} />

      <Section>
        <Text variant="h4" as="h2" style={{ marginBottom: 16 }}>
          Why seedui
        </Text>
        <FeatureGrid>
          <FeatureCard>
            <Text variant="h5" as="h3" style={{ marginBottom: 6 }}>
              Design Token System
            </Text>
            <FeatureDescription>
              A comprehensive set of tokens for colors, typography, spacing, border radius, box shadows, and
              breakpoints. Every value is consistent and overridable.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <Text variant="h5" as="h3" style={{ marginBottom: 6 }}>
              Fully Themeable
            </Text>
            <FeatureDescription>
              Customize the entire look and feel through the ThemeProvider. Override design tokens, set global default
              props, and apply conditional styles to any component.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <Text variant="h5" as="h3" style={{ marginBottom: 6 }}>
              Dark Mode
            </Text>
            <FeatureDescription>
              Built-in light and dark mode support. All components and tokens adapt automatically when you switch modes.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <Text variant="h5" as="h3" style={{ marginBottom: 6 }}>
              Styled Components
            </Text>
            <FeatureDescription>
              Built on styled-components with full TypeScript support. Use the re-exported <code>styled</code> and{' '}
              <code>useTheme</code> utilities to build custom components that access your theme.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <Text variant="h5" as="h3" style={{ marginBottom: 6 }}>
              TypeScript First
            </Text>
            <FeatureDescription>
              Every component, token, and theme configuration is fully typed. Get autocompletion and type safety for
              props, style overrides, and conditional style conditions.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <Text variant="h5" as="h3" style={{ marginBottom: 6 }}>
              Component Customization
            </Text>
            <FeatureDescription>
              Go beyond props — apply global CSS overrides and conditional styles that react to component props and
              theme values, all from a single configuration object.
            </FeatureDescription>
          </FeatureCard>
        </FeatureGrid>
      </Section>
    </div>
  );
};
