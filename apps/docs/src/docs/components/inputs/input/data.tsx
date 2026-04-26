import { ChangeEvent, useState } from 'react';
import { Input } from '@juliensouki/seedui';
import { ComponentDoc } from '../../../types';

function InputExample() {
  const [value, setValue] = useState('');
  return (
    <Input
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
      label="Username"
      placeholder="Enter your username"
      width={300}
    />
  );
}

export const inputDoc: ComponentDoc = {
  name: 'Input',
  category: 'Inputs',
  description: 'Field for entering short text like names, emails, or passwords.',
  overview: 'A single-line text field with support for labels, icons, and validation. For multi-line content, use Textarea instead.',
  props: [
    { name: 'value', type: 'string', default: '—', description: 'Controlled input value. Required.' },
    { name: 'label', type: 'string', default: '—', description: 'Label text above the input.' },
    { name: 'placeholder', type: 'string', default: '—', description: 'Placeholder text.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input.' },
    { name: 'type', type: "'email' | 'number' | 'password' | 'tel' | 'text' | 'url'", default: "'text'", description: 'HTML input type.' },
    { name: 'width', type: 'string | number', default: '—', description: 'Input width.' },
    { name: 'inputIcon', type: '{ icon: ReactNode; placement?: "left" | "right" }', default: '—', description: 'Icon to display inside the input.' },
    { name: 'inputValidation', type: '(value: string) => boolean', default: '—', description: 'Validation function returning true if valid.' },
    { name: 'onChange', type: 'ChangeEventHandler', default: '—', description: 'Change handler.' },
  ],
  example: InputExample,
  code: `const [value, setValue] = useState('');

<Input
  value={value}
  onChange={(e) => setValue(e.target.value)}
  label="Username"
  placeholder="Enter your username"
/>`,
  anatomy: [
    { name: 'Root', htmlAttribute: 'root', cssClass: 'input-root' },
    { name: 'Container', htmlAttribute: 'container', cssClass: 'input-container' },
    { name: 'Input', htmlAttribute: 'input', cssClass: 'input-field' },
    { name: 'Icon container', htmlAttribute: 'iconContainer', cssClass: 'input-icon-container' },
    { name: 'Validation icon', htmlAttribute: 'validationIcon', cssClass: 'input-validation-icon' },
  ],
  usageExamples: [
    {
      code: `const [value, setValue] = useState('');

<Input
  value={value}
  onChange={(e) => setValue(e.target.value)}
  label="Email"
  placeholder="you@example.com"
  width={300}
/>`,
    },
    {
      code: `const [value, setValue] = useState('');

<Input
  value={value}
  onChange={(e) => setValue(e.target.value)}
  label="Password"
  placeholder="Enter your password"
  type="password"
  width={300}
/>`,
    },
    {
      code: `const [value, setValue] = useState('');

<Input
  value={value}
  onChange={(e) => setValue(e.target.value)}
  label="Email"
  placeholder="you@example.com"
  inputValidation={(v) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v)}
  width={300}
/>`,
    },
    {
      code: `const [value, setValue] = useState('');

<Input
  value={value}
  onChange={(e) => setValue(e.target.value)}
  label="Search"
  placeholder="Search..."
  inputIcon={{
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
    placement: 'left',
  }}
  width={300}
/>`,
    },
    {
      code: `<Input
  value="Read only value"
  onChange={() => {}}
  label="Disabled field"
  disabled
  width={300}
/>`,
    },
  ],
  figmaUrl:
    'https://www.figma.com/design/KqnKUVKSX3GaltZs4ONXtx/Seedui---React-Library--Community-?node-id=227-183',
};
