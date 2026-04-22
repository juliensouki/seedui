import { useState } from 'react';
import { Button, Popover, Text } from '@seedui-react/seedui';
import { ComponentDoc } from '../../../types';

function PopoverExample() {
  const [open, setOpen] = useState(false);
  return (
    <Popover
      isOpen={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      content={<Text variant="p">Popover content</Text>}
    >
      <Button onClick={() => setOpen(!open)}>Toggle Popover</Button>
    </Popover>
  );
}

export const popoverDoc: ComponentDoc = {
  name: 'Popover',
  category: 'Overlays',
  description: 'Floating panel anchored to a trigger element for contextual content.',
  overview: 'Displays rich content in a floating panel next to a trigger. Can contain any content — buttons, forms, or lists. For simple text hints, use Tooltip instead.',
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
    { name: 'padding', type: 'number | string', default: '12', description: 'Inner padding of the panel in px (number) or any valid CSS padding string.' },
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
    { name: 'Root', htmlAttribute: 'root', cssClass: 'popover-root' },
    { name: 'Trigger', htmlAttribute: 'trigger', cssClass: 'popover-trigger' },
    { name: 'Panel', htmlAttribute: 'panel', cssClass: 'popover-panel' },
  ],
  usageExamples: [
    {
      code: `const [open, setOpen] = useState(false);

<Popover
  isOpen={open}
  onOpen={() => setOpen(true)}
  onClose={() => setOpen(false)}
  content={
    <>
      <Text variant="h6">Popover Title</Text>
      <Text variant="p" style={{ marginTop: 8 }}>Some helpful context.</Text>
    </>
  }
>
  <Button onClick={() => setOpen(!open)}>Show Info</Button>
</Popover>`,
    },
    {
      code: `const [open, setOpen] = useState(false);

<Popover
  isOpen={open}
  onOpen={() => setOpen(true)}
  onClose={() => setOpen(false)}
  verticalAlignment="top"
  horizontalAlignment="center"
  content={<Text variant="p">Positioned above, centered.</Text>}
>
  <Button onClick={() => setOpen(!open)}>Top Center</Button>
</Popover>`,
    },
  ],
};
