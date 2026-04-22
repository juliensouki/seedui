import { useState } from 'react';
import { Toggle } from '@seedui-react/seedui';
import { ComponentDoc } from '../../../types';

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
  description: 'Switch for turning a setting on or off.',
  overview: 'A switch for binary settings that take effect immediately, like enabling notifications or dark mode. Supports an optional label and multiple sizes.',
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
    { name: 'Root', htmlAttribute: 'root', cssClass: 'toggle-root' },
    { name: 'Label', htmlAttribute: 'label', cssClass: 'toggle-label' },
    { name: 'Input', htmlAttribute: 'input', cssClass: 'toggle-input' },
  ],
  usageExamples: [
    {
      code: `const [checked, setChecked] = useState(false);

<Toggle
  checked={checked}
  onChange={() => setChecked(!checked)}
  label="Dark mode"
/>`,
    },
    {
      layout: { display: 'flex', flexDirection: 'column', gap: 12 },
      code: `const [a, setA] = useState(false);
const [b, setB] = useState(true);
const [c, setC] = useState(false);

<Toggle size="sm" checked={a} onChange={() => setA(!a)} label="Small" />
<Toggle size="md" checked={b} onChange={() => setB(!b)} label="Medium" />
<Toggle size="lg" checked={c} onChange={() => setC(!c)} label="Large" />`,
    },
    {
      layout: { display: 'flex', flexDirection: 'column', gap: 12 },
      code: `<Toggle checked={false} onChange={() => {}} label="Disabled off" disabled />
<Toggle checked={true} onChange={() => {}} label="Disabled on" disabled />`,
    },
  ],
};
