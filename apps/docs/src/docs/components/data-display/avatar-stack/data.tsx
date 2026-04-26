import { Avatar, AvatarStack } from '@juliensouki/seedui';
import { ComponentDoc } from '../../../types';

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
  description: 'Group of overlapping avatars for showing multiple users compactly.',
  overview: 'Renders avatars in an overlapping row. Use max to limit visible avatars — overflow shows as a "+N" badge.',
  props: [
    { name: 'children', type: 'ReactElement<AvatarProps> | ReactElement<AvatarProps>[]', default: '—', description: 'Avatar components to display. Required.' },
    { name: 'max', type: 'number', default: '—', description: 'Maximum number of avatars to show. Overflow displays as "+N".' },
    { name: 'size', type: "'sm' | 'md' | 'lg' | number", default: "'md'", description: 'Size applied to all avatars in the stack. Pass a number for a custom pixel size.' },
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
    { name: 'Root', htmlAttribute: 'root', cssClass: 'avatar-stack-root' },
    { name: 'Overflow', htmlAttribute: 'overflow', cssClass: 'avatar-stack-overflow' },
  ],
  usageExamples: [
    {
      code: `<AvatarStack>
  <Avatar src="https://i.pravatar.cc/150?img=1" name="Jane Doe" />
  <Avatar src="https://i.pravatar.cc/150?img=2" name="John Smith" />
  <Avatar src="https://i.pravatar.cc/150?img=3" name="Alex Kim" />
</AvatarStack>`,
    },
    {
      code: `<AvatarStack max={2}>
  <Avatar name="Jane Doe" color="primary" />
  <Avatar name="John Smith" color="success" />
  <Avatar name="Alex Kim" color="info" />
  <Avatar name="Sam Lee" color="warning" />
  <Avatar name="Pat Brown" color="error" />
</AvatarStack>`,
    },
    {
      layout: { display: 'flex', alignItems: 'center', gap: 16 },
      code: `<AvatarStack size="sm">
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
</AvatarStack>`,
    },
    {
      layout: { display: 'flex', flexDirection: 'column', gap: 16 },
      code: `<AvatarStack direction="left">
  <Avatar name="AB" color="primary" />
  <Avatar name="CD" color="success" />
  <Avatar name="EF" color="info" />
</AvatarStack>
<AvatarStack direction="right">
  <Avatar name="AB" color="primary" />
  <Avatar name="CD" color="success" />
  <Avatar name="EF" color="info" />
</AvatarStack>`,
    },
  ],
  figmaUrl:
    'https://www.figma.com/design/KqnKUVKSX3GaltZs4ONXtx/Seedui---React-Library--Community-?node-id=1501-339',
};
