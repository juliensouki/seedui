import { IconButton } from '@seedui-react/seedui';
import { GemIcon } from 'lucide-react';
import { ComponentDoc } from './types';

function IconButtonExample() {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <IconButton><GemIcon strokeWidth={1.8} /></IconButton>
      <IconButton color="neutral"><GemIcon strokeWidth={1.8} /></IconButton>
      <IconButton variant="transparent"><GemIcon strokeWidth={1.8} /></IconButton>
    </div>
  );
}

export const iconButtonDoc: ComponentDoc = {
  name: 'IconButton',
  category: 'Buttons',
  description: 'A button designed to wrap an icon. Shares the same base props as Button.',
  overview: 'IconButton is a compact button that renders a single icon without a text label. Use it for toolbar actions, inline controls, or anywhere space is limited and the icon alone communicates the action clearly. It shares the same variant and color system as Button, so you can mix both in the same UI while keeping a consistent look. Pair it with a Tooltip when the icon meaning might not be immediately obvious to all users.',
  props: [
    { name: 'children', type: 'ReactNode', default: '—', description: 'Icon element to render.' },
    { name: 'color', type: "'primary' | 'secondary' | 'neutral' | 'error'", default: "'primary'", description: 'Color scheme.' },
    { name: 'variant', type: "'filled' | 'transparent'", default: "'filled'", description: 'Visual style variant.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Button size.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the button.' },
    { name: 'onClick', type: 'MouseEventHandler', default: '—', description: 'Click handler.' },
  ],
  example: IconButtonExample,
  code: `<IconButton color="primary">
  <GemIcon strokeWidth={1.8} />
</IconButton>`,
  anatomy: [
    { name: 'Root', htmlAttribute: 'rootButton', cssClass: '—' },
  ],
  usageExamples: [
    {
      title: 'Variants',
      description: 'Like Button, IconButton supports filled and transparent variants. Use transparent for toolbar actions or subtle controls.',
      code: `<div style={{ display: 'flex', gap: 8 }}>
  <IconButton variant="filled"><GemIcon strokeWidth={1.8} /></IconButton>
  <IconButton variant="transparent"><GemIcon strokeWidth={1.8} /></IconButton>
</div>`,
    },
    {
      title: 'Color schemes',
      description: 'Apply a color to match the action context. Primary for main actions, neutral for general-purpose, and error for destructive ones.',
      code: `<div style={{ display: 'flex', gap: 8 }}>
  <IconButton color="primary"><GemIcon strokeWidth={1.8} /></IconButton>
  <IconButton color="neutral"><GemIcon strokeWidth={1.8} /></IconButton>
  <IconButton color="error"><GemIcon strokeWidth={1.8} /></IconButton>
</div>`,
    },
    {
      title: 'Sizes',
      description: 'Small works well in dense toolbars, medium is the default, and large is suited for prominent standalone actions.',
      code: `<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
  <IconButton size="sm"><GemIcon size={14} strokeWidth={1.8} /></IconButton>
  <IconButton size="md"><GemIcon strokeWidth={1.8} /></IconButton>
  <IconButton size="lg"><GemIcon size={22} strokeWidth={1.8} /></IconButton>
</div>`,
    },
    {
      title: 'Disabled',
      description: 'A disabled IconButton is visually muted and non-interactive. Use it when the action is temporarily unavailable.',
      code: `<div style={{ display: 'flex', gap: 8 }}>
  <IconButton disabled><GemIcon strokeWidth={1.8} /></IconButton>
  <IconButton variant="transparent" disabled><GemIcon strokeWidth={1.8} /></IconButton>
</div>`,
    },
  ],
};
