import { Avatar, AvatarStack } from '@seedui-react/seedui';
import { ComponentDoc } from './types';

function AvatarStackExample() {
  return (
    <AvatarStack max={3}>
      <Avatar src="https://i.pravatar.cc/150?img=1" name="Jane Doe" />
      <Avatar src="https://i.pravatar.cc/150?img=2" name="John Smith" />
      <Avatar src="https://i.pravatar.cc/150?img=3" name="Alex Kim" />
      <Avatar name="Sam Lee" color="success" />
      <Avatar name="Pat Brown" color="info" />
    </AvatarStack>
  );
}

export const avatarStackDoc: ComponentDoc = {
  name: 'AvatarStack',
  category: 'Data Display',
  description: 'A group of overlapping avatars showing multiple users in a compact layout.',
  overview: 'AvatarStack renders a set of Avatar components in an overlapping row. Use the max prop to limit the number of visible avatars — any overflow is shown as a "+N" badge. The size prop is applied uniformly across all avatars in the stack. This component is ideal for showing team members, collaborators, or participants in a space-efficient way.',
  props: [
    { name: 'children', type: 'ReactElement<AvatarProps> | ReactElement<AvatarProps>[]', default: '—', description: 'Avatar components to display. Required.' },
    { name: 'max', type: 'number', default: '—', description: 'Maximum number of avatars to show. Overflow displays as "+N".' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size applied to all avatars in the stack.' },
    { name: 'direction', type: "'left' | 'right'", default: "'left'", description: 'Which side appears on top. "left" puts the first avatar on top, "right" puts the last on top.' },
  ],
  example: AvatarStackExample,
  code: `<AvatarStack max={3}>
  <Avatar src="https://i.pravatar.cc/150?img=1" name="Jane Doe" />
  <Avatar src="https://i.pravatar.cc/150?img=2" name="John Smith" />
  <Avatar src="https://i.pravatar.cc/150?img=3" name="Alex Kim" />
  <Avatar name="Sam Lee" color="success" />
  <Avatar name="Pat Brown" color="info" />
</AvatarStack>`,
  anatomy: [
    { name: 'Root', htmlAttribute: 'rootDiv', cssClass: '—' },
  ],
  usageExamples: [
    {
      title: 'Basic stack',
      description: 'Avatars overlap naturally. Each avatar receives a border to maintain visual separation.',
      code: `<AvatarStack>
  <Avatar src="https://i.pravatar.cc/150?img=1" name="Jane Doe" />
  <Avatar src="https://i.pravatar.cc/150?img=2" name="John Smith" />
  <Avatar src="https://i.pravatar.cc/150?img=3" name="Alex Kim" />
</AvatarStack>`,
    },
    {
      title: 'With overflow',
      description: 'Set max to limit visible avatars. A "+N" indicator shows how many are hidden.',
      code: `<AvatarStack max={2}>
  <Avatar name="Jane Doe" color="primary" />
  <Avatar name="John Smith" color="success" />
  <Avatar name="Alex Kim" color="info" />
  <Avatar name="Sam Lee" color="warning" />
  <Avatar name="Pat Brown" color="error" />
</AvatarStack>`,
    },
    {
      title: 'Sizes',
      description: 'The size prop controls all avatars in the stack uniformly.',
      code: `<div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
  <AvatarStack size="sm">
    <Avatar name="AB" color="primary" />
    <Avatar name="CD" color="success" />
    <Avatar name="EF" color="info" />
  </AvatarStack>
  <AvatarStack size="md">
    <Avatar name="AB" color="primary" />
    <Avatar name="CD" color="success" />
    <Avatar name="EF" color="info" />
  </AvatarStack>
  <AvatarStack size="lg">
    <Avatar name="AB" color="primary" />
    <Avatar name="CD" color="success" />
    <Avatar name="EF" color="info" />
  </AvatarStack>
</div>`,
    },
    {
      title: 'Direction',
      description: 'Controls which avatar appears on top. "left" (default) puts the first avatar on top, "right" puts the last on top.',
      code: `<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
  <AvatarStack direction="left">
    <Avatar name="AB" color="primary" />
    <Avatar name="CD" color="success" />
    <Avatar name="EF" color="info" />
  </AvatarStack>
  <AvatarStack direction="right">
    <Avatar name="AB" color="primary" />
    <Avatar name="CD" color="success" />
    <Avatar name="EF" color="info" />
  </AvatarStack>
</div>`,
    },
  ],
};
