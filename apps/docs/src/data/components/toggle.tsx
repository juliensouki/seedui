import { useState } from 'react';
import { Toggle } from '@seedui-react/seedui';
import { ComponentDoc } from './types';

function ToggleExample() {
  const [checked, setChecked] = useState(false);
  return (
    <Toggle
      checked={checked}
      onChange={() => setChecked(!checked)}
      label="Enable notifications"
    />
  );
}

export const toggleDoc: ComponentDoc = {
  name: 'Toggle',
  category: 'Inputs',
  description: 'A switch control for toggling between on and off states.',
  overview: 'Toggle is a switch control for binary settings that take effect immediately, such as enabling notifications, dark mode, or feature flags. Unlike a checkbox — which typically requires a form submission — a toggle visually communicates that the change applies right away. It supports an optional label that appears next to the switch for context. Use the size prop to fit the toggle into dense toolbars or more spacious settings pages.',
  props: [
    { name: 'checked', type: 'boolean', default: '—', description: 'Whether the toggle is on. Required.' },
    { name: 'onChange', type: 'ChangeEventHandler', default: '—', description: 'Change handler.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the toggle.' },
    { name: 'label', type: 'string', default: '—', description: 'Label text next to the toggle.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Toggle size.' },
  ],
  example: ToggleExample,
  code: `const [checked, setChecked] = useState(false);

<Toggle
  checked={checked}
  onChange={() => setChecked(!checked)}
  label="Enable notifications"
/>`,
  anatomy: [
    { name: 'Root', htmlAttribute: 'rootDiv', cssClass: '—' },
    { name: 'Label', htmlAttribute: 'label', cssClass: '—' },
    { name: 'Input', htmlAttribute: 'input', cssClass: '—' },
  ],
  usageExamples: [
    {
      title: 'Basic toggle',
      description: 'A controlled switch with a label. The change takes effect immediately, making it ideal for settings that don\'t require a form submission.',
      code: `const [checked, setChecked] = useState(false);

<Toggle
  checked={checked}
  onChange={() => setChecked(!checked)}
  label="Dark mode"
/>`,
    },
    {
      title: 'Sizes',
      description: 'Three sizes are available. Small works in dense settings panels, while large provides a bigger hit target for touch interfaces.',
      code: `const [a, setA] = useState(false);
const [b, setB] = useState(true);
const [c, setC] = useState(false);

<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
  <Toggle size="sm" checked={a} onChange={() => setA(!a)} label="Small" />
  <Toggle size="md" checked={b} onChange={() => setB(!b)} label="Medium" />
  <Toggle size="lg" checked={c} onChange={() => setC(!c)} label="Large" />
</div>`,
    },
    {
      title: 'Disabled',
      description: 'A disabled toggle is visually muted and cannot be interacted with. Use it when a setting is locked or unavailable.',
      code: `<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
  <Toggle checked={false} onChange={() => {}} label="Disabled off" disabled />
  <Toggle checked={true} onChange={() => {}} label="Disabled on" disabled />
</div>`,
    },
  ],
};
