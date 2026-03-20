import { Avatar } from '@seedui-react/seedui';
import { ComponentDoc } from './types';

function AvatarExample() {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Avatar src="https://i.pravatar.cc/150?img=1" name="Jane Doe" />
      <Avatar name="John Smith" color="success" />
      <Avatar color="info" />
    </div>
  );
}

export const avatarDoc: ComponentDoc = {
  name: 'Avatar',
  category: 'Data Display',
  description: 'Circular representation of a user, shown as an image, initials, or fallback icon.',
  overview: 'Displays a user as a circle with an image, initials from the name prop, or a default icon. Supports multiple sizes and colors.',
  props: [
    { name: 'src', type: 'string', default: '—', description: 'Image URL to display.' },
    { name: 'alt', type: 'string', default: 'name or "avatar"', description: 'Alt text for the image.' },
    { name: 'name', type: 'string', default: '—', description: 'User name. Used to generate initials when no src is provided.' },
    { name: 'size', type: "'sm' | 'md' | 'lg' | number", default: "'md'", description: 'Avatar size. Use a preset or pass a number for a custom pixel size.' },
    { name: 'color', type: "'primary' | 'neutral' | 'success' | 'info' | 'warning' | 'error'", default: "'neutral'", description: 'Background color scheme for non-image avatars.' },
  ],
  example: AvatarExample,
  code: `<Avatar src="https://i.pravatar.cc/150?img=1" name="Jane Doe" />
<Avatar name="John Smith" color="success" />
<Avatar color="info" />`,
  anatomy: [
    { name: 'Root', htmlAttribute: 'root', cssClass: 'avatar-root' },
    { name: 'Image', htmlAttribute: 'image', cssClass: 'avatar-image' },
  ],
  usageExamples: [
    {
      title: 'With image',
      description: 'Pass a src prop to display an image. The name prop provides alt text and serves as a fallback if the image fails to load.',
      code: `<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
  <Avatar src="https://i.pravatar.cc/150?img=1" name="Jane Doe" />
  <Avatar src="https://i.pravatar.cc/150?img=2" name="John Smith" />
  <Avatar src="https://i.pravatar.cc/150?img=3" name="Alex Kim" />
</div>`,
    },
    {
      title: 'With initials',
      description: 'When no image is provided, initials are generated from the name prop. Single names show one letter, multi-word names show first and last initials.',
      code: `<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
  <Avatar name="Jane Doe" color="primary" />
  <Avatar name="John" color="success" />
  <Avatar name="Alex Kim Park" color="warning" />
</div>`,
    },
    {
      title: 'Sizes',
      description: 'Use sm for dense layouts, md for general use, lg for profile pages, or pass a number for a custom pixel size.',
      code: `<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
  <Avatar name="JD" size="sm" />
  <Avatar name="JD" size="md" />
  <Avatar name="JD" size="lg" />
  <Avatar name="JD" size={60} />
</div>`,
    },
    {
      title: 'Colors',
      description: 'Use color to differentiate avatars by role, team, or status when no image is available.',
      code: `<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
  <Avatar name="AB" color="primary" />
  <Avatar name="CD" color="neutral" />
  <Avatar name="EF" color="success" />
  <Avatar name="GH" color="info" />
  <Avatar name="IJ" color="warning" />
  <Avatar name="KL" color="error" />
</div>`,
    },
    {
      title: 'Fallback icon',
      description: 'When neither src nor name is provided, a generic person icon is displayed.',
      code: `<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
  <Avatar size="sm" color="neutral" />
  <Avatar size="md" color="neutral" />
  <Avatar size="lg" color="neutral" />
</div>`,
    },
  ],
};
