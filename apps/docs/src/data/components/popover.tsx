import { useState } from 'react';
import { Button, Popover, Text } from '@seedui-react/seedui';
import { ComponentDoc } from './types';

function PopoverExample() {
  const [open, setOpen] = useState(false);
  return (
    <Popover
      isOpen={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      content={<div style={{ padding: 12 }}><Text variant="p">Popover content</Text></div>}
    >
      <Button onClick={() => setOpen(!open)}>Toggle Popover</Button>
    </Popover>
  );
}

export const popoverDoc: ComponentDoc = {
  name: 'Popover',
  category: 'Overlays',
  description: 'A floating content panel anchored to a trigger element.',
  overview: 'Popover displays rich content in a floating panel anchored to a trigger element. Use it for contextual menus, secondary actions, or inline details that don\'t warrant a full modal. Unlike Tooltip, which shows only a short text label, Popover can contain any React content — buttons, forms, or lists. It supports configurable alignment and automatic positioning to stay within the viewport. For simple text hints on hover, use Tooltip instead.',
  props: [
    { name: 'isOpen', type: 'boolean', default: '—', description: 'Controls visibility. Required.' },
    { name: 'onClose', type: '() => void', default: '—', description: 'Called when popover should close. Required.' },
    { name: 'onOpen', type: '() => void', default: '—', description: 'Called when popover should open.' },
    { name: 'children', type: 'ReactNode', default: '—', description: 'Trigger element. Required.' },
    { name: 'content', type: 'ReactNode', default: '—', description: 'Popover body content. Required.' },
    { name: 'verticalAlignment', type: "'top' | 'bottom' | 'center'", default: "'bottom'", description: 'Vertical position relative to trigger.' },
    { name: 'horizontalAlignment', type: "'left' | 'right' | 'center'", default: "'left'", description: 'Horizontal position relative to trigger.' },
    { name: 'spacing', type: 'number', default: '—', description: 'Gap between trigger and popover.' },
    { name: 'closeOnOutsideClick', type: 'boolean', default: 'true', description: 'Close when clicking outside.' },
    { name: 'closeOnEscape', type: 'boolean', default: 'true', description: 'Close when pressing Escape.' },
  ],
  example: PopoverExample,
  code: `const [open, setOpen] = useState(false);

<Popover
  isOpen={open}
  onOpen={() => setOpen(true)}
  onClose={() => setOpen(false)}
  content={<div>Popover content</div>}
>
  <Button onClick={() => setOpen(!open)}>Toggle</Button>
</Popover>`,
  anatomy: [
    { name: 'Root', htmlAttribute: 'rootDiv', cssClass: '—' },
    { name: 'Trigger', htmlAttribute: 'triggerDiv', cssClass: '—' },
    { name: 'Popover', htmlAttribute: 'popoverDiv', cssClass: '—' },
  ],
  usageExamples: [
    {
      title: 'Basic popover',
      description: 'A popover anchored to a button. It opens on click and closes when clicking outside or pressing Escape.',
      code: `const [open, setOpen] = useState(false);

<Popover
  isOpen={open}
  onOpen={() => setOpen(true)}
  onClose={() => setOpen(false)}
  content={
    <div style={{ padding: 16 }}>
      <Text variant="h6">Popover Title</Text>
      <Text variant="p" style={{ marginTop: 8 }}>Some helpful context.</Text>
    </div>
  }
>
  <Button onClick={() => setOpen(!open)}>Show Info</Button>
</Popover>`,
    },
    {
      title: 'Alignment',
      description: 'Control where the popover appears relative to the trigger using verticalAlignment and horizontalAlignment.',
      code: `const [open, setOpen] = useState(false);

<Popover
  isOpen={open}
  onOpen={() => setOpen(true)}
  onClose={() => setOpen(false)}
  verticalAlignment="top"
  horizontalAlignment="center"
  content={
    <div style={{ padding: 12 }}>
      <Text variant="p">Positioned above, centered.</Text>
    </div>
  }
>
  <Button onClick={() => setOpen(!open)}>Top Center</Button>
</Popover>`,
    },
  ],
};
