import React, { FunctionComponent, useState } from 'react';
import { Text, Divider, Button, Input, Tag, Toggle, SearchBar, Textarea, Avatar, AvatarStack, Card, ProgressBar, Stepper } from '@seedui-react/seedui';
import styled, { useTheme } from '@seedui-react/seedui/sc';
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

const WallCard = styled(Card)(() => ({
  width: '100%',
  padding: 20,
}));

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
  const [checkoutStep, setCheckoutStep] = useState(3);
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
          <Button variant="filled" color="primary" size="md" elementProps={{ rootButton: { style: { flex: 1 } } }}>
            Message
          </Button>
          <Button variant="transparent" color="neutral" size="md" elementProps={{ rootButton: { style: { flex: 1 } } }}>
            Follow
          </Button>
        </div>
      </WallCard>

      {/* ── Settings panel ── */}
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

      {/* ── Project card ── */}
      <WallCard>
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
      </WallCard>

      {/* ── Invite team member ── */}
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

      {/* ── Activity feed ── */}
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

      {/* ── Feedback form ── */}
      <WallCard>
        <MiniLabel>Feedback</MiniLabel>
        <Row style={{ gap: 6, marginBottom: 12 }}>
          {['Bug', 'Feature', 'Improvement', 'Other'].map((label) => (
            <Tag
              key={label}
              color={feedbackTag === label ? 'primary' : 'neutral'}
              size="md"
              elementProps={{ root: { style: { cursor: 'pointer' }, onClick: () => setFeedbackTag(label) } }}
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
      </WallCard>

      {/* ── Checkout ── */}
      <WallCard elementProps={{ rootDiv: { style: { gridColumn: 'span 2' } } }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <MiniLabel style={{ marginBottom: 0 }}>Checkout</MiniLabel>
          <Tag color="info" size="md">
            {`Step ${checkoutStep} of ${stepLabels.length}`}
          </Tag>
        </div>
        <Stepper steps={stepLabels} activeStep={checkoutStep} />
        <Divider spacing={10} />
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <Button
            variant="transparent"
            color="neutral"
            size="md"
            onClick={() => setCheckoutStep((s) => Math.max(1, s - 1))}
          >
            Back
          </Button>
          <Button
            variant="filled"
            color="primary"
            size="md"
            onClick={() => setCheckoutStep((s) => Math.min(stepLabels.length, s + 1))}
          >
            {checkoutStep === stepLabels.length ? 'Place Order' : `Continue to ${stepLabels[checkoutStep]}`}
          </Button>
        </div>
      </WallCard>

      {/* ── Notifications ── */}
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

      {/* ── Storage usage ── */}
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

      {/* ── Team members ── */}
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
    </ComponentWall>
  );
};

export const HomePage: FunctionComponent = () => {
  const theme = useTheme();
  const isLight = theme.mode === 'light';
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
              Everything you need to craft polished applications, internal tools, and delightful user experiences.
            </Text>
            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              <Button
                variant="filled"
                color="primary"
                size="md"
                onClick={() => { window.location.href = '/getting-started/installation'; }}
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
              Clean Foundation
            </Text>
            <FeatureDescription>
              A React component library that aims to look and feel right from the start.
              Use it as-is or build on top of it to create your own design system.
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
              Fully Customizable
            </Text>
            <FeatureDescription>
              Built on styled-components, every token and component can be tailored to your needs.
              Override anything from a single theme object, or create your own themed components
              using the same tools that power seedui.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <Text variant="h5" as="h3" style={{ marginBottom: 6 }}>
              Designed in Figma
            </Text>
            <FeatureDescription>
              Every component comes with matching Figma designs, ready to use in your workflows. Designers and developers
              stay in sync from day one.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <Text variant="h5" as="h3" style={{ marginBottom: 6 }}>
              AI-Friendly Docs
            </Text>
            <FeatureDescription>
              Documentation is server-side rendered so AI agents and coding assistants can read it directly.
              Point your tools at the docs and let them help you build.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <Text variant="h5" as="h3" style={{ marginBottom: 6 }}>
              Developer Experience
            </Text>
            <FeatureDescription>
              Fully typed with TypeScript, so you get autocompletion and type safety for every prop, token, and
              style override. Spend less time looking things up and more time building.
            </FeatureDescription>
          </FeatureCard>
        </FeatureGrid>
      </Section>
    </div>
  );
};
