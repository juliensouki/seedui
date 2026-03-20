import { Button } from '@seedui-react/seedui';
import { ComponentDoc } from './types';

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
      type: "'primary' | 'neutral' | 'error'",
      default: "'primary'",
      description: 'Color scheme of the button.',
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
      title: 'Color schemes',
      description:
        'Use the color prop to match the button to its intent. Primary for main actions, neutral for general-purpose, and error for destructive operations.',
      code: `<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
  <Button color="primary">Primary</Button>
  <Button color="neutral">Neutral</Button>
  <Button color="error">Error</Button>
</div>`,
    },
    {
      title: 'Variants',
      description:
        'Filled buttons draw the most attention and are best for primary actions. Transparent buttons work well for secondary or less prominent actions.',
      code: `<div style={{ display: 'flex', gap: 8 }}>
  <Button variant="filled">Filled</Button>
  <Button variant="transparent">Transparent</Button>
</div>`,
    },
    {
      title: 'Sizes',
      description:
        'Three sizes are available. Use small for dense UIs or inline actions, medium as the default, and large for prominent call-to-action buttons.',
      code: `<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
  <Button size="sm">Small</Button>
  <Button size="md">Medium</Button>
  <Button size="lg">Large</Button>
</div>`,
    },
    {
      title: 'Loading state',
      description:
        'Set isLoading to show a spinner and disable interaction. Useful while waiting for an async operation like a form submission.',
      code: `<Button isLoading>Submitting...</Button>`,
    },
    {
      title: 'Disabled',
      description:
        'Disabled buttons are visually muted and ignore clicks. Use them to indicate that an action is unavailable until a condition is met.',
      code: `<div style={{ display: 'flex', gap: 8 }}>
  <Button disabled>Disabled</Button>
  <Button variant="transparent" disabled>Disabled</Button>
</div>`,
    },
  ],
};
