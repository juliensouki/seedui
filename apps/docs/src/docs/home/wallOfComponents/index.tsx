import { FunctionComponent } from 'react';
import styled from '@seedui-react/seedui/sc';
import { UserProfileCard } from './UserProfileCard';
import { SettingsCard } from './SettingsCard';
import { ProjectsCard } from './ProjectsCard';
import { InviteCard } from './InviteCard';
import { ActivityCard } from './ActivityCard';
import { FeedbackCard } from './FeedbackCard';
import { CheckoutCard } from './CheckoutCard';
import { NotificationsCard } from './NotificationsCard';
import { StorageCard } from './StorageCard';
import { TeamCard } from './TeamCard';

const ComponentWall = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(280px, 1fr))',
  gap: 16,
  padding: '16px 20px',
}));

export const WallContent: FunctionComponent = () => (
  <ComponentWall>
    <UserProfileCard />
    <SettingsCard />
    <ProjectsCard />
    <InviteCard />
    <ActivityCard />
    <FeedbackCard />
    <CheckoutCard />
    <NotificationsCard />
    <StorageCard />
    <TeamCard />
  </ComponentWall>
);
