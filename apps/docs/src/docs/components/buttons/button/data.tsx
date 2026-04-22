import { Button } from '@seedui-react/seedui';
import { ComponentDoc } from '../../../types';

function ButtonExample() {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Button>Primary</Button>
      <Button color="neutral">Neutral</Button>
      <Button color="error">Error</Button>
      <Button variant="transparent">Transparent</Button>
    </div>
  );
}

export const buttonDoc: ComponentDoc = {
  name: 'Button',
  category: 'Buttons',
  description: 'Clickable element used to perform an action or trigger an event.',
  overview:
    'Buttons let people take actions like submitting a form, confirming a choice, or starting a new flow. They come in filled and transparent variants across primary, neutral, and error colors.',
  props: [
    { name: 'children', type: 'ReactNode', default: '—', description: 'Button content.' },
    {
      name: 'color',
      type: "'primary' | 'neutral' | 'error' | string",
      default: "'primary'",
      description: 'Color scheme of the button. Accepts a preset or any hex color string.',
    },
    { name: 'variant', type: "'filled' | 'transparent'", default: "'filled'", description: 'Visual style variant.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Button size.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the button.' },
    { name: 'isLoading', type: 'boolean', default: 'false', description: 'Shows a loading spinner.' },
    { name: 'type', type: "'button' | 'reset' | 'submit'", default: "'button'", description: 'HTML button type.' },
    { name: 'onClick', type: 'MouseEventHandler', default: '—', description: 'Click handler.' },
  ],
  example: ButtonExample,
  code: `<Button color="primary" variant="filled">
  Click me
</Button>`,
  anatomy: [],
  usageExamples: [
    {
      code: `<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
  <Button color="primary">Primary</Button>
  <Button color="neutral">Neutral</Button>
  <Button color="error">Error</Button>
</div>`,
    },
    {
      code: `<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
  <Button color="#2563EB">Custom Blue</Button>
  <Button color="#10B981">Custom Green</Button>
  <Button color="#F59E0B">Amber</Button>
  <Button color="#2563EB" variant="transparent">Custom Blue</Button>
  <Button color="#10B981" variant="transparent">Custom Green</Button>
</div>`,
    },
    {
      code: `<div style={{ display: 'flex', gap: 8 }}>
  <Button variant="filled">Filled</Button>
  <Button variant="transparent">Transparent</Button>
</div>`,
    },
    {
      code: `<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
  <Button size="sm">Small</Button>
  <Button size="md">Medium</Button>
  <Button size="lg">Large</Button>
</div>`,
    },
    {
      code: `<Button isLoading>Submitting...</Button>`,
    },
    {
      code: `<div style={{ display: 'flex', gap: 8 }}>
  <Button disabled>Disabled</Button>
  <Button variant="transparent" disabled>Disabled</Button>
</div>`,
    },
  ],
};
