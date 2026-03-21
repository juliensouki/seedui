import { IconButton } from '@seedui-react/seedui';
import { SettingsIcon, SearchIcon, PencilIcon } from 'lucide-react';
import { ComponentDoc } from '../../../types';

function IconButtonExample() {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <IconButton>
        <PencilIcon strokeWidth={1.8} />
      </IconButton>
      <IconButton color="neutral">
        <SettingsIcon strokeWidth={1.8} />
      </IconButton>
      <IconButton variant="transparent">
        <SearchIcon strokeWidth={1.8} />
      </IconButton>
    </div>
  );
}

export const iconButtonDoc: ComponentDoc = {
  name: 'IconButton',
  category: 'Buttons',
  description: 'Compact button that displays a single icon without a text label.',
  overview:
    "An icon-only alternative to Button, useful when space is tight or a label isn't needed. Shares the same variants and colors as Button. Pair with a Tooltip when the icon meaning isn't obvious.",
  props: [
    { name: 'children', type: 'ReactNode', default: '—', description: 'Icon element to render.' },
    {
      name: 'color',
      type: "'primary' | 'neutral' | 'error'",
      default: "'primary'",
      description: 'Color scheme.',
    },
    { name: 'variant', type: "'filled' | 'transparent'", default: "'filled'", description: 'Visual style variant.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Button size.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the button.' },
    { name: 'onClick', type: 'MouseEventHandler', default: '—', description: 'Click handler.' },
  ],
  example: IconButtonExample,
  code: `<IconButton color="primary">
  <PencilIcon strokeWidth={1.8} />
</IconButton>`,
  anatomy: [],
  usageExamples: [
    {
      title: 'Variants',
      description:
        'Like Button, IconButton supports filled and transparent variants. Use transparent for toolbar actions or subtle controls.',
      code: `<div style={{ display: 'flex', gap: 8 }}>
  <IconButton variant="filled"><PencilIcon strokeWidth={1.8} /></IconButton>
  <IconButton variant="transparent"><PencilIcon strokeWidth={1.8} /></IconButton>
</div>`,
    },
    {
      title: 'Color schemes',
      description:
        'Apply a color to match the action context. Primary for main actions, neutral for general-purpose, and error for destructive ones.',
      code: `<div style={{ display: 'flex', gap: 8 }}>
  <IconButton color="primary"><ShareIcon strokeWidth={1.8} /></IconButton>
  <IconButton color="neutral"><SettingsIcon strokeWidth={1.8} /></IconButton>
  <IconButton color="error"><TrashIcon strokeWidth={1.8} /></IconButton>
</div>`,
    },
    {
      title: 'Sizes',
      description:
        'Small works well in dense toolbars, medium is the default, and large is suited for prominent standalone actions.',
      code: `<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
  <IconButton size="sm"><SearchIcon size={14} strokeWidth={1.8} /></IconButton>
  <IconButton size="md"><SearchIcon strokeWidth={1.8} /></IconButton>
  <IconButton size="lg"><SearchIcon size={22} strokeWidth={1.8} /></IconButton>
</div>`,
    },
    {
      title: 'Disabled',
      description:
        'A disabled IconButton is visually muted and non-interactive. Use it when the action is temporarily unavailable.',
      code: `<div style={{ display: 'flex', gap: 8 }}>
  <IconButton disabled><PencilIcon strokeWidth={1.8} /></IconButton>
  <IconButton variant="transparent" disabled><PencilIcon strokeWidth={1.8} /></IconButton>
</div>`,
    },
  ],
};
